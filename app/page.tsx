import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Layers3, Smartphone, Globe2 } from "lucide-react";
import { HomeScenes } from "@/components/motion/HomeScenes";
import { ProjectShowcase } from "@/components/ui/ProjectShowcase";
import { ContactSwitchboard } from "@/components/ui/ContactSwitchboard";
import { MangaStory } from "@/components/motion/MangaStory";
import { SpaceExperience } from "@/components/motion/SpaceExperience";

export default function Home() {
  return (
    <HomeScenes>
      <section className="home-hero" aria-labelledby="intro-title">
        <div className="hero-copy">
          <p className="home-kicker"><span className="status-dot" /> AVAILABLE FOR COLLABORATIONS</p>
          <h1 id="intro-title">Sriram V<span className="hero-role">Frontend.<br />Backend.<br /><em>Beyond.</em></span></h1>
          <p className="hero-description">Full-stack developer with a creative instinct.<br />From the interface to everything behind it.</p>
          <a href="#work" className="home-button">Explore my work <ArrowDown size={17} /></a>
        </div>
        <div className="hero-portrait">
          <div className="portrait-red-field" />
          <Image src="/images/portrait-1200.webp" alt="Sriram V in red studio light" fill priority sizes="(max-width: 767px) 90vw, 48vw" className="hero-photo" />
          <span className="portrait-caption">DEVELOPER BY LOGIC. CREATIVE BY INSTINCT.</span>
          <span className="portrait-coordinate" aria-hidden="true">SV / 001</span>
        </div>
        <div className="hero-bottom"><span>FULL-STACK DEVELOPMENT × MOTION DESIGN</span><a href="#work">SCROLL TO EXPLORE <ArrowDown size={14} /></a></div>
      </section>

      <section id="work" className="home-scene work-scene" data-scene="stack" aria-labelledby="work-title">
        <div className="scene-panel">
          <div className="section-rail"><span>01 / WORK</span><span>SELECTED BUILDS & MOVING IMAGES</span></div>
          <div className="section-intro"><h2 id="work-title">Different problems.<br /><em>One builder.</em></h2><p>Company projects, startup work, and personal experiments. A selection of the things I’ve put into the world.</p></div>
          <ProjectShowcase />
          <div className="work-bottom"><span>Also creating in Premiere Pro, After Effects & motion.</span><Link href="/creative">Explore creative work <ArrowUpRight size={17} /></Link></div>
        </div>
      </section>

      <section id="breakdown" className="home-scene breakdown-scene" data-scene="assemble" aria-labelledby="breakdown-title">
        <div className="scene-panel">
          <div className="section-rail"><span>02 / UNDER THE SURFACE</span><span>A CLOSER LOOK AT THE BUILD</span></div>
          <div className="breakdown-layout"><div className="breakdown-copy"><h2 id="breakdown-title">More than<br /><em>a screen.</em></h2><p className="breakdown-project">Migraine Detector</p><p>A personal project that lives in two places: an app and a website. The featured build for a closer look at my engineering work.</p><div className="breakdown-facts"><div><Smartphone size={20} /><span>App experience</span></div><div><Globe2 size={20} /><span>Companion website</span></div><div><Layers3 size={20} /><span>Independent project</span></div></div><Link href="/development/projects/migraine-detector" className="text-link">Explore the project <ArrowUpRight size={18} /></Link><p className="case-study-note">The full technical story, architecture, and implementation notes are being documented.</p></div><div className="assembly-art" aria-label="Layered visual for the Migraine Detector app and website"><div className="assembly-layer layer-back"><span>01 / WEBSITE</span><Globe2 size={42} /><b>WEB</b></div><div className="assembly-layer layer-middle"><span>02 / APPLICATION</span><Smartphone size={42} /><b>APP</b></div><div className="assembly-layer layer-front"><span>MIGRAINE DETECTOR</span><span className="assembly-symbol">M<span>↗</span>D</span><span>ONE PROJECT. TWO EXPERIENCES.</span></div></div></div>
        </div>
      </section>

      <section id="process" className="home-scene process-scene manga-scene" aria-labelledby="process-title"><div className="scene-panel"><div className="section-rail"><span>03 / HOW I BUILD</span><span>AN IDEA. A PLOT TWIST. A WORKING PRODUCT.</span></div><div className="section-intro"><h2 id="process-title">Every build<br /><em>has a story.</em></h2><p>A fictional journey. Real engineering habits. Follow an original Japanese-inspired manga through eight chapters, from an uncertain brief to a thoughtful release.</p></div><MangaStory /></div></section>

      <section id="experience" className="home-scene experience-scene space-scene" aria-labelledby="experience-title"><div className="scene-panel"><div className="section-rail"><span>04 / EXPERIENCE & CONTRIBUTIONS</span><span>A CONSTELLATION OF WORK</span></div><div className="section-intro"><h2 id="experience-title">Different worlds.<br /><em>One trajectory.</em></h2><p>Company work, a startup, and independent explorations. Choose a system, or scroll to travel between them.</p></div><SpaceExperience /></div></section>

      <section id="about" className="home-scene about-scene" data-scene="portrait" aria-labelledby="about-title">
        <div className="scene-panel">
          <div className="section-rail"><span>05 / ABOUT</span><span>BEHIND THE SCREEN</span></div>
          <div className="about-layout">
            <div className="about-photo"><Image src="/images/portrait-600.webp" alt="Portrait of Sriram" fill sizes="(max-width: 767px) 90vw, 32vw" /><span>ALWAYS CURIOUS.<br />NEVER QUITE FINISHED.</span></div>
            <div className="about-copy"><h2 id="about-title">One mind.<br /><em>Different mediums.</em></h2><p>I’m Sriram, a full-stack developer, video editor, and motion designer. I like making the technical feel human and the ordinary feel a little unexpected.</p><p>Currently studying Electronics & Communication Engineering, graduating in 2027. Exploring the space between useful software and expressive visuals.</p><div className="skill-lines"><div><span>BUILD</span><p>React · Next.js · TypeScript · Python</p></div><div><span>CREATE</span><p>Premiere Pro · After Effects · Motion</p></div><div><span>EXPLORE</span><p>AI · Interactive experiences · Storytelling</p></div></div><Link href="/resume" className="text-link">View résumé <ArrowUpRight size={18} /></Link></div>
          </div>
        </div>
      </section>

      <section id="contact" className="home-scene contact-scene" data-scene="unfold" aria-labelledby="contact-title">
        <div className="scene-panel">
          <div className="section-rail"><span>06 / CONTACT</span><span>THE COLLABORATION SWITCHBOARD</span></div>
          <div className="section-intro"><h2 id="contact-title">What are we<br /><em>building next?</em></h2><p>A useful product. A better experience. A conversation worth having.</p></div>
          <ContactSwitchboard />
          <div className="contact-signoff"><span>GOOD THINGS START WITH A HELLO.</span><a href="#intro-title">BACK TO TOP ↑</a></div>
        </div>
      </section>
    </HomeScenes>
  );
}
