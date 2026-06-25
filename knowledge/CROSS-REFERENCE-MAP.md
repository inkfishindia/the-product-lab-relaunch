<!-- last-updated: 2026-06-20 (Desktop sync + middleware port — D-035) -->
# Cross-Reference Map — The Product Lab

This is the project's *nervous system*. Every agent MUST update this file when:
- Creating a new artifact
- Logging a new decision
- Changing a decision's status

---

## How to Use

**From an artifact, find:** Which decisions shaped it? Which agents own it? Which knowledge files inform it?

**From a decision, find:** Which artifacts does it affect? Which agents must act on it?

**From an agent, find:** What have they produced? What decisions do they need to follow?

---

## 1. Decisions → Artifacts Affected

| Decision | Affected Artifacts | Affected Knowledge |
|----------|-------------------|-------------------|
| D-001 | `00-MASTER-BRIEF.md`, all agent files | `knowledge/01-AGENT-ORG-CHART.md`, `knowledge/02-AGENT-PERSONAS.md` |
| D-002 | `artifacts/phase-1/project-plan.md` | `knowledge/06-DELIVERABLES-BY-PHASE.md` |
| D-003 | All Phase 1 artifacts | — |
| D-004 | *(Resolved → D-006)* | — |
| D-005 | `artifacts/phase-2/brand-positioning.md`, `artifacts/phase-3/visual-identity.md`, `artifacts/phase-3/copy-system.md` | `knowledge/00-MASTER-BRIEF.md` |
| D-006 | `artifacts/phase-2/pricing-framework.md` | `knowledge/17-PRODUCTION-COSTS.md` |
| D-007 | `artifacts/phase-5/seeding-plan.md`, `artifacts/phase-5/launch-runbook.md` | `knowledge/26-CURRENT-STATE.md` |
| D-008 | All Phase 3 artifacts | — |
| D-009 | `artifacts/phase-2/pricing-framework.md` | `knowledge/17-PRODUCTION-COSTS.md` |
| D-010 | All handoffs, `knowledge/25-AGENT-BRIEFING-PACKAGES.md` | `knowledge/15-HANDOFF-INTAKE.md` |
| D-011 | `artifacts/phase-2/product-hierarchy.md`, `artifacts/phase-4/product-catalog.md` | `knowledge/16-COMPANY-FACTS.md`, `knowledge/20-TPL-COMPANY-PROFILE-CONSOLIDATED.md` |
| D-012 | All operational artifacts (SOPs, ops manual) | `knowledge/16-COMPANY-FACTS.md` |
| D-013 | `artifacts/phase-5/seeding-plan.md` | — |
| D-014 | `docs/ops-sop/store-operations-manual.md`, `docs/ops-sop/fulfillment-packing-sop.md` | `knowledge/26-CURRENT-STATE.md` |
| D-015 | `artifacts/phase-3/visual-identity.md`, `artifacts/phase-3/ui-system.md`, `artifacts/phase-3/hifi-page-designs.md` | `assets/brand/brand-tokens.md` |
| D-016 | `artifacts/phase-3/phase-gate-review.md` | — |
| D-017 | All Phase 4 artifacts | — |
| D-018 | `artifacts/phase-4/visual-identity-rebrand.md`, `artifacts/phase-4/ui-system.md`, `artifacts/phase-4/site-build-brief.md`, `design/visual-identity/visual-identity-rebrand.md` | — |
| D-019 | `artifacts/phase-4/site-build-brief.md`, `artifacts/phase-4/copy-system-rebrand.md`, `design/wireframes/ux-ia-wireframes.md` | — |
| D-020 | `artifacts/phase-4/product-catalog.md`, `artifacts/phase-4/site-build-brief.md` | — |
| D-021 | `artifacts/phase-4/visual-identity-rebrand.md`, `artifacts/phase-4/ui-system.md`, `artifacts/phase-4/site-build-brief.md`, `design/visual-identity/visual-identity-rebrand.md` | — |
| D-022 | `apps/medusa-backend/` (deferred), `backend/medusa-eval/` | `knowledge/19-TECH-STACK-LEGACY.md`, `knowledge/11-PLATFORM-AND-TOOLING.md` |
| D-023 | `storefront/*` (competitor pages in prototype — added threat deep dives for Stick It Up, Dot Badges, The Riyal Store) | `knowledge/26-CURRENT-STATE.md` |
| D-024 (proposed) | `artifacts/phase-4/dan-copy-faststart-template.md`, `artifacts/phase-4/dan-fynd-account-checklist.md`, `prototypes/tpl-site-prototype.html` (threat assessment) | `knowledge/26-CURRENT-STATE.md` |
| D-025 | `backend/medusa/`, `storefront/`, `backend/medusa-eval/`, `backend/medusa/src/scripts/seed-tpl.ts` | `knowledge/26-CURRENT-STATE.md`, `knowledge/11-PLATFORM-AND-TOOLING.md` |
| D-026 | `storefront/src/app/mission-control/page.tsx`, `storefront/src/components/ui/chrome-wrapper.tsx` | `knowledge/26-CURRENT-STATE.md` |
| D-027 | `artifacts/phase-4/aeo-agent-commerce-readiness.md`, `handoffs/2026-06-11-aeo-agent-commerce-to-build-pods.md`, `status/sprint-board.md`, `storefront/`, `catalogs/` | `knowledge/26-CURRENT-STATE.md`, `knowledge/11-PLATFORM-AND-TOOLING.md` |
| D-028 | `artifacts/phase-4/drop-1-merchandising-curation.md`, `artifacts/phase-4/catalog-curation/` (drop1-plan.json, curate-drop1.py, backup), `backend/medusa/src/scripts/curate-drop1.py`, `backend/medusa/src/scripts/apply-drop1.ts` | `knowledge/26-CURRENT-STATE.md` (Catalog Status + Phase 4 gate), D-020, D-011, D-019 |
| D-029 | `backend/medusa/src/scripts/setup-shipping-cod.ts`, `backend/medusa/src/api/store/validate-payment-method/route.ts`, `storefront/src/app/checkout/checkout-client.tsx`, `artifacts/phase-4/cto-codebase-audit-2026-06-13.md` | `knowledge/26-CURRENT-STATE.md` |
| D-030 | `artifacts/phase-4/admin-auth-ops-audit.md`, `storefront/src/lib/medusa-admin.ts`, `storefront/src/app/api/admin/`, `backend/medusa/src/api/admin/operator-password/route.ts` | D-012, D-029 |
| D-031 | `artifacts/phase-4/customer-auth-account-audit.md`, `storefront/src/lib/medusa-customer.ts`, `storefront/src/lib/medusa-auth.ts`, `storefront/src/app/account/`, `storefront/src/app/api/account/`, `storefront/src/app/{login,register,forgot-password,reset-password,track}/`, `backend/medusa/src/api/store/{track-order,claim-order,customer-password}/route.ts` | D-030, D-029, D-006, D-012 |
| D-032 | `backend/medusa/src/modules/smtp-notification/`, `backend/medusa/src/api/store/{reset-password,verify-reset-token,update-password,order-transfer-request,accept-order-transfer}/route.ts`, `storefront/src/lib/medusa-customer.ts`, `storefront/src/app/{forgot-password,reset-password,orders/accept-transfer}/`, `.env.template` | D-031 |
| D-033 | `backend/medusa/src/modules/whatsapp-notification/`, `backend/medusa/src/subscribers/{order-confirmation,fulfillment-notification,order-delivery}.ts`, `backend/medusa/medusa-config.ts`, `backend/medusa/.env.template`, `storefront/src/app/checkout/checkout-client.tsx`, `docs/ops-sop/customer-comms-templates.md` | `knowledge/26-CURRENT-STATE.md` |
| D-034 | `backend/medusa/src/modules/whatsapp-notification/meta-transport.ts`, `backend/medusa/src/modules/whatsapp-notification/templates.ts`, `backend/medusa/src/modules/whatsapp-notification/index.ts`, `backend/medusa/.env.template`, `backend/medusa/medusa-config.ts`, `backend/medusa/src/subscribers/*.ts`, `docs/ops-sop/whatsapp-business-api-setup.md` | `knowledge/26-CURRENT-STATE.md` |
| D-035 | `handoffs/2026-06-20-desktop-drive-sync.md`, `storefront/middleware.ts` | D-030 |

