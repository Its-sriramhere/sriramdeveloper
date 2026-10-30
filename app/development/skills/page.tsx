"use client";
import { ReactFlow } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { devSkills, creativeSkills } from "@/data/site";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { AeroHero } from "@/components/backgrounds/AeroHero";
import { MatrixRain } from "@/components/backgrounds/MatrixRain";

function toNodes(tree: Record<string, string[]>, x0: number) {
  const nodes: { id: string; position: { x: number; y: number }; data: { label: string } }[] = [];
  const edges: { id: string; source: string; target: string }[] = [];
  let y = 0;
  Object.entries(tree).forEach(([group, items]) => {
    nodes.push({ id: group, position: { x: x0, y }, data: { label: group } });
    items.forEach((s, i) => {
      const id = `${group}-${s}`;
      nodes.push({ id, position: { x: x0 + 220, y: y + i * 50 - 40 }, data: { label: s } });
      edges.push({ id: `e-${id}`, source: group, target: id });
    });
    y += items.length * 50 + 60;
  });
  return { nodes, edges };
}

export default function SkillsPage() {
  const dev = toNodes(devSkills, 0);
  const creative = toNodes(creativeSkills, 0);
  return (
    <div className="relative bg-black">
      <MatrixRain />
      <div className="mx-auto max-w-[1700px] px-[5vw] py-20">
        <div className="relative overflow-hidden">
          <AeroHero />
          <div className="relative">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-red">03 / Tools of the trade</p>
            <h1 className="display-hero mt-4 text-ivory">Tools<br />are only<br />the start.</h1>
            <p className="mt-4 max-w-[52ch] text-white">Development × creative × experience layer. No fake proficiency scores — just the stack.</p>
          </div>
        </div>
        <div className="mt-8 grid gap-px bg-line hairline md:grid-cols-2">
          <ScrollReveal variant="scale">
            <div className="h-[420px] bg-black">
              <ReactFlow
                nodes={dev.nodes.map((n) => ({ ...n, style: { background: "#101010", color: "#E7E5D8", border: "1px solid #262626", borderRadius: 2 } }))}
                edges={dev.edges.map((e) => ({ ...e, style: { stroke: "#D90000" } }))}
                fitView
              />
            </div>
          </ScrollReveal>
          <ScrollReveal variant="scale" delay={0.1}>
            <div className="h-[420px] bg-black">
              <ReactFlow
                nodes={creative.nodes.map((n) => ({ ...n, style: { background: "#101010", color: "#E7E5D8", border: "1px solid #262626", borderRadius: 2 } }))}
                edges={creative.edges.map((e) => ({ ...e, style: { stroke: "#D90000" } }))}
                fitView
              />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
