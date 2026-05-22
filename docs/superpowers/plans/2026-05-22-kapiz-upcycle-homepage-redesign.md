# Kapiz Upcycle Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Kapiz Upcycle single-page site into a professional, light & airy boutique lead-gen funnel for fully custom jewelry, with jewelry-showcase animations.

**Architecture:** Keep the existing section components; restyle and re-purpose each around a custom-order funnel (hook → desire → "ordering is easy" → proof → convert). Centralize the new light theme in `src/index.css` + `tailwind.config.ts`. Add three shared building blocks (a scroll-reveal hook, a section heading, a floating CTA) and a portfolio lightbox. Single route, no new dependencies.

**Tech Stack:** Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + lucide-react + sonner.

**Verification note:** This project has no unit-test framework, and adding one is out of scope. Each task is verified by `npm run build` (catches import/JSX/bundling errors) and, where noted, `npm run lint`. The final task adds a manual visual check in the dev server. This is the honest verification available for a visual redesign — do not claim a task passes without running the stated command and seeing the stated output.

---

## File Structure

**Created:**
- `src/hooks/useScrollReveal.ts` — reusable IntersectionObserver reveal hook
- `src/components/SectionHeading.tsx` — heading + animated gold underline
- `src/components/FloatingCTA.tsx` — scroll-activated floating "Start a Custom Order" button
- `src/components/Portfolio.tsx` — renamed from `Gallery.tsx`, with lightbox
- `src/components/CustomOrderProcess.tsx` — renamed from `Process.tsx`, reworked

**Modified:**
- `src/index.css` — light theme tokens + animation keyframes/utilities
- `tailwind.config.ts` — custom color tokens
- `src/components/Navbar.tsx`, `Hero.tsx`, `Mission.tsx`, `Materials.tsx`, `Testimonials.tsx`, `Contact.tsx`, `EcoPromise.tsx`, `Footer.tsx` — restyled
- `src/pages/Index.tsx` — section order, imports, FloatingCTA

**Deleted (via `git mv`):**
- `src/components/Gallery.tsx` → `Portfolio.tsx`
- `src/components/Process.tsx` → `CustomOrderProcess.tsx`

---

## Task 1: Design tokens & global styles

**Files:**
- Modify: `src/index.css` (full rewrite)
- Modify: `tailwind.config.ts` (colors block)

- [ ] **Step 1: Replace `src/index.css` with the light theme**

Overwrite the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Kapiz Upcycle design system — light & airy boutique. All colors HSL. */

@layer base {
  :root {
    --background: 40 38% 96%;        /* ivory #FAF7F0 */
    --foreground: 30 6% 16%;         /* charcoal #2B2826 */

    --card: 40 56% 99%;              /* soft white */
    --card-foreground: 30 6% 16%;

    --popover: 40 56% 99%;
    --popover-foreground: 30 6% 16%;

    --primary: 41 78% 53%;           /* marigold gold #E5A828 */
    --primary-foreground: 30 6% 16%; /* charcoal text on gold */

    --secondary: 150 24% 86%;        /* seafoam #D3E2DC */
    --secondary-foreground: 30 6% 16%;

    --muted: 40 24% 92%;
    --muted-foreground: 30 8% 40%;   /* warm gray #6B635B */

    --accent: 40 33% 92%;
    --accent-foreground: 30 6% 16%;

    --destructive: 0 72% 51%;
    --destructive-foreground: 40 38% 96%;

    --border: 38 29% 87%;            /* warm sand #E8E1D5 */
    --input: 38 29% 87%;
    --ring: 41 78% 53%;

    --radius: 0.75rem;

    /* Custom brand tokens */
    --gold: 41 78% 53%;
    --gold-deep: 40 69% 39%;         /* readable gold text on light #A6781F */
    --charcoal: 30 6% 16%;
    --cream: 40 38% 96%;
    --seafoam: 150 24% 86%;

    --transition-smooth: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    --sidebar-background: 40 38% 96%;
    --sidebar-foreground: 30 6% 16%;
    --sidebar-primary: 41 78% 53%;
    --sidebar-primary-foreground: 30 6% 16%;
    --sidebar-accent: 40 33% 92%;
    --sidebar-accent-foreground: 30 6% 16%;
    --sidebar-border: 38 29% 87%;
    --sidebar-ring: 41 78% 53%;
  }

  /* No separate dark mode; .dark mirrors :root so the site stays light. */
  .dark {
    --background: 40 38% 96%;
    --foreground: 30 6% 16%;
    --card: 40 56% 99%;
    --card-foreground: 30 6% 16%;
    --popover: 40 56% 99%;
    --popover-foreground: 30 6% 16%;
    --primary: 41 78% 53%;
    --primary-foreground: 30 6% 16%;
    --secondary: 150 24% 86%;
    --secondary-foreground: 30 6% 16%;
    --muted: 40 24% 92%;
    --muted-foreground: 30 8% 40%;
    --accent: 40 33% 92%;
    --accent-foreground: 30 6% 16%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 40 38% 96%;
    --border: 38 29% 87%;
    --input: 38 29% 87%;
    --ring: 41 78% 53%;
    --sidebar-background: 40 38% 96%;
    --sidebar-foreground: 30 6% 16%;
    --sidebar-primary: 41 78% 53%;
    --sidebar-primary-foreground: 30 6% 16%;
    --sidebar-accent: 40 33% 92%;
    --sidebar-accent-foreground: 30 6% 16%;
    --sidebar-border: 38 29% 87%;
    --sidebar-ring: 41 78% 53%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-family: 'Poppins', sans-serif;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Playfair Display', serif;
  }

  html {
    scroll-behavior: smooth;
  }
}

