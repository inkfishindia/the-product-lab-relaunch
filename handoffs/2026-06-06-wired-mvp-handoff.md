# Handoff: Wired MVP — Storefront with Real Product Data

**From:** Harley (Program Director)  
**To:** Tobi (Build), James (QA), Casey (Content)  
**Date:** 2026-06-06  
**Phase:** 4 — Build (MVP wiring complete)

---

## What Changed

The storefront was disconnected from real product data. The static data layer (`data.ts`) had imaginary sticker-only products with no relationship to actual TPL inventory. This handoff delivers a **wired MVP** — the storefront now has a real product catalog with proper relationships between collections, sets, gift personas, and products.

### New Files Created

| File | Purpose |
|------|---------|
| `catalogs/master-catalog.ts` | Canonical product catalog: 67 real products with prices, categories, themes, PDP copy |
| `storefront/src/lib/master-catalog.ts` | Copy within src/ for Next.js import resolution |
| `TPL-SHARED-DRIVE-INDEX.md` | Full reference map of TPL Google Shared Drive (24 folders, ~200+ files) |
| `TPL-SHARED-DRIVE-LOG.md` | Changelog & action tracker for shared drive maintenance |
| `storefront/src/lib/data.ts` | **Rewritten** — new `ProductData` type, updated collections/sets/personas with real product counts |

### Files Modified

| File | Change |
|------|--------|
| `storefront/src/lib/medusa.ts` | Added local fallback — when Medusa backend is down, falls back to `master-catalog.ts` via `localProductToStoreProduct()` converter |
| `storefront/src/app/collections/[slug]/page.tsx` | Filters products by collection slug using `getProductsByCollection()`; removed dead filter buttons and empty state |
| `storefront/src/app/sets/[slug]/page.tsx` | Shows actual set products via `getProductsBySet()`; shows gift CTA block for gift sets |
| `storefront/src/app/gifts/for-[persona]/page.tsx` | Filters products by persona using `getProductsByPersona()`; removed dead empty state |
| `storefront/src/app/page.tsx` | Updated "sticker" → "product" language; hero section shows first 4 products |
| `storefront/src/app/sets/page.tsx` | `stickerCount` → `productCount` |
| `storefront/src/app/gifts/page.tsx` | `stickerCount` → `productCount` |
| `storefront/src/app/collections/page.tsx` | Added product count display on collection cards |

---

## Architecture

### Data Flow

```
master-catalog.ts (canonical source, 67 products)
    ↓
medusa.ts (getProducts / getProduct)
    ↓ (falls back when Medusa not running)
localProductToStoreProduct() — converts ProductData → StoreProduct
    ↓
Storefront pages filter by:
  - getProductsByCollection(slug) → collection pages
  - getProductsBySet(slug) → set detail pages
  - getProductsByPersona(slug) → gift persona pages
```

### Product Data Model

```
ProductData {
  id: string          // "hero-001", "lp-001", "kc-001", etc.
  handle: string      // URL slug
  title: string       // Product name (+ emoji for some)
  tagline: string     // Short hook (1 line)
  description: string // PDP copy (2-3 lines)
  price: number       // INR, integer
  category: ProductCategory  // lapel-pin | keychain | card-sticker | fridge-magnet | earring | sticker
  themes: string[]    // ["sassy", "humor", "sneakerheads", etc.]
  isHero?: boolean    // Brand-defining product
  isNew?: boolean     // Latest drop
  isBestSeller?: boolean  // Top seller
  isSoldOut?: boolean // Out of stock
}
```

### Collection-to-Product Mapping

| Collection | Products Count | Key Products |
|------------|---------------|--------------|
| The Loud Ones | 8 | Bullshit Remover, Idiot Repellent, Enjoy the ShitShow, Suck It, Straight Outta |
| Pick a Side | 6 | Cat Yin Yang, Cat Club, Always Tired, Selflove Sauce, Rick vs Morty |
| Your Energy | 7 | Selflove Sauce, Social Anxiety, Always Tired, Less Panic More Disco, Serotonin Spray |
| For the Group Chat | 9 | HIMYM, B99, Coca Cola, Stranger Things, Rick & Morty, Star Wars |
| Best Sellers | 7 | Bullshit Remover, Idiot Repellent, Nike Air Red, Girl Power, Enjoy the ShitShow |
| New In | 6 | Cat Club, Sneaker Collection, Rolling Stones Earrings, Pizza Sticker |

