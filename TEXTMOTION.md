# Text Motion Registry — unique animation per headline instance

Rule: no two entries share the same (primitive, direction, duration) triple.
Global: ALL scroll motion fires once and stays (`once:true`) — elements resolve on
entry and never reverse out. (Bidirectional was tried; it read as content
appearing/disappearing, so it was reverted.)
Primitives: tech-canvas / split-flap / blur-words / blur-chars / mask-up / mask-left / blur-settle / char-stagger /
typewriter / glitch-in / clip-circle / red-wipe / line-grow / countup / settle-scale / lattice

| # | Location | Text | Animation (primitive · direction · duration) |
|---|---|---|---|
| 1 | `/` hero | SRIRAM V | tech-canvas · lens+sweep+drag · continuous |
| 2 | `/` hero eyebrow | roles cycler | split-flap · tile-flip · 0.12s/2.6s cycle |
| 3 | `/` hero sub | VIDEO EDITOR | blur-settle · center · 0.9s |
| 4 | `/` hero portrait | FIG. 01 | settle-scale · 1.07→1 + 8px blur · 1.15s |
| 5 | `/` disciplines head | TWO DISCIPLINES… | mask-up · bottom · 0.7s |
| 6 | `/` work head | THINGS I'VE BUILT. | char-stagger · down-cascade · 0.05s/char |
| 7 | `/` reel head | MAKE IT MOVE. | clip-circle · center-out · 0.8s |
| 8 | `/` playground teaser | DON'T JUST… PLAY. | glitch-in · rgb-split once · 0.5s |
| 9 | `/` final CTA | HAVE AN IDEA? | red-wipe · left · 0.6s |
| 10 | `/about` hero | ABOUT THE PERSON… | mask-left · right · 0.7s |
| 11 | `/about` creed | CODE SHOULD… | blur-settle · slow · 1.4s |
| 12 | `/about` stats | 20+/15+/30+/2027 | countup · spring · 1.6–2.2s |
| 13 | `/journey` hero | STILL BECOMING. | typewriter · char · 0.04s/char |
| 14 | `/journey` years | 2024…2027 | line-grow · vertical + fade · 0.5s |
| 15 | `/development/skills` hero | TOOLS ARE ONLY… | mask-up · top · 0.9s |
| 16 | `/development` hero | I BUILD SYSTEMS. | char-stagger · up-cascade · 0.04s/char |
| 17 | `/development/projects` hero | THINGS I'VE BUILT. | red-wipe · right · 0.7s |
| 18 | `/development/projects/[slug]` | project title | mask-left · left · 0.8s |
| 19 | `/development/github` hero | THE CODE… | typewriter · word · 0.09s/word |
| 20 | `/development/github` stats | 20/48/12 | countup · staggered · 1.2–1.6s |
| 21 | `/universe` hero | ENTER THE SYSTEM. | blur-settle · fast · 0.6s |
| 22 | `/creative` hero | I MAKE STORIES MOVE. | mask-up · red edge · 1.0s |
| 23 | `/creative/showreel` hero | SHOWREEL 2026 | char-stagger · center-burst · 0.03s/char |
| 24 | `/creative/editing` hero | CUT. PACE. STORY. | red-wipe · three-band stagger · 0.4s each |
| 25 | `/creative/motion` hero | MAKE STATIC MOVE. | cursor-trail · pointer-driven · live |
| 26 | `/creative/color-grading` hero | COLOUR CHANGES… | clip-circle · left-out · 0.9s |
| 27 | `/playground` hero | DON'T JUST SCROLL… | glitch-in · soft · 0.7s |
| 28 | game titles (×9) | e.g. FIND THE MOOD. | mask-up · short · 0.5s + XP countup in shell |
| 29 | `/ai-lab` hero | MACHINE MEETS… | typewriter · slow · 0.06s/char |
| 30 | `/achievements` hero | UNLOCKED. | split-flap · static word · instant |
| 31 | `/achievements` XP | level bar | countup · spring · 1.0s |
| 32 | `/resume` hero | THE SHORT VERSION. | mask-left · short · 0.5s |
| 33 | `/contact` hero | LET'S MAKE… | clip-circle · bottom-out · 0.8s |
| 34 | loader | BUILD./EDIT./MOVE. | lattice · orbit + word-cycle · 0.38s |
| 35 | footer | SRIRAM V | blur-settle · slowest · 1.8s on view |

Audit: `grep` triples — all 35 rows distinct. New headlines must claim an unused triple here first.

## Card & section landings (family-level; scroll-triggered, once)

| Family | Locations | Animation (primitive · direction · duration) |
|---|---|---|
| stat-grid | about stats, achievements, resume panels | rise + stagger 0.07 · up · 0.55s |
| timeline | journey list | left + cascade delay · left · 0.6s |
| flow-canvas | skills ReactFlow panels | scale · 0.96→1 · 0.6s |
| hub-grid | dev hub, projects list, creative hub, editing, signal index | right (dev/projects) / scale (creative) · stagger 0.07 |
| case-section | project detail sections | right + cascade · right · 0.55s |
| data-panel | resume shell, contact blocks | wipeR (contact) · right · 0.6s |
| terminal-shell | ai terminal, debug pre | wipeR (ai) / wipeL (debug) · alternating · 1.2s |
| repo-card | github repo cards | wipeL + cascade · left · 1.2s |
| media-frame | showreel, color slider | scale · 0.96→1 · 0.7s |
| motion-tile | motion page tiles | left + stagger · left · 0.55s |
| game-shell | all 9 game boards | rise · up · 0.6s |
| option-list | memory/api/debug option grids | rise · up · 0.5s |
| fallback-grid | universe 2D grid | fade + stagger · — · 0.5s |
| chrome | footer headline + nav | fade · — · 0.8s |

## Loader-gated bands & frames (play on `site:ready`, never behind the loader)

| Element | Animation |
|---|---|
| `/` hero red field | wipeL-ready · left · 1.4s + 0.1s delay |
| `/` hero portrait | pressure settle 1.09→1 + 8px blur · 1.8s (paused until ready) |
| `/` coal reel band | wipeL · scroll · 1.2s |
| `/` red final CTA band | wipeR · scroll · 1.2s |
| `/creative` red hero band | wipeL · scroll · 1.2s |

Game interactive elements (flipping cards, drag assets, sliders, inputs) stay instant —
only their container shells land, so play never waits on animation.

## Blur-text headlines (bidirectional: resolve on enter, blur out on exit)

| Location | Config |
|---|---|
| SectionHeading titles (site-wide) | blur-words · top · 120ms stagger |
| GameShell titles (×9) | blur-words · top · 140ms stagger |
| `/` disciplines / reel / teaser / CTA heads | blur-words · alternating top/bottom per line · 130ms |
| `/` discipline cards, hero sub | blur-chars · 40–60ms |
| `/about` creed | blur-words · alternating · 130ms |

## Ambient background (fixed global layer)

| Element | Config |
|---|---|
| dust particles | red/ivory twinkle drift · 70 desktop / 30 mobile · dpr ≤1.5 · tab-hidden pause |
| code stream | 3 mono marquee rows · 90–150s loops · masked edges · desktop only |
| matrix rain | red/ivory glyph drift · page-level below every hero · IO-gated · dpr ≤1.5 |
| shard field (WebGPU) | pearl stream, full-bleed · repel via window pointer · hold-gather · adaptive quality · dust fallback |
| hero shards | scoped absolute instance · density 0.7 · behind red field + portrait · silent fail |
| page-hero shards | every page hero (20) + GameShell · scoped absolute · calm density · reduced-motion null |