@layer utilities {
  .text-balance {
    text-wrap: balance;
  }

  /* Existing reveal animations (kept) */
  .animate-fade-up { animation: fadeUp 0.8s ease-out forwards; }
  .animate-fade-in { animation: fadeIn 0.6s ease-out forwards; }
  .animate-scale-in { animation: scaleIn 0.6s ease-out forwards; }

  /* Jewelry showcase animations (new) */
  .animate-ken-burns { animation: kenBurns 22s ease-in-out infinite alternate; }
  .animate-float { animation: float 4s ease-in-out infinite; }
  .animate-pulse-once { animation: pulseOnce 1.2s ease-in-out 1; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }
  @keyframes kenBurns {
    0% { transform: scale(1); }
    100% { transform: scale(1.12); }
  }
  @keyframes float {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  @keyframes pulseOnce {
    0%, 100% { box-shadow: 0 10px 25px -5px hsl(var(--primary) / 0.3); }
    50% { box-shadow: 0 10px 38px 2px hsl(var(--primary) / 0.6); }
  }
}

/* Signature shine-sweep: a light glint glides across a piece on card hover.
   Apply `.shine-sweep` to a positioned, overflow-hidden element inside a
   Tailwind `group` container. */
.shine-sweep::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    115deg,
    transparent 35%,
    hsl(0 0% 100% / 0.45) 50%,
    transparent 65%
  );
  transform: translateX(-160%);
  transition: transform 0.85s ease;
  pointer-events: none;
  z-index: 3;
}
.group:hover .shine-sweep::after {
  transform: translateX(160%);
}

/* Respect reduced-motion preferences */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Update custom color tokens in `tailwind.config.ts`**

In `tailwind.config.ts`, find the custom tokens at the end of the `colors` object (currently `gold`, `taupe`, `cream`, `seafoam`, `driftwood`):

```ts
        gold: "hsl(var(--gold))",
        taupe: "hsl(var(--taupe))",
        cream: "hsl(var(--cream))",
        seafoam: "hsl(var(--seafoam))",
        driftwood: "hsl(var(--driftwood))",
```

Replace those five lines with:

```ts
        gold: "hsl(var(--gold))",
        "gold-deep": "hsl(var(--gold-deep))",
        charcoal: "hsl(var(--charcoal))",
        cream: "hsl(var(--cream))",
        seafoam: "hsl(var(--seafoam))",
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build completes with `✓ built in ...` and no errors.

- [ ] **Step 4: Commit**

```bash
git add src/index.css tailwind.config.ts
git commit -m "Add light boutique theme tokens and jewelry animations"
```

---

## Task 2: Shared utilities — scroll-reveal hook & section heading

**Files:**
- Create: `src/hooks/useScrollReveal.ts`
- Create: `src/components/SectionHeading.tsx`

- [ ] **Step 1: Create `src/hooks/useScrollReveal.ts`**

```ts
import { useEffect, useRef, useState } from "react";

/**
 * Reveals an element once it scrolls into view. Returns a ref to attach to the
 * element and an `isVisible` flag for driving entrance transitions.
 */
export function useScrollReveal<T extends HTMLElement = HTMLDivElement>(
  options?: IntersectionObserverInit
) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, ...options }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [options]);

  return { ref, isVisible };
}
```

- [ ] **Step 2: Create `src/components/SectionHeading.tsx`**

```tsx
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SectionHeadingProps {
  children: React.ReactNode;
  align?: "center" | "left";
}

/** A serif section heading with a gold underline that draws in on scroll. */
export const SectionHeading = ({
  children,
  align = "center",
}: SectionHeadingProps) => {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>();

  return (
    <div ref={ref} className={align === "center" ? "text-center" : "text-left"}>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground">
        {children}
      </h2>
      <span
        className={`mt-4 block h-[3px] w-20 rounded-full bg-primary origin-left transition-transform duration-700 ${
          align === "center" ? "mx-auto" : ""
        } ${isVisible ? "scale-x-100" : "scale-x-0"}`}
      />
    </div>
  );
};
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build completes with `✓ built in ...` and no errors.

