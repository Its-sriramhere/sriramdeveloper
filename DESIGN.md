# Design System: SRIRAM V — Editorial Cinematic Studio

## Homepage implementation update
- The homepage is Hero → Work → Migraine Detector Breakdown → How I Build → Experience & Contributions → About → Contact. Header/footer use anchors. There is no Playground section or navigation item.
- Keep the existing Bodoni/Inter/mono identity, with charcoal panels, ivory type, and restrained brick-red accents. Sharp corners throughout.
- Desktop choreography: Work stacks over the briefly pinned hero; Breakdown assembles three visual planes; About reveals its own portrait and copy; Contact unfolds into a switchboard. There is no cross-section clipping.
- How I Build is **The Quiet Build**, an original eight-chapter illustrated manga. Eight standalone SVG artworks in public/images/manga replace every portrait in this section. The fictional red-scarfed builder moves through discovery, planning, frontend, backend, a setback, testing, and release in Japanese-inspired settings. Each chapter has a main scene, a close-up insert, a second narrative voice, a turning point, and an engineering decision. Desktop 900×650+ gets a pinned, scroll-linked sequence with separate artwork, atmosphere, inset and dialogue depth. Chapter buttons, previous/next and a skip action offer direct control. Mobile, reduced motion and no-JavaScript render a vertical comic.
- Experience is a space-themed mission map, not a timeline: textured procedural planets, orbit paths and deterministic stars represent Chessbishop, Fetchup and Independent work. Scrolling changes systems; explicit buttons provide direct selection. It uses CSS/GSAP, not WebGL.
- Below 900px, other chapters have light vertical movement. Reduced motion removes scroll choreography and roaming motion.
- Bare living game actors replace the floating arcade card. Snake follows a steering path with individually following body segments. A runner has a running/jumping silhouette; a paddle and ball move independently. One actor is visible at a time, with a short introductory/hover/focus hint, a movement pause control, and a stationary footer discovery. No permanent floating card or label surrounds a character.
- Games open in a lazy-loaded native dialog overlay, with tabs for all three games. Native modal focus containment, Escape/backdrop/close actions, restored focus, and background scroll locking preserve browsing position. Keyboard and touch controls, pause/resume, restart and optional local personal bests remain available.
- No homepage content depends on a loader, canvas, WebGPU, or animation finishing. Server-rendered headings and section content remain visible without JavaScript.
- Layer order: chapters 1, navigation 50, roaming discoveries 55, decorative pointer-free grain 60, skip link 80; native game dialogs use the browser top layer.
- Seven owner-confirmed projects live in data/projects.ts. Chessbishop company work: Chessbishop, Chesswareneuro, Expense Tracker. Startup: Fetchup. Personal: Migraine Detector, Bi-Fit, Sriram-EFX. Project artwork is abstract title treatment, not a product screenshot. Unknown tech stacks, dates, architecture, results, and URLs are omitted until supplied.
- Contact now POSTs to /api/contact. Server-side Resend delivery targets **sriram.efx@gmail.com** with the visitor’s email as Reply-To. Set RESEND_API_KEY and CONTACT_FROM_EMAIL privately. No credentials means a clear 503, never mock success. The form preserves text on failure and confirms only provider-acknowledged sends. Direct email and clipboard remain available. See DEPLOY.md and npm run test:contact.

Reading this as: editorial cinematic portfolio (black/red reference) for recruiters/clients, fusing fashion-magazine composition with developer-terminal detail.

Dials: DESIGN_VARIANCE 9 / MOTION_INTENSITY 6 / VISUAL_DENSITY 4

## 1. Visual Theme & Atmosphere
A digital film × editorial magazine × creative studio × developer lab × interactive game. Black is structure, red is environment, ivory is voice, photography is emotion. Ratio: 75–85% black, 8–15% red, 8–12% ivory. Red never full-page except Creative/Contact moments + final CTA.

## 2. Color Palette & Roles
- **Black** (#000000) — page canvas, nav, frames, footer
- **Coal** (#050505) — secondary background
- **Surface** (#101010) — panels, cards, game interfaces
- **Raised** (#171717) — hover, elevated
- **Red** (#D90000) — brand accent: active nav, section numbers, CTA hover, small labels, progress, key words, glows, game errors
- **Ember** (#F00000) — hover/active bright, focus rings, small-label text on black
- **Crimson** (#7A0000) — deep gradients, shadows
- **Ivory** (#E7E5D8) — display type, hero, editorial headings, project titles, pull quotes
- **Bone** (#C9C7BA) — secondary display text
- **White** (#FFFFFF) — UI labels, nav, buttons, body copy
- **Gray** (#777777) — metadata
- **Line** (#262626) — thin rules, borders; red when active
- Banned: blue SaaS gradients, rainbow neon, glassmorphism-everywhere, violet/cyan remnants.

## 3. Typography Rules
- **Display:** Bodoni Moda uppercase, tight leading (0.95–0.98), clamp scales (hero 3.5rem/10vw/10rem; section 2.5rem/7vw/6rem). May overlap media. Same-family emphasis only.
- **Body:** Inter 16–18px, white on black; gray metadata 11–14px monolabels.
- **Mono:** JetBrains Mono 10–13px — code, system messages, metadata, game UI, coordinates.
- Hero: eyebrow + giant display + identity line + statement + CTAs. Max 1 eyebrow per 3 sections.

## 4. Component Stylings
- **Buttons:** rectangular (radius 0–8px), 1px red border, transparent bg, white text; hover red fill. One label per intent (EXPLORE MY WORK → / ENTER PLAYGROUND / START A TRANSMISSION →). 44px targets.
- **Cards:** sharp/slight radius, Surface fill, Line border; editorial posters (number + red overlay + zoom on hover), never equal-width grids of clones.
- **Dividers:** 1px Line; red when active. Section numbers `01 / ABOUT` on every major section.
- **Loaders:** title-card boot (black + red progress + BUILD. EDIT. MOVE.), red-flash exit; skeletal shimmer red-tinted elsewhere.
- **Grain:** fixed pointer-events-none overlay; portrait grain + optional scanlines.

## 5. Layout Principles
- 12-col desktop (max 1600–1800px, 5–7vw sides); 8-col tablet; 4-col + 20px mobile (separate composition, not shrunk desktop). Negative space, asymmetry, full-bleed media, type breaking containers. min-h-[100dvh]. Cursor VIEW on projects / PLAY on video.
- Universe: black space, red lights, ivory nodes, SRIRAM center; 2D editorial fallback.

## 6. Motion & Interaction
- Editorial entrances: mask reveals, blur-to-sharp, red flash, scale; page transition black frame → red flash → type split (<1s). Lenis smooth + selective GSAP ScrollTrigger. transform/opacity/clip-path only. Reduced-motion = fades. Isolated 'use client' leaves; dynamic() for 3D/games/video/waveform.

## 7. Anti-Patterns (Banned)
No emojis, no blue gradients, no card-grid sameness, no heavy rounding (24px+), no decorative-only 3D, no stock-photo filler, no above-fold paragraphs, no template heroes, no fake stats/dates/scores (flag TODO(real-data)), no hover-only essentials, no games gating resume/contact, no phone in SEO metadata, no PII in API responses.
