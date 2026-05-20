# Claude Code — Mochi Collective Website Build Prompt

Copy the prompt below into Claude Code (or paste it as the first message in a Claude Code session). It assumes you have the entire `design_handoff_mochi_collective_website/` folder in your repo.

---

## Prompt to paste into Claude Code

> I'm building the **Mochi Collective** marketing website. In this repo, the folder `design_handoff_mochi_collective_website/` is the canonical design handoff:
>
> - `README.md` is the complete spec — page structure, every section's layout, design tokens, brand colors, the type scale, all copy, and behavior notes. **Read it end-to-end before writing code.**
> - `source/` contains the working HTML/JSX prototype the spec was authored from. It is a **reference**, not production code. Don't copy it verbatim — re-implement it idiomatically in this codebase.
> - `source/assets/` contains the brand icon SVG, the three logo color variants, and the Poppins + Inter font files. Move these into the right place for this project's stack (e.g. `public/`, `src/assets/`, or your framework's font loader).
>
> ### What I want you to build
>
> A single-page marketing site at `/` with these sections, in order, on one long scroll:
>
> 1. Fixed nav (logo + 3 anchor links + "Book a call" pill CTA)
> 2. Hero (`#top`) — display tagline + sub + two CTAs + 5-orb cluster on the right
> 3. Manifesto (`#manifesto` · 01)
> 4. Services / What We Do (`#work` · 02) — tabbed list of 5 practices with a detail panel
> 5. Methodology (`#method` · 03) — 3-step grid
> 6. Service Concierge (`#concierge` · 04) — 4-question interactive quiz that recommends a program
> 7. Contact (`#contact` · 05) — final CTA + email + booking link
> 8. Footer
>
> Lift all copy, the 5-practice data array, the `QUIZ_STEPS` array, and the `recommend()` decision table directly from `source/app.jsx` and `source/quiz.jsx` — those are hand-authored content, not placeholder text.
>
> ### How to build it
>
> - Use this project's existing framework, styling system, and component patterns. If the repo is empty, scaffold **Next.js (App Router) + TypeScript + Tailwind CSS**.
> - Port the design tokens listed in the README's "Design Tokens" section into the styling system (Tailwind `theme.extend`, or CSS variables — match what the project already does).
> - Self-host Poppins + Inter using the framework's font helper (e.g. `next/font/local`); don't load from a CDN.
> - Implement themes as `data-theme="light|beige|dark"` on `<html>`. **Default to `dark`** for now.
> - Use the **5-circle brand SVG** from `source/assets/mochi-icon.svg` for the nav mark — re-create it as a React/Vue/Svelte component that scales cleanly from a `size` prop.
> - The hero orb cluster can be a small inline SVG with subtle per-orb CSS-keyframe drift (6–11s `ease-in-out infinite alternate`, each orb on a different offset). The prototype uses canvas — you don't have to.
> - Reveal-on-scroll: implement with IntersectionObserver (threshold 0.12, rootMargin `0 0 -8% 0`); add an `in` class that fades from `opacity: 0; translateY(28px)` over `0.9s cubic-bezier(.22,1,.36,1)`. Honor `prefers-reduced-motion: reduce`.
> - Wire up:
>   - All anchor links use smooth scroll with a 60px offset.
>   - Service tabs activate on hover, focus, and click.
>   - "Book a call" (nav) and "Book a discovery call" (Contact + concierge result) all open `https://zcal.co/mochicollective/consultation` in a new tab.
>   - Email links (Contact row + footer) use `mailto:hello@mochicollective.com`.
> - Drop everything noted in the README's "Things to drop in production" — the `TweaksPanel` controls, the unused `Marquee`, the `data-comment-anchor` attributes, Babel-in-the-browser, the unused hero `type` and `image` variants.
> - Accessibility:
>   - Real landmarks (`<header><nav><main><section><footer>`).
>   - Keep `role="tablist" / role="tab" / aria-selected` on the Services tabs.
>   - Provide a "Skip to main content" link.
>   - Validate color-contrast for `--ink-soft` text on each theme.
>
> ### Before you start
>
> 1. Read `design_handoff_mochi_collective_website/README.md` fully.
> 2. Open `source/app.jsx`, `source/quiz.jsx`, `source/orb.jsx`, and `source/styles.css` and confirm where every spec value comes from.
> 3. Confirm the framework + styling decision with me before scaffolding if you're starting from scratch.
> 4. Then propose a file structure for the new implementation, and once I approve, build it section by section, starting with the design tokens + nav + hero.
>
> Be opinionated about TypeScript types, file structure, and component decomposition. Don't ask permission for small choices — just do it and tell me what you did.

---

## Quick reference (for you, the developer)

- **Booking URL** (used in 3 places): `https://zcal.co/mochicollective/consultation`
- **Primary email**: `hello@mochicollective.com`
- **Default theme**: `dark`
- **Default hero variant**: `orbs`
- **5 practice order**: Brand Experiences · Impact Measurement · Conferences & Events · Sponsor Programs · Community & Membership
- **Tagline (signature line)**: "Make it worth talking about."
