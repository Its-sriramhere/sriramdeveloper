"use client";
import { useRef } from "react";
import { useXPStore } from "@/lib/store/site";
import { toast } from "sonner";

/** Awards +100 once on first interaction, +200 once on completion. */
export function useGameXP(gameId: string) {
  const { addXP, unlock } = useXPStore();
  const played = useRef(false);
  const done = useRef(false);

  const play = () => {
    if (!played.current) {
      played.current = true;
      addXP(100);
      toast.success("+100 XP — GAME STARTED");
    }
  };

  const complete = (achievementId: string, label: string) => {
    if (!done.current) {
      done.current = true;
      addXP(200);
      unlock(achievementId);
      toast.success(`+200 XP — ${label}`);
    }
  };

  return { play, complete, gameId };
}
