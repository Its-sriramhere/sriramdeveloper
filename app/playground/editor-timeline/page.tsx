"use client";
import { useState } from "react";
import { DndContext, useDraggable, useDroppable, type DragEndEvent } from "@dnd-kit/core";
import { GameShell } from "@/components/games/GameShell";
import { useGameXP } from "@/components/games/useGameXP";
import { toast } from "sonner";

const ASSETS = ["CLIP A", "CLIP B", "CLIP C", "MUSIC", "SFX", "TITLE"] as const;
type Asset = (typeof ASSETS)[number];

function DragAsset({ id, placed, onAdd }: { id: Asset; placed: boolean; onAdd: (a: Asset) => void }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });
  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onAdd(id)}
      disabled={placed}
      className={`min-h-[44px] border px-4 font-mono text-xs tracking-[0.14em] ${placed ? "border-line text-gray line-through" : "border-line bg-black text-white hover:border-red"} ${isDragging ? "opacity-50" : ""}`}
      style={transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined}
    >
      {id}
    </button>
  );
}

function DropTimeline({ items, onRemove }: { items: Asset[]; onRemove: (i: number) => void }) {
  const { setNodeRef, isOver } = useDroppable({ id: "timeline-drop" });
  return (
    <div
      id="timeline-drop"
      ref={setNodeRef}
      className={`min-h-[140px] border p-4 ${isOver ? "border-ember bg-raised" : "border-line bg-black"}`}
    >
      <p className="font-mono text-[11px] tracking-[0.24em] text-ember">TIMELINE — DROP OR TAP ASSETS</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.length === 0 && <span className="font-mono text-xs text-gray">EMPTY. FEED ME CLIPS.</span>}
        {items.map((a, i) => (
          <button
            key={`${a}-${i}`}
            onClick={() => onRemove(i)}
            className="min-h-[44px] border border-red bg-surface px-4 font-mono text-xs text-white hover:bg-red"
            aria-label={`Remove ${a} at position ${i + 1}`}
          >
            {i + 1}. {a} ✕
          </button>
        ))}
      </div>
    </div>
  );
}

export default function EditorTimelinePage() {
  const { play, complete } = useGameXP("editor-timeline");
  const [items, setItems] = useState<Asset[]>([]);
  const [rendered, setRendered] = useState(false);

  const add = (a: Asset) => {
    play();
    setRendered(false);
    setItems((s) => (s.includes(a) ? s : [...s, a]));
  };

  const onDragEnd = (e: DragEndEvent) => {
    if (e.over?.id === "timeline-drop") add(e.active.id as Asset);
  };

  const render = () => {
    if (items.length < 3) {
      toast.error("TIMELINE TOO SHORT — NEED 3+ ASSETS");
      return;
    }
    setRendered(true);
    complete("editor", "VIDEO EDITOR — SEQUENCE LOCKED");
  };

  return (
    <GameShell no="09 / Editor timeline" title="Cut the sequence." intro="Drag assets — or tap them — into the timeline. Three minimum, then render.">
      <DndContext onDragEnd={onDragEnd}>
        <div className="flex flex-wrap gap-2">
          {ASSETS.map((a) => (
            <DragAsset key={a} id={a} placed={items.includes(a)} onAdd={add} />
          ))}
        </div>
        <div className="mt-4">
          <DropTimeline items={items} onRemove={(i) => setItems((s) => s.filter((_, j) => j !== i))} />
        </div>
      </DndContext>
      <button onClick={render} className="mt-6 inline-flex min-h-[44px] items-center border border-red px-8 text-sm font-bold tracking-[0.08em] text-white hover:bg-red">
        RENDER →
      </button>
      {rendered && (
        <div className="mt-6 border border-red bg-surface p-6">
          <p className="font-mono text-xs tracking-[0.24em] text-ember">SEQUENCE LOCKED. RENDER COMPLETE.</p>
          <div className="mt-3 flex h-16 gap-1 overflow-hidden" aria-hidden>
            {items.map((a, i) => (
              <div
                key={`${a}-${i}`}
                className="flex-1 bg-red"
                style={{ opacity: 0.35 + (i % 3) * 0.25, animation: `pulse ${0.8 + i * 0.2}s infinite alternate` }}
              />
            ))}
          </div>
          <style>{`@keyframes pulse { from { transform: scaleY(0.6); } to { transform: scaleY(1); } }`}</style>
          <p className="mt-3 font-mono text-xs text-ivory">{items.join(" → ")}</p>
        </div>
      )}
    </GameShell>
  );
}
