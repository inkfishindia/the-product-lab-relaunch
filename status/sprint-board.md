# Sprint Board
<!-- last-updated: 2026-06-13 -->

**Current Phase:** 4 — Build & Merchandising Implementation
**Sprint Owner:** Harley
**Last Updated:** 2026-06-13

**Platform Direction:** Medusa + Next.js is the active launch path per D-025. Fynd references below are superseded unless explicitly re-approved by Dan.

---

## 🔴 Blocked

| Task | Owner | Blocker | Since |
|------|-------|---------|-------|
| Production hosting decision | Dan + Tobi | Choose Vercel + Railway/Render/Fly + Supabase/Redis provider | 2026-06-11 |
| Supabase production project | Dan | Need project URL, database password, connection string | 2026-06-11 |
| Razorpay test/live credentials | Dan | Needed for payment provider and webhook testing | 2026-06-11 |
| Shiprocket API credentials | Dan | Needed for AWB/label/COD path validation | 2026-06-11 |
| Airtable API access / ops base | Dan + Andy | Needed for order sync proof | 2026-06-11 |
| Persistent auth/data ownership | Tobi + Andy | Replace prototype in-memory storefront admin/user writes with Medusa or durable app persistence | 2026-06-13 |
| Razorpay webhook payment-session update | Tobi + James | Needs real/test credentials and staging callback validation | 2026-06-13 |
| Shiprocket failure alerting | Tobi + Tony | Order sync failures currently log only; needs durable operator alert/retry path | 2026-06-13 |
| Merchant Center access / domain verification | Dan + Avinash | Needed for product feed diagnostics, free listings, Shopping readiness | 2026-06-11 |
| AI crawler training policy | Dan + Lenny | Decide whether to allow or block training bots such as `GPTBot` while allowing discovery bots | 2026-06-11 |
| Hero product photography | Dan | Dan must execute | 2026-03-26 |
| Hero product copy (descriptions) | Dan | Dan must execute | 2026-03-26 |

---

## 🟡 In Progress

| Task | Owner | Status | Artifact |
|------|-------|--------|----------|
| Next.js storefront | Tobi | Production build passing; Dockerfile added | storefront/ |
| Medusa backend | Tobi | Production build passing; Dockerfile added | backend/medusa/ |
| CTO hardening pass | Tobi + James + Lenny | Auth/session patch applied; remaining P0 gates documented | artifacts/phase-4/cto-codebase-audit-2026-06-13.md |
| Docker readiness | Tobi | Compose config valid; image build pending Docker daemon | docker-compose.yml |
| Medusa commerce spike | Tobi | Ready to execute once credentials exist | backend/medusa-eval/phase-0-technical-spike.md |
| Analytics event schema | Tobi | Draft, needs implementation validation | artifacts/phase-4/analytics-event-schema.md |
| QA checklist prep | James | Draft, needs Medusa/Razorpay/Shiprocket staging target | artifacts/phase-4/qa-checklist.md |
| AEO + agentic commerce readiness | Harley + Tobi + Andy | Requirements documented; implementation tasks need wiring into storefront/catalog | artifacts/phase-4/aeo-agent-commerce-readiness.md |

---

## 🟢 Ready to Start (Unblocked)

| Task | Owner | Prerequisites | Notes |
|------|-------|--------------|-------|
| Deploy storefront preview | Tobi | Vercel project | Use `storefront/` |
| Deploy Medusa staging API | Tobi | Railway/Render/Fly decision + Supabase + Redis | Use `backend/medusa/` Dockerfile |
| Seed 100-product catalog into staging | Tobi | Medusa staging API + DB | `npm run seed:tpl` |
| Run Dan admin usability test | Dan + James | Medusa admin/custom admin path chosen | Must prove daily ops are not engineering-dependent |
| Seeding kit list finalization | Rachel | None | seeds/outreach list needs contacts |
| Email/WhatsApp flow build (Klaviyo) | Eli | None | Can build flows without store live |
| Content calendar execution (writing captions) | Casey | None | Joanna's copy-system is approved |
| WhatsApp opt-in flow design | Eli | None | Can design before platform ready |
| Launch runbook refinement | Andrew + Tony | None | Sharpen hour-by-hour plan |