- [ ] **Step 4: Commit**

```bash
git add src/hooks/useScrollReveal.ts src/components/SectionHeading.tsx
git commit -m "Add useScrollReveal hook and SectionHeading component"
```

---

## Task 3: Navbar redesign

**Files:**
- Modify: `src/components/Navbar.tsx` (full rewrite)

- [ ] **Step 1: Replace `src/components/Navbar.tsx`**

```tsx
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoMark from "@/assets/kapiz-logo.png";

const navLinks = [
  { name: "Our Story", href: "#mission" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "How It Works", href: "#custom-orders" },
  { name: "Materials", href: "#materials" },
  { name: "Reviews", href: "#testimonials" },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md shadow-sm border-b border-border"
            : "bg-background/70 backdrop-blur-sm"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-3 hover:opacity-80 transition-opacity"
            >
              <img src={logoMark} alt="Kapiz Upcycle" className="h-11 w-auto" />
              <span className="flex flex-col leading-tight text-left">
                <span className="font-serif text-xl font-bold text-foreground tracking-wide">
                  Kapiz Upcycle
                </span>
                <span className="text-[0.6rem] uppercase tracking-[0.25em] text-gold-deep">
                  Sustainable Artistry
                </span>
              </span>
            </button>

            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors relative group"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("#contact")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full px-6"
              >
                Start a Custom Order
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-foreground hover:bg-foreground/5"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isMobileMenuOpen ? "max-h-96" : "max-h-0"
          }`}
        >
          <div className="bg-background/98 backdrop-blur-md border-t border-border px-6 py-4 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left text-foreground/80 hover:text-foreground py-2.5 font-medium"
              >
                {link.name}
              </button>
            ))}
            <Button
              onClick={() => scrollToSection("#contact")}
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-medium rounded-full mt-2"
            >
              Start a Custom Order
            </Button>
          </div>
        </div>
      </nav>

      {/* Spacer to offset the fixed navbar */}
      <div className="h-20" />
    </>
  );
};
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build completes with `✓ built in ...` and no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "Redesign Navbar: light theme, logo lockup, custom-order CTA"
```

---

## Task 4: Hero redesign

**Files:**
- Modify: `src/components/Hero.tsx` (full rewrite)

- [ ] **Step 1: Replace `src/components/Hero.tsx`**

```tsx
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";
import logoMark from "@/assets/kapiz-logo.png";

