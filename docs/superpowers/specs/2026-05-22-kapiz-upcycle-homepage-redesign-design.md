# Kapiz Upcycle — Homepage Redesign Design

**Date:** 2026-05-22
**Status:** Approved design — ready for implementation planning

## Goal

Redesign the Kapiz Upcycle single-page site so it looks professional and
generates **leads for fully custom, commissioned jewelry**. There is no pricing
and no checkout — every piece is custom, so the page's job is to build desire,
show that ordering a custom piece is easy, and convert visitors into inquiries.

### Success criteria

- The page reads as a premium, professional handcrafted-jewelry brand.
- The jewelry photography is the visual focus and is showcased with motion.
- A visitor always has an obvious next step ("Start a Custom Order").
- Leads can be captured three ways: on-site form, Facebook Messenger, Instagram DM.
- No regressions: same React + Vite + Tailwind + shadcn/ui stack, single route,
  existing `/api/contact` (Resend) integration preserved.

## Scope

**In scope:** Full visual + structural redesign of the existing single-page site
(`src/pages/Index.tsx` and its section components).

**Out of scope:** Pricing, e-commerce/checkout, multi-page routing, a CMS, new
runtime dependencies, backend changes beyond what the contact form already does.

## Approach

Approach B — full conversion-focused redesign. Keep the existing section
components but restyle and re-purpose each around the custom-order funnel:
hook → desire → "getting one is easy" → proof → convert. Single page, same
stack, no new routes, no new dependencies.

## 1. Visual Foundation

### Color system

Replaces the current dark `#615e5f` theme with a light, airy boutique palette.
Colors are locked to the brand logo so the site and logo feel unified.

| Token | Value | Use |
|---|---|---|
| `--background` | Ivory `#FAF7F0` | Page base |
| `--card` / surface | Soft white `#FFFDF9` | Cards, panels |
| `--foreground` | Charcoal `#2B2826` | Headings and body text |
| `--muted-foreground` | Warm gray `#6B635B` | Captions, supporting text |
| Brand gold (`--primary`) | Marigold `#E5A828` | Button fills, KK mark, icons, dividers, accents |
| Deep gold | `#A6781F` | Gold *text* on light backgrounds (readability) |
| `--secondary` | Seafoam `#D3E2DC` | Eco accents, soft section bands |
| `--border` | Warm sand `#E8E1D5` | Hairline dividers, card edges |
| Footer band | Charcoal `#2B2826` | Dark footer (matches logo background) |

Key shift: today *all* text is gold, which flattens the page. In the redesign,
text is charcoal and **gold becomes a true accent** — used on buttons, icons,
dividers, and the logo mark only. Gold button fills always pair with charcoal
text; gold *text* on ivory uses the deeper `#A6781F`.

All colors are defined as HSL CSS variables in `src/index.css`; both `:root` and
`.dark` blocks are updated (the site does not need a separate dark mode — `.dark`
mirrors `:root`). `tailwind.config.ts` custom tokens (`gold`, `taupe`, `cream`,
`seafoam`, `driftwood`) are updated to match.

### Typography

Keep the existing pairing: **Playfair Display** (headings) + **Poppins** (body).
Refine the scale — larger, lighter-weight hero headings with slightly increased
letter-spacing for an elegant boutique feel. Headings render in charcoal.

### Components & spacing

- `rounded-xl` cards with soft, light-theme-appropriate shadows.
- Generous whitespace and a consistent vertical rhythm (uniform section padding).
- Section heading treatment: charcoal heading with a short gold underline accent.

### Logo handling

Two logo assets already exist:

- `src/assets/kapiz-logo.png` — ornate gold "KK" mark, **transparent background**.
- `src/assets/logo.png` — full lockup (mark + wordmark + tagline) with a dark
  background baked in.

Placement:

- **Navbar:** transparent gold KK mark + "Kapiz Upcycle" rendered as crisp
  Playfair Display text in charcoal, with a small gold "Sustainable Artistry"
  tagline. Keeps the header light and airy.
- **Hero:** the transparent gold KK mark featured over the hero image.
- **Footer:** dark charcoal band where the full `logo.png` lockup sits cleanly.

## 2. Page Structure

Single page, sections in funnel order. New/renamed sections noted.

