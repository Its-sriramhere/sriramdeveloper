import type { Metadata } from "next";
import { Bodoni_Moda, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./chapters.css";
import "./stories.css";
import "./journey.css";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/shared/Footer";
import { KonamiEgg } from "@/components/shared/KonamiEgg";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { PageTransition } from "@/components/motion/PageTransition";
import { Toaster } from "sonner";
import { RoamingArcade } from "@/components/games/RoamingArcade";
import { getSiteUrl } from "@/lib/utils/site-url";

const display = Bodoni_Moda({ variable: "--font-display", subsets: ["latin"] });
const body = Inter({ variable: "--font-body", subsets: ["latin"] });
const mono = JetBrains_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sriram V — Creative Full-Stack Developer × Video Editor",
  description:
    "Sriram V is a creative full-stack developer, video editor and motion designer building interactive digital experiences and visual stories.",
  metadataBase: new URL(getSiteUrl()),
  openGraph: {
    title: "Sriram V — Creative Engineer",
    description: "Full-stack × motion. I build it. I code it. I make it move.",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${display.variable} ${body.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col grain bg-black text-white">
        <SmoothScroll />
        <PageTransition />
        <KonamiEgg />
        <a href="#main-content" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer />
        <RoamingArcade />
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
