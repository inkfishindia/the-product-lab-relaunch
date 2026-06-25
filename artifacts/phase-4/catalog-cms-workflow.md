<!-- last-updated: 2026-06-06 -->
# Catalog & CMS Workflow — PDP Operations for Next Phases

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build (active), forward-looking to Phase 5 (launch) and Phase 6 (optimization) |
| **Producing Agent** | Harley (this draft) → Tobi (Fynd implementation) → Casey (content QA) → Dan (ongoing ops) |
| **Status** | draft |
| **Platform** | Commerce.com (Fynd) — Medusa deferred to Day 30 re-evaluation (D-022) |

---

## How to Use This Document

This is both a **prompt** you can give to an agent (Tobi for setup, Casey for content ops, or a new Catalog Management sub-agent) and an **operational reference** for Dan to run catalog operations post-launch.

It answers: What goes into a PDP? Who creates what? How does a product move from "idea" to "live on site"? How do drops, collections, and bundles work in Fynd?

---

## Part 1: Catalog Architecture (How Fynd Organizes Products)

### Fynd's Data Model

Fynd organizes products in this hierarchy:

```
Collection (mood/theme group)
  └─ Category (product type)
       └─ Product (SKU)
            └─ Variant (size/color/format)
```

### What This Means for TPL

| Fynd Concept | TPL Mapping | Example |
|-------------|-------------|---------|
| **Collection** | Mood/theme group — opinion-led | "The Loud Ones", "Pick a Side", "Your Energy" |
| **Category** | Product type (format) | "Card Stickers", "Keychains", "Enamel Pins", "Fridge Magnets", "Earrings" |
| **Product** | Individual SKU | "Bullshit Remover Pin", "No Chill Card Sticker" |
| **Variant** | Size or format option | Half card vs Full card, Color A vs Color B |

### Launch Collections (Mapped to Fynd Collections)

| Collection | Collections Slug | Products | Price Range | Notes |
|-----------|-----------------|----------|-------------|-------|
| The Loud Ones | `/collections/the-loud-ones` | Attitude keychains, shade stickers | ₹149–₹299 | Launch hero collection |
| Pick a Side | `/collections/pick-a-side` | Opinion/debate stickers, lapel pins | ₹149–₹249 | Opinion-as-identity |
| Your Energy | `/collections/your-energy` | Self-aware/relatable designs | ₹149–₹299 | Mood-matching products |
| For the Group Chat | `/collections/for-the-group-chat` | Forwarding-ready stickers | ₹149–₹199 | Gifting-forward collection |
| Main Character Set | `/collections/main-character-set` | Aspirational/set-building anchor | ₹249–₹499 | Higher AOV collection |
| Best Sellers | `/collections/best-sellers` | Top 12–16 products manually curated | varies | Updated monthly |
| New In | `/collections/new-in` | Last 30 days' additions | varies | Auto-populated by date |
| The Drop | `/collections/the-drop` | Current limited drop or countdown | varies | Drop mechanic entry point |

### Product Categories (Fynd Categories)

| Category | Products at Launch | Variants | Notes |
|----------|-------------------|----------|-------|
| Card Stickers | 6–10 designs | Half (₹149) / Full (₹199) | TPL's unique differentiator |
| Keychains | 8–12 designs | None (single SKU per design) | Core ₹249 price point |
| Enamel Pins | 4–6 designs | None (limited run per drop) | Hard enamel, double-clasp |
| Fridge Magnets | 4–8 designs | None (single SKU per design) | Entry price ₹149 |
| Earrings | 3–5 designs | None (single SKU per design) | Premium ₹299 |
| Sets/Bundles | 5 set SKUs | Contains multiple products | Created as virtual bundles in Fynd |

### Set/Bundle Configuration in Fynd

Sets are **not** physical products — they are virtual bundles. In Fynd:
1. Create a "Set" product with its own SKU
2. Set price: ₹399–₹699 (discounted vs individual purchase)
3. Link constituent products via Fynd's Bundle/Combo feature
4. When customer buys a set, inventory decrements for each constituent product

