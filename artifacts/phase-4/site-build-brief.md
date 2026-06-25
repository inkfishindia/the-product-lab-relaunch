<!-- last-updated: 2026-03-27 -->
# Site Build Brief — UX/IA (Find. Collect. Gift.)
**Phase:** 4
**Producing Agent:** Kurt
**Date:** 2026-03-27
**Status:** draft
**Reviewer:** Harley
**Informed By:** D-018 (Light+Bold visual system), D-019 (Find.Collect.Gift mechanic), D-020 (Drop 1 scope), D-021 (Opinion-first brand model)

---

## How to Use This Document

This is the authoritative build brief for Tobi. Every structural decision here traces to one of three sources: customer behaviour (Weiss), brand strategy (Heyward, Joanna, Sean), or platform reality (Fynd/Commerce.com). Where platform capability is uncertain, the constraint is explicitly flagged.

The Phase 3 wireframes remain valid for checkout flow, order tracking, FAQ, and artist spotlight pages. This document updates the sitemap, homepage, collection page, PDP, and gifting flow to serve the new purchase mechanic: Find. Collect. Gift.

**References:**
- Visual identity: `artifacts/phase-4/visual-identity-rebrand.md` (Sean)
- Copy system: `artifacts/phase-4/copy-system-rebrand.md` (Joanna)
- Phase 3 IA (base document): `artifacts/phase-3/ux-ia-wireframes.md` (Kurt)

**Platform:** Commerce.com (Fynd). Mobile-first. LCP under 3 seconds on 4G is a hard launch requirement.

---

## The Purchase Mechanic — What the Site Must Serve

The site architecture is not browse-and-buy-one. It serves three distinct moments:

**Find** — the sticker that is exactly you. Recognition, not persuasion. The customer does not need to be convinced — they need to find the product that already belongs to them.

**Collect** — build the opinion wall. Buying multiple feels like curation, not spending. The site makes sets visible, surfaces what is missing from a set, and makes multi-item orders feel natural.

**Gift** — the one that is exactly someone else. Every gift is a new customer. The gifting flow is the organic growth engine — it must be fast, specific, and frictionless.

Every page layout decision flows from these three moments. If a design element does not serve Find, Collect, or Gift, it does not earn its place on the page.

---

## The Brand Frame (for every layout decision)

**Record store soul. Candy store body.**

Soul: opinionated, curated. The nav labels, the collection names, the section headers — they have a point of view.

Body: abundant, fun. Dense product display. Everything visible. Want more than one. Anti-minimalist by design.

