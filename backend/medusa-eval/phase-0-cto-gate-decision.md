# Phase 0 CTO Gate Decision: Medusa + Supabase

<!-- last-updated: 2026-05-30 -->
<!-- author: Harley (Program Director / CTO Gate Owner) -->

## 1. Executive Decision

**Do Not Proceed** with Medusa + Supabase as the launch platform for The Product Lab's first D2C relaunch. Launch on Fynd (Commerce.com) per the existing Phase 4 plan. Defer Medusa + Supabase evaluation to post-launch when TPL has revenue data, sharper ops requirements, and engineering capacity to absorb the integration work without launch timeline pressure.

## 2. Decision Status

```
Decision: DO NOT PROCEED (for launch)
Future path: Conditional Proceed (for post-launch re-evaluation)
```

## 3. CTO Rationale

The Medusa + Supabase architecture is conceptually sound. The data ownership model — Medusa owns commerce truth, Supabase/Postgres owns system data, Razorpay owns payment truth, Shiprocket owns shipping truth, Airtable owns human ops, GA4 owns behavioral analytics — is correctly designed with clean boundaries. The planning documents are thorough and demonstrate clear architectural thinking. However, the Phase 0 technical spike has **not been executed**. Every integration path is untested. Credentials and access (Supabase project, Razorpay test keys, Airtable token, Shiprocket API) are unconfirmed. All three validation leads (James/QA, Andy/Ops, Avinash/Analytics) independently recommend Fynd as safer for launch. The existing Phase 4 implementation plan assumes Fynd as the build target — every ops SOP, daily checklist, QA test, and automation trigger depends on that assumption. Switching to Medusa would require rebuilding the entire integration and operations layer before launch, with no tested evidence that any path works. The spike planning is excellent and should be preserved for post-launch execution, but TPL should not bet the relaunch on unproven infrastructure.

## 4. Evidence Reviewed

| Document | Key Finding |
|---|---|
| 01-platform-decision.md | Architecture is sound. Spike recommended before committing. |
| 02-target-architecture.md | Clean integration boundaries. Medusa/Razorpay/Shiprocket/Airtable/GA4 roles defined. |
| 03-data-ownership.md | Source-of-truth rules correct. No fundamental design conflict. |
| phase-0-technical-spike.md | 10-day spike defined. 9 pass/fail criteria. All untested. |
| spike-execution-plan.md | Day-by-day plan for 10 days. Credentials/access flagged as blocking. |
| phase-0-agent-handoff.md | Tobi build sequence defined. "Fynd is safer" stated explicitly. |
| phase-0-qa-validation-plan.md | 17 P0 tests, 14 P1 tests. James's authority stated. Fynd comparison favors Fynd. |
| phase-0-ops-validation-plan.md | Complete field map, daily workflow, Shiprocket payload. Andy recommends Do Not Proceed. |
| phase-0-analytics-validation-plan.md | 15 P0 analytics tests. Three-way reconciliation. Avinash recommends Conditional Proceed. |
| integrations/airtable/order-field-map.md | 18 fields defined. Idempotency rules clear. Untested. |
| integrations/shiprocket/feasibility-notes.md | Payload mapping complete. API credentials not confirmed. All status: "Not started." |
| data/spike-products-10-skus.csv | 10 real SKUs with image URLs selected and ready. |
| knowledge/26-CURRENT-STATE.md | Phase 4 assumes Fynd. Tobi blocked waiting on Fynd access. Medusa spike not mentioned. |
| knowledge/23-TPL-TECH-SYSTEMS-CONSOLIDATED.md | Airtable 7-base architecture documented. WooCommerce→n8n→Airtable is the current flow. |

## 5. Technical Feasibility Summary

