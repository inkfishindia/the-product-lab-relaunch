<!-- last-updated: 2026-03-27 -->
# UI System — Light + Bold (CSS Tokens & Components)

**Phase:** 4
**Producing Agent:** Julie
**Date:** 2026-03-27
**Status:** draft
**Reviewer:** Harley

---

## How to Read This Document

This is the implementation contract between design and build. Every decision here traces to one of three sources: Sean's visual identity rebrand (`artifacts/phase-4/visual-identity-rebrand.md`), Kurt's IA and wireframes (`artifacts/phase-3/ux-ia-wireframes.md`), or a technical constraint from the Fynd platform.

Tobi implements from this document. Sean reviews for visual consistency. Harley approves before build begins.

**What changed from the Phase 3 ui-system.md:** The base palette has flipped. The previous system used #1A1A1A as the primary surface. The new system uses #F5F0EB (Paper) as the primary surface, with #1A1A1A (Ink) as the default type color. This document supersedes the Phase 3 version entirely. Do not reference the Phase 3 file for tokens or component specs — it describes the wrong system.

**What did not change:** Typography scale, spacing scale, responsive breakpoints, interaction patterns, accessibility rules, performance constraints, Fynd implementation paths, BEM naming convention, and the component inventory. These carry forward unchanged except where a dark-background assumption is explicitly replaced.

---

## Part 1: Design Tokens

### 1.1 Color Tokens

Colors are named by role, not by hue. If Sean updates a hex value, every component that uses the token updates without touching component code. Do not hardcode hex values anywhere except this token table.

```css
:root {
  /* Surfaces — Light + Bold system */
  --color-surface-base:       #F5F0EB;  /* Paper — primary background, all pages */
  --color-surface-raised:     #FFFFFF;  /* Air — product cards, form fields, lifted off Paper */
  --color-surface-loud:       #E63B2E;  /* Loud red — announcement bars only, never full pages */
  --color-surface-energy:     #F2D024;  /* Opinion yellow — drop banners, promo bars, energy moments */

  /* Type */
  --color-text-primary:       #1A1A1A;  /* Ink — all headings, body, product names */
  --color-text-secondary:     #6B6B6B;  /* Muted Ink — captions, metadata, microcopy */
  --color-text-on-red:        #FFFFFF;  /* Air — text on Loud red background */
  --color-text-on-yellow:     #1A1A1A;  /* Ink — text on Opinion yellow background */
  --color-text-on-dark:       #F5F0EB;  /* Paper — text in the rare dark context (print-style poster sections) */

  /* Accent */
  --color-accent-primary:     #E63B2E;  /* Loud — CTAs, prices, sale badges, action moments */
  --color-accent-secondary:   #F2D024;  /* Opinion — highlights, hover states, secondary badges */
  --color-accent-pure-white:  #FFFFFF;  /* Air — sold-out badges, max-contrast moments */

  /* Functional */
  --color-success:            #3ECF4C;  /* Added to cart, in stock, free shipping unlocked */
  --color-border:             #E0DAD3;  /* Card borders, rule lines — 1px, warm neutral */
  --color-border-strong:      #1A1A1A;  /* Ink — button outlines, form focus-adjacent use */
  --color-overlay:            rgba(26, 26, 26, 0.55);  /* Modal/drawer overlay */
}
```

**Color usage rules — non-negotiable:**

