<!-- last-updated: 2026-06-20 (Direct Meta WhatsApp transport — D-034) -->
# Current Program State — The Product Lab Relaunch

**This is the living session-start document. Read this before doing anything.**
Updated by Harley at the end of every working session.

---

## Where We Are Right Now

**Date:** 2026-06-20
**Phase:** 4 — Build and Merchandising Implementation
**Status:** Active. Mission Control dashboard live. **Platform decision reversed: Medusa + Supabase is now the launch platform** (D-025, supersedes D-022 — Fynd dropped). Storefront (16 routes) and backend already built on Medusa, now seeded with the **real 502-product catalog** (see Catalog Status below — supersedes the earlier 14/100-product spike). Tobi's build pivots from Fynd to Medusa integrations. Same 3 Dan-dependencies remain, plus new hosting/deploy decision.

**Platform override (2026-06-11):** D-025 supersedes the older Fynd launch plan. The active launch platform is now **Next.js storefront + Medusa backend**, with managed production infrastructure recommended as Vercel + Railway/Render/Fly + Supabase Postgres + managed Redis. Older Fynd references in this document are retained as historical context until a full cleanup pass, but they are no longer the plan of action.

**Current commerce action map:**

| Track | Owner | Status | Next Gate |
|---|---|---|---|
| Storefront | Tobi | Next.js app builds successfully; Dockerfile added. **Wired to live Medusa catalog 2026-06-13** — /collections + /collections/[slug] render the real 5 collections + 67 filtered products from the Store API (verified live). Sets/gift-personas pages still static (await Jenna structure). | Collection taglines copy pass (Joanna); Vercel preview/live deployment |
| Commerce backend | Tobi | Medusa backend builds successfully; Dockerfile added | Managed API deployment |
| Database | Dan + Tobi | Local PostgreSQL `tpl_spike` seeded — **502 real products imported** (see Catalog Status). Needs production Supabase project. | Medusa migrations + catalog re-import against Supabase |
| Redis | Tobi | Needs managed Redis choice | Production `REDIS_URL` configured |
| Payments | Tobi + Dan | Razorpay credentials needed | Test payment + webhook pass |
| Shipping | Tobi + Dan | Shiprocket credentials needed | AWB/label/COD path pass |
| Ops sync | Tobi + Andy | Airtable access/base needed | Medusa order sync with idempotency |
| QA | James | Checklist exists | End-to-end staging order signed off |
| Auth & Accounts | Tobi + James | **Consolidated on Medusa + verified live (D-030 admin, D-031 customer, 2026-06-20).** Customer: login/register/logout/me, forgot+reset pw, change-pw (fixed), profile+consent, address book, order history+detail, guest `/track`, claim-by-email, checkout→customer attach. Admin: Medusa-auth login (role from user `metadata.role`; legacy store **deleted**) + server-side `lib/medusa-admin.ts` service-account behind `requireRole` (deny-by-default) on every `/admin/*` + `/api/admin/*`, plus a role-aware `src/proxy.ts` page guard. Custom `/admin` is the **COD-first operator cockpit on real Medusa orders**: list/detail, mark-COD-collected (captures payment), notes/timeline, fulfill, ship+AWB stub, cancel, complete, real dashboard (today/COD-pending/revenue); catalog/customer-edit/refunds/user-mgmt defer to Medusa admin `:9000/app`. Verified live on order #1. No in-memory auth store remains. **Notification provider wired (2026-06-20)**: SMTP/Resend/SendGrid module built, password-reset + token-based order-transfer emails now deliver when provider configured; stub mode logs to stdout + audit trail for dev. | Rotate admin service-account creds before hosted deploy |

---

## Catalog Status — What's Pulled Into Medusa (2026-06-11)

**Source:** WooCommerce export `TPL DUMP/wc-product-export-11-6-2026-1781128734010.csv` (1,592 rows → 1,016 distinct products once variations are folded into parents).

**IN Medusa now — 502 products (live, published, priced in INR):**