---

## ✅ Completed (This Phase)

| Task | Owner | Completed | Artifact |
|------|-------|-----------|----------|
| Visual identity system | Sean | 2026-03-26 | artifacts/phase-3/visual-identity.md |
| Copy system | Joanna | 2026-03-26 | artifacts/phase-3/copy-system.md |
| IA + wireframes | Kurt | 2026-03-26 | artifacts/phase-3/ux-ia-wireframes.md |
| UI system | Julie | 2026-03-26 | artifacts/phase-3/ui-system.md |
| Hi-fi page designs (8 pages) | Julie | 2026-03-26 | artifacts/phase-3/hifi-page-designs.md |
| Asset production list | Casey | 2026-03-26 | artifacts/phase-3/asset-list.md |
| Phase 3 gate review | Harley | 2026-03-26 | artifacts/phase-3/phase-gate-review.md |
| Brand positioning | Heyward | 2026-03-15 | artifacts/phase-2/brand-positioning.md |
| PMF assessment | Shreyas | 2026-03-15 | artifacts/phase-2/pmf-assessment.md |
| Pricing framework | Patrick | 2026-03-15 | artifacts/phase-2/pricing-framework.md |
| Product hierarchy | Jenna | 2026-03-15 | artifacts/phase-2/product-hierarchy.md |
| CTO codebase audit | Harley + Tobi + James | 2026-06-13 | artifacts/phase-4/cto-codebase-audit-2026-06-13.md |

---

## 📋 Upcoming (Phase 4 remaining + Phase 5 prep)

| Task | Owner | Target Phase | Notes |
|------|-------|-------------|-------|
| Production infra setup | Tobi | 4 | Vercel storefront + managed Medusa API + Supabase + Redis |
| Razorpay integration | Tobi | 4 | Test payment, webhook verification, payment state update |
| COD workflow | Tobi + Andy | 4 | COD minimum, COD flag, ops confirmation before dispatch |
| Shiprocket integration | Tobi | 4 | AWB, labels, tracking, COD/prepaid flag |
| Airtable order sync | Tobi + Andy | 4 | Medusa order ID idempotency, no sync for failed payment |
| Product catalog seed/import | Tobi + Andy | 4 | 100-product seed exists; launch set should be curated |
| Product feed + structured data | Tobi + Andy + Avinash | 4 | Add `/feed/products.*`, PDP JSON-LD, Merchant Center data hygiene, feed/page/schema consistency |
| Public agent surfaces | Tobi + James | 4 | Add `/robots.txt`, `/sitemap.xml`, `/llms.txt`, crawl-safe policies, block private paths |
| Internal agent access boundary | Tobi + Tony + Lenny | 4 | Define read-only catalog tools first; require auth + explicit confirmation for write operations |
| QA execution | James | 4 | After build complete |
| Pre-launch content production (10 posts) | Chase + Casey | 5 | Can start now |
| Seeding kit dispatch | Rachel | 5 | Need product + packaging |
| Launch runbook dry-run | Andrew | 5 | 1 week before launch |
| Launch date decision | Dan + Harley | 5 | When Phase 4 80% done |

---

## Dan's Open Action Items

| Item | Priority | Notes |
|------|----------|-------|
| Hosting decision | 🔴 CRITICAL | Pick Vercel + managed backend host + Supabase/Redis path |
| Supabase project access | 🔴 CRITICAL | Needed for production/staging Medusa database |
| Razorpay credentials | 🔴 CRITICAL | Needed to prove checkout |
| Shiprocket credentials | 🔴 CRITICAL | Needed to prove fulfillment |
| Airtable access | 🔴 HIGH | Needed to prove ops sync |
| Merchant Center access | 🔴 HIGH | Needed for feed diagnostics, Shopping/free listings setup, shipping/returns configuration |
| AI crawler policy | 🟡 MEDIUM | Decide whether to block training bots while allowing search/discovery bots |
| Hero product photography | 🔴 HIGH | Dark background, phone camera OK. Brief in asset-list.md |
| Hero product copy | 🔴 HIGH | Core descriptions for card stickers, pins. Voice rules in copy-system.md |
| Launch date decision | 🟡 WHEN READY | Harley will surface when Phase 4 is 80% done |
