<!-- last-updated: 2026-03-28 -->
# UI Component System & Implementation Specs

| Field | Value |
|-------|-------|
| **Phase** | 3 — Creative |
| **Producing Agent** | Julie (UI System Lead) |
| **Date** | 2026-03-28 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## How to Read This Document

This is the implementation contract between design and build. Every decision here traces to one of three sources: Sean's visual identity system (`visual-identity.md`, updated 2026-03-28 — Light+Bold / Organised Chaos direction), Kurt's wireframes (`ux-ia-wireframes.md`, updated 2026-03-28), or a technical constraint from the Fynd platform. When a rule appears without explanation, the rationale is in one of those three documents.

Tobi implements from this document. Sean reviews for visual consistency. Harley approves before build begins.

**What changed in this revision (2026-03-28):** The visual direction has moved from Darkroom (dark #1A1A1A backgrounds as the dominant surface) to Light+Bold (warm cream #F5F0EB as the dominant canvas, off-black #1A1A1A as ink). Five new components are added in Part 3C: Opinion Wall, Sticker Wall Product Layout, Record Store Browse Card, Counter Display Tile, and Pick Up Interaction State. All existing components that referenced dark surfaces have been updated. Color tokens, shadow tokens, and the accessibility contrast table reflect the new direction. Components not affected by the direction change are unchanged.

What this document does NOT decide: color hex values, typeface names, copy, or page structure. Those are locked by Sean and Kurt respectively.

---

## Part 1: Design Tokens

### 1.1 Color Tokens

Colors are named by role, not by hue. If Sean updates a hex value, the component that uses `--color-accent-primary` updates automatically without touching component code. Do not hardcode hex values anywhere except this token table.

The dominant surface is now warm cream. Off-black is the ink. Red and yellow remain signal colors only.

```css
:root {
  /* Surfaces — Light+Bold direction */
  --color-surface-base:       #F5F0EB;  /* Primary background — page, product cards, the canvas */
  --color-surface-raised:     #EDE8E3;  /* Slightly darker cream — nav, footer, secondary cards */
  --color-surface-dark:       #1A1A1A;  /* Dark surface — opinion bar, drop announcements, packaging */
  --color-surface-dark-raised: #2D2D2D; /* Elevated dark — used inside dark-surface components only */

  /* Text */
  --color-text-primary:       #1A1A1A;  /* Body text, headings, product names on cream bg */
  --color-text-secondary:     #6B6B6B;  /* Metadata, captions, disabled states on cream */
  --color-text-on-dark:       #F5F0EB;  /* Text on dark (#1A1A1A) surface */
  --color-text-on-accent:     #1A1A1A;  /* Text on yellow accent background */
  --color-text-on-red:        #F5F0EB;  /* Text on signal red background */

  /* Accent */
  --color-accent-primary:     #E63B2E;  /* CTAs, badges, error states, No Filter collection */
  --color-accent-secondary:   #F2D024;  /* Drop announcements, new badges, opinion bar bg variant */
  --color-accent-pure-white:  #FFFFFF;  /* Max-contrast moments: sold out badge, critical alerts */

  /* Functional */
  --color-success:            #3ECF4C;  /* Added to cart, in stock, confirmation states */
  --color-border:             #D4CFC9;  /* Card borders, rule lines on cream surface — 1px */
  --color-border-dark:        #3A3A3A;  /* Rule lines on dark surface */
}
```

**Color usage rules — non-negotiable:**
- `--color-surface-base` is now cream. The page background is light. Do not revert to dark as a default surface.
- `--color-surface-dark` (#1A1A1A) is used as a surface only for: the opinion bar, drop announcement strips, the Record Store Browse card background, and packaging references. It is not a page background.
- `--color-accent-primary` (red) and `--color-accent-secondary` (yellow) are signal colors. They are never backgrounds for large areas — with one exception: the opinion bar can use `--color-accent-secondary` as its background when a drop is live.
- `--color-text-secondary` (#6B6B6B on cream) is used only for non-critical information: captions, metadata, disabled states. Never on interactive elements — it fails WCAG AA for interactive text on cream.
- Maximum two accent colors on any single screen surface. Red and yellow together is the ceiling.
- Product photography provides all the colour variety the system needs. The cream canvas and black ink do not compete with the products. They support them.

### 1.2 Typography Tokens

Sean's font direction is unchanged. The opinion text tier is new and critical to the Light+Bold direction.

```css
:root {
  /* Typefaces — Google Fonts, loaded with font-display: swap */
  --font-heading:    'Barlow Condensed', system-ui, sans-serif;
  --font-body:       'Inter', system-ui, sans-serif;
  --font-mono:       'Space Mono', 'Courier New', monospace;

  /* Weights */
  --weight-regular:  400;
  --weight-medium:   500;
  --weight-semibold: 600;
  --weight-bold:     700;

  /* Opinion text — the defining typographic move of the Light+Bold direction */
  /* These values are viewport-relative, not rem. They ARE the layout. */
  --text-opinion-xl:  18vw;   /* Largest opinion phrases — fills the frame */
  --text-opinion-lg:  14vw;   /* Mid-weight opinion phrases */
  --text-opinion-md:  10vw;   /* Supporting opinion phrases */
  --text-opinion-sm:   8vw;   /* Background/receding opinion phrases */

  /* Standard scale — mobile first. Desktop overrides in media query. */
  --text-h1:         2rem;      /* 32px mobile → 3.5rem (56px) desktop */
  --text-h2:         1.5rem;    /* 24px mobile → 2.5rem (40px) desktop */
  --text-h3:         1.25rem;   /* 20px mobile → 1.75rem (28px) desktop */
  --text-h4:         1.125rem;  /* 18px mobile → 1.5rem  (24px) desktop */
  --text-body:       0.9375rem; /* 15px mobile → 1rem    (16px) desktop */
  --text-body-sm:    0.8125rem; /* 13px mobile → 0.875rem (14px) desktop */
  --text-caption:    0.6875rem; /* 11px mobile → 0.75rem  (12px) desktop */
  --text-cta:        0.875rem;  /* 14px mobile → 1rem     (16px) desktop */
  --text-price:      1rem;      /* 16px mobile → 1.125rem (18px) desktop */
  --text-opinion-bar: 0.8125rem; /* 13px mobile → 0.875rem (14px) desktop */

  /* Line heights */
  --leading-opinion: 0.92;  /* Opinion Wall text — lines nearly touching, density is the effect */
  --leading-tight:   1.1;   /* Headings */
  --leading-normal:  1.6;   /* Body text */
  --leading-caption: 1.4;   /* Captions, metadata */

  /* Letter spacing */
  --tracking-opinion: -0.03em;  /* Opinion text — compressed */
  --tracking-tight:   -0.02em;  /* H1 */
  --tracking-snug:    -0.01em;  /* H2, H4 */
  --tracking-normal:   0;       /* H3, body */
  --tracking-wide:     0.02em;  /* Price */
  --tracking-wider:    0.03em;  /* Opinion bar, CTA */
  --tracking-widest:   0.05em;  /* Caption/mono labels */
}

@media (min-width: 1024px) {
  :root {
    --text-h1:         3.5rem;
    --text-h2:         2.5rem;
    --text-h3:         1.75rem;
    --text-h4:         1.5rem;
    --text-body:       1rem;
    --text-body-sm:    0.875rem;
    --text-caption:    0.75rem;
    --text-cta:        1rem;
    --text-price:      1.125rem;
    --text-opinion-bar: 0.875rem;
    /* Opinion vw values naturally scale with viewport — no override needed */
  }
}
```

**Opinion text tier rules:**
- Opinion text is set in Barlow Condensed Bold, uppercase, with `--tracking-opinion` and `--leading-opinion`.
- The vw unit is deliberate. At 375px, `18vw` = ~67px. At 1280px, `18vw` = 230px. The text fills the frame at every viewport width without manual override.
- Three opacity layers in the Opinion Wall: 100% (primary, fully legible), 50-60% (supporting), 20-30% (background texture). Never below 20% — below that, the text serves no purpose.
- The `--text-opinion-*` scale is not used for body copy, nav, or commerce elements. It exists only for the Opinion Wall, Burst Through, and collection headers.

### 1.3 Spacing Tokens

4px base unit. The Light+Bold direction uses tighter spacing than Darkroom — density signals abundance. PDP and checkout retain comfortable spacing for commerce clarity.

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

  /* Named semantic spacing */
  --space-inset-sm:   var(--space-3);  /* Inner padding — small components */
  --space-inset-md:   var(--space-4);  /* Inner padding — standard components */
  --space-inset-lg:   var(--space-6);  /* Inner padding — cards, sections */
  --space-stack-sm:   var(--space-2);  /* Between tightly related elements */
  --space-stack-md:   var(--space-4);  /* Between related elements */
  --space-stack-lg:   var(--space-8);  /* Between sections within a page */
  --space-section:    var(--space-12); /* Between major page sections */
}
```

**Density rules from Sean's direction:**
- Product grid item gap: `--space-2` (8px) on mobile. Products feel close together like objects on a shelf.
- Section padding: `--space-6` (24px) between sections on mobile. Pages feel continuous.
- Text-to-image proximity in Burst Through and Opinion Wall: `--space-2` (8px). The tight relationship creates the "opinion IS the layout" effect.
- Edge-to-content margin: 12px on mobile (`--space-3`). Content pushes close to screen edge.
- Exception — PDP: Returns to `--space-4` (16px) margins. The PDP is the checkout counter: clear, organised, no visual pressure.
- Exception — Cart and Checkout: Standard ecommerce spacing throughout.

### 1.4 Border Radius Tokens

This brand is not rounded or friendly. The default is angular. Radii exist only to soften interactive targets for touch and to delineate badge shapes.

```css
:root {
  --radius-none:   0;        /* Product cards, sticker wall items, structural containers */
  --radius-sm:     2px;      /* Badge corners — sharp, labeled objects */
  --radius-md:     4px;      /* Buttons, input fields — minimal softening for touch */
  --radius-pill:   9999px;   /* Progress bar fill only */
}
```

### 1.5 Shadow (Elevation) Tokens

The Light+Bold direction uses shadows differently from Darkroom. On a cream canvas, shadows are visible and necessary to create the "placed on a surface" effect for the Sticker Wall and Counter Display. They exist at three intensities.

```css
:root {
  --shadow-none:  none;

  /* Standard UI elevation — dropdowns, sticky elements */
  --shadow-sm:    0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md:    0 4px 12px rgba(0, 0, 0, 0.16);

  /* Sticker Wall / Counter Display — product placed on surface */
  --shadow-product:       0 2px 4px rgba(0, 0, 0, 0.12);   /* Default state: product at rest */
  --shadow-product-hover: 0 8px 16px rgba(0, 0, 0, 0.20);  /* Pick Up state: product lifted */

  /* Focus ring */
  --shadow-focus: 0 0 0 2px var(--color-accent-secondary);  /* Electric yellow focus ring */
}
```

**Shadow rules:**
- `--shadow-product` is used on every product card in the Sticker Wall and Counter Display — always. It creates the "placed on a surface" depth that makes the layout feel physical rather than digital.
- `--shadow-product-hover` is the deepened shadow during the Pick Up interaction. It pairs with `transform: translateY(-4px) scale(1.05)`.
- `--shadow-sm` and `--shadow-md` are for UI elements (dropdowns, sticky bars, modals). Not for product cards.
- Never use box shadows on the opinion bar, section headers, or text elements.

### 1.6 Transition Tokens

```css
:root {
  --transition-fast:    150ms ease-out;   /* Pick Up state, hover reveal */
  --transition-normal:  200ms ease-out;   /* Reveal: ADD button fade-in */
  --transition-slow:    300ms ease-in-out; /* Panel slides: nav drawer */
  --transition-settle:  250ms ease-in;    /* Pick Up settle-back: slightly slower than lift */
}
```

The Pick Up interaction uses `--transition-fast` on the lift (responsive) and `--transition-settle` on the return (gravity). The asymmetry is the physical metaphor: lifting is quick, setting down is deliberate.

### 1.7 Breakpoints

Mobile-first. Styles are written for 320px, then overridden upward.

```css
:root {
  --bp-xs:  320px;   /* Minimum supported width */
  --bp-sm:  375px;   /* iPhone SE / small Android — primary design target */
  --bp-md:  768px;   /* Tablet portrait */
  --bp-lg:  1024px;  /* Tablet landscape / small desktop */
  --bp-xl:  1280px;  /* Standard desktop */
}

@media (min-width: 375px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

**The 375px target is not an aspiration — it is the build minimum.** Every component must be validated on a 375px viewport before it goes to James for QA.

---

## Part 2: Layout System

### 2.1 Grid Structure

```css
.container {
  width: 100%;
  padding-inline: var(--space-3);  /* 12px gutters on mobile — tighter than Darkroom's 16px */
  margin-inline: auto;
  max-width: 1280px;
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

/* Grid column system */
.grid {
  display: grid;
  gap: var(--space-2);  /* 8px gap — tighter than Darkroom's 16px, products feel close */
}

.grid-2  { grid-template-columns: repeat(2, 1fr); }   /* Mobile product grid */
.grid-3  { grid-template-columns: repeat(3, 1fr); }   /* Tablet product grid */
.grid-4  { grid-template-columns: repeat(4, 1fr); }   /* Desktop product grid */
.grid-12 { grid-template-columns: repeat(12, 1fr); }  /* Full layout grid */

/* Content width for text-heavy pages */
.content-narrow {
  max-width: 640px;
  margin-inline: auto;
}
```

**Product grid breakpoints:**
- 320–767px: 2 columns (`.grid-2`)
- 768–1023px: 3 columns (`.grid-3`)
- 1024px+: 4 columns (`.grid-4`)

**Section spacing rhythm:**
- Between major page sections: `--space-section` (48px mobile, 96px desktop)
- Between related content blocks: `--space-stack-lg` (32px)
- Between tightly coupled elements (name + price): `--space-stack-sm` (8px)

### 2.2 Full-Bleed vs. Contained Sections

Full-bleed sections are used for: Opinion Wall, opinion bar, Record Store Browse, collection headers, trust block. All other sections are contained within `.container`. Never mix full-bleed and contained sections on the same visual row.

The Opinion Wall section is always full-bleed and full-height (100svh). It is not contained.

---

## Part 3A: Existing Component Library

Components in this section are carried forward from the original ui-system.md with surface color updates for the Light+Bold direction. Where a component previously specified `--color-surface-base` (#1A1A1A dark) as a background, it now uses the updated token which resolves to cream (#F5F0EB). Dark surfaces within these components use `--color-surface-dark`.

---

### 3A.1 Opinion Bar

**Purpose:** Persistent brand statement strip at the top of every page above the nav. Rotating copy. The single strongest brand signal at page entry.

**Structure:**
```
[Full-width strip]
  [Centered text — brand statement in uppercase]
```

**Variants:**
- `standard` — off-black bg (`--color-surface-dark`), cream text (`--color-text-on-dark`). Rotating brand statement.
- `drop-alert` — signal yellow bg (`--color-accent-secondary`), off-black text (`--color-text-on-accent`). "THE DROP IS LIVE: [Name] →"
- `policy` — same as standard. "FREE SHIPPING ABOVE ₹499 · COD ABOVE ₹299 · SHIPS IN 2-4 DAYS"

**States:** Static on page load. Content rotates via JS every 8 seconds if multiple statements are configured. No animation on the bar itself — a text swap only.

**Specs:**
- Background: `--color-surface-dark` (standard) or `--color-accent-secondary` (drop-alert)
- Text color: `--color-text-on-dark` (standard) or `--color-text-on-accent` (drop-alert)
- Font: `--font-heading`, `--weight-bold`, `--text-opinion-bar`, uppercase
- Letter spacing: `--tracking-wider`
- Height: 36px fixed
- Text: single line, centered, truncated with ellipsis if overflow
- Padding: `0 var(--space-4)`

**Responsive:** Scrolls with page on mobile. Sticky on desktop (1024px+).

**Accessibility:** `role="region"` `aria-label="Site announcement"`. Do not use `aria-live` on the rotating variant — it interrupts screen readers mid-task.

**Fynd path:** Implement via Fynd's native announcement bar section. Single static statement is sufficient if multiple-rotation is not supported — rotation is an enhancement, not a requirement.

---

### 3A.2 Header / Navigation Bar

**Purpose:** Primary site navigation. Must work at 320px and at 1280px without redesign.

**Structure (mobile):**
```
[Nav bar — full width, --color-surface-base (cream)]
  [TPL monogram — left]         [Search icon]  [Cart badge icon]
  [Persistent bottom bar — fixed to bottom of viewport]
    [ Find ]  [ Collect ]  [ Gift ]  [ Cart ]
```

**Structure (desktop, 1024px+):**
```
[Nav bar — full width, --color-surface-base (cream)]
  [TPL wordmark — left]
  [Find v]  [Collect]  [Gift]  [Artists]
  [Search icon]  [Cart badge icon]
```

**Variants:**
- `mobile` — minimal top bar + bottom persistent bar
- `desktop` — horizontal top bar with "Find" mega-dropdown

**States:**
- Default: `--color-surface-base` background, 1px bottom border `--color-border`
- Scrolled (desktop): adds `--shadow-sm` below the bar
- Cart badge: hidden when cart empty. Red dot with white count when cart has items.
- Nav drawer (mobile): slides in from left, full height, `--color-surface-base` background, `--shadow-md`

**Nav drawer content (mobile) — verbatim from Kurt:**
```
FIND                   [Barlow Condensed SemiBold, uppercase, --color-text-primary]
  No Filter
  Your Card Has a Personality
  Best Sellers
  New In
  K-Pop Drop
  Sneakerhead Edit

COLLECT
  The Drop
  Pin Set — ₹999
  Opinion Starter Pack — ₹499

GIFT
  For the Friend
  Birthday Box — ₹699
  Two Cards, One Statement — ₹399

BROWSE BY FORMAT
  Lapel Pins
  Keychains
  Card Stickers
  Stickers + Magnets

———
About  /  Artists  /  FAQ  /  Contact  /  Sell Your Art
```

**Specs:**
- Nav bar height: 56px mobile, 64px desktop
- Nav bar background: `--color-surface-base`
- Nav bar border-bottom: `1px solid --color-border`
- Bottom persistent bar: 56px + `env(safe-area-inset-bottom)` — non-negotiable for iPhone home indicator
- Icon size: 24x24px, 1.5px stroke, `--color-text-primary`
- Cart badge: 18px circle, `--color-accent-primary` background, `--color-accent-pure-white` text, 10px font
- Nav link font: `--font-heading`, `--weight-semibold`, `--text-body`, uppercase (desktop); sentence case in drawer (mobile)
- Section labels in drawer: `--font-mono`, `--text-caption`, `--tracking-widest`, `--color-text-secondary`
- Drawer overlay: `rgba(26,26,26,0.5)`, tapping overlay closes drawer

**Responsive:**
- 320–1023px: mobile variant with bottom bar
- 1024px+: desktop variant. Bottom bar hidden. Hamburger hidden.
- Bottom bar items: 48px minimum height touch target

**Accessibility:**
- `<nav>` landmark with `aria-label="Main navigation"`
- Hamburger: `aria-expanded="true/false"` `aria-controls="nav-drawer"`
- Bottom bar: `role="navigation"` `aria-label="Primary actions"`
- Focus trap inside open drawer — `Tab` cycles drawer items, `Esc` closes
- Active page item: `aria-current="page"`

**Fynd path:** Top nav and drawer use Fynd's header section. The bottom persistent bar requires a custom liquid component — it is not a standard Fynd section.

---

### 3A.3 Product Card (Grid Item)

**Purpose:** Primary unit of product discovery on collection pages, best-sellers sections, and cross-sell rows. The most reused component on the site.

**Structure:**
```
[Card container — --color-surface-base, --shadow-product, --radius-none]
  [Image container — square 1:1 aspect ratio]
    [Product image — object-fit: cover, shot on neutral/cream surface]
    [Badge — top-left overlay, optional]
    [Quick-add button — bottom of image, revealed on tap / hover]
  [Card body — padding --space-inset-lg]
    [Product name — Barlow Condensed Bold, --color-text-primary]
    [Product type — Inter Regular, --color-text-secondary, small]
    [Row: Artist name (left) / Price (right)]
    [Strikethrough price if discounted]
```

**Variants:**
- `standard` — full card with image, name, type, artist, price
- `compact` — cross-sell rows: image + name + price only
- `bundle` — distinct treatment (see Section 3A.9)

**States:**
- Default: `--shadow-product` visible. On cream canvas, the shadow separates the card from the background.
- Hover (desktop): Quick-add button fades in. Shadow slightly deepens via transition on `--shadow-product-hover`. No scale transform on standard grid cards.
- Tapped (mobile): Quick-add button becomes visible
- Sold out: badge "SOLD OUT", image desaturated 40% (`filter: grayscale(0.4)`), Quick-add disabled
- Loading: skeleton variant (see Section 3A.25)

**Badge priority — one badge per card:**
1. "ONLY X LEFT" — stock ≤ 5 units
2. "ONLY AT TPL" — card sticker products
3. "NEW" — added in last 30 days
4. "BEST SELLER" — from Best Sellers collection tag
5. "SOLD OUT" — overrides all at stock = 0

**Badge specs:**
- "NEW" / "BEST SELLER" / "LIMITED EDITION": `--color-accent-secondary` bg, `--color-text-on-accent`, Barlow Condensed SemiBold, 11px, uppercase, `--radius-sm`, padding `3px 6px`
- "ONLY AT TPL" / "BEST SELLER" (red variant): `--color-accent-primary` bg, `--color-text-on-red`
- "SOLD OUT": `--color-text-primary` (#1A1A1A) bg, `--color-accent-pure-white` text — the deliberate inversion
- Badge position: 8px from top-left corner of image, `z-index: 1`

**Quick-add button specs:**
- Label: "ADD" — Barlow Condensed SemiBold, uppercase, 13px
- Background: `--color-accent-primary`, `--color-text-on-red`
- Width: 100% of card width
- Height: 36px
- Position: bottom 0 of image container, overlaying bottom of image
- Transition: `opacity var(--transition-normal)` — fades in from 0 to 1
- Mobile: always visible. Desktop: opacity 0 default, opacity 1 on hover.

**Responsive:**
- Card padding: `--space-3` (12px) mobile, `--space-4` (16px) desktop
- Product name: `--text-h4`, 2 lines max with `-webkit-line-clamp: 2`

**Accessibility:**
- Full card wrapped in `<a>` linking to PDP
- Badge text: no `aria-hidden` — it is purchase information
- Quick-add: `aria-label="Add [product name] to cart"`
- Sold out quick-add: `aria-disabled="true"` and `disabled`

**Performance:**
- Product images: `loading="lazy"` for cards not in initial viewport
- First-row cards: `loading="eager"` `fetchpriority="high"`
- Format: WebP with JPEG fallback via `<picture>`
- Thumbnail size served: 400x400px maximum

---

### 3A.4 Product Card (Compact)

**Purpose:** Cross-sell rows ("Also in this attitude"), cart upsell, "Complete your set" on PDP.

**Structure:**
```
[Compact card — horizontal on cart, vertical on cross-sell]
  [Image — square, 80px cart / 140px cross-sell]
  [Name — 2 lines max]
  [Price]
  [Quick-add or "View" link]
```

**Specs:**
- No artist attribution (space limited)
- No badge in cart upsell context. Badge visible in cross-sell context.
- Padding: `--space-2` (8px)
- Shadow: `--shadow-product` (retains the "placed on surface" feel even at compact size)

---

### 3A.5 Product Gallery (PDP)

**Purpose:** Primary image display on product detail page. Must enable close examination of small physical products.

**Structure:**
```
[Gallery container]
  [Primary image — full width on mobile, 55% of page on desktop]
  [Thumbnail dots — below primary image on mobile]
  [Thumbnail strip — left side on desktop, 5 thumbnails, vertical scroll if more]
```

**States:**
- Default: primary image displayed
- Swiping (mobile): swipe left/right cycles images. Dots update.
- Thumbnail click (desktop): loads selected image as primary. Active thumbnail: `--color-accent-primary` border (2px).
- Zoom (desktop): click or pinch opens full-size overlay
- Image loading: `--color-surface-raised` placeholder

**Specs:**
- Primary image: square (1:1) on mobile. 4:5 acceptable on desktop if photography warrants.
- Thumbnail dot size: 6px, `--color-text-secondary` default, `--color-text-primary` active
- Thumbnail strip (desktop): 72x72px, 4px gap, `--radius-none`, 1px `--color-border` border on inactive thumbnails
- Minimum 3 images per product at launch
- Swipe threshold: 50px

**Responsive:**
- Mobile: full-width primary, dots below
- Desktop: primary + left thumbnail strip

**Accessibility:**
- `role="region"` `aria-label="Product images"`
- Each image: `alt="[Product name] — [context]"`
- Dot pagination: `role="tablist"`, each dot `role="tab"` `aria-selected`
- Keyboard: arrow keys navigate between images when gallery has focus

---

### 3A.6 Price Display

**Purpose:** Product price, discount savings, prepaid incentive. Reused on product cards, PDP, cart, order summary.

**Variants:**
- `standard` — single price, no discount
- `discounted` — original strikethrough + sale price
- `bundle` — "₹699" with "₹897 if bought separately" struck through
- `with-prepaid-badge` — price + "Save ₹30 with UPI" inline badge

**Specs:**
- Price value: `--font-mono`, `--weight-bold`, `--text-price`, `--tracking-wide`, `--color-text-primary`
- Strikethrough price: `--font-mono`, `--weight-regular`, `--text-body-sm`, `--color-text-secondary`, `text-decoration: line-through`
- Strikethrough MUST accompany any promotional price
- Prepaid badge: inline pill, `--color-success` bg at 15% opacity, `--color-success` text, `--font-body`, 11px, `--radius-pill`, padding `2px 8px`
- Savings callout (bundles): "SAVE ₹X" in `--color-accent-secondary`, `--font-heading`, `--weight-bold`, 12px

**Accessibility:**
- `<del aria-label="Original price ₹897">₹897</del>` and `<ins aria-label="Current price ₹699">₹699</ins>`
- Strikethrough handles the discount signal visually and semantically

---

### 3A.7 Add to Cart Button

**Purpose:** Primary conversion CTA on PDP. Sticky on mobile.

**Variants:**
- `primary` — "ADD TO CART — ₹249" (includes price)
- `sticky-mobile` — fixed bar: "[Product name]  ADD TO CART  ₹249"
- `buy-now` — secondary style
- `sold-out` — disabled: "SOLD OUT"

**Specs — primary:**
- Background: `--color-accent-primary`
- Text: `--color-text-on-red`, `--font-heading`, `--weight-semibold`, `--text-cta`, uppercase, `--tracking-wider`
- Height: 48px minimum
- Width: 100% on mobile, auto (min 200px) on desktop
- Border radius: `--radius-md`
- Padding: `var(--space-3) var(--space-6)`
- Hover: `filter: brightness(1.1)`, `--transition-fast`
- Active/pressed: `filter: brightness(0.9)`, `scale: 0.99`
- Loading: spinner replaces text, width unchanged

**Specs — sticky mobile bar:**
- `position: fixed; bottom: 0; left: 0; right: 0; z-index: 100`
- `padding-bottom: env(safe-area-inset-bottom)`
- Background: `--color-surface-base`
- Border-top: `1px solid --color-border`
- Height: 56px + safe area
- Shadow: `--shadow-md` above
- Appears: when user has scrolled past main ATC button (Intersection Observer)

**Specs — buy now:**
- Border: 1.5px solid `--color-text-primary`
- Background: transparent
- Text: `--color-text-primary`
- Position: below primary, `--space-2` gap
- Height: 48px

**Accessibility:**
- Loading state: `aria-busy="true"` on button
- Sold-out: `disabled` + `aria-disabled="true"`
- Sticky bar: `aria-hidden="true"` when not visible

---

### 3A.8 Variant Selector

**Purpose:** Select product variants. Card stickers: half-card / full-card. Cross-format families: keychain / magnet / earring.

**Variants:**
- `chip` — tappable chips for format variants
- `size` — for half-card / full-card selector

**Specs — chip:**
- Default: `--color-surface-raised` bg, `--color-border` border (1px), `--color-text-primary` text
- Selected: `--color-text-primary` bg (#1A1A1A), `--color-surface-base` text (#F5F0EB) — inverted
- Disabled: `--color-text-secondary` text, `cursor: not-allowed`, strikethrough label
- Height: 40px, padding `0 var(--space-4)`, `--radius-md`
- Font: `--font-heading`, `--weight-semibold`, `--text-body-sm`, uppercase
- Gap: `--space-2`
- Wrap: `flex-wrap: wrap`

**Accessibility:**
- Group: `role="radiogroup"` `aria-labelledby`
- Each chip: `role="radio"` `aria-checked`
- Unavailable: `aria-disabled="true"` with `aria-label="[variant] — unavailable"`

---

### 3A.9 Bundle Card

**Purpose:** Multi-product bundles as single purchase units with clear savings. Must look meaningfully different from a standard product card.

**Structure:**
```
[Bundle card — full width mobile, spans 2 col desktop]
  [Image — bundle contents shot]
  [Bundle badge — "BUNDLE DEAL" or "SAVE ₹X"]
  [Bundle name — large, Barlow Condensed Bold]
  [Contents list — "Keychain + Pin + Card Sticker + Gift Box"]
  [Price row: bundle price / individual total struck through / savings callout]
  [Add to Cart — full width]
```

**Specs:**
- Background: `--color-surface-raised` (slightly darker cream — distinguishes from standard card)
- Border: 1px `--color-accent-secondary` — yellow border signals special offer
- Border radius: `--radius-none`
- Bundle badge: `--color-accent-secondary` bg, `--color-text-on-accent`, Barlow Condensed SemiBold, 12px, uppercase, top-left
- Contents list: `--font-body`, `--text-body-sm`, `--color-text-secondary`, bullet "·" separator
- Savings callout: `--color-accent-secondary`, `--font-heading`, `--weight-bold`, 14px
- Savings number must be live from actual pricing — never hard-coded

**Responsive:**
- Mobile: full-width, stacked
- Desktop: spans 2 of 4 grid columns

**Accessibility:**
- Contents list: real `<ul>` with `<li>` elements
- Prices: `<del>` and `<ins>` with `aria-label`

---

### 3A.10 Collection Header

**Purpose:** First impression of every collection page. Typography-first. The type is the hero.

**Structure:**
```
[Full-bleed section — --color-surface-base]
  [Collection name — H1 at opinion text scale, Barlow Condensed Bold, --color-text-primary, uppercase]
  [Collection tagline — body, Inter Regular, --color-text-secondary, 1-2 lines]
```

**Variants:**
- `type-only` — name at `--text-opinion-xl` scale + tagline (default for all collections)
- `type-with-descriptor` — name + tagline + optional descriptor badge

**Specs — type-only:**
- Background: `--color-surface-base` (cream)
- Padding: `var(--space-6) var(--space-3)` mobile, `var(--space-12) var(--space-12)` desktop
- Collection name: `--text-opinion-xl` (18vw), `--weight-bold`, `--tracking-opinion`, `--leading-opinion`
- The name overflows the container on purpose — text extending beyond frame edges is the visual signature (see Sean's visual-identity.md Section 2.1)
- Tagline: `--text-body`, `--weight-regular`, `--leading-normal`, `--space-4` below name, max-width `--content-narrow`

**Responsive:**
- Mobile and desktop: same treatment. vw units scale naturally. No breakpoint override needed for the collection name itself.
- Tagline: clamps to 2 lines on mobile with `-webkit-line-clamp: 2`

---

### 3A.11 Collection Navigation Chips

**Purpose:** Horizontal scroll row of related collection links at top of each collection page.

**Structure:**
```
[Horizontal scroll container — snap-type: x mandatory]
  [Chip: "No Filter"]  [Chip: "Best Sellers"]  [Chip: "New In"]  [Chip: "The Drop"]
```

**Specs:**
- Chip height: 36px
- Chip padding: `0 var(--space-4)`
- Font: `--font-heading`, `--weight-semibold`, `--text-body-sm`, uppercase
- Default chip: `--color-surface-raised` bg, `--color-text-secondary` text, `--color-border` border (1px), `--radius-sm`
- Active chip: `--color-text-primary` bg (#1A1A1A), `--color-surface-base` text (#F5F0EB), no border
- Overflow: horizontal scroll, no scrollbar, right fade: `mask-image: linear-gradient(to right, black 80%, transparent 100%)`

---

### 3A.12 Filter Bar

**Purpose:** Narrow product grid by theme, format, price. Horizontal scroll on mobile.

**Structure:**
```
[Filter bar — sticky below collection header on scroll]
  [Sort: "Recommended ▾"]
  [Filter chips: "Theme ▾" "Format ▾" "Price ▾"]
  [Active filter tags]
  [Clear all]
```

**Filter chip states:**
- Default: `--color-surface-raised` bg, `--color-border` border, `--color-text-secondary` text
- Active: `--color-accent-primary` bg, `--color-text-on-red` text

**Sort dropdown:**
- `--color-surface-base` bg (cream), `--color-border` border, `--shadow-sm`
- Active option: `--color-accent-primary` text

**Accessibility:**
- Sort: native `<select>` on mobile
- Filter chips: `aria-pressed="true/false"` toggles
- Active filters: visually hidden `<span aria-live="polite">` announces filter changes

---

### 3A.13 Free Shipping Progress Bar

**Purpose:** Highest-impact AOV lever. Shows how far from ₹499 free shipping. Appears in cart and PDP Block 6.

**Structure:**
```
[Progress container — full width]
  [Message: "₹198 away from free shipping!"]
  [Track — thin bar]
    [Fill — animates to current progress %]
```

**Variants:**
- `cart` — message + bar + quick-add chips
- `pdp` — message + bar only
- `complete` — cart ≥ ₹499: "Free shipping unlocked!"

**Specs:**
- Track height: 6px, `--radius-pill`, background `--color-surface-raised`
- Fill: `--color-accent-secondary` (yellow), `--radius-pill`, `transition: width 400ms ease-out`
- Fill width: `(cart_subtotal / 499) * 100%` capped at 100%
- Message: `--font-body`, `--text-body-sm`, `--color-text-primary`
- Amount highlighted: `--weight-bold`
- Padding: `var(--space-4)` all sides

**Celebration state:**
- Fill: `--color-success` (green)
- Bar pulses once (`@keyframes pulse`) — not a loop
- Message: "Free shipping unlocked!" + checkmark icon

**Accessibility:**
- `role="progressbar"` `aria-valuenow` `aria-valuemin="0"` `aria-valuemax="499"` `aria-label="Free shipping progress"`

---

### 3A.14 Cart Line Item

**Purpose:** Single product line in cart. Survives long names, discounts, quantity adjustments.

**Structure:**
```
[Line item row]
  [Product image — 72x72px]
  [Line details: name / variant info / price]
  [Quantity selector: − [1] +]
  [Remove link — "×" with aria-label]
```

**Specs:**
- Row padding: `var(--space-4) 0`, border-bottom `1px solid --color-border`
- Image: `72px × 72px`, `object-fit: cover`
- Name: `--font-heading`, `--weight-bold`, `--text-body`, uppercase, 2 lines max
- Variant info: `--font-body`, `--text-body-sm`, `--color-text-secondary`
- Quantity selector: `--font-mono`, `--text-body`, 36px height, border `1px solid --color-border`
- Remove: `--color-text-secondary`, becomes `--color-accent-primary` on hover

---

### 3A.15 Quantity Selector

**Purpose:** Adjust quantity in cart and on PDP.

**Structure:** `[−]  [count]  [+]`

**Specs:**
- Button size: 44x44px preferred. Sharp corners (`--radius-none`).
- Border: 1px `--color-border` around full compound element
- Count display: `--font-mono`, `--weight-bold`, `--text-body`, min-width: 36px, centered
- Disabled: `--color-text-secondary`, `cursor: not-allowed`

**Accessibility:**
- `role="group"` `aria-label="Quantity"`
- Buttons: explicit `aria-label="Decrease quantity"` / `aria-label="Increase quantity"`
- Count: `aria-live="polite"`

---

### 3A.16 Payment Method Selector

**Purpose:** Payment selection at checkout. UPI first.

**Variants:** UPI (primary) / Cards / COD

**Specs:**
- Each method: radio-style card, 56px height, `--color-surface-raised` bg, `--color-border` border, `--radius-md`
- Selected: `--color-accent-primary` border (2px)
- UPI card: UPI logo + "Pay with UPI" + green "Fastest" badge
- Prepaid badge: "Save ₹30" in `--color-accent-secondary` bg, `--color-text-on-accent`, `--radius-pill`
- COD minimum notice: `--color-text-secondary`, `--text-body-sm`. If cart < ₹299, COD is disabled.
- Razorpay logo visible for trust

**Accessibility:**
- `role="radiogroup"` `aria-labelledby`
- Each option: `role="radio"` `aria-checked`
- COD disabled: `aria-disabled="true"` `aria-describedby="cod-minimum-notice"`

---

### 3A.17 Announcement Bar / Drop Status

**Purpose:** Drop status — live, countdown, or sold out. Homepage drop section and `/the-drop/`.

**State A — Drop Live:**
```
[Red dot pulsing] "LIVE NOW"
[Drop name + Artist + City]
[Inventory counter — "47 / 75 remaining"]
[Countdown: "Ends in 61h 23m"]
```

**State B — Countdown:**
```
[Next drop countdown: "DD : HH : MM"]
[Notification signup CTA]
```

**State C — Sold Out:**
```
[Badge: "SOLD OUT"] [Drop name]
[Link: "Next drop: [date] — get notified"]
```

**Specs:**
- Container background: `--color-surface-raised`
- Live indicator dot: 8px, `--color-accent-primary`, CSS `@keyframes pulse` (scale 1→1.4→1, 1.5s loop)
- Countdown: `--font-mono`, `--weight-bold`, `--text-h2`, `--color-text-primary`
- Colon separator: `--color-text-secondary`
- Inventory counter: `--font-mono`, `--text-body`, `--color-accent-primary`

**Accessibility:**
- Countdown timer: `aria-live="off"` — do not announce every second

---

### 3A.18 Trust Signal Bar

**Purpose:** Four-signal trust block — replaces review social proof at launch. Factual, not promotional.

**Four signals (from Kurt):**
1. "Independent artists" — Every design made by an original artist
2. "Designed in Bengaluru" — Independent studio since 2018
3. "Ships in 2-4 days" — Tracking via WhatsApp
4. "Free shipping above ₹499" — COD available above ₹299

**Specs:**
- Section background: `--color-surface-raised`
- Heading: `--font-heading`, `--weight-semibold`, `--text-body`, uppercase, `--color-text-primary`
- Copy: `--font-body`, `--text-body-sm`, `--color-text-secondary`
- Cell padding: `var(--space-6)`
- Divider between cells: `1px solid --color-border`

**Responsive:**
- 320px: stacked single column
- 375–767px: 2x2 grid
- 768px+: 4-column inline row

---

### 3A.19 Artist Attribution Card

**Purpose:** Credit the designer on every original-design product.

**Variants:**
- `inline` — PDP: artist name + city, one line
- `card` — About page and drop pages: name + city + bio + optional photo

**Specs — inline:**
- "by [Artist Name]" — `--font-mono`, `--text-caption`, `--color-text-secondary`, uppercase, `--tracking-widest`

**Specs — card:**
- Background: `--color-surface-raised`
- Photo: 48x48px circle-cropped. If no photo: 48px circle with initials, `--font-mono`, `--weight-bold`
- Name: `--font-heading`, `--weight-bold`, `--text-body`, `--color-text-primary`
- City: `--font-mono`, `--text-caption`, `--color-text-secondary`
- Bio: `--font-body`, `--text-body-sm`, `--color-text-secondary`, max 2 lines

---

### 3A.20 WhatsApp CTA Button

**Purpose:** Primary sharing and support channel.

**Variants:**
- `inline` — on PDP below ATC block
- `floating` — fixed bottom-right all pages

**Specs — floating:**
- `position: fixed; bottom: 72px + env(safe-area-inset-bottom); right: var(--space-4)`
- Size: 56px circle
- Background: `#25D366` (WhatsApp brand green — the single exception to the color system)
- Icon: WhatsApp SVG, white, 28px
- Shadow: `--shadow-md`
- PDP mobile: adjust bottom to clear sticky ATC bar

**Specs — inline:**
- Full-width, secondary style (outline)
- Pre-filled message URL with UTM: `?utm_source=whatsapp&utm_medium=share&utm_campaign=pdp`

**Accessibility:**
- Floating: `aria-label="Chat on WhatsApp"` + `title`
- Inline: visible label handles accessibility

---

### 3A.21 FAQ Accordion

**Purpose:** FAQ page and PDP product details. Progressive disclosure on mobile.

**Specs:**
- Trigger row height: 56px minimum
- Border-bottom: `1px solid --color-border`
- Question font: `--font-heading`, `--weight-semibold`, `--text-body`, uppercase, `--color-text-primary`
- Answer font: `--font-body`, `--text-body`, `--leading-normal`, `--color-text-secondary`
- Answer panel: `max-height: 0 → 500px` over `--transition-slow`
- Chevron rotates 180° on expand

**Accessibility:**
- Trigger: `<button>` (not `<div>`)
- `aria-expanded` / `aria-controls` on trigger
- Panel: `role="region"` `aria-labelledby`

---

### 3A.22 Badge System

All badges consolidated here for cross-reference:

| Badge | Background | Text color | Use case |
|-------|-----------|------------|----------|
| ONLY X LEFT | `--color-accent-secondary` | `--color-text-on-accent` | Stock ≤ 5 |
| ONLY AT TPL | `--color-accent-primary` | `--color-text-on-red` | Card stickers |
| NEW | `--color-accent-secondary` | `--color-text-on-accent` | Added in last 30 days |
| BEST SELLER | `--color-accent-primary` | `--color-text-on-red` | Best Sellers tag |
| LIMITED EDITION | `--color-accent-secondary` | `--color-text-on-accent` | Drop products |
| SOLD OUT | `--color-text-primary` (#1A1A1A) | `--color-accent-pure-white` + 1px border | Stock = 0 |
| ARTIST ORIGINAL | `--color-surface-raised` | `--color-text-primary` + 1px `--color-border` | Original design |

Priority: SOLD OUT > ONLY X LEFT > ONLY AT TPL > NEW > LIMITED EDITION > BEST SELLER > ARTIST ORIGINAL

---

### 3A.23 Toast / Notification

**Purpose:** Non-blocking feedback for cart actions, free shipping, system messages.

**Variants:**
- `add-to-cart` — "Added to cart"
- `free-shipping-unlocked` — "Free shipping unlocked!"
- `error` — "Couldn't add to cart. Try again."

**Specs:**
- Position: `fixed; top: var(--space-4); right: var(--space-4); z-index: 200`
- Background: `--color-surface-dark` (dark surface — toasts pop against the cream page)
- Text: `--color-text-on-dark`
- Border-left: 4px solid accent color (red for cart, green for shipping, red for error)
- Shadow: `--shadow-md`
- Border radius: `--radius-md`
- Duration: 3 seconds auto-dismiss
- Enter: slide in from top-right, `--transition-slow`
- Exit: fade out, `--transition-normal`

**Accessibility:**
- `role="status"` `aria-live="polite"` for cart and success
- `role="alert"` `aria-live="assertive"` for errors
- `aria-atomic="true"`

---

### 3A.24 Loading Skeleton

**Purpose:** Placeholder while product cards and images load. Prevents layout shift.

**Specs:**
- Color: `--color-surface-raised`
- Animation: `@keyframes shimmer` — linear gradient shifting left to right, 1.5s loop
- Shimmer highlight: 10% brighter than `--color-surface-raised`
- Border radius: matches the component being replaced

---

### 3A.25 Empty State / Error State

**Variants:**
- `empty-cart` — "Your cart is empty. That's fixable."
- `no-results` — "Nothing in this filter combination. [Clear filters]"
- `search-no-results` — "Nothing found for '[query]'."
- `error` — "Something went wrong. Try again."

**Specs:**
- Primary message: `--font-heading`, `--weight-bold`, `--text-h3`, uppercase, `--color-text-primary`
- Sub-text: `--font-body`, `--text-body`, `--color-text-secondary`
- Spacing: `var(--space-16)` vertical padding
- No illustrations, no icons. Copy carries the moment. (Joanna owns empty state copy.)

---

## Part 3B: Updated Section Patterns

These are page-level layout patterns. They are not individual components — they are compositions of components from Part 3A, arranged according to Sean's visual signatures.

---

### 3B.1 Find. Collect. Gift. Section

**Purpose:** Three-block section naming the purchase mechanics. Navigation aid and mechanic explainer.

**Structure:**
```
[Section — full-bleed, --color-surface-base]
  [Three columns on desktop / stacked on mobile]
    [Column: "FIND." + descriptor + text link]
    [Column: "COLLECT." + descriptor + text link]
    [Column: "GIFT." + descriptor + text link]
```

**Specs:**
- Section padding: `var(--space-12) var(--space-3)` mobile, `var(--space-16) var(--space-12)` desktop
- Column heading (FIND / COLLECT / GIFT): `--font-heading`, `--weight-bold`, `--text-opinion-sm` (8vw), uppercase, `--tracking-opinion`, `--color-text-primary`
- Descriptor text: `--font-body`, `--text-body`, `--color-text-secondary`, `--leading-normal`
- Text link: `--font-heading`, `--weight-semibold`, `--text-body-sm`, uppercase, `--color-text-primary`, with underline on hover, no button chrome

**Responsive:**
- Mobile: stacked vertical, each block full-width, `--space-stack-lg` between blocks
- Desktop: 3-column grid with equal widths, 1px `--color-border` vertical dividers between columns

---

### 3B.2 Drop Module

**Purpose:** Drop status — live or countdown — on homepage (Section 4 in Kurt's wireframe).

**State A — Drop Live:** Uses Announcement Bar / Drop Status component (3A.17) plus product images in Counter Display Tile layout (see Part 3C.4). Background: `--color-surface-raised`.

**State B — Countdown:** Black strip using `--color-surface-dark`. Countdown in cream. Notification CTA in yellow.

**State C — Between drops:** Shows last drop products in sold-out state (desaturated) alongside countdown to next drop.

---

### 3B.3 Instagram Feed Section

**Structure:**
```
[Section — --color-surface-raised]
  ["@the.product.lab" — --font-mono, --text-caption, --tracking-widest, --color-text-secondary]
  [6 most recent posts — horizontal scroll on mobile, 3x2 grid on desktop]
  ["Follow →" text link]
```

**Specs:**
- Post thumbnails: square, 1:1, `--radius-none`, no border
- Handle and "Follow" link: `--font-mono`, `--text-caption`, uppercase, `--color-text-secondary`
- Section padding: `var(--space-8)` all sides

---

## Part 3C: New Components — Organised Chaos Direction

These five components are the core visual signatures of the Light+Bold / Organised Chaos direction. They do not exist in the original ui-system.md and require new implementation work from Tobi. All five are Priority 1 build items.

---

### 3C.1 Opinion Wall

**Purpose:** Full-viewport text field. Opinion phrases at varying font sizes, slight overlaps, irregular baseline. This is the homepage entry experience and the defining visual signature of the brand. Text-only above the fold — no images, maximum performance.

**When used:** Homepage hero (Section 1 in Kurt's wireframe). Not used on any other page type.

**Structure:**
```html
<section class="tpl-opinion-wall" aria-label="Homepage — brand statement"
         role="region">
  <a href="#first-product-section" class="tpl-skip-link">
    Skip to products
  </a>
  <div class="tpl-opinion-wall__inner" aria-hidden="true">
    <!-- Decorative opinion phrases — aria-hidden, not product content -->
    <span class="tpl-opinion-wall__phrase tpl-opinion-wall__phrase--xl">BULLSHIT REMOVER</span>
    <span class="tpl-opinion-wall__phrase tpl-opinion-wall__phrase--lg">enjoy the SHITSHOW</span>
    <span class="tpl-opinion-wall__phrase tpl-opinion-wall__phrase--md">no meetings before coffee</span>
    <span class="tpl-opinion-wall__phrase tpl-opinion-wall__phrase--xl">SELECTIVE LISTENER</span>
    <span class="tpl-opinion-wall__phrase tpl-opinion-wall__phrase--sm">IDIOT REPELLENT</span>
    <span class="tpl-opinion-wall__phrase tpl-opinion-wall__phrase--md">YOUR CARD HAS A PERSONALITY</span>
    <span class="tpl-opinion-wall__phrase tpl-opinion-wall__phrase--sm">straight outta f#_ks</span>
    <span class="tpl-opinion-wall__phrase tpl-opinion-wall__phrase--lg">NO FILTER</span>
  </div>
  <div class="tpl-opinion-wall__tagline">
    <span>small objects.</span>
    <span>big opinions.</span>
  </div>
  <div class="tpl-opinion-wall__enter" aria-label="Scroll to browse products">
    <svg><!-- downward chevron --></svg>
  </div>
</section>
```

**CSS Implementation:**

```css
.tpl-opinion-wall {
  position: relative;
  width: 100%;
  height: 100svh;  /* svh not vh — correct behavior with iOS browser chrome */
  overflow: hidden;
  background-color: var(--color-surface-base);  /* cream */
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.tpl-skip-link {
  position: absolute;
  top: -100%;
  left: var(--space-4);
  z-index: 999;
  background: var(--color-accent-secondary);
  color: var(--color-text-on-accent);
  padding: var(--space-2) var(--space-4);
  font-family: var(--font-heading);
  font-weight: var(--weight-semibold);
  font-size: var(--text-body);
  text-transform: uppercase;
}

.tpl-skip-link:focus {
  top: var(--space-2);
}

.tpl-opinion-wall__inner {
  position: absolute;
  inset: 0;
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  padding: var(--space-4);
  /* Irregular placement is achieved via nth-child transforms — deterministic, not random */
}

.tpl-opinion-wall__phrase {
  display: block;
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  text-transform: uppercase;
  letter-spacing: var(--tracking-opinion);
  line-height: var(--leading-opinion);
  color: var(--color-text-primary);
  white-space: nowrap;
  will-change: transform;  /* GPU layer — prevents repaint on adjacent interactions */
}

/* Opacity tiers — three levels only */
.tpl-opinion-wall__phrase--xl {
  font-size: var(--text-opinion-xl);
  opacity: 1;  /* Primary opinion — fully legible */
}

.tpl-opinion-wall__phrase--lg {
  font-size: var(--text-opinion-lg);
  opacity: 0.55;  /* Supporting layer */
}

.tpl-opinion-wall__phrase--md {
  font-size: var(--text-opinion-md);
  opacity: 0.55;
}

.tpl-opinion-wall__phrase--sm {
  font-size: var(--text-opinion-sm);
  opacity: 0.22;  /* Background texture layer */
}

/*
  Deterministic "random" rotations via nth-child.
  These are fixed values — the same build produces the same layout every time.
  Rotation range: -4deg to +4deg maximum (Sean's rule: never exceed 5deg).
  Baseline offset: staggered via translateY on alternating phrases.
*/
.tpl-opinion-wall__phrase:nth-child(1)  { transform: rotate(-2deg) translateY(0); }
.tpl-opinion-wall__phrase:nth-child(2)  { transform: rotate(1.5deg) translateY(8px); }
.tpl-opinion-wall__phrase:nth-child(3)  { transform: rotate(-0.5deg) translateY(-12px); }
.tpl-opinion-wall__phrase:nth-child(4)  { transform: rotate(3deg) translateY(16px); }
.tpl-opinion-wall__phrase:nth-child(5)  { transform: rotate(-3deg) translateY(-8px); }
.tpl-opinion-wall__phrase:nth-child(6)  { transform: rotate(1deg) translateY(20px); }
.tpl-opinion-wall__phrase:nth-child(7)  { transform: rotate(-1.5deg) translateY(-16px); }
.tpl-opinion-wall__phrase:nth-child(8)  { transform: rotate(2.5deg) translateY(4px); }

/* Phrases intentionally overflow the viewport — text extends beyond frame edges */
/* This creates the "the wall continues beyond what you can see" effect */
.tpl-opinion-wall__phrase--xl,
.tpl-opinion-wall__phrase--lg {
  margin-inline: calc(var(--space-4) * -1);  /* Allow bleeding past container edge */
}

.tpl-opinion-wall__tagline {
  position: absolute;
  bottom: var(--space-12);
  left: var(--space-4);
  font-family: var(--font-body);
  font-size: var(--text-body);
  color: var(--color-text-primary);
  opacity: 0.8;
  z-index: 2;
}

.tpl-opinion-wall__tagline span {
  display: block;
}

.tpl-opinion-wall__enter {
  position: absolute;
  bottom: var(--space-6);
  left: 50%;
  transform: translateX(-50%);
  width: 24px;
  height: 24px;
  color: var(--color-text-secondary);
  z-index: 2;
  /* Gentle bounce animation — invitation to scroll, not a CTA */
  animation: tpl-bounce 2s ease-in-out infinite;
}

@keyframes tpl-bounce {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50%       { transform: translateX(-50%) translateY(6px); }
}

/* Mobile: reduce to two opacity tiers — primary (100%) and one background layer (18%) */
@media (max-width: 767px) {
  .tpl-opinion-wall__phrase--sm {
    opacity: 0.18;
  }
  .tpl-opinion-wall__phrase--md {
    opacity: 0.45;
  }
}
```

**Accessibility:**
- The entire `__inner` div is `aria-hidden="true"` — the opinion phrases are decorative. The brand statement is not lost: the nav bar shows the logo, and the tagline below is readable text.
- `tpl-skip-link` is the first focusable element. Keyboard users and screen reader users bypass the wall immediately.
- The skip link target (`#first-product-section`) must be set to the ID of the Record Store Browse section — the first substantive product content.

**Performance:**
- Text-only above fold. Zero image requests until below the fold.
- `will-change: transform` on phrase elements creates GPU compositing layers, preventing layout recalculation when adjacent elements change.
- No JavaScript required for the wall itself. The bounce animation is CSS-only.
- The wall becomes interactive (fade + entry reveal) after first scroll — that behavior is handled by a small IntersectionObserver watching the wall's bottom edge. If JS fails, the wall simply displays statically. The skip link remains functional.

**Content survivability:**
- To change opinion phrases: edit the `<span>` text content. Rotation values are assigned by nth-child position, so the visual arrangement adapts automatically.
- To add a phrase: append a new `<span>` with the appropriate `--xl / --lg / --md / --sm` class. The flexbox wrap redistributes automatically.
- To remove a phrase: remove the `<span>`. nth-child rotations shift one position — acceptable visual variation.

---

### 3C.2 Sticker Wall Product Layout

**Purpose:** Collection page product layout. Replaces standard grid on collection pages. Products at 1-5 degree rotation, staggered heights, slight edge overlap. Visual language: a felt board someone arranged with opinions.

**When used:** Collection pages (Mood Wall, per Kurt). Also the Counter Display section on the homepage (see 3C.4 for the interactive variant). NOT used on the product list below the wall, which uses a standard stacked list.

**Structure:**
```html
<div class="tpl-sticker-wall" role="list" aria-label="[Collection name] products">
  <div class="tpl-sticker-wall__item" role="listitem">
    <!-- Each item is a Counter Display Tile (3C.4) -->
    <article class="tpl-counter-tile" ...>
      ...
    </article>
  </div>
</div>
```

**CSS Implementation:**

```css
.tpl-sticker-wall {
  position: relative;
  display: grid;
  /* Stagger is created by variable row heights, not equal-height rows */
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2);
  padding: var(--space-3);
}

@media (min-width: 768px) {
  .tpl-sticker-wall {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
  }
}

@media (min-width: 1024px) {
  .tpl-sticker-wall {
    grid-template-columns: repeat(4, 1fr);
    gap: var(--space-3);
  }
}

.tpl-sticker-wall__item {
  position: relative;
  /* Vertical stagger — alternating items shift up or down */
}

/* Deterministic stagger via nth-child. Range: ±15% of item height. */
.tpl-sticker-wall__item:nth-child(2n)   { transform: translateY(12px); }
.tpl-sticker-wall__item:nth-child(3n)   { transform: translateY(-8px); }
.tpl-sticker-wall__item:nth-child(5n)   { transform: translateY(16px); }
.tpl-sticker-wall__item:nth-child(7n)   { transform: translateY(-4px); }

/*
  Overlap: adjacent items in the same row overlap by 4-8px at their edges.
  This is achieved via negative margin on even items within the flex context.
  On grid layout, we use z-index layering instead — odd items sit above even items.
*/
.tpl-sticker-wall__item:nth-child(odd)  { z-index: 2; }
.tpl-sticker-wall__item:nth-child(even) { z-index: 1; margin-top: -4px; }

/* Mobile: reduce stagger to preserve tap target integrity */
@media (max-width: 767px) {
  .tpl-sticker-wall__item:nth-child(2n)   { transform: translateY(8px); }
  .tpl-sticker-wall__item:nth-child(3n)   { transform: translateY(-4px); }
  .tpl-sticker-wall__item:nth-child(5n)   { transform: translateY(10px); }
  .tpl-sticker-wall__item:nth-child(7n)   { transform: translateY(-2px); }
  .tpl-sticker-wall__item:nth-child(even) { margin-top: -2px; }
}
```

**Rotation:** Applied on the Counter Display Tile (3C.4) inside each item, not on the item wrapper. This keeps the tap target rectangular and full-size regardless of rotation.

**Overlap rule:** The stagger and slight negative margin create the overlap. The overlap must never cover product names or prices — those are in the card body below the image, not inside the image area. The overlap is at image edges only.

**Mobile specifics:**
- 2 columns across — same as standard grid
- Stagger reduced to ±8px instead of ±15px
- Rotation reduced to 1-2 degrees (see 3C.4)
- Overlap reduced to 2-4px

**Tablet specifics (768–1023px):**
- 3 columns across
- Stagger at full ±15px
- Rotation at full 1-5 degrees

**Tap target safety:** The `tpl-sticker-wall__item` div extends to the full rectangular bounds of the tile. The `transform: rotate()` on the inner `tpl-counter-tile` does not reduce the tappable area — the touch event fires on the wrapper, which is not rotated.

---

### 3C.3 Record Store Browse Card

**Purpose:** Collection card in the horizontal scroll section on the homepage. Each card represents a full collection. Collection name in Barlow Condensed at 18-22vw. Products visible at bottom third like record sleeves peeking from a bin. Horizontal scroll with scroll snap.

**When used:** Homepage Section 2 (Record Store Browse, per Kurt). Not used on collection pages.

**Structure:**
```html
<section class="tpl-record-browse" aria-label="Browse collections">
  <div class="tpl-record-browse__track">

    <a href="/collections/no-filter"
       class="tpl-record-browse__card"
       aria-label="Browse the No Filter collection">
      <div class="tpl-record-browse__card-name" aria-hidden="true">
        NO FILTER
      </div>
      <div class="tpl-record-browse__card-products">
        <img src="..." alt="Products in No Filter collection" ...>
        <!-- 3-4 product images in the sleeve peek area -->
      </div>
      <span class="tpl-sr-only">No Filter — attitude and humor collection</span>
    </a>

    <a href="/collections/your-card-has-a-personality"
       class="tpl-record-browse__card tpl-record-browse__card--hero"
       aria-label="Browse Your Card Has a Personality collection">
      ...
    </a>

    <!-- Additional collection cards -->
  </div>
</section>
```

**CSS Implementation:**

```css
.tpl-record-browse {
  width: 100%;
  overflow: hidden;
  padding: var(--space-4) 0;
}

.tpl-record-browse__track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;  /* Momentum scrolling on iOS */
  scroll-behavior: smooth;
  gap: var(--space-3);
  padding-inline: var(--space-3);
  /* Hide scrollbar — partial next card is the affordance */
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.tpl-record-browse__track::-webkit-scrollbar {
  display: none;
}

.tpl-record-browse__card {
  /* 85vw width: shows partial next card — the affordance */
  flex: 0 0 85vw;
  scroll-snap-align: start;
  position: relative;
  height: 75vh;
  background-color: var(--color-surface-dark);  /* #1A1A1A — cards are dark, products provide the colour */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-decoration: none;
  overflow: hidden;
  /* No border-radius — sharp corners, brand character */
}

/* Hero collections get wider cards */
.tpl-record-browse__card--hero {
  flex: 0 0 90vw;
}

@media (min-width: 768px) {
  .tpl-record-browse__card {
    flex: 0 0 45vw;
    height: 65vh;
  }
  .tpl-record-browse__card--hero {
    flex: 0 0 55vw;
  }
}

@media (min-width: 1024px) {
  .tpl-record-browse__card {
    flex: 0 0 28vw;
    height: 60vh;
  }
  .tpl-record-browse__card--hero {
    flex: 0 0 36vw;
  }
}

.tpl-record-browse__card-name {
  position: absolute;
  top: var(--space-4);
  left: var(--space-4);
  right: var(--space-4);
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  /* 18-22vw range: adjusts per card width relative to viewport */
  font-size: clamp(2rem, 18vw, 7rem);
  text-transform: uppercase;
  letter-spacing: var(--tracking-opinion);
  line-height: var(--leading-opinion);
  color: var(--color-text-on-dark);
  /* Overflow intentional — name extends beyond card on large cards */
  white-space: nowrap;
  z-index: 1;
  pointer-events: none;
}

.tpl-record-browse__card-products {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 38%;  /* Products occupy bottom third of card — peek like record sleeves */
  display: flex;
  align-items: flex-end;
  justify-content: center;
  gap: -8px;  /* Slight overlap between product images */
  padding-inline: var(--space-4);
}

.tpl-record-browse__card-products img {
  height: 90%;
  width: auto;
  object-fit: contain;
  /* Slight rotation on alternate products — stagger within the sleeve area */
  filter: drop-shadow(0 -4px 8px rgba(0,0,0,0.3));
}

.tpl-record-browse__card-products img:nth-child(even) {
  transform: rotate(-3deg);
}
.tpl-record-browse__card-products img:nth-child(odd) {
  transform: rotate(2deg);
}

/* Gradient at card bottom — creates the "sleeve emerging from bin" depth */
.tpl-record-browse__card::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50%;
  background: linear-gradient(transparent, rgba(26,26,26,0.6));
  pointer-events: none;
  z-index: 0;
}

/* Tap/hover state — subtle brightness increase. Cards are CTA, not just display. */
.tpl-record-browse__card:hover,
.tpl-record-browse__card:focus-visible {
  outline: 2px solid var(--color-accent-secondary);
  outline-offset: 2px;
}

/* Screen reader only utility */
.tpl-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
  border: 0;
}
```

**Scroll snap behavior:**
- `scroll-snap-type: x mandatory` — each card snaps to position after swipe
- `-webkit-overflow-scrolling: touch` — momentum scrolling on iOS (the native "record bin flick" feel)
- Right edge overflow: the partial next card at 85vw signals more content without a "swipe for more" label

**No prices, no "Shop Now" on cards.** The card IS the CTA. The collection name and the peek of products is the invitation. Tap anywhere on the card to enter the collection.

**Product images in the sleeve area:**
- 3-4 product images per card
- Cropped at approximately 30-40% height (the peek, not the reveal)
- Images must be product-on-transparent-or-very-light-background to work against the dark card
- Loaded lazily — cards beyond the initial viewport

**Accessibility:**
- Each card is an `<a>` element — fully keyboard-navigable
- `aria-hidden="true"` on the decorative collection name (the `tpl-sr-only` span provides the screen reader label)
- `aria-label` on the `<a>` provides the full accessible name: "Browse the [Collection Name] collection"
- The scroll container does not trap keyboard focus

**Content survivability:**
- Changing a collection name: update the `<span>` text and the `aria-label` on the `<a>`
- Adding a collection card: append a new `<a>` block. The flexbox track expands.
- Removing a card: remove the `<a>`. No layout breaks.

---

### 3C.4 Counter Display Tile

**Purpose:** Product card variant for the Sticker Wall layout and Counter Display section. Features slight rotation, drop shadow depth, and a two-tap interaction on mobile (first tap reveals name and price overlay, second tap navigates to PDP). The "picking it up" interaction.

**When used:** Sticker Wall product layout (3C.2) on collection pages. Counter Display section (homepage Section 5, per Kurt). NOT used in standard product grid contexts where hover is the primary interaction.

**Structure:**
```html
<article class="tpl-counter-tile"
         data-rotation="-1.5"
         role="listitem">
  <a class="tpl-counter-tile__link"
     href="/products/bullshit-remover-keychain"
     aria-label="Bullshit Remover Keychain — ₹249. Tap to view product.">

    <div class="tpl-counter-tile__image-wrap">
      <picture>
        <source srcset="..." type="image/webp">
        <img src="..."
             alt="Bullshit Remover Keychain — enamel keychain on cream background"
             width="400" height="400"
             loading="lazy">
      </picture>

      <!-- Overlay: revealed on first tap (mobile) or hover (desktop) -->
      <div class="tpl-counter-tile__overlay" aria-hidden="true">
        <span class="tpl-counter-tile__opinion-stamp">BULLSHIT REMOVER</span>
      </div>

      <!-- Badge: optional, same specs as 3A.22 -->
      <span class="tpl-counter-tile__badge">NEW</span>
    </div>

    <div class="tpl-counter-tile__info">
      <h3 class="tpl-counter-tile__name">Bullshit Remover Keychain</h3>
      <span class="tpl-counter-tile__price">₹249</span>
    </div>

  </a>

  <!-- Quick-add: visible in overlay state -->
  <button class="tpl-counter-tile__quick-add"
          aria-label="Add Bullshit Remover Keychain to cart"
          data-product-id="[id]">
    +
  </button>
</article>
```

**CSS Implementation:**

```css
.tpl-counter-tile {
  position: relative;
  /* Rotation is applied via inline style from data-rotation attribute */
  /* Values range from -5 to +5 degrees. Set in template, not in CSS. */
  transform: rotate(var(--tile-rotation, 0deg));
  transform-origin: center center;
  will-change: transform;  /* GPU compositing layer — critical for smooth Pick Up */
  /* The shadow gives it physical presence on the cream canvas */
  box-shadow: var(--shadow-product);
  background-color: var(--color-surface-base);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

/*
  Rotation value injection via CSS custom property from data attribute.
  Tobi: set this in the Liquid template:
  style="--tile-rotation: {{ product.metafields.tpl.tile_rotation | default: '0' }}deg"

  If metafield is not set, tiles render at 0 degrees (flat) — never broken.
  Rotation values are stored as product metafields to allow art direction per product.

  Acceptable shortcut: assign rotation by loop index in the Liquid template.
  Example: style="--tile-rotation: {{ forloop.index | modulo: 5 | minus: 2 | append: 'deg' }}"
  This produces -2, -1, 0, 1, 2, -2, -1... degrees in sequence — deterministic stagger.
*/

.tpl-counter-tile__link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.tpl-counter-tile__image-wrap {
  position: relative;
  aspect-ratio: 1 / 1;
  overflow: hidden;
}

.tpl-counter-tile__image-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

/* Overlay: the opinion stamp and pick-up reveal */
.tpl-counter-tile__overlay {
  position: absolute;
  inset: 0;
  background-color: rgba(245, 240, 235, 0.85);  /* Cream at 85% — product still visible through overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
  pointer-events: none;
}

.tpl-counter-tile__opinion-stamp {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-opinion-md);
  text-transform: uppercase;
  letter-spacing: var(--tracking-opinion);
  color: var(--color-text-primary);
  opacity: 0.7;  /* Opinion overlays at reduced opacity — product still readable */
  text-align: center;
  padding: var(--space-2);
  line-height: var(--leading-opinion);
}

.tpl-counter-tile__info {
  padding: var(--space-2) var(--space-3);
}

.tpl-counter-tile__name {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: var(--text-h4);
  text-transform: uppercase;
  letter-spacing: var(--tracking-snug);
  color: var(--color-text-primary);
  margin: 0;
  /* 2-line clamp — name must survive regardless of length */
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tpl-counter-tile__price {
  display: block;
  font-family: var(--font-mono);
  font-weight: var(--weight-bold);
  font-size: var(--text-price);
  letter-spacing: var(--tracking-wide);
  color: var(--color-text-primary);
  margin-top: var(--space-1);
}

.tpl-counter-tile__badge {
  /* Same specs as 3A.22 badge system */
  position: absolute;
  top: 8px;
  left: 8px;
  font-family: var(--font-heading);
  font-weight: var(--weight-semibold);
  font-size: 11px;
  text-transform: uppercase;
  padding: 3px 6px;
  border-radius: var(--radius-sm);
  background-color: var(--color-accent-secondary);
  color: var(--color-text-on-accent);
  z-index: 2;
}

.tpl-counter-tile__quick-add {
  position: absolute;
  bottom: var(--space-2);
  right: var(--space-2);
  width: 32px;
  height: 32px;
  border-radius: var(--radius-none);
  background-color: var(--color-accent-primary);
  color: var(--color-text-on-red);
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: 18px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity var(--transition-fast);
  z-index: 3;
}

/* =====================
   DESKTOP HOVER STATES
   ===================== */

/* Pick Up: hover lifts the tile and reveals overlay */
@media (hover: hover) {
  .tpl-counter-tile:hover {
    transform: rotate(var(--tile-rotation, 0deg)) translateY(-4px) scale(1.05);
    box-shadow: var(--shadow-product-hover);
    z-index: 10;  /* Rises above siblings */
  }

  .tpl-counter-tile:hover .tpl-counter-tile__overlay {
    opacity: 1;
  }

  .tpl-counter-tile:hover .tpl-counter-tile__quick-add {
    opacity: 1;
  }

  /* Settle back — gravity is slower than the lift */
  .tpl-counter-tile {
    transition:
      transform var(--transition-fast),
      box-shadow var(--transition-fast);
  }

  .tpl-counter-tile:not(:hover) {
    transition:
      transform var(--transition-settle),
      box-shadow var(--transition-settle);
  }
}

/* =====================
   MOBILE TWO-TAP STATE
   ===================== */

/*
  First tap (mobile): tile enters "picked-up" state — overlay visible, quick-add visible.
  This is managed via a .is-picked-up class toggled by JS.
  Second tap (while .is-picked-up is set): navigates to PDP.
*/

.tpl-counter-tile.is-picked-up {
  transform: rotate(var(--tile-rotation, 0deg)) translateY(-4px) scale(1.05);
  box-shadow: var(--shadow-product-hover);
  z-index: 10;
}

.tpl-counter-tile.is-picked-up .tpl-counter-tile__overlay {
  opacity: 1;
}

.tpl-counter-tile.is-picked-up .tpl-counter-tile__quick-add {
  opacity: 1;
}

/* Other tiles in the wall settle back when a sibling is picked up */
.tpl-sticker-wall:has(.is-picked-up) .tpl-counter-tile:not(.is-picked-up) {
  opacity: 0.85;
  transition: opacity var(--transition-normal);
}
```

**JavaScript — two-tap interaction (mobile):**

```javascript
// tpl-counter-tile.js
// Minimal JS — no library dependency required.

document.querySelectorAll('.tpl-counter-tile').forEach(tile => {
  let pickedUp = false;

  tile.addEventListener('click', (e) => {
    // Desktop: two-state is handled by CSS :hover. No JS needed.
    if (window.matchMedia('(hover: hover)').matches) return;

    const link = tile.querySelector('.tpl-counter-tile__link');

    if (!pickedUp) {
      // First tap: pick up the tile
      e.preventDefault();
      pickedUp = true;
      tile.classList.add('is-picked-up');

      // Auto-dismiss pick-up state after 3 seconds of no interaction
      setTimeout(() => {
        if (pickedUp) {
          pickedUp = false;
          tile.classList.remove('is-picked-up');
        }
      }, 3000);

      // Dismiss all other picked-up tiles in the same wall
      tile.closest('.tpl-sticker-wall')
          ?.querySelectorAll('.tpl-counter-tile.is-picked-up')
          .forEach(other => {
            if (other !== tile) {
              other.classList.remove('is-picked-up');
            }
          });

    } else {
      // Second tap: navigate to PDP
      // Allow default <a> navigation — do not preventDefault
      pickedUp = false;
      tile.classList.remove('is-picked-up');
    }
  });

  // Dismiss on tap outside the wall
  document.addEventListener('click', (e) => {
    if (!tile.contains(e.target) && pickedUp) {
      pickedUp = false;
      tile.classList.remove('is-picked-up');
    }
  });
});
```

**Content survivability:**
- Name length: clamped to 2 lines. Any product name that is longer wraps gracefully — no overflow, no layout break.
- Price: always one line. `--font-mono` is fixed-width — price display does not shift with digit changes.
- Rotation value: set via CSS custom property. If not set, falls back to 0deg — tile renders flat, never broken.
- Badge: optional. If no badge is needed, omit the element. No empty space left behind.
- Quick-add: optional. If a product has no add-to-cart path (out of stock), omit the button. Overlay still shows opinion stamp.

**Mobile rotation rule:** On mobile (< 768px), rotation is reduced to 1-2 degrees maximum. The Pick Up interaction already provides the physical metaphor — aggressive rotation is not needed and can obscure content on small screens.

---

### 3C.5 Pick Up Interaction State

**Purpose:** Defines the full interaction behavior when a customer hovers (desktop) or first-taps (mobile) a Counter Display Tile or Sticker Wall product. This is not a separate component — it is the hover/focus/active state specification for 3C.4, extracted here for clarity because it appears across multiple layout contexts.

**Trigger:**
- Desktop: `hover` on `.tpl-counter-tile` (CSS `:hover` pseudo-class)
- Mobile: first `click` event on `.tpl-counter-tile` (JS, see 3C.4)
- Keyboard: `focus-visible` on `.tpl-counter-tile__link` — same visual treatment as hover

**Visual state on trigger:**

| Property | Default | Picked-Up |
|----------|---------|-----------|
| `transform` | `rotate(Ndeg)` | `rotate(Ndeg) translateY(-4px) scale(1.05)` |
| `box-shadow` | `var(--shadow-product)` | `var(--shadow-product-hover)` |
| `z-index` | `auto` | `10` |
| Overlay opacity | `0` | `1` |
| Quick-add opacity | `0` | `1` |
| Sibling tiles | 100% opacity | 85% opacity |

**Transition timing:**
- Lift (default → picked-up): `--transition-fast` (150ms ease-out) — fast, responsive, physical
- Settle (picked-up → default): `--transition-settle` (250ms ease-in) — slightly slower, gravity

**The opinion stamp overlay:**
- Appears in the image area at 70% opacity when the tile is in picked-up state
- The cream overlay at 85% lets the product image show through dimly while the opinion text stamps over it
- Opacity: opinion stamp at 0.7 on a cream overlay at 0.85 = product is visible, opinion is readable
- Text is `aria-hidden="true"` — it is decorative in the overlay. The product name in `tpl-counter-tile__info` is the accessible content.

**GPU acceleration:**
- `will-change: transform` is set on `.tpl-counter-tile` at all times
- This creates a GPU compositing layer for the element, preventing the transform animation from triggering a layout recalculation
- Cost: each tile occupies GPU memory. On a page with 16+ tiles, this is acceptable. On a page with 50+ tiles, Tobi should apply `will-change` only to tiles within the viewport using an IntersectionObserver to add/remove the property as tiles enter/exit.
- Do not add `will-change` to any other element. Overuse of `will-change` is a performance regression.

**Performance note:**
- The scale(1.05) transform during Pick Up is GPU-accelerated via the compositing layer. No layout recalculation occurs.
- `translateY(-4px)` is a sub-pixel movement. No jank on mid-range Android hardware.
- The sibling opacity change (0.85) is also a composited property — it does not cause a repaint.

**Accessibility:**
- The interaction provides the same information through two channels: visual (overlay) and semantic (the `aria-label` on the link which includes product name and price)
- Keyboard users who focus the tile see the picked-up state via `focus-visible` — they get the same visual affordance as mouse users
- Screen readers do not need the overlay — product name and price are always in the DOM in `tpl-counter-tile__info`

---

## Part 4: Responsive Behavior Rules

### 4.1 Mobile-First Breakpoint Strategy

Write all CSS for 320px first. Override at breakpoints using `min-width` only. Never `max-width` media queries in component code.

**Design target: 375px.** Every component validated here before QA.

**Critical responsive changes by component:**

| Component | Mobile (< 768px) | Tablet (768–1023px) | Desktop (≥ 1024px) |
|-----------|------------------|---------------------|---------------------|
| Opinion bar | Scrolls with page | Scrolls with page | Fixed/sticky |
| Header | Minimal top + bottom bar | Minimal top + bottom bar | Full horizontal nav |
| Opinion Wall | Full 100svh, 2 opacity tiers | Full 100svh, 3 opacity tiers | Full 100svh, 3 opacity tiers |
| Sticker Wall | 2 columns, rotation 1-2deg | 3 columns, rotation 1-5deg | 4 columns, rotation 1-5deg |
| Record Store Browse | 85vw cards, horizontal scroll | 45vw cards, horizontal scroll | 28vw cards, scroll or visible |
| Counter Display Tile | 1-2deg rotation, 2px overlap | 1-5deg rotation, 4-8px overlap | 1-5deg rotation, 4-8px overlap |
| Pick Up interaction | Two-tap via JS | Two-tap via JS | CSS :hover, single click to PDP |
| Product grid (standard) | 2 columns | 3 columns | 4 columns |
| Collection header | Type-only at opinion scale | Type-only at opinion scale | Type-only at opinion scale |
| PDP layout | Single column, stacked | Single column, wider | 2-column (gallery left, details right) |
| PDP gallery | Full width, swipe | 70% width | 55% + thumbnail strip |
| Sticky ATC | Fixed bottom bar | Fixed bottom bar | None (ATC in flow) |
| Filter bar | Horizontal scroll chips | Horizontal scroll chips | Inline row, not sticky |
| Trust block | 2x2 grid | 4-column row | 4-column row |
| Bundle card | Full width | 2 columns | Spans 2 of 4 grid columns |
| WhatsApp float | Icon only | Icon only | Icon + "Chat" label |

### 4.2 Touch Target Rules

Minimums, not targets:
- All interactive elements: 48px minimum in both dimensions
- Bottom persistent nav items: 56px height
- Cart icon: minimum 44x44px hit area
- Sticker Wall item wrapper: full rectangle, never reduced by rotation
- Counter Display Tile quick-add button: 44x44px minimum when visible
- Accordion triggers: 56px height minimum

**Why the Sticker Wall tap target cannot be rotated:** The `transform: rotate()` applies to the visual presentation only. The tap target is always the rectangular bounding box of the tile wrapper. This is browser-standard behavior — `transform` does not change the hit testing box for touch events.

### 4.3 Thumb Zone Design

On 375px held in one hand, the comfortable thumb zone covers the bottom 60%. Rules unchanged from original spec:
- Primary CTA (Add to Cart, Checkout) in bottom 60% of viewport on mobile
- Bottom persistent nav bar in most comfortable zone
- Quick-add button in Sticker Wall positioned at bottom of card (thumb-reachable)
- Pick Up dismiss area spans full screen — tapping anywhere outside a tile dismisses the picked-up state

### 4.4 Safe Area Handling

```css
.tpl-sticky-atc-bar,
.tpl-bottom-nav-bar {
  padding-bottom: env(safe-area-inset-bottom);
}
```

Non-negotiable. Without this, the CTA overlaps the iOS home indicator.

---

## Part 5: Interaction Patterns

### 5.1 Add to Cart Feedback Sequence

1. Button shows loading state (spinner, 100ms after tap)
2. Fynd cart API call executes
3. Success: button briefly shows "ADDED ✓" (500ms), then returns to "ADD TO CART — ₹X"
4. Cart badge increments
5. Toast: "Added to cart" (3 seconds)
6. If total ≥ ₹499: toast overrides to "Free shipping unlocked!"

On failure:
- Button returns to default immediately
- Error toast: "Couldn't add to cart. Try again."

### 5.2 Free Shipping Bar Celebration

When cart crosses ₹499:
- Progress bar fill transitions from yellow to green
- Bar pulses once (scale, not a loop)
- Message: "Free shipping unlocked!" with checkmark
- On cart page: brief confetti burst (CSS-only). This is the single celebratory animation in the system.

### 5.3 Image Handling on PDP

Mobile:
- Swipe threshold: 50px horizontal while vertical displacement < 30px
- Snap: `scroll-snap-type: x mandatory`
- Pinch-to-zoom: native browser behavior, do not intercept

Desktop:
- Click: opens lightbox overlay
- Escape or overlay click closes
- In lightbox: mouse hover magnifies 2× inline

### 5.4 Filter Collapse on Mobile

Filters in a push-down panel (not an overlay). Tapping a filter chip:
- Panel slides down below the chip row
- Filter options as 48px tappable chips
- "Apply" button at panel bottom
- Panel closes on Apply or tap outside
- Panel pushes product grid down — no z-index complexity

### 5.5 Pick Up Dismiss Behavior

The picked-up state on mobile must always be dismissable without navigating:
- Tap outside the wall: dismisses all picked-up tiles
- Tap a different tile: dismisses previous tile, picks up new one
- Auto-dismiss after 3 seconds of no interaction
- Never leave a tile in picked-up state when the user scrolls away from the section

### 5.6 Sticky Elements Z-Index Stack

```
z-index: 10   — Sticky filter bar
z-index: 20   — Sticky header
z-index: 10   — Sticker Wall picked-up tile (local stacking context)
z-index: 50   — Nav drawer overlay
z-index: 100  — Sticky Add to Cart bar (mobile)
z-index: 150  — WhatsApp floating button
z-index: 200  — Toasts / notifications
z-index: 300  — Modals / lightbox
```

Note: The Counter Display Tile's `z-index: 10` during Pick Up is within its local stacking context (the `.tpl-sticker-wall` container). It does not interfere with the global z-index stack above.

---

## Part 6: Accessibility Baseline

### 6.1 Color Contrast

The Light+Bold direction uses cream backgrounds. Contrast ratios change from the Darkroom spec. All pairs below have been calculated against the new surface colors.

| Foreground | Background | Ratio | WCAG | Use |
|------------|------------|-------|------|-----|
| #1A1A1A (off-black) | #F5F0EB (cream) | ~15.8:1 | AAA | Body text, headings — primary use |
| #1A1A1A (off-black) | #EDE8E3 (raised cream) | ~14.0:1 | AAA | Cards, nav text |
| #6B6B6B (mid-gray) | #F5F0EB (cream) | ~5.1:1 | AA | Captions, metadata (body size) |
| #6B6B6B (mid-gray) | #EDE8E3 (raised) | ~4.6:1 | AA (large text only) | Secondary text on raised surface |
| #1A1A1A (off-black) | #F2D024 (yellow) | ~12.0:1 | AAA | Opinion bar text (drop-alert variant) |
| #F5F0EB (cream) | #E63B2E (red) | ~4.8:1 | AA | CTA button text |
| #F5F0EB (cream) | #1A1A1A (dark surface) | ~15.8:1 | AAA | Text on dark surface components (Record Store Browse card, opinion bar standard) |
| #1A1A1A (off-black) | rgba(245,240,235,0.85) | Sufficient | AA | Opinion stamp overlay on tile |

**Rules enforced:**
- `--color-text-secondary` (#6B6B6B on cream) passes AA for body text (4.5:1 threshold). Do not use it for text smaller than 18px or interactive elements.
- The opinion stamp overlay uses `--color-text-primary` on a semi-transparent cream overlay — the product image behind it may reduce effective contrast. The stamp is `aria-hidden="true"` — it is decorative. The accessible product name is always in the DOM.
- Dark surface components (Record Store Browse card, opinion bar standard variant) use `--color-text-on-dark` (#F5F0EB) — ratio 15.8:1, AAA.

### 6.2 Focus States

```css
:focus-visible {
  outline: 2px solid var(--color-accent-secondary);  /* Yellow — visible on both cream and dark surfaces */
  outline-offset: 2px;
}

[data-focus-custom]:focus-visible {
  outline: none;
}
```

Use `:focus-visible` not `:focus`. This applies to all interactive elements including Sticker Wall tiles and Record Store Browse cards.

### 6.3 Screen Reader Considerations

**Opinion Wall:** The entire wall is `aria-hidden`. The skip link is the first focusable element. Screen reader users skip directly to product content.

**Record Store Browse card:** `aria-label` on each `<a>` provides the full collection description. The decorative collection name text is `aria-hidden`.

**Counter Display Tile:** The `aria-label` on `tpl-counter-tile__link` contains product name and price — screen readers get complete purchase information without needing the hover overlay.

**Two-tap interaction:** Screen readers do not experience the two-tap behavior. They navigate directly via the `<a>` link on first activation. This is correct — the two-tap is a visual discovery mechanism, not a commerce requirement.

**Opinion stamp in overlay:** `aria-hidden="true"`. The product name in `tpl-counter-tile__info` is the accessible label — always in the DOM, never hidden.

### 6.4 Alt Text Strategy

| Image type | Alt text approach |
|-----------|-------------------|
| Primary product image (hero shot) | "[Product name] — [brief object description]" |
| Lifestyle image | "[Product name] — [context description]" |
| Detail/close-up image | "[Product name] — close-up showing [specific feature]" |
| Scale reference | "[Product name] — shown next to a hand for scale" |
| Bundle image | "[Bundle name] — [contents list short-form]" |
| Record Store Browse card products | "[Collection name] collection products" (group alt on the containing image) |
| Decorative backgrounds | `alt=""` |
| Opinion Wall text elements | No images — text elements, not images |
| Artist photo | "[Artist name] — product designer" |

---

## Part 7: Performance Constraints

### 7.1 Image Strategy

No change from original specification. Format: WebP primary, JPEG fallback via `<picture>`.

```html
<picture>
  <source srcset="/images/product-name-400.webp 400w, /images/product-name-800.webp 800w"
          type="image/webp">
  <img src="/images/product-name-400.jpg"
       srcset="/images/product-name-400.jpg 400w, /images/product-name-800.jpg 800w"
       sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
       alt="[alt text]"
       loading="lazy"
       width="400" height="400">
</picture>
```

**Context-specific sizes:**

| Context | Rendered size | Source size |
|---------|--------------|-------------|
| Sticker Wall tile (mobile) | ~160px | 320px WebP, ~15-20KB |
| Sticker Wall tile (desktop) | ~280px | 400px WebP, ~25-35KB |
| Record Store Browse sleeve peek | ~100px tall | 200px WebP, ~8-12KB |
| Counter Display tile (homepage) | ~200px | 400px WebP, ~25-35KB |
| PDP primary (mobile) | 375px | 750px WebP, ~40-60KB |
| PDP primary (desktop) | ~550px | 1000px WebP, ~60-80KB |
| Cart thumbnail | 72px | 150px WebP, ~5-8KB |

**Loading priority:**
- Opinion Wall: text-only — no images above fold. LCP is the first product image in the Record Store Browse section.
- Record Store Browse: first card's sleeve products `loading="eager"`. All others `loading="lazy"`.
- Sticker Wall first row: `loading="eager"`. All others lazy.
- Do not lazy-load the LCP element.

### 7.2 Font Loading

Three fonts: Barlow Condensed (500/600/700), Inter (400), Space Mono (400/700). ~120-150KB total with subsetting.

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400&family=Space+Mono:ital,wght@0,400;0,700&display=swap" rel="stylesheet">
```

`font-display: swap` mandatory. The Opinion Wall is text-only — if fonts are delayed, system-ui renders immediately (close to Inter) and swaps on load. No invisible text, no FOUT visible at Barlow Condensed size.

### 7.3 Opinion Wall Performance

The Opinion Wall is the first thing users see. It is also the lowest-risk section for performance: text-only, no images, CSS-only animation (the chevron bounce). Requirements:
- The wall must render on first paint using system fonts if Barlow Condensed has not loaded yet. The fallback `system-ui` is close enough in proportion.
- The IntersectionObserver for the "enter on scroll" effect weighs ~2KB inline. No library.
- `will-change: transform` on phrase elements: set at page load, not deferred.

### 7.4 Sticker Wall / Counter Display Tile Performance

The `will-change: transform` on each tile creates a GPU compositing layer. On a collection page with 16 tiles, this is 16 compositing layers — acceptable. Rule:
- 16 or fewer tiles on screen: `will-change: transform` at all times on all tiles
- 17+ tiles visible: apply `will-change` only to tiles within viewport using IntersectionObserver. Remove it when they leave.
- Maximum tiles ever in DOM at once: 32 (Fynd pagination handles the rest via lazy section loading)

### 7.5 Performance Budget

| Asset type | Budget |
|-----------|--------|
| Total page weight (initial load) | < 500KB |
| Opinion Wall (text + CSS) | < 5KB — no images, no JS on initial render |
| Hero image (first below-fold product) | < 80KB |
| Total images above fold | < 200KB |
| JS (initial bundle, including Pick Up interaction) | < 100KB |
| CSS (full) | < 50KB |
| Fonts (all 3) | < 150KB |

The Fynd platform adds base JS and CSS. Tobi must audit base weight before adding custom code.

---

## Part 8: Implementation Notes for Tobi

### 8.1 Fynd Theme Architecture

| UI Component | Fynd implementation |
|-------------|---------------------|
| Opinion bar | Announcement bar section (native) — configure text and background |
| Header + nav | Header section (native) — override background to cream, text to off-black |
| Opinion Wall | **Custom component** — full-viewport text section, no Fynd native equivalent |
| Sticker Wall | **Custom component** — CSS grid with rotation and stagger, wraps Fynd product tiles |
| Record Store Browse | **Custom component** — horizontal scroll with Fynd collection data |
| Counter Display Tile | **Custom component** — extends Fynd product card with rotation, overlay, two-tap JS |
| Product card (standard grid) | Product card block (native) — style to match system |
| Collection header | Collection banner section (native) — override to type-only with opinion text scale |
| Product grid | Collection grid section (native) — column count, gap, sorting |
| Filter bar | Fynd native filter — styled to match |
| PDP gallery | Fynd native media gallery |
| Sticky ATC bar | **Custom component** — custom liquid section + IntersectionObserver JS |
| Free shipping bar | **Custom component** — custom liquid + Fynd cart attribute JS |
| WhatsApp float | **Custom component** — custom section in base layout |
| Bottom persistent nav | **Custom component** — custom section in mobile layout |
| Bundle card | Fynd product page with custom metafields for bundle-specific display |
| Toast notifications | Fynd native cart feedback + custom CSS override |
| Loading skeletons | CSS-only, applied to Fynd's lazy-loading placeholders |

### 8.2 CSS Custom Properties in Fynd

All design tokens from Part 1 defined in the base stylesheet. Available site-wide. If Fynd's built-in color/font settings cannot accept CSS variable syntax, override Fynd settings output with the token-based system in a custom CSS file that loads last.

### 8.3 Component Naming Convention

BEM (Block__Element--Modifier). Prefix all custom classes with `tpl-` to avoid collision with Fynd native classes.

Examples:
- `.tpl-opinion-wall` — block
- `.tpl-opinion-wall__phrase` — element
- `.tpl-opinion-wall__phrase--xl` — modifier
- `.tpl-counter-tile` — block
- `.tpl-counter-tile__overlay` — element
- `.tpl-counter-tile.is-picked-up` — state class (not BEM modifier — state is JS-toggled)
- `.tpl-sticker-wall` — block
- `.tpl-record-browse` — block

### 8.4 Custom Components — Priority Order

**Priority 1 — Must be live on launch day:**
1. Opinion Wall — homepage entry, brand identity, text-only, high-impact
2. Record Store Browse card — collection discovery mechanism, homepage Section 2
3. Counter Display Tile with Pick Up interaction — homepage Section 5 and collection pages
4. Sticker Wall product layout — all collection pages
5. Sticky Add to Cart bar (mobile PDP) — conversion requirement
6. Free shipping progress bar in cart — AOV lever
7. WhatsApp floating button — primary share channel
8. Bottom persistent nav bar — mobile wayfinding

**Priority 2 — Post-launch (30-day window):**
9. Drop countdown timer — JS countdown
10. Bundle replacement suggestion in cart
11. Drop notification signup modal

### 8.5 Tile Rotation via Fynd Liquid

The Counter Display Tile rotation values should be set via a Liquid loop index calculation, not via product metafields at launch. This avoids a metafield setup dependency on launch day:

```liquid
{%- assign rotation_values = '-2,1.5,-3,2,-1,3,-0.5,1' | split: ',' -%}
{%- assign rotation = rotation_values[forloop.index0 | modulo: 8] -%}
<article class="tpl-counter-tile"
         style="--tile-rotation: {{ rotation }}deg">
```

This produces 8 rotation values cycling through the product list — deterministic, requires no metafield setup.

### 8.6 Gift Context Handling

Gift context applied via `.context-gift` class — a background switch, not a separate theme:

```css
.context-gift {
  --color-surface-base:    #F0EBE5;   /* Slightly warmer cream for gift pages */
  --color-surface-raised:  #E8E3DD;
  --color-text-secondary:  #7A7570;
  --color-border:          #CCC8C2;
}
```

Apply `.context-gift` to: `/gifts/`, `/bundles/`, and the checkout flow. Nowhere else.

The Light+Bold direction does not require the gift context to dramatically change from the base system — both use cream surfaces. The gift context is a subtle warmth shift, not a theme change.

### 8.7 Performance Tasks Specific to Fynd

1. Confirm Fynd CDN serves images with WebP conversion at the CDN layer
2. Audit Fynd's default JS bundle weight before adding custom code
3. Use Fynd's built-in lazy loading for product images if available — do not implement a second loader
4. The Opinion Wall's IntersectionObserver should be inlined in a `<script>` tag in the Opinion Wall section — it does not need to be part of the main JS bundle
5. `will-change: transform` on Sticker Wall tiles: apply via the Fynd section CSS, not inline styles — this way Fynd's CSS optimization (minification, concatenation) includes it correctly

---

## Part 9: System Rules

### What This System Forbids

These are brand failures, not preferences:

1. **No dark backgrounds as page default.** The cream canvas is the brand. Dark surfaces are the exception: opinion bar, Record Store Browse cards, drop announcements. Everything else is light.

2. **No product images on white backgrounds as primary product card images.** White is too clinical. The product is shot on a neutral warm surface. The product's own colour is the visual event.

3. **No pastels, rounded logomarks, or gradient backgrounds.** Sean's rule. These belong to competitors.

4. **No decorative illustrations, mascots, or ornamental dividers.** Products and opinions are the visual interest.

5. **No more than two accent colors on any single screen surface.** Red and yellow are the ceiling.

6. **No rotation exceeding 5 degrees on any product tile.** More than 5 degrees reads as broken, not curated. The organised part of "organised chaos" requires this discipline.

7. **No overlap that covers a product's name, price, or face.** Edges overlap. Identifying content does not.

8. **No scale transforms on standard product grid cards.** The Sticker Wall and Counter Display have the Pick Up interaction — that is the scale moment. Standard grid cards do not scale on hover. Consistency requires choosing where the physical metaphor lives.

9. **No fake inventory counters.** The drop inventory counter must be live from Fynd's actual stock. The target audience will notice and share screenshots.

10. **No components that only appear once on the site.** Every one-off is a maintenance burden for Dan. If a design element cannot be reused, question its existence.

11. **No fixed bottom bars without `env(safe-area-inset-bottom)`.** Non-negotiable.

12. **No font sizes below 11px.** `--text-caption` is already small.

13. **No lazy-loading the LCP element.** With the Opinion Wall text-only above fold, the LCP is the first below-fold image. Do not lazy-load it.

14. **No yellow accent on large background areas except in drop context.** Yellow is the alarm color. Used for non-drop content, it loses its urgency signal.

### What Keeps This System Alive

The system survives content changes because:
- Every size, spacing, and color value is a token. Changing a token updates every component.
- Opinion Wall phrases are `<span>` elements — add, remove, or edit without layout breaks.
- Counter Display Tiles are self-contained. Rotation is a CSS custom property with a safe fallback (0deg). Name length is clamped. Price is fixed-width mono.
- Record Store Browse cards: adding or removing a collection card extends or contracts the horizontal track with no layout intervention.
- The gift context is a background switch, not a separate system.
- Components are named by role, not by content — `.tpl-counter-tile` not `.tpl-bullshit-remover-card`.

The system breaks when:
- Someone hardcodes a hex value instead of using the token
- A dark background is added to a page section that is not in the approved list (opinion bar, Record Store Browse, drop announcement)
- Rotation values exceed 5 degrees
- The two-tap interaction is removed from Counter Display Tiles — without it, mobile users have no way to see the product name before navigating to the PDP
- The opinion bar is used for promotional content (sales, discount codes) — it loses its brand signal value
- Yellow is used for non-drop content

---

## Handoff Notes

**For Sean:** All color tokens in Part 1.1 reflect the Light+Bold direction from your updated `visual-identity.md` (2026-03-28). The cream canvas is `--color-surface-base`. Dark surfaces are `--color-surface-dark`. The new opacity tiers for the Opinion Wall (100% / 50-60% / 20-30%) implement your three-layer specification from visual-identity.md Section 2.1. Review Section 3C.1 (Opinion Wall) and Section 3C.3 (Record Store Browse Card) for the typographic implementation of your visual signatures. The shadow system (Part 1.5) has been reworked for a light surface — the old `rgba(0,0,0,0.4)` shadows from the Darkroom spec have been reduced to `rgba(0,0,0,0.12-0.20)` to be visible and purposeful on cream without being heavy.

**For Kurt:** All new components (3C.1–3C.5) implement your wireframe specifications from `ux-ia-wireframes.md` (2026-03-28). Opinion Wall (3C.1) implements your Section 3.1 homepage wireframe. Record Store Browse (3C.3) implements your Section 2 "vinyl bin" model. Counter Display Tile (3C.4) implements your Section 5 and your Section 3.2 Mood Wall tap interaction model. The two-tap behavior on mobile (first tap reveals name+price, second tap navigates) is your specification from ux-ia-wireframes.md Section 3.2. The `tpl-skip-link` in the Opinion Wall addresses your note about accessibility on a non-standard homepage entry pattern.

**For Tobi:** Part 8 is your implementation guide. Priority 1 custom components are listed in Section 8.4 in build sequence order. The Opinion Wall is text-only — highest impact, lowest complexity. Build it first. The Counter Display Tile JS (Section 3C.4) is self-contained and does not require a framework or library. Tile rotation via Liquid loop index (Section 8.5) avoids the metafield setup dependency — use this for launch. The `tpl-` prefix convention in Section 8.3 prevents class conflicts with Fynd native classes. Performance constraints for the Pick Up interaction's `will-change` property are in Section 7.4 — read before implementing on collection pages with large product counts.