| Set Name | SKU | Contents | Price | Individual Value |
|----------|-----|----------|-------|-----------------|
| The Loud Ones Pack | SET-LOUD-001 | 5 shade/petty stickers | ₹499 | ₹745–₹995 |
| Main Character Set | SET-MAIN-001 | 5 unbothered stickers | ₹499 | ₹745–₹995 |
| No Notes (Gifting) | SET-NOTES-001 | 5 forwarding-ready stickers | ₹499 | ₹745–₹995 |
| Sent on Read | SET-READ-001 | 4 relational pack stickers | ₹399 | ₹596–₹796 |
| Build Your Set | SET-BUILD-001 | Pick any 5 stickers | ₹499 | ₹745–₹995 |

**Build Your Set** requires special Fynd configuration: it needs a custom product page where customers pick 5 from a grid. If Fynd doesn't support this natively, replace with 3 pre-curated "Build Your Set" options at launch and add custom flow in Phase 6.

---

## Part 2: PDP Data Model (Every Field a Product Needs)

Every product in Fynd needs the following fields filled. These map to both the UI display and the backend (search, filters, inventory).

### 2.1 Core Fields

| Field | Fynd Location | Required? | Format | Source |
|-------|--------------|-----------|--------|--------|
| Product Name | Product → Basic → Title | Required | Opinion-forward string | `dan-copy-faststart-template.md` |
| SKU | Product → Basic → SKU | Required | `[TYPE]-[DESIGN]-[###]` e.g. `CS-NOCHILL-001` | Catalog manager |
| Description | Product → Basic → Description | Required | 4-part PDP structure (Hook + Why + WA Line + Specs) | `dan-copy-faststart-template.md` |
| Price | Product → Pricing → MRP | Required | INR | D-006 pricing table |
| Sale Price | Product → Pricing → Sale | Required for launch | Same as MRP at launch (no discounts) | Dan |
| Category | Product → Organization → Category | Required | Product type (Card Stickers, Keychains, etc.) | Catalog assignment |
| Collection | Product → Organization → Collection | Required | Mood/theme collection(s) | Site build brief |
| Tags | Product → Organization → Tags | Recommended | Keywords: artist name, occasion, mood, giftee persona | Content manager |
| Tax Class | Product → Pricing → Tax | Required | GST applicable on accessories | Fynd default |

### 2.2 Content Fields (PDP Sections)

The product description in Fynd must contain **all four PDP sections** from the copy system. Use Fynd's rich text editor or HTML in the description field:

```
[IDENTITY HOOK — 1 sentence]
Who this is for.

[WHY THIS — 1-2 sentences]
What this product says about the person.

[WHATSAPP LINE — 1 sentence, <15 words]
The line that travels.

[SPECS — bullet list]
- Material:
- Size:
- Finish:
- Designed by:
```

**Rendering:** These four sections display on the PDP as:
1. **Product subtitle/hero text** (Identity Hook) — appears below product name, above image
2. **Body copy** (Why This) — below image, main description
3. **Share button pre-fill** (WhatsApp Line) — used when customer taps "Share on WhatsApp"
4. **Specs panel** (Specs as list) — collapsible or pinned below description

**Implementation note for Tobi:** If Fynd's description field doesn't allow section-level formatting, use HTML `<h4>` tags or separator `<hr>` between sections.

### 2.3 Media Fields

| Asset | Count Required | Format | Max Size | Source |
|-------|---------------|--------|----------|--------|
| Hero Image | 1 per SKU | JPEG | 500KB | Dan's photography |
| Detail Image | 1–2 per SKU | JPEG | 500KB | Dan's photography |
| Lifestyle Image | 1 per SKU (optional) | JPEG | 500KB | Dan's photography |
| Scale Reference | 1 per SKU (recommended) | JPEG | 500KB | Dan's photography |

**Image naming convention:**
```
[sku]-hero.jpg        — Main product image (primary display)
[sku]-detail.jpg      — Close-up / detail shot
[sku]-lifestyle.jpg   — Product in context
[sku]-scale.jpg       — Size reference
```

### 2.4 Variant Configuration (Card Stickers Only)

Card stickers have two variants: half card and full card.

