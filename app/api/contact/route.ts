import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const recipient = "sriram.efx@gmail.com";
const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  subject: z.string().trim().min(2).max(180),
  message: z.string().trim().min(10).max(4000),
  website: z.string().max(200).optional(),
});

// Best-effort per-instance throttling. The provider also enforces account limits.
const attempts = new Map<string, { count: number; until: number }>();

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Please send your message from this website." }, { status: 403 });
  }
  if (Number(request.headers.get("content-length")) > 24000) {
    return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
  }
  const raw = await request.text();
  if (raw.length > 24000) return NextResponse.json({ error: "Your message is too long." }, { status: 413 });
  let body: unknown;
  try { body = JSON.parse(raw); } catch {
    return NextResponse.json({ error: "Please check your message and try again." }, { status: 400 });
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success || parsed.data.website) {
    return NextResponse.json({ error: "Please include a name, a valid email, and a message of at least 10 characters." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !from) {
    return NextResponse.json({ error: `Email sending is not configured yet. Please email ${recipient} directly.` }, { status: 503 });
  }

  const now = Date.now();
  for (const [key, entry] of attempts) if (entry.until <= now) attempts.delete(key);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0].trim() || "local";
  const entry = attempts.get(ip);
  if (entry && entry.count >= 5) return NextResponse.json({ error: "A few messages have already been sent. Please try again in 10 minutes, or email me directly." }, { status: 429, headers: { "Retry-After": String(Math.ceil((entry.until - now) / 1000)) } });
  if (attempts.size >= 10000 && !entry) return NextResponse.json({ error: "Please try again shortly, or email me directly." }, { status: 429 });
  attempts.set(ip, { count: (entry?.count ?? 0) + 1, until: entry?.until ?? now + 600000 });

  const { name, email, subject, message } = parsed.data;
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [recipient],
        reply_to: email,
        subject: `Portfolio: ${subject.replace(/[\r\n]+/g, " ")}`,
        text: `New portfolio message\n\nFrom: ${name}\nEmail: ${email}\nTopic: ${subject}\n\n${message}`,
      }),
      signal: AbortSignal.timeout(10000),
      cache: "no-store",
    });
    const result = await response.json().catch(() => null);
    if (!response.ok || typeof result?.id !== "string" || !result.id) {
      return NextResponse.json({ error: "The email service couldn’t send your message. Your text is saved here; please try again or use the email link." }, { status: 502 });
    }
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "The email service couldn’t be reached. Your text is saved here; please try again or email me directly." }, { status: 502 });
  }
}
