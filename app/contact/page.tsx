import { ContactSwitchboard } from "@/components/ui/ContactSwitchboard";
import Link from "next/link";

export const metadata = { title: "Contact — Sriram V" };

export default function ContactPage() {
  return <div className="home-page"><section className="home-scene contact-scene"><div className="scene-panel"><div className="section-rail"><span>THE COLLABORATION SWITCHBOARD</span><Link href="/">BACK TO THE PORTFOLIO ↗</Link></div><div className="section-intro"><h1>What are we<br /><em>building next?</em></h1><p>A useful product. A better experience. A conversation worth having.</p></div><ContactSwitchboard /></div></section></div>;
}