| Variant | SKU Suffix | Price | Weight | Notes |
|---------|-----------|-------|--------|-------|
| Half Card | `-HALF` | ₹149 | 5g | Covers part of card |
| Full Card | `-FULL` | ₹199 | 8g | Covers entire card face |

**In Fynd:** Create one product with two variants, not two separate products. This keeps the PDP clean and shows size comparison on the same page.

### 2.5 SEO Fields

| Field | Fynd Location | Convention | Example |
|-------|--------------|------------|---------|
| Meta Title | Product → SEO → Title | `[Product Name] | The Product Lab` | "Bullshit Remover Pin | The Product Lab" |
| Meta Description | Product → SEO → Description | Identity Hook or WhatsApp Line (max 160 chars) | "For the person who has already written off small talk. 40mm enamel pin. Hard enamel, double-backed. Designed in Bengaluru." |
| URL Slug | Product → SEO → URL | `/[product-name-slug]` | `/bullshit-remover-pin` |
| Alt Text | Images → Alt Text | Product description (short) | "Bullshit Remover enamel pin on dark surface" |

---

## Part 3: Content Workflow (Who Does What)

### 3.1 Launch Catalog Population (Phase 4 → Phase 5 Gate)

```
Step 1: Dan shoots photos         →  artifacts/phase-4/product-photos/
Step 2: Dan writes copy           →  artifacts/phase-4/dan-copy-faststart-template.md
Step 3: Tobi creates Fynd products →  Fynd admin → Products → Add
Step 4: Tobi uploads images       →  Fynd admin → Product → Media
Step 5: Tobi assigns collections  →  Fynd admin → Product → Organization
Step 6: Casey QA reviews          →  Spot-check every PDP on staging
Step 7: James sign-off            →  PDP QA pass checklist (below)
```

**Who does what:**

| Role | Catalog Tasks | Time Estimate | Automation? |
|------|--------------|---------------|-------------|
| **Dan** | Shoot product photos, write product copy | ~3 hours per 10 SKUs | No — Dan is the only person with product access |
| **Tobi** | Create products in Fynd, upload media, assign collections, set pricing | ~10 min per SKU | Bulk CSV import available in Fynd (see Section 5) |
| **Casey** | Content QA — brand voice check, image quality check, spec accuracy | ~5 min per SKU | No — requires brand judgment |
| **James** | Technical QA — image load, mobile rendering, variant switching, price display | ~3 min per SKU | No — requires device testing |

### 3.2 Ongoing Catalog Operations (Phase 5 → Phase 6)

Once the site is live, adding products is a recurring operation:

**Weekly cadence:**
- Monday: Dan identifies products for next drop/restock
- Tuesday: Dan shoots photos + writes copy (2–3 SKUs)
- Wednesday: Tobi (or Dan via CSV import) adds products to Fynd
- Thursday: Casey QA review
- Friday: Products go live (scheduled publish in Fynd)

**Drop cadence (monthly):**
- Drop announcement: 2 weeks before
- Products created in Fynd but set to "Draft" (not visible)
- Day of drop: flip to "Published" at 9:00 AM
- Use Fynd's scheduled publishing if available

### 3.3 Content QA Checklist (Casey)

Every PDP must pass this before going live:

```
□ Product name matches copy-system.md voice (opinion-forward, no banned words)
□ Identity hook names the person, not the product
□ Why this paragraph explains what it says about the owner
□ WhatsApp line is <15 words and works without page context
□ Specs are factual bullet list, no persuasive language
□ Image loads correctly on mobile (<500KB per image)
□ Price matches D-006 pricing table (check ₹149/₹199/₹249/₹299/₹399-₹999)
□ Variants work (half vs full card, if applicable)
□ Artist attribution included (or "Designed in Bengaluru" if in-house)
□ Meta title and description filled
□ Collection assignment correct
```

---

## Part 4: Fynd CMS Operations Guide

### 4.1 Adding a New Product

In Fynd admin:

1. **Products → Add Product**
2. Fill General Information:
   - Product Name: Opinion-forward name (e.g., "Bullshit Remover")
   - Description: Full 4-part PDP structure
   - SKU: Follow naming convention `[TYPE]-[NAME]-[###]`
