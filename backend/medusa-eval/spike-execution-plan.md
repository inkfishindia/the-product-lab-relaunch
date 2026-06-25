# Phase 0 Spike Execution Plan: Medusa + Supabase/Postgres

<!-- last-updated: 2026-05-29 -->

## 1. Spike Objective

Prove or disprove, in 7-10 working days, whether The Product Lab should move forward with a Medusa + Supabase/Postgres open-source commerce stack instead of Fynd for the first D2C relaunch.

This is not a full platform build. The spike exists to validate the riskiest path:

```text
Next.js storefront shell
  -> Medusa backend
  -> Supabase-hosted Postgres
  -> Razorpay test checkout
  -> Medusa order creation
  -> Airtable ops record
  -> Shiprocket feasibility path
  -> GA4 event readiness
```

The spike passes only if TPL can prove a real customer can view a real SKU, add it to cart, pay through Razorpay test mode, create a correct Medusa order, mirror the order into Airtable for ops, and either create or clearly prove the Shiprocket AWB path.

Brutally honest stance: Fynd is safer for fastest launch because Razorpay, Shiprocket, COD, admin workflows, and India-first commerce behavior are closer to native. Medusa + Supabase is only worth choosing if TPL accepts custom integration ownership in exchange for long-term control.

## 2. System Assumptions

### Source Of Truth Rules

| Domain | Source of truth | Spike rule |
|---|---|---|
| Product, variant, price, cart, order, discount, sellable inventory | Medusa | Storefront reads commerce data from Medusa only. |
| Database hosting and system tables | Supabase Postgres | Supabase hosts Medusa Postgres and optional integration logs. |
| Human ops workflow | Airtable | Airtable receives mirrored order data and owns production/packing/QC notes only. |
| Payment authorization, capture, refund state | Razorpay | Razorpay webhook/payment verification is the payment truth. |
| Shipment, AWB, courier tracking, COD delivery status | Shiprocket | Shiprocket owns shipping truth after order handoff. |
| Funnel behavior | GA4/GTM | GA4 tracks behavior, not operational truth. |

### Spike Constraints

- Use 10 real TPL SKUs from `artifacts/phase-4/product-catalog.md`.
- Do not migrate all Airtable data.
- Do not build custom commerce directly in Supabase.
- Do not let Airtable edit order totals, payment status, or Medusa order state.
- Do not solve production inventory, raw materials, B2B/offline order management, returns, refunds, subscriptions, or artist dashboards during the spike.
- Treat COD as feasibility unless Razorpay/Medusa/Shiprocket support can be proven quickly without distorting the core prepaid test path.

### Current Program Tension

The existing Phase 4 plan assumes Commerce.com/Fynd as the build target. That plan relies on Fynd-native or Fynd-supported Razorpay, Shiprocket, checkout, shipping, admin, and order workflows.

The Medusa path replaces that safety with engineering control. This is the central trade-off. If the spike shows custom integration work is too deep for TPL's launch window, Fynd should remain the launch platform.

## 3. Required Credentials/Access

| Access | Required for | Owner | Blocking? |
|---|---|---|---|
| Supabase project URL, Postgres host, DB password, connection pooler settings | Medusa database | Dan/CTO | Yes |
| Supabase SQL editor or admin access | Verify schema, logs, connection limits | Dan/CTO | Yes |
| Razorpay test key ID and secret | Checkout/payment proof | Dan | Yes |
| Razorpay webhook secret | Payment verification proof | Dan | Yes |
| Airtable personal access token | Order sync proof | Dan | Yes |
| Airtable base/table choice for online orders | Order mirror target | Dan/Ops | Yes |
| Airtable field schema for target table | Mapping and validation | Dan/Ops | Yes |
| Shiprocket API credentials or sandbox/test account | AWB/order feasibility | Dan/Andy | Yes for proof, no for documented feasibility |
| GA4 measurement ID | Storefront event proof | Dan/Eli | Yes for DebugView proof |
| GTM container ID, if GTM is preferred | Analytics implementation | Dan/Eli | Optional |
| 10 SKU final approval | Product import | Dan/Catalog | Yes |
| Product images usable from existing URLs or asset folder | PDP proof | Dan/Catalog | Yes |
| Test customer address and pincode set | Checkout/shipping tests | Tobi/James | Yes |

