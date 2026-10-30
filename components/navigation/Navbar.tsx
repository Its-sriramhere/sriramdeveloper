"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils/cn";

const LINKS = [
  ["WORK", "/#work"],
  ["PROCESS", "/#process"],
  ["ABOUT", "/#about"],
  ["CONTACT", "/#contact"],
] as const;

const MOBILE_LINKS: readonly (readonly [string, string])[] = [
  ["HOME", "/"],
  ...LINKS,
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-colors",
        scrolled || open ? "border-b border-line bg-black" : "border-b border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1700px] items-center justify-between gap-4 px-[5vw]">
        <Link href="/" className="font-display text-lg font-bold tracking-[0.12em] text-ivory" aria-label="Sriram V home">
          SRIRAM&nbsp;V
        </Link>
        <div className="hidden items-center gap-6 lg:flex">
          <nav className="flex items-center gap-6" aria-label="Primary">
            {LINKS.map(([label, href]) => {
              const active = pathname !== "/" && pathname.startsWith(href === "/#work" ? "/development" : href.replace("/#", "/"));
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group relative py-1 text-[13px] font-medium tracking-[0.14em]",
                    active ? "text-white" : "text-bone hover:text-white"
                  )}
                >
                  {active && <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-red" aria-hidden />}
                  {label}
                  <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-red transition-transform group-hover:scale-x-100" aria-hidden />
                </Link>
              );
            })}
          </nav>
          <span className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] text-ember">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red" aria-hidden />
            OPEN TO WORK
          </span>
        </div>
        <button
          className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center font-mono text-sm tracking-[0.2em] text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? <X /> : "MENU"}
        </button>
      </div>
      {open && (
        <nav className="flex min-h-[calc(100dvh-4rem)] flex-col justify-center gap-2 bg-black px-[5vw] pb-10 lg:hidden" aria-label="Mobile">
          {MOBILE_LINKS.map(([label, href], i) => (
            <Link
              key={href + label}
              href={href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-4 font-display text-4xl uppercase text-ivory hover:text-ember"
            >
              <span className="mr-3 font-mono text-xs text-red">0{i + 1}</span>
              {label}
            </Link>
          ))}
          <p className="mt-6 font-mono text-xs tracking-[0.2em] text-ember">● OPEN TO WORK</p>
        </nav>
      )}
    </header>
  );
}