| # | Section | Purpose & changes |
|---|---|---|
| 1 | **Navbar** | Light/airy. Logo + nav links + persistent "Start a Custom Order" button. Existing scroll-shadow and mobile menu behavior retained, restyled. |
| 2 | **Hero** | Light image overlay (replaces dark 60% overlay). Gold KK mark, elegant headline, two CTAs — "Start Your Custom Piece" (primary → Contact) and "View Our Work" (secondary → Portfolio). Trust strip: *Handcrafted · One-of-a-kind · Eco-conscious*. |
| 3 | **Mission** | Restyled light. Two-column "who we are / our promise" — builds trust quickly. |
| 4 | **Portfolio** *(was Gallery)* | Reframed as an inspiration showcase, not a shop. No pricing. Each card CTA becomes "Request Something Like This" (→ Contact). Click a piece → Lightbox. Animation centerpiece (see §3). |
| 5 | **How Custom Orders Work** *(was Process)* | Friction-remover. Four steps: Share Your Vision → We Design Together → Handcrafted for You → Delivered. Ends with a CTA. |
| 6 | **Materials** | Restyled light — "what your piece can be made from." Reinforces craft and credibility. |
| 7 | **Testimonials** | Add star ratings and reviewer context. Elegant light cards. |
| 8 | **Eco Promise** | Restyled light — values/trust reinforcement before the ask. |
| 9 | **Contact** *(Lead Capture hub)* | Conversion point. Form re-labeled for custom orders (Name, Email, "Describe your dream piece"). Prominent Facebook Messenger and Instagram DM buttons alongside the form. Preserves existing `/api/contact` POST + Resend + Sonner toast behavior. |
| 10 | **Footer** | Dark charcoal band, full logo lockup, nav links, social links. |

### Floating CTA

A `FloatingCTA` component — a "Start a Custom Order" button that appears after
the user scrolls past the hero and stays reachable (bottom-right on desktop,
full-width-friendly on mobile). Scrolls to the Contact section. Does one gentle
attention-pulse when it first appears.

### Components to build vs. restyle

- **New:** `FloatingCTA`, a portfolio `Lightbox` (built on the existing shadcn
  `Dialog`), and a `useScrollReveal` hook (shared reveal logic).
- **Reworked:** `Process` → `CustomOrderProcess` (renamed, new content/steps).
- **Restyled only:** `Navbar`, `Hero`, `Mission`, `Gallery` → `Portfolio`,
  `Materials`, `Testimonials`, `Contact`, `EcoPromise`, `Footer`.
- The contact route nav links in `Navbar` and `Footer` are updated to match the
  renamed sections.

## 3. Jewelry Showcase Animations

All animations use CSS keyframes + `IntersectionObserver` + the already-installed
`embla-carousel-react`. **No new dependencies.** Only GPU-friendly properties
(`transform`, `opacity`).

### Hero — cinematic entrance

- Slow Ken Burns drift on the hero image (~20s gentle zoom loop).
- Gold KK mark fades + scales in, then a shimmer sweep glints across it.
- Headline reveals line-by-line; CTAs fade up after; scroll cue gently bounces.

### Portfolio — centerpiece showcase

- **Staggered scroll reveal** — pieces cascade up + scale in as they enter view.
- **Signature shine-sweep on hover** — a soft diagonal gold-white gradient glides
  across each piece, mimicking light catching a gem. Implemented as a reusable
  utility class.
- On hover: image slow-zooms, card lifts with a warm shadow, a details overlay
  (name · materials) slides up with the "Request Something Like This" CTA.
- **Click → Lightbox** — shadcn `Dialog` opens with a smooth scale-fade: large
  image, full story, prev/next navigation, and the custom-order CTA inline.

### "How Custom Orders Work"

- The connecting line between the four steps draws itself in on scroll.
- Step icons pop in sequence.

### Site-wide polish

- `useScrollReveal` hook gives every section a consistent fade-up on entry.
- Section headings get a gold underline that draws in.
- Buttons: gold fill + subtle lift on hover.
- Testimonials reveal with a soft stagger.

### Performance & accessibility

- Honors `prefers-reduced-motion` — large motion is disabled when requested.
- Off-screen sections do not animate until visible (`IntersectionObserver`).
- Transforms/opacity only, so motion stays smooth on mobile.

## Technical Notes

- Stack unchanged: Vite + React 18 + TypeScript + Tailwind + shadcn/ui.
- No new runtime dependencies; no new routes (`/` stays the only content route).
- Theme changes are centralized in `src/index.css` and `tailwind.config.ts`.
- `index.html` keeps the existing Google Fonts (Playfair Display + Poppins).
- Existing animation keyframes/utilities in `src/index.css` are extended (not
  removed) with the new effects (shine-sweep, Ken Burns, line-draw).
- The `/api/contact` endpoint and Resend integration are unchanged.

## Open Questions

None — design approved across all three sections (visual foundation, page
structure, animations).