---

## 2. Artifacts → Source Decisions & Producing Agent

### Phase 1 — Audit

| Artifact | Agent | Shaped By Decisions | Feeds Into |
|----------|-------|--------------------|------------|
| `artifacts/phase-1/site-teardown-catalog-audit.md` | Maria | D-003 | Phase 2 product hierarchy |
| `artifacts/phase-1/customer-insight-report.md` | Weiss | D-003 | Phase 2 brand positioning |
| `artifacts/phase-1/competitor-research.md` | Jenna | D-003 | Phase 2 brand positioning, Phase 5 messaging |
| `artifacts/phase-1/problem-statement-memo.md` | Harley | D-001, D-003 | All phases |
| `artifacts/phase-1/baseline-financials.md` | Patrick | D-003, D-004 | Phase 2 pricing |
| `artifacts/phase-1/logistics-baseline.md` | Raj | D-003 | Phase 4 ops implementation |
| `artifacts/phase-1/fulfillment-sop.md` | Raj | D-003, D-014 | `docs/ops-sop/fulfillment-packing-sop.md` |
| `artifacts/phase-1/cod-strategy.md` | Raj | D-003, D-006 | Phase 4 qa-checklist |
| `artifacts/phase-1/shipping-partner-evaluation.md` | Raj | D-003 | Phase 4 ops implementation |
| `artifacts/phase-1/data-audit-tpl-dump.md` | Maria | D-003 | All knowledge files 15-24 |
| `artifacts/phase-1/project-plan.md` | Harley | D-001, D-002 | All phases |