| Area | Status | Assessment |
|---|---|---|
| Medusa + Supabase backend | **Untested** | Architecture designed. 0 lines of code scaffolded. Credentials unconfirmed. |
| Product import (10 SKUs) | **Ready but untested** | CSV created. Import script not written. |
| Next.js storefront | **Untested** | Scaffold not created. No code written. |
| Medusa cart/order path | **Untested** | Checkout flow designed but not implemented. |
| Razorpay integration | **Untested** | Provider approach defined. No test credentials confirmed. |
| Shiprocket integration | **Untested** | Payload mapping complete. API credentials not available. |
| Airtable sync | **Untested** | Field map defined. Sync code not written. |
| GA4 events | **Untested** | Event schema defined. analytics.ts not written. |
| Admin usability | **Untested** | Dan has not logged into Medusa admin. |

**Verdict:** The technical design is solid. Zero implementation exists. Credentials are the gate.

## 6. QA Feasibility Summary

James has defined 17 P0 tests, 14 P1 tests, and 9 P2 tests. The test methodology is thorough and well-documented. However:

- **None of the P0 tests have been executed.**
- Every test requires working infrastructure that does not exist yet.
- James's independent recommendation: **Fynd is safer for launch.**
- The QA document explicitly states: "If any of these cannot be proven, the recommendation is 'Do Not Proceed.'"

**Verdict:** QA framework is excellent. Can only be applied after spike execution. Currently no evidence to pass any P0 test.

## 7. Ops Feasibility Summary

Andy has produced the most detailed ops validation plan in the package. Key findings:

- Airtable field map (24 fields) is fully designed and classified (read-only vs ops-editable).
- Shiprocket payload mapping is complete with field-level Medusa sources.
- COD handling is documented but untested — Medusa has no native COD payment provider.
- Daily workflow analysis shows 3-4 dashboards per order (vs 2 for Fynd).
- Andy's recommendation: **Do Not Proceed** for launch, Medusa acceptable only as spike continuation.

**Verdict:** Ops is the highest-risk area. Airtable sync, Shiprocket integration, and COD handling are all net-new custom builds. Fynd provides all three natively.

## 8. Analytics Feasibility Summary

Avinash has defined 15 P0 analytics tests with three-way revenue reconciliation (GA4 ↔ Medusa ↔ Razorpay). Key findings:

- Event schema is well-defined for 11 P0 events.
- Unit conversion risk (paise ÷ 100) is identified and mitigatable.
- Purchase deduplication strategy is designed (session storage + transaction_id).
- Integration logging (`integration_events` table in Supabase) is recommended.
- Avinash's recommendation: **Conditional Proceed**, subject to all 15 P0 tests passing.
- Honest assessment: Fynd provides more reliable launch analytics with zero custom implementation.

**Verdict:** Analytics is conditionally viable but depends entirely on correct implementation of unit conversion, deduplication, UTM persistence, and integration logging. Fynd auto-fires events with proven reliability.

## 9. Airtable/Supabase Source-of-Truth Assessment

| Rule | Status | Risk |
|---|---|---|
| Medusa owns commerce truth | Clear in design. Untested. | Low if implemented correctly. |
| Airtable does not edit financial fields | Field classification done. Schema enforcement untested. | Medium — depends on Airtable permissions and sync worker discipline. |
| Supabase does not become commerce UI | Clear in design. | Low — architectural constraint only. |
| Idempotency (Medusa order ID as key) | Designed. Untested. | Medium — race conditions possible. |
| Failed payment → no Airtable record | Designed. Untested. | High — if broken, ops fulfills unpaid orders. |

**Verdict:** Source-of-truth architecture is correct. No fundamental design conflict. Implementation quality determines whether boundaries hold.

## 10. Razorpay Assessment

| Requirement | Status |
|---|---|
| Test credentials confirmed | Unknown — listed as blocking, owned by Dan. |
| Medusa payment provider available | Untested — known maintained providers may not exist for chosen Medusa version. |
| Webhook verification works | Untested. |
| Amount mismatch rejection works | Untested. |
| Failed payment path is clean | Untested. |
| Payment state reconciliation | Untested. |

**Critical risk:** The spike execution plan states: "If Medusa cannot integrate cleanly with Razorpay without fragile custom payment-state handling, the Medusa path fails for launch." This has not been tested.

**Verdict:** Cannot recommend proceeding when the most critical integration is completely untested.

## 11. Shiprocket Assessment