No live credentials should be committed. Use local `.env` files and deployment environment variables only.

## 4. Local Development Setup

### Baseline Tooling

- Node.js LTS
- pnpm or npm, chosen once at scaffold time
- Medusa backend project
- Next.js storefront project
- Supabase-hosted Postgres
- Local Redis if the chosen Medusa setup requires it for event bus/workflows
- ngrok or an equivalent tunnel for Razorpay webhooks during local testing

### Environment Variables

Use separate env files for backend and storefront.

Backend:

```text
DATABASE_URL=
MEDUSA_ADMIN_ONBOARDING_TYPE=default
JWT_SECRET=
COOKIE_SECRET=
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000,http://localhost:7001
AUTH_CORS=http://localhost:3000,http://localhost:9000,http://localhost:7001
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
RAZORPAY_WEBHOOK_SECRET=
AIRTABLE_TOKEN=
AIRTABLE_BASE_ID=
AIRTABLE_ORDERS_TABLE_ID=
SHIPROCKET_EMAIL=
SHIPROCKET_PASSWORD=
SHIPROCKET_TOKEN=
```

Storefront:

```text
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_RAZORPAY_KEY_ID=
NEXT_PUBLIC_GA4_MEASUREMENT_ID=
```

### Local Smoke Test

1. Start Medusa backend.
2. Confirm backend connects to Supabase Postgres.
3. Open Medusa admin.
4. Import 10 SKUs.
5. Start Next.js storefront.
6. Open product listing and PDP.
7. Add SKU to cart.
8. Begin checkout.
9. Complete Razorpay test payment.
10. Verify Medusa order.
11. Verify Airtable order mirror.
12. Verify GA4 DebugView events.

## 5. Proposed Repo/Folder Structure

This repo currently reads as a planning/artifacts workspace, not an application monorepo. For the spike, create a deliberately isolated workspace so the proof can be deleted or promoted cleanly.

```text
apps/
  medusa-backend/
    src/
      modules/
      workflows/
      api/
      scripts/
        seed-tpl-products.ts
    medusa-config.ts
    .env.example
  storefront/
    app/
      page.tsx
      products/[handle]/page.tsx
      cart/page.tsx
      checkout/page.tsx
      order-confirmed/page.tsx
    lib/
      medusa.ts
      analytics.ts
      razorpay.ts
    .env.example
integrations/
  airtable/
    order-field-map.md
  shiprocket/
    feasibility-notes.md
data/
  spike-products-10-skus.csv
docs/
  medusa-supabase-platform/
    spike-execution-plan.md
```

For this planning pass, do not scaffold code until credentials and package manager choices are confirmed. The first implementation artifact should be `.env.example` files and the 10-SKU import CSV, not custom checkout code.

## 6. Medusa Setup Steps

1. Create a Medusa backend in `apps/medusa-backend`.
2. Configure `DATABASE_URL` to use the Supabase Postgres connection string.
3. Confirm migrations complete against Supabase.
4. Create admin user for Dan/Tobi.
5. Configure region for India:
   - Currency: INR
   - Country: India
   - Tax handling: minimal spike configuration only
   - Shipping methods: flat test method first
6. Configure product model for TPL:
   - Product title
   - SKU
   - Category
   - Price in INR
   - Image URL
   - Description placeholder or approved copy if available
7. Import 10 products with stable SKUs.
8. Verify storefront can fetch products via Medusa Store API.
9. Prove cart creation, line item add, shipping selection, and order completion path.
10. Capture admin screenshots or notes proving Dan can inspect products and orders without developer intervention.

Hard truth: Medusa gives TPL commerce primitives, not India-specific launch convenience. Razorpay and Shiprocket are likely custom or third-party plugin work. That is acceptable only if the spike proves the custom surface is small and maintainable.