export const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center animate-ken-burns"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/55 to-background/90" />
      </div>

      <div
        className={`relative z-10 text-center px-6 max-w-3xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <img
          src={logoMark}
          alt="Kapiz Upcycle"
          className="h-24 md:h-28 mb-6 mx-auto drop-shadow-lg animate-float"
        />

        <p className="inline-flex items-center gap-2 text-gold-deep text-xs sm:text-sm font-medium uppercase tracking-[0.2em] mb-4">
          <Sparkles className="w-4 h-4" />
          Handcrafted · One-of-a-kind · Eco-conscious
        </p>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-foreground mb-5 leading-tight text-balance">
          Custom Jewelry, <span className="text-gold-deep">Reclaimed</span> by
          Hand
        </h1>

        <p className="text-lg md:text-xl text-foreground/75 mb-8 font-light max-w-xl mx-auto">
          We transform reclaimed shells, pearls, and found materials into
          one-of-a-kind pieces — designed around your story.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={() => scrollTo("contact")}
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-medium px-8 py-6 text-base rounded-full"
          >
            Start Your Custom Piece
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo("portfolio")}
            className="border-foreground/20 text-foreground hover:bg-foreground/5 font-medium px-8 py-6 text-base rounded-full"
          >
            View Our Work
          </Button>
        </div>
      </div>

      <button
        onClick={() => scrollTo("mission")}
        aria-label="Scroll down"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-foreground/60 hover:text-foreground transition-colors"
      >
        <ChevronDown className="w-8 h-8" />
      </button>
    </section>
  );
};
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build completes with `✓ built in ...` and no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "Redesign Hero: light overlay, Ken Burns, dual CTAs"
```

---

## Task 5: Mission redesign

**Files:**
- Modify: `src/components/Mission.tsx` (full rewrite)

- [ ] **Step 1: Replace `src/components/Mission.tsx`**

```tsx
import { useScrollReveal } from "@/hooks/useScrollReveal";
import missionImage from "@/assets/workspace.jpg";

export const Mission = () => {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section id="mission" ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-gold-deep text-sm font-medium uppercase tracking-[0.2em] mb-3">
            Our Story
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-foreground mb-6">
            Sustainability with Soul
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed mb-4">
            At Kapiz Upcycle, we believe beauty doesn't have to come at the
            planet's expense. Each piece tells a story of transformation —
            materials others overlook, given new life as wearable art.
          </p>
          <p className="text-muted-foreground text-lg leading-relaxed">
            From ocean-polished shells to reclaimed metals, we source ethically
            and craft every piece by hand. The result is jewelry as meaningful
            as it is beautiful — and entirely your own.
          </p>
        </div>

        <div
          className={`transition-all duration-1000 delay-200 ${
            isVisible
              ? "opacity-100 translate-x-0"
              : "opacity-0 translate-x-10"
          }`}
        >
          <div className="relative">
            <img
              src={missionImage}
              alt="Artisan workspace with natural materials"
              className="rounded-2xl shadow-xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-5 -left-5 hidden sm:block bg-card border border-border rounded-xl shadow-lg px-6 py-4">
              <p className="font-serif text-2xl font-bold text-foreground">
                100%
              </p>
              <p className="text-sm text-muted-foreground">
                Reclaimed &amp; natural materials
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build completes with `✓ built in ...` and no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Mission.tsx
git commit -m "Redesign Mission section for light theme"
```

---

## Task 6: Portfolio (renamed from Gallery) with lightbox

**Files:**
- Rename: `src/components/Gallery.tsx` → `src/components/Portfolio.tsx`
- Modify: `src/components/Portfolio.tsx` (full rewrite after rename)

- [ ] **Step 1: Rename the file**

```bash
git mv src/components/Gallery.tsx src/components/Portfolio.tsx
```

- [ ] **Step 2: Replace the contents of `src/components/Portfolio.tsx`**

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";
import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";
import product5 from "@/assets/product-5.png";
import product6 from "@/assets/product-6.png";

const pieces = [
  {
    id: 1,
    name: "Shell Blossom Statement",
    materials: "Shell pendant, soda can tabs, vintage beads",
    story: "A stunning centerpiece featuring a hand-painted shell medallion.",
    image: product1,
  },
  {
    id: 2,
    name: "Pearl Garden Cascade",
    materials: "Freshwater pearls, floral accents, brass findings",
    story: "Delicate blooms intertwine with pearl clusters.",
    image: product2,
  },
  {
    id: 3,
    name: "Baroque Pearl Collection",
    materials: "Baroque pearls, vintage beads, brass wire",
    story: "Each pearl's unique shape tells its own story.",
    image: product3,
  },
  {
    id: 4,
    name: "Artisan Display Set",
    materials: "Mixed pearls, wire art, recycled packaging",
    story: "A curated collection showcasing sustainable artistry.",
    image: product4,
  },
  {
    id: 5,
    name: "Resin Pendant Duo",
    materials: "Resin, vintage coins, brass beads",
    story: "Handcrafted pendants with embedded treasures.",
    image: product5,
  },
  {
    id: 6,
    name: "Tree of Life Pearl",
    materials: "Baroque pearls, brass wire, chain",
    story: "Wire-wrapped tree design with pearl leaves.",
    image: product6,
  },
];

export const Portfolio = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  const active = activeIndex !== null ? pieces[activeIndex] : null;
  const showPrev = () =>
    setActiveIndex((i) =>
      i === null ? i : (i + pieces.length - 1) % pieces.length
    );
  const showNext = () =>
    setActiveIndex((i) => (i === null ? i : (i + 1) % pieces.length));

  return (
    <section id="portfolio" ref={ref} className="py-24 px-6 bg-muted/40">
      <div className="max-w-7xl mx-auto">
        <SectionHeading>One-of-a-Kind Pieces</SectionHeading>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mt-5 mb-14">
          A glimpse of past commissions. Every piece is unique — use these as
          inspiration for a custom creation of your own.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {pieces.map((piece, index) => (
            <div
              key={piece.id}
              className={`group bg-card rounded-2xl overflow-hidden border border-border shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <button
                onClick={() => setActiveIndex(index)}
                className="block w-full h-72 relative overflow-hidden shine-sweep"
                aria-label={`View ${piece.name}`}
              >
                <img
                  src={piece.image}
                  alt={piece.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <span className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-charcoal/80 to-transparent translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <span className="text-cream text-sm font-medium">
                    View details
                  </span>
                </span>
              </button>

              <div className="p-6">
                <h3 className="text-xl font-serif font-semibold text-foreground mb-2">
                  {piece.name}
                </h3>
                <p className="text-gold-deep text-sm mb-2 font-medium">
                  {piece.materials}
                </p>
                <p className="text-muted-foreground text-sm mb-5 italic">
                  {piece.story}
                </p>
                <Button
                  onClick={scrollToContact}
                  variant="outline"
                  size="sm"
                  className="w-full border-primary/40 text-foreground hover:bg-primary hover:text-primary-foreground rounded-full"
                >
                  Request Something Like This
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog
        open={activeIndex !== null}
        onOpenChange={(open) => !open && setActiveIndex(null)}
      >
        <DialogContent className="max-w-3xl bg-card border-border p-0 overflow-hidden">
          {active && (
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-72 md:h-auto">
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col">
                <h3 className="text-2xl font-serif font-bold text-foreground mb-2">
                  {active.name}
                </h3>
                <p className="text-gold-deep text-sm font-medium mb-4">
                  {active.materials}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  {active.story}
                </p>
                <Button
                  onClick={() => {
                    setActiveIndex(null);
                    scrollToContact();
                  }}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full mt-auto"
                >
                  Request Something Like This
                </Button>
              </div>
            </div>
          )}

          <button
            onClick={showPrev}
            aria-label="Previous piece"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" />
          </button>
          <button
            onClick={showNext}
            aria-label="Next piece"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-background/90 border border-border flex items-center justify-center hover:bg-background transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-foreground" />
          </button>
        </DialogContent>
      </Dialog>
    </section>
  );
};
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build fails — `Index.tsx` still imports the old `Gallery`. This is expected; it is fixed in Task 14. Confirm the only error references `Gallery` / `src/pages/Index.tsx`. If any error references `Portfolio.tsx` itself, fix it before continuing.

- [ ] **Step 4: Commit**

```bash
git add src/components/Portfolio.tsx
git commit -m "Rename Gallery to Portfolio: inspiration showcase with lightbox and shine-sweep"
```

---

## Task 7: CustomOrderProcess (renamed from Process)

**Files:**
- Rename: `src/components/Process.tsx` → `src/components/CustomOrderProcess.tsx`
- Modify: `src/components/CustomOrderProcess.tsx` (full rewrite after rename)

- [ ] **Step 1: Rename the file**

```bash
git mv src/components/Process.tsx src/components/CustomOrderProcess.tsx
```

- [ ] **Step 2: Replace the contents of `src/components/CustomOrderProcess.tsx`**

```tsx
import { MessageCircle, PenTool, Hammer, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

const steps = [
  {
    icon: MessageCircle,
    title: "Share Your Vision",
    description:
      "Tell us your idea, occasion, or inspiration. No idea is too small — we'll shape it together.",
  },
  {
    icon: PenTool,
    title: "We Design Together",
    description:
      "We propose materials and a design that honors your story, and refine it until it feels right.",
  },
  {
    icon: Hammer,
    title: "Handcrafted for You",
    description:
      "Your piece is made by hand from reclaimed and natural materials, with care at every step.",
  },
  {
    icon: Gift,
    title: "Delivered with Love",
    description:
      "Your one-of-a-kind piece arrives in eco-friendly, plastic-free packaging, ready to wear.",
  },
];

export const CustomOrderProcess = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="custom-orders"
      ref={ref}
      className="py-24 px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading>How Custom Orders Work</SectionHeading>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mt-5 mb-16">
          Commissioning your own piece is simple. Here's what to expect.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
          {/* Connecting line that draws in on scroll (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5 bg-border overflow-hidden">
            <div
              className={`h-full bg-primary origin-left transition-transform duration-[1500ms] ease-out ${
                isVisible ? "scale-x-100" : "scale-x-0"
              }`}
            />
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`relative text-center transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="relative z-10 mx-auto inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20">
                  <Icon className="w-9 h-9" />
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card border border-border text-foreground text-sm font-serif font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                </div>
                <h3 className="text-xl font-serif font-semibold text-foreground mt-5 mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Button
            size="lg"
            onClick={scrollToContact}
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 py-6 text-base"
          >
            Start Your Custom Order
          </Button>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build fails — `Index.tsx` still imports the old `Process`. This is expected; it is fixed in Task 14. Confirm the only error references `Process` / `src/pages/Index.tsx`. If any error references `CustomOrderProcess.tsx` itself, fix it before continuing.

- [ ] **Step 4: Commit**

```bash
git add src/components/CustomOrderProcess.tsx
git commit -m "Rename Process to CustomOrderProcess: 4-step funnel with draw-in line"
```

---

## Task 8: Materials redesign

**Files:**
- Modify: `src/components/Materials.tsx` (full rewrite)

- [ ] **Step 1: Replace `src/components/Materials.tsx`**

```tsx
import { Waves, Shell, Recycle, Sparkles } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

const materials = [
  {
    icon: Shell,
    name: "Shells & Capiz",
    description:
      "Iridescent capiz and natural shells — gifts of the tides given new purpose.",
  },
  {
    icon: Sparkles,
    name: "Reclaimed Pearls",
    description:
      "Freshwater and baroque pearls, each with its own unique character.",
  },
  {
    icon: Recycle,
    name: "Reclaimed Metal",
    description: "Vintage findings and salvaged brass, restored and reimagined.",
  },
  {
    icon: Waves,
    name: "Sea Glass",
    description:
      "Tumbled smooth by waves and time into frosted, jewel-like gems.",
  },
];

export const Materials = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });

  return (
    <section
      id="materials"
      ref={ref}
      className="py-24 px-6 bg-secondary/50"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading>From Shore to Shine</SectionHeading>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mt-5 mb-14">
          The natural and reclaimed materials we work with — and what your
          custom piece can be made from.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materials.map((material, index) => {
            const Icon = material.icon;
            return (
              <div
                key={material.name}
                className={`text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 120}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-gold-deep" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                  {material.name}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {material.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build fails only with the pre-existing `Gallery`/`Process` import errors from `Index.tsx` (fixed in Task 14). Confirm no error references `Materials.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Materials.tsx
git commit -m "Redesign Materials section for light theme"
```

---

## Task 9: Testimonials redesign with star ratings

**Files:**
- Modify: `src/components/Testimonials.tsx` (full rewrite)

- [ ] **Step 1: Replace `src/components/Testimonials.tsx`**

```tsx
import { Quote, Star } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

const testimonials = [
  {
    id: 1,
    name: "Sarah Martinez",
    context: "Custom necklace",
    rating: 5,
    quote:
      "My Kapiz piece isn't just jewelry — it's a conversation starter and a daily reminder to live more sustainably. The craftsmanship is exceptional.",
  },
  {
    id: 2,
    name: "James Chen",
    context: "Anniversary gift",
    rating: 5,
    quote:
      "I gifted a piece to my wife and she wears it every day. Knowing it's made from reclaimed materials makes it even more special.",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    context: "Custom earrings",
    rating: 5,
    quote:
      "Each piece truly tells a story. I love knowing my jewelry has a history and a purpose beyond just looking beautiful.",
  },
];

export const Testimonials = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-24 px-6 bg-background"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Words from Our Community</SectionHeading>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`bg-card border border-border rounded-2xl p-8 shadow-sm transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <Quote className="w-10 h-10 text-primary/25 mb-3" />

              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="text-foreground/80 mb-6 leading-relaxed italic">
                "{testimonial.quote}"
              </p>

              <div className="border-t border-border pt-4">
                <p className="text-foreground font-semibold">
                  {testimonial.name}
                </p>
                <p className="text-muted-foreground text-sm">
                  {testimonial.context}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build fails only with the pre-existing `Gallery`/`Process` import errors from `Index.tsx` (fixed in Task 14). Confirm no error references `Testimonials.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Testimonials.tsx
git commit -m "Redesign Testimonials: light cards with star ratings"
```

---

## Task 10: EcoPromise redesign

**Files:**
- Modify: `src/components/EcoPromise.tsx` (full rewrite)

- [ ] **Step 1: Replace `src/components/EcoPromise.tsx`**

```tsx
import { Package, Leaf, MapPin, Heart } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

const promises = [
  {
    icon: Package,
    title: "Eco Packaging",
    description: "All pieces ship in recycled, plastic-free packaging.",
  },
  {
    icon: Leaf,
    title: "Low Waste",
    description: "Zero-waste studio practices and minimal material waste.",
  },
  {
    icon: MapPin,
    title: "Local Sourcing",
    description: "Materials sourced close to home whenever possible.",
  },
  {
    icon: Heart,
    title: "Ethical Craft",
    description: "Fair labor, mindful practices, and community support.",
  },
];

export const EcoPromise = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  return (
    <section id="eco" ref={ref} className="py-24 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <SectionHeading>Our Commitment to the Planet</SectionHeading>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
          {promises.map((promise, index) => {
            const Icon = promise.icon;
            return (
              <div
                key={promise.title}
                className={`text-center p-8 rounded-2xl bg-card border border-border shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-primary/30 transition-all duration-500 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-10"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Icon className="w-8 h-8 text-gold-deep" />
                </div>
                <h3 className="text-lg font-serif font-semibold text-foreground mb-2">
                  {promise.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {promise.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build fails only with the pre-existing `Gallery`/`Process` import errors from `Index.tsx` (fixed in Task 14). Confirm no error references `EcoPromise.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/EcoPromise.tsx
git commit -m "Redesign EcoPromise section for light theme"
```

---

## Task 11: Contact redesign (form + Messenger + Instagram)

**Files:**
- Modify: `src/components/Contact.tsx` (full rewrite)

The `/api/contact` POST + Resend behavior and the Sonner toast feedback are preserved exactly; only the layout, copy, and the added direct-message buttons change. A submit-disabled state is added.

- [ ] **Step 1: Replace `src/components/Contact.tsx`**

```tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Facebook, Instagram, Send } from "lucide-react";
import { toast } from "sonner";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { SectionHeading } from "@/components/SectionHeading";

export const Contact = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.15 });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent! We'll get back to you soon.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      toast.error("Error sending message.");
      console.error("Email send error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section id="contact" ref={ref} className="py-24 px-6 bg-muted/40">
      <div className="max-w-5xl mx-auto">
        <SectionHeading>Let's Make Something Beautiful</SectionHeading>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mt-5 mb-14">
          Ready to start your custom piece? Send us the details or message us
          directly — we'd love to hear your idea.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <form
            onSubmit={handleSubmit}
            className={`md:col-span-3 bg-card border border-border rounded-2xl p-8 shadow-sm space-y-5 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="text-foreground">
                Your Name
              </Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Jane Doe"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">
                Your Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="jane@example.com"
                className="bg-background border-border"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message" className="text-foreground">
                Describe Your Dream Piece
              </Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                placeholder="Tell us about the piece you'd love — the occasion, style, colors, or materials..."
                className="bg-background border-border resize-none"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              size="lg"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full"
            >
              {isSubmitting ? (
                "Sending..."
              ) : (
                <>
                  Start My Custom Order
                  <Send className="ml-2 w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          <div
            className={`md:col-span-2 flex flex-col gap-4 transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                Prefer to chat?
              </h3>
              <p className="text-muted-foreground text-sm mb-5">
                Message us directly — we usually reply within a day.
              </p>

              <a
                href="https://www.facebook.com/profile.php?id=61567497300887"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full rounded-full bg-[#1877F2] text-white px-5 py-3 font-medium hover:opacity-90 transition-opacity mb-3"
              >
                <Facebook className="w-5 h-5" />
                Message on Facebook
              </a>

              <a
                href="https://www.instagram.com/mskapiz/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full rounded-full px-5 py-3 font-medium text-white hover:opacity-90 transition-opacity"
                style={{
                  background:
                    "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)",
                }}
              >
                <Instagram className="w-5 h-5" />
                DM us on Instagram
              </a>
            </div>

            <div className="bg-secondary/60 border border-border rounded-2xl p-6">
              <p className="text-foreground font-medium mb-1">
                Every piece is made to order
              </p>
              <p className="text-muted-foreground text-sm">
                No two are alike — and yours will be designed around you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build fails only with the pre-existing `Gallery`/`Process` import errors from `Index.tsx` (fixed in Task 14). Confirm no error references `Contact.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Contact.tsx
git commit -m "Redesign Contact: custom-order form plus Messenger and Instagram"
```

---

## Task 12: Footer redesign

**Files:**
- Modify: `src/components/Footer.tsx` (full rewrite)

- [ ] **Step 1: Replace `src/components/Footer.tsx`**

```tsx
import { Facebook, Instagram } from "lucide-react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import logoFull from "@/assets/logo.png";

const navLinks = [
  { name: "Our Story", href: "#mission" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "How It Works", href: "#custom-orders" },
  { name: "Materials", href: "#materials" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 });

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer
      id="footer"
      ref={ref}
      className="bg-charcoal text-cream py-16 px-6"
    >
      <div
        className={`max-w-6xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="text-center mb-8">
          <button
            onClick={scrollToTop}
            className="inline-block hover:opacity-85 transition-opacity"
            aria-label="Back to top"
          >
            <img
              src={logoFull}
              alt="Kapiz Upcycle"
              className="h-28 w-auto mx-auto"
            />
          </button>
          <p className="text-cream/70 max-w-md mx-auto mt-4">
            Handcrafted custom jewelry that reclaims beauty from nature's gifts.
          </p>
        </div>

        <nav className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-cream/75 hover:text-primary transition-colors text-sm"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex justify-center gap-4 mb-8">
          <a
            href="https://www.facebook.com/profile.php?id=61567497300887"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="w-11 h-11 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Facebook className="w-5 h-5" />
          </a>
          <a
            href="https://www.instagram.com/mskapiz/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-11 h-11 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-primary hover:text-primary-foreground transition-all"
          >
            <Instagram className="w-5 h-5" />
          </a>
        </div>

        <div className="text-center text-cream/50 text-sm border-t border-cream/10 pt-8">
          <p>
            &copy; {new Date().getFullYear()} Kapiz Upcycle. All rights
            reserved.
          </p>
          <p className="mt-1">Crafted with care for people and planet.</p>
        </div>
      </div>
    </footer>
  );
};
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build fails only with the pre-existing `Gallery`/`Process` import errors from `Index.tsx` (fixed in Task 14). Confirm no error references `Footer.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "Redesign Footer: dark charcoal band with full logo lockup"
```

---

## Task 13: FloatingCTA component

**Files:**
- Create: `src/components/FloatingCTA.tsx`

- [ ] **Step 1: Create `src/components/FloatingCTA.tsx`**

```tsx
import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";

/** A floating "Start a Custom Order" button that appears after the hero. */
export const FloatingCTA = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsVisible(window.scrollY > 700);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToContact = () =>
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <button
      onClick={scrollToContact}
      aria-label="Start a custom order"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-primary text-primary-foreground font-medium px-6 py-3.5 shadow-lg shadow-primary/30 transition-all duration-500 hover:bg-primary/90 hover:scale-105 ${
        isVisible
          ? "opacity-100 translate-y-0 animate-pulse-once"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      <Sparkles className="w-4 h-4" />
      <span className="hidden sm:inline">Start a Custom Order</span>
      <span className="sm:hidden">Custom Order</span>
    </button>
  );
};
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build fails only with the pre-existing `Gallery`/`Process` import errors from `Index.tsx` (fixed in Task 14). Confirm no error references `FloatingCTA.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/components/FloatingCTA.tsx
git commit -m "Add FloatingCTA: scroll-activated custom-order button"
```

---

## Task 14: Wire up Index page & final verification

**Files:**
- Modify: `src/pages/Index.tsx` (full rewrite)

- [ ] **Step 1: Replace `src/pages/Index.tsx`**

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Mission } from "@/components/Mission";
import { Portfolio } from "@/components/Portfolio";
import { CustomOrderProcess } from "@/components/CustomOrderProcess";
import { Materials } from "@/components/Materials";
import { Testimonials } from "@/components/Testimonials";
import { EcoPromise } from "@/components/EcoPromise";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { FloatingCTA } from "@/components/FloatingCTA";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Mission />
      <Portfolio />
      <CustomOrderProcess />
      <Materials />
      <Testimonials />
      <EcoPromise />
      <Contact />
      <Footer />
      <FloatingCTA />
    </div>
  );
};

export default Index;
```

- [ ] **Step 2: Verify the build now passes**

Run: `npm run build`
Expected: build completes with `✓ built in ...` and no errors. The earlier `Gallery`/`Process` errors are now resolved.

- [ ] **Step 3: Verify lint passes**

Run: `npm run lint`
Expected: completes with no errors. (Pre-existing warnings in untouched files such as `src/components/ui/*` are acceptable; there must be no errors in the files this plan created or modified.)

- [ ] **Step 4: Manual visual check in the dev server**

Run: `npm run dev` and open the printed local URL in a browser. Confirm:
- The page is light/ivory with charcoal text and gold accents (no dark gray theme remains).
- Navbar shows the logo lockup and a "Start a Custom Order" button; mobile menu opens/closes.
- Hero shows the gold KK mark over the image with a slow Ken Burns drift and two CTAs.
- Scrolling reveals each section with a fade-up; section headings show a gold underline drawing in.
- Portfolio cards: hovering shows the shine-sweep glint and image zoom; clicking a piece opens the lightbox; prev/next and close work.
- "How Custom Orders Work" shows 4 numbered steps with the connecting line filling in.
- Contact shows the form plus the Facebook and Instagram buttons.
- The floating "Start a Custom Order" button appears after scrolling and jumps to the contact form.
- Footer is a dark charcoal band with the full logo.

Stop the dev server when done (Ctrl+C).

- [ ] **Step 5: Commit**

```bash
git add src/pages/Index.tsx
git commit -m "Wire up redesigned homepage: new section order and FloatingCTA"
```

---

## Self-Review Notes

- **Spec coverage:** Visual foundation → Task 1. Logo handling → Tasks 3 (navbar), 4 (hero), 12 (footer). Shared building blocks → Task 2, 13. All 10 sections → Tasks 3–12. Floating CTA → Task 13. Animations (Ken Burns, shine-sweep, draw-in line, scroll reveals, reduced-motion) → Tasks 1, 4, 6, 7 + the shared hook. Page structure/order → Task 14. No spec requirement is left without a task.
- **No new dependencies / no new routes:** confirmed — only existing packages and the single `/` route are used.
- **Type consistency:** `useScrollReveal` returns `{ ref, isVisible }` and is consumed that way everywhere; `SectionHeading` takes `children` + optional `align`; component exports keep their existing names except `Gallery → Portfolio` and `Process → CustomOrderProcess`, both updated in `Index.tsx` (Task 14).
- **Intentional intermediate build failures:** Tasks 6–13 note that `npm run build` fails *only* because `Index.tsx` still imports the old `Gallery`/`Process` until Task 14. Each such task says exactly which error is expected and to confirm no error points at that task's own file.