| Proof Level | Status |
|---|---|
| Level 1: API authentication | Not started — credentials unconfirmed. |
| Level 2: Test order creation | Not started. |
| Level 3: AWB/label generation | Not started. |
| Level 4: COD proof | Not started. |

The payload mapping is complete and well-documented. The spike plan allows Level 1 (documented feasibility) as minimum pass if API access is delayed. However, Fynd's Commerce Hub has a documented Shiprocket integration that works today.

**Verdict:** Shiprocket integration is the highest single-risk item for a launch decision. Without a tested AWB/label path, TPL cannot ship products. Fynd removes this risk entirely.

## 12. Dan/Admin Usability Assessment

| Task | Medusa Admin | Fynd Admin |
|---|---|---|
| Log in | Browser-based, OK | Browser-based, OK |
| View product list | Standard Medusa UI | Commerce operator UI |
| Search products | OK | OK |
| View order details | OK | OK |
| Check payment status | OK — Medusa manages this | OK — Fynd manages this |
| Update inventory | In admin settings | In admin settings |
| Change publish status | OK | OK |

The QA plan defines a usability test procedure: give Dan the admin URL and observe whether he can complete tasks without help. **This test has not been conducted.** The Medusa admin is acknowledged as more developer-tool focused than Fynd's commerce-operator admin. Without testing, Dan's ability to operate daily is unknown.

**Verdict:** Unknown usability is a launch blocker. Every day Dan cannot use the admin, Tobi is on call for operations.

## 13. Fynd Comparison

| Area | Medusa + Supabase | Fynd (Commerce.com) |
|---|---|---|
| **Speed to launch** | 8-12 weeks (build + custom integrations + testing) | 2-4 weeks (platform config + store setup) |
| **Ownership** | Full data ownership, no lock-in | Platform-dependent, migration needed later |
| **Checkout risk** | Custom build, untested | Platform-native, tested at scale |
| **Payment risk** | Custom Razorpay integration, untested | Platform-native Razorpay, proven |
| **Shipping risk** | Custom Shiprocket integration, untested | Platform-native Shiprocket via Commerce Hub |
| **Airtable ops fit** | Custom sync — net-new build | Existing WooCommerce→Airtable pattern informs migration |
| **Analytics control** | Full event schema control, custom implementation | Auto-fire events, proven deduplication |
| **Dan usability** | Unknown — Medusa admin is developer-tool focused | Known — Fynd admin is commerce-operator focused |
| **Vendor dependency** | Low (open source, portable Postgres) | High (proprietary platform, migration needed) |
| **Long-term platform value** | High — data ownership, custom workflows, drops, artist attribution | Low-Medium — needs migration for custom workflows |
| **COD handling** | Custom COD payment provider needed (untested, net-new) | Native COD as payment method, proven |
| **NDR/RTO automation** | Custom Shiprocket sync + webhook handling needed | Shiprocket handles natively, Fynd mirrors status |
| **Integration maintenance** | TPL owns all integration code | Fynd owns integration maintenance |
| **Monthly cost** | $20-50 Supabase + $10-50 host + $20 Vercel + ~$5-30 Redis = ~$55-150/mo | Fynd platform fee (unknown, likely ₹0-2K/mo for basic plan) |
| **Launch risk (estimated)** | HIGH — every integration path is untested | LOW-MEDIUM — platform handles integrations |

## 14. Critical Blockers

These prevent proceeding with Medusa + Supabase for launch:

| # | Blocker | Severity | Detail |
|---|---|---|---|
| 1 | **Spike not executed** | Blocker | Zero code written. Zero integrations tested. No evidence any path works. |
| 2 | **Credentials unconfirmed** | Blocker | Supabase, Razorpay test, Airtable, Shiprocket, GA4 — all listed as "needed from Dan" and unconfirmed. |
| 3 | **Shiprocket integration untested** | Blocker | AWB/label generation is the fulfillment path. Without it, TPL cannot ship. API credentials not available. |
| 4 | **Razorpay integration untested** | Blocker | Payment is the most critical commerce path. Completely untested. |
| 5 | **Dan/admin usability unknown** | Blocker | No usability testing conducted. Risk that Dan cannot operate daily without engineering support. |
| 6 | **Current Phase 4 plan assumes Fynd** | Blocker | Every ops SOP, fulfillment workflow, QA checklist, and automation trigger depends on Fynd. Switching means rebuilding the ops layer. |
| 7 | **COD payment provider undefined** | Blocker | Medusa has no native COD support. Custom provider is net-new work. COD is 40-60% of expected D2C orders. |

