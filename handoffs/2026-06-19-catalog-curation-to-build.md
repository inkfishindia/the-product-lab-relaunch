<!-- last-updated: 2026-06-19 -->
# Handoff — Drop 1 Catalog Curation → Build / Copy / QA

| Field | Value |
|-------|-------|
| **from:** | Harley (Program Director) |
| **to:** | Tobi (build), Joanna (copy), James (QA), Dan (decisions) |
| **Date** | 2026-06-19 |
| **Phase** | 4 — Build |
| **Status** | Pending review (Dan) |

## What was delivered
Drop 1 catalog curation (D-028) — the 502 raw WooCommerce products in Medusa were curated to launch state and are **live and shoppable end-to-end**:
- **67 published** text-opinion products across **5 collections** (Certified Disaster 21, Soft Serve 17, Big Mood 10, Main Character Energy 10, Cat & Dog People 9).
- **435 draft backlog** (178 licensed-IP held for review, 104 object/illustration, 153 dup variants); 4 Medusa demo apparel deleted.
- Titles cleaned (category noise stripped, typos/entities fixed, sentence case).
- Storefront already renders it: `/collections` + `/collections/[slug]` pull live Medusa data via the store API + handle overlay. Verified live this session.

**Artifacts:**
- `artifacts/phase-4/drop-1-merchandising-curation.md` (the curation doc + flags)
- `artifacts/phase-4/catalog-curation/` (drop1-plan.json, catalog-export-raw.tsv, backup-products-pre-drop1.csv)
- `backend/medusa/src/scripts/curate-drop1.py` + `apply-drop1.ts` (reproducible, idempotent)

## Quality assessment (honest)
- Curation logic is sound and verified against DB + `/store/collections` API. Reversible (snapshot taken).
- **Not done:** PDP descriptions — many of the 67 are empty/weak. Product pages aren't QA-ready until copy lands.
- **~6 residual near-twin titles** need a manual merge (listed in the curation doc).
- **Product images still hotlinked** from old WordPress — must port to CDN before launch (pre-existing).

## What each receiver should do next
- **Joanna:** write on-brand PDP copy (hook + why + WhatsApp line + specs) for the 67 published products, in the 5-collection voice. Highest-value unblocked task.
- **Tobi:** (catalog side done) — sets/gift-persona pages are still static `data.ts`; wire to Medusa when those become launch-relevant. Otherwise focus stays on integrations (Razorpay/Shiprocket/Airtable/GA4) pending Dan's credentials.
- **James:** product pages not yet QA-ready (copy pending). Collections criterion of the Phase 4 gate is now met (5 live).
- **Dan:** see "Before next session" below.

## Phase 4 gate status
✅ "≥3 collections live with correct products" — **met**. All other criteria (staging deploy on Supabase, Redis, Razorpay live, Shiprocket/COD, Airtable sync, GA4, LCP <3s, James sign-off) remain open and are mostly blocked on Dan's inputs. James still owns the gate.
