"use client";
import { Gamepad2, ArrowUpRight } from "lucide-react";

/** A visible side quest on the work page; no artificial code errors. */
export function DebugStrip() {
  return <button type="button" onClick={() => window.dispatchEvent(new CustomEvent("portfolio:open-arcade", { detail: "breaker" }))} className="mt-10 flex min-h-[80px] w-full items-center gap-5 border border-line bg-surface p-6 text-left text-ivory hover:border-red"><Gamepad2 size={28} strokeWidth={1.5} /><span><span className="block font-mono text-[10px] tracking-[0.14em] text-bone">SIDE QUEST FOUND</span><span className="mt-2 block text-sm">That little paddle looks playable. Take a break?</span></span><ArrowUpRight size={20} className="ml-auto" /></button>;
}