## 15. Acceptable Risks

These risks are real but acceptable if the Medusa path were pursued post-launch:

| Risk | Mitigation |
|---|---|
| Medusa is US/Europe-native, not India-native | Configure INR region, India tax, Indian shipping. Well-understood configuration work. |
| Unit conversion (paise ÷ 100) for GA4 | Create `centsToINR()` utility. Test with every event. Single point of failure but controllable. |
| Purchase deduplication | Session storage flag + GA4 transaction_id deduplication. Test with refresh scenarios. |
| UTM persistence through checkout | sessionStorage pattern. Must survive Razorpay redirect. Simple to implement. |
| Airtable field schema changes | Use tiny field map (24 fields). Lock idempotency key in Airtable schema. |
| Integration event logging | Single `integration_events` table in Supabase. Straightforward implementation. |
| No COD automation at launch | Accept manual COD handling at low volume. Automate post-launch. |

## 16. Unacceptable Risks

| # | Risk | Why Unacceptable |
|---|---|---|
| 1 | **No tested payment path before launch date commitment** | Cannot commit to a launch date when Razorpay integration is unfunded engineering work. |
| 2 | **No tested shipping path before launch date commitment** | Cannot commit to fulfillment when Shiprocket AWB generation is unproven. |
| 3 | **Admin usability unknown before launch** | Cannot have Dan blocked on engineering for daily operations at launch. |
| 4 | **Rebuilding the ops layer during launch window** | The existing Phase 4 ops plan works. Replacing it with untested custom integrations introduces unacceptable timeline risk. |
| 5 | **COD handling undefined before launch** | 40-60% of D2C orders are expected to be COD. Not having this path defined means launching with half a checkout. |

## 17. Required Fixes Before Phase 1 (If Medusa Were the Path)

If Dan overrules this recommendation and wants to proceed with Medusa despite the risk, these are the non-negotiable required fixes:

| # | Fix | Effort | Owner |
|---|---|---|---|
| 1 | **Execute the full Phase 0 spike** | 10 days | Tobi |
| 2 | **Confirm all credentials** | 1 day | Dan |
| 3 | **Shiprocket AWB/label path proven** | 2 days of spike | Tobi |
| 4 | **Razorpay test payment path proven** | 2 days of spike | Tobi |
| 5 | **Dan admin usability test** | 1 day | Dan + Tobi |
| 6 | **COD payment provider designed** | Post-spike | Tobi |
| 7 | **Airtable sync built and tested** | 2 days of spike | Tobi |
| 8 | **GA4 events verified in DebugView** | 1 day | Tobi |
| 9 | **Storefront deployment path confirmed** | 1 day | Tobi |

Even with all fixes, Phase 1 (commercial build) would take 8-12 additional weeks. Fynd can launch in 2-4 weeks.

## 18. What Not to Build Yet

These items were correctly excluded from the spike scope and should remain excluded regardless of platform decision:

- Full branded storefront polish (use functional components first)
- Production returns/refunds flow (Phase 3)
- Full COD automation (Phase 3)
- Artist dashboards (Phase 6)
- B2B/offline order system (Phase 6)
- Raw material inventory management (Airtable Base 1 remains)
- Full Supabase reporting layer (Phase 6)
- Custom commerce logic in Supabase (never build this)
- Airtable-to-Medusa writeback (not needed until Phase 4)
- Multi-touch attribution analysis (requires 30+ days of data)

## 19. Phase 1 Recommendation

**Launch on Fynd (Commerce.com).**

The existing Phase 4 build plan (in `artifacts/phase-4/`) is written for Fynd. It should be executed as-is:

