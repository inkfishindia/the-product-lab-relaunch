<!-- last-updated: 2026-03-26 -->
# Phase 3 → Phase 4 Handoff

| Field | Value |
|-------|-------|
| **From** | Phase 3 — Experience & Identity Design |
| **To** | Phase 4 — Build and Merchandising Implementation |
| **Issuing Agent** | Harley (Program Director) |
| **Date** | 2026-03-26 |
| **Recipients** | Tobi (Build Lead), James (QA Lead), Andy (Operations) |

---

## What Phase 3 Delivered

Phase 3 is complete and gate-approved. Everything Tobi needs to build the store is written and locked. Do not interpret, improvise, or substitute — build exactly what the specs say.

| Artifact | Location | What it tells Tobi |
|----------|----------|--------------------|
| Hi-fi page designs | `artifacts/phase-3/hifi-page-designs.md` | Section-by-section layout specs for all 8 key pages |
| UI component system | `artifacts/phase-3/ui-system.md` | Every CSS token, component, and usage rule |
| UX / IA / Sitemap | `artifacts/phase-3/ux-ia-wireframes.md` | Full URL structure, nav, page hierarchy |
| Visual identity | `artifacts/phase-3/visual-identity.md` | Color system, typography, logo specs, photography brief |
| Copy system | `artifacts/phase-3/copy-system.md` | Voice rules, all microcopy, banned words, product description format |
| Asset list | `artifacts/phase-3/asset-list.md` | What Dan is producing (photos, copy) and when |

---

## Decisions Locked — Do Not Reopen

| Decision | ID | Detail |
|----------|----|--------|
| Visual direction | D-015 | Darkroom + Type Pressure hybrid. Dark backgrounds. Non-negotiable. |
| Color system | D-015 | Off-black #1A1A1A, warm white #F5F0EB, red #E63B2E, yellow #F2D024 |
| Typography | D-015 | Barlow Condensed (headings) + Inter (body). Google Fonts. font-display: swap. |
| Gifting surface exception | D-015 | #F5F0EB bg ONLY on /gifts/, /bundles/, checkout. Not a second theme. |
| Pricing | D-006 | Entry ₹149-199, Core ₹249, Premium ₹299-349, Bundles ₹399-999 |
| Free shipping threshold | D-006 | ₹499 — every page must surface this |
| Product scope | D-011 | Accessories only. No apparel, no home/decor at launch. |

---

## Tobi's Primary Build Document

**Start here:** `artifacts/phase-4/technical-implementation-plan.md`

This contains the full build sequence, all integration specs, CSS implementation, platform configuration, and a 45hr time estimate broken down by task. Do not start without reading it end to end first.

### Build Sequence Summary

1. Fynd platform config (store settings, domain, GST, tax zones)
2. Payment integration — Razorpay (UPI, cards, wallets, EMI)
3. Shipping integration — Shiprocket (multi-carrier, COD, auto-AWB)
4. Analytics — GA4 property + Clarity heatmaps
5. CSS/Darkroom theme implementation (design tokens first, then components)
6. Homepage build
7. Collection pages (card stickers hero, No Filter hero, supporting collections)
8. Product detail pages
9. Cart drawer + checkout flow
10. Gifting hub + bundles
11. About page
12. Drop hub mechanic
13. Performance audit (<3s LCP on 4G)
14. QA handoff to James

### Non-Negotiable Performance Constraint

**<3s LCP on 4G is a launch blocker.** Not a nice-to-have. If it fails, James does not clear launch. Image optimization, lazy loading, font-display: swap, and CDN delivery are all specified in the tech plan. Implement them all.

---

## James's QA Brief

**Your document:** `artifacts/phase-4/qa-checklist.md`

This contains P0, P1, and P2 defect classifications. Only P0 and P1 issues block launch. P2 issues go on the post-launch backlog.

**P0 blockers (any of these = no launch):**
- Checkout broken on any payment method
- COD not available
- Razorpay not processing
- Shiprocket not generating AWBs
- GA4 purchase event not firing
- LCP >3s on 4G
- Site not functional on Android Chrome

**James controls launch sign-off.** Not Tobi. Not Harley. James says GO or NO GO.

---

## Andy's Ops Brief

**Your role in Phase 4:** Validate that the operational backbone is ready before launch.

Specifically:
- Shiprocket account configured, zones set, rate cards confirmed
- COD workflow tested end-to-end (order → Shiprocket → AWB → pickup scheduled)
- Razorpay payout schedule confirmed (T+3 standard settlement)
- Return/exchange SOP written before launch — customers will ask
- Packaging materials sourced (per asset-list.md): matte black mailer bags, kraft tissue, TPL sticker seal, handwritten note card stock

---

## What Dan Is Producing in Parallel

Tobi can build the structure without Dan's content — use placeholder images and copy initially. But the following are required before Phase 4 gate:

| Dan's task | Deadline | Where to find the brief |
|------------|----------|------------------------|
| Hero SKU photography (card stickers, No Filter keychains, lapel pins) | Phase 4 mid-point | `artifacts/phase-3/asset-list.md` — Shot List section |
| Product copy for top 15 SKUs | Phase 4 mid-point | `artifacts/phase-3/copy-system.md` — Part 2 |
| Collection header copy | Phase 4 mid-point | `artifacts/phase-3/copy-system.md` — Collection page section |
| About page copy | Phase 4 mid-point | `artifacts/phase-3/hifi-page-designs.md` — Page 6 |

---

## Phase 4 Gate Criteria

Phase 5 does not activate until ALL of the following are true:

- [ ] Staging site live on Fynd
- [ ] All hero products uploaded with real photos and copy
- [ ] Razorpay processing live (test + real)
- [ ] Shiprocket generating AWBs
- [ ] GA4 tracking all key events (page view, add to cart, purchase)
- [ ] LCP <3s on 4G confirmed
- [ ] James has signed off (no P0/P1 issues open)
- [ ] COD tested end-to-end
- [ ] At least 3 collections live with correct products

**Harley reviews and issues Phase 4 gate approval. James controls the sign-off.**
