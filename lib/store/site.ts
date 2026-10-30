"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Mode = "dev" | "creative";

interface ModeState {
  mode: Mode;
  setMode: (m: Mode) => void;
}

export const useModeStore = create<ModeState>()((set) => ({
  mode: "dev",
  setMode: (mode) => set({ mode }),
}));

interface XPState {
  xp: number;
  achievements: string[];
  addXP: (n: number) => void;
  unlock: (id: string) => void;
}

export const XP_VALUES = {
  about: 25,
  openProject: 50,
  playGame: 100,
  completeGame: 200,
  exploreEditing: 50,
  watchShowreel: 25,
  useAi: 100,
  completeEscape: 500,
} as const;

export const useXPStore = create<XPState>()(
  persist(
    (set) => ({
      xp: 0,
      achievements: [],
      addXP: (n) => set((s) => ({ xp: s.xp + n })),
      unlock: (id) =>
        set((s) =>
          s.achievements.includes(id)
            ? s
            : { achievements: [...s.achievements, id] }
        ),
    }),
    { name: "digital-lab-xp" }
  )
);
