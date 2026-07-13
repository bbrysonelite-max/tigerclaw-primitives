# Tiger Claw Video Primitives System

## Purpose

Create a reusable, programmatic motion-design system for Tiger Claw videos. The system must let humans and agents call named video primitives with typed props or validated JSON manifests while preserving the existing Tiger Claw visual identity.

## Repository Responsibilities

### `tigerclaw-primitives`

Owns:

- canonical Tiger Claw brand tokens
- canonical motion tokens
- reusable video primitives
- primitive registry and schemas
- Remotion gallery and reference compositions
- render-safe assets and documentation

### `Youtube-system`

Owns:

- the production operating system
- episode manifests and production inputs
- HeyGen presenter footage
- ElevenLabs voice assets
- screen recordings and source media
- final video assembly and render outputs
- named brand-pack adapters

`Youtube-system` consumes Tiger Claw contracts. It must not redefine Tiger Claw colors, typography, timing, motion behavior, or primitive names.

## Technology Decision

Remotion with React and TypeScript is the source implementation.

- HeyGen creates presenter footage.
- ElevenLabs creates or supplies voice and audio assets.
- Remotion performs deterministic assembly, overlays, transitions, captions, audio placement, thumbnails, and final rendering.
- After Effects and DaVinci exports may be added later, but neither is the source of truth.

## Supported Formats

- YouTube long-form, demos, and webinars: 1920 × 1080, 16:9, 30 fps
- Shorts, Reels, and vertical clips: 1080 × 1920, 9:16, 30 fps
- YouTube thumbnails: 1280 × 720 still composition

Applicable primitives must adapt from a shared component rather than being duplicated by format.

## Stable Primitive Vocabulary

```text
tc.lowerThird
tc.bumper.intro
tc.bumper.outro
tc.transition.clawSwipe
tc.transition.orangeStreak
tc.transition.glitchCut
tc.super.headline
tc.super.stat
tc.super.quote
tc.progress.bar
tc.progress.timeline
tc.progress.countdown
tc.notification.cta
tc.background.grid
tc.background.particles
tc.background.gradientShift
tc.caption.standard
tc.thumbnail.standard
tc.audio.logoHit
tc.audio.transitionSwoosh
```

Primitive identifiers are public contracts. Renaming or removing one requires a deprecation path.

## Invocation Contract

Each primitive must support:

1. A typed React component.
2. A Zod-validated JSON manifest entry.
3. Registration in the public primitive registry.
4. A reference example in the Primitive Gallery.
5. Documented defaults and text limits.

Example:

```json
{
  "brand": "tigerclaw",
  "format": "youtube-16x9",
  "primitive": "tc.lowerThird",
  "startFrame": 90,
  "durationInFrames": 150,
  "props": {
    "name": "Brent Bryson",
    "title": "Founder, Tiger Claw",
    "variant": "standard"
  }
}
```

Unknown primitive names and invalid properties must fail closed with a useful validation path.

## Brand Law

- Orange is the primary brand, emphasis, motion, and action color.
- Green is reserved for success, confirmed states, live indicators, completed progress, and positive proof.
- Display typography uses Bebas Neue.
- Body and caption typography use Space Grotesk.
- Technical labels use IBM Plex Mono.
- The visual tone is aggressive, high-contrast, neo-brutalist, direct, and mechanical.
- Avoid generic SaaS gradients, soft corporate animation, excessive rounded cards, and playful motion.

## Motion Law

- Rendering is deterministic at 30 fps.
- Motion is based on Remotion frames, not wall-clock time.
- CSS transitions, CSS keyframes, and Tailwind animation utilities are forbidden in render code.
- Entrances are sharp and decisive.
- Bounce is allowed only for intentional impact.
- Default transitions remain at or below 15 frames.
- Intro bumpers remain 1.5–2.5 seconds.
- Outro bumpers remain 5–8 seconds and expose one dominant CTA.

## Separation Law

Tiger Claw is a named brand pack. It must not overwrite or contaminate the separate Brent AI/Two Brents channel identity in `Youtube-system`.

A production manifest must choose its brand explicitly.

## Change and Merge Law

- Build through small, reviewable pull requests.
- Existing web primitives must continue to build.
- No production merge occurs without Brent's explicit approval.
- Registry, schema, gallery, and documentation must remain synchronized through tests.