3. Set Pricing:
   - MRP: Full price (from D-006)
   - Sale Price: Can leave empty if no discount
4. Assign Organization:
   - Category: Product type
   - Collection: Mood/theme collection(s) — multi-select allowed
   - Tags: artist name, giftee persona, occasion
5. Upload Media:
   - Drag and drop images
   - Set primary image order: hero → detail → lifestyle → scale
   - Fill alt text for each image
6. Configure Variants (if card sticker):
   - Add variant: Size (Half Card / Full Card)
   - Set price per variant
   - Set inventory per variant
7. SEO:
   - Meta Title: `[Product Name] | The Product Lab`
   - Meta Description: Identity hook (first sentence of description)
   - URL Slug: Auto-generated from product name; verify it's clean
8. Set Status to "Draft" (not published) — flip to "Published" after QA sign-off

### 4.2 Bulk Upload via CSV

For initial catalog population (40+ SKUs), use CSV import instead of manual entry:

1. Download Fynd's product import template
2. Map columns to TPL's data model:
   - `title` → Product name
   - `sku` → SKU
   - `description` → Full 4-part description (HTML format)
   - `price` → MRP
   - `category_id` → Fynd category ID
   - `collection_id` → Fynd collection ID
   - `image_urls` → Comma-separated URLs (upload images to Fynd media library first or use external URLs temporarily)
3. Validate CSV (Fynd shows row-level errors)
4. Import
5. Review imported products on staging before publishing

**Tobi's task:** Create the CSV template with TPL's fields pre-mapped. Dan or Casey can then fill in product data (copy, prices, SKUs) in the spreadsheet without needing Fynd admin access.

### 4.3 Managing Collections

Collections are created in Fynd admin:

1. **Products → Collections → Add Collection**
2. Collection Name: The mood/theme name (e.g., "The Loud Ones")
3. URL Slug: Auto-generated (e.g., `the-loud-ones`)
4. Description: Collection intro copy (from copy-system.md Part 3)
5. Collection Image: Optional — can use product grid instead
6. Products: Select products to include (multi-select)
7. Sort Order: Manual (curated order) or automatic (newest first, price, etc.)

**Collection assignment rules:**
- A product can belong to multiple collections (e.g., a sticker in "The Loud Ones" AND "Best Sellers")
- "New In" = auto-collection based on creation date (last 30 days)
- "The Drop" = manually curated, products hidden when drop ends
- "Best Sellers" = manually curated, updated monthly based on sales data

### 4.4 Managing Drops

Drops have a lifecycle:

```
Draft (2 weeks before) → Scheduled (1 week before) → Published (drop day) → Archived (after sell-out)
```

**Drop setup in Fynd:**
1. Create products with status "Draft" — they won't appear on site
2. Create a dedicated Drop collection (e.g., "The Drop — June 2026")
3. On drop day at 9:00 AM: Batch-select all drop products → Set status to "Published"
4. Add drop products to the Drop collection
5. Update nav to point to Drop collection
6. When sold out: Set product status to "Out of Stock" (or remove from collection if truly limited)

**Drop countdown behavior:**
- Before drop: Drop collection shows countdown + email capture (if Fynd supports, else use a static page)
- Day of drop: Full product grid visible, "Limited" badge on products
- After sell-out: "Sold Out" badge, "Notify me" button, link to next drop

### 4.5 Inventory Management

| Inventory Action | How in Fynd | Frequency | Owner |
|-----------------|-------------|-----------|-------|
| Set initial stock | Product → Inventory → Quantity | Once per product creation | Tobi |
| Update stock | Product → Inventory → Edit | Per restock/shipment received | Dan |
| View low stock | Fynd dashboard → Inventory alerts | Daily check during launch | Dan |
| Mark out of stock | Product → Status → Out of Stock | As products sell out | Dan |
| Restock product | Product → Inventory → Increase quantity | When new batch arrives | Dan |

**Low stock threshold:** Alert when <10 units remaining (configurable in Fynd settings).

---

## Part 5: CSV Import Template (For Bulk Catalog Population)

