<!-- last-updated: 2026-03-28 -->
# Hi-Fi Page Design Specifications

| Field | Value |
|-------|-------|
| **Phase** | 3 — Experience & Identity Design |
| **Producing Agent** | Julie (UI System Lead) |
| **Date** | 2026-03-28 |
| **Status** | draft |
| **Reviewer** | Harley |

**Revision note (2026-03-28):** Visual direction updated from Darkroom (dark surface) to Light+Bold / Organised Chaos (cream canvas). Homepage Section 2 (hero image) replaced with Opinion Wall entry — text-only above fold, zero image requests, direct LCP improvement. A new Record Store Browse section added after Opinion Wall. Collection page Section 2 (dark hero) updated to cream canvas with type-first header. Collection page Section 4 (standard grid) updated to Sticker Wall layout. All dark surface references (#1A1A1A as background) changed to `--color-surface-base` (cream) except where the dark surface is intentional (Opinion Bar, Record Store Browse cards, Counter Display context). Pages 3–8 are unchanged — their surface treatments were already token-referenced or aligned with the cream direction.

---

## How to Use This Document

This is the complete page design specification for Tobi's build phase. Every page layout, component placement, spacing rule, and interaction is defined here. This document is not Figma — it is the authoritative brief that bridges design intent and code execution.

**Key sources of truth referenced throughout:**
- Visual system: Sean's visual-identity.md (Light+Bold / Organised Chaos direction, 2026-03-28 — cream #F5F0EB canvas, off-black #1A1A1A ink, signal red/yellow)
- Component library: Julie's ui-system.md (all design tokens, component variants, spacing rules, grid system, five new components in Part 3C)
- Copy voice: Joanna's copy-system.md (voice rules, tone, banned words, WhatsApp-shareable principles)
- IA/UX: Kurt's ux-ia-wireframes.md (page structure, conversion mechanics, trust signals, AOV threshold ₹499)

Every section specifies:
1. **Section order** — what comes first, second, third (mobile-first)
2. **Content & components** — what lives in each section (images, copy, CTAs, forms)
3. **Layout grid** — mobile / tablet / desktop breakpoints
4. **Component variants** — which UI system component, what state
5. **Spacing & sizing** — CSS tokens (--space-*, --text-*, --radius-*)
6. **Interaction & behavior** — hover states, mobile tap states, loading states, disabled states
7. **Conversion mechanic** — how the section pushes toward ₹499 AOV or purchase
8. **Copy directives** — reference copy-system.md rules, point to Joanna's templates

Mobile-first. Every layout starts at 320px and scales up. Desktop is not a separate design — it is a responsive evolution.

---

## Page 1: Homepage

**Purpose:** First impression. Establish brand identity immediately through opinion text — no hero image above fold. Create urgency (drop countdown) and clear wayfinding (collections, gifting, best sellers). Push toward ₹499 AOV through bundle visibility.

**Target breakpoints:**
- Mobile: 320px–767px
- Tablet: 768px–1023px
- Desktop: 1024px+

---

### Section 1: Navigation & Header (sticky on scroll)

**Mobile (320px–767px):**
- Fixed header: 56px height, `--color-surface-base` (cream #F5F0EB) bg
- Border-bottom: 1px `--color-border`
- Left: TPL monogram (32px), `--color-text-primary`
- Right: Search icon (24px) + Cart badge icon (24px, red dot when cart has items)
- Bottom persistent bar: fixed to bottom of viewport, 56px + `env(safe-area-inset-bottom)`, `--color-surface-base` bg, `--color-border` top border
  - Four items: FIND / COLLECT / GIFT / CART (Barlow Condensed SemiBold, `--text-body-sm`, uppercase)
- Nav drawer (hamburger): slides in from left, `--color-surface-base` bg, contains full navigation hierarchy per ui-system.md Section 3A.2

**Tablet / Desktop (768px+):**
- Fixed header: 64px height, `--color-surface-base` bg
- Logo: TPL wordmark (left), `--color-text-primary`
- Horizontal nav: Find (with dropdown) | Collect | Gift | Artists — right-aligned, `--font-heading`, `--weight-semibold`, uppercase
- Cart icon: far right, 24px
- Bottom bar: hidden on desktop

**Accessibility & behavior:**
- Mobile drawer: `aria-hidden="true"` when closed, dismisses on outside click or "Escape" key
- Cart badge: `aria-label="[n] items in cart"`
- Active nav link: `aria-current="page"`, `--color-accent-primary` underline

---

### Section 2: Opinion Wall (Full-viewport, text-only, above fold)

**This section replaces the hero image. There are no image requests above the fold. The LCP element is text.**

**Component:** `tpl-opinion-wall` — see ui-system.md Section 3C.1 and technical-implementation-plan.md Section 4.2.1 for full CSS and Liquid implementation.

**All breakpoints (mobile-first, scales naturally):**
- Height: `100svh` (full viewport, correct for iOS browser chrome)
- Background: `--color-surface-base` (cream #F5F0EB) — the canvas
- The Opinion Wall inner container fills the viewport with 6–8 opinion phrases at varying sizes and opacities
- Opinion phrases (content managed in Fynd theme editor):
  - Primary (xl, 100% opacity): "BULLSHIT REMOVER", "SELECTIVE LISTENER"
  - Supporting (lg/md, 55% opacity): "enjoy the SHITSHOW", "YOUR CARD HAS A PERSONALITY", "no meetings before coffee"
  - Background texture (sm, 22% opacity): "IDIOT REPELLENT", "straight outta f#_ks", "NO FILTER"
- Stagger: deterministic nth-child rotation (max ±4 degrees) and vertical offsets — same build = same layout every time
- Tagline (not aria-hidden, this is the primary message): "small objects. big opinions." — Inter Regular, bottom-center, `--color-text-secondary`
- Scroll indicator: small downward chevron, `--color-text-secondary`, 40% opacity, bottom-center
- Skip link: `<a href="#first-product-section">Skip to products</a>` — visible on keyboard focus, off-screen at rest. `--color-accent-secondary` (yellow) bg, `--color-text-on-accent` text.

**Mobile behavior:** Reduce to 6 phrases maximum (hide 2 via CSS `display: none` on nth-child). Rotation reduced to ±2 degrees for readability on 320px viewport.

**All phrase spans:** `aria-hidden="true"` on the inner container — decorative text, not product content. Section has `aria-label="Homepage — brand statement"` `role="region"`.

**Conversion mechanic:** The brand statement is the brand. The opinion phrases are product names. The user immediately understands what kind of brand this is — before seeing any product. This pre-qualifies intent and makes the scroll to products meaningful.

**Copy source:** Opinion phrases are drawn from real product names and brand statements. Dan populates via Fynd theme editor. Joanna provides the phrase list per copy-system.md voice rules.

**No CTA button in this section.** The entry experience is brand immersion, not conversion. The scroll-to-products chevron is the only action prompt.

---

### Section 2A: Record Store Browse (horizontal scroll, below Opinion Wall)

**Component:** Record Store Browse — see ui-system.md Section 3C.3 and technical-implementation-plan.md Section 4.2.3.

**Position:** Immediately below the Opinion Wall section. This is the first content the user sees after scrolling past the brand entry. It functions as a collection index without using a grid.

**All breakpoints:**
- Full-bleed horizontal scroll container, `--color-surface-base` bg
- Padding above: `var(--space-6)` (24px) — tight gap from Opinion Wall
- Each card: `width: 85vw; flex-shrink: 0; scroll-snap-align: start;`
- Card background: `--color-surface-dark` (#1A1A1A) — the dark surface is intentional here. The contrast between the cream page and these dark cards creates the "record bin" depth.
- Card height: 260px mobile, 320px desktop
- Collection name: `font-size: clamp(2rem, 18vw, 7rem)` — cream text on dark card, Barlow Condensed Bold, uppercase, line-height 0.9
- Product count: Space Mono, 12px, cream at 60% opacity, bottom-left of card
- Arrow indicator: small chevron, cream at 40% opacity, right edge of card

**Collections displayed (in order):**
1. YOUR CARD HAS A PERSONALITY → `/collections/your-card-has-a-personality/`
2. NO FILTER → `/collections/no-filter/`
3. BEST SELLERS → `/collections/best-sellers/`
4. THE DROP → `/collections/the-drop/`

**Scroll behavior:** `scroll-snap-type: x mandatory`, `-webkit-overflow-scrolling: touch`. No scrollbar visible. No JS needed for basic functionality.

**Accessibility:** `role="region"` `aria-label="Browse collections"`. Each card is an `<a>` with `aria-label="Browse [Collection Name]"`.

**Conversion mechanic:** The user lands after Opinion Wall, scrolls, and immediately sees collections framed as large-type destinations. The card-as-destination approach is more engaging than a dropdown nav. Natural next action: tap a card and enter the collection.

---

### id="first-product-section"

This `id` is the skip link target from the Opinion Wall. It should be applied to the next section heading (`<h2 id="first-product-section">`) so keyboard and screen reader users land at the right place.

---

### Section 3: Featured Collection A — "Your Card Has a Personality"

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` (cream) bg, padding `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) left/right
- Header row:
  - Left: "YOUR CARD HAS A PERSONALITY" (Barlow Condensed, `--text-h3`, 20px, all caps, `--weight-bold`, `--color-text-primary`)
  - Right: "VIEW ALL" (Inter, `--text-body-sm`, 13px, `--color-accent-primary` red, right-aligned, → arrow icon 12px)
  - Full-width link wrapping both (underline only on right side on hover)
- Space: `--space-stack-lg` (32px) below header
- Product grid: `.grid-2` (2 columns)
- Product cards: 4 cards shown (2×2)
  - Each card: product-card component from ui-system.md (standard variant)
  - Height: auto (image aspect 1:1, 160px×160px image on mobile)
  - Shadow: `var(--shadow-product)` — always on, creates "placed on surface" depth against cream background
  - Image: product shot on neutral cream or white surface, 160px×160px WebP/JPEG (lazy-loaded except first card: `loading="eager"` `fetchpriority="high"`)
  - Product name: Barlow Condensed, `--text-body-sm` (13px), `--weight-semibold`, `--color-text-primary`, 2-line max
  - Product type label: Inter, `--text-caption` (11px), `--color-text-secondary` gray, "Card sticker – half card" or "Card sticker – full card"
  - Artist attribution: Space Mono, `--text-caption` (11px), `--color-text-secondary`, "by [ARTIST NAME]"
  - Price: `--text-price` (16px), Inter, `--weight-semibold`, `--color-text-primary`, "₹249" or "₹199" (pricing per Patrick's framework)
  - Badge (if applicable): "ONLY AT TPL" red badge on card sticker products, positioned top-right of image
  - Quick-add button: "ADD" (full-width below image on mobile, primary button style, `--color-accent-primary` bg, white text, 40px height)
- Spacing between cards: `--space-3` (12px) gap

**Tablet (768px–1023px):**
- Padding: `--space-section` (48px) all sides
- Grid: `.grid-3` (3 columns)
- Product card image size: 200px×200px
- Product grid visible: 6 cards (2×3)
- "VIEW ALL" link: right-aligned, same style

**Desktop (1024px+):**
- Grid: `.grid-4` (4 columns)
- Product card image size: 240px×240px
- Product grid visible: 8 cards (2×4)
- Left padding: 64px, right padding: 64px

**Interaction & behavior:**
- Quick-add button on mobile: always visible below image
- Quick-add button on desktop: opacity 0 by default, opacity 1 on card hover, 200ms fade-in
- Card click: links to PDP
- Quick-add click: opens mini cart drawer (see section: Cart Drawer behavior)
- Sold-out product: Quick-add button disabled (`aria-disabled="true"`), text changes to "SOLD OUT" in gray

**Conversion mechanic:**
- Visibility of bundles in the product grid (if any card sticker bundle exists) as a 2-column spanning card with clear ₹399-₹499 price
- "VIEW ALL" leads to the full card stickers collection page (/collections/your-card-has-a-personality) where the ₹499 "Opinion Starter Pack" bundle is featured prominently
- Average order from this section targets ₹249–₹399 (single card + impulse add)

**Copy notes:** Product names are sharp and opinion-forward (per copy-system.md, Rule 4: name the person). Example: "For the Person Who Reads the Menu Twice" (card sticker) not "Thoughtful Eater Card Sticker."

---

### Section 4: Featured Collection B — "No Filter"

**Same layout as Section 3, but for the No Filter / Attitude / Humor collection.**

**Mobile:**
- Section background: `--color-surface-raised` (slightly darker cream, `#EDE8E3`) — subtle alternation from Section 3 creates visual rhythm without a hard color break
- Header: "NO FILTER" (Barlow Condensed, `--text-h3`, 20px, all caps, `--color-text-primary`)
- Grid: `.grid-2` (4 products visible, 2×2)
- Product cards: keychains, pins, stickers from No Filter collection. Standard card variant with `--shadow-product`.
- "VIEW ALL" link leads to /collections/no-filter

**Desktop:**
- Grid: `.grid-4` (8 products visible)
- Product cards: 240px×240px images

**Conversion mechanic:**
- This collection skews slightly higher-price (pins at ₹249, keychains at ₹299)
- Bundle visibility here should highlight ₹299-₹349 price anchors or 2-product bundles
- Intent: move a user from "I like one product" to "I can make a set for ₹499"

---

### Section 5: Opinion Bar (Full-bleed, accent background)

**Purpose:** Brand voice moment. Reinforce positioning. Create a memorable quote that is share-worthy.

**Mobile (320px–767px):**
- Full-bleed background: `--color-accent-secondary` (electric yellow #F2D024)
- Padding: `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) left/right
- Text: "SMALL OBJECTS DON'T HAVE TO HAVE SMALL OPINIONS" (or similar, per Joanna)
- Typography: Barlow Condensed, `--text-h3` (20px), `--weight-bold`, all caps, `--color-text-on-accent` (dark #1A1A1A text on yellow bg for contrast), `--tracking-tight`
- Alignment: center, 2–3 lines max
- No CTA button; this is a statement, not a conversion moment

**Tablet (768px+):**
- Padding: `--space-section` all sides
- Typography: `--text-h2` scale (28px on tablet, 40px on desktop)
- Alignment: center

**Accessibility:**
- Contrast check: yellow bg (#F2D024) + dark text (#1A1A1A) must meet WCAG AA for large text (already does per Sean's system review)

**Conversion mechanic:** Psychological anchor. After seeing two product collections, this section reminds the user why the brand matters. Not directly pushing purchase, but reinforcing brand fit before the next CTA.

---

### Section 6: Trust Block (Call-out section, no bg color change)

**Purpose:** Address zero-reviews problem. Use design and copy to build confidence in new customer.

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` bg, padding `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- 3-column layout (vertical stack on mobile, horizontal on desktop)
- Heading (optional): "Why We Matter" or similar (Barlow Condensed, `--text-h4` 18px, all caps, `--weight-bold`)
- Space: `--space-stack-lg` (32px) below heading

**Three trust signals (each is a card):**

**Signal 1: Artist-Made**
- Icon: 24px SVG (paintbrush or artist silhouette in `--color-accent-primary` red)
- Heading: "Artist-Made" (Inter, `--text-body-sm` 13px, `--weight-semibold`, `--color-text-primary`)
- Copy: "Every design by independent creators. Not mass-produced. Sourced from Bengaluru." (Inter, `--text-caption` 11px, `--color-text-secondary`, line-height `--leading-caption`, max-width 160px)
- Card background: transparent (no box shadow per ui-system.md rules; contrast comes from typography)
- Spacing below: `--space-stack-md` (16px)

**Signal 2: Satisfaction Guarantee**
- Icon: 24px SVG (checkmark or shield in red)
- Heading: "7-Day Returns" (Inter, `--text-body-sm`)
- Copy: "Not your vibe? Full refund, no questions. Even if you just changed your mind." (max 160px)

**Signal 3: Fast Shipping**
- Icon: 24px SVG (truck or arrow in red)
- Heading: "2–4 Days" (Inter, `--text-body-sm`)
- Copy: "Shipped via Shiprocket. Track in real-time. Free shipping over ₹499." (max 160px)

**Tablet (768px–1023px):**
- Horizontal flex layout, 3 columns
- Cards side-by-side, `--space-stack-md` (16px) gap
- Icons: 32px
- Copy width: unconstrained (natural flex)

**Desktop (1024px+):**
- Same 3-column, wider padding

**Interaction:** No interaction. Static content. Icons + text only.

**Conversion mechanic:** Reduces friction for first-time buyer. Specifically calls out "7-Day Returns" (confidence) and "Free shipping over ₹499" (AOV anchor).

---

### Section 7: Gift Hub Call-Out

**Purpose:** Secondary audience (the gifter) sees a reason to explore /gifts/ instead of just buying for themselves.

**Mobile (320px–767px):**
- Background: `--color-surface-dark` (#1A1A1A) — this is one of the legitimate uses of the dark surface. The dark block creates a strong visual break in the cream page, signaling a shift in register. It functions like the opinion bar — a deliberate punctuation mark.
- Padding: `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- Heading: "GIFTING MADE EASY" (Barlow Condensed, `--text-h3` 20px, all caps, `--weight-bold`, `--color-text-on-dark`)
- Subheading: "Find the right thing for the person who's impossible to shop for." (Inter, `--text-body` 15px, `--color-text-on-dark` at 70% opacity, 2 lines max, margin-top `--space-stack-md`)
- CTA button: "EXPLORE GIFTS" (primary button, `--color-accent-secondary` yellow bg, `--color-text-on-accent` dark text, 48px height, full-width minus padding — yellow on dark creates strong visual pull)
- No product grid here; this is pure navigation + conviction

**Tablet (768px+):**
- Padding: `--space-section` all sides
- Button width: 220px, left-aligned (not full width)

**Desktop:**
- Same as tablet

**Interaction:**
- Button click: leads to /gifts/ hub page
- Button hover: `--color-accent-secondary` (yellow) outline, no fill change (primary button hover treatment: scale 1.02 at 100ms, from ui-system.md)

**Conversion mechanic:**
- Gifters are 20–30% of TPL's customer base (Weiss). This section intercepts the self-buyer who has a gifter friend and makes the transition easy.
- Copy uses "impossible to shop for" (customer language from copy-system.md) to create resonance
- ₹399–₹699 bundles are the gifter's sweet spot (above ₹499 threshold, so free shipping applies)

---

### Section 8: Best Sellers / Best Rated

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` bg, padding `--space-section` top/bottom
- Heading: "BEST SELLERS" (Barlow Condensed, `--text-h3`, all caps)
- Space: `--space-stack-lg` (32px)
- Product grid: `.grid-2` (2 columns, 4–6 products visible)
- Product cards: same variant as Sections 3 & 4
- Image size: 160px×160px
- "VIEW ALL" link: top-right, leads to /collections/best-sellers

**Tablet (768px+):**
- Grid: `.grid-3` (6 products visible)
- Image size: 200px×200px

**Desktop:**
- Grid: `.grid-4` (8 products visible)
- Image size: 240px×240px

**Product selection:** Tobi / Andy's build team will populate this based on historical sales data (not available at design time). Rule: no more than 2 products from same collection, mix of formats (cards, pins, keychains).

**Conversion mechanic:** Social proof substitute. "Best Sellers" creates urgency without needing reviews. Text overlay: optional small red badge "POPULAR" on 1–2 cards (not all).

---

### Section 9: Footer

**Mobile (320px–767px):**
- Background: `--color-surface-raised` (#2D2D2D)
- Padding: `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- Vertical stack of footer sections:
  - Email signup (optional on homepage, encouraged on other pages)
  - Social links row: Instagram, YouTube, WhatsApp icons (24px SVG, `--color-text-primary`, left-aligned, `--space-stack-sm` gap between icons)
  - Footer nav links (4 columns of links, each column stacked vertically):
    - Column 1: About | Artists | Contact
    - Column 2: Shipping | Returns | FAQ
    - Column 3: Sell Your Art | Privacy | Terms
    - Column 4: Instagram | YouTube | WhatsApp
  - Copyright: "© 2026 The Product Lab. All rights reserved." (Inter, `--text-caption`, `--color-text-secondary`)
- Link styling: Inter, `--text-body-sm` (13px), `--color-text-primary`, no underline on default, underline on hover (`--color-accent-primary`)

**Tablet (768px+):**
- Horizontal 2-3 column layout instead of vertical stack
- Left column: Email signup + social icons
- Middle columns: footer nav
- Right column: copyright

**Desktop:**
- Full-width layout, 4 columns of footer nav side-by-side
- Same link styling

**Email signup (if present on homepage):**
- Label: "STAY IN THE LOOP" (Barlow Condensed, `--text-body`, all caps)
- Input field: email address, placeholder "your@email.com" (Inter, `--text-body`)
- Input styling: `--color-surface-base` bg, `--color-border` border (1px), `--radius-sm` radius, 40px height, `--space-inset-md` padding
- Button: "SUBSCRIBE" (primary button, red, 40px height, right of input on desktop, below on mobile)
- Validation: error state = red border + error message in red text below field ("Please enter a valid email")
- Success state: green checkmark, message "Check your inbox for a welcome offer" (green `--color-success` text)

**Accessibility:**
- Footer links: `<a>` tags with clear text (not icon-only)
- Email input: `<label>` + `<input type="email">` with proper association
- Social icons: `aria-label="Follow on Instagram"`, etc.

---

## Page 2: Collection Page (Example: "Your Card Has a Personality")

**Purpose:** Showcase full collection. Build context about why these products matter. Push toward ₹499 AOV via bundle calls-out and multi-item incentives.

**URL:** /collections/your-card-has-a-personality

**Target audience:** Primary is identity-driven 19–26-year-old who found TPL on Instagram, arrived via "Your Card Has a Personality" link from story or feed.

---

### Section 1: Navigation & Header (same as homepage Section 1)

---

### Section 2: Collection Header — Mood Wall (type-first, no hero image)

**Component:** Collection Header (type-only variant) — see ui-system.md Section 3A.10.

**The collection header is type. The header IS the hero. No image here.**

**Mobile (320px–767px):**
- Full-bleed background: `--color-surface-base` (cream #F5F0EB)
- Padding: `var(--space-6) var(--space-3)` (24px top/bottom, 12px sides)
- Collection name: "YOUR CARD HAS A PERSONALITY" rendered at `--text-opinion-xl` (18vw) — on a 375px device this is ~67px. The name intentionally overflows the container edge on at least one side (the overflow is clipped). This is the visual signature.
  - Font: Barlow Condensed Bold, uppercase, `--tracking-opinion` (-0.03em), `--leading-opinion` (0.92)
  - Color: `--color-text-primary` (#1A1A1A)
- Tagline (1–2 lines below name): "For the person who doesn't send boring greetings. Cards that say what you actually mean."
  - Font: Inter Regular, `--text-body`, `--color-text-secondary`, max-width 280px, line-height `--leading-normal`
  - Spacing from name: `--space-4` (16px)
- Metadata (optional): "20 designs · 2 formats" (Space Mono, `--text-caption`, `--color-text-secondary`, uppercase)
- No hero image. No image requests in this section.

**Tablet (768px+):**
- Padding: `var(--space-12) var(--space-8)` (48px top/bottom, 32px sides)
- Name: same 18vw — naturally larger at wider viewport

**Desktop (1024px+):**
- Padding: `var(--space-12) var(--space-12)`
- Name: 18vw — at 1280px this is ~230px type. It fills the frame. The overflow on one side is by design.

**Interaction:** Static header. No hover effects.

**Copy source:** Joanna to provide collection tagline per copy-system.md, Part 1 (Collection page header — opinionated, slightly conspiratorial, frames who this is for before showing products).

---

### Section 3: Collection Navigation Chips + Filter Bar

**Mobile (320px–767px):**
- Sticky bar below collection header, `--color-surface-base` (cream) bg, 1px `--color-border` bottom border, padding `--space-inset-md` (16px) on all sides
- Horizontal scroll container (overflow-x auto, no scrollbar visible on iOS)
- Filter chips displayed as inline buttons:
  - Chip 1: "ALL" (default selected state)
  - Chip 2: "HALF-CARD"
  - Chip 3: "FULL-CARD"
  - Chip 4: "UNDER ₹250"
  - Chip 5: "₹250–₹299"
  - Chip 6: "₹300+"
  - Chip 7: "BY [ARTIST NAME]" (repeated for each artist in collection)
- Chip styling:
  - Selected: red (`--color-accent-primary`) background, white text, border-radius `--radius-sm`, height 32px, padding `--space-inset-sm` (12px) horizontal
  - Unselected: transparent bg, `--color-border` (1px) border, `--color-text-primary` text, same height/padding
  - Hover (unselected): `--color-accent-secondary` (yellow) border
  - Interaction: tap to toggle, `aria-pressed="true/false"`
- Close button (×): appears inside selected chip, `--space-2` (8px) left of text, same color as text, 16px icon
- Tap behavior: filter updates immediately, grid below re-renders, URL parameter added (example: ?format=half-card&price=under-250)

**Tablet (768px+):**
- Not sticky; stays at top of product grid
- Horizontal layout maintained (no sidebar filter per Kurt's decision)
- Chip spacing: `--space-stack-md` (16px) between chips

**Desktop (1024px+):**
- Same horizontal layout
- Left-aligned, full width of container

**Accessibility:**
- Chips: `role="button"`, `aria-pressed="true/false"`, keyboard navigable via Tab + Space / Enter
- Clear button: `aria-label="Clear [filter name] filter"`

**Conversion mechanic:**
- Price filters highlight ₹250–₹299 range (most popular, single-product purchases)
- Format filters allow users to focus on half-card if they want a slimmer gift option or full-card for bigger impact
- Artist filter (if available) creates loyalty moment — "I like this artist" leads to discovery of other collections

---

### Section 4: Product Grid — Sticker Wall Layout

**Component:** Sticker Wall Product Layout — see ui-system.md Section 3C.2 and technical-implementation-plan.md Section 4.2.2.

**This is not a standard CSS grid. It is the Sticker Wall.**

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` (cream) bg, padding `var(--space-3)` (12px) sides — tighter than standard, products feel close
- Grid: 2-column CSS grid with `gap: var(--space-2)` (8px)
- 20 products visible per page (load more: pagination button at bottom "LOAD MORE")
- Each product card sits in normal flow (not absolute positioned) but is rotated via `--tile-rotation` CSS custom property set by nth-child rules
- Rotation range: ±1.5 to ±2 degrees on mobile. Never exceeds ±3 degrees on any breakpoint.
- Vertical stagger: alternating `margin-top` via nth-child (0, 12px, 6px, 18px, 4px, 20px pattern — repeating)
- Shadow: `var(--shadow-product)` always on — the shadow against the cream surface creates the "placed on a surface" depth
- Product card specs:
  - Image: 160px×160px WebP, lazy-loaded except first 4 cards (`loading="eager"` `fetchpriority="high"` on row 1)
  - Product name: Barlow Condensed Bold, `--text-body-sm` (13px), uppercase, 2-line max, `--color-text-primary`
  - Type label: "Card sticker – half-card" (Inter, `--text-caption` 11px, `--color-text-secondary`)
  - Artist attribution: Space Mono, `--text-caption`, `--color-text-secondary`, "by [ARTIST]"
  - Price: Space Mono Bold, `--text-price` (16px), `--color-text-primary`
  - Badge: "ONLY AT TPL" (red) or "NEW" (yellow) on applicable cards — top-left of image
  - Quick-add button: "ADD" (primary, `--color-accent-primary` bg, 40px height, full-width of card, always visible on mobile)
- Pick Up hover interaction: on hover (desktop) or touch-start (mobile), card lifts — `transform: rotate(var(--tile-rotation)) translateY(-4px) scale(1.05)`, shadow deepens to `var(--shadow-product-hover)`, opinion text overlay fades in at 88% opacity cream. 150ms ease-out lift, 250ms ease-in settle.

**Tablet (768px+):**
- Grid: 3-column, `gap: var(--space-2)`
- Rotation: ±2 to ±3 degrees (slightly more visible at wider viewport)
- 24 products per page

**Desktop (1024px+):**
- Grid: 4-column, `gap: var(--space-2)`
- Rotation: ±1.5 to ±4 degrees
- 32 products per page
- Pick Up opinion overlay visible on hover (not on mobile)

**Pagination:**
- "LOAD MORE" button at bottom (full-width, secondary button style, outline, 48px height)
- Start with pagination button (simpler analytics). Upgrade to infinite scroll in Phase 5 if needed.

**Interaction & behavior:**
- Card click: navigates to PDP (/products/[product-slug])
- Quick-add click: opens cart drawer overlay
- Sold-out product: Quick-add disabled, text "SOLD OUT" in gray, card shadow reduced (opacity 0.6 on image)
- Filtering: grid re-renders with matching products, URL updates, scroll position reset to top of grid
- Loading state: skeleton loaders displayed while new grid loads — same rotation angles as live cards (prevents layout shift)

**Conversion mechanic:**
- Two-product bundles visible in grid as expanded cards (spanning 2 columns, see ui-system.md 3A.9) at positions 7, 15, 23
- Bundle card styling: `--color-surface-raised` bg, 1px `--color-accent-secondary` (yellow) border, "SAVE ₹X" callout — visually distinct from product cards
- Bundle visibility increases AOV from ₹249 (single) to ₹399 (bundle)

---

### Section 5: Related Bundle Call-Out (below fold, before footer)

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` (cream) bg, padding `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- Heading: "MAKE IT A SET" (Barlow Condensed, `--text-h3`, all caps, `--weight-bold`)
- Space: `--space-stack-lg` (32px)
- Featured bundle card: Opinion Starter Pack (₹499, 3–4 curated card stickers + bonus item if in budget)
  - Layout: image on left (200px×200px, 3-product collage), text on right
  - Mobile: vertical stack (image full-width above, text below, easier on small screens)
  - Bundle name: "OPINION STARTER PACK" (Barlow Condensed, `--text-h4` 18px, all caps)
  - Description: "All the cards you need to express yourself. Free shipping." (Inter, `--text-body` 15px, `--color-text-primary`)
  - Price: `--text-h4` (18px), `--weight-bold`, "₹499" in signal red
  - Savings badge: "SAVE ₹120" (small yellow `--color-accent-secondary` bg, `--color-text-on-accent` dark text)
  - CTA: "ADD TO CART" (primary button, red, 48px height, full-width)
- Card styling: `--color-surface-raised` bg (elevation effect), `--radius-sm`, no shadow per system rules

**Tablet (768px+):**
- Horizontal layout: image 240px×240px left, text right, padding between `--space-inset-lg`
- Button: 220px wide, left-aligned

**Desktop (1024px+):**
- Image: 280px×280px
- Same horizontal layout

**Interaction:**
- Bundle CTA click: opens cart drawer with bundle added
- Bundle image click: navigates to bundle detail page (/bundles/opinion-starter-pack) if deeper dive needed

**Copy source:** Joanna to provide bundle description per copy-system.md voice rules (short, forwarding-ready, names the person not the object).

**Conversion mechanic:**
- This section appears after user has scrolled through 20+ individual products
- ₹499 price point + "Free shipping" copy creates clear AOV anchor
- By this point, user is familiar with product quality, so pricing justification is simpler
- If user adds Opinion Starter Pack to cart, they hit ₹499 threshold immediately (free shipping acquired)

---

### Section 6: Footer (same as homepage Section 9)

---

## Page 3: Product Detail Page (PDP)

**Purpose:** Convert browsers to buyers. Build conviction through imagery, copy, and social proof (artist story, product details, cross-sell). Reduce friction by making add-to-cart obvious and prominent.

**URL:** /products/[product-slug] (example: /products/bullshit-remover-keychain)

---

### Section 1: Navigation & Header (sticky, same as homepage)

---

### Section 2: Product Hero (Image Gallery)

**Mobile (320px–767px):**
- Full-width image carousel, aspect ratio 1:1 (square)
- Primary image: 400px×400px, lazy-loaded with `loading="eager"`, `fetchpriority="high"` (above fold on mobile)
- Carousel controls: swipe left/right to navigate, dots at bottom (3–4 dots for 3–4 images), dot styling: 8px circles, `--color-text-secondary` default, `--color-accent-primary` for active dot
- Image captions (optional): small text below dots, "Product shot" | "Lifestyle context" | "Scale reference" (Inter, `--text-caption`, `--color-text-secondary`)
- Images required per ui-system.md: minimum 3 (hero, lifestyle, detail); scale reference strongly recommended
  - Hero: product on dark surface, directional light, product is brightest element
  - Lifestyle: close-up context (product in use, on jacket/keychain, etc.), tight crop, moody indoor light
  - Detail: macro shot of texture, enamel detail, text printing, etc. (shows quality)
  - Scale: ruler or known object (coin, lighter) next to product (builds confidence in size)

**Tablet (768px+):**
- Image carousel: 480px×480px
- Same swipe navigation, dots below

**Desktop (1024px+):**
- Split layout: image on left (600px×600px), product info on right
- Vertical thumbnail strip below main image: 4 thumbnails (80px×80px each), tap/click to swap primary image
- Main image: hover to zoom (2x magnification, panned by mouse position) OR no zoom (depends on image quality; let Tobi decide based on photo sharpness)

**Interaction & behavior:**
- Swipe: 200ms smooth transition between images
- Tap/click thumbnail: 200ms fade between images
- Zoom (desktop): hover reveals magnified view in overlay, cursor shows magnifying glass icon
- Loading: image loads with fade-in, 200ms duration

**Accessibility:**
- Images: descriptive alt text for each (example: "Bullshit Remover enamel keychain on dark concrete, directional lighting from left side")
- Carousel dots: `aria-label="Image 1 of 4"`, keyboard navigation Tab + arrow keys supported
- Carousel live region: `aria-live="polite"` announces image number on carousel navigation

---

### Section 3: Product Information (Right side on desktop, below hero on mobile)

**Mobile (320px–767px):**
- Padding: `--space-inset-lg` (24px) all sides
- Stacked vertical layout
- Product name: Barlow Condensed, `--text-h2` (24px), all caps, `--weight-bold`, `--color-text-primary`, 2-line max
  - Example: "BULLSHIT REMOVER"
- Product type: Inter, `--text-body-sm` (13px), `--color-text-secondary`, "Enamel keychain"
- Space: `--space-stack-md` (16px)
- Artist attribution: Space Mono, `--text-body-sm` (13px), `--color-text-secondary`, "by [ARTIST NAME]"
  - This is a link to /artists/[artist-slug] (underline on hover, `--color-accent-primary`)
- Space: `--space-stack-md` (16px)
- Price section:
  - Price display: `--text-h3` (20px), `--weight-semibold`, "₹249" in `--color-text-primary`
  - Prepaid incentive badge (if applicable): inline below price, "Save ₹30 with UPI prepaid" (yellow `--color-accent-secondary` bg, dark `--color-text-on-accent` text, `--radius-sm`, padding `--space-inset-sm`, `--text-body-sm` size)
  - Stock status (if low): inline, red `--color-accent-primary`, "Only 3 left in stock" (urgency signal)
- Space: `--space-stack-lg` (32px)
- Opinion statement: Barlow Condensed, `--text-h4` (18px), all caps, `--weight-semibold`, "FOR THE PERSON WHO HAS ALREADY WRITTEN OFF SMALL TALK AS A WASTE OF TIME" — this is the product's identity statement, not marketing fluff (per copy-system.md, Rule 4: name the person)
- Space: `--space-stack-md` (16px)
- Product description: Inter, `--text-body` (15px), `--color-text-primary`, 3–4 sentences max, line-height `--leading-normal`
  - Example for Bullshit Remover: "Gets straight to the point. 40mm enamel pin. Hard enamel, double-backed. Won't tarnish. Designed by [ARTIST NAME]. Made in Bengaluru."
  - Copy per copy-system.md, Part 2: conversational, concrete, concise. Specs second. Gets to "yes, that's me" first.
- Space: `--space-stack-md` (16px)
- Specs block (optional):
  - Material: Enamel, stainless steel clasp
  - Dimensions: 40mm × 25mm
  - Weight: 12g
  - Packaging: Black card insert, red sticker seal
  - Design: Original (not licensed)
  - Format: Barlow Condensed section header, `--text-body-sm` (13px), followed by bullet points in Inter, `--text-body-sm`, gray text

**Tablet (768px+):**
- Same layout but with more breathing room (padding `--space-section` 48px)

**Desktop (1024px+):**
- Fixed position on right side of hero image (sticky on scroll, max height 600px, scrolls internally if specs overflow)
- Padding: `--space-inset-lg` (24px) inside container
- Product name: `--text-h2` (40px)
- Price: `--text-h3` (28px)
- Opinion statement: `--text-h4` (20px)

---

### Section 4: Purchase Options

**Mobile (320px–767px):**
- Container: `--color-surface-base` bg, padding `--space-inset-lg` (24px), margin-top `--space-stack-lg` (32px)
- Heading: "ADD TO CART" (Barlow Condensed, `--text-body-sm` (13px), all caps, `--weight-semibold`, `--color-text-primary`)
- Space: `--space-stack-md` (16px)

**Variant selector (if applicable — e.g., card stickers have half-card / full-card):**
- Label: "SIZE" (Inter, `--text-body-sm` 13px, `--weight-semibold`)
- Options: 2 radio-style buttons, each 100% width, 44px height, `--color-surface-raised` bg, `--color-border` border (1px), `--radius-sm`
  - Option 1 text: "Half-card (₹199)" left-aligned, radio indicator on right
  - Option 2 text: "Full-card (₹249)" left-aligned, radio indicator on right
- Selected state: `--color-accent-primary` (red) bg, white text, radio filled
- Interaction: tap to select, `aria-checked="true/false"` role
- Update: price in Section 3 updates on variant selection (no page reload)

**Quantity selector:**
- Label: "QTY" (Inter, `--text-body-sm`)
- Control: minus button (−) | number input (default 1) | plus button (+)
  - Buttons: 40px height, `--color-surface-raised` bg, `--color-border` border, `--radius-sm`, Inter `--text-body` (15px)
  - Number input: 60px width, centered text, no arrows (custom spinner removed via CSS), same styling
  - Minus button: disabled when qty = 1, `--color-text-secondary` text when disabled, `cursor: not-allowed`
  - Plus button: disabled at stock maximum (if stock = 3, plus disables at qty = 3)
- Accessibility: `aria-label="Decrease quantity"` / `aria-label="Increase quantity"` on buttons

**Primary Add-to-Cart button:**
- Full-width, 56px height, `--color-accent-primary` (red) bg, white text
- Text: "ADD TO CART — ₹249" (price updates with variant selection)
- Font: Barlow Condensed, `--text-cta` (14px), `--weight-semibold`, all caps, `--tracking-wider`
- Hover: scale 1.02 (100ms ease-out), no color change
- Active/tap: scale 1.0, instant, then show loading spinner
- Loading state: spinner icon replaces text, button disabled, width unchanged (no collapse), 200ms
- Success state: green checkmark icon + "ADDED TO CART" text, 2-second pause, then resets to "ADD TO CART" state
- Error state: red outline, error message below button in red text ("Out of stock. Try another size.")
- Accessibility: `aria-busy="true"` during loading, `aria-label="Add [product name] to cart"`

**Space: `--space-stack-md` (16px)**

**Secondary actions (below primary button):**
- Wishlist button (optional): heart icon (24px), "ADD TO WISHLIST" text, secondary button style (outline), full-width, 44px height
  - State: unfilled heart (outline), "ADD TO WISHLIST" in primary text
  - Clicked state: filled heart, "IN WISHLIST" text, both in red `--color-accent-primary`
- Share button: 24px share icon, "SHARE" text, secondary button style, full-width, 44px height
  - Click behavior: share sheet (if on mobile) or copy product URL to clipboard (desktop) + toast notification "Link copied!"

**Tablet / Desktop:**
- Variant selector: horizontal 2-column layout (not stacked)
- Quantity selector: inline horizontal layout
- Primary button: 300px width, left-aligned (not full-width)
- Secondary buttons: side-by-side below primary, 48% width each with `--space-stack-sm` gap

**Conversion mechanic:**
- Variant pricing (₹199 vs ₹249) creates choice without complexity
- Primary button is impossible to miss — color, size, sticky position on scroll (see Section 5)
- "ADDED TO CART" confirmation is immediate (no page navigation required)
- Wishlist option for non-buyers (builds repeat visit pattern)

---

### Section 5: Sticky CTA Bar (mobile only, appears on scroll past main ATC button)

**Mobile (320px–767px):**
- Position: fixed bottom of screen, 60px height (accounting for browser chrome)
- Background: `--color-surface-raised` (#2D2D2D)
- Border-top: 1px `--color-border`
- Content: 2-column layout, centered vertically
  - Left (50% width): Product name + type (truncated to 1 line, Inter, `--text-body-sm`, `--color-text-primary`)
  - Right (50% width): "ADD TO CART — ₹249" button (same styling as Section 4, fitted to 50% width)
- Trigger: Intersection Observer watches main ATC button; when button leaves viewport (user scrolls down), sticky bar appears
- Animation: slide up from bottom, 200ms ease-out
- Dismissal: when user scrolls back to main ATC button, sticky bar slides out, 200ms

**Desktop:** Not displayed (main button is always in viewport in 2-column layout)

**Accessibility:**
- Bar has `aria-live="polite"` for screen readers
- Product name truncation: full name in `aria-label="Add [full name] to cart"`

**Conversion mechanic:** Keeps CTA visible even as user scrolls through lifestyle images, specs, and cross-sell. Removes friction of scrolling back up to add to cart.

---

### Section 6: Payment Information (Cart Drawer, see separate section below)

When user clicks "ADD TO CART," a slide-out drawer appears from right side with: cart contents, quantity adjustment, cart total, and checkout CTA. See "Cart Drawer Specification" section later in this document.

---

### Section 7: Shipping & Returns Info (below fold)

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` bg, padding `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- 2 tabs (or accordion on very small screens):
  - Tab 1: "SHIPPING" (active by default)
  - Tab 2: "RETURNS"
- Tab styling: Barlow Condensed, `--text-body-sm` (13px), all caps, `--weight-semibold`, underline on active tab in red
- Content: Inter, `--text-body` (15px), `--color-text-primary`, line-height `--leading-normal`
- SHIPPING tab content:
  - "Ships within 2–4 days via Shiprocket. Free shipping on orders over ₹499. Standard shipping ₹49 under ₹499."
  - "Track your order anytime at theproductlab.in/track. No login required."
  - "COD available on all orders."
- RETURNS tab content:
  - "Not happy? Full refund within 7 days of delivery, no questions asked."
  - "Damaged in shipping? We'll send a replacement immediately."
  - "Return shipping is covered by us."
- Link styling: `--color-accent-primary` underline, on hover or click leads to full policy page (/shipping-policy, /returns)

**Tablet / Desktop:**
- 2-column layout: left tab nav, right content panel
- Tab nav: vertical stack, padding `--space-inset-lg`, each tab full-width (min-width 150px), border-right on active tab in red

**Accessibility:**
- Tabs: `role="tab"`, `aria-selected="true/false"`, `aria-controls="shipping-panel"` / `aria-controls="returns-panel"`
- Content panels: `role="tabpanel"`, `aria-labelledby="tab-shipping"`
- Keyboard navigation: Tab to focus tab, Left/Right arrows switch tabs

**Conversion mechanic:** Reduces friction by answering "How will this arrive?" and "What if I don't like it?" before checkout. COD mention is key for Indian market (40–60% of orders expected COD, per brand context).

---

### Section 8: Artist Story (optional, if artist data available)

**Mobile (320px–767px):**
- Full-bleed background: `--color-surface-raised` (#2D2D2D)
- Padding: `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- Heading: "MADE BY [ARTIST NAME]" (Barlow Condensed, `--text-h3` 20px, all caps, `--weight-bold`)
- Space: `--space-stack-md` (16px)
- Content:
  - Optional artist photo (100px×100px circle, image centered, aspect 1:1)
  - Artist bio (Inter, `--text-body` 15px, `--color-text-primary`, 3–4 sentences max)
  - Example: "Shreya is a printmaker and illustrator based in Bangalore. Her work explores humor and social commentary through enamel design. She's designed 8 pieces for TPL."
  - Link to artist spotlight page: "See all her work" (text link, `--color-accent-primary` underline, right-aligned)
- Space: `--space-stack-md` (16px)
- Social link (if available): Instagram icon (24px) + "Follow on Instagram" link, `--color-accent-primary`, underline on hover

**Tablet / Desktop:**
- Horizontal layout: artist photo (120px×120px) on left, bio + links on right, padding `--space-inset-lg` between
- Heading: same size

**Accessibility:**
- Artist photo: `alt="[Artist name], designer of this product"`
- Links: clear text labels, not just icons

**Conversion mechanic:** Builds artist story (emotional connection) and links to artist spotlight pages (community building, repeat visit pattern). Also supports the "Artist-Made" trust signal from homepage.

---

### Section 9: Cross-Sell / Related Products

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` bg, padding `--space-section` (48px) top/bottom
- Heading: "YOU MIGHT ALSO LIKE" (Barlow Condensed, `--text-h3` 20px, all caps)
- Space: `--space-stack-lg` (32px)
- Product grid: `.grid-2` (2 columns, 4 products visible)
- Product cards: same variant as collection pages (image, name, type, price, Quick-add button)
- Image size: 160px×160px
- Logic: show 2–4 related products based on:
  - Same collection (if applicable)
  - Same format (if applicable — e.g., other pins if current product is pin)
  - Different artist (to encourage discovery)
  - Similar price point (±₹50)

**Tablet (768px+):**
- Grid: `.grid-3` (3 columns, 6 products visible)
- Image size: 200px×200px

**Desktop (1024px+):**
- Grid: `.grid-4` (4 columns, 8 products visible)
- Image size: 240px×240px

**Interaction:** Same as collection page product cards (click to navigate PDP, Quick-add to add to cart drawer).

**Conversion mechanic:** Average order value. If user is buying a ₹249 keychain, showing 2–3 related ₹199 stickers can nudge them toward ₹499 bundle threshold.

---

### Section 10: Footer (same as homepage)

---

## Page 4: Cart Drawer (Slide-out overlay)

**Purpose:** Minimize friction during checkout. Show cart contents, allow quick modifications, and push toward checkout without leaving the product browsing experience.

**Trigger:** User clicks "ADD TO CART" button on any page (PDP, collection, homepage). Drawer slides in from right edge.

---

### Section 1: Header

**Mobile / All screens:**
- Height: 56px
- Background: `--color-surface-base` (cream)
- Border-bottom: 1px `--color-border`
- Left: Close button (×, 24px icon, `--color-text-primary`, tap to close drawer)
- Center: "YOUR CART" (Barlow Condensed, `--text-h4` 18px, all caps, `--weight-bold`, `--color-text-primary`)
- Right: Item count badge (optional, small red circle with white number, 20px h×w, "2" for 2 items)

---

### Section 2: Cart Contents (Scrollable)

**Layout:** Vertical stack of cart item cards, padding `--space-inset-lg` (24px) sides, `--space-stack-md` (16px) between items

**Per-item card:**
- Horizontal layout: image left (80px×80px), details right
- Image: product thumbnail, dark-bg product shot, 80px square, rounded `--radius-sm`, no zoom on hover
- Details (right side):
  - Product name: Barlow Condensed, `--text-body-sm` (13px), `--weight-semibold`, 2-line max
  - Variant (if applicable): "Half-card" (Inter, `--text-caption` 11px, `--color-text-secondary`)
  - Price per unit: `--text-body` (15px), `--weight-semibold`, "₹199" in `--color-text-primary`
  - Quantity selector: minus/number/plus (same as PDP, but compact — 32px height buttons)
  - Line total: "₹199 × 1 = ₹199" (Inter, `--text-body-sm`, gray text, right-aligned)
  - Remove button: small × icon (16px), opacity 0.6 by default, opacity 1 on hover, `cursor: pointer`, `aria-label="Remove [product name] from cart"`

**Behavior:**
- Quantity update: changes line total instantly (no API call delay visible; backend updates asynchronously)
- Remove: item card slides out (200ms), line total removed, cart summary re-calculates
- Empty state (if cart becomes empty): message "Your cart is empty." (Inter, `--text-body`, gray), "Continue Shopping" link (red underline)

**Accessibility:**
- Quantity buttons: `aria-label="Increase quantity of [product name]"`, etc.
- Remove button: `aria-label="Remove [product name] from cart"`

---

### Section 3: Cart Summary (Sticky at bottom of drawer)

**Height:** ~140px (adjusts if more lines needed)

**Background:** `--color-surface-raised` (slightly darker cream) with `--color-border` top (1px)

**Content (top to bottom):**

**Row 1: Subtotal**
- Left: "Subtotal" (Inter, `--text-body-sm`, `--color-text-secondary`)
- Right: "₹249" (Inter, `--text-body`, `--weight-semibold`, `--color-text-primary`)

**Row 2: Shipping**
- Left: "Shipping" (Inter, `--text-body-sm`, gray)
- Right: Conditional display:
  - If subtotal < ₹499: "₹49" (red `--color-accent-primary` text, create urgency)
    - Below line 2: small text in gray "FREE SHIPPING AT ₹499" (creates incentive)
  - If subtotal ≥ ₹499: "FREE" (green `--color-success` text)

**Row 3: Promo Code (optional, collapsed by default)**
- Text: "Add promo code" (Inter, `--text-body-sm`, `--color-accent-primary` underline, tap to expand)
- Expanded state: small input field appears below row 2, "Promo code" placeholder, 40px height, `--radius-sm`
  - Button: "APPLY" (primary, 40px height, right of input)
  - Behavior: on apply, discount line appears above "Total"

**Row 4: Discount (if promo applied)**
- Left: "Discount" (Inter, `--text-body-sm`, green `--color-success` text)
- Right: "−₹30" (green text, same size)

**Row 5: Total**
- Left: "TOTAL" (Barlow Condensed, `--text-h4` 18px, all caps, `--weight-bold`, `--color-text-primary`)
- Right: "₹268" (same typography, `--text-h4`, `--color-accent-primary` red text, no underline; this is data, not a link)
- Background of this row: 1px `--color-border` top border to visually separate from other rows. No color fill change.

**Padding:** `--space-inset-lg` (24px) horizontal, `--space-stack-md` (16px) vertical between rows

---

### Section 4: Checkout Button (Full-width, bottom of drawer)

**Height:** 56px

**Button:** "PROCEED TO CHECKOUT" (Barlow Condensed, `--text-cta` 14px, all caps, `--weight-bold`, `--color-accent-primary` red bg, white text, full-width)

**Behavior:**
- Tap/click: navigate to /checkout (see Checkout section below)
- Hover: scale 1.02, 100ms
- Disabled state: if cart is empty, button is disabled (`opacity 0.5`, `cursor: not-allowed`)

**Accessibility:** `aria-label="Proceed to checkout with [n] items"`

**Conversion mechanic:** Clear, unavoidable. No navigation clutter. One action: go to checkout.

---

### Section 5: Drawer Overlay Behavior

**Mobile/All screens:**
- Drawer slides in from right, 300ms ease-out
- Drawer width: 100% on mobile (full screen), 400px on tablet+
- Background overlay: semi-transparent dark (`rgba(0, 0, 0, 0.4)`), tap to close
- Dismiss: close button (×) at top, background overlay tap, or "Escape" key
- Scroll: cart contents scroll internally, summary + checkout button remain sticky at bottom
- No bounce or elastic scroll; uses `overflow-y: auto` with smooth scrolling
- Z-index: 1000 (above all page content except modals)

---

## Page 5: Gifting Hub (/gifts/)

**Purpose:** Acquire the gifter customer (20–30% of target). Frame collections and bundles around recipient personality, not product type.

**Target breakpoints:** Same mobile-first as other pages (320px–1024px+).

---

### Section 1: Navigation & Header (sticky, same as other pages)

---

### Section 2: Hub Hero / Page Header

**Mobile (320px–767px):**
- Full-bleed background: `--color-surface-raised` (slightly darker cream, `#EDE8E3`) — subtle elevation from the base cream, keeps the gifting context warm and approachable
- Padding: `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- Heading: "GIFTING MADE EASY" (Barlow Condensed, `--text-h1` 32px, all caps, `--weight-bold`)
- Subheading: "Find the right thing for the person who's impossible to shop for. Our curated gifts do the work." (Inter, `--text-body` 15px, `--color-text-primary`, line-height `--leading-normal`, 3-line max)
- CTA (optional): "SHOP BY PERSONALITY" button (secondary button, outline style, 48px height)

**Tablet / Desktop:**
- Padding: `--space-section` all sides
- Heading: `--text-h1` 56px
- Button (if used): 220px width, left-aligned

**Conversion mechanic:** Personality-based gifting is the hook (vs. product-based). Sets up the next section.

---

### Section 3: Gift Persona Cards (Grid)

**Purpose:** Let gifter self-identify the recipient, then show curated collections + bundles for that persona.

**Mobile (320px–767px):**
- Padding: `--space-inset-lg` (24px) sides
- Grid: `.grid-2` (2 columns, 4 personas visible)
- 4 persona cards at launch:
  1. "The Sarcastic One"
  2. "The Specific One" (detail-oriented, thoughtful)
  3. "The Impossible to Shop For" (standard)
  4. "First Job Gift" (career-specific)

**Per-card layout:**
- Image area (top, 160px×160px): curated collage of 3–4 product tiles (grid 2×2 on small cards) showing signature products from collections for that persona
- Text area (bottom):
  - Persona name: Barlow Condensed, `--text-h3` 18px, all caps, `--weight-bold`, `--color-text-primary`, 1 line
  - Description: Inter, `--text-body-sm` (13px), `--color-text-secondary`, 2-line max, example: "Sharp opinions. Doesn't suffer fools."
  - CTA: "VIEW GIFTS" (primary button, red, 40px height, full-width)
- Card background: `--color-surface-base` (cream #F5F0EB), `--shadow-product` — same surface as page, shadow creates separation
- Card spacing: `--space-3` (12px) gap

**Tablet (768px+):**
- Grid: `.grid-2` or `.grid-3` (depends on layout; 3 personas per row preferred)
- Image size: 200px×200px
- Card spans: full width, image left (200px) + text right

**Desktop (1024px+):**
- Grid: `.grid-4` (4 columns, all 4 personas visible in one row) OR split across 2 rows
- Image size: 240px×240px
- Text overlay: image with semi-transparent dark scrim (`rgba(26, 26, 26, 0.6)`), text positioned at bottom-left of card, absolute positioning

**Interaction:**
- Card click: navigates to /gifts/[persona-slug] (example: /gifts/for-the-sarcastic-one)
- Hover: card border changes to red underline (1px `--color-accent-primary`)

**Accessibility:**
- Card image: `alt="Gifts for [persona]: [products]"`
- "VIEW GIFTS" button: `aria-label="Browse gifts for [persona]"`

**Conversion mechanic:** Persona-based routing reduces decision fatigue. Gifter finds "The Sarcastic One," sees 8–12 curated products, sees 2–3 bundles pre-priced at ₹399–₹699. Checkout is clearer.

---

### Section 4: Bundle Spotlight (below fold)

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` bg, padding `--space-section` (48px) top/bottom
- Heading: "LAST-MINUTE GIFTS" (Barlow Condensed, `--text-h3`, all caps)
- Space: `--space-stack-lg` (32px)
- Horizontal scrolling bundle cards (overflow-x auto, no scrollbar):
  - 3 bundles visible at once: Birthday Box (₹699), Opinion Starter Pack (₹499), Two-Cards One Statement (₹399)
  - Each card: 150px width, vertical layout, image (120px×120px, collage top), text below
  - Bundle name: Barlow Condensed, `--text-body-sm` (13px), all caps
  - Price: `--text-body` (15px), `--weight-bold`
  - CTA: "ADD" button (primary, 32px height, full-width of card)
- Non-mobile scrolling indicator: small dots at bottom (1 dot per bundle visible off-screen)

**Tablet / Desktop:**
- Grid layout instead of scroll: `.grid-2` (2 columns) or `.grid-3` (3 columns)
- Card size: 200px wide
- Full product display (not compact)

**Conversion mechanic:** Bundles reduce decision time. Pre-curated = trust. Bundles all above ₹399, which is meaningful AOV for gifter context.

---

### Section 5: Footer (same as other pages)

---

## Page 6: About Page

**Purpose:** Tell brand story. Highlight artist partnership model. Build cultural credibility (Bengaluru-based, independent).

---

### Section 1: Navigation & Header (sticky, same)

---

### Section 2: Brand Story Hero

**Mobile (320px–767px):**
- Full-bleed background: `--color-surface-base` (cream #F5F0EB)
- Padding: `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- Heading: "SMALL OBJECTS. BIG OPINIONS." at `--text-opinion-lg` (14vw) — the brand statement at its full scale. Off-black on cream. This is the Opinion Wall principle applied to the About page.
- Subheading (1–2 paragraphs): Brand origin story in conversational tone, 3–4 sentences max (Inter, `--text-body` 15px, `--color-text-primary`, line-height `--leading-normal`)
  - Example: "The Product Lab started because we believed that the things you own should say what you think. Not generic. Not decorative. Just honest. We work with independent artists across India to bring their ideas to life as keychains, pins, and stickers. Every product has a creator. Every creator has a story."
- Copy source: Joanna to draft per copy-system.md voice (conversational, direct, no corporate-speak)

**Tablet / Desktop:**
- Padding: `--space-section` all sides
- Heading: `--text-h1` 56px
- Subheading: two-column layout (image left 300px, text right)

---

### Section 3: Artist Model Explainer

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` bg, padding `--space-section` (48px) top/bottom
- Heading: "HOW WE WORK WITH ARTISTS" (Barlow Condensed, `--text-h3`, all caps)
- Space: `--space-stack-lg` (32px)
- 3-column vertical stack:
  - Column 1: Icon (24px, paintbrush in red), Heading "Discover", Description "We find amazing artists making work that matters." (Inter, `--text-body-sm`, 3-line max)
  - Column 2: Icon (24px, handshake in red), Heading "Partner", Description "We collaborate to bring their vision to life. They keep the majority of profits."
  - Column 3: Icon (24px, star in red), Heading "Celebrate", Description "Every product credits the artist. Community sees the work. Creators get rewarded."
- Spacing: `--space-stack-md` (16px) between columns
- No card background; just text + icon (minimalist)

**Tablet / Desktop:**
- Horizontal 3-column layout side-by-side
- Icons: 32px
- Descriptions: natural width, centered alignment

---

### Section 4: Founding Team / People

**Mobile (320px–767px):**
- Contained section, `--color-surface-raised` (#2D2D2D) bg, padding `--space-section` (48px) top/bottom
- Heading: "MADE IN BENGALURU" (Barlow Condensed, `--text-h3`, all caps)
- Space: `--space-stack-lg` (32px)
- 2-column grid of people cards:
  - Each card: image (120px×120px circle, centered, aspect 1:1), name (Barlow Condensed, `--text-body-sm`, all caps), title (Inter, `--text-caption`, gray)
  - Optional: 1-line bio (Inter, `--text-caption`, gray, centered under title)
  - Card background: transparent
  - Image: portrait photo, fallback solid red circle + initials if photo unavailable
- Data: 2–4 founding team members (Dan + core collaborators)
- Space: `--space-stack-md` (16px) between cards

**Tablet / Desktop:**
- Horizontal 2–3 column layout
- Image size: 160px×160px circle

**Accessibility:**
- Images: `alt="[Name], [Title]"`

---

### Section 5: Artist Spotlight Grid

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` bg, padding `--space-section` (48px) top/bottom
- Heading: "FEATURED ARTISTS" (Barlow Condensed, `--text-h3`, all caps)
- Space: `--space-stack-lg` (32px)
- Grid: `.grid-2` (2 columns, 4 artists visible)
- Per-artist card:
  - Image: 160px×160px square, artist portfolio photo or studio shot (dark, moody lighting matching brand)
  - Name: Barlow Condensed, `--text-body` (15px), `--weight-semibold`, centered below image
  - City: Inter, `--text-caption` (11px), gray, centered
  - 1-line bio (optional): "Makes bold graphic designs" (gray, centered, 2-line max)
  - CTA: "VIEW WORK" link (small text, red underline, centered below)
- Card click: navigates to /artists/[artist-slug]
- Card spacing: `--space-3` (12px) gap

**Tablet (768px+):**
- Grid: `.grid-3` (6 artists visible)
- Image size: 200px×200px

**Desktop (1024px+):**
- Grid: `.grid-4` (8 artists visible)
- Image size: 240px×240px

**Conversion mechanic:** Artist spotlight drives traffic to individual artist pages, builds community, encourages repeat visits ("I want to see what [artist] designs next").

---

### Section 6: Values / Mission Statement (optional)

**Mobile (320px–767px):**
- Full-bleed background: `--color-accent-secondary` (electric yellow #F2D024)
- Padding: `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- Single centered statement: "We believe that the things you own should reflect who you are. No compromise. No committees. No BS." (Barlow Condensed, `--text-h2` 28px, all caps, `--weight-bold`, `--color-text-on-accent` dark text, center-aligned, 4-line max)
- No CTA button; this is a values moment

**Desktop:**
- Padding: `--space-section` all sides
- Heading: 40px

---

### Section 7: FAQ Section

**Mobile (320px–767px):**
- Contained section, `--color-surface-base` bg, padding `--space-section` (48px) top/bottom
- Heading: "QUESTIONS?" (Barlow Condensed, `--text-h3`, all caps)
- Link: "Browse our FAQ" (text link, red underline, right-aligned) → leads to /faq
- Space: `--space-stack-lg` (32px)
- Expandable accordion (3–4 items visible at launch):
  - Item 1: "How do you source artists?" (summary, Barlow Condensed, `--text-body-sm`, all caps)
    - Expanded content: "We actively reach out to independent designers and artists whose work aligns with our values. If you want to collaborate, email us at hello@theproductlab.in." (Inter, `--text-body`, gray)
  - Item 2: "Do you do custom designs?"
    - Content: "At launch, we're focused on our core collection. We'll explore custom design options in the future. Reach out if you have a project in mind."
  - Item 3: "Can I wholesale TPL products?"
    - Content: "Yes. Email partnership@theproductlab.in with your volume and retail space details."
  - Item 4: "How do I collaborate with TPL?"
    - Content: "Artists, creators, and partners: hello@theproductlab.in. Agencies and press: press@theproductlab.in."
- Accordion behavior:
  - One item open at a time (not multi-expand)
  - Click summary to expand/collapse
  - Animation: 200ms slide-down / slide-up
  - Icon: small chevron (↓/↑) on right side of summary, rotates 180° on toggle

**Tablet / Desktop:**
- Same accordion layout, wider padding

**Accessibility:**
- Summary: `role="button"`, `aria-expanded="true/false"`, `aria-controls="faq-item-1-content"`
- Keyboard: Tab to focus, Enter/Space to toggle

---

### Section 8: Email Signup / Newsletter

**Mobile (320px–767px):**
- Full-bleed background: `--color-surface-raised` (#2D2D2D)
- Padding: `--space-section` (48px) top/bottom, `--space-inset-lg` (24px) sides
- Heading: "STAY IN THE LOOP" (Barlow Condensed, `--text-h3`, all caps)
- Subheading: "We send occasional drops, artist spotlights, and honest opinions. No spam." (Inter, `--text-body-sm`, gray, 2-line max)
- Space: `--space-stack-md` (16px)
- Email input + subscribe button (same as homepage footer, see Section 9 Email signup)

**Tablet / Desktop:**
- Heading: `--text-h2`
- Input + button: side-by-side, input 300px wide

---

### Section 9: Footer (same as other pages)

---

## Page 7: Checkout Flow

**Purpose:** Minimal friction. Fast checkout. Clear trust signals (returns, shipping, artist story recap).

**Note:** Checkout is handled by Commerce.com (Fynd) platform. This spec defines the visual overlay and custom UI elements Dan may need to add in Fynd's template layer.

---

### Section 1: Checkout Header (sticky)

**All screens:**
- Height: 56px
- Background: `--color-surface-base` (cream), `--color-border` bottom border
- Left: "Back to cart" link (text + left arrow icon, `--color-accent-primary` red underline)
- Center: Checkout progress indicator (3 steps: Shipping → Payment → Confirmation)
  - Active step: text in red, bold
  - Completed step: checkmark icon + text in gray
  - Inactive step: text in gray, lighter weight
- Right: (empty, or optional: cart summary mini view "₹499 for 3 items")

---

### Section 2: Checkout Form (2-column layout on desktop, single column on mobile)

**Mobile / Tablet:**
- Full-width form, padding `--space-inset-lg` (24px) sides

**Desktop:**
- Left column (60%): form fields
- Right column (40%): order summary (sticky, follows scroll)

**Form sections:**

**Step 1: Shipping Address**
- Heading: "DELIVERY ADDRESS" (Barlow Condensed, `--text-h4`, all caps)
- Fields:
  - Full name: `<input type="text">`, placeholder "Your name", 40px height, full-width, `--radius-sm`
  - Phone number: `<input type="tel">`, placeholder "10-digit mobile (no country code)", 40px height, full-width, `--radius-sm`
  - Address line 1: `<input type="text">`, placeholder "House no., building, street name", full-width
  - Address line 2: `<input type="text">`, placeholder "Apartment, suite, unit (optional)", full-width
  - City: `<input type="text">`, placeholder "City", full-width
  - State: `<select>`, dropdown with Indian states, full-width
  - Postal code: `<input type="text">`, placeholder "PIN code", 40px height, 140px width (not full-width; PIN codes are short)
  - Checkbox: "Save this address for future orders" (optional, unchecked by default)
- Spacing: `--space-stack-md` (16px) between fields
- Styling: Inter, `--text-body` (15px), `--color-surface-base` bg, `--color-border` border (1px), `--radius-sm` (4px)
- Focus state: border changes to red (`--color-accent-primary`)
- Error state: red border + error message below field in red text
- Info icon (optional): next to PIN code field, on hover shows "We deliver to all Indian postal codes"

---

**Step 2: Shipping Method**

- Heading: "SHIPPING METHOD" (Barlow Condensed, `--text-h4`, all caps)
- Option 1: "Standard (2–4 days)" — ₹49 OR "FREE" if subtotal ≥ ₹499
  - Radio button (left), label (right), full-width card button, 56px height, `--color-surface-raised` bg, `--color-border` border
  - Selected state: red bg, white text
  - Subtext: "Via Shiprocket. Track your order anytime."
- Option 2 (if available): "Express (1–2 days)" — ₹99 (premium, optional)
- Spacing: `--space-stack-md` (16px) between options
- Selected state: shows green checkmark + "SELECTED" text in green

---

**Step 3: Payment Method**

- Heading: "PAYMENT METHOD" (Barlow Condensed, `--text-h4`, all caps)
- Option 1: "Online Payment (UPI / Card / Wallet)"
  - Radio button + "Pay with UPI, card, or wallet" label, full-width card button, 56px height
  - Subtext: "Secure payment via Razorpay. Card & UPI prepayment saves ₹30."
  - Icon: lock icon (16px) in green (`--color-success`)
- Option 2: "Cash on Delivery (COD)"
  - Radio button + label, same styling
  - Subtext: "Pay when product arrives. Only COD orders under ₹5,000."
- Radio buttons: `role="radio"`, `aria-checked="true/false"`
- Selected payment method triggers different flow:
  - Online: "Proceed to Payment" button → external Razorpay gateway
  - COD: "Place Order" button → confirmation page

---

**Promo Code Field (optional, collapsible)**

- Label: "Have a promo code?" (text link, red underline, toggles expand/collapse)
- Expanded state: input field + "APPLY" button
  - Input: `<input type="text">`, placeholder "Enter code", 40px height, 200px width
  - Button: primary, red, "APPLY" (40px height)
  - Behavior: on apply, discount line appears in order summary, success message "Code applied: -₹30" in green
  - Error: "Invalid or expired code" in red

---

### Section 3: Order Summary (Right column on desktop, summary section on mobile)

**Desktop (sticky, follows scroll, max-height 500px):**
- Container: `--color-surface-raised` (slightly darker cream) bg, 1px `--color-border` border, padding `--space-inset-lg` (24px), `--radius-sm`
- Heading: "ORDER SUMMARY" (Barlow Condensed, `--text-body-sm`, all caps)
- Space: `--space-stack-md` (16px)
- Per-item list (scrollable internally):
  - Product name (Barlow Condensed, `--text-body-sm` 13px, 1-line truncation)
  - Quantity × price (Inter, `--text-body-sm`, gray)
  - Example: "Bullshit Remover × 1 — ₹249"
  - Remove link (small ×, opacity 0.6, red on hover) — opens confirm modal
- Space: `--space-stack-md` (16px)
- Subtotal: "Subtotal — ₹249" (row layout, left-aligned label, right-aligned value)
- Shipping: "Shipping — FREE" (or ₹49)
- Discount (if applied): "Discount — −₹30" (green text)
- Space: `--space-stack-sm` (8px)
- Total (bold, larger): "TOTAL — ₹249" (or final amount)
  - Total background: subtle highlight in darker shade

---

### Section 4: Primary Action Button

**All screens:**
- Button text: "PLACE ORDER" (if COD selected) or "PROCEED TO PAYMENT" (if online selected)
- Button: full-width, 56px height, red `--color-accent-primary` bg, white text, Barlow Condensed, all caps, `--weight-bold`
- Hover: scale 1.02, 100ms
- Disabled state: if required fields empty, button disabled (`opacity 0.5`, `cursor: not-allowed`)
- Loading state: spinner icon replaces text, button disabled, 200ms
- Accessibility: `aria-busy="true"` during loading

---

### Section 5: Trust Block (below fold, on mobile only)

**Mobile (320px–767px):**
- Full-bleed background: `--color-surface-raised` (#2D2D2D)
- Padding: `--space-section` (48px) top/bottom
- 3 trust signals (same as homepage trust block):
  - "7-Day Returns"
  - "2–4 Days Shipping" + "Free over ₹499"
  - "Artist-Made"
- Purpose: final reassurance before checkout submission

**Desktop:** Not shown (assuming desktop user is confident; mobile user needs reassurance).

---

### Section 6: Footer (minimal, same links as other pages)

---

## Page 8: Order Confirmation

**Purpose:** Celebrate the purchase. Provide order tracking. Encourage follow-up engagement (Instagram, email signup).

**URL:** /checkout/confirmation?order_id=[order-id]

---

### Section 1: Header (non-sticky)

**All screens:**
- Background: `--color-surface-base` (cream)
- Large checkmark icon (64px, `--color-success` green)
- Heading: "ORDER CONFIRMED" (Barlow Condensed, `--text-h1` 32px mobile / 56px desktop, all caps, `--color-text-primary`)
- Subheading: "Thank you for the purchase. Here's what's next." (Inter, `--text-body` 15px, `--color-text-secondary`)

---

### Section 2: Order Details Card

**Mobile (320px–767px):**
- Contained section, `--color-surface-raised` (#2D2D2D) bg, padding `--space-inset-lg` (24px)
- Order number: "Order #12345" (Space Mono, `--text-body-sm`, gray, all caps)
- Order date: "Placed on March 26, 2026" (Inter, `--text-body-sm`, gray)
- Space: `--space-stack-md` (16px)
- Items list:
  - Per-item row: product name (left) + quantity + price (right), Inter, `--text-body-sm`
  - Example: "Bullshit Remover × 1 — ₹249"
- Space: `--space-stack-md` (16px)
- Subtotal / Shipping / Total (same layout as checkout summary)

**Tablet / Desktop:**
- Horizontal layout, 2 columns (left: order details, right: shipping info)

---

### Section 3: Tracking Section

**All screens:**
- Heading: "TRACK YOUR ORDER" (Barlow Condensed, `--text-h4`, all caps)
- Tracking link: Large button, "VIEW TRACKING" (primary, red, 56px height)
  - Leads to /track/[tracking-id]
  - Tracking page shows Shiprocket status, expected delivery date, live map (if available)
- Copy: "You'll receive a tracking link via SMS and email shortly. No login required." (Inter, `--text-body-sm`, gray)

---

### Section 4: Next Steps / Email & Social

**All screens:**
- Heading: "STAY CONNECTED" (Barlow Condensed, `--text-h4`, all caps)
- Email signup (optional): "Get early access to new drops" + email input + subscribe (secondary button, outline)
- Social links: Instagram, YouTube, WhatsApp (24px icons, `--color-text-primary`, spaced `--space-stack-sm` apart)
- Copy: "Join our community for artist spotlights, drops, and behind-the-scenes." (Inter, `--text-body-sm`, gray)

---

### Section 5: CTA to Browse

**All screens:**
- Button: "CONTINUE SHOPPING" (secondary button, outline, 56px height, full-width)
- Leads to /collections/best-sellers (entry point for repeat visit)

---

### Section 6: Footer (minimal)

---

## Responsive Breakpoints Summary

All pages follow this grid:

| Breakpoint | Width | Grid Cols | Button Width | Padding |
|-----------|-------|-----------|--------------|---------|
| Mobile | 320–767px | 2 | Full-width (minus padding) | 16–24px sides |
| Tablet | 768–1023px | 3 | Constrained (220–280px) | 24–48px |
| Desktop | 1024px+ | 4 | Constrained (220–280px) | 48–64px |

All animations are 200ms by default (entrance, exit, state changes). No bouncy or elastic effects except primary CTA button hover (scale 1.02 at 100ms).

---

## Surface Context Note

The site base is now cream (#F5F0EB) throughout. The previous "dark mode gifting context" swap is no longer needed — the gifting section already uses the base cream surface.

Dark surfaces (`--color-surface-dark`, #1A1A1A) are used only in these specific contexts:
1. Opinion Bar (persistent brand strip at top of every page)
2. Drop announcement strips
3. Record Store Browse cards (horizontal scroll on homepage)
4. The Gift Hub Call-Out block on the homepage (dark punctuation in cream page)

No page-level dark backgrounds remain. All section backgrounds are cream (`--color-surface-base`) or slightly darker cream (`--color-surface-raised`), except the four dark-surface exceptions listed above.

---

## Component Variants Reference (UI System)

Every component used in these pages is defined in Julie's ui-system.md. Quick reference:

- **Button variants:** primary (red bg), secondary (outline), disabled (gray)
- **Product card:** standard (image + name + price + quick-add), compact (horizontal, for cart), bundle (2-column spanning)
- **Input fields:** text, email, tel, select (dropdown)
- **Grid classes:** `.grid-2`, `.grid-3`, `.grid-4` for product displays
- **Typography tokens:** use `--text-h1` through `--text-caption` throughout; never hardcode font sizes
- **Spacing tokens:** use `--space-*` (1, 2, 3, 4, 6, 8, 12, 16, 24) exclusively; no arbitrary margins/padding
- **Color tokens:** use `--color-*` variables; never hardcode hex values

---

## Build Handoff Checklist for Tobi

Before implementation, confirm:

1. **Images:** Dan has photographed all hero products (neutral cream or white surface, natural/directional light, 3+ angles per product). Products on cream backgrounds integrate naturally with the Light+Bold canvas. Image library cataloged with product names.
2. **Copy:** Joanna has provided all copy placeholders (homepage hero, collection headers, product descriptions, about page, footer). Stored in separate copy doc or CMS.
3. **Pricing data:** Patrick/Jenna has finalized product pricing. Price data ready for API integration.
4. **Payment integration:** Razorpay keys + Shiprocket API keys ready for staging environment.
5. **Product database:** Andy's product catalog (200+ products, metadata, categories, artist attribution) loaded into Fynd CMS.
6. **Email service:** Klaviyo / Mailchimp account configured with welcome series + order notification templates.
7. **Analytics:** GA4 + Microsoft Clarity accounts set up, tracking codes ready for implementation.

---

## Notes for Design Review

This document is authoritative for build but not final. Before Tobi begins:

1. Harley reviews this document for completeness and consistency with ui-system.md.
2. Sean (Creative) reviews for visual coherence and typography accuracy.
3. Joanna (Copy) confirms all copy prompts align with voice system.
4. Kurt (UX) confirms page flows match IA wireframes.

Any questions → raise in decision log (decisions/decision-log.md) before build starts.

---

**Document Status:** Draft (updated 2026-03-28 for Light+Bold / Organised Chaos direction). Awaiting Harley review before handoff to Tobi.

**Next Steps:**
1. Harley approves this spec (status → review/approved).
2. Tobi begins Phase 4 build with this doc as the single source of truth.
3. Any spec questions during build → flag to Harley; no scope creep without written decision log entry.
