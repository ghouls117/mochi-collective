# Handoff: Mochi Collective Website

## Overview
A single-page marketing site for **Mochi Collective**, an experience-design studio that builds brand experiences, conferences, community programs and sponsor activations with measurable impact baked in. The page tells the story top-to-bottom (Hero → Manifesto → Practices → Methodology → Service Concierge → Contact) and ends in a clear booking CTA.

## About the Design Files
The files in `source/` are **design references created in HTML/JSX** — a working prototype showing the intended look, copy, layout and motion. They are **not production code to ship as-is**.

Your job is to **recreate this prototype in the target codebase's existing environment** (Next.js, Astro, Remix, Gatsby, plain Vite/React, Vue/Nuxt, SvelteKit, etc.) using its established patterns, component library, routing, and build pipeline. If no codebase exists yet, start a new Next.js (App Router) + Tailwind CSS project — it maps cleanly onto the structure below.

The prototype was built with React 18 + Babel-in-the-browser purely for in-browser iteration speed. In production you will want:
- A real build step (TypeScript, bundler, code-splitting, font-optimisation).
- Component files (`.tsx`) instead of one-big-Babel-blob `.jsx`.
- The `<style>` rules in `styles.css` migrated to your styling system of choice (CSS modules, Tailwind, vanilla-extract, etc.) — design tokens are listed below so this is mechanical.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, motion and copy are all locked. Implement pixel-faithfully.

## Tech Stack Used in the Prototype
- React 18.3.1 (UMD)
- Babel Standalone (in-browser JSX transpile — replace this in production)
- Vanilla CSS in a single `styles.css`
- Two self-hosted typefaces: **Poppins** (display) and **Inter** (body)
- Two small custom React components for the orb cluster and the concierge quiz
- A `<TweaksPanel>` design-time control that is **prototype-only** and should NOT ship to production (see "Things to drop in production" at the bottom)

## Page Structure (single route: `/`)

The page is one long scroll. Section IDs are used for in-page anchor navigation.

| # | Section | DOM id     | Purpose |
|---|---------|------------|---------|
| — | Nav     | (fixed)    | Logo, in-page links, "Book a call" CTA |
| 00 | Hero    | `#top`     | Tagline + sub + two CTAs + orb cluster |
| 01 | Manifesto | `#manifesto` | Position statement: "We report what *changed*" |
| 02 | Services / What We Do | `#work` | Tabbed list of 5 practices with detail panel |
| 03 | Methodology | `#method` | 3-step process grid (Strategy → Design → Proof) |
| 04 | Service Concierge | `#concierge` | 4-question interactive quiz that recommends a program |
| 05 | Contact / CTA | `#contact` | Final CTA + Calendly link + email |
| — | Footer  |            | Copyright + email + back-to-top |

Each section after the hero is introduced by a small uppercase "eyebrow" containing its number (e.g. `02 — WHAT WE DO`).

---

## Design Tokens

### Brand Colors (the five "orbs")
| Token | Hex | Role |
|---|---|---|
| `--pink`     | `#F6BEC9` | Brand Experiences |
| `--blue`     | `#7ECADF` | Conferences & Events |
| `--sage`     | `#BFDEA3` | Community & Membership |
| `--honey`    | `#F9C84A` | Sponsor Programs / selection-state accent |
| `--slate`    | `#93ADBF` | Impact Measurement |
| `--charcoal` | `#2A2A2A` | Dark surface / dark text |
| `--beige`    | `#F2E8DC` | Beige theme surface |

### Themed Tokens (drive `[data-theme="…"]` on `<html>`)

The site supports three themes — `light` (default), `beige`, and `dark` (the default in this build). Tokens are swapped at the `[data-theme]` boundary.

**Dark (current default)**
```
--bg:        #2A2A2A;  (charcoal)
--bg-2:      #1F1F1F;
--ink:       #F4F0E8;  (warm off-white — body text)
--ink-2:     #C8C2B5;  (secondary text)
--ink-soft:  #888377;  (tertiary / eyebrows)
--line:      #3A3A3A;
--card:      #1F1F1F;
--card-2:    #2A2A2A;
```

**Light**
```
--bg:        #FFFFFF;
--bg-2:      #FAF7F1;
--ink:       #2A2A2A;
--ink-2:     #555;
--ink-soft:  #888;
--line:      #E5DFD5;
--card:      #FFFFFF;
--card-2:    #FBF8F2;
```