Tobi creates a Google Sheet with these columns. Dan and Casey fill data. Tobi imports.

| Column | Required | Example | Notes |
|--------|----------|---------|-------|
| SKU | Yes | CS-NOCHILL-001 | Must be unique |
| Product Name | Yes | No Chill | Opinion-forward, not descriptive |
| Description | Yes | [HTML with 4 sections] | Full PDP content |
| Price | Yes | 199 | MRP in INR |
| Category | Yes | Card Stickers | Must match Fynd category name |
| Collections | Yes | The Loud Ones; Best Sellers | Pipe-separated if multiple |
| Tags | No | gifting; shade; attitude | Comma-separated keywords |
| Variant 1 Name | No | Size | "Half Card" or "Full Card" |
| Variant 1 Value | No | Half Card | Display name |
| Variant 1 Price | No | 149 | Override base price |
| Image URLs | Yes | https://... | Comma-separated URLs |
| Meta Title | Yes | No Chill Card Sticker \| The Product Lab | SEO title |
| Meta Description | Yes | For everyone who has ever handed over their debit card... | <160 chars |
| Stock | Yes | 50 | Initial inventory quantity |

**Import process:**
1. Fill CSV in Google Sheets
2. Export as CSV
3. Fynd admin → Products → Import → Upload CSV
4. Review import log for errors
5. Verify products on staging

---

## Part 6: Post-Launch Catalog Operations (Phase 5 → Phase 6)

### 6.1 Adding New Products Post-Launch

**Triggered by:** New artist collab, restock of sold-out design, new collection launch, seasonal drop

**Process (same as above, compressed):**
1. Dan: Take photos (3–5 angles), write copy (4-part template)
2. Dan or Casey: Upload images to Fynd media library
3. Dan or Casey: Create product in Fynd (or add to CSV for batch import)
4. Casey: QA review (5 min per SKU)
5. Publish — products appear on site immediately or on schedule

**If Dan is the only operator post-launch:** CSV import is faster than manual Fynd entry for 5+ SKUs. Keep the Google Sheet template ready. Fill 5 rows → export CSV → import → done in 15 minutes.

### 6.2 Retiring Products

**Products get retired when:**
- Limited drop sells out (never restocked)
- Design license expires (artist collab ends)
- Product underperforms (<5 units sold in 60 days)

**Process:**
1. Fynd admin → Product → Set status to "Out of Stock"
2. Remove from collection pages (keep in "Sold Out" archive page if desired)
3. DO NOT delete the product — Fynd may crash order history links

### 6.3 Seasonal Collections

**TPL collections that recur by season:**

| Collection | Trigger | Timing | Products |
|-----------|---------|--------|----------|
| Raksha Bandhan Gifts | Rakhi season | July–August | Gifting sets, sibling-themed designs |
| Diwali Gifts | Diwali | October–November | Gift boxes, festive bundles |
| New Year | January | December–January | Fresh start designs, planner accessories |
| Valentine's | February | January–February | Relationship-themed, friendship designs |

**Process for each:**
1. 4 weeks before: Create collection in Fynd (status: Draft)
2. 3 weeks before: Add products, write collection copy
3. 2 weeks before: Casey QA
4. 1 week before: Publish collection + update nav
5. Post-season: Archive collection (set to inactive)

---

## Part 7: Phase 5 → Phase 6 Handoff (Catalog-Specific)

When moving from Phase 5 (launch) to Phase 6 (optimization), catalog operations hand off:

| Phase 5 (Launch Week) | Phase 6 (Day 30+) |
|----------------------|-------------------|
| Tobi sets up catalog structure | Dan runs catalog operations solo |
| Casey QA checks every PDP | Casey reviews spot-check (weekly) |
| CSV import for bulk | CSV import for batches 5+ SKUs; manual for 1–2 SKUs |
| Dan may still be learning Fynd UI | Dan should be proficient in Fynd admin |
| Shopify/Fynd support on speed dial | Dan knows workarounds for common Fynd friction points |

**Handoff condition:** Dan can independently add a product to Fynd (photos + copy + publish) without asking Tobi or Casey. If Dan can't do this by Day 30, catalog operation is blocked.