### Phase 2 — Strategy

| Artifact | Agent | Shaped By Decisions | Feeds Into |
|----------|-------|--------------------|------------|
| `artifacts/phase-2/brand-positioning.md` | Heyward | D-005 | Phase 3 visual identity, Phase 3 copy system |
| `artifacts/phase-2/product-hierarchy.md` | Jenna | D-005, D-011, D-020 | Phase 4 product catalog |
| `artifacts/phase-2/pricing-framework.md` | Patrick | D-004, D-006, D-009 | Phase 4 all pages |
| `artifacts/phase-2/pmf-assessment.md` | Shreyas | D-008 | Phase 5 messaging |
| `artifacts/phase-2/customer-analysis-deep-dive.md` | Weiss | D-003 | Phase 4 customer-insight-rebrand.md |

### Phase 3 — Creative

| Artifact | Agent | Shaped By Decisions | Feeds Into |
|----------|-------|--------------------|------------|
| `artifacts/phase-3/visual-identity.md` | Sean | D-005, D-015 | Phase 4 visual-identity-rebrand.md, `assets/brand/` |
| `artifacts/phase-3/copy-system.md` | Joanna | D-005 | Phase 4 copy-system-rebrand.md, all copy |
| `artifacts/phase-3/ux-ia-wireframes.md` | Kurt | D-015, D-019 | Phase 4 site-build-brief.md |
| `artifacts/phase-3/ui-system.md` | Julie | D-015, D-018 | Phase 4 ui-system.md, `apps/storefront/` |
| `artifacts/phase-3/hifi-page-designs.md` | Julie | D-015, D-019 | Phase 4 site-build-brief.md |
| `artifacts/phase-3/asset-list.md` | Casey | D-005, D-017 | `assets/`, Dan's to-do list |
| `artifacts/phase-3/phase-gate-review.md` | Harley | D-016 | Phase 4 |

### Phase 4 — Build (Active)

