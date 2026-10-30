import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const tab = (body as { tab?: string; input?: string }).tab ?? "Assistant";
  const input = (body as { input?: string }).input ?? "";
  // v1 mock. Server-side OpenAI wiring deferred until OPENAI_API_KEY present.
  const mock =
    tab === "Code Explainer"
      ? `WHAT IT DOES: mock summary of ${input.slice(0, 60) || "input"}\nISSUE: unchecked undefined access\nFIX: guard + validate with Zod`
      : tab === "Concept Generator"
        ? `CONCEPT: ${input || "Cinematic reel"}\nSHOT LIST: wide / medium / close-up\nCAMERA: handheld + dolly\nMUSIC: pulse 100bpm\nTRANSITIONS: whip pan, RGB split\nCOLOR: teal-shadow / warm-skin`
        : `Sriram built Nebula Commerce, Prompt Desk and Orbit Play. See /development/projects. (mock)`;
  return NextResponse.json({ mock, disabled: !process.env.OPENAI_API_KEY }, { status: 200 });
}
