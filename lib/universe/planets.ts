export interface PlanetConfig {
  id: string;
  label: string;
  route: string;
  position: [number, number, number];
  color: string;
  description: string;
}

// Layout per plan §9: AI top, Projects/Skills mid, sun center, About/GitHub low, Playground bottom
export const PLANETS: PlanetConfig[] = [
  { id: "ai", label: "AI", route: "/ai-lab", position: [0, 3.4, 0], color: "#E7E5D8", description: "Assistant, explainer, concept generator." },
  { id: "projects", label: "PROJECTS", route: "/development/projects", position: [-3.2, 1.6, 0], color: "#E7E5D8", description: "Case studies with architecture." },
  { id: "skills", label: "SKILLS", route: "/development/skills", position: [3.2, 1.6, 0], color: "#E7E5D8", description: "Dev + creative trees." },
  { id: "about", label: "ABOUT", route: "/about", position: [-2.6, -1.4, 0.6], color: "#C9C7BA", description: "Developer × creative profile." },
  { id: "github", label: "GITHUB", route: "/development/github", position: [2.6, -1.4, 0.6], color: "#C9C7BA", description: "Repos, languages, stars." },
  { id: "playground", label: "PLAYGROUND", route: "/playground", position: [0, -3.2, 0], color: "#D90000", description: "Games + experiments." },
];

export const SUN = { position: [0, 0, -1] as [number, number, number] };
