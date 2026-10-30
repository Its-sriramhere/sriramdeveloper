"use client";

import { useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, Copy, Send, CheckCircle2 } from "lucide-react";

const email = "sriram.efx@gmail.com";
const topics = ["A frontend experience", "A backend / full-stack system", "Something unexpected"];

export function ContactSwitchboard() {
  const [selected, setSelected] = useState(0);
  const [copied, setCopied] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  const pending = useRef(false);

  const copy = async () => {
    try { await navigator.clipboard.writeText(email); setCopied(true); setCopyFeedback("Email address copied."); }
    catch { setCopyFeedback("Copy isn’t available here. You can select the email address or use the email link."); }
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current) return;
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    pending.current = true; setStatus("sending"); setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: form.get("name"), email: form.get("email"), subject: topics[selected], message: form.get("message"), website: form.get("website") }),
        signal: AbortSignal.timeout(20000),
      });
      const result = await response.json().catch(() => null);
      if (!response.ok || result?.ok !== true) throw new Error(result?.error || "Your message couldn’t be sent. Please try again or use the email link.");
      setStatus("sent"); formElement.reset();
    } catch (cause) {
      setError(cause instanceof Error && cause.name !== "TimeoutError" && cause.name !== "TypeError" ? cause.message : "Couldn’t connect to the email service. Your message is still here. Please try again or email me directly.");
      setStatus("error");
    } finally { pending.current = false; }
  };

  return <div className="switchboard">
    <div className="switchboard-left">
      <p className="switchboard-prompt">PICK A STARTING POINT</p>
      <div className="contact-topics" role="group" aria-label="What would you like to build?">{topics.map((topic, index) => <button type="button" key={topic} aria-pressed={selected === index} disabled={status === "sending"} onClick={() => setSelected(index)}><span className="topic-index">0{index + 1}</span><span>{topic}</span><ArrowUpRight size={21} /></button>)}</div>
      <div className="contact-direct"><span>OR GO DIRECT</span><div><a href={`mailto:${email}`}>{email}</a><button type="button" onClick={copy} aria-label={copied ? "Email copied" : "Copy email address"}>{copied ? <Check size={18} /> : <Copy size={18} />}</button></div><p>Open to frontend, backend, and full-stack opportunities.</p><p role="status">{copyFeedback}</p></div>
      <div className="contact-socials"><a href="https://github.com/Its-sriramhere" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={15} /></a><a href="https://www.linkedin.com/in/sriram-sundaram-801b51410" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={15} /></a></div>
    </div>
    <form className="contact-draft" onSubmit={submit} aria-busy={status === "sending"}>
      <div className="draft-heading"><span className="status-dot" /><span>NEW CONVERSATION</span><span>→ SV</span></div>
      {status === "sent" ? <div className="contact-success" role="status"><CheckCircle2 size={32} strokeWidth={1.4} /><h3>Message sent.</h3><p>Thanks for reaching out. I’ll get back to you at the email address you provided.</p><button className="home-button" type="button" onClick={() => setStatus("idle")}>Send another message <ArrowUpRight size={16} /></button></div> : <>
        <p className="draft-subject" aria-live="polite">{topics[selected]}</p>
        <fieldset disabled={status === "sending"}>
          <div className="draft-fields"><div><label htmlFor="contact-name">Your name</label><input id="contact-name" name="name" autoComplete="name" placeholder="What should I call you?" required minLength={2} maxLength={100} /></div><div><label htmlFor="contact-email">Your email</label><input id="contact-email" type="email" name="email" autoComplete="email" placeholder="you@company.com" required maxLength={200} /></div></div>
          <div className="contact-honeypot" aria-hidden="true"><label htmlFor="contact-website">Leave this field empty</label><input id="contact-website" name="website" tabIndex={-1} autoComplete="off" /></div>
          <label htmlFor="contact-message">What’s on your mind?</label><textarea id="contact-message" name="message" rows={4} placeholder="A project, an opportunity, or a wonderfully strange idea…" required minLength={10} maxLength={4000} />
        </fieldset>
        <button type="submit" className="home-button" disabled={status === "sending"}>{status === "sending" ? "Sending your message…" : "Send message"}<Send size={16} /></button>
        <p className="draft-helper">Delivered to {email}. Your email is used so I can reply.</p>
        {status === "error" && <p role="alert" className="contact-feedback contact-error">{error}</p>}
      </>}
    </form>
  </div>;
}
