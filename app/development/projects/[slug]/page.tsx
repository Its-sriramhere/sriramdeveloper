import { projects } from "@/data/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download } from "lucide-react";

export function generateStaticParams() { return projects.map(p => ({ slug: p.slug })); }

export default async function ProjectDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) return notFound();

  return <div className="home-page"><section className="scene-panel project-detail">
    <Link className="text-link" href="/#work"><ArrowLeft size={16} /> All projects</Link>
    <div className="section-rail"><span>{project.ownership.toUpperCase()} PROJECT</span><span>{project.organization}</span></div>
    <div className="section-intro"><h1>{project.title}</h1><p>{project.description}</p></div>
    <div className="project-detail-links">
      {project.liveUrl && <a className="home-button" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Visit live site <ArrowUpRight size={16} /></a>}
      {project.androidApkUrl && <a className="home-button" href={project.androidApkUrl} target="_blank" rel="noopener noreferrer"><Download size={16} /> Android APK · Google Drive <ArrowUpRight size={16} /></a>}
      {project.githubUrl && <a className="text-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">View source <ArrowUpRight size={16} /></a>}
      {!project.liveUrl && !project.githubUrl && !project.androidApkUrl && <p>Project links and the full build story are coming soon.</p>}
    </div>
    <div className={`portfolio-card art-${project.art}`}><div className="portfolio-art" aria-hidden="true"><span className="art-lines"><i /><i /><i /><i /><i /></span><span className="art-mark">{project.mark}</span><span className="art-project-name">{project.title}</span></div></div>
    <div className="project-facts"><div><span>CONTEXT</span><p>{project.ownership} work</p></div><div><span>FORMAT</span><p>{project.slug === "migraine-detector" ? "App + website" : project.category}</p></div><div><span>ORGANIZATION</span><p>{project.organization}</p></div></div>
    {project.problem && <section className="detail-note"><h2>The problem</h2><p>{project.problem}</p></section>}
    {project.idea && <section className="detail-note"><h2>The approach</h2><p>{project.idea}</p></section>}
    {project.technologies.length > 0 && <p className="detail-note">{project.technologies.join(" · ")}</p>}
    {project.architecture.length > 0 && <p className="detail-note">{project.architecture.join(" → ")}</p>}
    <Link href="/#contact" className="text-link">Have something similar in mind? Let’s talk <ArrowUpRight size={16} /></Link>
  </section></div>;
}