---

## Part 8: Tool/Agent Prompt — Catalog Management Agent

Copy-paste this to spawn a Catalog Management sub-agent:

```
You are the Catalog Management agent for The Product Lab relaunch. Your job is to manage product catalog operations on Commerce.com (Fynd) platform.

## Context
- Platform: Fynd/Commerce.com (India-native ecommerce)
- Purchase mechanic: Find. Collect. Gift. (D-019)
- Product types: Card stickers (half ₹149 / full ₹199), keychains (₹249), enamel pins (₹249), fridge magnets (₹149), earrings (₹299), sets/bundles (₹399–₹699)
- Voice: See artifacts/phase-3/copy-system.md — opinion-forward, names the person, short enough to forward
- Collections: The Loud Ones, Pick a Side, Your Energy, For the Group Chat, Main Character Set, Best Sellers, New In, The Drop
- Dan is the solo operator; all content (photos, copy) comes from him
- Casey handles content QA

## Your Responsibilities

### Before Launch (Phase 4→5)
1. Ensure Fynd catalog structure is created (collections, categories matching site-build-brief.md)
2. Create/import all launch products (40+ SKUs) into Fynd
3. Verify every PDP has correct 4-part copy (hook, why, WhatsApp line, specs)
4. Verify images are uploaded and display correctly on mobile
5. Verify variant configuration (half vs full card) works
6. Set correct pricing per D-006
7. Assign products to correct collections

### Launch Operations (Phase 5)
1. Monitor inventory levels daily
2. Update stock counts as Dan confirms shipments
3. Mark sold-out products appropriately
4. Handle any Fynd catalog issues during launch day

### Post-Launch (Phase 5→6)
1. Add new products as Dan produces them (photos + copy)
2. Create seasonal collections (Rakhi, Diwali, etc.) 4 weeks ahead
3. Run monthly catalog cleanup (remove underperformers, archive old drops)
4. Maintain the CSV import template for batch operations
5. Transition catalog ops to Dan solo by Day 30

## Tools Available
- Fynd admin access (via Dan's credentials or staff invite)
- Google Sheets (CSV import template)
- artifacts/phase-4/dan-copy-faststart-template.md (copy template)
- artifacts/phase-3/copy-system.md (voice reference)
- artifacts/phase-4/site-build-brief.md (collection structure)
- artifacts/phase-2/pricing-framework.md (D-006 pricing)

## Rules
1. Never change a product's price without confirming with Dan
2. Never publish a product that hasn't passed Casey's QA
3. Never delete a product — set status to "Out of Stock" instead
4. Always keep one draft of a product before making it inactive (backup)
5. Log all catalog changes in decisions/decision-log.md with date and reason
```

---

## Appendix: PDP Quick-Reference Card

Print this. Stick it on Dan's wall. It's the cheat sheet for every product.

```
┌──────────────────────────────────────────────┐
│           PRODUCT DATA CARD                   │
├──────────────────────────────────────────────┤
│                                               │
│  PRODUCT NAME:  Opinion-forward (not desc.)   │
│  SKU:           [TYPE]-[NAME]-[###]           │
│  PRICE:         ₹149 / ₹199 / ₹249 / ₹299     │
│  CATEGORY:      Card Sticker / Keychain /     │
│                 Enamel Pin / Magnet / Earring  │
│  COLLECTIONS:   The Loud Ones / Pick a Side / │
│                 Your Energy / Group Chat /     │
│                 Main Character / Best Sellers  │
│  TAGS:          artist name; persona; occasion │
│                                               │
│  IDENTITY HOOK: For the person who ________   │
│  WHY THIS:      ____________________________  │
│  WHATSAPP LINE: ___________________________   │
│  SPECS:         Material / Size / Finish /    │
│                 Artist attribution            │
│                                               │
│  IMAGES:        hero.jpg / detail.jpg /       │
│                 lifestyle.jpg (optional)       │
│                                               │
│  VARIANT (if card sticker):                   │
│  □ Half Card ₹149  □ Full Card ₹199           │
│                                               │
└──────────────────────────────────────────────┘
```
