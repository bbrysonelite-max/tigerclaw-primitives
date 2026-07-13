# AGENTS.md

## Read first

This repository contains more than the default-branch web primitive gallery.

A Tiger Claw video brand primitive system is under active development on:

- Branch: `agent/video-primitives-system`
- Draft PR: [#2 — Establish Tiger Claw video primitives architecture](https://github.com/bbrysonelite-max/tigerclaw-primitives/pull/2)

Before performing video-related work, inspect that branch and read:

- `docs/VIDEO_PRIMITIVES_SYSTEM.md`
- `docs/VIDEO_PRIMITIVES_BUILD_PLAN.md`
- `brand/tigerclaw.tokens.ts`
- `brand/motion.tokens.ts`
- `brand/video-formats.ts`

## Source-of-truth rule

`tigerclaw-primitives` owns the canonical Tiger Claw visual and motion language.

Do not:

- create a competing Tiger Claw video primitive system elsewhere
- manually redefine Tiger Claw colors, typography, timing, or primitive names in another repository
- mix the Tiger Claw brand with the separate Brent AI / Two Brents channel identity
- modify the current web primitive gallery as part of video work unless the approved plan explicitly requires it
- merge PR #2 or related video work without Brent's explicit approval

## Current work lane

All video primitive development remains isolated on `agent/video-primitives-system` until the architecture and gates are approved.

The `Youtube-system` repository may consume the finished package later, but it is not the canonical source of Tiger Claw video brand rules.
