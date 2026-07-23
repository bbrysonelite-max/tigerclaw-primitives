# Tiger Claw — Canonical Brand Tokens

Human-readable companion to [`tokens.json`](./tokens.json). Every value below was copied verbatim from the source files on 2026-07-23 — nothing was invented or normalized.

## Source of truth

**`client/src/index.css` is canonical.** It defines the `--tc-*` semantic brand layer (light `:root` + dark `.dark`) and the shadcn oklch scaffold layer.

The root **`index.html` is a legacy static build** (the original Manus-generated single-file gallery) that duplicates tokens in an inline `tailwind.config` script and a `<style>` block. It is kept for reference; when the two disagree, `client/src/index.css` wins. Disagreements are logged below in **Drift found** — none were "fixed" here, per the additive-only rule.

## Colors — brand layer (`--tc-*`)

| Token | Dark (`.dark`) | Light (`:root`) |
|---|---|---|
| `tc-orange` | `#E8722A` | `#E8722A` |
| `tc-base` | `#0A0A0A` | `#f8f7f5` |
| `tc-surface` | `#1a1a1a` | `#ffffff` |
| `tc-ink` | `#050505` | `#f0eeeb` |
| `tc-text` | `#f5f5f5` | `#1a1a1a` |
| `tc-text-muted` | `rgba(255, 255, 255, 0.6)` | `rgba(0, 0, 0, 0.6)` |
| `tc-text-faint` | `rgba(255, 255, 255, 0.35)` | `rgba(0, 0, 0, 0.35)` |
| `tc-border` | `rgba(255, 255, 255, 0.08)` | `rgba(0, 0, 0, 0.1)` |
| `tc-card-bg` | `rgba(255, 255, 255, 0.02)` | `rgba(0, 0, 0, 0.03)` |
| `tc-card-hover` | `rgba(255, 255, 255, 0.04)` | `rgba(0, 0, 0, 0.05)` |
| `tc-input-bg` | `rgba(255, 255, 255, 0.05)` | `rgba(0, 0, 0, 0.04)` |

Greens (declared only in the legacy `index.html` tailwind config — see Drift found):

| Token | Value |
|---|---|
| `tc.green` | `#4ADE80` |
| `tc.greenDeep` | `#22C55E` |

Recurring literals that are used but never declared as tokens (reference only, not canonical):

| Literal | Value | Where |
|---|---|---|
| orange hover | `#ff8a3d` | `index.html` (`.soc-cta:hover`, chip mark hover) and `client/src/components/SocialPrimitives.tsx` |
| orange gradient top | `#ff9a5c` | `index.html` `.v-slider-fill` (`linear-gradient(to top, #E8722A, #ff9a5c)`) |

## Colors — shadcn scaffold layer (oklch)

Full light/dark sets are in `tokens.json` under `color.shadcn`. Highlights: `primary` / `accent` / `ring` / `chart-1` are all `oklch(0.65 0.18 45)` (the orange, in oklch) in both themes; dark `background` is `oklch(0.13 0.005 250)`, light `background` is `oklch(0.97 0.003 80)`.

## Fonts

| Role | Family | Weights loaded |
|---|---|---|
| Display | `"Bebas Neue", sans-serif` | 400 (single-weight face) |
| Body / UI | `"Space Grotesk", sans-serif` | 400, 500, 600, 700 |
| Mono / labels | `"IBM Plex Mono", monospace` | 400, 500, 600 (root `index.html`; the React client loads only 400, 500 — see Drift found) |

Declared in `client/src/index.css` as `--font-display`, `--font-body`, `--font-mono`.

## Radii

Base: `--radius: 0.5rem` (canonical, `client/src/index.css :root`).

| Token | Definition | Computed |
|---|---|---|
| `radius-sm` | `calc(var(--radius) - 4px)` | 0.25rem |
| `radius-md` | `calc(var(--radius) - 2px)` | 0.375rem |
| `radius-lg` | `var(--radius)` | 0.5rem |
| `radius-xl` | `calc(var(--radius) + 4px)` | 0.75rem |

## Layout

`.container` (canonical CSS): horizontal padding `1rem`, `1.5rem` at ≥640px, `2rem` at ≥1024px; `max-width: 1280px` at ≥1024px.

## Motion

- Standard easing: `cubic-bezier(0.4, 0, 0.2, 1)` (toggles, sliders, rings, bars — legacy `index.html` styles)
- Fade-in-on-scroll easing: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` (legacy `index.html` `.fade-in`)
- Named keyframes in canonical CSS: `fadeIn`, `scaleIn`, `barBounce`, `orbit`, `glitch1`, `glitch2`, `decrypt`, `electricPulse`, `particleFloat`, `counterPulse`, `dockBounce`

## Drift found

Between `client/src/index.css` + `client/index.html` (canonical) and the legacy root `index.html`:

1. **No conflicting values on shared tokens.** Every token declared in both places agrees exactly: dark `base #0A0A0A`, `surface #1a1a1a`, `ink #050505`, `orange #E8722A`, dark text `#f5f5f5`. The drift below is structural, not value drift.
2. **Greens are tokenized only in the legacy file.** `tc.green #4ADE80` and `tc.greenDeep #22C55E` exist as named tokens only in the root `index.html` tailwind config. The canonical `client/src/index.css` has no `--tc-green` / `--tc-green-deep`; the React client hardcodes `#4ADE80` as literals (e.g. `client/src/pages/Home.tsx`, `SocialPrimitives.tsx`). `#22C55E` usage in the client is likewise literal-only.
3. **IBM Plex Mono weight mismatch.** Root `index.html` loads `wght@400;500;600`; `client/index.html` loads only `wght@400;500`. The client uses semibold mono styling in places, so 600 would fall back to a synthesized weight there. Not fixed here (additive-only).
4. **Legacy config is dark-only.** The root `index.html` tailwind config declares only the dark palette (`base '#0A0A0A'`, `ink '#050505'`, …). The light theme (`base #f8f7f5`, `ink #f0eeeb`, `surface #ffffff`, …) exists only in canonical CSS.
5. **Font slot naming differs.** Canonical CSS maps Space Grotesk to `--font-body` with a plain `sans-serif` fallback; the legacy config maps it to `fontFamily.sans` with a `'system-ui', 'sans-serif'` fallback stack.

## Rules for consumers

- Read values from `tokens.json`; treat `client/src/index.css` as the ultimate authority if they ever disagree.
- Do not edit token values in this repo without checking all consumers (see README "Consumers").
