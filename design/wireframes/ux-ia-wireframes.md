<!-- last-updated: 2026-03-28 -->
# UX / Information Architecture & Page Structure

| Field | Value |
|-------|-------|
| **Phase** | 3 — Creative |
| **Producing Agent** | Kurt (UX/IA Lead) |
| **Date** | 2026-03-28 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## Preamble: The New Experience Model

This revision replaces the funnel-first UX model with a wandering-store model. The change is not cosmetic — it affects how every major page is structured, how navigation is weighted, and what the homepage is for.

The original document treated the site as a conversion funnel: hero banner at top, CTAs prominent, grid-sorted products, filter controls visible, shortest path to cart. That model is correct for a brand the customer already knows. It is wrong for a brand that needs to be discovered and understood before it is wanted.

The Product Lab needs to feel like a place worth being in before it feels like a place worth buying from. The reference points are specific: Village Vanguard (Japan), Artbox (Korea), a good independent record store on a Saturday afternoon. These are environments where discovery is the product. You do not go to a record store knowing exactly which vinyl you want. You go to see what speaks to you. The browsing is the experience. The purchase is proof that the experience worked.

This produces a different UX question. The old question was: what is the shortest path from landing to checkout? The new question is: how do we make the path worth wandering?

The commercial logic does not change. AOV above ₹499, free shipping threshold as conversion lever, COD minimum enforced, prepaid incentive shown. Find. Collect. Gift. as the purchase mechanic framing. Those stay. What changes is how the store feels to move through — and how that feeling creates the conditions for trust and purchase.

Two constraints govern every decision in this document:

1. Mobile-first, always. 80%+ of traffic. Thumb zones. 4G performance. Every layout decision is a mobile layout decision first.
2. Fynd/Commerce.com platform constraints. Wandering-store aesthetics must be built within what Fynd actually supports. The ambition of the experience model is filtered through what Tobi can implement without heroic custom development.

---

## Part 1: Sitemap

### 1.1 Full Sitemap

The sitemap is unchanged from the previous version. All URLs are retained. This section is preserved in full for Tobi's build reference.

```
theproductlab.in/
│
├── / (Homepage — Opinion Wall entry)
│
├── /collections/ (Collections index — Mood Wall browse)
│   ├── /collections/your-card-has-a-personality (Card Stickers — Hero)
│   ├── /collections/no-filter (Attitude/Humor — Hero)
│   ├── /collections/best-sellers (manually curated, 12-16 products)
│   ├── /collections/new-in (auto-populates, last 30 days)
│   ├── /collections/the-drop (current drop or countdown + archive)
│   ├── /collections/for-the-friend (Gifting occasion collection)
│   ├── /collections/festival-gifting (Seasonal — evergreen shell at launch)
│   ├── /collections/kpop-drop (contingent on original design count)
│   └── /collections/sneakerhead-edit
│
├── /products/ (Product Detail Pages)
│   └── /products/[product-slug]
│
├── /bundles/ (All bundles — separate from collections)
│   ├── /bundles/opinion-starter-pack (₹499)
│   ├── /bundles/birthday-box (₹699)
│   ├── /bundles/pin-set (₹999 — drop-specific, activates with each drop)
│   └── /bundles/two-cards-one-statement (₹399)
│
├── /the-drop/ (Drop hub page — aliases /collections/the-drop)
│   └── /the-drop/[drop-name]-[month-year] (Drop archive pages)
│
├── /shop/ (Format browse — The Catalog fallback)
│   ├── /shop/lapel-pins
│   ├── /shop/keychains
│   ├── /shop/card-stickers
│   └── /shop/stickers-magnets
│
├── /gifts/ (Gifting hub — aggregates gifting collections and bundles)
│   ├── /gifts/for-the-sarcastic-one
│   ├── /gifts/for-the-specific-one
│   ├── /gifts/first-job-gift
│   └── /gifts/impossible-to-shop-for
│
├── /artists/ (Artist spotlight hub — lightweight, not full marketplace)
│   └── /artists/[artist-slug] (Individual artist spotlight pages)
│
├── /about/ (Brand story, artist model, Bengaluru provenance)
│
├── /cart/
│
├── /checkout/
│
├── /account/ (Order tracking, history — post-purchase only)
│   └── /account/orders/[order-id]
│
├── /track/ (Public-facing order tracking — no login required)
│
└── Footer pages:
    ├── /shipping-policy/
    ├── /returns/
    ├── /faq/
    ├── /contact/
    └── /sell-your-art/
```

### 1.2 URL Design Rules

- Collection slugs are brand statements, not category labels: `/collections/no-filter` not `/collections/attitude-products`
- Product slugs follow: `/products/[design-name]-[product-type]` — example: `/products/bullshit-remover-keychain`
- Drop archive: `/the-drop/[drop-name]-[month-year]` — example: `/the-drop/this-is-fine-march-2026`
- Artist slugs follow: `/artists/[first-name]-[last-name]` or `/artists/[studio-name]`
- No parameter-driven filter URLs indexed by search engines (Fynd should canonicalize filter states to base collection URL)
- Gift guide sub-pages use personality descriptors, not product types: `/gifts/for-the-sarcastic-one` not `/gifts/keychains`

### 1.3 Page Count at Launch

