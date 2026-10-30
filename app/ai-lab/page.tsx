"use client";
import { useState } from "react";
import { useXPStore } from "@/lib/store/site";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

const TABS = ["Assistant", "Code Explainer", "Concept Generator"] as const;

export default function AiLabPage() {
  const { addXP, unlock } = useXPStore();
  const [tab, setTab] = useState<(typeof TABS)[number]>("Assistant");
  const [input, setInput] = useState("");
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tab, input }),
    });
    const data = await res.json();
    setOut(data.mock ?? data.error ?? "No response");
    setBusy(false);
    addXP(25);
    unlock("ai");
    toast.success("+25 XP — AI Lab explored (mock)");
  };

  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">07 / AI Lab</p>
            <h1 className="display-hero mt-4 text-ivory">Machine<br />meets<br />imagination.</h1>
            <p className="mt-4 max-w-[52ch] text-white">Small AI experiments built around code, creativity and visual storytelling. Mocked until keys land.</p>
          </div>
        </div>
        <ScrollReveal variant="wipeR">
          <div className="mt-10 border border-line bg-surface">
          <div className="flex gap-px border-b border-line bg-line">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`min-h-[44px] flex-1 px-4 font-mono text-xs tracking-[0.14em] ${tab === t ? "bg-red text-white" : "bg-black text-bone hover:bg-raised"}`}
              >
                {t.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="p-6">
            <p className="font-mono text-[11px] tracking-[0.2em] text-ember">$ ASK THE LAB…</p>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={tab === "Assistant" ? "What projects has he built?" : tab === "Code Explainer" ? "Paste code…" : "Cinematic car reel…"}
              className="mt-3 min-h-[120px] w-full border border-line bg-black p-4 font-mono text-sm text-white placeholder:text-gray"
              aria-label="AI input"
            />
            <button onClick={run} disabled={busy} className="mt-4 inline-flex min-h-[44px] items-center border border-red px-8 text-sm font-bold tracking-[0.08em] text-white hover:bg-red disabled:opacity-50">
              {busy ? "PROCESSING / DIGITAL STUDIO…" : "RUN →"}
            </button>
            {out && <pre className="mt-4 whitespace-pre-wrap border border-line bg-black p-4 font-mono text-sm text-ivory">{out}</pre>}
          </div>
        </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
