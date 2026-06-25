# Prototype → Storefront Gap Analysis

**Last updated:** 2026-06-20
**Phase:** 4 — Build
**Producing agent:** Harley
**Status:** Complete

## Method

Every section in `prototypes/tpl-site-prototype.html` was mapped to its corresponding route in `storefront/src/app/`. Each gap is graded:

| Grade | Meaning |
|-------|---------|
| ✓ | Fully implemented with Light+Bold tokens |
| ~ | Partial — exists but missing key prototype features |
| ✗ | Missing entirely from the storefront |

---

## Homepage (`/`)

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Announcement bar ("Free shipping over ₹499") | ✗ | Not present in layout.tsx |
| Header — Find / Collect / Gift nav labels | ~ | Storefront nav doesn't use Find/Collect/Gift labels |
| **Opinion Wall** (text-only hero with opinions phrases) | ✗ | Current hero is an image + tagline "Small objects. Big opinions." Need to port the full opinion-phrases layout |
| **Record Store Browse** (mood-based collection cards) | ✗ | No equivalent section on homepage |
| AOV nudge bar ("₹250 away from free shipping") | ✗ | Missing |
| **Sticker Wall** (push-pin product grid with rotation) | ✗ | Storefront uses a standard grid (ProductCard) |
| **Opinion Interrupt** ("Find. Collect. Gift." full-width section) | ✗ | Missing |
| **Opinion Bar** ("Small objects don't have to have small opinions.") | ~ | Storefront has a yellow section but it says "Build the opinion wall." — different copy |
| Trust Block (Artist-Made / 7-Day Returns / 2–4 Days Delivery) | ✓ | `TrustBlock` component exists and is rendered |
| Gift section ("You already know who needs this") | ✓ | Renders persona links |
| "What Just Landed" / new arrivals | ~ | Storefront has this but uses a horizontal scroll; prototype has sticker wall instead |
| Brand Elements showcase section | ✗ | Not a customer-facing page, can skip |
| Footer (logo, tagline, links) | ~ | Storefront footer exists but may not match prototype link set |

---

## Collections (`/collections`, `/collections/[slug]`)

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Collection hero (coll-hero with background text, eyebrow, title, desc, badges) | ✓ | Implemented in `collections/[slug]/page.tsx` with overlay mappings |
| Filter bar (chips for product type, price) | ✗ | Missing entirely |
| Product grid (standard card layout) | ~ | Uses standard grid; prototype uses Sticker Wall layout variant |
| Set upsell (bundles) | ✓ | Implemented as a section |
| Opinion Bar at bottom of collection | ✗ | Missing |

---

## PDP (`/products/[handle]`)

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Collection eyebrow + product name | ~ | Storefront has title only, no collection context |
| Price row with SKU | ~ | Price shown, SKU missing |
| Badges (sticker badges: "Only at TPL", "In Stock", "COD available") | ✗ | Not rendered |
| Product description with brand voice | ✓ | Rendered from Medusa |
| **CTA: "Ship My Opinions"** vs generic "Add to Cart" | ✗ | Storefront uses `AddToCartButton` — different copy |
| **CTA: "Send as a Gift"** | ✗ | Missing |
| **Sticky mobile CTA bar** (Gift + Ship My Opinions) | ✗ | Not implemented |
| Trust micro-copy (delivery, returns, artist-made, COD) | ~ | Shown as one line below add-to-cart |
| Stamp overlay on product image | ✗ | Missing |
| "You might also like" / "Build Your Opinion Wall" section | ✗ | No related products or set upsell |

---

## Cart (`/cart`)

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Cart drawer (slide-in overlay) | ✗ | Storefront uses a full `/cart` page, not a drawer |
| Line items with name/type/price | ~ | Depends on CartClient implementation |
| Subtotal + shipping note | ~ | Depends on CartClient |
| Checkout CTA | ~ | Depends on CartClient |

---