The Light + Bold visual system means: Paper (#F5F0EB) base, Ink (#1A1A1A) type, Loud (#E63B2E) CTAs, Opinion (#F2D024) accents, Air (#FFFFFF) product tiles. The previous brief described dark backgrounds — that system is superseded. Do not build dark product cards. All product tiles sit on Air (#FFFFFF) over the Paper (#F5F0EB) page background.

Anti-drift check for Tobi: if the page looks minimalist or precious, it has drifted. Red and yellow must appear above the fold on every page. Abundant product display, not curated whitespace.

---

## Part 1: Updated Sitemap

The Phase 3 sitemap is updated to explicitly serve Find, Collect, and Gift mechanics. Changes from Phase 3 are marked.

```
theproductlab.in/
│
├── / (Homepage)
│
├── /collections/ (Collections index)
│   ├── /collections/the-loud-ones       [UPDATED SLUG — "No Filter" becomes "The Loud Ones"]
│   ├── /collections/pick-a-side         [NEW — opinion/debate stickers]
│   ├── /collections/your-energy         [NEW — self-aware/relatable]
│   ├── /collections/for-the-group-chat  [NEW — gifting-forward collection]
│   ├── /collections/main-character-set  [NEW — aspirational/set-building anchor]
│   ├── /collections/best-sellers        (manually curated, 12-16 products)
│   ├── /collections/new-in              (auto-populates, last 30 days)
│   └── /collections/the-drop            (current drop or countdown + archive)
│
├── /products/ (Product Detail Pages)
│   └── /products/[product-slug]
│
├── /sets/ (UPDATED — was /bundles/)
│   ├── /sets/the-loud-ones-pack         (₹499 — 5 petty/shade stickers)
│   ├── /sets/main-character-set         (₹499 — 5 unbothered stickers)
│   ├── /sets/no-notes                   (₹499 — gifting pack)
│   ├── /sets/sent-on-read               (₹399 — relational pack)
│   └── /sets/build-your-set            [NEW — mix-and-match flow, ₹499 for 5]
│
├── /drops/ (Drop hub page)
│   └── /drops/[drop-name]-[month-year]
│
├── /gifts/ (Gifting hub)
│   ├── /gifts/for-the-one-who-has-no-filter
│   ├── /gifts/for-the-main-character
│   ├── /gifts/for-the-one-always-right
│   └── /gifts/for-the-impossible-one
│
├── /about/
│
├── /cart/
│
├── /checkout/
│
├── /account/
│   └── /account/orders/[order-id]
│
├── /track/
│
└── Footer pages:
    ├── /shipping-policy/
    ├── /returns/
    ├── /faq/
    ├── /contact/
    └── /sell-your-art/
```

### What Changed from Phase 3 and Why

**Collection slugs updated** to match the copy system pack names (Joanna, copy-system-rebrand.md). "No Filter" was a brand-internal label. "The Loud Ones" is a pack name the customer would actually forward on WhatsApp. Consistency between collection name and pack name reduces cognitive friction.

**`/bundles/` becomes `/sets/`** because "bundle" is ecommerce jargon that signals discount pricing. "Set" signals curation. The customer is not buying a bundle — they are building a collection. Language must match the Collect mechanic.

**`/sets/build-your-set/` is new.** This is the mix-and-match flow for the Collect mechanic. A customer buys 5 stickers from any collection at a single price (₹499). Detailed UX spec in Part 5.

**`/drops/` replaces `/the-drop/`.** Cleaner URL structure. The plural signals that drops are a recurring mechanic, not a one-time event.

**`/shop/` format browse removed at launch.** "Format browse" (lapel pins, keychains, etc.) is a returning-customer behavior. The target audience at launch is new customers who discover via identity and opinion, not product format. Format browse can be added to the nav drawer at month 2 once there is returning traffic to serve.

**Card stickers collection removed from top-level sitemap.** The card sticker products are present in collections (The Loud Ones, Main Character Set, etc.) and in /sets/. A standalone card sticker collection page adds complexity without serving Find, Collect, or Gift more effectively than the opinion-led collections already do. Card stickers will be discoverable via search and the /collections/ index.

---

## Part 2: Navigation Architecture

### Primary Navigation (Mobile-First)

**Mobile: Persistent bottom bar + hamburger drawer**

The bottom bar is always visible on mobile. Four targets only. All reachable with the right thumb without grip shift.

```
[ Shop ]  [ Sets ]  [ Gifts ]  [ Search ]
```

- **Shop** opens the nav drawer (all collections + drops)
- **Sets** goes directly to `/sets/` — the Collect mechanic entry point
- **Gifts** goes directly to `/gifts/` — the Gift mechanic entry point
- **Search** opens search overlay

**Why "Sets" instead of "Drop":** In the Phase 3 brief, the bottom bar had "Drop" as a persistent nav item. At launch, there is no confirmed Drop 1 date. Surfacing an empty or countdown-only Drop page in the most prominent nav position wastes a slot. Sets serves the Collect mechanic at all times, not only when a drop is live. When Drop 1 launches, "Drop" replaces "Sets" in the bottom bar via a Fynd nav configuration update.

**Nav drawer (hamburger):**

```
COLLECTIONS
  The Loud Ones
  Pick a Side
  Your Energy
  For the Group Chat
  Main Character Set
  Best Sellers
  New In
  The Drop

SETS
  The Loud Ones Pack — ₹499
  Main Character Set — ₹499
  No Notes (Gifting) — ₹499
  Sent on Read — ₹399
  Build Your Set — from ₹499

---
About
FAQ
Contact
Sell Your Art
```

**Desktop navigation:**

```
[Logo]    Shop v    Sets    Gifts    New In    [Search icon] [Cart icon]
```

"Shop" dropdown reveals collections. "Sets" and "Gifts" go directly to their hub pages. "New In" goes to `/collections/new-in` — it is the single most important repeat-visit entry point and earns a top nav slot.

### Navigation Rules

1. Collection names in nav are the actual collection names from the copy system — not abbreviated category labels.
2. Sets in nav show prices. "₹499" is the decision trigger for a gifter who does not yet know which set. Show the price in the nav label.
3. The Drop gets a nav drawer slot but not a bottom bar slot until Drop 1 is confirmed and has an active page.
4. Cart icon shows item count badge when non-empty. Count updates without page reload when quick-add is used.
5. Bottom bar's safe area inset: `padding-bottom: env(safe-area-inset-bottom)` — required for iPhone notch/home bar. Brief for Tobi.

### Footer

```
Column 1 — Brand                Column 2 — Shop             Column 3 — Help
The Product Lab                 The Loud Ones               Shipping Policy
Small objects. Big opinions.    Main Character Set          Returns
Designed in Bengaluru.          New In                      FAQ
[Instagram icon]                Sets                        Contact Us
[WhatsApp icon]                 Gifts                       Track My Order
                                The Drop                    Sell Your Art

Column 4 — Trust
Free shipping above ₹499
COD available above ₹299
Designed by independent artists
GST No: [number]
Ink Fish, Bengaluru
[Razorpay trust badge]
[UPI accepted badge]
```

The footer trust column is unchanged from Phase 3. It carries the trust signals that reviews would normally carry for a zero-review brand.

---

## Part 3: Homepage — Section-by-Section Build Spec

The homepage must answer three things for a first-time mobile visitor in under 5 seconds:

1. What is this brand?
2. What does it sell?
3. Why does it matter to me?

The homepage is also the only page that must serve all three mechanics simultaneously: Find (which one is mine?), Collect (there are sets — I need more than one), Gift (this exists for someone I know).

**Section order:**

---

### Section 1 — Announcement Bar (opinion, not discount)

```
┌─────────────────────────────────────────┐
│  WEAR YOUR OPINION. FREE SHIPPING ₹499+ │
└─────────────────────────────────────────┘
```

- Background: Loud red (#E63B2E)
- Text: Air white, Barlow Condensed Bold, all caps, 13px
- One line. No carousel. No countdown. No discount.
- The announcement bar is not a promotional banner — it is a brand statement that happens to contain the free shipping policy.
- Do not put "10% off first order" or any discount here. It immediately repositions the brand as a discount brand.

---

### Section 2 — Hero (above the fold, full screen on mobile)

```
┌─────────────────────────────────────────┐
│  [Bottom bar nav]                        │
│                                          │
│  [Lifestyle image: scattered stickers   │
│   on a cream desk surface, slightly     │
│   overlapping, 4-5 different designs    │
│   visible. Products create visual noise.]│
│                                          │
│  SMALL OBJECTS.                          │
│  BIG OPINIONS.                           │
│                                          │
│  Stickers for people who have things    │
│  to say.                                │
│                                          │
│  [ SHOP THE OPINIONS ]                  │
│                                          │
└─────────────────────────────────────────┘
```

- Headline: Barlow Condensed Black, #1A1A1A or #E63B2E (Sean confirms which), all caps, full-width
- Sub-headline: Inter Regular, #1A1A1A, sentence case
- CTA: "SHOP THE OPINIONS" links to `/collections/best-sellers`
- CTA button: Full-width on mobile, Loud red background, Air text
- Hero image: Multiple stickers scattered on Paper cream surface. Abundance is the message — not one hero product on white. Sean's photography direction (visual-identity-rebrand.md) is the source.
- CTA must sit in the bottom 40% of the hero — thumb zone. Not at the top.
- When a drop is live: CTA changes to "SHOP THE DROP" and links to `/drops/[active-drop]`
- Hero image is the LCP element. Pre-load, not lazy-load.

**What the hero does NOT do:** Dark background. Single centered product. "Buy now and save X%." These are the wrong signals for this brand at this price point.

---

### Section 3 — Find Your Opinion (serves the Find mechanic)

```
┌─────────────────────────────────────────┐
│  Which one is you?                       │
│                                          │
│  ┌──────────┐  ┌──────────┐             │
│  │ YOUR     │  │ NOTED.   │             │
│  │ LOSS     │  │ IGNORED. │             │
│  │ ₹149     │  │ ₹149     │             │
│  └──────────┘  └──────────┘             │
│                                          │
│  ┌──────────┐  ┌──────────┐             │
│  │ MAIN     │  │ NOT MY   │             │
│  │ CHARACTER│  │ PROBLEM  │             │
│  │ ₹149     │  │ ANYMORE  │             │
│  │          │  │ ₹149     │             │
│  └──────────┘  └──────────┘             │
│                                          │
│  → See all opinions                     │
│                                          │
└─────────────────────────────────────────┘
```

- Section heading: "Which one is you?" — Inter Regular, sentence case. One line. This is the Find mechanic phrased as an invitation.
- 4 products shown. These are the four most recognisable text opinions in the launch catalog. Prices shown — ₹149 entry price is the conversion trigger here.
- Product tiles: Air (#FFFFFF) background, product name in Barlow Condensed Bold all caps, price in Loud red. This is the "opinion shot" format from Sean's brief — one sticker, close-cropped, filling 80% of the tile, text as composition.
- 2-column grid on mobile.
- "See all opinions" text link goes to `/collections/best-sellers`.
- Prices are shown here (unlike the Phase 3 approach of no prices in homepage grids). Rationale: ₹149 is an impulse price. Showing it triggers the "I can afford this right now" response. The discovery phase has already happened with the hero — this is the conversion nudge.

---

### Section 4 — Collect (serves the Collect mechanic)

```
┌─────────────────────────────────────────┐
│  Build the opinion wall.                 │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  [Set image — 5 stickers laid out] │ │
│  │  The Loud Ones Pack                 │ │
│  │  5 stickers. All pettiness.         │ │
│  │  ₹499 · Free shipping              │ │
│  │  [GET THE SET]                     │ │
│  └────────────────────────────────────┘ │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  [Set image — 5 stickers laid out] │ │
│  │  Main Character Set                 │ │
│  │  5 stickers. One opinion wall.     │ │
│  │  ₹499 · Free shipping              │ │
│  │  [GET THE SET]                     │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Or → Build your own set               │
│       Pick any 5. ₹499. Free shipping.  │
│                                          │
└─────────────────────────────────────────┘
```

- Section heading: "Build the opinion wall." — Barlow Condensed Bold, #1A1A1A
- Two featured sets. Each set card: set image (5 stickers arranged on Paper surface), set name, 1-line descriptor, price with free shipping callout built in.
- "Build your own set" text link below the two set cards. This is the entry point to the `/sets/build-your-set/` mix-and-match flow.
- CTA buttons: Opinion yellow (#F2D024) background, Ink text — visually distinct from the Loud red CTAs elsewhere. Yellow is the Collect color. Red is the Find/buy-now color. The difference communicates different urgency levels.
- This section is the first place the Collect mechanic appears explicitly. The ₹499 free shipping threshold is built into every set price — buying a set clears the threshold automatically. This is stated on the card, not just at checkout.

---

### Section 5 — Trust Block

```
┌─────────────────────────────────────────┐
│  [Icon] Opinion stickers. ₹149 each.    │
│  Made by independent artists.           │
│                                          │
│  [Icon] Designed in Bengaluru.          │
│  Original work. Not mass-produced.      │
│                                          │
│  [Icon] Ships in 2-4 days.             │
│  Tracking via WhatsApp.                 │
│                                          │
│  [Icon] Free shipping above ₹499.      │
│  COD available above ₹299.             │
│                                          │
└─────────────────────────────────────────┘
```

Unchanged in function from Phase 3. Background: Paper (#F5F0EB). Icons: simple Ink line marks, not stock clip art.

---

### Section 6 — The Gift Mechanic

```
┌─────────────────────────────────────────┐
│  You already know who needs this.        │
│                                          │
│  [4 persona tiles in 2x2 grid]          │
│                                          │
│  ┌───────────────┐  ┌───────────────┐  │
│  │ The one who   │  │ The main      │  │
│  │ has no filter │  │ character     │  │
│  │ → [Shop]     │  │ → [Shop]     │  │
│  └───────────────┘  └───────────────┘  │
│                                          │
│  ┌───────────────┐  ┌───────────────┐  │
│  │ The one who   │  │ The impossible│  │
│  │ is always     │  │ one to shop   │  │
│  │ right         │  │ for           │  │
│  │ → [Shop]     │  │ → [Shop]     │  │
│  └───────────────┘  └───────────────┘  │
│                                          │
│  → See all gift ideas                  │
│                                          │
└─────────────────────────────────────────┘
```

- Section heading: "You already know who needs this." — Joanna copy, Gift mechanic register (third person framing).
- 4 persona tiles link to the corresponding gift persona pages under `/gifts/`.
- Each tile: recipient description (not product type), single text link "Shop."
- Tile background: Opinion yellow (#F2D024) — signals Gift occasion, distinct from the Find and Collect sections.
- "See all gift ideas" links to `/gifts/` hub.

---

### Section 7 — New In / Drop Teaser

```
┌─────────────────────────────────────────┐
│  What just landed.                       │
│                                          │
│  [Horizontal scroll: 4-6 newest         │
│   products, partial overflow at right.  │
│   Each tile: product image + name +     │
│   "NEW" badge + price.]                 │
│                                          │
│  → See all new in                       │
│                                          │
│  [If drop is live or imminent:]         │
│  ─────────────────────────────────────  │
│  THE DROP: [Drop Name]                  │
│  [Countdown: 48:12:30]                  │
│  → [SEE THE DROP]                       │
│                                          │
└─────────────────────────────────────────┘
```

- "What just landed" heading: serves the return visitor and trains the new visitor that this brand updates frequently.
- Horizontal scroll: 4G-friendly, lazy-loads. Show partial overflow at right edge to signal more.
- Drop teaser appears below New In if a drop is active or within 7 days. If no drop is scheduled, this section ends after the New In scroll.
- "See all new in" links to `/collections/new-in`.

---

### Section 8 — Instagram Feed

```
┌─────────────────────────────────────────┐
│  @the.product.lab                        │
│                                          │
│  [6 most recent posts: 2x3 grid or      │
│   horizontal scroll]                    │
│                                          │
│  Follow on Instagram →                  │
│                                          │
└─────────────────────────────────────────┘
```

Unchanged from Phase 3. Social proof surrogate for a zero-review brand. Confirm Fynd Instagram widget compatibility with Tobi before finalising.

---

### Section 9 — Footer

See navigation architecture section above.

---

**Homepage layout decisions explained:**

| Decision | Rationale |
|----------|-----------|
| Prices shown in Section 3 grid | ₹149 is an impulse price. Showing it in the Find section triggers "I can get this right now" — it does not anchor to higher prices because there is no higher price visible. |
| Find before Collect before Gift | A first-time visitor needs to find something for themselves first. Then they see there are sets. Then they realise they could gift it. The mechanic is sequential. |
| Sets featured as a homepage section, not just in nav | The Collect mechanic requires visibility above the fold. Burying sets in nav means only motivated customers find them. Most won't. |
| Yellow CTA for sets, red CTA for individual buys | Color codes the intent. Red = act now on this specific thing. Yellow = build something. The difference communicates urgency without copy. |
| Trust block before Gift section | New visitors need to believe the brand ships reliably before they consider gifting. Trust block earns the Gift section. |

---

## Part 4: Collection Page Design — Serving the Collect Mechanic

The collection page must do three jobs: let someone browse and Find their sticker, surface the set that contains multiple stickers they want (Collect), and show that certain stickers are perfect for someone else (Gift entry point).

### Page Structure

```
┌─────────────────────────────────────────┐
│  [Nav + breadcrumb: Home > The Loud Ones]│
│                                          │
│  THE LOUD ONES                          │
│  For when you have a point to make      │
│  and a water bottle to put it on.       │
│                                          │
├─────────────────────────────────────────┤
│  [Related collections — horizontal chip │
│   scroll]                               │
│  [Main Character] [Best Sellers] [New In]│
│                                          │
├─────────────────────────────────────────┤
│  [COLLECT THIS SET]                     │
│  The Loud Ones Pack — ₹499             │
│  5 stickers. Free shipping.            │
│  [GET THE SET →]                       │
├─────────────────────────────────────────┤
│  Sort: [Recommended v]                  │
│  Filter: [₹149] [₹199] [All]           │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│  [Product grid — 2 col mobile,          │
│   3-4 col desktop]                     │
│                                          │
│  [Load more — not infinite scroll]      │
│                                          │
├─────────────────────────────────────────┤
│  [Build Your Set CTA at bottom]         │
│  Not ready to commit to this set?       │
│  Mix and match any 5 stickers. ₹499.   │
│  [BUILD YOUR SET →]                    │
│                                          │
└─────────────────────────────────────────┘
```

### The Set Banner (Critical New Element)

The set banner appears immediately below the collection header and above the filter/sort bar — not at the bottom of the page. It must be the first commercial action visible after the customer understands what the collection is.

**Logic:** A customer who lands on a collection page and sees "Get all 5 for ₹499" before they start browsing will naturally compare individual add-to-cart vs. set value as they browse. This is deliberate. The Collect mechanic requires the set to be the first anchor, not an afterthought.

**Set banner design:**
- Background: Opinion yellow (#F2D024)
- Set name in Barlow Condensed Bold
- 1-line copy from the copy system pack names
- Price with free shipping statement
- CTA: "GET THE SET" — links to the corresponding `/sets/[pack-slug]` page
- Condensed, not full-width card. This is a nudge, not a hero section.

**Collections without a corresponding set:** For collections like Best Sellers and New In, the set banner is replaced with the "Build Your Set" prompt instead.

### Product Tile Design

```
┌──────────────────────────┐
│                          │
│  [Sticker image on Air  │
│   white background]      │
│  [Badge: "NEW" or        │
│   "GIFTING PICK" or      │
│   "BEST SELLER"]         │
│                          │
│  YOUR LOSS               │
│  ₹149                    │
│  [+ ADD]                 │
└──────────────────────────┘
```

- Tile background: Air (#FFFFFF)
- Product name: Barlow Condensed Bold, all caps, #1A1A1A — the name IS the opinion, size it accordingly (20-24px)
- Price: Barlow Condensed Bold, Loud red (#E63B2E)
- "+ ADD" button: small, Ink background, Air text — shows on hover/focus on desktop, always visible on mobile
- Badge priority (one badge per tile):
  1. "ONLY X LEFT" (scarcity — highest priority when stock < 5)
  2. "GIFTING PICK" — replaces "Only at TPL" for products that are in gift persona pages
  3. "NEW" (added in last 30 days)
  4. "BEST SELLER" (from Best Sellers collection tag)

**New badge: "GIFTING PICK"** — Products that have been manually tagged for gift personas get a "GIFTING PICK" badge on collection pages. This serves dual purpose: it flags product relevance for the gifter who is browsing a regular collection, and it creates social proof ("people buy this as gifts" implies others find it gift-worthy).

### Filter Options

Sort:
- Recommended (default — curated by Andy)
- Newest first
- Price: Low to High
- Price: High to Low

Filter (collection pages only — not Best Sellers/New In):
- Price: ₹149 / ₹199 / ₹249 / All — shown as chips, not a dropdown
- No theme or format filter at launch. Reason: with a small catalog, filters that narrow to 2-3 items create a broken experience. Add category filters when each filter bucket contains 6+ products.

**Fynd constraint:** Filter parameters must not create indexed URLs. Either canonical filter URLs to the base collection, or disable filter URL state and use JavaScript-only filtering. Confirm with Tobi.

### Pagination

"Load more" button, not infinite scroll. Rationale unchanged from Phase 3: infinite scroll buries the set CTA and the Build Your Set prompt at the bottom of the page. The "load more" pause is a natural intervention point.

---

## Part 5: The Find Mechanic in UX

The Find mechanic is recognition, not persuasion. The site's job is to help someone find the sticker that already belongs to them, not to convince them to buy something they are indifferent about.

### Product Names as Discovery

The product name is the sticker text. "YOUR LOSS" is a product name. It must be legible at thumbnail size in the collection grid — if the text is too small to read in the tile, the Find moment cannot happen. Minimum 18px in grid tiles. Prefer 20-22px.

This means: product tile layout prioritises the text over other information. The image shows the sticker (which contains the text), and the product name below repeats the text in type. The customer sees the opinion twice: in the image and in the label. Redundancy is intentional — it aids recognition.

### The Product Tile as the Find Moment

The recognition event ("that's literally me") happens at the tile level, before the customer ever visits the PDP. Design for this:

- Product image must show the sticker text clearly. No lifestyle overlay on the grid image. Clean sticker-on-white or sticker-on-cream tile image.
- Product name below the image is all caps, prominent, sticker text verbatim. Not "YOUR LOSS text sticker" — just "YOUR LOSS."
- No supplementary descriptors in the grid. "Sticker, ₹149" below the name is enough. No "for the petty one" in the tile — that's PDP copy.

### The PDP as Confirmation

Once the customer has found their sticker in the grid and tapped through, the PDP must confirm "yes, this is you" — not introduce doubt.

**PDP content hierarchy for Find:**

1. **Full product image** — close-cropped sticker filling 80% of the frame on Paper cream. The opinion is the composition.
2. **Product name as H1** — Barlow Condensed Black, large, all caps. "YOUR LOSS" at 40px on mobile. The statement.
3. **Identity line** — one sentence from Joanna naming the person this is for. "For everyone who's done explaining themselves." This is the confirmation moment. If this line is right, the customer adds to cart.
4. **Price** — Barlow Condensed Bold, Loud red, 24px. ₹149 is an impulse price — show it clearly.
5. **Add to Cart** — full-width, Loud red, in thumb zone.

**What does NOT appear high on the PDP:** Materials, dimensions, shipping info. These are in accordions below the fold. The Find confirmation happens in the first viewport — technical specs interrupt it.

### Filter and Sort for Find

The collection page sort "Recommended" order is the primary Find tool. Andy must set recommended order to surface the most opinion-forward stickers first — the ones most likely to trigger immediate recognition. "YOUR LOSS," "NOTED. IGNORED.," "MAIN CHARACTER" should be in the first 4 tiles.

A text-based search overlay (tapping the Search icon in the bottom bar) allows a visitor who already knows what they want to skip browsing entirely. Search must return results with product names visible in the results list — the customer is searching for opinions, not product descriptions.

---

## Part 6: The Gift Mechanic in UX

Gifting is the organic growth engine. Every gift is a new customer. The goal: someone should be able to find, identify, and gift a sticker to a specific person in under 2 minutes from any page on the site.

### The "Gift This" CTA on PDPs

Every PDP has a secondary CTA below the Add to Cart block:

```
┌─────────────────────────────────────────┐
│  [Add to Cart]  ₹149                    │
│                                          │
│  → SEND THIS TO SOMEONE                 │
│  [WhatsApp share icon]                  │
│                                          │
└─────────────────────────────────────────┘
```

"SEND THIS TO SOMEONE" is a gift prompt, not a share button. Pre-filled WhatsApp message: "[Product name] from The Product Lab — ₹149. [Identity hook line]. theproductlab.in/products/[slug]". The recipient receives a product link. If they tap it, they land on the PDP. If the product is for them and the gifter buys it, the gifter gets the gift. If the recipient decides to buy it themselves, that is new customer acquisition with zero CAC.

This link is shareable. UTM parameter in the link: `?utm_source=whatsapp&utm_medium=gift-share&utm_campaign=pdp`. This lets Avinash track how many orders come from WhatsApp gift shares.

### The Gift Set Collection

`/collections/for-the-group-chat` is the gifting-forward collection. Products in this collection are tagged "GIFTING PICK." The collection header copy (Joanna): "You know exactly who this is for. They know too."

All No Notes and Sent on Read set pages (`/sets/no-notes`, `/sets/sent-on-read`) are the gift-specific sets. These pages are designed with the gifter, not the self-buyer, as the user:

- Hero image shows the set as a gift object: stickers in a kraft envelope or matchbook format.
- "Who this is for" copy replaces the individual identity line.
- Gift note reminder: "Add a personal note at checkout." Callout below the ATC button, always visible, not in an accordion.
- "Add to cart" CTA copy: "BUY THIS FOR THEM" — not the generic "ADD THIS ONE."

### The /gifts/ Hub Page

The gifts hub is the shortest path to gifting for someone who arrives via "gifts for [description] India" search or from a gifting Instagram post.

```
┌─────────────────────────────────────────┐
│  Gifts for people with opinions.         │
│  Which is everyone you actually like.   │
│                                          │
│  Who are you shopping for?              │
│                                          │
│  [4 persona tiles]                      │
│  The one who has no filter →           │
│  The main character →                  │
│  The one who is always right →         │
│  The impossible one to shop for →      │
│                                          │
│  Budget:                                │
│  [Under ₹299] [₹299-499] [₹499+]       │
│                                          │
│  [Featured set: No Notes ₹499]         │
│  [Featured set: Sent on Read ₹399]     │
│                                          │
└─────────────────────────────────────────┘
```

Budget filter defaults to ₹299-499. The gifter does not need to choose — the default is already the most common gifting range.

### Gift Note at Checkout

The gift note field is visible at the checkout payment step — always, not only when the gifter identifies themselves. Many gifters do not arrive via the gift hub. The gift note field must appear regardless of entry path.

```
Add a personal note (optional)
[Textarea — 120 char limit]
Say it (or don't — the stickers already did).
```

This copy placeholder is from Joanna's copy system. Tobi implements the field as a visible text area, not an "Add gift note +" expansion link. The expansion link requires an extra tap. One tap of friction in a checkout is measurable drop-off.

### The 2-Minute Gift Path

Target: a first-time visitor who knows their recipient and their recipient's personality should be able to complete a gift purchase in under 2 minutes.

Path:
1. Arrives at homepage or `/gifts/` hub (10 seconds)
2. Selects a persona tile (5 seconds)
3. Browses the persona product page (30 seconds)
4. Taps product — PDP confirms identity match (15 seconds)
5. Taps "BUY THIS FOR THEM" (2 seconds)
6. Cart with gift note field prompt (10 seconds)
7. Checkout: mobile number, pincode, UPI (30 seconds)

Total: under 2 minutes for a motivated gifter. Every additional tap, every additional scroll, every piece of information that requires reading is time removed from this path.

---

## Part 7: The Drop / Collect Mechanic in UX

Drops bring people back. The site must surface new arrivals in ways that create urgency and reward return visits.

### The Drop Hub Page (`/drops/`)

When a drop is active:

```
┌─────────────────────────────────────────┐
│  THE DROP                                │
│                                          │
│  [Drop name] by [Artist]                │
│  [City]                                 │
│                                          │
│  [Drop countdown: 71:23:05 remaining]   │
│                                          │
│  [Full set — featured first]           │
│  [Drop Name] Pack — ₹499               │
│  All 5. Free shipping.                  │
│  [GET THE FULL SET]                     │
│                                          │
│  [Individual stickers — horizontal     │
│   scroll, 4-5 visible]                 │
│                                          │
│  [Inventory count per design:]         │
│  YOUR LOSS — 23 remaining              │
│  MAIN CHARACTER — 41 remaining         │
│  (live count from Fynd inventory)       │
│                                          │
└─────────────────────────────────────────┘
```

Between drops (countdown state):

```
┌─────────────────────────────────────────┐
│  THE NEXT DROP LANDS IN:                │
│  [DD:HH:MM countdown]                   │
│                                          │
│  [Last drop — sold out, visible but     │
│   clearly marked sold out]             │
│                                          │
│  Get notified:                          │
│  [WhatsApp number field]               │
│  [NOTIFY ME]                           │
│                                          │
└─────────────────────────────────────────┘
```

### How "New In" Surfaces the Collect Mechanic

The `/collections/new-in` page auto-populates with products added in the last 30 days. Its job is to answer the return visitor question: "Is there anything I don't have yet?"

New In page — additional element not in Phase 3:

Below the product grid on New In, a static section:

```
Missing something from your wall?
Build Your Set — any 5 stickers, ₹499.
[BUILD YOUR SET →]
```

This turns a browsing session ("checking what's new") into a Collect moment.

### Drop Entry Point from Email/WhatsApp

When Eli's drop announcement WhatsApp message goes out, the link should land directly on the `/drops/` page with the drop active. The URL carries a UTM: `?utm_source=whatsapp&utm_medium=drop-announce&utm_campaign=[drop-name]`. This ensures:
1. The customer lands on the most relevant page, not the homepage.
2. GA4 tracks that this order came from the drop announcement.
3. The drop page shows the countdown and inventory — full urgency signals visible immediately.

### Collect: The "Complete Your Set" Prompt

On any PDP for a product that belongs to a named set, show a prompt:

```
┌─────────────────────────────────────────┐
│  This is in: The Loud Ones Pack         │
│                                          │
│  4 more stickers. ₹499 total.           │
│  Free shipping included.                │
│                                          │
│  → See the full set                    │
│                                          │
└─────────────────────────────────────────┘
```

This is the Collect nudge on individual PDPs. A customer who found one sticker they love is immediately shown there are 4 more in the same spirit. "₹499 total. Free shipping included." does the math for them — the set is not much more than what they are already paying, and it clears the free shipping threshold.

---

## Part 8: The Build Your Set Flow

This is the most significant new UX element in this brief. It does not exist in Phase 3.

### What It Is

A customer picks any 5 stickers from the full catalog and pays ₹499. The set ships as a unit. This is the Collect mechanic made frictionless — instead of adding 5 items individually and hoping the total works out right, the customer builds a set and knows the price and free shipping upfront.

### URL and Page Structure

`/sets/build-your-set/`

```
┌─────────────────────────────────────────┐
│  Build Your Set.                         │
│  Pick any 5. ₹499. Free shipping.       │
│                                          │
├─────────────────────────────────────────┤
│  [Progress indicator]                   │
│  [●][●][ ][ ][ ]  2 of 5 chosen        │
│                                          │
├─────────────────────────────────────────┤
│  All opinions:                          │
│                                          │
│  [Filter chips: All / Petty / Unbothered│
│   / Self-aware / Gifting]               │
│                                          │
│  [Product grid — 2 col mobile]         │
│                                          │
│  ┌──────────┐  ┌──────────┐            │
│  │ YOUR     │  │ MAIN     │            │
│  │ LOSS     │  │ CHARACTER│            │
│  │ ₹149     │  │ ₹149     │            │
│  │ [SELECT] │  │ [SELECT] │            │
│  └──────────┘  └──────────┘            │
│                                          │
│  When a product is selected:           │
│  Border: Loud red, checkmark overlay   │
│                                          │
├─────────────────────────────────────────┤
│  [Sticky bottom bar when ≥1 selected:] │
│  [●][●][ ][ ][ ] 2 chosen             │
│  [BUILD MY SET — ₹499] (disabled until │
│   5 are chosen)                        │
└─────────────────────────────────────────┘
```

### Flow Logic

1. Customer arrives at `/sets/build-your-set/`
2. Page shows all in-stock stickers with filter chips by personality category
3. Customer taps to select a sticker — tile gets a Loud red selection state (border + checkmark)
4. Progress indicator updates (1 of 5, 2 of 5, etc.)
5. At 5 selected, "BUILD MY SET" CTA activates and turns full Loud red
6. Customer taps CTA — all 5 items added to cart as a bundle at ₹499
7. Cart shows: "Your Set (5 stickers) — ₹499. Free shipping included."

### Minimum Cart Behavior for Sets

When a set is in the cart (whether a named set or a Build Your Set), the cart displays the set as a single line item, not as 5 individual items. This is important for two reasons:
1. It reads like a curated thing ("Your Set") not like a bulk order.
2. It prevents the free shipping progress bar from triggering — the set already clears the threshold.

**Fynd constraint:** Fynd's native bundle handling may not support this. Tobi must confirm whether Fynd can: (a) add 5 individual products to cart at a single discounted bundle price, or (b) whether a bundle SKU with component mapping is the correct approach. If individual product add is the method, the cart must group them under a "Your Set" label via custom cart rendering. Escalate to Tobi's 45-hour estimate if this requires custom development.

---

## Part 9: Mobile-First Flows

80%+ of traffic is mobile. Every flow is designed for one thumb, single column, large tap targets, minimum scroll.

### Thumb Zone Rules (All Pages)

| Element | Rule |
|---------|------|
| Primary CTAs | Bottom 40% of viewport on mobile |
| Sticky Add to Cart (PDP) | Fixed above browser chrome safe area |
| Bottom nav bar | Fixed bottom, `padding-bottom: env(safe-area-inset-bottom)` |
| Form inputs | Full-width, 48px minimum height |
| Tap targets | 44px minimum, 8px minimum gap between adjacent targets |

### Add to Cart — Mobile PDP

The sticky ATC bar appears once the user scrolls past the main ATC block on the PDP:

```
┌─────────────────────────────────────────┐
│  YOUR LOSS              ₹149  [ADD TO CART] │
└─────────────────────────────────────────┘
```

Disappears when the user scrolls back up past the main ATC block. The price is in the sticky bar — the customer never needs to scroll back to see what they are buying.

### Gifting Flow — Mobile Specific

The 2-minute gift path depends on zero friction. Mobile-specific rules:

- The "SEND THIS TO SOMEONE" WhatsApp CTA on PDPs must be large enough to tap without zooming. Minimum 44px height, full-width on mobile, green (#25D366 — WhatsApp brand green) background, white text.
- Gift note textarea at checkout must trigger a text keyboard, not a numeric keyboard. Check input type.
- "BUY THIS FOR THEM" CTA on gift-forward PDPs and set pages must visually differ from the standard "ADD THIS ONE" CTA. Use a different label only — same button style. Joanna owns the copy.

### Build Your Set — Mobile Flow

The Build Your Set flow requires selecting 5 products from a grid. On mobile, the selection state must be obvious at thumb-scroll speed:

- Selected tile: 3px Loud red border + red checkmark in top-right corner. The selection must be obvious when scrolling at normal speed.
- The sticky bottom bar (progress + CTA) must not overlap the bottom nav bar. The sticky CTA sits above the persistent bottom nav bar, not overlapping it.
- "BUILD MY SET" CTA in the sticky bar is disabled (grey background, Ink text) until 5 products are selected, then activates (Loud red background, Air text) automatically. The visual change signals to the customer that they are ready.

### Form Optimization (Checkout)

| Field | Input type |
|-------|-----------|
| Mobile number | `type="tel"` |
| Pincode | `inputmode="numeric"` |
| Email | `type="email"` |
| Name, address | default |
| Gift note | `<textarea>` |

City and state auto-fill from pincode. Do not make the customer type these. This is the single biggest checkout friction point on Indian D2C — every character typed on a virtual keyboard is a drop-off risk.

---

## Part 10: The 6 Things the External Designer Got Wrong

These are anti-patterns observed from the original TPL site and from common Indian D2C design failures. Tobi must not reproduce them.

**1. Products on white backgrounds that look like marketplace listings.**
The original TPL site had product photography identical in style to Meesho and Flipkart listings — centered product, pure white background, no context. When a product looks like it belongs on a marketplace, the customer's brain prices it like a marketplace product. The visual system (Light + Bold) uses Paper cream (#F5F0EB) background and Air white (#FFFFFF) product tiles — never pure white as the base surface, and product photography with context and composition, not flat listing shots.

**2. Font sizes too small for opinion-forward products.**
If the sticker text in a product tile is too small to read without zooming, the Find moment cannot happen. The entire brand premise relies on recognition at a glance. If "YOUR LOSS" is 12px in the grid, it is a failed product tile. Minimum 18px for product names in tiles, 40px for H1 on PDPs.

**3. The Add to Cart button in the dead zone.**
ATC buttons placed at the top of the product information block, above the fold on desktop, become invisible on mobile after the customer scrolls. The sticky ATC bar solves this. A brand that sells impulse purchases cannot afford an ATC button the customer has to scroll to find.

**4. Navigation that describes product types instead of opinions.**
"Keychains," "Lapel Pins," "Card Stickers" — these are inventory categories, not brand statements. Customers do not arrive at TPL looking for a keychain. They arrive because the brand said something they recognised. Navigation like "The Loud Ones," "Pick a Side," "Your Energy" keeps the customer in the discovery mode that social media opened. Format browse is a secondary, returning-customer feature.

**5. Gifting buried under product categories.**
The original site had no gifting entry point. Gifters arriving from search or from a recommendation had no clear path. "For the Group Chat," the `/gifts/` hub, the "SEND THIS TO SOMEONE" CTA, and the gift-forward set pages exist specifically to solve this. A customer who cannot find a gift in 90 seconds will leave and buy something generic elsewhere.

**6. Empty cart experience with no recovery path.**
When a customer sees an empty cart with no suggestions, the purchase moment is broken. The empty cart state must show: "Nothing here yet. You have things to say — we have the stickers." with 4 direct-to-PDP product suggestions. The brand's voice must appear even in error and empty states.

---

## Part 11: P0/P1/P2 Page Priority

### P0 — Launch Blockers (must be live and QA-passed before launch)

| Page | URL | Why P0 |
|------|-----|--------|
| Homepage | `/` | Brand entry point. No launch without it. |
| Collection: The Loud Ones | `/collections/the-loud-ones` | Primary collection for self-expression buyer. Highest traffic at launch. |
| Collection: Best Sellers | `/collections/best-sellers` | Default destination from hero CTA and nav. |
| PDP (template) | `/products/[slug]` | Required for every product. One template serves all. |
| Cart | `/cart/` | Hard dependency for any purchase. |
| Checkout | `/checkout/` | Hard dependency. |
| Order confirmation | (Fynd system page) | Hard dependency. |
| Gifts hub | `/gifts/` | Gift mechanic entry point. Required for gifting conversions. |
| Sets hub | `/sets/` | Collect mechanic entry point. |
| At least 1 set page | `/sets/the-loud-ones-pack` | Collect mechanic requires at least one live set at launch. |
| 404 page | `/404/` | Every external link that misses must recover. |

### P1 — Launch-Week (ship within 7 days of launch)

| Page | URL | Why P1 |
|------|-----|--------|
| Collection: New In | `/collections/new-in` | Return visitor entry point. Activates after first post-launch product add. |
| Collection: Main Character Set | `/collections/main-character-set` | Second major collection. |
| Gift persona pages (4) | `/gifts/for-the-*` | Persona pages deepen the gift hub. |
| Remaining set pages | `/sets/main-character-set` etc. | Complete the sets catalog. |
| Build Your Set flow | `/sets/build-your-set/` | Collect mechanic completion. |
| FAQ / Help | `/faq/` | Support deflection. Every query the FAQ answers saves Dan time. |
| Order tracking | `/track/` | Post-purchase trust. |
| About | `/about/` | Brand story. Second-visit content. |

### P2 — Post-Launch (within 30 days)

| Page | URL | Why P2 |
|------|-----|--------|
| Drop hub | `/drops/` | Only needed when Drop 1 is confirmed. Build the shell; activate with drop data. |
| Artist hub | `/artists/` | Requires artist bios from Dan. Do not launch empty. |
| Artist spotlight pages | `/artists/[slug]` | Requires artist bio + portrait. 2-5 artists minimum. |
| Collections: Pick a Side, Your Energy, For the Group Chat | respective `/collections/` slugs | Secondary collections with smaller catalogs at launch. |
| Account/order history | `/account/` | Optional for returning customers. Post-purchase email link to this. |

---

## Part 12: Fynd Platform Constraints — Tobi Must Confirm Before Build

| Feature | UX Requirement | Status |
|---------|----------------|--------|
| Sticky ATC bar on mobile PDP | Fixed position bar above browser chrome | Confirm native or requires custom JS |
| Free shipping progress bar in cart | Real-time ₹499 minus cart subtotal | Confirm custom cart widget capability |
| Build Your Set bundle logic | 5 products at single discounted price, grouped in cart | Confirm Fynd bundle product type |
| Gift note field at checkout | Visible textarea, order-level field | Confirm Fynd order custom field |
| Live inventory counter on drop PDPs | Real stock count from Fynd backend | Confirm displayable stock field |
| Set as single cart line item | 5 products displayed as one grouped item | Confirm cart rendering customization |
| Bottom nav bar safe area inset | `env(safe-area-inset-bottom)` CSS | Confirm theme CSS access |
| WebP image support | Native or with JPEG fallback | Confirm Fynd image format handling |
| Collection filter canonicalization | Filter URL parameters canonical to base collection | Confirm canonical tag behavior on filter URLs |
| Drop section conditional display | Homepage section toggles between live/countdown state | Confirm Fynd section visibility control |
| WhatsApp pre-filled share URL | Custom share link with UTM injection | Confirm PDP template customization |
| Build Your Set filter chips | JavaScript-only filtering with no URL state change | Confirm no indexed filter URLs created |

Items not confirmed before build begins are escalated to Harley. Do not build workarounds — confirm the platform capability first, then design the implementation.

---

## Handoff Notes

**For Tobi:** Part 12 (platform constraints) is the first thing to check. Do not begin building the Build Your Set flow or the set cart grouping logic until Fynd bundle handling is confirmed. Start with P0 pages while constraints are being checked — homepage, PDP template, and cart page are largely standard Fynd components with CSS customization.

**For Andy (catalog):** Every product needs: (1) the sticker text as the product name, all caps, (2) an identity hook line as the first line of product description, (3) artist attribution data, (4) the correct collection tag(s), and (5) a "GIFTING PICK" tag for products that belong in gift persona pages. The Build Your Set flow requires all in-stock products to be available via the standard Fynd product list API — no special catalog configuration needed for the browsing grid.

**For Joanna (copy):** Every collection header needs a 1-line position (not a description — a statement). Every PDP needs an identity hook line. Every set page needs a "who this is for" description that fits the Gift mechanic. The "BUY THIS FOR THEM" vs. "ADD THIS ONE" CTA copy distinction is yours to own — flag to Tobi which pages get which label.

**For Sean (photography):** The homepage hero needs scattered-sticker abundance photography on Paper cream — not a single hero product. Section 3 (Find) needs close-cropped opinion shot format for the 4 featured stickers. Set pages need flat-lay photographs showing all 5 stickers together as a set object. This photography brief supersedes any dark-background direction from prior briefs.

---

*This document supersedes `artifacts/phase-3/ux-ia-wireframes.md` for the homepage, collection page, PDP, sitemap, navigation architecture, and gifting flow. The Phase 3 document remains the reference for: checkout flow (Sections 3.6-3.7), order tracking (Section 3.9), FAQ (Section 3.10), artist spotlight (Section 3.8), and the social proof strategy at launch (Part 6). All decisions trace to: Joanna (copy-system-rebrand.md), Sean (visual-identity-rebrand.md), Weiss (customer-insight-report.md), Patrick (pricing-framework.md), and Jenna (product-hierarchy.md). No decision in this document overrides Jenna's product hierarchy, Patrick's pricing, Sean's visual direction, or Tobi's platform constraints.*
