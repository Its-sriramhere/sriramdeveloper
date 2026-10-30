export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  problem: string;
  idea: string;
  architecture: string[];
  technologies: string[];
  role: string;
  githubUrl: string;
  liveUrl: string;
  androidApkUrl?: string;
  category: "website" | "app" | "internal tool";
  ownership: "Company" | "Startup" | "Personal";
  organization: string;
  mark: string;
  art: string;
}

// Only owner-confirmed facts are published. Add stack, implementation notes,
// screenshots and URLs here when supplied; empty URLs never produce live links.
const pending = { problem: "", idea: "", architecture: [], technologies: [], githubUrl: "", liveUrl: "" };

export const projects: Project[] = [
  { ...pending, slug: "migraine-detector", title: "Migraine Detector", tagline: "A migraine-focused app and website.", description: "A personal project spanning a migraine detector app and a companion website.", role: "Personal project", category: "app", ownership: "Personal", organization: "Independent", mark: "MD", art: "migraine", androidApkUrl: "https://drive.google.com/file/d/1ZWjKE4QaNawmb682gh3hHDb_FpruYk8Z/view?usp=sharing" },
  { ...pending, slug: "chessbishop", title: "Chessbishop", tagline: "A commercial website for Chessbishop.", description: "A client website delivered as part of my work on Chessbishop company projects.", role: "Company project", category: "website", ownership: "Company", organization: "Chessbishop", mark: "CB", art: "chess", liveUrl: "https://chessbishop.com" },
  { ...pending, slug: "chesswareneuro", title: "Chesswareneuro", tagline: "Another chapter of the Chessbishop work.", description: "A website developed as a Chessbishop company project.", role: "Company project", category: "website", ownership: "Company", organization: "Chessbishop", mark: "CW", art: "neuro", liveUrl: "https://chesswareneuro.vercel.app/" },
  { ...pending, slug: "chessbishop-expense-tracker", title: "Expense Tracker", tagline: "An expense-tracking tool for Chessbishop.", description: "A company expense tracker created for Chessbishop.", role: "Company project", category: "internal tool", ownership: "Company", organization: "Chessbishop", mark: "ET", art: "expense", liveUrl: "https://chessbishop-expense.vercel.app/" },
  { ...pending, slug: "bi-fit", title: "Bi-Fit", tagline: "Fitness tracking. A place to log the work.", description: "A personal fitness tracking and logging website.", role: "Personal project", category: "website", ownership: "Personal", organization: "Independent", mark: "BF", art: "fitness", liveUrl: "https://bifit.vercel.app" },
  { ...pending, slug: "sriram-efx", title: "Sriram-EFX", tagline: "My editing work, in its own space.", description: "My personal video-editor portfolio website, bringing the creative side of my work into focus.", role: "Personal project", category: "website", ownership: "Personal", organization: "Independent", mark: "EFX", art: "editor", liveUrl: "https://sriramefx.vercel.app/" },
  { ...pending, slug: "fetchup", title: "Fetchup", tagline: "A website for a startup company.", description: "Website work for Fetchup, a startup company.", role: "Startup project", category: "website", ownership: "Startup", organization: "Fetchup", mark: "F↑", art: "fetch", liveUrl: "https://fetchup-eta.vercel.app" },
];