## Checkout (`/checkout`)

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Contact info (email, phone) | ~ | Depends on CheckoutClient |
| Shipping address form | ~ | Depends on CheckoutClient |
| **Payment method selector** (COD / UPI / Card) | ✗ | Not in the client wrapper visible |
| **Place Order CTA with total** | ✗ | Not in the markup |
| **Order Summary sidebar** (line items, shipping, total) | ✗ | Not in the markup |

---

## Order Confirmation (`/order-confirmed`)

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Confirmation icon + heading | ✓ | ✓ checkmark + "Order Confirmed!" |
| Order number display | ~ | Shows orderId from searchParams |
| Delivery estimate | ✗ | Missing |
| Tracking notification text | ✗ | Missing |
| "Continue Shopping" + "View Order History" CTAs | ~ | Only "Continue Shopping" present |

---

## Gifts (`/gifts`, `/gifts/for-[persona]`)

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Gift hero with color swatch | ✓ | Implemented |
| Persona grid (4 personalities) | ✓ | 4 personas mapped in data.ts |
| Budget filter chips | ✓ | Present on /gifts |
| Feature sets | ✓ | Present on /gifts |
| Free gift packaging opinion interrupt | ✗ | Missing on /gifts |
| Gift packaging / handwritten notes / bulk orders trust block | ✗ | Missing on /gifts |

---

## Sets (`/sets`, `/sets/[slug]`)

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Sets hero | ✓ | Implemented |
| Curated sets grid | ✓ | Implemented |
| How It Works (3-step trust section) | ✗ | Missing on /sets |

---

## Artists (`/artists`) → `/sell-your-art`

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Artist cards with avatars | ✗ | No /artists route exists; /sell-your-art exists instead |
| Artist attribution trust block | ✗ | Missing |

---

## Account (`/account`)

| Prototype Section | Storefront Status | Notes |
|---|---|---|
| Avatar + name/email header | ~ | Simpler — just info card |
| Orders tab | ✓ | Links to /account/orders |
| Wishlist tab | ✗ | Not implemented |
| Profile editing | ✓ | Links to /account/profile |

---

## Summary of Critical Gaps

| Priority | Gap | Impact |
|----------|-----|--------|
| P0 | **Opinion Wall** missing from homepage | Homepage has no brand voice punch — violates hi-fi design |
| P0 | **Record Store Browse** section missing | Collection discovery path absent from homepage |
| P0 | **PDP** missing gift CTA, sticky mobile bar, badges, stamps | Lower conversion on mobile, no gift route |
| P0 | **Checkout** missing COD/UPI/Card selector | D-029 requires COD to work — must be visible |
| P1 | **Sticker Wall** layout on homepage | Brand visual system not carried through |
| P1 | **Opinion Interrupt** / **Opinion Bar** sections missing | Brand voice sections absent in multiple pages |
| P1 | **Header nav labels** don't match Find/Collect/Gift | Navigation doesn't match IA from Kurt's UX |
| P1 | **Filter bar** missing on collection pages | No product-type filtering |
| P2 | **Cart drawer** vs full page | UX friction — prototype uses slide-in drawer |
| P2 | **Account wishlist** tab missing | No save-for-later |
| P2 | **Artists page** missing | Artist attribution is a brand pillar |

## Action Items

1. Port Opinion Wall to homepage (replace image hero)
2. Add Record Store Browse section after Opinion Wall
3. Port Sticker Wall grid pattern to replace standard product grid on homepage
4. Add Opinion Interrupt and Opinion Bar sections across pages
5. Enhance PDP with: badges, stamp overlay, "Ship My Opinions" CTA, "Send as a Gift" CTA, sticky mobile bar, related sets
6. Implement payment method selector in checkout (COD/UPI/Card + order summary)
7. Add filter bar chips to collection pages
8. Implement cart drawer pattern
9. Update header nav to Find/Collect/Gift labels
10. Add Artists page with cards
11. Update footer links to match prototype