1. Unblock Tobi with Fynd store access credentials.
2. Execute the Fynd-based Phase 4 build: platform setup, integrations, storefront, cart, checkout.
3. Dan produces hero product photography and copy per `artifacts/phase-3/asset-list.md`.
4. James QA's the Fynd build per `artifacts/phase-4/qa-checklist.md`.
5. Launch on Fynd.

**Preserve the Medusa spike for post-launch:**

1. After launch, when TPL has revenue data and clearer ops requirements, execute the Phase 0 spike as designed.
2. If the spike passes post-launch, build the Medusa migration as a parallel project with no launch timeline pressure.
3. Migrate from Fynd to Medusa when the migration is proven and low-risk.

## 20. Founder Decisions Needed

| Decision | Options | Recommendation | Owner |
|---|---|---|---|
| **Launch platform** | Fynd / Medusa + Supabase / Both in parallel | **Fynd for launch.** Defer Medusa. | Dan — must decide and unblock Tobi with Fynd access. |
| **Medusa spike timing** | Start now / Post-launch | **Post-launch.** No credentials available now. No timeline pressure post-launch. | Dan |
| **Phase 4 build target** | Fynd / Medusa | **Fynd.** Existing Phase 4 artifacts assume Fynd. Execute per plan. | Dan |
| **Credentials for spike** | Provide now / Provide post-launch | **Post-launch.** If Medusa spike is deferred, credentials are not blocking. | Dan |
| **Phase 4 Fynd access** | Provide now / Delay | **Provide now.** This is the current blocker on Tobi's entire build. Highest-priority action. | Dan |

## 21. Final Action List

| # | Action | Owner | Deadline | Depends On |
|---|---|---|---|---|
| 1 | **Provide Fynd store access to Tobi** | Dan | 2026-06-02 | — |
| 2 | **Execute Phase 4 Fynd build per existing plan** | Tobi | Launch - 2 weeks | #1 |
| 3 | **Produce hero product photography** | Dan | Launch - 1 week | `artifacts/phase-3/asset-list.md` |
| 4 | **Write product copy for top 15 SKUs** | Dan | Launch - 1 week | `artifacts/phase-3/copy-system.md` |
| 5 | **Prepare QA tests for Fynd build** | James | Launch - 1 week | — |
| 6 | **Preserve Medusa spike docs for post-launch** | Harley | 2026-06-02 | — |
| 7 | **Schedule Medusa spike re-evaluation at Day 30 post-launch** | Harley | Launch + 30 days | Launch |

---

# CTO Gate Decision

```
Decision: DO NOT PROCEED

Medusa + Supabase is not launch-ready for TPL's first D2C relaunch.

The architecture is well-designed. The planning documents are thorough.
But the Phase 0 spike has not been executed. Every integration path is
untested. All three validation leads independently recommend Fynd as
safer for launch. The existing Phase 4 plan assumes Fynd as the build
target and should be executed as-is.

TPL should launch on Fynd (Commerce.com) per the existing plan, then
revisit Medusa + Supabase post-launch when there is revenue data,
sharper ops requirements, and engineering capacity without launch
timeline pressure.
```

### Phase 1 Authorization

```
Authorized: Fynd (Commerce.com) — per existing Phase 4 plan
Not Authorized: Medusa + Supabase — insufficient evidence to proceed
```

### Founder Decisions Needed

| Decision | Options | Recommendation | Owner |
|---|---|---|---|
| Launch platform | Fynd / Medusa | **Fynd** | Dan |
| Medusa spike timing | Now / Post-launch | **Post-launch** | Dan |
| Unblock Fynd access | Provide now / Delay | **Provide now** | Dan |

### Sign-Off

```
CTO Gate Owner: Harley
Date: 2026-05-30
Decision: DO NOT PROCEED — Launch on Fynd
Authority: This recommendation certifies that the Phase 0 CTO gate review
           is complete. The evidence does not support proceeding with
           Medusa + Supabase for the first TPL D2C relaunch. The
           existing Fynd-based Phase 4 plan should be executed as-is.

Dan must accept this recommendation in writing before resources are
allocated to any Medusa build work during the launch window.
```
