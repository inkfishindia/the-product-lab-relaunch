<!-- last-updated: 2026-06-11 -->

# Handoff Record — Live Build Remediation Plan

## Handoff: James (QA) to Tobi (Frontend Build)

| Field | Value |
|-------|-------|
| **Date** | 2026-06-11 |
| **Handoff ID** | H-011 |
| **From Agent** | James — QA Lead |
| **To Agent** | Tobi — Frontend Build Lead |
| **Status** | Pending review (Harley/Dan) |
| **Severity** | Launch-blocking — verdict is NO-GO |

### Artifact(s) Delivered

| Artifact | Location | Status |
|----------|----------|--------|
| Live Build Defect Log + Playwright Pass | `artifacts/phase-4/qa-checklist.md` → "Live Build Defect Log — localhost:3000 (2026-06-11)" | draft |
| Evidence — homepage 375px | `home-mobile.png` (project root) | reference |
| Evidence — PDP 375px (broken ATC button) | `pdp-mobile.png` (project root) | reference |

### Quality Assessment (by delivering agent)

The build was reviewed two ways: (1) static markup + compiled CSS by Kurt and Julie, (2) a live Playwright pass at 375px mobile by Harley. The funnel below "Add to Cart" could NOT be tested because the commerce backend is offline — those checks are blocked, not passed. Treat every cart/checkout/COD item as unverified until the backend is up and the pass is re-run. Findings that two independent reviewers or a live runtime check confirmed are marked high-confidence below.

---

### The Remediation Plan — Fix In This Order

The order matters. Nothing in the funnel can be tested or fixed-with-confidence until the backend is up, so that is Step 0. Do not skip ahead.

#### STEP 0 — Unblock everything: bring up the commerce backend (LB-07) — owner: Tobi / Dan
- **Problem:** Storefront calls `http://localhost:9000/store/carts` → `ERR_CONNECTION_REFUSED`. Nothing listens on :9000. Medusa is down, so the cart is permanently empty and the entire funnel is dead.
- **Do:** Start the Medusa backend (`backend/medusa/`) on :9000 with the `tpl_spike` Postgres DB, confirm `/health` returns 200, and confirm the storefront's API base URL / publishable key in `storefront/src/lib/medusa.ts` points at it.
- **Done when:** `curl http://localhost:9000/health` → 200, and a product page can fetch a live variant price.
- **Note for Dan:** if the backend is intentionally deferred (D-022 Fynd path), then this storefront is the wrong target to QA — flag that before Tobi spends time here.

#### STEP 1 — P0 storefront fixes (parallelizable once Step 0 is done)
| ID | Fix | File | Done when |
|----|-----|------|-----------|
| LB-01 | Add to Cart renders the raw JSX string `₹{(product.variants?.[0]?.calculated_price?.calculated_amount \|\| 0) / 100}`. It's a broken string literal, not an expression — confirmed at runtime post-hydration. | `storefront/src/app/products/[handle]/add-to-cart-button.tsx` | Button reads "Add to Cart — ₹249" and a click adds the line to a live cart |
| LB-02 | Zero product images (cardImgs=0) and homepage hero `/hero-stickers.jpg` 404s. | Catalog image data (Shreyas) + image binding/fallback in card + hero components | Cards show images or a branded placeholder; hero loads |
| LB-05 | Mobile bottom-nav "Shop/Sets/Gifts" are dead `<button>`s — clicking does nothing, no route change, no drawer. No hamburger in header. Mobile has no working primary nav. | Bottom-nav component + mobile header | Bottom-nav items are `<a>` with correct hrefs; a working mobile menu exposes Login, Search, New In, The Drop |
| LB-04 | No focus ring on any interactive element (`outline-none`, spec `--shadow-pop` never built). | `storefront/src/app/globals.css` | Visible focus ring on all buttons/links, ≥3:1 contrast |

#### STEP 2 — Re-run the full Playwright funnel pass (owner: James, after Steps 0–1)
Currently impossible. Once unblocked, verify: free-shipping progress bar, qty controls, checkout, **COD ₹299 min enforcement**, **prepaid ₹30 discount**, order confirmation, sticky ATC on PDP, gift-note field, pincode check, cart hydration <3s on throttled 4G.

#### STEP 3 — P1s before launch
- Fonts not bundled (LB-03, now P1): add Barlow Condensed + Inter via `next/font/google` in `storefront/src/app/layout.tsx` — they render on the test Mac but will fall back on most Android.
- Hero h1 computes to 16px at 375px (P1-07) — fix the `text-opinion` token in `tailwind.config`; spec wants ~48px mobile.
- PDP gaps: artist attribution, WhatsApp share, trust micro-copy under ATC, breadcrumbs.
- Per-page `<title>`/meta (all pages currently "The Product Lab").
- Purge `mission-control` CSS leakage: off-system colors (#2DD4BF, #3B82F6, #EAB308) + undefined `--font-mc-*` vars.

#### STEP 4 — P2s (pre-launch or within 7 days)
Dead WhatsApp footer link (`href="#"`), missing GST in footer, skip-to-content link, empty hero `alt`, container max-width inconsistency, footer collection names vs spec sitemap, `/sets/` vs `/bundles/` namespace, scarcity/review/cross-sell/IG-feed modules.

---

### Instructions for Receiver

Start at Step 0 and do not report any funnel item as fixed until James has re-run the Playwright pass against a live backend. The three storefront P0s (LB-01/02/05) plus focus states (LB-04) are the gate to that re-test. Do not touch locked decisions (D-005 brand, D-006 pricing, D-015/rebrand visual) — if a fix seems to conflict with them, escalate to Harley.

### Open Questions

1. **Is the Medusa backend supposed to be running, or is this storefront deferred under D-022 (Fynd)?** This determines whether Tobi fixes the backend or whether QA should target a different build entirely. **Escalate to Dan.**
2. Are product images blocked on Shreyas/catalog data, or is it purely a binding bug? Determines whether LB-02 is a Tobi-only fix.

### Dependencies Resolved
- Live-build QA review (markup + runtime) complete; defects identified, prioritized, and evidenced.

### Dependencies Created
- Tobi's Step 0–1 work unblocks James's Step 2 re-test, which is the gate to a launch GO/NO-GO call.