| Category | Count | Category | Count |
|---|---|---|---|
| Fridge Magnets | 160 | Pop Up Stickers | 14 |
| Keychains | 139 | Double-sided Keychain | 13 |
| Lapel Pins | 98 | Card Stickers | 11 |
| Earrings | 65 | Luggage Tag | 4 |
| Laptop Stickers | 28 | | |

**CURATED (2026-06-13, D-028):** The 502 were curated for Drop 1. End state in Medusa: **67 published** (text-opinion designs, deduped, cleaned titles) across **5 live collections** (Certified Disaster 21, Soft Serve 17, Big Mood 10, Main Character Energy 10, Cat & Dog People 9); **435 draft** (178 licensed-IP held for licensing review, 104 object/illustration, 153 duplicate variants); 4 Medusa demo apparel deleted. Reversible snapshot + reproducible pipeline in `artifacts/phase-4/catalog-curation/`. Full doc: `artifacts/phase-4/drop-1-merchandising-curation.md`. **Open: licensing review of the 178 held products before Drop 2.**

**NOT pulled — 514 products (held back deliberately):**
- **376 WooCommerce-private** (`Published = -1`) — hidden/discontinued on the old site. Can be imported as Medusa *draft* if Jenna's curation pass wants them staged.
- **138 published but unpriced** — mostly variable products whose priced variations were themselves private. Recoverable with a price source.

**How it was loaded (repeatable pipeline, in `backend/medusa/src/scripts/`):**
1. `prep-woo-catalog.py` — CSV → `import-catalog.json` (groups variations, filters to published, derives price, dedupes handles).
2. `import-woo.ts` — JSON → Medusa via `createProductsWorkflow` (`npx medusa exec ./src/scripts/import-woo.ts`; env: `IMPORT_CATEGORY`, `IMPORT_LIMIT`, `KEEP_EXISTING`).

**Known caveats (parked):**
- Product images are **hotlinked** from `theproductlab.in/wp-content/...` — they render for testing but must be ported to Medusa/CDN before launch.
- One variant per product ("One Size"); WooCommerce variant distinctions (single vs pack, designs) were collapsed. Proper variant modelling is a curation-pass decision.
- The old `convert_catalog.ts` / `seed-products.ts` scripts are dead ends (never imported, flattened variants) — do not use; `seed-tpl.ts` builds the store infra.

---

## What Is Done

### Phases 1, 2, 3 — Complete

Everything through strategy and creative is finished and approved. Do not revisit or reopen any of it unless Dan explicitly instructs.

**The brand is locked** (⚠️ updated 2026-06-11 — the brand was REBRANDED in March; do not use the old Darkroom system):
- Territory: "Small objects. Big opinions."
- Tagline: "Wear your opinion."
- Purchase mechanic: **Find. Collect. Gift.** — all UX/copy/display serves this (D-019)
- Visual system: **Light+Bold** — cream base #F5F0EB, opinion-first, organised chaos, colour comes from the products (D-018, D-021). **Supersedes the old Darkroom system (D-015).** Full specs: `artifacts/phase-4/visual-identity-rebrand.md` + `artifacts/phase-4/ui-system.md`
- Typography: Barlow Condensed (headings) + Inter (body)
- Voice: opinionated, group-chat register, edge on humour, name the person not the product, short enough to forward on WhatsApp. Updated for Light+Bold: `artifacts/phase-4/copy-system-rebrand.md`
- Drop 1 scope: **text opinion stickers only.** Characters/artist platform enter Drop 2 (D-020)
- Pricing: Entry ₹149-199 / Core ₹249 / Premium ₹299-349 / Bundles ₹399-999
- Scope: Accessories only. No apparel. No home. TPL separate from YDS.

