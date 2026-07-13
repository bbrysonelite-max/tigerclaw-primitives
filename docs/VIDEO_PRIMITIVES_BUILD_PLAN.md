# Tiger Claw Video Primitives Build Plan

## Delivery Law

- Work only through reviewable pull requests.
- Never merge without Brent's explicit approval.
- Existing web primitives must continue to build.
- Tiger Claw remains a named brand pack; it must not overwrite the separate Brent AI channel identity.
- Every primitive must be deterministic at 30 fps and callable through typed props and a validated JSON manifest.

## Phase 0 — Architecture and Contracts

Deliver:

- system charter
- canonical brand tokens
- canonical motion tokens
- supported format definitions
- primitive naming registry
- manifest and prop contracts
- repository boundary documentation

Pass gate:

- no existing application code changed
- no duplicated brand values introduced outside canonical tokens
- architecture is approved before runtime dependencies are added

## Phase 1 — Remotion Workspace

Deliver:

- isolated `video/` workspace
- Remotion root and configuration
- shared layout, typography, safe-zone, and animation helpers
- 16:9, 9:16, and thumbnail compositions
- typecheck and render-check scripts

Pass gate:

- existing Vite gallery builds unchanged
- Remotion Studio opens
- one still renders in each required format
- no CSS or Tailwind animation is used in render code

## Phase 2 — Core Communication Primitives

Deliver:

- lower third
- headline super
- statistic callout
- quote card
- notification/CTA popup
- caption track
- thumbnail composition

Pass gate:

- horizontal and vertical examples render correctly
- long text fails clearly or scales within documented limits
- all copy is prop-driven
- safe zones are enforced

## Phase 3 — Structure and Navigation Primitives

Deliver:

- chapter progress bar
- timeline marker
- countdown
- step indicator
- intro bumper
- outro bumper

Pass gate:

- intro remains 1.5–2.5 seconds
- outro supports one dominant CTA
- progress primitives accept dynamic duration and chapter data

## Phase 4 — Transitions and Backgrounds

Deliver:

- claw swipe
- orange streak
- restrained glitch cut
- technical grid loop
- sparse particle loop
- dark gradient shift
- orange energy streak

Pass gate:

- transitions remain at or below 15 frames by default
- backgrounds remain subtle behind presenters and screens
- no animation depends on wall-clock time or browser state

## Phase 5 — Audio Integration

Deliver:

- replaceable logo-hit interface
- transition-swoosh interface
- notification-hit interface
- volume, trim, and timing props
- placeholder asset documentation

Pass gate:

- missing audio assets fail clearly or degrade safely
- audio files remain independent replaceable assets

## Phase 6 — Registry and Manifest Engine

Deliver:

- stable `tc.*` primitive registry
- Zod discriminated-union manifest schema
- manifest renderer
- validation errors with exact primitive and property paths
- example manifests

Pass gate:

- every primitive can be invoked through JSON
- unknown primitive names fail closed
- invalid props cannot silently render

## Phase 7 — Gallery and Reference Assembly

Deliver:

- complete Primitive Gallery
- horizontal and vertical reference samples
- HeyGen-style presenter placeholder assembly
- screen-recording placeholder
- captions, lower third, transition, CTA, and outro in one composition
- reference stills

Pass gate:

- every registered primitive appears in the gallery
- all samples render from the registry rather than private component calls

## Phase 8 — YouTube Studio Consumer

Target repository: `Youtube-system`

Deliver:

- `studio/brands/tigerclaw.ts` adapter
- episode manifest convention
- render-output convention
- separation from `brent-ai` brand pack
- example Tiger Claw episode manifest

Pass gate:

- YouTube system consumes Tiger Claw contracts without redefining the brand
- Brent AI identity remains unchanged

## Phase 9 — CI and Visual Regression

Deliver:

- typecheck gate
- web build gate
- Remotion bundle/render gate
- manifest validation tests
- representative still-frame snapshots
- registry completeness test

Pass gate:

- all required checks are green
- registry, schemas, and gallery cannot drift silently

## Phase 10 — Production Readiness

Deliver:

- usage documentation
- agent calling examples
- versioning policy
- deprecation policy
- release checklist
- exported reference renders

Final standard:

A human or agent can choose the Tiger Claw brand, select a supported format, call a stable primitive by name, supply validated data, preview it, and render deterministic branded output without manually recreating design decisions.