| Artifact | Agent | Shaped By Decisions | Feeds Into |
|----------|-------|--------------------|------------|
| `artifacts/phase-4/site-build-brief.md` | Kurt | D-018, D-019, D-020, D-021 | `apps/storefront/` directly — primary build spec |
| `artifacts/phase-4/visual-identity-rebrand.md` | Sean | D-018, D-021 | Phase 4 visual system, `apps/storefront/globals.css` |
| `artifacts/phase-4/copy-system-rebrand.md` | Joanna | D-018, D-019 | All copy in `apps/storefront/` |
| `artifacts/phase-4/brand-positioning-rebrand.md` | Heyward | D-018, D-019 | Phase 5 launch narrative |
| `artifacts/phase-4/customer-insight-rebrand.md` | Weiss | D-018 | Phase 5 seeding |
| `artifacts/phase-4/ui-system.md` | Julie | D-018, D-021 | `apps/storefront/src/app/globals.css`, component tokens |
| `artifacts/phase-4/technical-implementation-plan.md` | Tobi | D-017, D-022 | `apps/storefront/` — build blueprint |
| `backend/medusa/src/modules/whatsapp-notification/` | Harley (D-033) | D-033 | Event-driven WhatsApp — 21 templates, Gupshup/MSG91 transport |
| `backend/medusa/src/subscribers/{order-confirmation,fulfillment-notification,order-delivery}.ts` | Harley (D-033) | D-033 | 3 order lifecycle subscribers: placed, fulfilled, delivered |
| `storefront/src/app/checkout/checkout-client.tsx` (WhatsApp consent) | Harley (D-033) | D-033 | WhatsApp consent checkbox in checkout flow |
| `artifacts/phase-4/product-catalog.md` | Andy | D-011, D-020 | `catalogs/`, Medusa seed scripts |
| `artifacts/phase-4/visual-build-plan.md` | Sean | D-018, D-021 | Product photography, Dan's production |
| `artifacts/phase-4/copy-build-plan.md` | Joanna | D-018, D-019 | Dan's copy production |
| `artifacts/phase-4/analytics-event-schema.md` | Tobi | D-022 | `apps/storefront/src/app/analytics-events.tsx`, `apps/storefront/src/lib/analytics.ts` |
| `artifacts/phase-4/qa-checklist.md` | James | D-017, D-022 | Pre-launch sign-off gate |
| `artifacts/phase-4/admin-auth-ops-audit.md` | Tobi + James | D-030, D-012, D-029 | `storefront/src/lib/medusa-admin.ts`, `storefront/src/app/admin/`, `storefront/src/app/api/admin/`, `storefront/src/proxy.ts`, `backend/medusa/src/api/admin/operator-password/route.ts` |
| `artifacts/phase-4/pre-launch-validation.md` | Harley | D-007, D-016 | Phase 5 launch runbook |
| `artifacts/phase-4/customer-comms-templates.md` | Casey | D-005 | `docs/ops-sop/customer-comms-templates.md` |
| `artifacts/phase-4/dan-copy-faststart-template.md` | Harley (this session) | D-005, D-017 | Dan's copy production — fill-in-the-blanks for 15 hero SKUs |
| `artifacts/phase-4/dan-fynd-account-checklist.md` | Harley (this session) | D-017, D-022 | Tobi's platform setup — one-page Fynd credential checklist |
| `artifacts/phase-4/catalog-cms-workflow.md` | Harley (this session) | D-019, D-020, D-022 | Catalog ops for next phases — PDP data model, content workflow, Fynd CMS guide, CSV template, agent prompt |
| `artifacts/phase-4/returns-exchange-policy.md` | Lenny | D-006 | `docs/ops-sop/returns-exchange-policy.md` |
| `artifacts/phase-4/fulfillment-packing-sop.md` | Raj | D-014 | `docs/ops-sop/fulfillment-packing-sop.md` |
| `artifacts/phase-4/faq-and-help.md` | Casey | D-005 | `docs/ops-sop/faq-and-help.md` |
| `artifacts/phase-4/store-operations-manual.md` | Tony | D-014 | `docs/ops-sop/store-operations-manual.md` |
| `artifacts/phase-4/ops-implementation-plan.md` | Tony | D-014, D-022 | Phase 5 operations |
| `artifacts/phase-4/coming-soon-page.html` | Tobi | D-017 | Pre-launch landing page |
| `artifacts/phase-4/homepage-wireframe-prototype.html` | Tobi | D-018, D-019 | `apps/storefront/src/app/page.tsx` |
| `artifacts/phase-4/tpl-site-prototype.html` | Tobi | D-019, D-021 | Full site preview |
| `artifacts/phase-4/framer-site-prototype/` | Tobi | D-021 | Interactive prototype |
| `artifacts/phase-4/coming-soon-engagement-concept.md` | Nik | D-007 | Phase 5 teaser strategy |
| `artifacts/phase-4/asset-list.md` | Casey | D-017 | Dan's production queue |
| `artifacts/phase-4/inventory-tracker.xlsx` | Andy | D-011 | Operations |
| `artifacts/phase-4/gemini-image-prompts.md` | Sean | D-021 | Image generation |
| `artifacts/phase-4/brand-visual-guidelines-walsh-analysis.md` | Walsh | D-021 | Design review |
| `artifacts/phase-4/aeo-agent-commerce-readiness.md` | Harley + Maria | D-025, D-027 | `storefront/`, `catalogs/`, Merchant Center, QA gate |
| `artifacts/phase-4/deploy-checklist.md` | Tobi | D-025 | Infrastructure setup guide |
| `artifacts/phase-4/supabase-migration-guide.md` | Tobi | D-025 | Production DB migration + re-seed |
| `artifacts/phase-4/deploy-checklist.md` | Tobi | D-025 | Infrastructure setup guide |
| `artifacts/phase-4/supabase-migration-guide.md` | Tobi | D-025 | Production DB migration + re-seed |