> **Source-of-truth note:** This block now matches the live decision log (D-018→D-021). The old Darkroom description (dark #1A1A1A bg) is dead — superseded. Operating doctrine for keeping this file honest: `knowledge/27-OPERATING-CHARTER.md`.

**All creative artifacts approved and ready for build:**
- `artifacts/phase-3/hifi-page-designs.md` — 8 pages specced section-by-section
- `artifacts/phase-3/ui-system.md` — CSS tokens and every component
- `artifacts/phase-3/ux-ia-wireframes.md` — sitemap, IA, wireframes
- `artifacts/phase-3/visual-identity.md` — full visual system
- `artifacts/phase-3/copy-system.md` — voice rules and all copy contexts
- `artifacts/phase-3/asset-list.md` — what Dan needs to produce

**All Phase 4, 5, 6 artifacts written and ready to execute:**
- Phase 4: tech plan, analytics schema, QA checklist
- Phase 5: launch narrative, content calendar (with actual copy), seeding plan, email/WhatsApp flows, launch runbook
- Phase 6: optimization plan, 30-day review framework

**All handoffs written:**
- `handoffs/phase-3-to-4-handoff.md` → Tobi, James, Andy
- `handoffs/phase-4-to-5-handoff.md` → Nik, Chase, Rachel, Eli, Andrew, Casey
- `handoffs/phase-5-to-6-handoff.md` → Eli, Nik, Tony, Lenny

---

## What Was Completed This Session (2026-06-20)

### WhatsApp Notification System — Event-Driven, Built

**D-033.** Everything the user table above asked for is now wired:

| Event | Now Delivered Via | Provider |
|-------|------------------|----------|
| Order confirmation (prepaid) | WhatsApp | `order.placed` subscriber → `whatsapp-notification` + `order.confirmed_prepaid` template |
| Order confirmation (COD) | WhatsApp | Same listener, different template (no ₹30 savings line) |
| Tracking update / AWB | WhatsApp | `fulfillment.created` subscriber → `order.shipped` template with tracking link + AWB |
| Delivery confirmation | WhatsApp | `order.updated` subscriber → `order.delivered` when status = "completed" |
| COD payment reminder | WhatsApp | Template ready (`cart.cod_reminder`), needs timer-based trigger (future) |
| Abandoned cart | WhatsApp | Template ready (`cart.abandoned`), needs timer subscriber (future) |
| Order issue / return | WhatsApp | 7 templates ready: `issue_damaged`, `issue_wrong_item`, `lost_shipment`, `return_requested`, `exchange_requested`, `refund_prepaid`, `refund_cod` |
| Drop announcement | WhatsApp | Template ready (`marketing.drop_announcement`), respects opt-in |
| Customer support ticket | WhatsApp | Template ready (`support.escalation`), Dan replies from shared inbox |
| Password reset | Email (unchanged from D-032) | Kept on SMTP — security token, async, universal |
| Order transfer | **Updated to WhatsApp** | Previously email — now whatsapp-notification `order.transfer_requested` template (time-sensitive, higher open rate) |

**Module architecture:**
- `backend/medusa/src/modules/whatsapp-notification/index.ts` — Gupshup (primary) / MSG91 (fallback) / Meta (direction via graph.facebook.com) WhatsApp provider. Stub mode when no credentials set. Audit trail to `notification-audit/whatsapp-*.jsonl`.
- `backend/medusa/src/modules/whatsapp-notification/meta-transport.ts` — Direct Meta Cloud API transport. Sends template messages via `graph.facebook.com/v22.0/{phone-number-id}/messages`. Zero BSP markup — pays Meta's conversation rates directly. Retry logic for 429/5xx (3 attempts, exponential backoff). Template names auto-mapped from dot notation to underscores (`order.confirmed_prepaid` → `order_confirmed_prepaid`).
- `backend/medusa/src/modules/whatsapp-notification/templates.ts` — 21 WhatsApp templates matching the brand voice from `docs/ops-sop/customer-comms-templates.md`. Each has `requires_opt_in` flag — marketing templates respect `whatsapp_consent`, transactional always send. Also exports `getMetaTemplateParams()` converting internal names to Meta-approved format.
- `backend/medusa/src/subscribers/order-confirmation.ts` — `order.placed` → confirms order (prepaid vs COD)
- `backend/medusa/src/subscribers/fulfillment-notification.ts` — `fulfillment.created` → shipped with tracking
- `backend/medusa/src/subscribers/order-delivery.ts` — `order.updated` → delivered when status = "completed"

**Checkout WhatsApp consent:**
- New checkbox in `checkout-client.tsx` : "Send order updates on WhatsApp" — shown when phone is entered
- Stored on cart `metadata.whatsapp_consent` → inherited by order
- Profile page consent toggle (D-031) also feeds into notification data
- Transactional messages always send; marketing messages respect opt-in

**Go-live:** Set credentials for any provider + `WHATSAPP_PROVIDER` in backend `.env`, restart. No code change.

**Provider options:**
- `WHATSAPP_PROVIDER=meta` → `META_WABA_PHONE_NUMBER_ID` + `META_WHATSAPP_ACCESS_TOKEN` (zero BSP markup, direct Meta Cloud API)
- `WHATSAPP_PROVIDER=gupshup` (default) → `GUPSHUP_API_KEY` + `GUPSHUP_SOURCE_NUMBER`
- `WHATSAPP_PROVIDER=msg91` → `MSG91_AUTH_KEY` + `MSG91_SENDER_NUMBER`

Full Meta setup guide at `docs/ops-sop/whatsapp-business-api-setup.md`. Covers WABA enrollment, phone registration, template submission, permanent token generation, webhook config, and testing.

**Stub mode:** Without credentials, messages log to stdout + `notification-audit/whatsapp-*.jsonl`.

### Notification Provider (Email) — Now Live

Both dormant systems are now wired end-to-end:

| Feature | Backend | Storefront | Status |
|---------|---------|-----------|--------|
| SMTP notification module | `src/modules/smtp-notification/` — Nodemailer + Resend/SendGrid fallback | — | Built, registered in medusa-config.ts |
| Password-reset email | `src/api/store/reset-password/` — token gen + notification delivery | `/forgot-password` → `/api/auth/forgot-password` → backend; `/reset-password?token=` → `/api/auth/reset-password` + token verification on mount | Verified live |
| Order transfer email | `src/api/store/order-transfer-request/` — token gen + notification delivery | `/orders/accept-transfer?token=` → `/api/account/accept-transfer` → backend | Verified live |
| Stub mode (dev) | Logs email content to stdout + `notification-audit/*.jsonl` when no provider configured | — | Built |
| Audit trail | Daily rotated JSONL files in `notification-audit/` | — | Built |
| Env template | SMTP / Resend / SendGrid credential docs added to `.env.template` | — | Updated |

### D-034 — Direct Meta WhatsApp Transport Added

New `meta-transport.ts` sends message templates directly via `graph.facebook.com/v22.0/{phone-number-id}/messages`. Template names auto-mapped from dot to underscore notation. 3-retry logic for 429/5xx with exponential backoff. Credentials detected alongside Gupshup/MSG91 in all subscriber and config WHATSAPP_ENABLED checks. Full setup SOP at `docs/ops-sop/whatsapp-business-api-setup.md` covering WABA enrollment, phone registration, template submission, token generation, webhook config, and testing. Provider selectable via `WHATSAPP_PROVIDER=meta`.

### WhatsApp Notification Module — Tech Table

| Feature | Backend | Storefront | Status |
|---------|---------|-----------|--------|
| WhatsApp notification provider | `src/modules/whatsapp-notification/` — Gupshup + MSG91 + Meta (Cloud API direct) transport, stub mode, 21 templates | — | Built, registered in medusa-config.ts |
| Order confirmation (WhatsApp) | `src/subscribers/order-confirmation.ts` — `order.placed` → prepaid/COD variant | WhatsApp consent checkbox in checkout | Verified |
| Shipping notification (WhatsApp) | `src/subscribers/fulfillment-notification.ts` — `fulfillment.created` → tracking + AWB | — | Built |
| Delivery confirmation (WhatsApp) | `src/subscribers/order-delivery.ts` — `order.updated` → "completed" delivered | — | Built |
| WhatsApp consent in checkout | Cart `metadata.whatsapp_consent` → inherited by order | Checkbox in `checkout-client.tsx` | Built |
| Stub mode (dev) | Logs message body to stdout + `notification-audit/whatsapp-*.jsonl` | — | Built |
| Env template | Gupshup / MSG91 credential docs added to `.env.template` | — | Updated |

### What works without any email provider (stub mode)
- Forgot-password: generates valid token, logs reset URL to console. Developer copies URL to test.
- Order transfer: generates valid token, logs accept URL to console.
- `/track`, `claim-by-email`, `change-password` — unaffected, still work.

### How to go live
Set any of `SMTP_HOST+SMTP_USER+SMTP_PASS` / `RESEND_API_KEY` / `SENDGRID_API_KEY` in the backend `.env` and restart. No code change.

---

## What Was Completed This Session (2026-06-06)

### Research Sprint (3 docs, ~1,300 lines total)

| Item | Resolution | Docs |
|------|-----------|------|
| Competitor landscape depth | Threat deep dives for Stick It Up (HIGH), Dot Badges (MEDIUM-HIGH), The Riyal Store (MEDIUM) — attack vectors, TPL advantages, defensive priorities. | `prototypes/tpl-site-prototype.html`, D-023 |
| Medusa ecosystem audit | Full audit of v2.15.5: Razorpay/Shiprocket/COD/GST/Airtable integration status, admin usability, costs. **Verdict:** Day 30-60 migration, not Day 1 launch. | `backend/medusa-eval/2026-06-medusa-ecosystem-research.md` |
| Fynd platform research | 640-line end-to-end reference for Tobi: catalog, drops, bundles, promotions, Razorpay, Shiprocket, GA4, API, headless, gaps. | `docs/fynd-platform-research.md` |
| Open-source tooling eval | 25+ tools across 8 categories (Softr→ToolJet, Airtable→NocoDB, analytics→Umami, email→Listmonk, CRM→EspoCRM, ERP→ERPNext, docs→Paperless, automation→Activepieces). | `docs/open-source-tooling-research.md` |
| Consolidated tooling roadmap | 3-tier rollout: Now (₹1,180/mo) / Day 30 (+₹500-1,500) / Day 60+ (+₹0-1,180). All within ₹5K ceiling. | `docs/tooling-roadmap.md` |

### Unblocker Tools (for Dan's 3 dependencies)

| Tool | Purpose | Docs |
|------|---------|------|
| Historical Fynd account checklist | Superseded by D-025; retained only as reference | `artifacts/phase-4/dan-fynd-account-checklist.md` |
| Copy fast-start template | Fill-in-the-blanks for 15 hero SKUs, 7 pre-written with hooks/why/WhatsApp/specs | `artifacts/phase-4/dan-copy-faststart-template.md` |
| Catalog/CMS workflow | 8-part ops guide: PDP data model, content workflow, Fynd CMS, CSV import, seasonal planning, agent prompt | `artifacts/phase-4/catalog-cms-workflow.md` |

### Storefront Build (Medusa-based, Day 30 target)

All 16 routes built and compiling (2.6s build, zero errors):

| Type | Pages |
|------|-------|
| **Existed** | Homepage, PDP, Cart, Checkout, Order Confirmed |
| **New** | Collections Index, 7 Collection Details, Sets Index, 5 Set Details, Gift Hub, 4 Gift Personas, About, Drop Hub, FAQ (14 items), Contact, Sell Your Art |

Shared data layer: `storefront/src/lib/data.ts` with all collections, sets, gift personas.

### Project Dashboard

| Item | Location |
|------|----------|
| 🚀 Mission Control | `http://127.0.0.1:3000/mission-control` — live dashboard with 6 tabs (Overview, Milestones, Goals, Agents, Decisions, Blockers), phase pipeline, progress tracking, blocker alerts, Dan escalation list |
| Interactive command center | `prototypes/command-center.html` — original static prototype |
| SHARED.md updated | `.claude/memory/SHARED.md` — now accurate for Colin |

### Decisions
- **D-023:** Competitor landscape completed (active)
- **D-024:** Drop 1 lead proposal (proposed)

### What Changed After D-025
- Platform path changed from Fynd launch to Medusa + Next.js launch.
- Phase 4 is still active, and Phase 5 is still gated.
- Dan-dependencies are now: hosting decision, Supabase, Razorpay, Shiprocket, Airtable access, photography, and copy.

| Item | Resolution | Docs |
|------|------------|------|
| Full site scrape of theproductlab.in | Complete product catalog extracted via WP REST API — 100 products with titles, handles, OG images, Yoast SEO descriptions, categories, tags | `site-scrape/theproductlab-in-complete-inventory.md` |
| Medusa seed data for full catalog | Created `seed-data.ts` with all 100 products mapped to Medusa format (category, price, image, handle, description). Updated `seed-tpl.ts` to import from seed-data with auto-generated SKUs instead of the hardcoded 10-product spike. Seed now reads: "TPL seed complete. 100 products imported." | `backend/medusa/src/scripts/seed-data.ts`, `backend/medusa/src/scripts/seed-tpl.ts` |

## Current Blockers (What Hasn't Started Yet)

| Blocker | Owner | Unblocks | Unblocker Tool |
|---------|-------|----------|----------------|
| Hosting decision | Dan + Tobi | Production deployment path | Recommended: Vercel + Railway/Render/Fly + Supabase + managed Redis |
| Supabase production project | Dan | Medusa production/staging DB | Need connection string and database password |
| Razorpay test/live credentials | Dan | Checkout proof | Needed for payment provider and webhook validation |
| Shiprocket API credentials | Dan | Fulfillment proof | Needed for AWB, label, tracking, COD path |
| Airtable API access / ops base | Dan + Andy | Ops sync proof | Needed for Medusa order -> Airtable sync |
| Hero product photography (dark bg, phone camera) | Dan | Product pages, PDP | `artifacts/phase-3/asset-list.md` — shot list for 7 hero SKUs |
| Product copy for hero SKUs | Dan | Product pages, PDP | `artifacts/phase-4/dan-copy-faststart-template.md` — fill-in-the-blanks for 15 SKUs |

**Existing unblocker docs:** The Copy Fast-Start template extracts the 4-part PDP structure from the 1500-line copy-system.md into a one-page worksheet Dan can fill in 10 minutes per SKU. The old Fynd checklist is historical only after D-025.

---

## What Needs to Happen Next

### Right now (Phase 4 — parallel tracks):

**Tobi's track** (Medusa + Next.js launch):
1. ~~Deploy storefront preview/live target — Vercel recommended.~~ → See `artifacts/phase-4/deploy-checklist.md`
2. ~~Deploy Medusa staging API — Railway/Render/Fly recommended.~~ → See `artifacts/phase-4/deploy-checklist.md`
3. ~~Connect Medusa to Supabase Postgres and managed Redis.~~ → See `artifacts/phase-4/deploy-checklist.md`
4. ~~Run migrations and seed curated launch catalog.~~ → See `artifacts/phase-4/supabase-migration-guide.md`
5. Implement Razorpay payment provider and webhook verification.
6. Implement COD workflow: threshold, order marking, ops confirmation, Shiprocket flag.
7. Implement Shiprocket AWB/label/tracking path.
8. Implement Medusa order -> Airtable sync with Medusa order ID idempotency.
9. Confirm GA4 ecommerce events from storefront through purchase.
10. Fix P0 build defects (LB-01 through LB-07 per `qa-checklist.md`)
11. Performance audit (<3s LCP on 4G — hard requirement).
12. Hand off to James for staging QA.

Full build blueprint: `artifacts/phase-4/technical-implementation-plan.md`
New deploy checklist: `artifacts/phase-4/deploy-checklist.md`
New migration guide: `artifacts/phase-4/supabase-migration-guide.md`

**Dan's track** (can start now — unblocker tools created):
1. **Production infrastructure inputs:**
   - Choose/approve hosting path: Vercel + Railway/Render/Fly + Supabase + managed Redis
   - Create/share Supabase project access or production DB connection string
   - Share Razorpay test/live credentials
   - Share Shiprocket API credentials
   - Share Airtable API access/base details
2. **Product photography:**
   - Setup: dark posterboard + desk lamp (₹250 one-time cost)
   - Shoot list: `artifacts/phase-3/asset-list.md` Section 1.2 (7 hero products, 3-5 angles each)
   - 2-3 hour task total, can be done in one evening
3. **Product copy:**
   - Use `artifacts/phase-4/dan-copy-faststart-template.md` — fill in the blanks
   - 7 hero SKUs pre-written with identity hooks, why-this paragraphs, WhatsApp lines, and specs
   - ~10 min per SKU = ~90 min total
   - Artist attribution is the only gap — insert artist names where applicable

**Product / Marketing / Growth track** (new — competitive intelligence delivered):
1. Andy & Shreyas: Review the opportunity map in `#competitors` page — validate TPL's product differentiation against 8 identified gaps
2. Nik & Avinash: Use feature matrix to frame TPL's launch positioning — TPL has unique advantages no competitor can claim (collect sets, gift personas, artist platform, opinion wall)
3. Chase & Rachel: Reference competitor analysis for TPL messaging differentiation — lead with the 4 unique differentiators in pre-launch content

Handoff with full detail: `handoffs/2026-06-06-competitor-research-to-product-growth-marketing.md`

**James's track** (can start now):
1. Review `artifacts/phase-4/qa-checklist.md`
2. Set up QA environment
3. Prepare test scripts for all P0 and P1 criteria

### Phase 4 gate criteria (before Phase 5 activates):
- [ ] Staging storefront live
- [ ] Staging Medusa API live against Supabase Postgres
- [ ] Redis configured for staging/production
- [ ] All hero products uploaded with real photos and copy
- [ ] Razorpay processing live (test + real transactions)
- [ ] Shiprocket generating AWBs (including COD tested end-to-end)
- [ ] Airtable order sync works and is idempotent
- [ ] GA4 tracking all key events (page view, add to cart, purchase)
- [ ] LCP <3s on 4G confirmed
- [ ] James has signed off — no P0 or P1 issues open
- [x] At least 3 collections live with correct products — **DONE (D-028, 2026-06-13): 5 collections live, 67 curated Drop 1 products. See `artifacts/phase-4/drop-1-merchandising-curation.md`**

**James controls the gate. No one else signs off.**

### Medusa Launch Execution
- Medusa + Supabase is now the active launch path per D-025.
- **Full catalog seed data now ready** — 100 products from theproductlab.in mapped to Medusa seed format with categories, pricing, images, descriptions at `backend/medusa/src/scripts/seed-data.ts`
- `seed-tpl.ts` imports seed-data and seeds all 100 products via Medusa v2 product workflow.
- When backend is running: `npx medusa exec ./src/scripts/seed-tpl.ts` seeds everything.
- Docker readiness pass completed: storefront and Medusa Dockerfiles added; root `docker-compose.yml` added; compose config validates.
- Production deployment should use managed services, not raw Docker Compose: Vercel for storefront, Railway/Render/Fly for Medusa API, Supabase for Postgres, managed Redis.
- Launch gate remains: Razorpay, Shiprocket, COD, Airtable sync, GA4, and James QA signoff.
- Decision D-025 is logged in `decisions/decision-log.md`.

### Phase 5 pre-launch work (can start in parallel with Phase 4):
- Rachel: Begin identifying gift recipients (profile in `artifacts/phase-5/seeding-plan.md`)
- Eli: Set up Klaviyo/Mailchimp and MSG91/Gupshup accounts
- Chase: Prepare the 10 pre-launch posts for scheduling (copy already written in `artifacts/phase-5/content-calendar.md`)
- Casey: Produce Reels and visual assets (visual brief in `artifacts/phase-3/asset-list.md`)

Phase 5 publishing starts only after Phase 4 gate is passed and site is live.

---

## Key Numbers Every Agent Needs to Know

| Metric | Value | Source |
|--------|-------|--------|
| Annual revenue | ₹48L (₹4L/month) | knowledge/16-COMPANY-FACTS.md |
| B2B share | 80% | knowledge/16-COMPANY-FACTS.md |
| D2C share | 20% (the target of this relaunch) | knowledge/16-COMPANY-FACTS.md |
| Gross margin | 73% | knowledge/16-COMPANY-FACTS.md |
| Net margin | 34% | knowledge/16-COMPANY-FACTS.md |
| Store rent | ₹1L/month (Cunningham Road) | knowledge/16-COMPANY-FACTS.md |
| Free shipping threshold | ₹499 | D-006 |
| COD minimum | ₹299 | D-006 |
| Prepaid discount | ₹30 | D-006 |
| Target conversion rate | 1.5-2.5% | artifacts/phase-6/optimization-plan.md |
| Target AOV | ₹350+ | artifacts/phase-6/optimization-plan.md |
| Pre-launch subscriber target | 500+ | D-007 |
| Gift seeding target | 20+ products | D-007 |

---

## People & Contacts Referenced in Artifacts

| Name / Group | Context | Artifact |
|--------------|---------|----------|
| Design Yatra contacts | Dan's network — priority seeding recipients | D-013, artifacts/phase-5/seeding-plan.md |
| Boltminor | Past collaboration | knowledge/16-COMPANY-FACTS.md |
| Meta, Diageo, Coca-Cola, Amazon | B2B clients | knowledge/16-COMPANY-FACTS.md |

---

## Agent Activation Status

| Agent | Phase | Status |
|-------|-------|--------|
| Harley | All | Active (main session) |
| Claire | 1 | Complete |
| Maria | 1 | Complete |
| Weiss | 1-2 | Complete |
| Heyward | 2 | Complete |
| Jenna | 2 | Complete |
| Shreyas | 2 | Complete |
| Patrick | 1-2 | Complete |
| Raj | 1 | Complete |
| Sean | 3 | Complete |
| Joanna | 3 | Complete |
| Kurt | 3 | Complete |
| Julie | 3 | Complete |
| Casey | 3, 5 | Phase 3 complete; Phase 5 ready to activate |
| Tobi | 4 | Active — Medusa/Next.js build path now primary |
| James | 4 | Ready — can start QA prep now |
| Andy | 4 | Ready — Shiprocket + packaging tasks ready |
| Nik | 5 | Phase 5 artifact written; activates at Phase 4 gate |
| Andrew | 5 | Phase 5 artifact written; activates at Phase 4 gate |
| Chase | 5 | Phase 5 artifact written; can prep posts now |
| Rachel | 5 | Phase 5 artifact written; can start identifying recipients now |
| Eli | 5-6 | Phase 5-6 artifacts written; can set up platforms now |
| Tony | 5-6 | Activates at Phase 5 |
| Lenny | 6 | Activates at Phase 6 |
| Avinash | 5 | Activates at Phase 5 (performance/paid — not before Phase 6 go/no-go) |

---

## How Harley Spawns Agents

When Dan asks Harley to activate an agent, use this sequence:

1. Read the agent's persona from `knowledge/02-AGENT-PERSONAS.md`
2. Read the agent's system prompt from `knowledge/09-AI-AGENT-PROMPTS.md`
3. Identify the agent's primary artifact for the current phase from `CLAUDE.md` artifact map
4. Read the relevant handoff document from `handoffs/`
5. Inject the above as context into the agent prompt
6. The agent reads its own files, does its work, writes to the correct `artifacts/phase-N/` location
7. Harley reviews the output before it's considered approved

Minimum context every agent receives:
- Their own persona (knowledge/02)
- Brand decisions D-005, D-006, D-007, D-011, D-015 (the locked ones)
- The company facts (knowledge/16)
- Their phase deliverables (knowledge/06)
- Relevant upstream artifacts from the artifact map above

---

## Escalation Rules — What Goes to Dan

Only escalate these. Everything else Harley decides:

1. **Launch date** — not yet decided
2. **Drop 2 timing** — after Day 30 data
3. **Any budget >₹5K/month**
4. **Paid advertising decision** (Phase 5 is organic only)
5. **Pricing change** (D-006 locked, but Dan's call to change)
6. **Hiring** (deferred to Phase 5-6, Dan's call)

Do NOT escalate:
- Creative decisions (D-015 locked)
- Copy/voice decisions (copy-system.md locked)
- Scope decisions (D-011 locked)
- Platform choices already made (D-025: Medusa + Next.js for launch)

---

## Next Scheduled Update

Update this file at the end of every working session. The fields to update:
- "Where We Are Right Now" (date, phase, status)
- "Current Blockers" (what's unblocked, what's new)
- "What Needs to Happen Next" (updated task list)
- "Agent Activation Status" (who's been activated)
