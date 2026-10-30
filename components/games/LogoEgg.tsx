"use client";
import { Gamepad2 } from "lucide-react";

export function LogoEgg() {
  return <button type="button" aria-label="∷ SRIRAM V INSERT CURIOSITY ↗ — Discover the secret arcade" className="inline-flex min-h-[44px] items-center gap-3 font-mono text-xs tracking-[0.12em] text-bone hover:text-ivory" onClick={() => window.dispatchEvent(new CustomEvent("portfolio:open-arcade", { detail: "snake" }))}><span>∷ SRIRAM V</span><Gamepad2 size={16} /><span>INSERT CURIOSITY ↗</span></button>;
}