**Beige**
```
--bg:        #F2E8DC;
--bg-2:      #EDE2D2;
--ink:       #2A2A2A;
--ink-2:     #4A463F;
--ink-soft:  #847E72;
--line:      #DDD5C8;
--card:      #FBF6EC;
--card-2:    #E8DCC8;
```

### Type Scale (responsive `clamp()`)
```
--t-display: clamp(56px, 11vw, 184px);   /* hero only */
--t-h1:      clamp(40px, 6.5vw, 84px);   /* every other section title */
--t-h2:      clamp(30px, 4.5vw, 56px);
--t-h3:      clamp(22px, 2.4vw, 30px);
--t-eyebrow: 11px;                       /* uppercase, .22em tracking */
--t-body:    17px;
--t-small:   13px;
```
Section subtitles ("ledes") + the Manifesto body all share **`clamp(17px, 1.4vw, 19px)`, line-height 1.6, color `--ink-2`** — keep this unified.

### Typography
- **Display / Headings**: `Poppins`, weights 400/500/600/700/800. Letter-spacing for big type is tight (`-0.02em` to `-0.03em`); for body it is `normal`. Headings use `text-wrap: balance`.
- **Body / UI**: `Inter` (variable, 100–900 + italic). Body line-height `1.55`, ledes `1.6`.
- Self-host both. Files live in `source/assets/fonts/`. Use `font-display: swap`.

### Spacing & Layout
- `--gutter: clamp(20px, 4vw, 64px)` — page-side gutter.
- `--maxw: 1240px` — `.wrap` max-width, centered.
- `--section-y: calc(140px * var(--sp))` — vertical padding per section. `--sp` is a density multiplier (`1` regular, `0.78` compact, `1.15` airy). For production, ship "regular" only unless you keep the Tweaks panel.
- Hero has `padding-bottom: 0` so it meets the Manifesto cleanly; Manifesto has `padding-top: calc(var(--section-y) * 0.4)` to tighten that join.

### Border Radius
- Buttons / pills: `999px`
- Cards / tab panel: `18px` (cards), `22px` (concierge quiz card)
- Images: `18px`
- Small chips: `14px`

### Motion
- Reveal-on-scroll: elements with `.reveal` get `opacity: 0; transform: translateY(28px)`; an IntersectionObserver adds `.in` to fade them up over `0.9s cubic-bezier(.22,1,.36,1)`. Stagger via `.reveal-d1` (80ms) … `.reveal-d4` (320ms).
- Button hover: `transform: translateY(-1px or -2px)`, arrow nudges `translateX(4px)`.
- Marquee scroll: 38s linear infinite.

### The "Gradient Accent"
All five brand colors blended left→right form the signature accent gradient used on emphasized words ("talking", "happened", "changed", "Five", "Three", "shape", "worth talking about"):

```css
background: linear-gradient(90deg, #F6BEC9 0%, #7ECADF 35%, #BFDEA3 60%, #F9C84A 100%);
-webkit-background-clip: text; background-clip: text; color: transparent;
```

It is applied to `.hero-title em`, `.manifesto h2 .accent`, `.services-head h2 .accent`, `.method h2 .accent`, `.concierge h2 .accent`, and `.cta h2 .accent`. In production, name this `.accent-gradient` and apply by class everywhere — don't keep one-off selectors per section.

---

## Section-by-Section Spec

### Nav (fixed top)
- Position: `fixed; top:0; left:0; right:0; z-index: 50`.
- Left: brand mark — the 5-circle "MiniCluster" SVG (42×42) + wordmark "Mochi" (Poppins 700, 18px, `-0.02em`) with sub "COLLECTIVE" beneath (Inter 500, 9px, `.28em` tracking, color `--ink-soft`).
- Right: three text links + one pill CTA.
  - Text links: 13px, weight 500, color `--ink-2`, hover `--ink`. **Copy is exactly**: "What We Do", "The Methodology", "Service Concierge".
  - CTA pill — "Book a call": `padding 10px 18px; border-radius 999px; background: var(--ink); color: var(--charcoal); font-weight: 600; font-size: 13px`. **Links externally to `https://zcal.co/mochicollective/consultation`** (opens in new tab, `rel="noopener"`).