## 7. Supabase Setup Steps

1. Create or choose a Supabase project dedicated to this spike.
2. Create a strong database password and store it outside the repo.
3. Use Supabase's direct Postgres connection for migrations.
4. Use a pooler connection only if Medusa runtime needs it and compatibility is confirmed.
5. Apply Medusa migrations.
6. Verify tables exist in Supabase.
7. Add optional spike-only tables if useful:
   - `integration_event_log`
   - `airtable_sync_log`
   - `shiprocket_sync_log`
8. Do not create commerce product/order tables outside Medusa.
9. Do not manually edit Medusa-owned rows from Supabase Studio except for debugging.

Pass condition: Medusa can run reliably against Supabase Postgres for a full checkout test without connection churn, migration failure, or transaction issues.

## 8. Product Import Approach For 10 SKUs

Use 10 stable real SKUs from the existing catalog. Recommended initial set:

| SKU | Product | Category | Price |
|---|---|---|---|
| KC-001 | Coca Cola Keychain | Keychains | INR 199 |
| KC-002 | Suck It Keychain | Keychains | INR 199 |
| KC-003 | Always Tired Keychain | Keychains | INR 199 |
| KC-004 | Girl Power Keychain | Keychains | INR 199 |
| KC-005 | HIMYM Keychain | Keychains | INR 199 |
| ER-001 | Less Panic More Disco Earrings | Earrings | INR 199 |
| ER-002 | Ice Cream Love Bites Earrings | Earrings | INR 199 |
| LP-001 | Nike Air Red Offwhite Lapel Pin | Lapel Pins | INR 149 |
| FM-001 | Arsenal Fridge Magnet | Fridge Magnets | INR 225 |
| CS-001 | Cartoon Network Card Sticker | Card Stickers | INR 149 |

Do not include known unresolved products in the spike:

- `LP-002` because image is awaiting.
- `CS-002` and `CS-003` until half-card/full-card variant pricing is resolved.
- `ST-001` unless Dan confirms the INR 49 loss-leader strategy.

Implementation:

1. Create `data/spike-products-10-skus.csv`.
2. Write a Medusa seed/import script.
3. Import each product as one product with one variant unless the SKU has confirmed variants.
4. Store original SKU in the Medusa variant SKU field.
5. Use image URLs from the catalog for the spike; replace with final product photography later.
6. Set sellable inventory to a small test quantity, for example 10 units per SKU.

Pass condition: all 10 SKUs appear in Medusa admin and storefront with correct SKU, title, image, category, and price.

## 9. Razorpay Integration Approach

### Goal

Prove prepaid Razorpay test checkout can create a valid paid Medusa order.

### Preferred Spike Path

1. Use a Medusa payment provider/plugin if a maintained Razorpay provider is available and compatible with the Medusa version chosen.
2. If no reliable provider exists, build the thinnest custom provider/proof:
   - Create Razorpay order from backend.
   - Open Razorpay checkout from storefront.
   - Verify Razorpay signature on backend.
   - Mark Medusa payment/session/order according to Medusa's supported workflow.
   - Receive Razorpay webhook and reconcile payment status.
3. Test UPI and card in Razorpay test mode.
4. Confirm Razorpay dashboard shows captured payment.
5. Confirm Medusa order has correct total, line items, customer, and payment state.

### Must Test

- Successful prepaid card payment.
- Successful UPI payment if available in test mode.
- Failed payment path.
- Duplicate webhook/idempotency handling.
- Amount mismatch rejection.

### Brutal Risk Callout

Razorpay is not optional for TPL. If Medusa cannot integrate cleanly with Razorpay without fragile custom payment-state handling, the Medusa path fails for launch. Fynd is safer in that scenario.

COD should not be treated as solved unless the spike proves how Medusa order/payment state, COD eligibility, Shiprocket COD flag, and customer confirmation all fit together.

## 10. Airtable Sync Approach

### Goal

