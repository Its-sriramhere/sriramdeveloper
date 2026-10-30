"use client";
import { useState } from "react";
import { useXPStore } from "@/lib/store/site";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

const ROUTES = ["/api/health", "/api/projects", "/api/contact", "/api/ai"];

export default function ApiRunnerPage() {
  const { addXP, unlock } = useXPStore();
  const [route, setRoute] = useState<string | null>(null);

  const fire = () => {
    if (route === "/api/projects") {
      addXP(150);
      unlock("api");
      toast.success("200 OK — REQUEST SUCCESSFUL +150 XP, API ARCHITECT");
    } else {
      toast.error(`${route ?? "—"} → 404. Route the GET /projects request.`);
    }
  };

  return (
    <div className="relative mx-auto max-w-[900px] px-4 py-16">
      <MatrixRain />
      <div className="relative overflow-hidden">
        <AeroHero />
        <div className="relative">
          <p className="font-mono text-xs tracking-[0.2em] text-ember">CLIENT → FRONTEND → API → BACKEND → DB → RESPONSE</p>
          <h1 className="mt-2 font-display text-4xl font-bold text-ivory">API Runner</h1>
          <p className="mt-2 text-bone">Choose the endpoint that returns the project list.</p>
        </div>
      </div>
      <ScrollReveal variant="rise">
        <div className="mt-6 grid gap-3">
        {ROUTES.map((r) => (
          <button
            key={r}
            onClick={() => setRoute(r)}
            className={`min-h-[44px] rounded-sm px-4 font-mono text-sm ${route === r ? "bg-red text-white" : "bg-surface text-white hairline hover:bg-raised"}`}
          >
            GET {r}
          </button>
        ))}
        </div>
      </ScrollReveal>
      <button onClick={fire} className="mt-6 min-h-[44px] rounded-sm bg-red px-8 font-bold text-white hover:bg-ember">
        SEND REQUEST
      </button>
    </div>
  );
}
