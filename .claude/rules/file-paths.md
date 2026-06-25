---
globs: ["*.md", "artifacts/**", "handoffs/**", "decisions/**", "status/**", "knowledge/**"]
---

# Master File Path Reference

When reading or writing artifacts, use ONLY these exact file names. Do not invent new names.

## Phase 1 — Audit (Complete)

| File | Owner | Contains |
|------|-------|----------|
| `artifacts/phase-1/site-teardown-catalog-audit.md` | Maria | Site audit, catalog review |
| `artifacts/phase-1/customer-insight-report.md` | Weiss | Segments, behavior, language |
| `artifacts/phase-1/competitor-research.md` | Jenna | Competitor analysis |
| `artifacts/phase-1/problem-statement-memo.md` | Harley | Top 5 problems |
| `artifacts/phase-1/baseline-financials.md` | Patrick | Revenue, cost structure |
| `artifacts/phase-1/logistics-baseline.md` | Raj | Shipping options, COD rates |
| `artifacts/phase-1/fulfillment-sop.md` | Raj | Order-to-dispatch SOP |
| `artifacts/phase-1/cod-strategy.md` | Raj | COD risk, verification |
| `artifacts/phase-1/shipping-partner-evaluation.md` | Raj | Carrier comparison |
| `artifacts/phase-1/data-audit-tpl-dump.md` | Maria | Source data contradictions |
| `artifacts/phase-1/project-plan.md` | Harley | Master 6-phase plan |

## Phase 2 — Strategy (Complete)

| File | Owner | Contains |
|------|-------|----------|
| `artifacts/phase-2/brand-positioning.md` | Heyward | Audience, positioning, message architecture |
| `artifacts/phase-2/product-hierarchy.md` | Jenna | Collections, hero products, MVL |
| `artifacts/phase-2/pricing-framework.md` | Patrick | Approved pricing tiers |
| `artifacts/phase-2/pmf-assessment.md` | Shreyas | Product-market fit evidence |

## Phase 3 — Creative (Complete)

| File | Owner | Contains |
|------|-------|----------|
| `artifacts/phase-3/visual-identity.md` | Sean | Colors, type, logo, photography brief |
| `artifacts/phase-3/copy-system.md` | Joanna | Voice rules, copy contexts, banned words |
| `artifacts/phase-3/ux-ia-wireframes.md` | Kurt | Sitemap, IA, nav, wireframes, journey |
| `artifacts/phase-3/ui-system.md` | Julie | CSS tokens, components, Fynd constraints |
| `artifacts/phase-3/hifi-page-designs.md` | Julie | 8 pages fully specced |
| `artifacts/phase-3/asset-list.md` | Casey | Photo shot list, content schedule |
| `artifacts/phase-3/phase-gate-review.md` | Harley | Phase 3 gate — GO |

## Phase 4 — Build (Active)

| File | Owner | Contains |
|------|-------|----------|
| `artifacts/phase-4/technical-implementation-plan.md` | Tobi | Build blueprint, integrations, CSS |
| `artifacts/phase-4/analytics-event-schema.md` | Tobi/Avinash | GA4 events, UTM, Clarity |
| `artifacts/phase-4/qa-checklist.md` | James | P0/P1/P2 criteria, launch sign-off |

## Phase 5 — Launch (Planned)

| File | Owner | Contains |
|------|-------|----------|
| `artifacts/phase-5/launch-narrative.md` | Nik | Launch story, pre/post-launch |
| `artifacts/phase-5/content-calendar.md` | Chase + Casey | Pre-launch posts, ongoing cadence |
| `artifacts/phase-5/seeding-plan.md` | Rachel | Gift plan, subscriber strategy |
| `artifacts/phase-5/email-whatsapp-flows.md` | Chase/Eli | Welcome, cart, post-purchase flows |
| `artifacts/phase-5/launch-runbook.md` | Andrew + Tony | Hour-by-hour launch day ops |

## Phase 6 — Optimize (Planned)

| File | Owner | Contains |
|------|-------|----------|
| `artifacts/phase-6/optimization-plan.md` | Eli + Nik | 30-day review, A/B tests, retention |

## Shared Files

| File | Owner | Purpose |
|------|-------|---------|
| `decisions/decision-log.md` | Claire/Harley | All material decisions |
| `status/weekly-status.md` | Claire | Program state |
| `handoffs/phase-N-to-M-handoff.md` | Harley | Phase transition briefs |
| `knowledge/26-CURRENT-STATE.md` | Harley | Living program state |

## Rules

- **Read before write.** Always check if a file exists before creating a new one.
- **No inventing paths.** If your output isn't listed above, ask Harley where to write it.
- **One artifact per file.** Do not merge unrelated outputs into a single file.
- **Templates directory is read-only.** Copy the format, never modify the template.