- Scroll behavior: when `window.scrollY > 30`, add `.scrolled` class. Scrolled state adds a blurred backdrop and a 1px bottom border:
  ```
  background: color-mix(in oklab, var(--bg) 80%, transparent);
  backdrop-filter: blur(18px) saturate(140%);
  border-bottom-color: var(--line);
  ```
- Mobile (≤720px): hide all text links **except** the CTA pill.

### Hero (#top)
- `min-height: 100vh; padding-top: 120px; padding-bottom: 0`.
- 2-column grid `minmax(0, 1.1fr) minmax(0, 1fr)` (stacks below 900px).
- Left column:
  - Eyebrow: "Experience design · Strategy · Proof"
  - H1 (`.display`, var(--t-display)): "Make it / worth *talking* / about." — `<em>talking</em>` gets the gradient.
  - Sub: one paragraph at `clamp(17px, 1.5vw, 20px)`, color `--ink-2`, max-width `52ch`.
  - Two buttons:
    - **Primary** — "Start with the Concierge →" : scrolls to `#concierge`. Style: `background: var(--ink); color: var(--bg); padding: 16px 26px; border-radius: 999px; font-size: 14px; font-weight: 500`. Hover: `translateY(-2px)`.
    - **Ghost** — "See what we do" : scrolls to `#work`. Style: `border: 1px solid var(--line); color: var(--ink)`. Hover: bg `var(--card-2)`, border `var(--ink-soft)`.
- Right column: **orb cluster** — five animated brand-colored orbs arranged in the same 5-circle constellation as the logo. The prototype's `OrbCluster` uses canvas + procedural drift; in production a static SVG with subtle CSS-keyframe drift (per-orb `transform: translate(...)` with different durations 6–11s ease-in-out infinite alternate) is acceptable and lighter.
- There is also a `data-variant="type"` (no orbs, bigger type) and `data-variant="image"` (4:5 photo slot) for future use. **Default ships as `orbs`.**

### Manifesto (#manifesto · 01 — Position)
- 2-column grid `1fr 1.6fr`, gap `clamp(30px, 6vw, 100px)`, stacks below 900px.
- Left column:
  - Eyebrow "01 — Position"
  - H2 (`.h1`): "We don't report what **happened**. We report what **changed**." Both bold words get the gradient via `<span class="accent">`.
- Right column (`.manifesto-body`): three short paragraphs, stacked with 22px gap, max-width `58ch`. Last paragraph: "The events do the talking. We make sure they say something worth repeating." When this column is wider than 900px, add `padding-top: 38px` to optically align the first paragraph with the H2 below the eyebrow.

