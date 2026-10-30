"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "motion/react";
import { ArrowUpRight, Download } from "lucide-react";
import { projects, type Project } from "@/data/projects";

const filters = ["All", "Company", "Startup", "Personal"] as const;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const card = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0), y = useMotionValue(0);
  const rotateX = useSpring(x, { stiffness: 160, damping: 24 });
  const rotateY = useSpring(y, { stiffness: 160, damping: 24 });
  return <motion.article className={`portfolio-card art-${project.art}`} initial={false} whileInView={reduce ? {} : { y: [28, 0], opacity: [0.65, 1] }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.65, delay: (index % 2) * 0.09 }}>
    <motion.div style={{ rotateX, rotateY, transformPerspective: 1200 }}>
      <Link ref={card} href={`/development/projects/${project.slug}`} className="portfolio-card-link" onPointerMove={event => { if (reduce || event.pointerType !== "mouse") return; const box = event.currentTarget.getBoundingClientRect(); x.set(-((event.clientY - box.top) / box.height - 0.5) * 5); y.set(((event.clientX - box.left) / box.width - 0.5) * 5); }} onPointerLeave={() => { x.set(0); y.set(0); }}>
        <div className="portfolio-art" aria-hidden="true"><span className="art-caption">{project.organization} / {project.category}</span><span className="art-lines"><i /><i /><i /><i /><i /></span><span className="art-mark">{project.mark}</span><span className="art-project-name">{project.title}</span><span className="art-visit"><ArrowUpRight size={23} /></span></div>
        <div className="portfolio-project-info"><div><h3>{project.title}</h3><p>{project.tagline}</p></div><span>{project.ownership}</span></div>
      </Link>
      <div className="portfolio-external-links">
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" aria-label={`Visit live site: ${project.title} (opens in a new tab)`}>Visit live site <ArrowUpRight size={15} /></a>}
        {project.androidApkUrl && <a href={project.androidApkUrl} target="_blank" rel="noopener noreferrer" aria-label={`Android APK for ${project.title} on Google Drive (opens in a new tab)`}><Download size={14} /> Android APK <span>Google Drive</span><ArrowUpRight size={15} /></a>}
      </div>
    </motion.div>
  </motion.article>;
}

export function ProjectShowcase() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const visible = projects.filter(project => filter === "All" || project.ownership === filter);
  return <div className="project-showcase"><div className="project-filters" role="group" aria-label="Filter projects">{filters.map(label => <button key={label} onClick={() => setFilter(label)} aria-pressed={filter === label}>{label}<span>{label === "All" ? projects.length : projects.filter(p => p.ownership === label).length}</span></button>)}<span className="project-count" aria-live="polite">{visible.length} projects</span></div><div className="portfolio-grid">{visible.map((project, index) => <ProjectCard key={project.slug} project={project} index={index} />)}</div></div>;
}