### Phase 5 — Launch (Planned)

| Artifact | Agent | Shaped By Decisions | Feeds Into |
|----------|-------|--------------------|------------|
| `artifacts/phase-5/launch-narrative.md` | Nik | D-005, D-019 | All launch comms |
| `artifacts/phase-5/content-calendar.md` | Chase + Casey | D-007 | Social execution |
| `artifacts/phase-5/seeding-plan.md` | Rachel | D-007, D-013 | Gift distribution |
| `artifacts/phase-5/email-whatsapp-flows.md` | Eli | D-006 | Klaviyo/Gupshup flows |
| `artifacts/phase-5/launch-runbook.md` | Andrew + Tony | D-007 | Launch day operations |
| `artifacts/phase-5/teaser-campaign-strategy.md` | Nik | D-018, D-021 | Pre-launch teasers |

### Phase 6 — Optimize (Planned)

| Artifact | Agent | Shaped By Decisions | Feeds Into |
|----------|-------|--------------------|------------|
| `artifacts/phase-6/optimization-plan.md` | Eli + Nik | D-022 | Post-launch Day 30 review |

---

## 3. Knowledge Files → Connected Artifacts & Decisions

| Knowledge File | Connected Artifacts | Connected Decisions |
|----------------|--------------------|--------------------|
| `knowledge/00-MASTER-BRIEF.md` | All artifacts | D-001, D-005 |
| `knowledge/01-AGENT-ORG-CHART.md` | All agent files in `agents/` | D-001 |
| `knowledge/02-AGENT-PERSONAS.md` | All agent files in `agents/` | D-001 |
| `knowledge/06-DELIVERABLES-BY-PHASE.md` | Every artifact by phase | All decisions |
| `knowledge/09-AI-AGENT-PROMPTS.md` | All agent system prompts | D-001 |
| `knowledge/11-PLATFORM-AND-TOOLING.md` | `artifacts/phase-4/technical-implementation-plan.md` | D-022 |
| `knowledge/15-HANDOFF-INTAKE.md` | All handoffs in `handoffs/` | D-010 |
| `knowledge/16-COMPANY-FACTS.md` | `artifacts/phase-1/baseline-financials.md` | D-011, D-012 |
| `knowledge/17-PRODUCTION-COSTS.md` | `artifacts/phase-2/pricing-framework.md` | D-006, D-009 |
| `knowledge/19-TECH-STACK-LEGACY.md` | `backend/medusa-eval/`, `apps/medusa-backend/` | D-022 |
| `knowledge/20-TPL-COMPANY-PROFILE-CONSOLIDATED.md` | All product/company artifacts | D-011 |
| `knowledge/25-AGENT-BRIEFING-PACKAGES.md` | Per-pod agent work plans | D-010 |
| `knowledge/26-CURRENT-STATE.md` | **ALL** active track artifacts, `status/` | All active decisions |

---

## 4. Agents → Artifacts Produced