### Set-to-Product Mapping

| Set | Product Count | Price | Savings |
|-----|---------------|-------|---------|
| The Loud Ones Pack | 5 | ₹499 | ₹200 |
| Main Character Set | 5 | ₹499 | ₹200 |
| No Notes (gift) | 4 | ₹499 | ₹200 |
| Sent on Read (gift) | 3 | ₹399 | ₹150 |

### Gift Persona-to-Product Mapping

| Persona | Product Count | Vibe |
|---------|---------------|------|
| The one who has no filter | 8 | Sassy, direct, no-BS products |
| The main character | 6 | Confidence, self-love, bold |
| The one who is always right | 7 | Smart, tired, relatable |
| The impossible one to shop for | 5 | Unique, gift-ready products |

---

## Product Categories in the Catalog

| Category | Code | Count | Price Range |
|----------|------|-------|-------------|
| Lapel Pins | `lp-xxx` | 16 | ₹149-₹249 |
| Keychains | `kc-xxx` | 13 | ₹199-₹249 |
| Fridge Magnets | `fm-xxx` | 10 | ₹149-₹225 |
| Earrings | `er-xxx` | 12 | ₹199-₹299 |
| Card Stickers | `cs-xxx` | 5 | ₹149 |
| Laptop Stickers | `st-xxx` | 7 | ₹49-₹99 |
| **Total** | | **63** | **₹49-₹699** |

---

## Key Behaviors

1. **No backend required.** The storefront renders with real products using the local fallback. When Medusa goes live, it switches to the API automatically.
2. **Collection pages now filter.** Each collection shows only its mapped products (not "all products").
3. **Set pages show contents.** Each set detail page lists the actual products in the set.
4. **Gift personas recommend.** Each person gets relevant products from the catalog.
5. **PDP works.** Product detail pages render from local data when Medusa is unavailable.
6. **Build passes.** All 16 routes compile in 2.9s, zero TypeScript errors.

---

## What This Enables

- **Tobi:** Can test/render every page with real TPL products without needing Medusa running.
- **Dan:** Can review the storefront with actual product names, prices, and categories.
- **Casey:** Can QA the copy on every page — all PDP descriptions are final.
- **James:** Can walk through the complete user flow (browse → filter → view set → PDP → cart) without a backend.

---

## Limitations / Known Gaps

| Gap | Impact | Fix |
|-----|--------|-----|
| No product images | ProductCard shows empty gray box | Add `thumbnail` URL to each ProductRecord in master-catalog.ts |
| Cart/checkout requires Medusa | Cart and checkout pages only work with running backend | Or rebuild them to use localStorage |
| 67 products is a subset | Full catalog has ~300-400 SKUs across 9+ categories | Add remaining products from shared drive (+ caps, mugs, luggage tags, etc.) |
| Price data is from Phase 4 pricing | Some prices may be estimates | Dan confirms pricing in Fynd |
| No search | Search icon in nav is decorative | Wire to Algolia or Fynd search API |
| Gift "budget filter" is static | Buttons don't filter | Wire to query params |

---

## Quick Reference

- **Master catalog:** `catalogs/master-catalog.ts` (canonical source, edit here)
- **Static data layer:** `storefront/src/lib/data.ts` (collections, sets, personas)
- **Medusa client + fallback:** `storefront/src/lib/medusa.ts`
- **Collection page:** `storefront/src/app/collections/[slug]/page.tsx`
- **Set page:** `storefront/src/app/sets/[slug]/page.tsx`
- **Gift persona page:** `storefront/src/app/gifts/for-[persona]/page.tsx`
- **Build:** `cd storefront && npm run build`