| Page type | Count at launch |
|-----------|----------------|
| Homepage | 1 |
| Collections | 8 (2 Hero, 6 Support) |
| Bundles | 4 |
| Drop hub | 1 |
| Drop archive | 0 at launch; 1 per drop thereafter |
| Shop format browse | 4 |
| Gifts hub | 1 |
| Gift persona pages | 4 |
| Artist spotlight hub | 1 |
| Artist spotlight pages | 2-5 (dependent on artist data) |
| About | 1 |
| FAQ / Help | 1 |
| Order tracking (public) | 1 |
| Policy / static | 3 (shipping, returns, contact) |
| Sell Your Art | 1 |
| Product pages | ~200 (Andy's catalog scope) |
| **Total unique page types** | **~234** |

### 1.4 Page Relationship Map

```
Homepage (Opinion Wall)
  ├── → No Filter collection (via opinion text interaction)
  ├── → Your Card Has a Personality collection (via opinion text interaction)
  ├── → The Drop (via drop module)
  ├── → All collections via de-emphasised nav
  └── → Find. Collect. Gift. navigation at bottom of wall

Collection page (Mood Wall)
  ├── → Product Detail Pages (individual products)
  ├── → Bundle page (related bundle CTA below the wall)
  └── → Other collections (side-swipe reveal, not a chip row)

Product Detail Page
  ├── → Cart (add to cart)
  ├── → Artist spotlight (artist attribution link)
  ├── → Bundle page (if product is a bundle component)
  └── → Other PDPs (cross-sell section — "Also in this attitude")

Cart
  └── → Checkout

Checkout
  └── → Order confirmation → /track/ or /account/orders/

Gifts hub
  └── → Gift persona pages → Collection/PDP

Artist spotlight
  └── → Products by this artist → PDPs
```

---

## Part 2: Navigation Architecture

### 2.1 Navigation Philosophy Change

The previous model put navigation at the front of the experience. That was correct for a site where the customer knows what they are looking for.

The wandering-store model inverts this. Navigation is still there — fully functional, accessible, complete — but it is not the first thing the customer sees. The store is. The customer enters the Opinion Wall, looks around, and the navigation appears when they want it. The site reveals itself through content, not through a menu.

This requires rethinking what navigation is for. Its job in this model is not to organize discovery — the walls do that. Its job is to give the customer control once they have found something they want to follow, and to let returning visitors move directly to what they know.

### 2.2 Primary Navigation (Mobile-First)

**Mobile navigation model: minimal persistent top bar + gesture-accessible full nav**

The mobile top bar is stripped back. It carries only three elements:

```
[Logo / TPL wordmark]          [Cart icon + count]  [≡ Menu]
```

No collection labels in the top bar. No category dropdowns. No immediate categorization. The store is what you see when you arrive — not a sorted list of what is in it.

**Full nav drawer (hamburger tap, slides in from left or top):**

```
FIND
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
  For the One Who Has Everything
  Birthday Box — ₹699
  Two Cards, One Statement — ₹399

BROWSE BY FORMAT
  Lapel Pins
  Keychains
  Card Stickers
  Stickers + Magnets

---
About
Artists
FAQ
Contact
Sell Your Art
```

The nav drawer uses the Find. Collect. Gift. mechanic as its organizing structure. This is not just a navigation category system — it is the three reasons someone is on the site at all. A customer who knows which behavior they are in (finding something for themselves, collecting a drop, gifting someone) can move directly. A first-time visitor who does not know yet stays in the Opinion Wall and lets the store show them.

**Persistent bottom bar (mobile — 4 thumb-zone targets):**

```
[ Find ]  [ Collect ]  [ Gift ]  [ Cart ]
```

- Find: Opens the collections/shop sections of the nav drawer
- Collect: Goes directly to /the-drop/
- Gift: Goes directly to /gifts/
- Cart: Opens cart

This bottom bar is the practical wayfinding layer for a user who has started wandering and wants to move with intention. It appears after the first scroll on the homepage, not immediately on page load — giving the Opinion Wall a moment to be experienced before wayfinding interrupts it.

**Desktop navigation (top bar):**

```
[Logo]    Find ↓    Collect    Gift    Artists    [Search icon] [Cart icon]
```

"Find" dropdown on desktop:

```
COLLECTIONS                     BROWSE BY FORMAT
No Filter                       Lapel Pins
Your Card Has a Personality     Keychains
K-Pop Drop                      Card Stickers
Sneakerhead Edit                Stickers + Magnets
Best Sellers
New In
```

### 2.3 Navigation Design Rules

1. Collection names in nav are brand statements, never product-type labels.
2. The Drop always gets a dedicated nav item under Collect. It is the scarcity mechanic — friction to reach it kills urgency.
3. Bundles are named in nav with price. "₹499" is the decision trigger for a gifter who does not yet know which bundle. Show the price in the nav label.
4. Format browse lives under Find and is secondary to collection discovery. It serves returning customers who know what they want. It does not lead for first-time visitors.
5. The bottom bar (mobile) appears on first scroll — not on load. Do not let it interrupt the Opinion Wall's opening moment.
6. Cart icon shows item count badge when cart is non-empty. Count updates in real-time on quick-add.

### 2.4 Secondary Navigation

**Breadcrumbs on all collection and product pages:**

```
Home > No Filter > Bullshit Remover Keychain
Home > Your Card Has a Personality > No Meetings Before Coffee Card Sticker
Home > Artists > [Artist Name]
```

Breadcrumbs serve SEO and orientation. Present on every PDP, collection page, and artist spotlight page. Visually minimal — small type, muted color.

**In-collection adjacency strip:**

At the side of each collection page (desktop: persistent right rail; mobile: accessible via swipe from right edge), a minimal adjacency list shows other collections. Not a visible chip row at the top of the page — that organizes the experience around navigation again. The adjacency is accessible when the customer wants it, not foregrounded.

```
You might also be in:
No Filter
Best Sellers
New In
The Drop
```

### 2.5 Footer Structure

**Footer is a trust-building zone, not just a links dump.**

```
Column 1 — Brand                Column 2 — Shop                 Column 3 — Help
The Product Lab                 Card Stickers                   Shipping Policy
Small objects. Big opinions.    Lapel Pins                      Returns
Designed in Bengaluru.          Keychains                       FAQ
[Instagram icon]                No Filter Collection            Contact Us
[WhatsApp icon]                 The Drop                        Sell Your Art
                                Gift Bundles
                                Artists

Column 4 — Trust
Free shipping above ₹499
COD available above ₹299
Designed by independent artists
GST No: [number]
Ink Fish, Bengaluru
[Razorpay trust badge]
[UPI accepted badge]
```

The footer surfaces: city provenance, artist model, both commercial policies, and payment method recognition. These are trust signals for a zero-review brand.

---

## Part 3: Page Wireframes

### 3.1 Homepage — The Opinion Wall

The old homepage model opened on a full-screen hero banner: lifestyle image, headline, CTA button. That model works. It is also generic. Every accessory brand in India opens with a full-screen lifestyle shot and a button that says "Shop Now."

The Opinion Wall is different. There is no hero banner. There is no immediate CTA. The homepage opens on a dense field of opinion text — product names, attitude phrases, collection names — at varying sizes, overlapping slightly, arranged with deliberate asymmetry. The entry is the brand. The customer does not arrive at a sales page. They arrive at a wall of things someone cared about enough to put there.

The Wall is the opening. The products are behind it. The customer finds their way in.

**THE OPINION WALL — above the fold, full screen on mobile**

```
┌─────────────────────────────────────────┐
│  [Nav: TPL wordmark left, cart+menu     │
│   right. Minimal. Does not compete      │
│   with the wall.]                        │
│                                          │
│  BULLSHIT           enjoy the           │
│  REMOVER         SHITSHOW               │
│                                          │
│     no meetings      SELECTIVE          │
│     before coffee    LISTENER           │
│                                          │
│  IDIOT REPELLENT        straight        │
│                         outta f#_ks     │
│                                          │
│       YOUR CARD HAS                     │
│       A PERSONALITY       NO FILTER     │
│                                          │
│  small objects.                         │
│  big opinions.            [enter ↓]     │
│                                          │
└─────────────────────────────────────────┘
```

**Wall construction rules:**

- Text is set in Barlow Condensed (brand typeface). Varying weights — some bold, some condensed regular — create density variation.
- Sizes vary: the smallest phrase is body-scale, the largest fills a third of the screen width on mobile. No formula. The visual system for the exact sizing is Sean's decision (visual-identity.md); the IA decision is that sizes vary and overlap is present.
- The layout is not a grid. Phrases are placed on an irregular baseline system — staggered, with deliberate horizontal misalignment. Some phrases overlap slightly. This is intentional.
- Colors: Brand palette only (#1A1A1A base, #F5F0EB text, #E63B2E red, #F2D024 yellow). Some phrases in red. Some in yellow. Most in warm white. No gradient, no photography in this section.
- The wall is not interactive on load. It is a thing to read. After 2-3 seconds (or on first scroll), the bottom third of the wall fades slightly and the entry mechanism appears.
- "small objects. big opinions." is anchored in the wall — not a separate headline above it. It is part of the wall. The tagline is not a headline, it is a found object among the others.
- The `[enter ↓]` is a minimal scroll prompt — not a button. On mobile it is a downward chevron at the bottom center of the screen. On desktop it is the same. Small. Non-intrusive. The invitation to enter is gentle, not a CTA.

**Performance note for Tobi:** The Opinion Wall is text-only above the fold. No image LCP element in this section. LCP is the first below-the-fold content element (card sticker product images in the next section). Text renders fast. This model actually improves LCP if implemented correctly.

---

**SECTION 2 — The Record Store Browse (collections as vinyl bins)**

After the Opinion Wall is scrolled past, the customer enters the browse layer. This is not a grid. It is a horizontal experience structured like flipping through a vinyl record bin.

```
┌─────────────────────────────────────────┐
│                                          │
│  ← swipe to browse →                    │
│                                          │
│  ┌──────────────────┐                   │
│  │                  │◄── collection     │
│  │  NO FILTER       │    card, massive  │
│  │                  │    text           │
│  │  [3-4 product    │                   │
│  │   images peeking │                   │
│  │   up from the    │                   │
│  │   bottom like    │                   │
│  │   record sleeves]│                   │
│  │                  │                   │
│  └──────────────────┘                   │
│     [partial next card visible at       │
│      right edge — swipe to see more]    │
│                                          │
└─────────────────────────────────────────┘
```

**Record Store Browse construction rules:**

- Each collection card is full-height on mobile (approximately 80vh). The collection name is massive — set at 14-18vw, anchored at the top or left of the card. The name is the identity claim: "NO FILTER" "YOUR CARD HAS A PERSONALITY" "THE DROP" "FOR THE FRIEND" "SELECTIVE LISTENER" "SNEAKERHEAD EDIT."
- Product images "peek" from the bottom of the card. 3-4 product images, cropped at roughly 30-40% height, overlapping slightly at the edges like record sleeves in a bin. You see what is in the collection but you do not see all of it. You have to tap in to see the rest.
- The card background is dark (#1A1A1A or a rich tonal variant). Product images are the color. The contrast between dark card and product photography is the visual language.
- Cards are not equal size. Some collections get wider cards (hero collections — No Filter, Your Card Has a Personality). Others are narrower. The variation creates irregular rhythm — you do not know what size the next card will be. That is part of the browsing behavior.
- Swipe is horizontal. On desktop this is a scroll-based horizontal reveal. On mobile it is native swipe.
- The partial overflow at the right edge is the affordance: the next card is always partially visible to signal that there is more. The customer does not need a "swipe for more" label — the visible next card is the signal.
- There are no prices visible on the collection cards. No "Shop now" buttons on the cards. The card itself is the invitation. The tap takes you into the collection.
- Tap anywhere on a card to enter that collection. The card is the CTA.

**Collections shown in the Browse (order by default):**

1. NO FILTER (Hero — attitude/humor)
2. YOUR CARD HAS A PERSONALITY (Hero — card stickers)
3. THE DROP (current drop or countdown state)
4. FOR THE FRIEND (gifting entry)
5. NEW IN (auto-populating)
6. BEST SELLERS
7. SELECTIVE LISTENER (K-Pop, if design count supports at launch)
8. SNEAKERHEAD EDIT

The customer may not swipe through all of them. That is fine. The ones they stop at tell us something. The ones they skip also tell us something. This is the browse data the Opinion Wall cannot give.

---

**SECTION 3 — Find. Collect. Gift. (below the browse)**

After the collection browse, a minimal three-block section names the three purchase mechanics.

```
┌─────────────────────────────────────────┐
│                                          │
│  FIND.          COLLECT.       GIFT.    │
│                                          │
│  Something      The Drop.      For      │
│  that says      72 hours.      someone  │
│  exactly        Then gone.     specific. │
│  this.                                   │
│                                          │
│  [Browse]       [The Drop →]   [Gift →] │
│                                          │
└─────────────────────────────────────────┘
```

This section is functionally a navigation aid and commercially a mechanic explainer. It tells the customer which mode they are in. On mobile it stacks vertically (FIND / COLLECT / GIFT each as full-width blocks). The CTA links are minimal — text links, not full buttons.

---

**SECTION 4 — The Drop (conditional)**

**State A — Drop is live:**

```
┌─────────────────────────────────────────┐
│  [red accent]  LIVE NOW                  │
│                                          │
│  The Drop: [Drop Name]                   │
│  By [Artist Name], [City]               │
│                                          │
│  [Opinion Wall fragment — 2-3 product   │
│   names from the drop in wall format]   │
│                                          │
│  [Product images — 3-4 visible in       │
│   the counter-display format: stacked   │
│   at slight angles, overlapping]         │
│                                          │
│  [X] of [Total] remaining.              │
│  72 hours.                              │
│                                          │
│  [Shop This Drop →]                     │
│                                          │
└─────────────────────────────────────────┘
```

**State B — Between drops:**

```
┌─────────────────────────────────────────┐
│  The next drop lands in:                 │
│  [DD : HH : MM]                          │
│                                          │
│  [Last drop — shown as sold out,        │
│   product images greyed. Still          │
│   visible. The absence is the signal.]  │
│                                          │
│  [Get notified →]                       │
│  (WhatsApp/email capture modal)         │
│                                          │
└─────────────────────────────────────────┘
```

---

**SECTION 5 — The Counter Display (selected products)**

This section shows a curated selection of hero products in counter-display format — not a grid. Products are arranged as though on a physical display counter: at slight angles (0-3 degrees rotation), staggered heights, slight overlapping. The visual language is "these are objects someone arranged."

```
┌─────────────────────────────────────────┐
│                                          │
│  [product]    [PRODUCT]   [product]     │
│     ↕↕           ↕↕↕         ↕↕        │
│  [slightly  [larger,     [smaller,      │
│  rotated]   centered]    rotated]       │
│                                          │
│  On hover/tap: product lifts slightly.  │
│  Opinion text stamps over it.           │
│  Name + price appear.                   │
│                                          │
│  [See what people are buying →]         │
│                                          │
└─────────────────────────────────────────┘
```

**Counter Display construction rules:**

- Products are not on a grid. They are on an irregular baseline — some higher, some lower. The variation is within a range (approximately ±15% vertical offset).
- Rotation: each product image is rotated between -2 and +2 degrees. Not uniform. Each product has its own rotation. The overall effect is "placed by hand," not "arranged by algorithm."
- Overlap: adjacent products may overlap by 5-15px at their edges. This is intentional and should not be treated as a layout error.
- On hover (desktop) / tap (mobile): the product rises by approximately 4-6px (transform: translateY(-4px)). The opinion text from the product name stamps over the image (Barlow Condensed, all-caps, partial opacity). Name and price appear below.
- The interaction is "picking it up." The product responds to attention.
- Products shown: 5-7 manually selected by Andy. Mix of card stickers, attitude keychains, and one lapel pin. No licensed IP products in this section.
- The CTA below ("See what people are buying →") links to /collections/best-sellers.

---

**SECTION 6 — Trust Block (no-review alternative)**

```
┌─────────────────────────────────────────┐
│  Independent artists.                   │
│  Every design made by an original       │
│  artist. Not mass-produced.             │
│  Not drop-shipped.                      │
│                                          │
│  Designed in Bengaluru.                 │
│  Independent studio since 2018.         │
│                                          │
│  Ships in 2-4 days.                     │
│  Tracking via WhatsApp.                  │
│                                          │
│  Free shipping above ₹499.             │
│  COD available above ₹299.             │
│                                          │
└─────────────────────────────────────────┘
```

Trust block rules:
- No icons. Pure typography in this section. Icons make it feel like a feature list. Typography makes it feel like a statement.
- Specific, factual, brief. "Independent studio since 2018" is more trustworthy than "we care about quality."
- This section carries the weight of reviews that do not exist yet.

---

**SECTION 7 — Instagram Feed / Social Proof**

```
┌─────────────────────────────────────────┐
│  @the.product.lab                        │
│                                          │
│  [Instagram feed — 6 most recent posts  │
│   in a horizontal scroll or 3x2 grid]  │
│                                          │
│  [Follow →]                             │
│                                          │
└─────────────────────────────────────────┘
```

Same rules as before: products in context, not flat shots. The handle is the header. No "Our Feed" or "See Us on Instagram."

---

**SECTION 8 — Footer (described in Section 2.5)**

---

**Homepage decisions explained:**

| Decision | Rationale |
|----------|-----------|
| Opinion Wall replaces hero banner | The brand voice is the brand. The wall demonstrates it before any product is shown. A lifestyle banner demonstrates the product. The wall demonstrates the opinion. |
| No CTA above the fold | First-time visitors need context before they need direction. A CTA before context is friction, not guidance. |
| Record Store Browse replaces product grid sections | Collections as identity states, not categories. "NO FILTER" is a self-description. A grid of keychains is a catalog. |
| Counter Display replaces the 2x2 product showcases | Products in the counter display are handled, not displayed. The slight-angle, staggered-height layout signals "someone chose these," not "an algorithm picked these." |
| Find. Collect. Gift. names the mechanics explicitly | The three purchase modes are named so the customer can identify which one they are in. This is clarity, not categorization. |
| Bottom bar appears after first scroll | The Opinion Wall deserves a moment before navigation appears. 2-3 seconds of undivided attention. Then wayfinding is available. |
| Trust block and Instagram feed remain in same positions | These work. Do not move them. |

---

### 3.2 Collection Page — The Mood Wall

The collection page replaces the filter/sort grid with what I am calling the Mood Wall — a horizontal-first browse experience that treats a collection as an identity state to be inhabited, not a category to be sorted.

The key insight from the wandering-store model is this: "NO FILTER" is not a category. It is a self-description. The customer who taps into No Filter is not shopping for keychains. They are checking whether this collection understands them. The Mood Wall must make that self-recognition happen in the first 3 seconds of the collection page.

**Collection Page Layout:**

```
┌─────────────────────────────────────────┐
│  [Nav + breadcrumb: Home > No Filter]   │
│                                          │
│  NO FILTER                              │
│  [Collection name — massive, 18-22vw    │
│   on mobile, anchored top-left.         │
│   This is the identity claim.]          │
│                                          │
│  [Collection descriptor — 1 line,       │
│   Joanna writes. "For when you're done  │
│   pretending." Not a category label.]  │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│  [MOOD WALL — horizontal scroll]        │
│                                          │
│  ┌────────┐  ┌────────┐  ┌────────┐    │
│  │[Img]   │  │[Img]   │  │[Img]   │    │
│  │   ↕    │  │  ↕↕    │  │ ↕      │    │
│  │[slight │  │[larger │  │[rotated│    │
│  │ angle] │  │ size]  │  │ a bit] │    │
│  └────────┘  └────────┘  └────────┘    │
│  [partial next item visible →]         │
│                                          │
│  On tap: product name + price stamp.   │
│  Second tap: goes to PDP.              │
│                                          │
├─────────────────────────────────────────┤
│                                          │
│  [Below the wall: product list]         │
│  [Simple vertical stack for those who  │
│   prefer list browse over visual wall]  │
│                                          │
│  Bullshit Remover Keychain    ₹249  [+] │
│  Idiot Repellent Keychain     ₹249  [+] │
│  Enjoy the ShitShow Keychain  ₹249  [+] │
│  ...                                    │
│                                          │
│  [See all X items in this collection ↓]│
│                                          │
├─────────────────────────────────────────┤
│  [Bundle CTA if applicable]             │
│  "Get the full No Filter set →"         │
│  Opinion Starter Pack — ₹499            │
│                                          │
└─────────────────────────────────────────┘
```

**Mood Wall construction rules:**

- The horizontal scroll wall holds 6-10 products for the hero collections. Staggered heights. Slight rotations (-2 to +3 degrees). Some images overlap slightly.
- Product tiles in the wall have NO price, NO name, NO badge visible on first view. The image is the full tile. You are seeing the objects, not the catalog entries.
- On tap (first tap): the product name stamps over the image in Barlow Condensed all-caps. Price appears below. A "+" quick-add button appears at the corner.
- On second tap: navigates to PDP.
- This two-tap model gives the customer the "handling an object" feel: first you see it, then you look at it closely, then you decide.
- On desktop: hover triggers the reveal. Single click goes to PDP.

**The product list below the wall:**

The wall is the discovery layer. The list below it is for customers who have found something they want to explore more systematically, or who prefer a list to a visual layout. It is not a grid. It is a simple, full-width list showing product name, price, and a quick-add button. This serves returning customers and catalog searchers without compromising the visual wall above.

**What replaces filter/sort:**

Filters and sort controls are not removed — they are repositioned. They are accessible via a "Refine" button that appears at the top of the product list below the wall. The filter controls are in a bottom-sheet drawer on mobile, not a top-of-page row of dropdowns. Tapping "Refine" slides up the filter sheet.

The default sort is Andy's curated order. The customer can change it from the Refine drawer. This is a deliberate de-emphasis: the curated arrangement is the default state, and sorting/filtering is available for customers who need it, not promoted as the primary browse mode.

**Badge system (same as before, on the product list tiles only — not on the Mood Wall tiles):**

Badge priority (only one badge per tile):
1. "Only X left" (scarcity — highest priority when stock is low)
2. "Only at The Product Lab" (uniqueness — for card stickers always)
3. "New" (for products added in last 30 days)
4. "Best Seller" (from Best Sellers collection tag)

Badges appear in the product list tiles but NOT in the Mood Wall tiles. The wall is pure visual. The list is where catalog information lives.

**No-results state in filter:** "Nothing in this filter combination. [Clear filters] — or try [related collection name]." Never an empty grid.

---

### 3.3 Product Detail Page (PDP)

The PDP is where the customer decides. The wandering-store model changes how it opens (the image gallery is full-screen and immersive before anything else appears), but the commercial logic is identical: desire, trust, conversion. The path to cart has zero friction.

**PDP scroll sequence (mobile):**

---

**BLOCK 1 — Image Gallery (full-screen, no chrome)**

```
┌─────────────────────────────────────────┐
│  [Nav bar minimal — logo + cart only.   │
│   Breadcrumb hidden until scroll up.    │
│   The product is the full screen.]      │
│                                          │
│                                          │
│  [Primary image — full screen on mobile.│
│   No padding. No border. The product   │
│   fills the viewport.]                 │
│                                          │
│                                          │
│  [Swipe for more images]               │
│  [Thumbnail dots at bottom: • • • •]   │
│                                          │
│  [Scroll ↓ for details]               │
│                                          │
└─────────────────────────────────────────┘
```

Full-screen gallery on PDP load means the product is the first thing seen — not a headline, not a product name, not a price. The image does the desire work before any text appears. This is the record store analog: you pick up the record cover before you read the track listing.

Image requirements (same photography brief as before):
- Image 1: Clean product shot. Must read at thumbnail size.
- Image 2: Lifestyle in-context. Keychains on a real bag. Card stickers on an actual card. Pins on a jacket lapel or tote. Magnets on a fridge.
- Image 3: Detail shot. Enamel quality, print, finish. The quality-reassurance image.
- Image 4: Scale reference. A pin next to a hand. A keychain with keys attached.

On scroll down: the image gallery shrinks to a standard-size gallery (not full-screen), and the product detail blocks below become visible.

---

**BLOCK 2 — Product Identity**

```
┌─────────────────────────────────────────┐
│  Bullshit Remover Keychain              │
│                                          │
│  ₹249                                   │
│                                          │
│  Designed by [Artist Name]             │
│  [City, State]  →  (links to           │
│   /artists/[artist-slug])              │
│                                          │
│  [Identity hook line — Joanna copy]     │
│  "For the friend who filters nothing."  │
│                                          │
│  [Star icons — empty state pre-launch] │
│  Be the first to review                 │
│                                          │
└─────────────────────────────────────────┘
```

The price is shown before the identity hook. The customer who has scrolled from the gallery is in intent mode — they want to know the cost before they read more. The identity hook follows the price, not precedes it. This is a minor but important change from the previous version.

Content rules (unchanged from before):
- Product name: exact catalog name.
- Reviews: empty star widget visible. Not hidden. "Be the first to review" is honest.
- Price: show MRP. If promotional, show crossed-out MRP and promo price.
- Artist attribution: mandatory on every original-design product. If artist data unavailable: "Designed in Bengaluru by an independent artist."
- Identity hook: one line that names the person (not the product). Joanna writes this.

---

**BLOCK 3 — Variant Selection + Add to Cart**

```
┌─────────────────────────────────────────┐
│  [Variant chips if applicable]          │
│  Format: [Keychain] [Magnet] [Earring]  │
│                                          │
│  [Quantity: - 1 +]                      │
│                                          │
│  [Add to Cart — full width button]      │
│  ₹249                                   │
│                                          │
│  [Buy Now — full width, secondary style]│
│                                          │
│  Free shipping above ₹499              │
│  COD available above ₹299              │
│  Ships in 2-4 days                      │
│                                          │
└─────────────────────────────────────────┘
```

Add to Cart rules (unchanged from before):
- Add to Cart is primary (filled button). Buy Now is secondary (outline button).
- Price on the Add to Cart button.
- Trust micro-copy immediately below the CTA. Three lines maximum.
- Variant chips for cross-format families (Enjoy the ShitShow: Keychain, Magnet, Earring).

---

**BLOCK 4 — WhatsApp Share**

```
┌─────────────────────────────────────────┐
│  [WhatsApp icon] Share this →           │
│  Send this to someone who needs it.    │
│                                          │
└─────────────────────────────────────────┘
```

Pre-filled WhatsApp share text: "[Product name] from The Product Lab — ₹249. [Identity hook line]. theproductlab.in/products/[slug]"

This is a conversion element, not a social button. The WhatsApp share enables the shopcialize loop documented by Weiss (BCG: 70% of Gen Z share purchases with inner circle before buying).

---

**BLOCK 5 — Product Description**

```
┌─────────────────────────────────────────┐
│  [Accordion: Product Details — open]   │
│  ▼                                      │
│                                          │
│  [Identity/personality paragraph — 2-3 │
│   sentences. Who this is for.]          │
│                                          │
│  Material: Zinc alloy, enamel fill      │
│  Finish: Polished chrome               │
│  Size: 40mm                             │
│  Attachment: Split ring keychain        │
│                                          │
│  [Accordion: Shipping + Delivery]       │
│  ►  (closed)                            │
│                                          │
│  [Accordion: Artist Info]              │
│  ►  (closed)                            │
│  [Artist Name], [City]                  │
│  [One-line bio]                          │
│                                          │
└─────────────────────────────────────────┘
```

Content hierarchy:
1. Identity/personality paragraph (Joanna's copy)
2. Material + technical specs
3. Shipping info (accordion — collapsed by default)
4. Artist info (accordion — collapsed by default)

---

**BLOCK 6 — Free Shipping Progress + Add to Bundle**

```
┌─────────────────────────────────────────┐
│  You're ₹250 away from free shipping.  │
│  [Progress bar — 50% filled]           │
│                                          │
│  Add a card sticker to reach ₹499 →   │
│  [3 card sticker thumbnails — Counter  │
│   Display format. Slight angles.        │
│   Quick-add on tap.]                   │
│                                          │
└─────────────────────────────────────────┘
```

Logic:
- Calculate: ₹499 threshold minus current product price = shortfall
- Display: "You're ₹[X] away from free shipping"
- Suggest: 2-3 products from a different category that would bring the total to or above ₹499
- Suggestions rendered in Counter Display format — angles and stagger, not a flat product row

---

**BLOCK 7 — Cross-Sell / "Also in this attitude"**

```
┌─────────────────────────────────────────┐
│  Also in this attitude.                 │
│                                          │
│  [Counter Display format — 4-6          │
│   products from same collection.        │
│   Staggered. Slight angles.             │
│   Cross-format (keychain + magnet       │
│   + earring if applicable).]            │
│                                          │
└─────────────────────────────────────────┘
```

Cross-sell label conventions (unchanged from before):
- "Also in this attitude" for No Filter collection
- "More cards with opinions" for card sticker PDPs
- "More from [Artist Name]" for drop products
- Never "You may also like"

---

**BLOCK 8 — Bundle Suggestion (if product is a bundle component)**

```
┌─────────────────────────────────────────┐
│  [This product is in:]                  │
│  Opinion Starter Pack — ₹499           │
│  Keychain + Pin + Card Sticker          │
│  Save ₹148 vs buying separately.       │
│                                          │
│  [See the Bundle →]                    │
│                                          │
└─────────────────────────────────────────┘
```

Appears only when the current product is a bundle component.

---

**BLOCK 9 — Review Section**

```
┌─────────────────────────────────────────┐
│  Reviews                                 │
│                                          │
│  [Empty star state]                     │
│  No reviews yet.                        │
│  Be the first to share your thoughts.  │
│                                          │
│  [Write a review →]                    │
│                                          │
│  "Seen on Instagram? Tag us at          │
│  @the.product.lab"                      │
│                                          │
└─────────────────────────────────────────┘
```

At launch: empty star widget (not hidden), "Be the first to review," Instagram UGC prompt.

---

**Sticky Add to Cart bar (mobile PDP):**

Once the user scrolls past Block 3 (the main ATC block), a sticky bar appears fixed above browser chrome:

```
┌─────────────────────────────────────────┐
│  Bullshit Remover Keychain  ₹249       │
│                         [Add to Cart]  │
└─────────────────────────────────────────┘
```

Disappears when scrolled back up past the main ATC block. Tobi confirms Fynd capability.

---

### 3.4 Bundle / Set Page

Bundle pages are not collection pages with a discount badge. They are standalone product pages designed for the gifter. The layout is identical to the previous wireframe — this section has no structural changes.

```
┌─────────────────────────────────────────┐
│  [Nav + breadcrumb: Home > Bundles >    │
│   Birthday Box]                          │
│                                          │
│  [Hero image — bundle laid flat,        │
│   all contents visible, packaging       │
│   shown. Gift-ready staging.]           │
│                                          │
│  The Birthday Box                        │
│  ₹699                                   │
│                                          │
│  For the friend who has everything      │
│  except something this specific.        │
│                                          │
├─────────────────────────────────────────┤
│  What's inside:                          │
│                                          │
│  [Component image] Bullshit Remover     │
│  Keychain — usually ₹249               │
│                                          │
│  [Component image] [Pin 1] — ₹249      │
│  [Component image] [Pin 2] — ₹249      │
│                                          │
│  [Component image] [Card Sticker]       │
│  — usually ₹149                         │
│                                          │
│  [Component image] Gift packaging       │
│  — included                             │
│                                          │
│  Individual total: ₹896                 │
│  You save: ₹197                         │
│                                          │
├─────────────────────────────────────────┤
│  [Add to Cart — full width]             │
│  ₹699 · Free shipping                   │
│                                          │
│  [OR Buy Now]                           │
│                                          │
│  Ships in 2-4 days.                     │
│  Add a gift note at checkout.           │
│                                          │
└─────────────────────────────────────────┘
```

Bundle page decisions (unchanged from before):
- Show individual components with individual prices. The "you save ₹197" calculation requires visible component prices.
- Free shipping callout in the Add to Cart button — all bundles qualify.
- "Add a gift note at checkout" placed on the bundle page, not only at checkout.

---

### 3.5 Cart Page

The cart is the final pre-conversion step. The free shipping nudge does its most important work here. The cart structure is unchanged from the previous wireframe — the commercial logic is correct.

```
┌─────────────────────────────────────────┐
│  [Nav]                                   │
│                                          │
│  Your cart (2 items)                    │
│                                          │
├─────────────────────────────────────────┤
│  FREE SHIPPING PROGRESS                 │
│  [============>        ]               │
│  ₹301 added. ₹198 to go.              │
│  Add ₹198 more for free shipping.      │
│                                          │
│  [Quick-add suggestions in Counter     │
│   Display format — slight angles,       │
│   staggered. Card stickers from ₹149.] │
│                                          │
├─────────────────────────────────────────┤
│  CART ITEMS                             │
│                                          │
│  [Product image] Bullshit Remover       │
│  Keychain                               │
│  ₹249          [- 1 +]    [Remove]     │
│                                          │
│  [Product image] No Meetings Before     │
│  Coffee Card Sticker                    │
│  ₹149          [- 1 +]    [Remove]     │
│                                          │
├─────────────────────────────────────────┤
│  Order summary                          │
│  Subtotal: ₹398                         │
│  Shipping: ₹59 (add ₹101 for free)    │
│                                          │
│  [Promo code — collapsed by default]   │
│                                          │
│  Total: ₹457                            │
│                                          │
│  [Proceed to Checkout — full width]    │
│  ₹457                                   │
│                                          │
│  Secure checkout · COD available ·      │
│  WhatsApp tracking                      │
│                                          │
├─────────────────────────────────────────┤
│  COMPLETE YOUR ORDER                    │
│                                          │
│  "One more thing and you get free       │
│  shipping."                              │
│                                          │
│  [Bundle suggestion or individual       │
│   product suggestions in Counter       │
│   Display format]                       │
│                                          │
└─────────────────────────────────────────┘
```

Cart decisions (unchanged from before):
1. Free shipping progress bar is the FIRST element below nav — not at the bottom.
2. Quick-add suggestions: products in ₹149-199 range from a category not yet in cart. Shown in Counter Display format (slight angles) so they feel like the store, not an algorithm.
3. Bundle replacement logic: if cart contains bundle components, suggest the bundle.
4. Promo code field collapsed by default (prevents discount search behavior).
5. Checkout button shows price.
6. Trust micro-strip below checkout button.

---

### 3.6 Checkout Flow

The checkout is functional, not experiential. The wandering-store aesthetic stops at the cart — checkout is where clarity and speed take over. No visual experimentation here. The layout is identical to the previous wireframe.

**Step 1 — Contact + Delivery Address**

```
┌─────────────────────────────────────────┐
│  Checkout                                │
│  [Step indicator: 1 Address 2 Payment]  │
│                                          │
│  Contact                                 │
│  [Mobile number — numeric keyboard]     │
│  "We'll send your order update here"    │
│  [WhatsApp checkbox — pre-checked]      │
│  "Get order updates on WhatsApp"        │
│                                          │
│  Delivery address                        │
│  [Name]                                  │
│  [Address line 1]                        │
│  [Address line 2 — optional]            │
│  [Pincode — numeric keyboard]           │
│  "Checking delivery availability..."   │
│  [City — auto-fills from pincode]       │
│  [State — auto-fills from pincode]      │
│                                          │
│  [Continue to Payment →]               │
│                                          │
└─────────────────────────────────────────┘
```

Address step decisions (unchanged):
- Phone number first.
- WhatsApp consent pre-checked, framed as a benefit.
- Pincode serviceability check inline as customer types.
- City and state auto-fill from pincode.

**Step 2 — Payment Method**

```
┌─────────────────────────────────────────┐
│  Payment                                 │
│  [Step indicator: 1 Address 2 Payment]  │
│                                          │
│  [Order summary — collapsed, tap to     │
│   expand]                               │
│  2 items · ₹457                         │
│                                          │
│  HOW DO YOU WANT TO PAY?               │
│                                          │
│  [UPI — featured, first position]       │
│  Pay with any UPI app                   │
│  [UPI logos: GPay, PhonePe, Paytm]     │
│  Save ₹30 — Pay online                 │
│                                          │
│  [Credit / Debit Card]                  │
│  Save ₹30 — Pay online                 │
│                                          │
│  [Net Banking]                          │
│  Save ₹30 — Pay online                 │
│                                          │
│  [Cash on Delivery]                     │
│  Available on orders above ₹299        │
│                                          │
│  [Place Order →]                        │
│  Total: ₹457 · or ₹427 with UPI        │
│                                          │
│  [Razorpay logo] Secured by Razorpay   │
│  [Visa] [Mastercard] [RuPay] [UPI]     │
│                                          │
└─────────────────────────────────────────┘
```

Payment decisions (unchanged):
- UPI is first, not last.
- "Save ₹30" shown on every online method.
- COD is last, below all prepaid methods.
- COD minimum ₹299 enforced.
- Place Order button shows both totals: full price and UPI-discounted price.

**Gift note field (on payment step):**

```
┌─────────────────────────────────────────┐
│  [Gift note — visible, not collapsed]   │
│  "Add a personal note"                  │
│  [Textarea: 120 char limit]             │
│  "This will be included in the package" │
└─────────────────────────────────────────┘
```

**Step 3 — Order Confirmation**

```
┌─────────────────────────────────────────┐
│  You picked something good.              │
│                                          │
│  Order #[number]                         │
│  [Product thumbnails — what was bought] │
│  Estimated delivery: [Date range]       │
│                                          │
│  We'll WhatsApp you when it ships.      │
│                                          │
│  [Follow us on Instagram]              │
│  See what's coming next.               │
│                                          │
│  [Continue shopping →]                 │
│                                          │
└─────────────────────────────────────────┘
```

Confirmation decisions (unchanged): "You picked something good." is brand voice, not template copy. No upsell on confirmation. Instagram follow as community growth. WhatsApp confirmation fires in background immediately.

---

### 3.7 Gift Guide Flow

The gifting hub and gift persona pages are unchanged from the previous wireframe. The commercial logic is correct. The persona framing ("The one who has no filter") is the right language. The budget default of ₹299-499 is correct per Weiss's research.

The one visual update: product tiles in the gift persona pages use the Counter Display format — slight angles, staggered heights — rather than a flat grid. The rest of the layout is identical.

**Gifts Hub Page (/gifts/):**

```
┌─────────────────────────────────────────┐
│  [Nav]                                   │
│                                          │
│  Gifts for people with opinions.         │
│  Which is everyone you actually like.   │
│                                          │
│  Who are you shopping for?              │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  The one who has no filter.       │   │
│  │  [3 product images — Counter     │   │
│  │   Display format: angles,        │   │
│  │   staggered]                     │   │
│  │  → [Shop their vibe]             │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  The one who is obsessed with    │   │
│  │  one specific thing.             │   │
│  │  [3 product images — Counter     │   │
│  │   Display format]                │   │
│  │  → [Shop their obsession]        │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  The one who just got their      │   │
│  │  first job.                      │   │
│  │  [3 product images]              │   │
│  │  → [Shop the milestone]          │   │
│  └──────────────────────────────────┘   │
│                                          │
│  ┌──────────────────────────────────┐   │
│  │  The one who is impossible to    │   │
│  │  shop for.                       │   │
│  │  [Bundle image — Birthday Box]   │   │
│  │  → [Let us decide]              │   │
│  └──────────────────────────────────┘   │
│                                          │
├─────────────────────────────────────────┤
│  Or browse by budget:                   │
│  [₹149-299]  [₹299-499]  [₹499+]       │
│                                          │
├─────────────────────────────────────────┤
│  [Featured bundles]                     │
│  Birthday Box ₹699                      │
│  Opinion Starter Pack ₹499             │
│                                          │
└─────────────────────────────────────────┘
```

**Gift Persona Page (/gifts/for-the-sarcastic-one):**

Identical to previous wireframe except the product grid is rendered in Counter Display format (slight angles, staggered heights) rather than a flat 2-column grid. All other rules unchanged — persona naming, budget default, bundle upgrade prompt.

---

### 3.8 Artist Spotlight Pages

Artist spotlight pages are unchanged from the previous wireframe. The human proof behind "made by independent artists" is the same claim it was. The layout is correct. No visual format changes to these pages.

---

### 3.9 Order Tracking Page

Unchanged from the previous wireframe. No account required. Order number + mobile number authentication. WhatsApp as primary tracking channel. Web page as fallback.

---

### 3.10 FAQ / Help Page

Unchanged from the previous wireframe. Accordion layout. Topic-organized. WhatsApp as escalation path. Joanna writes all answers in brand voice.

---

## Part 4: User Flow Diagrams

The user flows are updated to reflect the new entry points. The commercial mechanics — cart, checkout, payment sequencing — are unchanged. What changes is the top of the funnel.

### 4.1 Primary Flow: Instagram Discovery Buyer (updated)

```
ENTRY POINT: Instagram Reel or Post
  ↓
  [Viewer sees: lifestyle product content.
   Card sticker reveal OR keychain on bag.
   Brand voice in caption.]
  ↓
  DECISION POINT A: Interested or not?
  → Not interested: Exit
  → Interested: Taps link in bio or Story link
  ↓
SITE ENTRY: Homepage (Opinion Wall) OR direct to collection page

  PATH A — Arrives at homepage:
  Customer sees the Opinion Wall.
  Reads opinion phrases.
  Recognizes something.
  Scrolls down.
  Enters the Record Store Browse.
  Taps a collection card.
  ↓

  PATH B — Arrives at collection page (Instagram link was to specific collection):
  Customer lands on Mood Wall.
  Sees the collection name large.
  Sees products in the wall.
  ↓

COLLECTION PAGE (Mood Wall)
  Customer question: "Is this brand real? Do I trust it?"
  UX answer: Collection name as identity claim + products peeking like record sleeves
  ↓
  DECISION POINT B: Tap a product or leave?
  → Leaves: Cart abandonment flow (4.6)
  → Taps: First tap reveals product name + price.
           Second tap → PDP
  ↓
PDP
  [Full-screen image gallery first — no text yet]
  Scroll reveals: product identity, price, ATC
  Customer question: "Is this actually good? Worth ₹249?"
  UX answer: Lifestyle image + artist story + identity hook
  ↓
  DECISION POINT C: Share for validation or proceed?
  → Shares on WhatsApp: Secondary validation loop (4.2)
  → Proceeds: Adds to cart
  ↓
CART
  Free shipping progress bar FIRST
  Counter Display quick-add suggestions
  ↓
  DECISION POINT D: Checkout or add more?
  → At ₹398: Sees "₹101 to free shipping" → adds card sticker → ₹547
  → Already above ₹499: Proceeds
  ↓
CHECKOUT (2 steps)
  UPI prominent. Cards. COD last.
  Prepaid incentive: "Pay online and save ₹30"
  ↓
ORDER CONFIRMATION
  "You picked something good."
  WhatsApp confirmation fires
  Instagram follow prompt
```

### 4.2 Secondary Validation Loop: WhatsApp Share

Unchanged from previous. The mechanism is correct.

```
Customer on PDP → taps "Share this →" WhatsApp button
  ↓
WhatsApp opens with pre-filled: product name + price + identity hook + URL
  ↓
Customer sends to friend
  ↓
Friend receives → taps → lands on PDP
  ↓
  DECISION POINT: Friend buys independently? (zero CAC acquisition)
  → No: Friend responds with validation
  ↓
Original customer: peer validation received → converts
```

### 4.3 Gifter's Journey

Unchanged from previous. The persona-shelf logic and budget defaulting are correct.

### 4.4 Micro-Collector's Drop Flow

```
ENTRY POINT: Instagram — drop announcement
  ↓
LANDING: /the-drop/ (drop is live)
  Opinion Wall fragment with drop product names
  Products in Counter Display format — at angles, overlapping
  Countdown + inventory count
  Pin Set as featured bundle above individual pins
  ↓
  DECISION POINT: Pin Set (complete) or individual pins?
  → Pin Set ₹999: Direct to cart → fast checkout
  → Individual pins ₹299 each: Browse in Counter Display
  ↓
INDIVIDUAL PIN PDP
  Full-screen image gallery
  "Part of [Drop Name]" shown
  Live inventory: units remaining
  All 5 drop pins shown in cross-sell (Counter Display format)
  ↓
ADD TO CART
  If 1-4 individual pins in cart:
  "Add the full set and save ₹496. Pin Set — ₹999."
  ↓
CHECKOUT
  UPI first — motivated collectors use UPI, fast
  No extended upsell — Micro-Collector is in buying mode
  ↓
POST-PURCHASE
  "You got it. [Drop name]. [Artist] edition."
  WhatsApp confirmation
  "The next drop is [date]. Follow us to be first."
```

### 4.5 Return Visitor Flow

Unchanged from previous. Return visitors navigate directly — the bottom bar and nav serve them. The Opinion Wall is familiar rather than opaque on a second visit.

### 4.6 Cart Abandonment Recovery Flow

Unchanged from previous. WhatsApp 2-hour window. One follow-up at 24 hours. Then stop.

### 4.7 Post-Purchase Flow

Unchanged from previous. WhatsApp primary. Review request 3 days post-delivery, not post-shipping. Repeat purchase nurture framed as drop announcement, not generic "shop again."

---

## Part 5: Mobile-First Decisions

### 5.1 Thumb Zone Navigation

| Element | Position | Rationale |
|---------|----------|-----------|
| Persistent bottom nav bar | Fixed bottom (appears after first scroll) | 4 thumb-zone targets always reachable once browsing begins |
| Bottom nav delay on homepage | Absent on load, appears after first scroll | Gives Opinion Wall undivided attention on entry |
| Add to Cart button | Bottom of the ATC block | Not at the top of the page |
| Hero CTA (Find/Collect/Gift) | Bottom 40% of their sections | Reachable without grip shift |
| Checkout button in cart | Bottom of cart summary | Natural scroll endpoint |
| Sticky ATC bar (PDP) | Fixed above browser chrome | Appears after scroll past main ATC |

### 5.2 Mood Wall Swipe Behavior

The horizontal Mood Wall on the collection page is the primary mobile browse interface. Swipe rules:

- Native swipe gesture (no arrows, no buttons)
- Partial overflow at right edge (20-30% of next item visible) is the affordance signal
- Momentum scroll: the wall decelerates naturally, not snaps to a fixed grid
- On the Record Store Browse (homepage section 2): same rules — momentum, partial overflow, no snap

### 5.3 Counter Display Touch Behavior

The Counter Display format (slightly-angled, staggered products) uses two-tap behavior on mobile:

- First tap: product rises slightly (translateY -4px), name and price appear
- Second tap: navigates to PDP
- Tap outside the product (anywhere on the background): dismisses the reveal, no navigation

On desktop: hover triggers the reveal. Single click navigates to PDP.

The two-tap model prevents accidental navigation when a customer is scanning the display.

### 5.4 Opinion Wall Performance

The Opinion Wall is text-only above the fold. No images in this section. LCP target applies to the first image below the fold — the product images in the Record Store Browse.

- All text in the Opinion Wall is in system-safe web fonts or preloaded (Barlow Condensed via Google Fonts with `preload` hint)
- No JavaScript required for the Opinion Wall itself — it is pure CSS layout
- LCP element: first product image in the Record Store Browse, lazy-loaded only AFTER the Opinion Wall
- Target: LCP under 3 seconds on 4G. Opinion Wall-first design helps this by keeping the above-fold content text-only.

### 5.5 Image Loading Strategy for 4G

- WebP format for all product images. 25-35% smaller than JPEG at equivalent quality.
- Opinion Wall images: none. This section loads instantly.
- Record Store Browse: first card loads immediately. Remaining cards lazy-load on swipe approach (preload when within 1 card width of viewport edge).
- PDP gallery: first image (full-screen) is LCP — preloaded. Remaining images load on swipe.
- Collection Mood Wall: first 4 products load immediately. Remaining lazy-load on swipe approach.
- Counter Display: all products load on section scroll-into-viewport.

### 5.6 Swipe Behaviors

| Element | Swipe behavior |
|---------|---------------|
| Opinion Wall | Vertical scroll only |
| Record Store Browse (homepage) | Horizontal swipe, momentum, partial overflow |
| Mood Wall (collection page) | Horizontal swipe, momentum, partial overflow |
| PDP image gallery | Horizontal swipe, left/right |
| Cross-sell row (PDP) | Horizontal swipe, Counter Display tiles, partial overflow |
| Quick-add suggestions (cart) | Horizontal swipe |
| Collection grid / product list | Vertical scroll only |

### 5.7 Form Input Optimization

| Field | Keyboard type |
|-------|--------------|
| Phone number | `type="tel"` — numeric |
| Pincode | `inputmode="numeric"` |
| Email | `type="email"` |
| Name, address | Default text |
| Gift note | `textarea` — multiline |

---

## Part 6: Social Proof Strategy at Launch

### 6.1 The Problem

Zero reviews on launch day. Every trust mechanism that depends on reviews must be replaced with something that does equivalent work.

### 6.2 Replacement Signals

| What reviews normally do | What replaces it |
|--------------------------|-----------------|
| Confirm product quality | Full-screen lifestyle photography on PDP — product in context at high resolution |
| Confirm brand legitimacy | Artist attribution + "Designed in Bengaluru since 2018" + GST number |
| Confirm others have bought | "Best Sellers" collection (manually curated — does not require transaction data) |
| Confirm product fits the person | Identity hook lines on every PDP ("For the friend who...") |
| Confirm delivery worked | "Ships in 2-4 days / WhatsApp tracking" on every page |
| Confirm the brand has personality | The Opinion Wall itself — the site demonstrates voice before any product is seen |

### 6.3 "Spotted in the Wild" Section on PDP

```
┌─────────────────────────────────────────┐
│  Spotted in the wild                     │
│                                          │
│  [Instagram UGC — if any from           │
│   pre-launch seeding]                   │
│                                          │
│  Tag @the.product.lab to be featured.  │
│                                          │
└─────────────────────────────────────────┘
```

If no UGC at launch: hidden. Replaced by "Be the first to review" invitation.

### 6.4 Artist Attribution as Trust

Artist name + city + Instagram handle (where available) = checkable claim. The customer can verify the artist is real in two taps. Checkability is the trust signal.

### 6.5 Review Seeding Plan

| Source | Mechanism | Target count |
|--------|-----------|-------------|
| Pre-launch gifting | Gift 20-30 products before launch, request honest reviews | 10-20 reviews |
| Friends / family orders | Full price orders, personal review request | 5-10 reviews |
| Post-launch WhatsApp review request | 3 days post-delivery. Estimated 10-20% conversion | 20 reviews in first 60 days |
| Instagram DM to UGC taggers | Personal DM to advocates, high conversion | 5-10 reviews |

Target: 20 reviews live within 60 days.

---

## Part 7: Trust and Friction Reduction

### 7.1 Trust Signals by Page

| Page | Trust signals present |
|------|----------------------|
| Homepage Opinion Wall | Brand voice IS the trust signal — specificity and attitude confirm real brand |
| Homepage Record Store Browse | Artist attribution in collection cards, collection names as identity claims |
| Collection page | Collection name as identity claim, Mood Wall with artist-attributed products |
| PDP | Full-screen product photography, artist attribution (linked), empty review widget (honest), trust micro-copy below ATC |
| Cart | Trust micro-strip (Secure checkout, COD, WhatsApp tracking), Razorpay signal |
| Checkout address step | Pincode serviceability check (real-time logistics signal) |
| Checkout payment step | Razorpay logo, UPI/card logos, "Secured by Razorpay" |
| Order confirmation | "We'll WhatsApp you when it ships" |
| Footer | GST number, Ink Fish Bengaluru, artist model claim, COD + free shipping policies |

### 7.2 Payment Security

```
[Razorpay logo]
Secured by Razorpay — India's most trusted payment gateway
[Visa] [Mastercard] [RuPay] [UPI] [Net Banking] [PayLater]
```

### 7.3 Shipping Timeline Clarity

- PDP: "Ships in 2-4 days" in trust micro-copy
- Cart: "Ships in 2-4 days" in trust micro-strip
- Checkout address step: estimated delivery date once address is entered
- Order confirmation: "We'll WhatsApp you when it ships"
- Shipping confirmation WhatsApp: tracking link + estimated delivery date

### 7.4 COD Policy Visibility

Visible before checkout — PDP trust micro-copy, cart trust micro-strip, footer, FAQ.

### 7.5 Return Policy Visibility

FAQ, PDP accordion (Shipping + Delivery section includes: "For damaged or incorrect items, we make it right. Contact us within 48 hours."), cart trust micro-strip.

---

## Part 8: Friction Points and Solutions

### 8.1 Friction Inventory

| Friction Point | Severity | Intervention |
|----------------|----------|-------------|
| Zero reviews on day one | Critical | Opinion Wall demonstrates brand voice. Trust block carries the work. Pre-launch seeding (20-30 products). Instagram UGC surrogate. |
| New-to-brand visitor does not know where to start | High | Opinion Wall is orientation. Record Store Browse is discovery. Find. Collect. Gift. names the modes. Bottom bar navigation appears after orientation is complete. |
| Two-tap behavior on Mood Wall feels unfamiliar | Medium | First-tap reveal is instant (no animation delay). Name + price appear clearly. Second tap is clearly "enter" — confirmed by navigation. |
| COD minimum ₹299 | High | Clear policy display at PDP, cart, footer. "Add ₹X to enable COD" at checkout with add-on suggestions. |
| No return policy beyond defective items | High | Honest, simple display. "We make it right if something arrives wrong." |
| Shipping cost for orders below ₹499 | Medium | Free shipping progress bar. ₹59 shown with the incentive to avoid it, not as a fee. |
| Finding the right gift | Medium | /gifts/ hub with persona shelves. Counter Display format for product previews. Gifter never browses the full catalog. |
| No lifestyle photography at launch | Critical | Launch gate. If lifestyle photography is not available for hero products, the launch should not proceed. Escalated to Harley as hard dependency. |
| Counter Display layout may not render correctly on all Android browsers | Medium | Tobi tests rotation and overlap on Android Chrome, Samsung Internet, and Firefox Android before launch. |

### 8.2 Mobile-Specific Friction

| Mobile Friction | Intervention |
|-----------------|-------------|
| Bottom nav competing with browser safe area | `padding-bottom: env(safe-area-inset-bottom)` on persistent nav bar |
| Counter Display rotation causing touch-target overlap | Stagger the vertical offsets, not just rotation. Each product tile has a minimum 44x44px touch target regardless of visual overlap. |
| Two-tap behavior on Mood Wall vs. accidental navigation | First tap: only reveals info. Navigation only on second tap. Tap-outside dismisses without navigation. |
| Opinion Wall text overflow on small screens (<320px) | Sizes reduce proportionally. The smallest Opinion Wall text is never below 12px. Test on iPhone SE (375px wide) as minimum target. |
| PDP full-screen image on load may delay first interaction | Image preloaded. Scroll prompt appears immediately. User can scroll past the gallery without waiting for the image to load. |

---

## Part 9: Conversion Optimization Backlog

### 9.1 Launch-Critical (Must be live on Day 1)

| # | Item | Owner | Rationale |
|---|------|-------|-----------|
| 1 | Free shipping progress bar in cart (real-time) | Tobi | Highest-impact AOV lever. |
| 2 | WhatsApp share button on every PDP | Tobi | Enables shopcialize conversion loop. |
| 3 | Sticky Add to Cart bar on mobile PDP | Tobi | Reduces scroll-to-find-CTA friction on long PDPs. |
| 4 | COD ₹299 minimum enforcement at checkout | Tobi | Hard requirement from Patrick. |
| 5 | Prepaid ₹30 discount visible at payment step | Tobi | Nudge toward prepaid at decision moment. |
| 6 | WhatsApp post-purchase confirmation (all orders) | Raj / Tobi | Trust signal for COD buyers. |
| 7 | Artist attribution on every original-design PDP | Andy | Brand claim requires this before any traffic arrives. |
| 8 | Empty review widget ("Be the first to review") | Andy | Honest trust signal. Do not hide. |
| 9 | "Only at The Product Lab" badge on card stickers | Andy | Uniqueness signal for the hero product. |
| 10 | Gift note field at checkout | Tobi | Gifter's primary need. Missing = gifting conversion loss. |
| 11 | Quick-add button on product list tiles (below Mood Wall) | Tobi | Reduces friction for return buyers scanning the list view. |
| 12 | Pincode serviceability check at checkout | Tobi | Prevents post-order failure. Builds trust in logistics. |
| 13 | Opinion Wall text layout (mobile) | Tobi | The homepage is the brand statement. It must render correctly on mobile before launch. |
| 14 | Two-tap behavior on Counter Display + Mood Wall | Tobi | Core discovery mechanic. Must be tested on Android before launch. |

### 9.2 Post-Launch Priority (30-day window)

| # | Item | Owner | Rationale |
|---|------|-------|-----------|
| 15 | A/B test: two-tap vs. one-tap on Mood Wall tiles | Kurt / Tobi | Test whether two-tap reduces accidental navigation. If two-tap conversion is lower than one-tap, revert to one-tap. |
| 16 | Bundle upgrade suggestion in cart | Tobi | "Upgrade to Opinion Starter Pack" logic. |
| 17 | First-purchase discount ladder visible in cart | Tobi | Patrick's tiered discount at cart level. |
| 18 | Review request WhatsApp flow (3 days post-delivery) | Raj | Social proof accumulation starts at launch. |
| 19 | Drop notification signup (WhatsApp / email capture) | Tobi | Captures high-intent visitors between drops. |
| 20 | Live inventory counter on drop PDPs | Tobi | Real scarcity signal from Fynd backend. |
| 21 | Cross-format variant chips on PDP | Andy / Tobi | "Also available as: magnet, earring" drives multi-format orders. |
| 22 | Cart abandonment WhatsApp recovery (2-hour window) | Raj | Primary recovery channel for mobile abandoners. |
| 23 | Artist spotlight pages (2-5 artists at launch) | Andy / Joanna | Trust + SEO + brand story. Requires artist bios from Dan. |
| 24 | Instagram feed embed on homepage | Tobi | Social proof surrogate. Confirm Fynd widget compatibility. |

### 9.3 Data-Driven Backlog (60-90 days, requires real analytics)

| # | Item | Data trigger | Expected intervention |
|---|------|--------------|-----------------------|
| 25 | Mood Wall engagement vs. product list conversion | Clarity heatmaps + GA4 | If more conversions come from list than wall, promote list view. If wall engages but does not convert, add a softer CTA to wall tiles. |
| 26 | Opinion Wall time-on-page | GA4 engagement time + Clarity scroll depth | If customers bounce off the Opinion Wall before the browse: simplify wall, make the enter affordance more prominent. If they spend 10+ seconds: the wall is working, leave it. |
| 27 | Counter Display hover-to-purchase rate | GA4 events: product_hover → add_to_cart | If hover rate is high but add-to-cart rate is low: the display format creates curiosity but not purchase intent. Test moving price to be always visible. |
| 28 | Collection card tap-through rate (Record Store Browse) | GA4 events: collection_card_tap | Which collection cards are getting tapped most? Feature those first in the browse order. If "Best Sellers" gets more taps than "No Filter," the brand name is not yet doing the work. |
| 29 | PDP full-screen gallery vs. conversion | GA4: gallery scroll → add_to_cart timing | If customers scroll past the gallery within 1 second and add to cart without engaging with images, the full-screen gallery is not the conversion driver — the product name is. Test a faster-scrolling gallery. |
| 30 | Bundle conversion by touchpoint | Fynd order data | If bundles convert better from cart than /bundles/ page: increase prominence of bundle suggestion in cart. |
| 31 | COD to prepaid shift rate | Payment method data monthly | If shift below 5%/month: more aggressive UPI incentive at payment step. |
| 32 | Instagram source conversion rate | GA4 UTM + session conversion | If Instagram traffic converts below 1%: test landing on collection page vs. homepage Opinion Wall. |
| 33 | WhatsApp share to new customer attribution | UTM parameters in share links | Quantify the shopcialize loop. If >10% of new orders come from share links: invest in share button placement and copy. |

---

## Part 10: Platform Notes for Tobi (Build Lead)

The wandering-store model adds three implementation requirements to the original list. All previous platform questions remain. New items are marked [NEW].

| Feature | UX Requirement | Fynd Capability Question |
|---------|----------------|--------------------------|
| Opinion Wall CSS layout | Text at irregular sizes, irregular baseline, slight overlaps | Pure CSS layout — no JavaScript needed. Tobi builds as a custom homepage section with absolute-positioned text elements. Fynd's custom CSS injection should support this. |
| [NEW] Record Store Browse — horizontal collection cards | Full-height cards, collection name massive, product images peeking from bottom, horizontal momentum scroll | Does Fynd's homepage builder support a full-height horizontal scroll section, or does this require a custom section template? |
| [NEW] Counter Display format on product tiles | Slight rotation (-2 to +2 degrees), staggered vertical offsets, overlap at edges | CSS `transform: rotate()` and irregular margin/padding values. Should work in standard Fynd CSS. Tobi tests for rendering across browsers. Minimum 44x44px touch target on each tile regardless of visual overlap. |
| [NEW] Two-tap behavior on Mood Wall and Counter Display | First tap: reveal name + price. Second tap: navigate to PDP. Tap outside: dismiss. | Requires custom JavaScript on collection page tiles. Fynd PDP link behavior is one-click by default. Tobi confirms whether this can be intercepted per-tile or requires a custom tile template. |
| [NEW] Bottom nav delay on homepage | Bar absent on load, appears after first scroll | CSS: `opacity: 0` on load, JavaScript scroll listener changes to `opacity: 1`. Simple implementation. |
| Free shipping progress bar in cart | Real-time ₹499 minus cart subtotal | Does Fynd's cart template support custom cart summary logic? |
| Sticky Add to Cart bar on mobile PDP | Appears after scrolling past main ATC button | Does Fynd PDP theme support fixed-position sticky bar? |
| Live inventory counter on drop PDPs | Real stock count from Fynd inventory | Does Fynd expose product stock as a displayable field on PDPs? |
| Bundle pages as distinct product pages | Bundles are separate SKUs with component mapping | Does Fynd support a bundle product type with component display? |
| Cross-format variant navigation (chips) | On "Enjoy the ShitShow" PDP: chips linking to magnet, earring variants | Does Fynd's variant system support cross-product linking (across SKUs)? |
| Conditional homepage sections | Drop section changes based on whether drop is active | Does Fynd support conditional section display, date-triggered or manually toggled? |
| Pre-filled WhatsApp share URL | Share button generates WhatsApp link with product name + price + identity hook + URL | Standard WhatsApp deep link. Tobi confirms UTM parameter injection into the share URL. |
| Filter state canonicalization | Collection filter URLs canonical to base collection URL | Does Fynd handle filter parameter canonicalization natively? |
| Gift note field at checkout | Order-level text field | Does Fynd checkout support custom order-level fields? |
| Pincode serviceability inline check | Real-time check as pincode is entered | Does Fynd's checkout call serviceability API inline? |
| WhatsApp Business API integration | Post-purchase confirmation + review request | Does Fynd have native MSG91 or WhatsApp Business integration? |
| CSS safe area for bottom nav bar | `padding-bottom: env(safe-area-inset-bottom)` | Confirm Fynd theme supports CSS environment variable for safe area insets. |

**Fynd implementation priority for the new elements:**

1. Opinion Wall (homepage above fold) — text layout, CSS only. Lowest implementation risk.
2. Bottom nav delayed appearance — simple scroll listener. Low risk.
3. Counter Display tile format — CSS rotation and stagger. Medium risk (cross-browser testing needed).
4. Two-tap behavior on collection tiles — JavaScript required. Highest implementation risk. Tobi must confirm this is achievable in Fynd's theme system before the Mood Wall design is finalized. If Fynd cannot intercept the first tap per-tile without a full custom tile template, the fallback is single-tap (standard behavior) and the Counter Display format is retained for visual style only.
5. Record Store Browse — horizontal scroll section with momentum. Confirm with Tobi whether this uses a custom Fynd section template or a third-party widget.

---

## Part 11: Handoff Notes

**For Tobi (Build Lead):** Platform capability questions in Part 10 must be answered before any homepage or collection page build begins. The four new questions (Opinion Wall, Counter Display tile behavior, two-tap interaction, Record Store Browse) are the highest uncertainty items. If two-tap behavior is not achievable in Fynd without excessive custom development, fall back to single-tap with the Counter Display visual format retained for aesthetic consistency. The wandering-store feel is mostly delivered by visual layout (angles, overlaps, stagger) — the two-tap interaction is an enhancement, not a requirement.

**For Julie (UI System Lead):** The Opinion Wall is a new page section requiring a visual specification from Sean (layout sketch or Figma frame). The angles, sizes, and overlaps in the wireframe description are IA decisions — the exact visual execution is Sean's and Julie's. Key constraints: (1) text must be legible at minimum 12px on 375px-wide screens, (2) the overlap between phrases must not create readability collision — overlapping shapes and lines are fine, overlapping letter-forms are not. The Record Store Browse cards require the collection name to be legible at 14-18vw — confirm with Sean that this scale is consistent with the Barlow Condensed treatment in the visual identity. Counter Display tile rotation values (-2 to +2 degrees) are CSS — not Figma rotation that would affect export. Confirm with Tobi how these values are implemented.

**For Andy (Catalog Operations):** The product list view below the Mood Wall is the catalog layer. Every collection must have a clean, sortable product list below the visual wall. Collection build order from Jenna's hierarchy applies. Before any collection goes live: confirm artist attribution data for every hero product. Bundle component mapping in Fynd is unchanged. Counter Display suggestions in cart (quick-add) need Andy to tag 3-4 recommended cross-category products per hero product in Fynd — this is the same manual curation task as the previous "related products" cross-sell, just rendered in the Counter Display format.

**For Joanna (Copywriter):** Every placeholder in the wireframes is a copy brief. New briefs from this revision:
- Opinion Wall phrases: the wall contains product names already in the catalog ("Bullshit Remover," "No Meetings Before Coffee," etc.) plus collection names. Joanna confirms which existing product names are strong enough for the wall and identifies any gaps (the wall may need 2-3 additional attitude phrases beyond existing product names to fill the visual density).
- Find. Collect. Gift. block: three short descriptors — one line per mechanic. Examples in the wireframe are placeholders.
- Record Store Browse collection descriptors: one line per collection card, shown beneath the massive collection name. The tone is self-description ("For when you're done pretending") not a category label ("Attitude products").
- Counter Display product names: these appear on first tap. They must work as stamps — all-caps Barlow Condensed. If a product name breaks awkwardly at all-caps, flag to Andy for a display-name override in the product metadata.

**For Sean (Creative Director):** Photography requirements are embedded throughout Part 3 and are unchanged from the original wireframe. New visual decisions required from this revision:
- Opinion Wall sketch or Figma frame: the size relationships, positions, and color distribution of phrases. This is a visual identity decision, not an IA decision. Kurt has defined the rules (varying sizes, irregular baseline, overlap permitted, brand palette only). Sean executes the specific layout.
- Record Store Browse card design: background color (dark tonal variant), collection name treatment (massive Barlow Condensed, anchored top-left or top-center), product image peaking height (approximately 30-40% of card height). Sean finalizes.
- Counter Display rotation values: between -2 and +2 degrees is the IA specification. Sean may adjust within this range per product type. A lapel pin at +1 degree reads differently from a card sticker at +1 degree.

---

*This document covers UX, information architecture, sitemap, navigation, page wireframes, user flows, social proof strategy, trust framework, and the conversion optimization backlog for theproductlab.in on Fynd Commerce. It is a full revision of the Phase 3 UX/IA document, updated to reflect the wandering-store experience model directed by Dan. The sitemap and all URLs are unchanged. The commercial mechanics (AOV above ₹499, free shipping threshold, COD minimum, prepaid discount, Find. Collect. Gift. mechanic) are unchanged. What changes is how the store feels to move through — and how that feeling creates the conditions for trust and purchase. All structural decisions trace to: Weiss (customer-insight-report.md), Heyward (brand-positioning.md), Jenna (product-hierarchy.md), Patrick (pricing-framework.md), Shreyas (pmf-assessment.md). Experience model direction: Dan (Program Director brief, 2026-03-28). No decision in this document overrides Jenna's product hierarchy, Patrick's pricing, Sean's visual direction, or Tobi's platform constraints.*