| Pod | Agent | Artifacts |
|-----|-------|-----------|
| **A** — Command | **Harley** (you) | `00-MASTER-BRIEF.md`, `artifacts/phase-1/problem-statement-memo.md`, `artifacts/phase-1/project-plan.md`, `artifacts/phase-3/phase-gate-review.md`, `artifacts/phase-4/pre-launch-validation.md`, all handoffs, all status reports |
| **A** — Command | **Claire** | Dependency tracking, blocker logs (in `status/sprint-board.md`) |
| **A** — Command | **Maria** | `artifacts/phase-1/site-teardown-catalog-audit.md`, `artifacts/phase-1/data-audit-tpl-dump.md` |
| **B** — Strategy | **Weiss** | `artifacts/phase-1/customer-insight-report.md`, `artifacts/phase-2/customer-analysis-deep-dive.md`, `artifacts/phase-4/customer-insight-rebrand.md` |
| **B** — Strategy | **Heyward** | `artifacts/phase-2/brand-positioning.md`, `artifacts/phase-4/brand-positioning-rebrand.md` |
| **B** — Strategy | **Jenna** | `artifacts/phase-1/competitor-research.md`, `artifacts/phase-2/product-hierarchy.md` |
| **C** — Product | **Shreyas** | `artifacts/phase-2/pmf-assessment.md` |
| **C** — Product | **Andy** | `artifacts/phase-4/product-catalog.md`, `artifacts/phase-4/inventory-tracker.xlsx` |
| **D** — Creative | **Sean** | `artifacts/phase-3/visual-identity.md`, `artifacts/phase-4/visual-identity-rebrand.md`, `artifacts/phase-4/visual-build-plan.md`, `artifacts/phase-4/gemini-image-prompts.md` |
| **D** — Creative | **Joanna** | `artifacts/phase-3/copy-system.md`, `artifacts/phase-4/copy-system-rebrand.md`, `artifacts/phase-4/copy-build-plan.md` |
| **D** — Creative | **Kurt** | `artifacts/phase-3/ux-ia-wireframes.md`, `artifacts/phase-4/site-build-brief.md` |
| **D** — Creative | **Julie** | `artifacts/phase-3/ui-system.md`, `artifacts/phase-3/hifi-page-designs.md`, `artifacts/phase-4/ui-system.md` |
| **E** — Build | **Tobi** | Technical implementation, all prototypes, `apps/storefront/` code |
| **E** — Build | **James** | `artifacts/phase-4/qa-checklist.md` — owns launch sign-off |
| **F** — Growth | **Nik** | `artifacts/phase-5/launch-narrative.md`, `artifacts/phase-5/teaser-campaign-strategy.md`, co-owns `artifacts/phase-6/optimization-plan.md` |
| **F** — Growth | **Avinash** | Analytics tracking, GA4 configuration |
| **F** — Growth | **Eli** | `artifacts/phase-5/email-whatsapp-flows.md`, co-owns `artifacts/phase-6/optimization-plan.md` |
| **G** — Marketing | **Andrew** | Co-owns `artifacts/phase-5/launch-runbook.md` |
| **G** — Marketing | **Chase** | Co-owns `artifacts/phase-5/content-calendar.md` |
| **G** — Marketing | **Rachel** | `artifacts/phase-5/seeding-plan.md` |
| **H** — Content | **Casey** | `artifacts/phase-3/asset-list.md`, `artifacts/phase-4/asset-list.md`, `artifacts/phase-4/customer-comms-templates.md`, `artifacts/phase-4/faq-and-help.md`, co-owns `artifacts/phase-5/content-calendar.md` |
| **I** — Ops/Finance | **Patrick** | `artifacts/phase-1/baseline-financials.md`, `artifacts/phase-2/pricing-framework.md` |
| **I** — Ops/Finance | **Raj** | `artifacts/phase-1/logistics-baseline.md`, `artifacts/phase-1/fulfillment-sop.md`, `artifacts/phase-1/cod-strategy.md`, `artifacts/phase-1/shipping-partner-evaluation.md`, `artifacts/phase-4/fulfillment-packing-sop.md` |
| **I** — Ops/Finance | **Tony** | `artifacts/phase-4/store-operations-manual.md`, `artifacts/phase-4/ops-implementation-plan.md`, co-owns `artifacts/phase-5/launch-runbook.md` |
| **I** — Ops/Finance | **Lenny** | `artifacts/phase-4/returns-exchange-policy.md` |

---

## 5. Code ↔ Design Source Map

