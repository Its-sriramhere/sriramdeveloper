import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/utils/site-url";
import { projects } from "@/data/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getSiteUrl();
  const routes = ["", "/about", "/development", "/development/projects", "/development/skills", "/development/github", "/universe", "/creative", "/creative/showreel", "/creative/editing", "/creative/motion", "/creative/color-grading", "/playground", "/playground/color-grade", "/playground/motion-lab", "/playground/shot-builder", "/playground/transition-lab", "/playground/editor-timeline", "/playground/escape-room", "/ai-lab", "/journey", "/achievements", "/resume", "/contact"];
  return [...routes.filter(route => route !== "/playground"), ...projects.map(project => `/development/projects/${project.slug}`)].map((r) => ({ url: `${base}${r || "/"}`, lastModified: new Date() }));
}
