<!-- last-updated: 2026-03-27 -->
# Pre-Launch Validation Checklist — Phase 4 Gate

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Merchandising Implementation |
| **Producing Agent** | Raj (Logistics & Fulfillment Lead) |
| **Date** | 2026-03-27 |
| **Status** | draft |
| **Reviewer** | Dan |

---

## Overview

This checklist tracks all Phase 4 gate criteria before Phase 5 launch activates. Every item must be checked and confirmed before the "Launch Go/No-Go" decision.

**Authority:** James (QA Lead) signs off on technical criteria. Harley signs off on overall gate. Dan makes final launch date decision.

**Update frequency:** Daily. Dan reviews this document at 5 PM each day to track progress.

---

## D-007 Pre-Launch Validation Criteria (From Decision Log)

These are locked decisions from Phase 3–4 planning. All must be met before launch day.

### Criterion 1: Gift 20+ Products to Validation Network

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Identify 20+ recipients** | Rachel | ⬜ Pending | — | See seeding-plan.md for recipient profile |
| **Procure 20+ products** | Dan | ⬜ Pending | Inventory required | From current TPL stock or pre-production |
| **Pack gifts (branded)** | Dan + helper | ⬜ Pending | Packing supplies; time | Use fulfillment-packing-sop.md |
| **Ship all 20+ gifts** | Dan | ⬜ Pending | Shiprocket live | Dispatch by [DATE TBD] |
| **Track delivery & collect feedback** | Rachel | ⬜ Pending | Recipient engagement | WhatsApp follow-up after delivery |
| **Document proof** | Rachel | ⬜ Pending | — | Photos of packed gifts + shipping receipts |

**Gate rule:** All 20+ gifts shipped + tracking started before validation phase ends.

---

### Criterion 2: Validate Card Sticker Pricing with 10 Real Transactions

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Fynd store LIVE (staging)** | Tobi | ⬜ Pending | Platform access | See technical-implementation-plan.md |
| **Card sticker product uploaded** | Dan | ⬜ Pending | Photos + copy | Hero product, full pricing & variants |
| **Razorpay integration LIVE (test mode)** | Tobi | ⬜ Pending | Account setup + Fynd config | Accept test payments |
| **Process 10 test purchases** | Dan + Tobi | ⬜ Pending | Payment processing | Use test cards + real flows |
| **Test COD on 5 orders** | Dan | ⬜ Pending | Shiprocket integration | Test end-to-end COD + refund |
| **Confirm ₹249 clears all payment methods** | Tobi | ⬜ Pending | Razorpay verification | UPI, cards, wallets all work |
| **Document transaction proof** | Tobi | ⬜ Pending | — | Screenshots of Razorpay transactions + Fynd orders |

**Gate rule:** All 10 transactions completed, verified, refunded (test transactions). No production revenue expected.

---