| Code Location | Design Source | Status |
|-------------|--------------|--------|
| `apps/storefront/src/app/page.tsx` | `artifacts/phase-4/site-build-brief.md` §3, `artifacts/phase-4/homepage-wireframe-prototype.html` | Built (basic) |
| `apps/storefront/src/app/layout.tsx` | — | Built (skeletal — no nav/footer) |
| `apps/storefront/src/app/cart/page.tsx` + `cart-client.tsx` | `artifacts/phase-4/site-build-brief.md` §8 | Built |
| `apps/storefront/src/app/checkout/page.tsx` + `checkout-client.tsx` | `artifacts/phase-4/site-build-brief.md` §6, §9 | Built |
| `apps/storefront/src/app/order-confirmed/page.tsx` | `artifacts/phase-3/ux-ia-wireframes.md` | Built |
| `apps/storefront/src/app/products/[handle]/page.tsx` | `artifacts/phase-4/site-build-brief.md` §5, §7, `artifacts/phase-4/website-wireframe-style-design.md` §3 | Built |
| `apps/storefront/src/app/products/[handle]/add-to-cart-button.tsx` | `artifacts/phase-4/site-build-brief.md` §9 (sticky ATC) | Built |
| `apps/storefront/src/app/analytics-events.tsx` | `artifacts/phase-4/analytics-event-schema.md` | Built |
| `storefront/src/app/collections/page.tsx` | `artifacts/phase-4/site-build-brief.md` §4 | Built (2026-06-06) |
| `storefront/src/app/collections/[slug]/page.tsx` | `artifacts/phase-4/site-build-brief.md` §4 | Built (2026-06-06) — collection pages with set banner, product grid, filters, Build Your Set CTA |
| `storefront/src/app/sets/page.tsx` | `artifacts/phase-4/site-build-brief.md` §7, §8 | Built (2026-06-06) |
| `storefront/src/app/sets/[slug]/page.tsx` | `artifacts/phase-4/site-build-brief.md` §7, §8 | Built (2026-06-06) — set detail pages with gift mode, add note, cross-sell |
| `storefront/src/app/gifts/page.tsx` | `artifacts/phase-4/site-build-brief.md` §6 | Built (2026-06-06) — gift hub with persona tiles, budget filter, featured sets |
| `storefront/src/app/gifts/for-[persona]/page.tsx` | `artifacts/phase-4/site-build-brief.md` §6 | Built (2026-06-06) — 4 gift persona pages |
| `storefront/src/app/about/page.tsx` | `artifacts/phase-4/website-wireframe-style-design.md` §4 | Built (2026-06-06) |
| `storefront/src/app/drops/page.tsx` | `artifacts/phase-4/site-build-brief.md` §7 | Built (2026-06-06) — drop hub with Drop 1 hero |
| `storefront/src/app/faq/page.tsx` | — | Built (2026-06-06) — 14 FAQ accordions |
| `storefront/src/app/contact/page.tsx` | — | Built (2026-06-06) — WhatsApp, email, visit card |
| `storefront/src/app/sell-your-art/page.tsx` | — | Built (2026-06-06) — artist submission page |
| Navigation components | `artifacts/phase-4/site-build-brief.md` §2 | Already built — nav-bar.tsx has drawer menu with all links |
| `storefront/src/lib/data.ts` | — | Rewritten 2026-06-06 — new `ProductData` type, updated collections/sets/personas with real product counts |
| `storefront/src/lib/master-catalog.ts` | `artifacts/phase-4/product-catalog.md`, `site-scrape/theproductlab-in-complete-inventory.md`, TPL Shared Drive | **Master product catalog** — 67 real TPL products with prices, categories, themes, PDP copy. Canonical source for all product data. Has collection/set/persona mapping functions |
| `storefront/src/lib/medusa.ts` | `storefront/src/lib/master-catalog.ts` | Updated 2026-06-06 — added local fallback; when Medusa backend is down, returns products from master-catalog.ts |
| `catalogs/master-catalog.ts` | `storefront/src/lib/master-catalog.ts` | Canonical master catalog (copied to src/) |
| `TPL-SHARED-DRIVE-INDEX.md` | TPL Google Shared Drive | Full reference index of TPL shared drive (24 folders, ~200+ files) |
| `TPL-SHARED-DRIVE-LOG.md` | TPL Google Shared Drive | Activity log and maintenance tracker for shared drive |

---

## 6. Handoff Chain

| Handoff | From → To | Key Content |
|---------|-----------|-------------|
| `handoffs/handoff-intake-pod-briefs.md` | External Claude projects → All pods | Per-pod context from prior work |
| `handoffs/phase-1-to-2-handoff.md` | Phase 1 team → Phase 2 team | Audit findings → positioning work |
| `handoffs/phase-2-to-3-handoff.md` | Phase 2 team → Phase 3 team | Strategy → creative execution |
| `handoffs/phase-3-to-4-handoff.md` | Phase 3 team → Phase 4 team | Creative assets → build |
| `handoffs/phase-4-to-5-handoff.md` | Phase 4 team → Phase 5 team | Build artifacts → launch |
| `handoffs/phase-5-to-6-handoff.md` | Phase 5 team → Phase 6 team | Launch data → optimization |
| `handoffs/2026-06-06-wired-mvp-handoff.md` | Harley → Tobi, James, Casey | Wired MVP — real product catalog, data flow, mapping architecture |
| `handoffs/2026-06-06-build-list-updated.md` | Harley → All pods | Updated P0/P1/P2/P3 build list after MVP wiring |