Mirror Medusa orders into Airtable so the team can run human ops without Airtable becoming financial truth.

### Target Airtable Behavior

Create one Airtable order record per Medusa order with:

- Medusa order ID
- Display order number
- Created timestamp
- Customer name
- Customer email
- Customer phone
- Shipping address
- Line items summary
- SKU list
- Quantity total
- Order total
- Payment method
- Payment status mirror
- Razorpay payment ID
- Fulfillment status mirror
- Ops status, editable in Airtable
- Internal notes, editable in Airtable

### Sync Direction

```text
Medusa order event -> sync worker/API route -> Airtable record
```

Airtable may update:

- Production status
- Packing status
- QC status
- Internal notes
- Exception status

Airtable must not update:

- Order total
- Payment status
- Refund status
- SKU/line item truth
- Customer account truth
- Medusa inventory

### Implementation Options

1. Medusa subscriber/workflow on order placed.
2. Lightweight worker script polling recent orders for spike only.
3. n8n/Pipedream bridge only if TPL already prefers it operationally.

Preferred spike path: Medusa event subscriber or explicit backend sync after order creation, plus an idempotency key using Medusa order ID.

### Brutal Risk Callout

Airtable sync becomes fragile if humans can edit mirrored financial fields, if field names change without versioning, or if retries create duplicate order rows. The spike must prove idempotency and a small field map. If Airtable schema access is blocked or the target table is unclear, this is a launch risk.

## 11. Shiprocket Feasibility Approach

### Goal

Determine whether Medusa orders can be handed to Shiprocket for prepaid and COD shipping without Fynd.

### Proof Levels

| Level | Meaning | Decision value |
|---|---|---|
| Level 1: API feasibility | Confirm required endpoint payloads and auth | Minimum acceptable only if API access is delayed |
| Level 2: Test order creation | Create Shiprocket order from Medusa order payload | Strong pass |
| Level 3: AWB/label generation | Generate AWB and label in Shiprocket test/live-safe mode | Best pass |
| Level 4: COD proof | COD order created with correct payment/shipping flags | Required before COD launch |

### Required Mapping

- Medusa order ID -> Shiprocket order ID/reference
- Customer name, phone, email
- Full shipping address and pincode
- SKU, product name, quantity, selling price
- Package dimensions and weight
- Payment method: prepaid or COD
- Order total and COD collection amount

### Spike Steps

1. Confirm Shiprocket API authentication method.
2. Validate pincode serviceability endpoint if available.
3. Create a payload from one Medusa paid test order.
4. Attempt Shiprocket order creation.
5. If allowed, attempt AWB generation.
6. Document carrier selection and label generation requirements.
7. Confirm whether COD orders require extra setup or carrier constraints.

### Brutal Risk Callout

Fynd currently gives TPL a more straightforward Shiprocket path. Medusa likely requires a custom Shiprocket integration. If Shiprocket API access, AWB creation, COD flags, or label generation are not clear by Day 7, Medusa should not be considered launch-ready for shipping.

## 12. GA4 Event Implementation Approach

### Required Spike Events

Use GA4 ecommerce-compatible events:

| Event | Trigger | Required parameters |
|---|---|---|
| `view_item` | PDP load | `currency`, `value`, `items[]` |
| `add_to_cart` | Add to cart | `currency`, `value`, `items[]` |
| `view_cart` | Cart page/open | `currency`, `value`, `items[]` |
| `begin_checkout` | Checkout start | `currency`, `value`, `items[]` |
| `purchase` | Confirmed paid order | `transaction_id`, `currency`, `value`, `items[]` |

Add `view_collection` only if collection pages exist in the storefront shell during the spike.

### Implementation

1. Create `storefront/lib/analytics.ts`.
2. Normalize Medusa product/variant/cart/order data into GA4 `items[]`.
3. Send client-side events for PDP, cart, and checkout.
4. Send purchase event only after backend confirms order/payment success.
5. Verify in GA4 DebugView.

Do not rely on old Commerce.com/Fynd auto-fire assumptions. In the Medusa storefront, Tobi owns analytics implementation.

