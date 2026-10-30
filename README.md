# Sriram V — Developer Portfolio

A cinematic full-stack developer portfolio with original illustrated manga storytelling, a space-themed contribution map, and playable game discoveries.

## Run locally

```sh
npm ci
npm run dev
```

Open **http://localhost:4000**.

## Checks

```sh
npm run lint
npm run test:contact
npm run build
```

The contact tests use a mocked email provider and never send a real message.

## Experience

- Seven projects with company/startup/personal filters, live website links, and a separate Android APK link.
- **The Quiet Build:** eight original SVG manga scenes with scroll-linked depth, chapter controls, and a vertical mobile/reduced-motion version.
- A planetary contribution map for Chessbishop, Fetchup, and independent work.
- Bare roaming Snake, Brick Breaker, and Runner characters that open playable game dialogs.
- An interactive contact switchboard with server-side email delivery to **sriram.efx@gmail.com**.

## Configuration

Copy the names from `.env.example` into your private environment. For email delivery, set:

```env
RESEND_API_KEY=your_private_resend_key
CONTACT_FROM_EMAIL="Sriram Portfolio <hello@your-verified-domain.com>"
```

Use a sender verified in your Resend account. Without these settings, the form reports that sending is unavailable and preserves the visitor's message. The direct email link remains available.

Vercel production metadata uses its production domain automatically. Set `NEXT_PUBLIC_SITE_URL` if you add a custom domain.

## Content and implementation

- `data/projects.ts` — project descriptions and destinations
- `components/motion/MangaStory.tsx` — eight-chapter story and reading controls
- `public/images/manga/` — original manga artwork
- `components/motion/SpaceExperience.tsx` — contribution systems
- `components/games/RoamingArcade.tsx` — living game actors and dialogs
- `app/api/contact/route.ts` — validated email sending

Built with Next.js App Router, React, TypeScript, Tailwind CSS, GSAP, Motion, and Lenis.
See `DESIGN.md` for art direction and `DEPLOY.md` for deployment and email setup.