### Services / What We Do (#work · 02 — What We Do)
- Background swap to `var(--bg-2)`.
- Head: eyebrow + H2 `Five practices. One operating system.` ("Five" and "One" use `.accent` gradient) + lede paragraph below.
- Body: 2-column grid `minmax(280px, 1fr) minmax(0, 1.7fr)` (stacks below 900px).
  - **Left: tab list.** Vertical list with top + bottom hairlines. Each row:
    - 2-digit number (Inter 11px, `.18em` tracking, `--ink-soft`)
    - Label (Poppins 600, `clamp(20px, 2vw, 26px)`, `--ink-2`; goes to `--ink` when active)
    - Color dot (12px, the practice's brand color; opacity .35 idle, 1 + scale(1.2) when active)
    - Arrow → (only visible when active)
    - On hover / active: row gets `padding-left: 14px` (subtle "pull-in").
    - Active state is set on `onMouseEnter`, `onFocus` AND `onClick`.
  - **Right: detail panel.** Card: `background: var(--card); border: 1px solid var(--line); border-radius: 18px; padding: clamp(28px, 4vw, 48px); min-height: 460px`. Grid `auto 1fr auto`.
    - Header: stacked column — a 38px circle in the practice's color, then the title in Poppins 700 at `clamp(28px, 3vw, 38px)`. Titles are auto-split on sentence boundaries so multi-sentence titles like "Programs that compound. Rooms people protect." break onto separate lines.
    - Body: paragraph (`clamp(16px, 1.3vw, 18px)`, `--ink-2`, max-width `60ch`) then a 2-col bulleted list (single column below 620px). Bullets are rendered as 6px round dots in `currentColor` at opacity .35.
    - Footer: hairline-top row, `12px .14em uppercase --ink-soft`. Left: "Practice / 01". Right: "Strategy · Design · Proof".

**The 5 practices (in order — order matters):**

| # | Label | Dot | Title | Body (short) | Bulleted list (4 items) |
|---|---|---|---|---|---|
| 01 | Brand Experiences | `#F6BEC9` | Launches, activations, immersive moments. | A single magnetic moment, engineered to over-index where it matters — press, social, word of mouth, the room behind the room. Designed so we can measure what changes after the doors close. | Concept + creative direction · Spatial + scenic design · Casting, talent, hosting · Social + content strategy |
| 02 | Impact Measurement | `#93ADBF` | The proof model is the brief. | A measurement frame your stakeholders, your sponsor / target accounts or pipeline, and your team that will all trust. We design measurement in — not bolt it on at the end — so the report is a by-product of the experience itself. | Pre / post structure design · Pre, during, and post engagement · Stakeholder-facing reporting · Social + content strategy |
| 03 | Conferences & Events | `#7ECADF` | End-to-end stage programs that pay for themselves. | Multi-day, multi-stage programs built around sponsor outcomes from day one. We design the curation, the room logic and the throughline so the value lasts past Friday afternoon. | Membership design · Sponsor coordination · Production + technical · Pre / during / post measurement |
| 04 | Sponsor Programs | `#F9C84A` | ROI-first design for the people writing the cheque. | Sponsor-grade activations engineered for renewal. We align the experience to the partner's real metric and ship a report they can hand straight to their reporting stakeholders. | Sponsor KPI to experience design · Native partner integrations · Renewal-grade reporting · Outcome conversion + relationship depth report |
| 05 | Community & Membership | `#BFDEA3` | Programs that compound. Rooms people protect. | Members-first programming designed to compound. Each gathering earns the next, each format makes the brand more defensible, each host stays on-tone three years in. | Concept + creative direction · Native partner integrations · Members integration + retention frameworks · Curation systems |

### Methodology (#method · 03 — THE METHODOLOGY)
- Head row: H2 `Three steps. Same operating model.` ("Three" gets the gradient accent) on the left; a 38-char-max lede on the right ("Every engagement runs the same shape — from a single dinner to a four-day summit.").
- Below: a 3-column grid of cells joined by 1px hairlines (`gap: 1px; background: var(--line)`). Stacks to 1 column below 820px.
- Each cell (`min-height: 320px; padding: 44px 30px 60px`):
  - Step label: a colored 26px circle with the step number (Poppins 600 11px, charcoal text) + `Step 0N` in uppercase tracking.
  - H3 (Poppins 700, `clamp(28px, 3vw, 36px)`): "Strategy" / "Design" / "Proof".
  - Paragraph, 15px, `--ink-2`, max-width `36ch`.
- Step colors: Strategy = pink, Design = sage, Proof = honey.
- Cells reveal with staggered delays (80ms · i).

### Service Concierge (#concierge · 04 — SERVICE CONCIERGE)
- Background: `var(--bg-2)` (matches the Services section). Text inherits the regular theme `--ink` / `--ink-2`.
- Eyebrow + H2 `Four questions. A shape for your event by Friday.` ("shape" gets the gradient).
- Concierge lede max-width `60ch`, then the interactive quiz card.
- **Quiz card** — `padding: clamp(28px, 4vw, 48px); border-radius: 22px; background: rgba(255,255,255,.04); border: 1px solid rgba(255,255,255,.12); min-height: 460px`. Two-column grid `280px 1fr` (stacks below 820px).
  - **Left (`.quiz-side`)**: bordered-right column with a 10px uppercase "Concierge" pill, a 19px Poppins title ("What you're planning"), and a 4-row "steps" list. Each step: a 18px outlined circle (filled white when done, filled honey when current) + the step name. Steps clickable to jump back.
  - **Right (`.quiz-main`)**: large question (Poppins 600, `clamp(24px, 3vw, 36px)`, `max-width: 22ch`), tiny helper, and a 2-column grid of option cards (one column below 620px). Cards have a small colored dot inside the title, a sub-line, hover `translateY(-2px)`, selected state gets `border-color: var(--honey); background: rgba(249,200,74,.08)`.
  - **Footer (`.quiz-foot`)**: step counter on the left, "Back" + "Next" pill buttons on the right. Primary "Next" pill: white bg, charcoal text; honey on hover.
- **Result step** (after question 4): tag "Recommended program", a 28–40px Poppins 700 program name, a paragraph, a 4-col recap grid (Format · Pressure · Timing · Budget), and two CTAs: "Book a discovery call →" (primary, links to the zcal URL) + "Restart".
- See `source/quiz.jsx` for the full `QUIZ_STEPS` array (4 steps × 4 options each) and the `recommend()` lookup table that maps `kind` + `pressure` to a result name, headline and body. **Lift this data verbatim** — it is hand-tuned copy.

### Contact / CTA (#contact · 05 — Get in)
- `padding: clamp(80px, 14vw, 200px) 0 calc(var(--section-y) * 0.5)`.
- 2-col grid `minmax(0, 1.4fr) minmax(0, 1fr)`, gap 60px, align-end. Stacks below 820px.
- Left column:
  - Eyebrow "05 — Get in"
  - H2 (`.h1`, but at `font-size: clamp(24px, 4vw, 60px)` — explicitly halved from a normal H2): "Let's make / the next one / **worth talking about**." — "worth talking about" wears the gradient.
- Right column:
  - Primary pill CTA "Book a discovery call →" — links to `https://zcal.co/mochicollective/consultation` (new tab, `rel="noopener"`).
  - Row: label "Email" / value `<a href="mailto:hello@mochicollective.com">hello@mochicollective.com</a>` (no underline — global `a { text-decoration: none }`).
  - Row: label "Response time" / value "Inside 72 hours, on weekdays".

### Footer
- 1px top border, `padding: 40px var(--gutter)`, flex-row space-between (wraps).
- Left: `© 2026 Mochi Collective. Make it worth talking about.`
- Right: `hello@mochicollective.com` (mailto) and "Back to top ↑" (smooth-scrolls to `0,0`).
- 13px, `--ink-soft`.

---

## Interactions Summary

| Interaction | Behavior |
|---|---|
| Nav anchor click | `e.preventDefault()`, smooth-scroll to `#id` minus 60px offset. |
| Nav scroll | After 30px scrolled, add backdrop-blur + border. |
| Reveal-on-scroll | `.reveal` → `.reveal.in` via IntersectionObserver, threshold 0.12, `rootMargin: 0 0 -8% 0`. |
| Service tab activation | Updates active index on `onMouseEnter`, `onFocus`, `onClick`. Panel re-keys on index change so CSS transitions replay. |
| Concierge quiz | Step state machine `0..3` + `done`. Picking an option advances; back button steps back; result step exposes "Restart". |
| Marquee | (Currently not mounted but available — 38s linear infinite horizontal scroll. See `Marquee` in `app.jsx`.) |
| Buttons | Hover translates Y by 1–2px, arrow translates X by 4px. |
| Theme switching | `[data-theme]` attribute on `<html>`. Three values: `light` · `beige` · `dark` (current default). |

---

## State Management
Tiny — all client, no fetching:
- `Nav`: `scrolled` boolean from scroll listener.
- `Services`: `active: number` (the selected tab index, default `0`).
- `Concierge`: `step: number`, `answers: { kind, pressure, when, budget }`.
- No persistence needed. No analytics in the prototype — wire up your own.

---

## External Links (book these into your env or constants)
- Calendly-style booking: `https://zcal.co/mochicollective/consultation` (used in nav CTA, concierge result CTA, and the final Contact CTA).
- Primary contact email: `hello@mochicollective.com` (used in Contact row and footer link).

---

## Assets

Provided in `source/assets/`:
- **Fonts** (`assets/fonts/`):
  - `Poppins-Regular.ttf`, `Poppins-Medium.ttf`, `Poppins-SemiBold.ttf`, `Poppins-Bold.ttf`, `Poppins-ExtraBold.ttf`
  - `Inter.ttf` (variable, 100–900), `Inter-Italic.ttf` (variable italic)
- **Logo / Icon**:
  - `assets/mochi-icon.svg` — the canonical 5-circle brand mark (`viewBox="-7 -20 114 114"`, five circles at the exact brand coordinates). This is the source of truth for the nav `MiniCluster` and any favicon / app-icon you generate.
  - `assets/logo-beige.svg`, `assets/logo-dark.svg`, `assets/logo-white.svg` — provided color variants.
- No raster images in the design. The hero `data-variant="image"` slot is a placeholder for a future 4:5 photograph.

---

## File Map

`source/index.html`
The HTML shell. Loads React + Babel CDNs, then the four `<script type="text/babel">` files in this order: `tweaks-panel.jsx`, `orb.jsx`, `quiz.jsx`, `app.jsx`. **Production should replace this with your framework's normal entry (Next.js page, Astro page, etc.)** and bundle the JSX.

`source/app.jsx`
The whole page composition. Contains: `Nav`, `Hero`, `Marquee` (unused), `Manifesto`, `SERVICES` data array, `Services` (tabbed), `METHOD` data array, `Method`, `ConciergeSection`, `Contact`, `App`. Plus a tiny `useReveal()` IntersectionObserver hook and a `scrollToId()` helper. **The `SERVICES` and `METHOD` arrays are the canonical content — port them verbatim.**

`source/quiz.jsx`
The concierge quiz: `QUIZ_STEPS` array (4 steps × 4 options), a `recommend(answers)` function with the full kind×pressure decision table, and the `Concierge` React component (steps + result + restart).

`source/orb.jsx`
Two components: `OrbCluster` (the canvas-animated hero orb constellation) and `MiniCluster` (the static SVG used in the nav, also exported on `window`). The MiniCluster uses the exact brand-icon SVG path (`viewBox="-7 -20 114 114"`); copy that geometry into your own component.

`source/tweaks-panel.jsx`
Prototype-only design-time UI for live-toggling theme / hero variant / density. **Do not ship this.** Strip the `useTweaks` hook and `<TweaksPanel>` usage from `app.jsx` and hard-pin the defaults (theme: `dark`, heroVariant: `orbs`, density: `regular`).

`source/styles.css`
All CSS in one file. Read top-to-bottom — sections are clearly commented (`/* ─── Nav ─── */`, `/* ─── Hero ─── */`, etc.). Port to your styling system; tokens are listed in this README.

---

## Recommended Production Stack

If you're starting from scratch:
- **Framework**: Next.js (App Router) or Astro — both handle a single static landing page well, and Next.js gives you straightforward image/font optimisation if the brief grows.
- **Styling**: Tailwind CSS (port the tokens to `tailwind.config.ts`) or vanilla CSS modules. The design uses CSS variables heavily — Tailwind's `@theme` / arbitrary-value escape hatch is fine.
- **Fonts**: Use `next/font` (or Astro's font integration) to self-host Poppins + Inter rather than `@font-face` from CDNs.
- **Animation**: The current `.reveal` IntersectionObserver pattern is fine. If you want polish, swap to `framer-motion` for the hero and section reveals; keep the canvas-or-SVG orb cluster lightweight.
- **Accessibility checklist**:
  - Real semantic landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
  - Service tabs already use `role="tablist"` / `role="tab"` / `aria-selected` — keep that.
  - Concierge quiz options should be `<button>` elements (they are).
  - Color contrast: the dark theme's `--ink-2` on `--bg` is around 8:1 — fine. Validate `--ink-soft` (eyebrows) per WCAG AA on each theme.
  - Reduced motion: the marquee + orb drift should respect `prefers-reduced-motion: reduce`.

---

## Things to drop in production

1. **`tweaks-panel.jsx`** and every `TweaksPanel`, `TweakSection`, `TweakRadio`, `useTweaks` reference in `app.jsx`. The defaults at the top of `app.jsx` (`theme: "dark"`, `heroVariant: "orbs"`, `density: "regular"`) become hardcoded values.
2. **The `Marquee` component** in `app.jsx` (it is defined but not currently mounted in `<App>`). Either delete it or, if you want it, mount it under the hero.
3. **Babel-in-the-browser**. Use your framework's normal build step. This will also let you switch to TypeScript.
4. **The "Type" and "Image" hero variants** unless you intend to ship them. The default is `orbs`.
5. **Inline `data-comment-anchor` attributes** scattered through `app.jsx` — these are prototyping affordances and serve no production purpose.

---

## Brand voice / copy notes

The voice is **plainspoken, slightly skeptical, operator-y**. Sentences are short, often with em-dashes. The site keeps repeating one phrase: *"Make it worth talking about."* Lean into that — don't soften it, don't add filler.