## 13. Risks And Blockers

| Risk/blocker | Severity | Why it matters | Mitigation |
|---|---:|---|---|
| Razorpay Medusa integration is immature or incompatible | Critical | Checkout/payment is launch-critical | Spike payment first, not after UI polish |
| Shiprocket requires custom implementation | Critical | Shipping/AWB is core launch ops | Prove API order + AWB path early |
| COD path is not clean | High | COD minimum, serviceability, confirmation, and carrier cash handling matter in India | Keep COD out of launch unless fully proven |
| Airtable field schema is unclear | High | Sync can duplicate or corrupt ops records | Use tiny field map and idempotency key |
| Medusa admin is too technical for Dan | High | Day-to-day product/order ops must be manageable | Include admin usability as pass/fail, not a footnote |
| Supabase connection pooling causes Medusa runtime issues | High | Backend instability kills checkout trust | Test migrations and repeated checkout locally |
| Existing Phase 4 docs assume Fynd | Medium | QA and ops docs may no longer match | Create separate Medusa QA delta if spike passes |
| Product IP/licensing risk in selected SKUs | Medium | Some catalog items reference brands/clubs | Use available catalog for technical proof, flag before launch |
| Product copy/final photography unavailable | Medium | PDP proof can use placeholders, launch cannot | Do not block technical spike on final copy |
| Too much custom code accumulates during spike | High | Spike can become accidental platform build | Stop at proof path and document gaps |

## 14. Pass/Fail Criteria

### Pass

Medusa + Supabase can move to Phase 1 only if all are true:

- Medusa runs against Supabase Postgres without migration/runtime instability.
- 10 real TPL SKUs import correctly.
- Next.js storefront shell can render listing/PDP/cart/checkout.
- Customer can add a product to cart.
- Razorpay test payment succeeds and is verified server-side.
- Medusa creates a correct order with correct totals and line items.
- Airtable receives one idempotent mirrored order record.
- Shiprocket order/AWB path is either working or documented with high confidence from API access.
- GA4 `view_item`, `add_to_cart`, `begin_checkout`, and `purchase` events are visible in DebugView.
- Dan can view product/order state in Medusa admin without developer help.
- Tobi can state the remaining Phase 1 build with confidence and no hidden critical integration unknowns.

### Fail

Use Fynd for launch, or pause the open-source path, if any are true:

- Razorpay cannot be made reliable without risky payment-state hacks.
- Medusa order creation is unstable or produces incorrect totals.
- Airtable sync duplicates records or requires broad manual field editing.
- Shiprocket cannot support TPL's prepaid/COD/AWB requirements outside Fynd.
- Supabase/Postgres connection behavior is unstable under repeated checkout tests.
- Admin workflow is too technical for Dan's day-to-day operations.
- The spike requires building a large custom commerce layer around Medusa.
- Deployment/DevOps burden is clearly beyond TPL's launch capacity.

## 15. Day-By-Day Execution Plan

### Day 1: Access, Architecture Lock, Scaffold

- Confirm credentials/access for Supabase, Razorpay test, Airtable, Shiprocket, GA4.
- Choose package manager and Medusa version.
- Create spike workspace structure.
- Add `.env.example` files.
- Confirm selected 10 SKUs and image URLs.
- Decision gate: if Razorpay or Supabase access is unavailable, do not burn the whole spike window pretending.

Deliverable: runnable skeleton plan plus access checklist.

### Day 2: Medusa + Supabase Backend

- Scaffold Medusa backend.
- Connect to Supabase Postgres.
- Run migrations.
- Create admin user.
- Configure India region/currency.
- Validate admin access.

Deliverable: Medusa backend running on Supabase Postgres.

### Day 3: Product Import

- Create `data/spike-products-10-skus.csv`.
- Build/import seed script.
- Import products, variants, prices, images, inventory.
- Verify products in admin and API.

Deliverable: 10 real TPL SKUs in Medusa.

### Day 4: Next.js Storefront Shell

