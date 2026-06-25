# Updated Build List — Storefront MVP

**Date:** 2026-06-06  
**Base:** `storefront/` (Next.js 16, 16 routes, compiles cleanly)  
**Product Catalog:** 67 products across 6 categories  
**Data Source:** `catalogs/master-catalog.ts` (canonical) + `storefront/src/lib/data.ts`

---

## ✅ Built & Verified (This Session)

| Component | Status | Location |
|-----------|--------|----------|
| Master product catalog (67 products) | ✅ | `catalogs/master-catalog.ts` |
| Product-to-collection mapping | ✅ | `getProductsByCollection()` in master-catalog |
| Product-to-set mapping | ✅ | `getProductsBySet()` in master-catalog |
| Product-to-persona mapping | ✅ | `getProductsByPersona()` in master-catalog |
| Medusa fallback (local data when backend down) | ✅ | `storefront/src/lib/medusa.ts` |
| Collection pages filter by collection | ✅ | `collections/[slug]/page.tsx` |
| Set pages show constituent products | ✅ | `sets/[slug]/page.tsx` |
| Gift persona pages recommend products | ✅ | `gifts/for-[persona]/page.tsx` |
| Homepage shows real products | ✅ | `page.tsx` |
| `stickerCount` → `productCount` everywhere | ✅ | sets/, gifts/, data.ts |
| Build passes (16 routes, 2.9s, 0 errors) | ✅ | `npm run build` |
| TPL Shared Drive fully indexed | ✅ | `TPL-SHARED-DRIVE-INDEX.md` |
| Wired MVP handoff written | ✅ | `handoffs/2026-06-06-wired-mvp-handoff.md` |

---

## 📋 Build List — Remaining Work

### P0 — Launch Critical (Blockers)

| # | Item | Owner | Dependency | Notes |
|---|------|-------|------------|-------|
| 1 | **Product photography for 7 hero SKUs** | Dan | — | Asset list at `artifacts/phase-3/asset-list.md`. Dark bg, phone camera, 3-5 angles each |
| 2 | **Product copy for remaining SKUs** | Dan | — | Template at `artifacts/phase-4/dan-copy-faststart-template.md`. 8 more SKUs to fill |
| 3 | **Fynd/Commerce.com credentials** | Dan | — | 5-step one-pager at `artifacts/phase-4/dan-fynd-account-checklist.md`. #1 blocker |
| 4 | **Fynd store build** | Tobi | #3 | Platform setup, CSS theming, catalog upload, checkout config |
| 5 | **Razorpay integration** | Tobi | #3, #4 | API keys + webhook setup |
| 6 | **Shiprocket integration** | Tobi | #3, #4 | COD testing, AWB generation |
| 7 | **GA4 + Clarity setup** | Tobi | #3, #4 | Tracking all key events |
| 8 | **Performance audit (<3s LCP on 4G)** | Tobi | #4 | Hard launch requirement |
| 9 | **James QA sign-off** | James | #1-8 | No P0/P1 issues open |

### P1 — Launch Enhancements

| # | Item | Detail | Effort |
|---|------|--------|--------|
| 10 | **Product images in master-catalog.ts** | Add `thumbnail` URLs to all 67 ProductRecords | 1 hr |
| 11 | **Add remaining product categories** | Caps, mugs, luggage tags, lighters, pop sockets from shared drive | 2 hr |
| 12 | **Search functionality** | Wire the search icon in nav-bar | 3 hr |
| 13 | **Gift budget filter wiring** | Make budget buttons filter gifts page | 1 hr |
| 14 | **Account/login page** | Add `/account` route | 4 hr |

### P2 — Post-Launch (Day 30+)

| # | Item | Detail | Notes |
|---|------|--------|-------|
| 15 | **Medusa backend deploy** | Stand up Medusa on VPS, connect storefront | See `backend/medusa-eval/` for spike |
| 16 | **Catalog sync automation** | Connect master-catalog.ts to Medusa seed data | `backend/medusa/src/scripts/seed-data.ts` |
| 17 | **NocoDB deploy** | Replace Airtable for ops data | See `docs/tooling-roadmap.md` |
| 18 | **Umami analytics deploy** | Self-hosted analytics alternative | ₹1,180/mo on Vultr Mumbai |
| 19 | **Artist platform** | `/sell-your-art` submission pipeline | Drop 2 prep |
| 20 | **WhatsApp commerce** | Purchase flow via WhatsApp | See Eli's flows |
| 21 | **Opinion Wall (social feature)** | User-generated content wall | D-024 proposal |

### P3 — Backlog / Icebox

| # | Item | Detail |
|---|------|--------|
| 22 | Add remaining 250+ SKUs from shared drive | Not in Phase 4 scope |
| 23 | ERPNext deploy for inventory/accounting | Day 60+ |
| 24 | Listmonk + SES for email flows | If email becomes primary channel |
| 25 | Mobile app (React Native) | Long-term |
| 26 | Multi-language support | Hindi, regional languages |

---

## Data Sources Referenced

| Source | Location | Coverage |
|--------|----------|----------|
| Phase 4 product catalog (35 SKUs) | `artifacts/phase-4/product-catalog.md` | Confirmed prices, SKU codes |
| Hero products (7 with full copy) | `artifacts/phase-4/dan-copy-faststart-template.md` | Complete PDP copy |
| Live site scrape (100+ products) | `site-scrape/theproductlab-in-complete-inventory.md` | Names, images, categories |
| TPL Shared Drive (full product data) | Various `/Products/` folders in shared drive | Design files, catalog PDFs, pricing sheets (partially accessible) |
| Pricing framework (D-006) | `artifacts/phase-2/pricing-framework.md` | ₹149-₹999, bundle pricing |
| Collection architecture (Phase 2) | `artifacts/phase-2/product-hierarchy.md` | Hero/support/filler tiers, 8 collections |

---

## How to Add More Products

1. Open `catalogs/master-catalog.ts`
2. Add a new `ProductRecord` following the existing pattern
3. Add the product ID to the relevant collection/set/persona mapping functions
4. Rebuild: `cd storefront && npm run build`
5. Verify the product appears on the intended pages

---

## Build Verification

```bash
cd storefront
npm run build
# Expected: ✓ Compiled successfully, 16 routes, 0 errors
```