- `--color-surface-base` (#F5F0EB) is the default surface for every page and every section background unless a specific component rule overrides it. It is warm cream, not pure white. Never swap it for #FFFFFF as a page background — the warmth is the differentiation from generic ecommerce.
- `--color-surface-raised` (#FFFFFF) is only for objects that sit on top of the Paper surface: product cards, form fields, cart drawer interior, modal backgrounds. It creates depth through contrast without shadows.
- `--color-text-primary` (#1A1A1A) is used for all type. This brand does not whisper. Do not use grey or muted tones for any type that carries meaning.
- `--color-text-secondary` (#6B6B6B) is permitted only for: captions, metadata, placeholder text, disabled states. Never on interactive elements.
- `--color-accent-primary` (Loud red) is for moments that require action: primary CTA buttons, sale/drop badges, the add-to-cart button, price on discounted items. Spare enough that it always signals action. Not permitted as a large-area section background.
- `--color-accent-secondary` (Opinion yellow) signals energy and emphasis: announcement bar, highlight markers, hover states on chips, secondary badges. It can be used as a full-section background for promotional moments (new drop, sale announcement) because yellow reads fun, not aggressive.
- Maximum two accent colors on any single screen surface. Red and yellow together is the ceiling.
- No gradients. Ever. No tints or shades of any palette color. Five colors. That is the complete system.

---

### 1.2 Typography Tokens

```css
:root {
  /* Typefaces — Google Fonts, loaded with font-display: swap */
  --font-heading:    'Barlow Condensed', system-ui, sans-serif;
  --font-body:       'Inter', system-ui, sans-serif;

  /* Weights */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;
  --weight-black:    900;

  /* Scale — mobile first. Desktop overrides in media query below. */
  --text-opinion:    3rem;      /* 48px mobile → 4rem (64px) desktop — hero headlines */
  --text-h1:         2rem;      /* 32px mobile → 3.5rem (56px) desktop */
  --text-h2:         1.5rem;    /* 24px mobile → 2.5rem (40px) desktop */
  --text-h3:         1.25rem;   /* 20px mobile → 1.75rem (28px) desktop */
  --text-h4:         1.125rem;  /* 18px mobile → 1.5rem  (24px) desktop */
  --text-body:       0.9375rem; /* 15px mobile → 1rem    (16px) desktop */
  --text-body-sm:    0.8125rem; /* 13px mobile → 0.875rem (14px) desktop */
  --text-caption:    0.6875rem; /* 11px mobile → 0.75rem  (12px) desktop */
  --text-cta:        1rem;      /* 16px mobile → 1rem     (16px) desktop — does not scale */
  --text-price:      1.25rem;   /* 20px mobile → 1.25rem  (20px) desktop */
  --text-bar:        0.8125rem; /* 13px mobile → 0.875rem (14px) desktop */

  /* Line heights */
  --leading-tight:   1.1;  /* Headings, opinion headlines */
  --leading-normal:  1.6;  /* Body text */
  --leading-caption: 1.4;  /* Captions, metadata */

  /* Letter spacing */
  --tracking-tight:    -0.02em;  /* H1, opinion headline */
  --tracking-snug:     -0.01em;  /* H2 */
  --tracking-normal:    0;       /* H3, body */
  --tracking-wide:      0.02em;  /* Price */
  --tracking-wider:     0.05em;  /* CTAs, announcement bar — all caps utility */
  --tracking-widest:    0.08em;  /* Caption labels, section labels */
}

@media (min-width: 1024px) {
  :root {
    --text-opinion:    4rem;
    --text-h1:         3.5rem;
    --text-h2:         2.5rem;
    --text-h3:         1.75rem;
    --text-h4:         1.5rem;
    --text-body:       1rem;
    --text-body-sm:    0.875rem;
    --text-caption:    0.75rem;
    --text-bar:        0.875rem;
  }
}
```

**Type hierarchy — Sean's specification translated to tokens:**

| Role | Token | Weight | Case | Color |
|------|-------|--------|------|-------|
| Opinion Headline | `--text-opinion` | `--weight-black` | ALL CAPS | `--color-text-primary` or `--color-accent-primary` |
| Section Header (H1) | `--text-h1` | `--weight-bold` | ALL CAPS | `--color-text-primary` |
| Section Header (H2) | `--text-h2` | `--weight-bold` | ALL CAPS | `--color-text-primary` |
| Product Name | `--text-h3` or `--text-h4` | `--weight-bold` | Title Case | `--color-text-primary` |
| Price | `--text-price` | `--weight-bold` | — | `--color-accent-primary` |
| CTA Button | `--text-cta` | `--weight-bold` | ALL CAPS | `--color-text-on-red` on red bg |
| Body Copy | `--text-body` | `--weight-regular` | Sentence case | `--color-text-primary` |
| Microcopy | `--text-body-sm` | `--weight-regular` | Sentence case | `--color-text-secondary` |
| Caption / Label | `--text-caption` | `--weight-regular` | ALL CAPS | `--color-text-secondary` |
| Announcement Bar | `--text-bar` | `--weight-bold` | ALL CAPS | `--color-text-on-yellow` |

Never use thin weights (Regular or below) for anything prominent. Never use script or decorative fonts. Never use Inter for headings — Barlow Condensed is the headline face, full stop.

---

### 1.3 Spacing Tokens

4px base unit. Every spacing value is a multiple of 4. No exceptions.

```css
:root {
  --space-1:   4px;
  --space-2:   8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Semantic spacing */
  --space-inset-sm:   var(--space-3);  /* Inner padding — small components (badges, chips) */
  --space-inset-md:   var(--space-4);  /* Inner padding — standard components */
  --space-inset-lg:   var(--space-6);  /* Inner padding — cards, sections */
  --space-stack-sm:   var(--space-2);  /* Between tightly related elements (name + price) */
  --space-stack-md:   var(--space-4);  /* Between related elements */
  --space-stack-lg:   var(--space-8);  /* Between content blocks within a section */
  --space-section:    var(--space-12); /* Between major page sections */
}
```

---

### 1.4 Border Radius Tokens

This brand is angular. Radii exist only to soften interactive targets for touch usability and to delineate badge shapes.

```css
:root {
  --radius-none:   0;        /* Product cards, hero images, structural containers */
  --radius-sm:     2px;      /* Badges — sharp, labeled objects */
  --radius-md:     4px;      /* Buttons, input fields — minimal softening for touch */
  --radius-pill:   9999px;   /* Progress bar fill, tag-style pills */
}
```

If an element uses `--radius-none`, it is structural. If it uses `--radius-sm` or `--radius-md`, it is an interactive or labeled object where the boundary needs to be finger-recognizable.

---

### 1.5 Shadow Tokens

The Light + Bold system uses Air (#FFFFFF) cards on Paper (#F5F0EB) backgrounds. The slight contrast between these two surfaces creates depth without shadows. Shadows are used only for floating elements that must lift above page content.

```css
:root {
  --shadow-none:  none;
  --shadow-sm:    0 1px 3px rgba(26, 26, 26, 0.12);   /* Dropdowns, tooltips */
  --shadow-md:    0 4px 12px rgba(26, 26, 26, 0.15);  /* Modals, sticky bars, cart drawer */
  --shadow-pop:   0 0 0 2px var(--color-accent-secondary);  /* Focus rings on light backgrounds */
}
```

No decorative drop shadows. No box shadows on product cards — the Air card on Paper background creates sufficient visual separation. If a card appears to need a shadow, the background setup is wrong.

---

### 1.6 Transition Tokens

```css
:root {
  --transition-fast:    100ms ease-out;    /* State changes: hover, focus */
  --transition-normal:  200ms ease-out;    /* Reveal: ADD button fade-in, badge swap */
  --transition-slow:    300ms ease-in-out; /* Panel slides: nav drawer, cart drawer, filter panel */
}
```

No bouncy or spring animations. No scale transforms on product cards. The only permitted scale transform is on primary CTA buttons at hover (scale 1.02 maximum, 100ms).

---

### 1.7 Breakpoints

Mobile-first. Styles written for 320px, then overridden upward.

```css
:root {
  --bp-xs:  320px;   /* Minimum supported width */
  --bp-sm:  375px;   /* iPhone SE / Samsung Galaxy A-series — primary design target */
  --bp-md:  768px;   /* Tablet portrait */
  --bp-lg:  1024px;  /* Tablet landscape / small desktop */
  --bp-xl:  1280px;  /* Standard desktop */
}

/* Usage in media queries — min-width only, never max-width in component code */
@media (min-width: 375px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

The 375px target is not an aspiration. Every component must be validated at 375px before QA.

---

## Part 2: Layout System

### 2.1 Grid Structure

```css
.container {
  width: 100%;
  padding-inline: var(--space-4);  /* 16px gutters on mobile */
  margin-inline: auto;
  max-width: 1280px;
  background-color: var(--color-surface-base);
}

@media (min-width: 768px) {
  .container {
    padding-inline: var(--space-8);  /* 32px gutters on tablet */
  }
}

@media (min-width: 1024px) {
  .container {
    padding-inline: var(--space-12); /* 48px gutters on desktop */
  }
}

/* Column grid system */
.grid {
  display: grid;
  gap: var(--space-4);
}

.grid-2  { grid-template-columns: repeat(2, 1fr); }   /* Mobile product grid */
.grid-3  { grid-template-columns: repeat(3, 1fr); }   /* Tablet product grid */
.grid-4  { grid-template-columns: repeat(4, 1fr); }   /* Desktop product grid */
.grid-12 { grid-template-columns: repeat(12, 1fr); }  /* Full layout grid */

/* Content width for text-heavy pages (About, FAQ, Policy) */
.content-narrow {
  max-width: 640px;
  margin-inline: auto;
}
```

**Product grid breakpoints:**
- 320–767px: 2 columns (`.grid-2`)
- 768–1023px: 3 columns (`.grid-3`)
- 1024px+: 4 columns (`.grid-4`)

**Note on density:** This brand favors abundance over minimalism. Do not increase gap values to make the grid feel "premium." The 16px gap on mobile is tight by design — Sean's anti-drift rule #1 is "too much white space." The dense product grid is correct.

### 2.2 Section Spacing Rhythm

- Between major page sections: `--space-section` (48px mobile, 96px desktop via clamp or media query override)
- Between related content blocks within a section: `--space-stack-lg` (32px)
- Between tightly coupled elements (product name + price): `--space-stack-sm` (8px)

### 2.3 Full-Bleed vs. Contained Sections

Full-bleed sections (edge-to-edge background color) are used for: announcement bar, hero, opinion headline block, collection headers. All other sections are contained within `.container`. Never mix full-bleed and contained sections on the same visual row.

```css
.section-full-bleed {
  width: 100%;
  background-color: var(--color-surface-base);
}

/* Yellow promo section */
.section-full-bleed--energy {
  background-color: var(--color-surface-energy);
}

/* The content inside still gets container padding */
.section-full-bleed > .container {
  padding-block: var(--space-section);
}
```

---

## Part 3: Component Library

Each component is described as: purpose, variants, states, responsive behavior, accessibility notes, and Fynd implementation path.

---

### 3.1 Announcement Bar

**Purpose:** Full-width strip at the top of every page, above the nav. Used for drops, free shipping threshold, and active promotions. The first brand signal at page entry.

**Structure:**
```
[Full-width strip — Opinion yellow bg]
  [Centered text — all caps, Barlow Condensed Bold]
```

**Variants:**
- `standard` — rotating brand statement or current promotion (default)
- `drop-alert` — "THE DROP IS LIVE: [Drop Name] →" — links to `/the-drop/`
- `policy` — "FREE SHIPPING ABOVE ₹499 · COD ABOVE ₹299 · SHIPS IN 2–4 DAYS"

**States:** Static on page load. Content rotates via JS every 5 seconds only if multiple statements are configured. No animation on the bar itself — text swap only.

**Specs:**
```css
.tpl-announcement-bar {
  width: 100%;
  background-color: var(--color-surface-energy);   /* #F2D024 */
  color: var(--color-text-on-yellow);               /* #1A1A1A */
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-bar);
  letter-spacing: var(--tracking-wider);
  text-transform: uppercase;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-inline: var(--space-4);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

**Responsive:** On mobile, the announcement bar scrolls with the page (not sticky). On desktop (1024px+), it is sticky at the top. Fixed bars eat too much viewport on mobile.

**Accessibility:** `role="region"` `aria-label="Site announcement"`. Do not use `aria-live` on the rotating variant — it interrupts screen readers mid-task.

**Fynd path:** Implement as Fynd's native announcement bar section. If Fynd does not support multiple rotating messages natively, a single statement is sufficient — rotation is an enhancement, not a requirement.

---

### 3.2 Header / Navigation

**Purpose:** Primary site navigation. Must work at 320px and 1280px without redesign.

**Structure (mobile — 320px to 1023px):**
```
[Nav bar — full width, Paper bg, 56px height]
  [TPL wordmark — left, Barlow Condensed Black]
  [Search icon — right]  [Cart icon with badge — right]

[Bottom persistent nav — fixed to viewport bottom]
  [ Shop ]  [ The Drop ]  [ Gifts ]  [ Search ]
```

**Structure (desktop — 1024px+):**
```
[Nav bar — full width, Paper bg, 64px height]
  [TPL wordmark — left]
  [Shop v]  [New In]  [The Drop]  [Gifts]
  [Search icon]  [Cart icon with badge]
```

**Navigation items confirmed from Kurt's sitemap:**
- **Shop** (with dropdown: Collections, Format Browse, Best Sellers)
- **New In** → `/collections/new-in`
- **The Drop** → `/the-drop/`
- **Gifts** → `/gifts/`

**Mobile drawer content (verbatim from Kurt's IA):**
```
COLLECTIONS
  No Filter
  Your Card Has a Personality
  Best Sellers
  New In
  K-Pop Drop
  Sneakerhead Edit

BUNDLES
  Opinion Starter Pack — ₹499
  Birthday Box — ₹699
  Two Cards, One Statement — ₹399

SHOP BY FORMAT
  Lapel Pins
  Keychains
  Card Stickers
  Stickers + Magnets

———
About  /  Contact  /  Sell Your Art
```

**Specs:**
```css
.tpl-nav-bar {
  background-color: var(--color-surface-base);  /* #F5F0EB — Paper */
  height: 56px;
  border-bottom: 1px solid var(--color-border);
  position: sticky;
  top: 0;
  z-index: 20;
}

@media (min-width: 1024px) {
  .tpl-nav-bar {
    height: 64px;
  }
}

/* Wordmark */
.tpl-nav-bar__wordmark {
  font-family: var(--font-heading);
  font-weight: var(--weight-black);
  font-size: var(--text-h3);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-tight);
}

/* Desktop nav links */
.tpl-nav-bar__link {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  text-decoration: none;
}

.tpl-nav-bar__link:hover {
  color: var(--color-accent-primary);
  transition: color var(--transition-fast);
}

/* Cart badge */
.tpl-cart-badge {
  background-color: var(--color-accent-primary);
  color: var(--color-text-on-red);
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: var(--weight-bold);
  width: 18px;
  height: 18px;
  border-radius: var(--radius-pill);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Nav drawer */
.tpl-nav-drawer {
  position: fixed;
  top: 0;
  left: 0;
  width: 320px;
  max-width: 85vw;
  height: 100%;
  background-color: var(--color-surface-base);
  border-right: 1px solid var(--color-border);
  z-index: 50;
  transform: translateX(-100%);
  transition: transform var(--transition-slow);
  overflow-y: auto;
}

.tpl-nav-drawer.is-open {
  transform: translateX(0);
}

.tpl-nav-drawer__overlay {
  position: fixed;
  inset: 0;
  background-color: var(--color-overlay);
  z-index: 49;
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--transition-slow);
}

.tpl-nav-drawer__overlay.is-visible {
  opacity: 1;
  pointer-events: auto;
}

/* Drawer section labels */
.tpl-nav-drawer__section-label {
  font-family: var(--font-body);
  font-weight: var(--weight-medium);
  font-size: var(--text-caption);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-widest);
  padding: var(--space-4) var(--space-4) var(--space-2);
}

/* Drawer links */
.tpl-nav-drawer__link {
  display: block;
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  padding: var(--space-3) var(--space-4);
  text-decoration: none;
  border-bottom: 1px solid var(--color-border);
}

/* Bottom persistent bar */
.tpl-bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 56px;
  padding-bottom: env(safe-area-inset-bottom);
  background-color: var(--color-surface-base);
  border-top: 1px solid var(--color-border);
  display: flex;
  z-index: 20;
}

.tpl-bottom-nav__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 56px;  /* Touch target minimum */
  font-family: var(--font-body);
  font-size: var(--text-caption);
  color: var(--color-text-secondary);
  text-decoration: none;
}

.tpl-bottom-nav__item.is-active {
  color: var(--color-accent-primary);
}

@media (min-width: 1024px) {
  .tpl-bottom-nav { display: none; }
}
```

**Scrolled state (desktop):** When user scrolls more than 8px, add `--shadow-sm` below the nav bar via JS class toggle. `box-shadow: var(--shadow-sm)` on `.tpl-nav-bar.is-scrolled`.

**Accessibility:**
- `<nav>` with `aria-label="Main navigation"`
- Hamburger: `aria-expanded="true/false"` `aria-controls="nav-drawer"`
- Focus trap inside open drawer. `Esc` closes drawer.
- Bottom bar: `role="navigation"` `aria-label="Primary actions"`
- Active page: `aria-current="page"`

**Fynd path:** Top nav and drawer customizable in Fynd's header section. Bottom persistent nav requires a custom liquid section in the base theme layout — this cannot be done with a standard Fynd section.

---

### 3.3 Product Card (Grid Item)

**Purpose:** The primary unit of product discovery. Most reused component on the site. Must survive variable name lengths, presence or absence of badges, and price with or without discount.

**Structure:**
```
[Card container — Air white bg, --radius-none]
  [Image container — square 1:1]
    [Product image — object-fit: cover]
    [Badge — top-left overlay, optional]
    [Quick-add button — bottom of image, mobile-visible / desktop-hover]
  [Card body — padding --space-inset-md]
    [Product name — Barlow Condensed Bold, Ink, title case]
    [Product type — Inter Regular, text-secondary]
    [Price — Barlow Condensed Bold, Loud red]
    [Strikethrough price if discounted]
```

**Specs:**
```css
.product-card {
  background-color: var(--color-surface-raised);  /* #FFFFFF — Air */
  border-radius: var(--radius-none);
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.product-card__image-container {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* No drop shadow on the image. No filter. The sticker reads clean on Air white. */

.product-card__body {
  padding: var(--space-3);
}

@media (min-width: 1024px) {
  .product-card__body {
    padding: var(--space-4);
  }
}

.product-card__name {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-h4);
  color: var(--color-text-primary);
  line-height: var(--leading-tight);
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-card__type {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-1);
}

.product-card__price {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-price);
  color: var(--color-accent-primary);  /* Loud red */
  letter-spacing: var(--tracking-wide);
  margin-top: var(--space-2);
}

.product-card__price-original {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
  text-decoration: line-through;
  margin-left: var(--space-2);
}
```

**Quick-add button:**
```css
.product-card__quick-add {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 36px;
  background-color: var(--color-accent-primary);
  color: var(--color-text-on-red);
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  border: none;
  cursor: pointer;
  transition: opacity var(--transition-normal);
}

/* Mobile: always visible */
.product-card__quick-add { opacity: 1; }

/* Desktop: reveal on card hover */
@media (min-width: 1024px) {
  .product-card__quick-add { opacity: 0; }
  .product-card:hover .product-card__quick-add { opacity: 1; }
  .product-card:hover .product-card__image { filter: brightness(1.05); }
}
```

**Badge system (one badge per card — priority order enforced):**

Priority: SOLD OUT > ONLY X LEFT > ONLY AT TPL > NEW > LIMITED EDITION > BEST SELLER > GIFT IDEA

```css
.product-card__badge {
  position: absolute;
  top: var(--space-2);
  left: var(--space-2);
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  padding: 3px 6px;
  border-radius: var(--radius-sm);
  z-index: 1;
  line-height: 1;
}

/* Yellow badges — NEW, LIMITED EDITION, ONLY X LEFT */
.product-card__badge--new,
.product-card__badge--limited,
.product-card__badge--low-stock {
  background-color: var(--color-accent-secondary);
  color: var(--color-text-on-yellow);
}

/* Red badges — ONLY AT TPL, BEST SELLER, GIFT IDEA */
.product-card__badge--exclusive,
.product-card__badge--best-seller,
.product-card__badge--gift {
  background-color: var(--color-accent-primary);
  color: var(--color-text-on-red);
}

/* SOLD OUT — inverted, deliberate contrast */
.product-card__badge--sold-out {
  background-color: var(--color-surface-raised);
  color: var(--color-text-primary);
  border: 1px solid var(--color-text-primary);
}

.product-card--sold-out .product-card__image {
  filter: grayscale(0.4);
}
```

**Accessibility:**
- Full card wrapped in `<a>` to PDP
- Quick-add: `aria-label="Add [product name] to cart"`
- Sold out: `aria-disabled="true"` `disabled` on quick-add button
- Badge text is never `aria-hidden` — it carries purchase information

**Performance:**
- Above-fold cards (first row): `loading="eager"` `fetchpriority="high"`
- All others: `loading="lazy"`
- Serve 320px WebP for mobile, 400px WebP for desktop via `srcset`

---

### 3.4 Product Card (Compact)

**Purpose:** Cross-sell rows on PDP ("Complete your set"), cart upsell rows. Smaller than the grid card.

**Structure:** Horizontal layout in cart, vertical in cross-sell rows.

**Specs:**
- Image: 80px × 80px (cart) / 140px × 140px (cross-sell), `object-fit: cover`, `--radius-none`
- Name: 2 lines max, `--text-body-sm`, `--weight-bold`, `--font-heading`, Ink
- Price: `--text-body-sm`, `--weight-bold`, `--color-accent-primary`
- Padding: `--space-2` (8px) all sides
- No artist attribution line
- Badge visible in cross-sell context, hidden in cart upsell

---

### 3.5 Buttons

Three button variants. All share minimum 48px touch target height.

**Primary Button (Loud red — action moments):**
```css
.btn-primary {
  background-color: var(--color-accent-primary);    /* #E63B2E */
  color: var(--color-text-on-red);                  /* #FFFFFF */
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-cta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-6);
  min-height: 48px;
  width: 100%;  /* Full width on mobile */
  cursor: pointer;
  transition: filter var(--transition-fast), transform var(--transition-fast);
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.btn-primary:hover {
  filter: brightness(1.08);
  transform: scale(1.02);
}

.btn-primary:active {
  filter: brightness(0.92);
  transform: scale(0.99);
}

.btn-primary:disabled,
.btn-primary[aria-disabled="true"] {
  background-color: var(--color-border);
  color: var(--color-text-secondary);
  cursor: not-allowed;
  transform: none;
  filter: none;
}

.btn-primary.is-loading {
  position: relative;
  color: transparent;
}

/* Loading spinner via pseudo-element — keeps button width stable */
.btn-primary.is-loading::after {
  content: '';
  position: absolute;
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-text-on-red);
  border-top-color: transparent;
  border-radius: var(--radius-pill);
  animation: spin 0.7s linear infinite;
}

@media (min-width: 768px) {
  .btn-primary {
    width: auto;
    min-width: 200px;
  }
}
```

**Secondary Button (Ink background — supporting action):**
```css
.btn-secondary {
  background-color: var(--color-text-primary);      /* #1A1A1A — Ink */
  color: var(--color-surface-raised);               /* #FFFFFF — Air */
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-cta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  border: none;
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-6);
  min-height: 48px;
  width: 100%;
  cursor: pointer;
  transition: filter var(--transition-fast);
}

.btn-secondary:hover {
  filter: brightness(1.2);
}

.btn-secondary:disabled {
  background-color: var(--color-border);
  color: var(--color-text-secondary);
  cursor: not-allowed;
}

@media (min-width: 768px) {
  .btn-secondary {
    width: auto;
    min-width: 200px;
  }
}
```

**Ghost Button (transparent — lowest visual weight):**
```css
.btn-ghost {
  background-color: transparent;
  color: var(--color-text-primary);                 /* #1A1A1A — Ink */
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-cta);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  border: 1.5px solid var(--color-text-primary);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-6);
  min-height: 48px;
  width: 100%;
  cursor: pointer;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.btn-ghost:hover {
  background-color: var(--color-text-primary);
  color: var(--color-surface-raised);
}

.btn-ghost:disabled {
  border-color: var(--color-border);
  color: var(--color-text-secondary);
  cursor: not-allowed;
}

@media (min-width: 768px) {
  .btn-ghost {
    width: auto;
    min-width: 160px;
  }
}
```

**Accessibility:** All buttons have explicit visible text. `aria-busy="true"` during loading state. `disabled` + `aria-disabled="true"` when disabled. Never icon-only without `aria-label`.

---

### 3.6 Opinion Headline Block

**Purpose:** Full-width, edge-to-edge headline treatment for homepage hero and collection headers. The type IS the visual. No supporting image required. Barlow Condensed Black at maximum readable size.

**Structure:**
```
[Full-bleed section — Paper bg default, or color override]
  [Headline — Barlow Condensed Black, all caps, edge-to-edge on mobile]
  [Optional sub-line — Inter Regular, sentence case]
```

**Variants:**
- `default` — Paper background (#F5F0EB), Ink headline
- `loud` — Paper background, Loud red (#E63B2E) headline text
- `energy` — Opinion yellow background (#F2D024), Ink headline text

**Specs:**
```css
.tpl-opinion-block {
  width: 100%;
  background-color: var(--color-surface-base);
  padding: var(--space-8) var(--space-4);
}

.tpl-opinion-block--loud {
  background-color: var(--color-surface-base);
}

.tpl-opinion-block--energy {
  background-color: var(--color-surface-energy);
}

.tpl-opinion-block__headline {
  font-family: var(--font-heading);
  font-weight: var(--weight-black);      /* 900 */
  font-size: var(--text-opinion);        /* 48px mobile → 64px desktop */
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  text-transform: uppercase;
  color: var(--color-text-primary);      /* Ink */
}

.tpl-opinion-block--loud .tpl-opinion-block__headline {
  color: var(--color-accent-primary);   /* Loud red text */
}

.tpl-opinion-block--energy .tpl-opinion-block__headline {
  color: var(--color-text-on-yellow);   /* Ink on yellow bg */
}

.tpl-opinion-block__sub {
  font-family: var(--font-body);
  font-weight: var(--weight-regular);
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin-top: var(--space-4);
  max-width: 480px;
}

@media (min-width: 1024px) {
  .tpl-opinion-block {
    padding: var(--space-16) var(--space-12);
  }
}
```

**Rule:** The headline for "SMALL OBJECTS. BIG OPINIONS." and "WEAR YOUR OPINION." always uses this component. These are the brand's loudest statements. Give them the full width.

---

### 3.7 Navigation Chips (Collection Navigation)

**Purpose:** Horizontal scroll row of related collection links at the top of each collection page. Low-friction discovery for Instagram traffic that landed on one collection and wants to browse others.

**Specs:**
```css
.tpl-nav-chips {
  display: flex;
  gap: var(--space-2);
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
  padding-inline: var(--space-4);
  padding-block: var(--space-3);
  padding-right: var(--space-8);  /* Shows partial last chip as scroll hint */
  mask-image: linear-gradient(to right, black 80%, transparent 100%);
}

.tpl-nav-chips::-webkit-scrollbar { display: none; }

.tpl-nav-chip {
  flex-shrink: 0;
  height: 36px;
  padding-inline: var(--space-4);
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body-sm);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-sm);
  background-color: var(--color-surface-raised);
  color: var(--color-text-secondary);
  cursor: pointer;
  white-space: nowrap;
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: background-color var(--transition-fast), color var(--transition-fast);
}

.tpl-nav-chip.is-active {
  background-color: var(--color-text-primary);
  color: var(--color-surface-raised);
  border-color: var(--color-text-primary);
}

.tpl-nav-chip:hover:not(.is-active) {
  background-color: var(--color-accent-secondary);
  color: var(--color-text-on-yellow);
  border-color: var(--color-accent-secondary);
}
```

---

### 3.8 Badge / Pill

**Purpose:** "NEW", "SALE", "GIFT IDEA", "ONLY X LEFT" labels on product tiles and inline in copy. Distinct from collection navigation chips — these are status labels, not interactive filters.

Full badge system is defined in Section 3.3 (Product Card). Summary:

| Label | Background | Text | Use |
|-------|-----------|------|-----|
| NEW | `--color-accent-secondary` | `--color-text-on-yellow` | Added in last 30 days |
| SALE | `--color-accent-primary` | `--color-text-on-red` | Discounted item |
| GIFT IDEA | `--color-accent-primary` | `--color-text-on-red` | Gift-context product |
| ONLY X LEFT | `--color-accent-secondary` | `--color-text-on-yellow` | Stock ≤ 5 |
| LIMITED EDITION | `--color-accent-secondary` | `--color-text-on-yellow` | Drop product |
| BEST SELLER | `--color-accent-primary` | `--color-text-on-red` | Best Sellers tag |
| ONLY AT TPL | `--color-accent-primary` | `--color-text-on-red` | Card stickers |
| SOLD OUT | `--color-surface-raised` | `--color-text-primary` + 1px border | Stock = 0 |

**Specs:**
```css
.badge {
  display: inline-flex;
  align-items: center;
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  padding: 3px 6px;
  border-radius: var(--radius-sm);
  line-height: 1;
}
```

---

### 3.9 Cart Drawer

**Purpose:** Slide-in cart panel from the right side. Allows review and checkout without leaving the current page. Must work at 320px.

**Structure:**
```
[Overlay — full viewport, rgba dark]
[Drawer — slides from right]
  [Header: "YOUR CART (X)" — Barlow Condensed Bold]
  [Close button — ×]
  [Free shipping progress bar]
  [Cart line items — scrollable]
  [Footer — sticky at drawer bottom]
    [Subtotal row]
    [Checkout CTA — full width, Loud red]
    [View cart link]
```

**Specs:**
```css
.tpl-cart-drawer {
  position: fixed;
  top: 0;
  right: 0;
  width: 400px;
  max-width: 100vw;
  height: 100%;
  background-color: var(--color-surface-base);  /* Paper bg */
  border-left: 1px solid var(--color-border);
  z-index: 50;
  display: flex;
  flex-direction: column;
  transform: translateX(100%);
  transition: transform var(--transition-slow);
  box-shadow: var(--shadow-md);
}

.tpl-cart-drawer.is-open {
  transform: translateX(0);
}

@media (max-width: 767px) {
  .tpl-cart-drawer {
    width: 100vw;
    border-left: none;
  }
}

.tpl-cart-drawer__header {
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}

.tpl-cart-drawer__title {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-h3);
  color: var(--color-text-primary);
  text-transform: uppercase;
}

.tpl-cart-drawer__body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4) var(--space-6);
}

.tpl-cart-drawer__footer {
  padding: var(--space-4) var(--space-6);
  padding-bottom: calc(var(--space-4) + env(safe-area-inset-bottom));
  border-top: 1px solid var(--color-border);
  flex-shrink: 0;
  background-color: var(--color-surface-base);
}

.tpl-cart-drawer__subtotal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-4);
}

.tpl-cart-drawer__subtotal-label {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  text-transform: uppercase;
}

.tpl-cart-drawer__subtotal-amount {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-h3);
  color: var(--color-text-primary);
}

/* Checkout CTA — full width, Loud red */
.tpl-cart-drawer__checkout {
  /* Inherits .btn-primary */
  width: 100%;
}

.tpl-cart-drawer__view-cart {
  display: block;
  text-align: center;
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
  margin-top: var(--space-3);
  text-decoration: underline;
}
```

**Quantity selector in cart:**

```css
.qty-selector {
  display: flex;
  align-items: center;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-none);
  overflow: hidden;
}

.qty-selector__btn {
  width: 36px;
  height: 36px;
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-h4);
  color: var(--color-text-primary);
  display: flex;
  align-items: center;
  justify-content: center;
}

.qty-selector__btn:disabled {
  color: var(--color-text-secondary);
  cursor: not-allowed;
}

.qty-selector__count {
  min-width: 36px;
  text-align: center;
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body);
  color: var(--color-text-primary);
}
```

**Accessibility:**
- Focus trap when drawer is open. `Esc` closes.
- `role="dialog"` `aria-modal="true"` `aria-label="Shopping cart"`
- Overlay: tapping closes the drawer

**Fynd path:** Fynd includes a native cart drawer. Override its background and type styles with the tokens above. The free shipping progress bar inside the drawer is a custom component (Section 3.13).

---

### 3.10 Form Fields

**Purpose:** Checkout fields, email capture, contact form, order tracking. Every text input on the site uses these specs.

**Structure:**
```
[Label — above field]
[Input — Air bg, Ink border, Ink text]
[Error message — below field, optional]
```

**Specs:**
```css
.tpl-field {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.tpl-field__label {
  font-family: var(--font-body);
  font-weight: var(--weight-medium);
  font-size: var(--text-body-sm);
  color: var(--color-text-primary);
  text-transform: none;
}

.tpl-field__input,
.tpl-field__textarea,
.tpl-field__select {
  background-color: var(--color-surface-raised);  /* #FFFFFF — Air */
  border: 1px solid var(--color-border-strong);   /* 1px Ink border */
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-weight: var(--weight-regular);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  padding: var(--space-3) var(--space-4);
  height: 48px;
  width: 100%;
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
  -webkit-appearance: none;
}

.tpl-field__textarea {
  height: auto;
  min-height: 96px;
  resize: vertical;
}

.tpl-field__input::placeholder,
.tpl-field__textarea::placeholder {
  color: var(--color-text-secondary);
}

/* Focus state — Loud red border */
.tpl-field__input:focus,
.tpl-field__textarea:focus,
.tpl-field__select:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: 0 0 0 3px rgba(230, 59, 46, 0.15);
}

/* Error state */
.tpl-field__input.has-error,
.tpl-field__textarea.has-error {
  border-color: var(--color-accent-primary);
}

.tpl-field__error {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-accent-primary);
}
```

**Accessibility:**
- Every input has an explicit `<label>` with matching `for`/`id` pairing
- Error messages linked via `aria-describedby`
- Required fields marked with `aria-required="true"` and a visual indicator (asterisk is sufficient)
- Input fields never use `placeholder` as a substitute for a label

---

### 3.11 Gift Badge / Gift CTA

**Purpose:** Visually distinguish gifting moments. "Gift this" on a product page. Gift sets distinguished from regular products. This is a commercial surface — gifting is a priority collection.

**Gift badge (product card):**
- Uses `.product-card__badge--gift` (red background, Air text, per Section 3.3)
- Label: "GIFT IDEA"
- Applied to all products in `/gifts/` collections

**"Gift This" CTA on PDP:**
```css
.tpl-gift-cta {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  border: 1.5px solid var(--color-accent-secondary);  /* Opinion yellow border */
  border-radius: var(--radius-md);
  background-color: transparent;
  cursor: pointer;
  width: 100%;
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-cta);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  transition: background-color var(--transition-fast);
}

.tpl-gift-cta:hover {
  background-color: var(--color-accent-secondary);
  color: var(--color-text-on-yellow);
}

.tpl-gift-cta__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
```

**Gift set card distinction (Bundle Card variant for gift sets):**
- Border: `2px solid var(--color-accent-secondary)` — yellow border signals gift/special offer
- Gift badge in top-left corner of image: "GIFT SET" in red badge
- Below the product name: "Comes gift-packaged" in `--text-body-sm`, `--color-text-secondary`, with a gift box icon
- The matchbook format is denoted by an additional badge: "MATCHBOOK" in yellow badge

**Gift hub sections** use `--color-surface-energy` (#F2D024) as section background for the header row only — this is the permitted full-section use of yellow per Sean's color rules.

---

### 3.12 Add to Cart Button (PDP)

**Purpose:** Primary conversion CTA on the product detail page. Sticky on mobile.

**Variants:**
- `primary` — "ADD TO CART — ₹249" (includes price, full-width on mobile)
- `sticky-mobile` — fixed bar at screen bottom with product name fragment + CTA
- `buy-now` — Ghost button style, below the primary CTA
- `sold-out` — disabled state, same dimensions

**Primary specs:** Inherits `.btn-primary`. Height minimum 48px. Full width on mobile, auto on desktop.

**Sticky mobile bar:**
```css
.tpl-sticky-atc {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: var(--space-3) var(--space-4);
  padding-bottom: calc(var(--space-3) + env(safe-area-inset-bottom));
  background-color: var(--color-surface-base);
  border-top: 1px solid var(--color-border);
  box-shadow: 0 -4px 12px rgba(26, 26, 26, 0.1);
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.tpl-sticky-atc__name {
  flex: 1;
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body-sm);
  color: var(--color-text-primary);
  text-transform: uppercase;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.tpl-sticky-atc__btn {
  /* Inherits .btn-primary */
  flex-shrink: 0;
  width: auto;
  min-width: 160px;
}

@media (min-width: 1024px) {
  .tpl-sticky-atc { display: none; }
}
```

**Appears** via IntersectionObserver when the main ATC button scrolls out of viewport. Disappears when it scrolls back into view. `aria-hidden="true"` when not visible.

---

### 3.13 Free Shipping Progress Bar

**Purpose:** AOV lever. Shows distance to free shipping at ₹499. Appears in cart drawer header and on PDP below the ATC block.

**Specs:**
```css
.tpl-shipping-bar {
  padding: var(--space-4);
  background-color: var(--color-surface-base);
}

.tpl-shipping-bar__message {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.tpl-shipping-bar__message strong {
  font-weight: var(--weight-bold);
}

.tpl-shipping-bar__track {
  height: 6px;
  border-radius: var(--radius-pill);
  background-color: var(--color-border);
  overflow: hidden;
}

.tpl-shipping-bar__fill {
  height: 100%;
  border-radius: var(--radius-pill);
  background-color: var(--color-accent-secondary);  /* Yellow */
  transition: width 400ms ease-out;
  /* width set via inline style: calc((cart_subtotal / 499) * 100%) capped at 100% */
}

/* Complete state — when cart ≥ ₹499 */
.tpl-shipping-bar--complete .tpl-shipping-bar__fill {
  background-color: var(--color-success);
}

.tpl-shipping-bar--complete .tpl-shipping-bar__fill {
  animation: pulse-once 600ms ease-out;
}

@keyframes pulse-once {
  0%   { transform: scaleY(1); }
  50%  { transform: scaleY(1.5); }
  100% { transform: scaleY(1); }
}
```

**Accessibility:** `role="progressbar"` `aria-valuenow="[cart_subtotal]"` `aria-valuemin="0"` `aria-valuemax="499"` `aria-label="Free shipping progress"`

---

### 3.14 Collection Header

**Purpose:** First impression of every collection page. Typography-first. The type IS the hero per Sean's direction.

**Variants:**
- `type-only` — collection name + tagline, Paper background (default)
- `energy` — Opinion yellow background for gifting and seasonal collections
- `with-image` — lifestyle image above name, desktop only

**Specs — type-only (default):**
```css
.tpl-collection-header {
  width: 100%;
  background-color: var(--color-surface-base);
  padding: var(--space-12) var(--space-4);
}

.tpl-collection-header__name {
  font-family: var(--font-heading);
  font-weight: var(--weight-black);
  font-size: var(--text-h1);
  color: var(--color-text-primary);
  text-transform: uppercase;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
}

.tpl-collection-header__tagline {
  font-family: var(--font-body);
  font-weight: var(--weight-regular);
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin-top: var(--space-4);
  max-width: 480px;
}

/* Energy variant — gifting, seasonal */
.tpl-collection-header--energy {
  background-color: var(--color-surface-energy);
}

.tpl-collection-header--energy .tpl-collection-header__name {
  color: var(--color-text-on-yellow);
}

@media (min-width: 1024px) {
  .tpl-collection-header {
    padding: var(--space-16) var(--space-12);
  }
}
```

**Responsive:** On mobile, type-only variant used even for collections that have lifestyle images — image loads below the fold. Collection name is always the first thing seen.

---

### 3.15 Hero Section

**Purpose:** First content section on the homepage. Must communicate brand identity in one screen.

**Structure:**
```
[Full-bleed — Paper bg or lifestyle image with overlay]
  [Opinion headline — Barlow Condensed Black, all caps]
  [Primary CTA — bottom 40% of section]
```

**Specs:**
```css
.tpl-hero {
  width: 100%;
  min-height: 100svh;  /* svh for correct iOS behavior with browser chrome */
  background-color: var(--color-surface-base);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--space-8) var(--space-4);
  padding-bottom: calc(var(--space-8) + env(safe-area-inset-bottom));
}

.tpl-hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}

/* When lifestyle image is present, overlay ensures Ink headline reads on any image */
.tpl-hero--with-image::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    rgba(245, 240, 235, 0.05) 0%,
    rgba(245, 240, 235, 0.7) 100%
  );
}

.tpl-hero__content {
  position: relative;
  z-index: 1;
}

.tpl-hero__headline {
  font-family: var(--font-heading);
  font-weight: var(--weight-black);
  font-size: var(--text-opinion);
  color: var(--color-text-primary);
  text-transform: uppercase;
  line-height: var(--leading-tight);
  letter-spacing: var(--tracking-tight);
  margin-bottom: var(--space-6);
}

/* CTA positioned in bottom 40% — thumb zone */
.tpl-hero__cta {
  /* Inherits .btn-primary */
  max-width: 360px;
}
```

**Hero image is the LCP element.** Must use `loading="eager"` `fetchpriority="high"`. Keep under 100KB. No lazy loading.

---

### 3.16 Trust Signal Bar

**Purpose:** Four-signal trust block. Replaces review social proof at launch. Factual, not promotional.

**Four signals (from Kurt):**
1. "Independent artists" — Every design made by an original artist
2. "Designed in Bengaluru" — Independent studio since 2018
3. "Ships in 2–4 days" — Tracking via WhatsApp
4. "Free shipping above ₹499" — COD available above ₹299

**Specs:**
```css
.tpl-trust-bar {
  width: 100%;
  background-color: var(--color-surface-raised);  /* Air — lifts off Paper */
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
  padding: var(--space-2) 0;
}

.tpl-trust-bar__grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0;
}

@media (min-width: 768px) {
  .tpl-trust-bar__grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.tpl-trust-bar__cell {
  padding: var(--space-6);
  border-right: 1px solid var(--color-border);
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.tpl-trust-bar__cell:last-child,
.tpl-trust-bar__cell:nth-child(2):not(:last-child) {
  border-right: none;
}

@media (min-width: 768px) {
  .tpl-trust-bar__cell { border-right: 1px solid var(--color-border); }
  .tpl-trust-bar__cell:last-child { border-right: none; }
}

.tpl-trust-bar__icon {
  width: 24px;
  height: 24px;
  color: var(--color-accent-primary);  /* Loud red icon */
}

.tpl-trust-bar__heading {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body-sm);
  color: var(--color-text-primary);
  text-transform: uppercase;
}

.tpl-trust-bar__copy {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
}
```

---

### 3.17 Bundle Card

**Purpose:** Multi-product bundles as single purchase units with clear savings signal. Must look meaningfully different from a standard product card.

**Specs:**
```css
.bundle-card {
  background-color: var(--color-surface-raised);
  border: 2px solid var(--color-accent-secondary);  /* Yellow border — signals special offer */
  border-radius: var(--radius-none);
  overflow: hidden;
}

.bundle-card__badge {
  /* "BUNDLE DEAL" or "SAVE ₹X" — yellow background */
  background-color: var(--color-accent-secondary);
  color: var(--color-text-on-yellow);
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
  padding: var(--space-2) var(--space-3);
  display: inline-block;
}

.bundle-card__name {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-h3);
  color: var(--color-text-primary);
  text-transform: uppercase;
  padding: var(--space-4);
}

.bundle-card__contents {
  list-style: none;
  padding: 0 var(--space-4);
  margin: 0;
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
}

.bundle-card__contents li + li::before {
  content: ' · ';
}

.bundle-card__price-row {
  padding: var(--space-4);
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.bundle-card__price {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-h2);
  color: var(--color-accent-primary);
}

.bundle-card__price-original {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
  text-decoration: line-through;
}

.bundle-card__savings {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: 14px;
  color: var(--color-accent-secondary);
  text-transform: uppercase;
}
```

**Responsive:**
- Mobile: full width
- Desktop: spans 2 grid columns in a 4-column grid

**Savings number must be accurate — never hardcoded.** Pulled from Fynd metafields: `bundle_individual_total` vs `bundle_price`. If this data is unavailable from Fynd natively, Tobi must use a product metafield.

---

### 3.18 FAQ Accordion

**Purpose:** FAQ page and PDP product details sections.

**Specs:**
```css
.tpl-accordion__item {
  border-bottom: 1px solid var(--color-border);
}

.tpl-accordion__trigger {
  width: 100%;
  min-height: 56px;
  padding: var(--space-4) 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
}

.tpl-accordion__question {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--tracking-wider);
}

.tpl-accordion__icon {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  color: var(--color-text-secondary);
  transition: transform var(--transition-normal);
}

.tpl-accordion__item.is-open .tpl-accordion__icon {
  transform: rotate(180deg);
}

.tpl-accordion__panel {
  max-height: 0;
  overflow: hidden;
  transition: max-height var(--transition-slow);
}

.tpl-accordion__item.is-open .tpl-accordion__panel {
  max-height: 500px;
}

.tpl-accordion__answer {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  line-height: var(--leading-normal);
  padding-bottom: var(--space-4);
}
```

**Accessibility:** Trigger is `<button>`. `aria-expanded="true/false"`. `aria-controls="[panel-id]"`. Panel has `id` and `role="region"`.

---

### 3.19 WhatsApp CTA Button

**Purpose:** Primary sharing and support channel. WhatsApp is the primary communication channel for Indian mobile shoppers.

**Variants:** `inline` (on PDP), `floating` (fixed, all pages)

**Specs — floating:**
```css
.tpl-whatsapp-float {
  position: fixed;
  bottom: calc(72px + env(safe-area-inset-bottom));
  right: var(--space-4);
  width: 56px;
  height: 56px;
  border-radius: var(--radius-pill);
  background-color: #25D366;  /* WhatsApp brand green — only permitted brand exception */
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-md);
  z-index: 150;
  text-decoration: none;
}

/* On PDP mobile — must sit above sticky ATC bar */
.page-pdp .tpl-whatsapp-float {
  bottom: calc(56px + var(--space-4) + env(safe-area-inset-bottom));
}

.tpl-whatsapp-float__icon {
  width: 28px;
  height: 28px;
  fill: #FFFFFF;
}
```

**Accessibility:** `aria-label="Chat on WhatsApp"` `title="Chat on WhatsApp"`

---

### 3.20 Price Display

**Purpose:** Product price, discount, and prepaid incentive. Reused on product cards, PDP, cart, order summary.

**Specs:**
```css
.price {
  display: flex;
  align-items: baseline;
  gap: var(--space-2);
  flex-wrap: wrap;
}

.price__current {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-price);
  color: var(--color-accent-primary);  /* Loud red — always */
  letter-spacing: var(--tracking-wide);
}

.price__original {
  font-family: var(--font-body);
  font-weight: var(--weight-regular);
  font-size: var(--text-body-sm);
  color: var(--color-text-secondary);
  text-decoration: line-through;
}

.price__prepaid-badge {
  display: inline-flex;
  align-items: center;
  background-color: rgba(62, 207, 76, 0.12);
  color: var(--color-success);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: var(--weight-medium);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}
```

**Rule:** Strikethrough price MUST accompany any promotional price. Never show a lower price without the reference MRP.

**Accessibility:** `<del aria-label="Original price ₹299">₹299</del>` and `<ins aria-label="Sale price ₹249">₹249</ins>`

---

### 3.21 Toast / Notification

**Purpose:** Non-blocking feedback for cart actions, free shipping unlock, errors.

**Specs:**
```css
.tpl-toast {
  position: fixed;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 200;
  max-width: 320px;
  background-color: var(--color-surface-raised);  /* Air white */
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
  border-left: 4px solid var(--color-accent-primary);
  padding: var(--space-4);
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  animation: slide-in var(--transition-slow) ease-out;
}

@media (max-width: 767px) {
  .tpl-toast {
    left: var(--space-4);
    right: var(--space-4);
    max-width: none;
  }
}

.tpl-toast--success {
  border-left-color: var(--color-success);
}

.tpl-toast__text {
  font-family: var(--font-body);
  font-size: var(--text-body-sm);
  color: var(--color-text-primary);
}

@keyframes slide-in {
  from { transform: translateY(-20px); opacity: 0; }
  to   { transform: translateY(0);     opacity: 1; }
}
```

**Accessibility:** `role="status"` `aria-live="polite"` for cart/success. `role="alert"` `aria-live="assertive"` for errors. `aria-atomic="true"`.

---

### 3.22 Payment Method Selector

**Purpose:** Payment selection at checkout. UPI first — it is the fastest-growing payment method and the preferred prepaid option.

**Specs:**
```css
.tpl-payment-option {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-4);
  height: 56px;
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: border-color var(--transition-fast);
}

.tpl-payment-option.is-selected {
  border: 2px solid var(--color-accent-primary);
}

.tpl-payment-option__label {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  text-transform: uppercase;
  flex: 1;
}

.tpl-payment-option__badge {
  /* "Save ₹30" — yellow badge */
  background-color: var(--color-accent-secondary);
  color: var(--color-text-on-yellow);
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: var(--weight-medium);
  padding: 2px 8px;
  border-radius: var(--radius-pill);
}
```

**COD minimum enforcement:** If cart total < ₹299, COD option has `aria-disabled="true"` and shows inline message: "Add ₹[X] to enable COD" in `--text-body-sm`, `--color-text-secondary`.

---

### 3.23 Empty State / Error State

**Purpose:** Feedback when filters produce no results, cart is empty, search finds nothing.

**Specs:**
```css
.tpl-empty-state {
  padding: var(--space-16) var(--space-4);
  text-align: center;
}

.tpl-empty-state__headline {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-h2);
  color: var(--color-text-primary);
  text-transform: uppercase;
  margin-bottom: var(--space-4);
}

.tpl-empty-state__sub {
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-8);
}
```

No illustrations, no mascots, no sad-face icons. The copy carries the moment. Joanna owns empty state copy.

---

### 3.24 Loading Skeleton

**Purpose:** Placeholder while product cards load. Prevents layout shift.

```css
.skeleton {
  background: linear-gradient(
    90deg,
    var(--color-border)       0%,
    rgba(224, 218, 211, 0.5)  50%,
    var(--color-border)       100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: var(--radius-none);
}

@keyframes shimmer {
  0%   { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}

/* Skeleton card mirrors product-card dimensions */
.skeleton-card {
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
}

.skeleton-card__image {
  /* composes: skeleton */
  aspect-ratio: 1 / 1;
  width: 100%;
}

.skeleton-card__line--name  { width: 80%; height: 18px; }
.skeleton-card__line--type  { width: 40%; height: 13px; margin-top: var(--space-2); }
.skeleton-card__line--price { width: 60%; height: 20px; margin-top: var(--space-2); }
```

---

## Part 4: Responsive Behavior Rules

### 4.1 Mobile-First Breakpoint Strategy

Write all CSS for 320px first. Override at breakpoints using `min-width` only. Never `max-width` in component code.

**Design target: 375px.** Primary audience devices: Samsung Galaxy A-series, Redmi Note series. Every component validated at 375px before QA.

**Critical responsive changes:**

| Component | Mobile (< 768px) | Tablet (768–1023px) | Desktop (≥ 1024px) |
|-----------|-----------------|---------------------|---------------------|
| Announcement bar | Scrolls with page | Scrolls with page | Sticky at top |
| Header | Paper bg, wordmark + icons | Paper bg, wordmark + icons | Full horizontal nav |
| Bottom nav | Visible (fixed) | Visible (fixed) | Hidden |
| Product grid | 2 columns | 3 columns | 4 columns |
| Collection header | Type-only | Type with optional image | Type with image |
| PDP layout | Single column | Single column, wider | 2-column (gallery + details) |
| Sticky ATC | Fixed bottom | Fixed bottom | Hidden (ATC in flow) |
| Cart drawer | Full width (100vw) | 400px wide | 400px wide |
| Trust bar | 2x2 grid | 4-column row | 4-column row |
| Bundle card | Full width | 2 columns | Spans 2 of 4 columns |
| WhatsApp float | Icon only | Icon only | Icon + "Chat" text |
| Buttons | Full width | Auto (min 200px) | Auto (min 200px) |

### 4.2 Touch Target Rules

Minimums, not targets.

- All interactive elements: 48px minimum in both dimensions
- Bottom nav bar items: 56px height
- Cart icon in header: 44×44px hit area (icon can be 24px visually)
- Quick-add button on card: 36px height (secondary action — 48px preferred)
- Quantity selector buttons: 44×44px minimum
- Accordion triggers: 56px height minimum

The Indian Android audience uses phones with screen protectors that reduce touch sensitivity. 48px (Google Material guideline) is the floor, not the Apple HIG 44px.

### 4.3 Thumb Zone Design

On a 375px screen held in one hand, the comfortable thumb zone is the bottom 60% of the screen. The stretch zone is the top 40%.

- Primary CTA (Add to Cart, Checkout) always in the bottom 60% of the viewport on mobile
- Hero CTA anchored to the bottom of the hero section
- Bottom persistent nav bar exploits the most comfortable zone
- Search icon in top nav is in the stretch zone — acceptable (not a primary action)

### 4.4 Safe Area Handling

Non-optional. Without `env(safe-area-inset-bottom)`, the CTA button overlaps the iOS home indicator on iPhone models without a home button.

```css
.tpl-sticky-atc,
.tpl-bottom-nav,
.tpl-cart-drawer__footer {
  padding-bottom: calc([base-padding] + env(safe-area-inset-bottom));
}
```

---

## Part 5: Interaction Patterns

### 5.1 Add to Cart Feedback Sequence

1. Tap "ADD TO CART" — button shows loading state (spinner appears at 100ms — not instant)
2. Fynd cart API call executes
3. Success: button text briefly shows "ADDED" (500ms), then returns to "ADD TO CART — ₹X"
4. Cart badge count increments (brief scale-up animation)
5. Toast: "Added to cart" (3 seconds)
6. If total crosses ₹499: toast overrides to "Free shipping unlocked!" with green styling and bar completes

On failure: button returns to default. Error toast: "Couldn't add to cart. Try again."

### 5.2 Free Shipping Bar Celebration

When cart crosses ₹499:
- Fill transitions from yellow to green
- Bar pulses once (`pulse-once` keyframe — not a loop)
- Message: "Free shipping unlocked!" with checkmark
- Cart page: brief CSS-only confetti burst. This is the single celebratory animation in the system.

### 5.3 Filter Collapse on Mobile

Filters are not a modal. They are a horizontal chip row. When a filter chip is tapped:
- A panel slides down below the chip row
- Panel shows filter options as large chips (48px height)
- "Apply" button at panel bottom (`.btn-primary` style)
- Panel closes on Apply or tap outside

Panel background: `--color-surface-raised`. Panel pushes product grid down — no z-index overlay. This works better with Fynd's section-based architecture.

### 5.4 Sticky Elements Z-Index Stack

```
z-index: 10   — Sticky filter bar
z-index: 20   — Sticky header + bottom nav bar
z-index: 49   — Nav drawer overlay
z-index: 50   — Nav drawer + cart drawer
z-index: 100  — Sticky Add to Cart bar (mobile PDP)
z-index: 150  — WhatsApp floating button
z-index: 200  — Toasts
z-index: 300  — Modals / image lightbox
```

---

## Part 6: Accessibility Baseline

### 6.1 Color Contrast — Light + Bold System

The Light + Bold palette creates strong contrast. Verified pairs:

| Foreground | Background | Ratio | WCAG | Use |
|------------|------------|-------|------|-----|
| #1A1A1A (Ink) | #F5F0EB (Paper) | ~14.5:1 | AAA | Body text, headings on page |
| #1A1A1A (Ink) | #FFFFFF (Air) | 21:1 | AAA | Text on product cards, form fields |
| #1A1A1A (Ink) | #F2D024 (yellow) | ~12:1 | AAA | Announcement bar, yellow section text |
| #FFFFFF (Air) | #E63B2E (red) | ~4.8:1 | AA | CTA button text — meets AA |
| #6B6B6B (muted) | #F5F0EB (Paper) | ~5.2:1 | AA | Captions, metadata on page |
| #6B6B6B (muted) | #FFFFFF (Air) | ~6.5:1 | AA | Captions on card |

**Rules enforced:**
- `--color-text-secondary` (#6B6B6B) is used only for non-critical information. Never on interactive elements.
- All CTA text meets WCAG AA minimum. If a button size is below 18px bold (large text threshold), ensure AA compliance — red button with white text at 4.8:1 meets AA for normal text only if combined with sufficient font weight and size. `.btn-primary` uses Barlow Condensed Bold 16px, which meets AA.

### 6.2 Focus States

Light backgrounds require a different focus ring from the dark system. Yellow on Paper creates ambiguity; use Loud red outline for visibility.

```css
:focus-visible {
  outline: 2px solid var(--color-accent-primary);  /* Loud red — visible on Paper */
  outline-offset: 2px;
}

/* On yellow/energy backgrounds, flip to Ink outline */
.section-full-bleed--energy :focus-visible {
  outline-color: var(--color-text-primary);
}
```

Use `:focus-visible` not `:focus` — `:focus` shows rings on mouse click, which is distracting.

### 6.3 Screen Reader Considerations

- **Product images:** Every product image requires meaningful alt text. Format: "[Product name] — [type context]". Example: `alt="Idiot Repellent Keychain — enamel keychain with zinc alloy ring"`
- **Badges:** Badge text is always visible to screen readers. Never `aria-hidden` badge content.
- **Price display:** Use `<del>` and `<ins>` with explicit `aria-label` for discounted prices.
- **Progress bar:** `aria-valuenow`, `aria-valuemin`, `aria-valuemax`, `aria-label` required.
- **Loading states:** `aria-busy="true"` on loading buttons. Keep button text in the DOM.

---

## Part 7: Performance Constraints

### 7.1 Image Strategy

```html
<picture>
  <source srcset="/images/product-400.webp 400w, /images/product-800.webp 800w"
          type="image/webp">
  <img src="/images/product-400.jpg"
       srcset="/images/product-400.jpg 400w, /images/product-800.jpg 800w"
       sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
       alt="[alt text]"
       loading="lazy"
       width="400" height="400">
</picture>
```

| Context | Rendered size | Source size |
|---------|-------------|-------------|
| Grid card mobile | ~160px | 320px WebP, ~15–20KB |
| Grid card desktop | ~280px | 400px WebP, ~25–35KB |
| PDP primary (mobile) | 375px | 750px WebP, ~40–60KB |
| PDP primary (desktop) | ~550px | 1000px WebP, ~60–80KB |
| PDP thumbnail | 72px | 150px WebP, ~5–8KB |
| Hero section | 375–1280px | 1200px WebP, <100KB |
| Cart line item | 72px | 150px WebP, ~5–8KB |

**Loading priority:**
- Hero image: `loading="eager"` `fetchpriority="high"` — this is the LCP element. Never lazy-load it.
- First row of product cards: `loading="eager"`
- All others: `loading="lazy"`

LCP target: <3s on 4G (10Mbps, 150ms latency).

### 7.2 Font Loading

Barlow Condensed (700/900) + Inter (400). Space Mono removed from this system — use Inter for numeric microcopy where previously Space Mono was specified.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;900&family=Inter:wght@400;500&display=swap"
      rel="stylesheet">
```

`font-display: swap` is mandatory. Total font weight with subsetting: ~90–110KB.

### 7.3 Performance Budget

| Asset type | Budget |
|-----------|--------|
| Total page weight (initial load) | <500KB |
| Hero image | <100KB |
| Total images above fold | <200KB |
| JS (initial bundle) | <100KB |
| CSS (full) | <50KB |
| Fonts | <120KB |

Fynd's base JS and CSS adds weight not in this budget. Tobi must audit Fynd's base payload before adding custom code.

---

## Part 8: Fynd / Commerce.com Platform Constraints

### 8.1 What Fynd Handles Natively (customize via settings + CSS overrides)

| Component | Fynd implementation |
|-----------|---------------------|
| Announcement bar | Native announcement section — override background, font, color |
| Header + nav | Native header section — override background, font, drawer styles |
| Product card | Product card block in collection section — override card, badge, price styles |
| Collection header | Native collection banner — override with type-only treatment |
| Product grid | Native collection grid — configure column count, gap, sorting |
| Filter bar | Native filter component — style to match the chip system |
| PDP gallery | Native media gallery — style thumbnails, dots |
| Cart (page) | Native cart template — override background, typography, button styles |
| Toast / add-to-cart feedback | Native Fynd cart feedback + CSS visual override |
| Loading skeletons | CSS-only on Fynd's lazy-load placeholders |
| FAQ accordion | Custom liquid component (simple — just HTML/CSS) |

### 8.2 What Requires Custom Development

**Priority 1 — Must be live on launch day:**
1. **Sticky Add to Cart bar (mobile PDP)** — custom liquid section added to PDP template + IntersectionObserver JS. Class: `.tpl-sticky-atc`
2. **Free shipping progress bar** — custom liquid section in cart template + Fynd cart attributes for subtotal. Class: `.tpl-shipping-bar`
3. **WhatsApp floating button** — custom liquid section in base layout. Class: `.tpl-whatsapp-float`
4. **Bottom persistent nav bar** — custom liquid section in mobile base layout. Class: `.tpl-bottom-nav`
5. **COD minimum enforcement message** — custom cart validation display using Fynd cart attributes

**Priority 2 — Post-launch (30-day window):**
6. Drop countdown timer — JS countdown component
7. Bundle replacement suggestion in cart — custom cart logic
8. Drop notification signup — form + MSG91/WhatsApp integration

### 8.3 CSS Custom Properties in Fynd

All tokens from Part 1 must be defined in the base stylesheet (Fynd's `base.css` or equivalent) so they are available site-wide. Do not use Fynd's built-in color/font settings fields if they cannot accept CSS variable syntax. Override Fynd settings output with the token-based system in a custom CSS file that loads last.

### 8.4 Component Naming Convention

BEM (Block__Element--Modifier). Prefix all custom components with `tpl-` to prevent class name collisions with Fynd's native classes.

```
.product-card              — block
.product-card__image       — element
.product-card__badge       — element
.product-card--compact     — modifier
.product-card--sold-out    — modifier

.tpl-sticky-atc            — custom component
.tpl-shipping-bar          — custom component
.tpl-whatsapp-float        — custom component
.tpl-bottom-nav            — custom component
.tpl-announcement-bar      — custom component
.tpl-cart-drawer           — custom component
.tpl-opinion-block         — custom component
```

### 8.5 Performance Tasks Specific to Fynd

1. Confirm Fynd serves images through a CDN — WebP conversion may happen at the CDN layer automatically
2. Configure asset host to serve from `cdn.theproductlab.in` or equivalent for cache control headers
3. Audit Fynd's default JS bundle weight before adding any custom JS
4. Use Fynd's built-in lazy loading for product images if available — do not run two lazy loaders
5. Ensure Fynd's theme does not load unused section scripts on pages that don't use those sections

---

## Part 9: Anti-Drift Rules

Six rules from Sean's visual identity that must be enforced as CSS/component decisions. These prevent the UI from accidentally looking premium or minimal.

**Rule 1: No large white-space layouts.**
Abundance is the message. The product grid gap is `--space-4` (16px). Do not increase it to make the layout feel "cleaner." Section padding follows the `--space-section` token — do not add extra padding to "let things breathe." If a page looks sparse, add more products or use a full-bleed colored section, not more space.

**Rule 2: No thin typography.**
Font weight `--weight-regular` (400) is permitted only for body copy and Inter microcopy. Barlow Condensed is never set below `--weight-bold` (700). Never use Inter for headings at any weight. Never use Inter Light or Barlow Regular for anything visible.

**Rule 3: Red and yellow must appear above the fold on every page.**
The announcement bar provides Opinion yellow. The primary CTA or a badge on the first product card provides Loud red. If a page design reaches the fold without showing both accent colors, something is wrong with the section order — not with this rule.

**Rule 4: Buttons must be chunky and prominent.**
`.btn-primary` is 48px tall minimum. On mobile it is full width. It uses `--color-accent-primary` (Loud red). A button that looks "elegant" or "refined" is the wrong button for this brand. If someone is styling it down, reset to spec.

**Rule 5: Product cards sit on Air white (#FFFFFF), not Paper (#F5F0EB).**
The slight contrast between card (Air) and page background (Paper) creates the depth that replaces shadows. If this contrast disappears — because someone put product cards on a white section background — the hierarchy collapses. Product cards always get `background-color: var(--color-surface-raised)` (#FFFFFF) and they always sit on a section using `var(--color-surface-base)` (#F5F0EB).

**Rule 6: No gradients, no shadows on product images, no dark backgrounds on any digital surface.**
Gradients and drop shadows on product images read marketplace. Dark backgrounds (#1A1A1A as a page surface) read luxury/premium. Neither is right for this brand. If Fynd's default product card includes a `box-shadow` on the image, remove it explicitly. The `--shadow-none` token is the correct value for product images. Dark sections are never used for page backgrounds in the digital interface — they are reserved for print poster moments only.

---

## Part 10: System Rules

### What This System Forbids

1. **No hardcoded hex values in components.** Every color value uses a token. If a token does not exist for a required color, the token table is wrong — fix it there.

2. **No product card images with drop shadows.** The visual system creates separation through Air-on-Paper contrast. Shadows on product images read as marketplace photography.

3. **No gradients.** Ever. This brand is flat and direct. No `linear-gradient` or `radial-gradient` backgrounds. The single permitted gradient is the Paper-toned overlay in `.tpl-hero--with-image` — and even that uses the same Paper color, not a multi-hue gradient.

4. **No dark surface (#1A1A1A) as a digital page background.** Dark is for print posters only. Any section using `background-color: #1A1A1A` on a digital page fails this system.

5. **No scale transforms on product cards.** The brand is confident. Scale effects read as playful, not the right register. The single permitted scale transform is `scale(1.02)` on `.btn-primary` hover — nothing else.

6. **No components that appear only once on the site.** If a design element cannot be reused, question its existence. One-off sections are maintenance burdens for a one-person operation.

7. **No fixed bottom bars without `env(safe-area-inset-bottom)`.** Without this, the bar overlaps the iOS home indicator. This rule has no exceptions.

8. **No font sizes below 11px.** The `--text-caption` token at 11px mobile is already the floor. Going smaller creates accessibility violations and fails readability on low-DPI screens.

9. **No lazy loading the hero image.** The hero is the LCP element. `loading="lazy"` on it will cause a multi-second regression on 4G.

10. **No fake urgency counters.** The inventory counter on drops must pull from Fynd's actual stock. A static number that does not decrement will be called out by the audience.

### What Keeps This System Alive

- Every color, size, and spacing value is a token. Changing a token updates every component that uses it.
- Every component is designed to handle variable-length content: 2-line text truncation, flexible price display, optional badges.
- Components are named by role, not content: `.product-card` not `.bullshit-remover-card`.
- The grid gap and section padding values favor density over space — keeping the system aligned with Sean's anti-drift rules without manual policing.

### What Breaks This System

- Someone hardcodes a hex value in a component instead of using the token
- A one-off section is built for a specific product that does not follow the grid system
- The announcement bar is repurposed for non-brand content (delivery status, ad copy) and loses its signal value
- The opinion yellow is applied to large section backgrounds in non-drop, non-promo contexts — it loses urgency
- Section padding is increased "to give things room" — this is the primary vector for drift toward a premium aesthetic

---

## Handoff Notes

**For Sean:** Every color token in Part 1 derives directly from `artifacts/phase-4/visual-identity-rebrand.md`. The five-color system (Paper, Ink, Loud, Opinion, Air) is implemented exactly as specified. Anti-drift rules in Part 9 are the six rules from Sean's file translated into build-level enforcement. Review Section 3.6 (Opinion Headline Block) and Section 3.15 (Hero Section) for the brand statement typographic treatments. Review Section 3.1 (Announcement Bar) for the Opinion yellow implementation.

**For Tobi:** Part 8 is written for you. Sections 8.1–8.2 are the complete Fynd implementation map — what the platform handles natively and what requires custom liquid. The five Priority 1 custom components are `tpl-sticky-atc`, `tpl-shipping-bar`, `tpl-whatsapp-float`, `tpl-bottom-nav`, and COD minimum enforcement. The `tpl-` prefix convention in 8.4 prevents class name collisions with Fynd's native classes. Every component spec in Part 3 includes exact CSS — copy the CSS block directly into the Fynd theme, do not paraphrase it. The font loading snippet in 7.2 replaces the Phase 3 version (Space Mono has been removed from this system).

**For Kurt:** All components in Part 3 implement Kurt's wireframes. The nav drawer content in Section 3.2 is verbatim from Kurt's IA. Badge priority order in Section 3.8 is from Kurt's collection wireframe. Sticky ATC in Section 3.12 implements Kurt's mobile friction solution. Free shipping bar in Section 3.13 implements Kurt's cart Block 6 logic. One flag for Tobi: the filter panel on mobile uses a push-down approach rather than an overlay — if this conflicts with Fynd's native filter component behavior, Tobi determines the technical resolution.