- Scaffold Next.js storefront.
- Connect to Medusa Store API.
- Build minimal product grid.
- Build PDP.
- Build cart page and add-to-cart action.

Deliverable: customer can browse a product and add to cart.

### Day 5: Checkout + Razorpay Test

- Implement minimal checkout customer/address flow.
- Create Razorpay test order/payment session.
- Open Razorpay checkout.
- Verify server-side signature.
- Complete Medusa order/payment flow.
- Test failed payment.

Deliverable: prepaid Razorpay test order creates a correct Medusa order.

### Day 6: Airtable Sync

- Confirm target Airtable base/table and field map.
- Create sync function/subscriber.
- Push Medusa order to Airtable.
- Add idempotency by Medusa order ID.
- Test retry without duplicate Airtable row.

Deliverable: one Medusa order mirrors into Airtable with correct ops fields.

### Day 7: Shiprocket Feasibility

- Authenticate with Shiprocket API or document blocker.
- Map Medusa order payload to Shiprocket order payload.
- Test pincode/serviceability if possible.
- Attempt order creation.
- Attempt AWB/label generation if safe.
- Document prepaid and COD requirements separately.

Deliverable: Shiprocket feasibility memo or working API proof.

### Day 8: GA4 + QA Pass

- Implement GA4 ecommerce events.
- Verify DebugView events.
- Run core QA on desktop and mobile viewport:
  - PDP
  - Cart
  - Checkout
  - Payment success
  - Payment failure
  - Order admin
  - Airtable sync
- Capture bugs and gaps.

Deliverable: event proof and QA notes.

### Day 9: Deployment Feasibility

- Decide deployment target for Medusa backend: Render, Fly.io, Railway, or AWS.
- Confirm env var strategy.
- Confirm webhook URLs for Razorpay.
- Confirm Vercel storefront feasibility.
- Optional: deploy staging if time/access allows.

Deliverable: deployment risk assessment, not necessarily production deployment.

### Day 10: Decision Memo

- Compile pass/fail evidence.
- List unresolved work with effort estimates.
- Compare against Fynd launch path.
- Make recommendation:
  - proceed with Medusa + Supabase,
  - fix specific blockers then decide,
  - or use Fynd for launch and revisit Medusa later.

Deliverable: final recommendation in the format below.

## 16. Final Recommendation Format

Use this format at the end of the spike:

```text
# Phase 0 Technical Spike Recommendation

Date:
Owner: Tobi
Recommendation: Proceed / Conditional Proceed / Do Not Proceed

## Executive Summary
[5-8 sentences. Be direct.]

## Evidence

| Area | Result | Notes |
|---|---|---|
| Medusa + Supabase | Pass/Fail/Partial | |
| 10 SKU import | Pass/Fail/Partial | |
| Storefront PDP/cart | Pass/Fail/Partial | |
| Razorpay checkout | Pass/Fail/Partial | |
| Medusa order creation | Pass/Fail/Partial | |
| Airtable sync | Pass/Fail/Partial | |
| Shiprocket | Pass/Fail/Partial | |
| GA4 events | Pass/Fail/Partial | |
| Admin usability | Pass/Fail/Partial | |
| Deployment feasibility | Pass/Fail/Partial | |

## Critical Risks
[Only risks that matter to launch.]

## Work Required Before Launch
[Concrete build items, estimated effort, owner.]

## Fynd Comparison
[Say plainly whether Fynd is safer for launch.]

## Decision
[One clear sentence.]
```

## Current Recommendation Before Build Starts

Run the spike, but do not stop the Fynd path yet.

Medusa + Supabase is strategically attractive for TPL because it preserves ownership of commerce workflows, data, and future custom experiences. It is also materially riskier for the first launch because TPL must own Razorpay, Shiprocket, Airtable sync, deployment, and admin training.

If Razorpay and Shiprocket are not convincingly proven by Day 7, Fynd should remain the launch platform. The open-source stack can be revisited after launch when TPL has revenue data, sharper ops requirements, and more room to absorb engineering complexity.
