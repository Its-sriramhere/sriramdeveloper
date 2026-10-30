"use client";
import { useEffect } from "react";
import { useXPStore } from "@/lib/store/site";
import { toast } from "sonner";

const CODE = ["arrowup", "arrowup", "arrowdown", "arrowdown", "arrowleft", "arrowright", "arrowleft", "arrowright", "b", "a"];

export function KonamiEgg() {
  const { addXP, unlock } = useXPStore();

  useEffect(() => {
    let buf: string[] = [];
    const onKey = (e: KeyboardEvent) => {
      buf = [...buf, e.key.toLowerCase()].slice(-CODE.length);
      if (buf.join(",") === CODE.join(",")) {
        buf = [];
        addXP(200);
        unlock("explorer");
        toast.success("KONAMI ACCEPTED — +200 XP, CODE EXPLORER");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [addXP, unlock]);

  return null;
}