### Criterion 3: Post 10 Content Pieces in New Voice

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Instagram posts (5–7)** | Chase + Casey | ⬜ Pending | Copy + design | Use copy-system.md voice rules |
| **Instagram Stories (3–5)** | Casey | ⬜ Pending | Design + photography | FOMO-adjacent, 24hr urgency |
| **Captions use voice rules** | Chase | ⬜ Pending | — | Opinionated, group chat register, edge on humor |
| **Photos match Darkroom system** | Casey | ⬜ Pending | Visual identity | Dark bg, proper contrast |
| **Schedule posts (don't publish yet)** | Chase | ⬜ Pending | Buffer/Later account setup | Pre-launch posts ready to go Day 1 |
| **Document proof** | Casey | ⬜ Pending | — | Screenshots of scheduled posts + voice audit |

**Gate rule:** All 10 pieces created, audited against voice rules, scheduled (not published). Publish trigger: Phase 4 gate passes + launch narrative activates.

---

### Criterion 4: Seed 500+ Email/WhatsApp Subscribers

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Newsletter signup mechanism (homepage)** | Tobi | ⬜ Pending | Fynd form integration | Pop-up or inline signup |
| **Klaviyo or Mailchimp account LIVE** | Eli | ⬜ Pending | Account creation + config | Segment: Pre-launch subscribers |
| **WhatsApp Business account approved** | Eli | ⬜ Pending | Meta approval (can take 3–5 days) | Send first message templates |
| **Collect 500+ subscribers pre-launch** | Rachel + Chase | ⬜ Pending | Social sharing + DM collection | Multiple channels: Instagram, WhatsApp, friends |
| **Subscribers imported to email list** | Eli | ⬜ Pending | — | Segment as "Pre-launch audience" |
| **Subscriber welcome email scheduled** | Eli | ⬜ Pending | Copy from phase-5 | Send at launch Day 1 |
| **Document proof** | Eli | ⬜ Pending | — | Screenshot of subscriber count in Klaviyo |

**Gate rule:** 500+ confirmed subscribers (email + WhatsApp combined) before launch messaging begins.

---

## Phase 4 Build Gate Criteria (From Knowledge/26-CURRENT-STATE.md)

These technical and operational criteria unlock Phase 5.

### Criterion 5: Staging Site LIVE

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Fynd Commerce store created** | Dan | ⬜ Pending | Fynd account + access | Basic setup in <30 mins |
| **Domain configured** | Tobi | ⬜ Pending | DNS records + SSL cert | theproductlab.in resolving correctly |
| **Homepage built & deployed** | Tobi | ⬜ Pending | Design handoff from Julie | Mobile-responsive, hero section |
| **Navigation & sitemap live** | Tobi | ⬜ Pending | 14+ page structure | See ux-ia-wireframes.md |
| **Mobile rendering tested** | James | ⬜ Pending | QA environment | Viewport 375px, 768px, 1200px all work |
| **Non-indexed (staging only)** | Tobi | ⬜ Pending | Robots.txt + noindex headers | Not discoverable by Google |
| **Link check (all pages accessible)** | James | ⬜ Pending | QA checklist | No 404s, all internal links valid |

**Gate rule:** Staging site loads in <3 seconds on 4G, all pages accessible, mobile-friendly.

---

### Criterion 6: Hero Products Uploaded with Real Photos & Copy

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Top 5 SKUs identified** | Shreyas/Andy | ⬜ Pending | Product hierarchy | See product-hierarchy.md |
| **Product photography (hero SKUs)** | Dan | ⬜ Pending | Dark bg setup + phone camera | Dark posterboard, proper lighting |
| **Product copy written** | Dan | ⬜ Pending | Voice rules from copy-system.md | PDP template: identity hook + why this + specs |
| **SKUs uploaded to Fynd** | Dan | ⬜ Pending | Product name, SKU, price, images | All fields per product-schema in technical-plan |
| **Images optimized (<150KB WebP)** | Tobi | ⬜ Pending | Batch processing | Squoosh or ImageMagick |
| **Meta tags set (SEO title + description)** | Tobi | ⬜ Pending | Per technical-plan Section 3.2 | Max 60 chars title, 155 chars description |
| **Product pages indexed (staging)** | James | ⬜ Pending | QA check | PDPs accessible, images load, copy displays |
| **Variants set up (if applicable)** | Dan | ⬜ Pending | E.g., color, size | Product detail page shows all variants |

**Gate rule:** Hero products live on staging, photography professional enough for social proof, copy passes voice audit.

---

### Criterion 7: Razorpay LIVE (Test Mode Confirmed)

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Razorpay account created** | Dan | ⬜ Pending | KYC (Aadhaar/PAN) | Account setup <30 mins |
| **API keys generated** | Dan | ⬜ Pending | — | API Key ID + API Secret copied |
| **Integrated with Fynd** | Tobi | ⬜ Pending | Fynd dashboard setup | Payment gateways section |
| **Test mode ACTIVE** | Tobi | ⬜ Pending | Toggle in payment settings | All test transactions processed as "test" |
| **UPI tested** | Dan | ⬜ Pending | Test UPI: testmerchant@razorpay | Works instantly |
| **Card payment tested** | Dan | ⬜ Pending | Test card: 4111 1111 1111 1111 | Visa, Mastercard, RuPay |
| **Failed payment tested** | Tobi | ⬜ Pending | Test card ending in 0000 | Error handling verified |
| **Razorpay plan selected** | Dan | ⬜ Pending | Starter (2%), Growth (1.5%), Pro (1%) | Recommend: Starter to start |

**Gate rule:** All payment methods process test transactions successfully. No errors. Ready to switch to live mode Day 0.

---

### Criterion 8: Shiprocket AWBs Generating (COD Tested End-to-End)

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Shiprocket account created** | Dan | ⬜ Pending | Seller verification + bank details | Account setup <30 mins |
| **Integrated with Fynd** | Tobi | ⬜ Pending | Fynd shipping integrations | Orders sync from Fynd → Shiprocket |
| **Test orders created in Fynd** | Dan | ⬜ Pending | 5 prepaid + 5 COD test orders | Different price points, zones |
| **AWB labels generated** | Tobi | ⬜ Pending | Shiprocket "Generate Label" button | Labels print to thermal printer |
| **Prepaid shipping costs calculated** | Tobi | ⬜ Pending | Verify against estimates in logistics-baseline.md | Budget 5–8% of order value |
| **COD fees applied** | Tobi | ⬜ Pending | ₹26–₹36 per COD order | Shows in checkout |
| **Free shipping threshold (₹499+) tested** | Dan | ⬜ Pending | Create order >₹499, verify 0 shipping | Feature working |
| **Carrier selection (multi-carrier)** | Tobi | ⬜ Pending | Auto-select routing, not single carrier | Shiprocket algorithm active |
| **COD end-to-end verified** | Dan + Raj | ⬜ Pending | Full flow: order → label → dispatch → payment collection | Test on 3 different zones |
| **NDR (Non-Delivery) flow tested** | James | ⬜ Pending | Simulate failed delivery in Shiprocket | WhatsApp notification triggers |
| **Refund process (Razorpay ↔ Shiprocket)** | Tobi | ⬜ Pending | Test refund on COD order | Funds return to bank within SLA |

**Gate rule:** COD orders processed end-to-end successfully. No system errors. Refunds process within stated SLA.

---

### Criterion 9: GA4 Tracking All Key Events

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **GA4 property created** | Dan | ⬜ Pending | Google Analytics account | New property: "The Product Lab" |
| **Measurement ID installed** | Tobi | ⬜ Pending | Fynd dashboard GA4 integration | G-XXXXXXXXXX loaded |
| **Page view events firing** | Tobi | ⬜ Pending | Homepage → GA4 events | Verify in real-time |
| **Product view events firing** | Tobi | ⬜ Pending | PDP → GA4 event_name: "view_item" | All SKUs tracked |
| **Add to cart events firing** | Tobi | ⬜ Pending | Cart button click → GA4 | Payload includes item name, price |
| **Begin checkout events firing** | Tobi | ⬜ Pending | Proceed to checkout → GA4 | Cart value tracked |
| **Purchase events firing** | Tobi | ⬜ Pending | Order confirmation → GA4 purchase event | Revenue, items, transaction ID logged |
| **Collection view events firing** | Tobi | ⬜ Pending | Collection page → GA4 event | Track collection engagement |
| **Custom events defined** | Tobi | ⬜ Pending | See analytics-event-schema.md | Bundle view, drop signup, newsletter signup |
| **Debug mode verified** | Tobi | ⬜ Pending | GA4 DebugView shows test events | Real-time event inspection |
| **Data retention set (14 months)** | Dan | ⬜ Pending | GA4 settings | Sufficient for 12-month analysis |
| **Dashboards created** | Tobi | ⬜ Pending | Product performance, traffic, checkout funnel | Ready for Day 30 review |

**Gate rule:** All events fire correctly. No dropped events. GA4 ready for post-launch analysis.

---

### Criterion 10: LCP <3 Seconds on 4G Confirmed

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Images optimized (WebP <150KB)** | Tobi | ⬜ Pending | Batch processing | Product images, hero images |
| **Critical CSS inlined** | Tobi | ⬜ Pending | <head> contains inline dark bg + fonts | No render-blocking external CSS |
| **Fonts loaded from Google CDN** | Tobi | ⬜ Pending | font-display: swap enabled | Barlow Condensed + Inter |
| **Lazy loading enabled (below-fold images)** | Tobi | ⬜ Pending | loading="lazy" attribute | Only above-fold images eager-load |
| **LCP metric measured (homepage)** | James | ⬜ Pending | PageSpeed Insights / WebVitals | <3 seconds on 4G throttle |
| **LCP metric measured (PDP)** | James | ⬜ Pending | First product image is LCP element | <3 seconds |
| **LCP metric measured (collections)** | James | ⬜ Pending | First product card in grid | <3 seconds |
| **Mobile throttle test (4G slow)** | James | ⬜ Pending | DevTools Network tab: "Slow 4G" | All pages meet <3s target |
| **CLS (Cumulative Layout Shift) checked** | James | ⬜ Pending | No layout jumps during load | Stable <0.1 score |
| **Third-party scripts deferred** | Tobi | ⬜ Pending | Analytics, tracking scripts load async | No blocking on critical rendering path |
| **Lighthouse score ≥90 (mobile)** | James | ⬜ Pending | PageSpeed Insights Lighthouse | Performance, Best Practices, Accessibility |

**Gate rule:** LCP <3s confirmed on all major pages. Hard requirement for India mobile-first audience.

---

### Criterion 11: James QA Sign-Off (No P0/P1 Issues Open)

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **QA checklist reviewed** | James | ⬜ Pending | See qa-checklist.md | P0, P1, P2 criteria defined |
| **P0 (Critical) tests all pass** | James | ⬜ Pending | e.g., cart functional, payment works, mobile responsive | 0 open P0 bugs allowed |
| **P1 (High) issues documented** | James | ⬜ Pending | If any P1 open, root cause + fix timeline logged | Blockers escalated to Tobi |
| **P2 (Medium) issues logged** | James | ⬜ Pending | Do not block launch; plan for Day 5 fix | Documented for post-launch |
| **Cross-browser testing complete** | James | ⬜ Pending | Chrome, Safari, Firefox on mobile/desktop | All pass |
| **Accessibility audit (WCAG 2.1 AA)** | James | ⬜ Pending | Images have alt text, contrast >4.5:1, keyboard navigation | Pass |
| **Security checklist passed** | Tobi + James | ⬜ Pending | No hardcoded secrets, SSL/TLS enforced, form inputs sanitized | Pass |
| **James formal sign-off** | James | ⬜ Pending | Written confirmation: "Site ready for production" | Email or artifact comment |

**Gate rule:** James's sign-off is final. Harley and Dan do not override James's decision. If P0 issues exist, launch is blocked until resolved.

---

### Criterion 12: 3+ Collections LIVE with Correct Products

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Collection 1: Card Stickers** | Dan | ⬜ Pending | Hero collection; 5–8 SKUs | Card stickers (full + half card sizes) |
| **Collection 2: Attitude Keychains** | Dan | ⬜ Pending | No Filter collection; 3–5 SKUs | Keychains with attitude copy |
| **Collection 3: Lapel Pins** | Dan | ⬜ Pending | Original + licensed; 4–6 SKUs | Pins (hard enamel) |
| **Each collection has hero image** | Casey | ⬜ Pending | Homepage/collection page banner | Branded, matches Darkroom system |
| **Collection copy written** | Dan | ⬜ Pending | Headline + intro (see copy-system.md Part 3) | Opinionated, not descriptive |
| **Products tagged correctly** | Dan | ⬜ Pending | Fynd product tags align | Supports filtering |
| **Variants displayed (if applicable)** | Tobi | ⬜ Pending | Color, size options shown in collection | UX clear |
| **Collection pages indexed** | James | ⬜ Pending | All 3 collections accessible, products visible | No 404s or broken links |
| **Featured products featured prominently** | Tobi | ⬜ Pending | Top 2–3 per collection shown first | Algorithmic or manual sort |

**Gate rule:** 3+ collections fully populated, live on staging, copy audited, all products visible.

---

## Other Pre-Launch Critical Items

### Product Sourcing & Inventory

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Current inventory counted** | Dan | ⬜ Pending | Physical count vs. Fynd inventory | Full SKU reconciliation |
| **Reorder initiated (if needed)** | Patrick | ⬜ Pending | Hero SKUs at safety stock level (5 units) | Production lead time to Ink Fish |
| **Production samples verified** | Andy | ⬜ Pending | Quality check on production batch | Against spec in production-costs.md |
| **Packaging supplies in stock** | Dan | ⬜ Pending | Bubble mailers (200), chipboard (200), cards (500), stickers (500) | See fulfillment-packing-sop.md supplies checklist |
| **Warehouse storage organized** | Dan | ⬜ Pending | SKU labeling, bin structure, picking flow | Ready for daily operations |

**Gate rule:** Inventory ready to fulfill 20+ gift orders + 50+ Day 1 launch orders.

---

### Operational & Process

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Fulfillment SOP documented** | Raj | ✅ Complete | — | See fulfillment-packing-sop.md (this session) |
| **Dan trained on SOP** | Raj | ⬜ Pending | Walkthrough: order → pack → dispatch | <10 mins per order achievable |
| **Thank-you card copy locked** | Casey | ⬜ Pending | Warm, brief, private tone | See fulfillment-packing-sop.md Part 7 |
| **Returns policy finalized** | Patrick | ⬜ Pending | See returns-exchange-policy.md | Posted on website before launch |
| **FAQ published** | Joanna | ⬜ Pending | 30+ Q&A covering shipping, payment, product | WhatsApp-friendly answers |
| **Customer comms templates locked** | Joanna | ⬜ Pending | See customer-comms-templates.md | Order confirmation, shipping, thank-you |
| **Support escalation path defined** | Tony | ⬜ Pending | Who handles refunds, complaints, etc. | Dan is primary; Tony activates Phase 5 |

**Gate rule:** All operational docs complete. Dan has been trained and understands workflows.

---

### Marketing & Launch Readiness

| Item | Owner | Status | Blocker | Notes |
|------|-------|--------|---------|-------|
| **Launch narrative finalized** | Nik | ⬜ Pending | See launch-narrative.md | Brand story, go-to-market, Day 1 messaging |
| **Content calendar finalized** | Chase + Casey | ⬜ Pending | See content-calendar.md | 10 pre-launch posts scheduled (not published) |
| **Seeding list finalized** | Rachel | ⬜ Pending | See seeding-plan.md | 20+ recipients, Design Yatra contacts, 500+ subscribers |
| **Email flows ready** | Eli | ⬜ Pending | See email-whatsapp-flows.md | Welcome, cart recovery, post-purchase |
| **WhatsApp flows ready** | Eli | ⬜ Pending | Order confirmation, shipping, refund flow | Message templates approved by Meta |
| **Launch runbook drafted** | Andrew + Tony | ⬜ Pending | See launch-runbook.md | Hour-by-hour Day 1 operations |

**Gate rule:** All content, messaging, and flows reviewed and approved. Ready to publish Day 1.

---

## Master Gate Summary

### Checklist Status (Auto-Calculated)

| Category | Criteria | Status | Owner | ETA |
|----------|----------|--------|-------|-----|
| **D-007 Pre-Launch Validation** | 4 criteria (20 gifts, 10 txns, 10 posts, 500 subscribers) | 0/4 ⬜ | Rachel, Dan, Chase, Eli | [TBD] |
| **Phase 4 Build** | 8 technical criteria (site, products, payments, shipping, GA4, LCP, QA, collections) | 0/8 ⬜ | Tobi, Dan, James | [TBD] |
| **Operational** | 5 items (SOP, inventory, supplies, training, policy) | 1/5 ⬜ | Dan, Raj, Patrick | [TBD] |
| **Launch Readiness** | 6 items (narrative, content, seeding, flows, runbook) | 0/6 ⬜ | Nik, Chase, Rachel, Eli, Andrew | [TBD] |
| **TOTAL** | 23 criteria + 11 items | **1/23** | — | — |

---

## Gate Go/No-Go Decision Framework

### Conditions for GO (Phase 5 Activation)

✅ **All 23 + 11 checklist items COMPLETE**
- No critical blockers
- James has signed off
- Harley has reviewed and approved
- Dan has confirmed launch date

✅ **Risk assessment passed**
- <5% RTO rate expected (pre-launch COD tests)
- LCP <3s confirmed on all pages
- Payment processing works reliably
- No unresolved P0 bugs

✅ **Stakeholder alignment**
- Dan ready to execute daily operations
- Shipping partners confirmed (Shiprocket live)
- Email/SMS infrastructure live
- All agents briefed and ready

### Conditions for NO-GO (Delay)

🔴 **Any P0 issue unresolved** → James blocks gate
- Examples: Cart not functional, payment errors, mobile breakage, payment failure >10%
- Delay: Fix issue + re-test, minimum 2–3 days

🔴 **LCP >3s on 4G** → James blocks gate
- Images not optimized, critical CSS not inlined, fonts not loading
- Delay: Optimize assets, re-test on throttled connection

🔴 **Inventory shortage** → Dan/Patrick blocks gate
- Hero SKUs out of stock or below safety level
- Delay: Wait for production reorder (7–10 days typical)

🔴 **Fulfillment ops not ready** → Dan blocks gate
- SOP not understood, supplies not procured, training incomplete
- Delay: Complete training + dry run (1–2 days)

🔴 **Payment processing failures** → Tobi blocks gate
- >5% test payment failures, COD flow broken
- Delay: Troubleshoot with Razorpay/Fynd (1–2 days)

---

## How Dan Uses This Document

**Daily Usage (5 PM each day):**
1. Open this document
2. Scan "Master Gate Summary" table
3. Update any items that moved from pending → complete
4. Check ETA column — are we on track for launch?
5. Flag any blockers in red for Harley or agent owners
6. Share updated doc with Harley

**Weekly Review (Friday 3 PM):**
1. Compile all updates from the week
2. Calculate progress percentage (X/23 complete)
3. Identify biggest remaining blockers
4. Escalate to Dan if any items at risk of missing deadline

**Launch Day (Day 0):**
1. Print this document
2. Verify every item is ✅ checked
3. If any item is 🟡 incomplete, escalate to Harley immediately
4. Only proceed if all items ✅ and James signs off

---

## Who Owns What — Quick Reference

| Owner | Owns These Items |
|-------|------------------|
| **Dan** | D-007 prep (gifts, posts, subscribers), inventory, operational readiness, training |
| **Tobi** | Technical build (site, payments, shipping, GA4, performance, QA checklist execution) |
| **James** | QA testing, LCP validation, P0/P1/P2 sign-off, gate decision |
| **Harley** | Overall gate coordination, blocker resolution, escalation to Dan |
| **Rachel** | Gift recipients, subscriber seeding |
| **Chase + Casey** | Content calendar, post creation |
| **Eli** | Email/SMS flows, WhatsApp setup |
| **Andrew + Tony** | Launch runbook, Day 1 ops |
| **Raj** | Fulfillment SOP documentation (complete), FYI on operational readiness |

---

## Phase 4 → Phase 5 Transition

**When Phase 4 gate PASSES (all criteria ✅):**

1. Harley updates `knowledge/26-CURRENT-STATE.md` → Phase 5 activated
2. Harley spawns Phase 5 agents: Nik, Chase, Rachel, Eli, Andrew, Avinash, Tony
3. Content calendar posts publish immediately (scheduled posts go live)
4. Launch narrative messaging starts
5. Gift seeding begins (ships out Day 1 + 2)
6. Email/SMS flows go live

**If Phase 4 gate is NO-GO:**

1. Harley documents blocker in `status/weekly-status.md`
2. Owners fix issue (typically 2–7 days)
3. Harley re-runs gate check
4. Launch date pushed (communicate to Dan)

---

## Related Artifacts

- `fulfillment-packing-sop.md` — Order-to-dispatch operations
- `store-operations-manual.md` — Daily procedures for Dan
- `technical-implementation-plan.md` — Build blueprint
- `qa-checklist.md` — Detailed QA test cases
- `launch-narrative.md` — Go-to-market story
- `launch-runbook.md` — Hour-by-hour Day 1 ops
- `seeding-plan.md` — Gift recipients + subscriber strategy
- `content-calendar.md` — Pre-launch posts (with copy)

---

## Glossary

| Term | Definition |
|------|-----------|
| **P0 (Critical)** | Site is down, payment doesn't work, mobile broken. Blocks launch. |
| **P1 (High)** | Feature not working (e.g., cart buggy), impacts UX. Must fix before launch. |
| **P2 (Medium)** | Minor issue (e.g., button color off), doesn't block. Plan Day 5 fix. |
| **LCP** | Largest Contentful Paint — time for main image to load. Target <3s. |
| **RTO** | Return to Origin — package bounces back after 3 failed delivery attempts. |
| **COD** | Cash On Delivery — payment collected at door by carrier. |
| **AWB** | Airway Bill — shipping label with barcode. |
| **NDR** | Non-Delivery Report — carrier failed to deliver, will retry. |
| **Gate** | Checklist of criteria that must be met before advancing to next phase. |

---

*Last updated: 2026-03-27 by Raj*

*This document is living. Update daily. Share with Dan at 5 PM.*
