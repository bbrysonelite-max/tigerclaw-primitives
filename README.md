# Tiger Claw UI Primitives Gallery

Interactive component gallery for the Tiger Claw design system. Dark, high-contrast, neo-brutalist.

## Live Site
https://tigerclawui-82pdhbda.manus.space

## Features
- 36 interactive primitive sections
- Dark/light theme toggle
- Sticky sidebar TOC with smooth-scroll navigation
- Mobile hamburger drawer for smaller screens
- "View Code" button on every section with copy-to-clipboard
- Social media primitives for all 10 platforms
- Video primitives (YouTube intro/middle/CTA cards)
- Animations: glitch text, electric borders, particle backgrounds, dock magnification

## Tech Stack
- React 19 + TypeScript
- Tailwind CSS 4
- Vite
- Framer Motion
- Sonner (toasts)

## Run Locally
```bash
pnpm install
pnpm dev
```

## Brand Tokens
- Background: `#0A0A0A` (dark) / `#f8f7f5` (light)
- Primary accent: `#E8722A` (Tiger Claw orange)
- Signal green: `#4ADE80`
- Fonts: Bebas Neue (display), Space Grotesk (UI), IBM Plex Mono (labels)

## Canonical tokens
The full machine-readable token set lives in [`tokens.json`](./tokens.json), with a human-readable companion (and drift log) in [`TOKENS.md`](./TOKENS.md). Source of truth for values is `client/src/index.css`; the root `index.html` is a legacy static build that duplicates tokens — known differences are documented in TOKENS.md under "Drift found".

## Consumers
This repo's tokens power the following shipped properties — do not change values without checking all of them:
- brentbryson.ai
- tigerclaw.io
- Dashboard
- Admin Dashboard
- Brag Machine HOUSE-STYLE
