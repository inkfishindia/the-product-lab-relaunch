# Phase 0 Agent Handoff: Medusa + Supabase Technical Spike

<!-- last-updated: 2026-05-29 -->

## Role

You are acting as Tobi, Build Lead for The Product Lab.

Work like a senior full-stack commerce engineer running a 7-10 day technical spike. This is not a full production build. Your job is to prove or disprove whether TPL should move forward with a Medusa + Supabase/Postgres open-source commerce stack instead of Fynd.

## Read First

Read these before making changes:

1. `docs/medusa-supabase-platform/spike-execution-plan.md`
2. `docs/medusa-supabase-platform/README.md`
3. `docs/medusa-supabase-platform/01-platform-decision.md`
4. `docs/medusa-supabase-platform/02-target-architecture.md`
5. `docs/medusa-supabase-platform/03-data-ownership.md`
6. `docs/medusa-supabase-platform/phase-0-technical-spike.md`
7. `data/spike-products-10-skus.csv`
8. `integrations/airtable/order-field-map.md`
9. `integrations/shiprocket/feasibility-notes.md`
10. `artifacts/phase-4/product-catalog.md`

## Core Principle

Medusa owns commerce truth.
Supabase/Postgres owns system data.
Airtable remains the human ops cockpit.
Razorpay owns payment truth.
Shiprocket owns shipping truth.

Do not let Airtable, Supabase, and Medusa become competing sources of truth.

## Important Direction

Do not start with Razorpay or Shiprocket.

They are high-risk and launch-critical, but they come after the basic commerce spine is working. First prove that Medusa, Supabase, products, storefront, cart, checkout shell, order creation, Airtable sync, and GA4 readiness can stand up.

Razorpay and Shiprocket are the final validation gates, not the first implementation tasks.

## Build Sequence

### 1. Medusa Backend

Goal: Get Medusa running locally and connected to Supabase-hosted Postgres.

Tasks:

- Scaffold Medusa backend in `apps/medusa-backend`.
- Use `apps/medusa-backend/.env.example` as the env template.
- Connect `DATABASE_URL` to Supabase Postgres.
- Run migrations.
- Create admin user.
- Configure India/INR region.
- Confirm Medusa admin opens.

Pass condition:

- Medusa runs against Supabase Postgres and admin is usable.

### 2. Product Import

Goal: Import 10 real TPL SKUs.

Use:

- `data/spike-products-10-skus.csv`
- Source catalog: `artifacts/phase-4/product-catalog.md`

Tasks:

- Create/import seed script.
- Import products, variants, SKUs, prices, images, and basic inventory.
- Keep SKU stable.
- Do not include unresolved variant-pricing products unless Dan confirms.

Pass condition:

- 10 products appear in Medusa admin and can be fetched through the Store API.

### 3. Next.js Storefront Shell

Goal: Build the minimum storefront needed to prove customer flow.

Tasks:

- Scaffold Next.js storefront in `apps/storefront`.
- Use `apps/storefront/.env.example`.
- Connect to Medusa Store API.
- Build:
  - Product grid
  - PDP
  - Cart
  - Basic checkout shell

Do not polish UI yet. Use functional components first.

Pass condition:

- A customer can view a product and add it to cart.

### 4. Medusa Cart And Order Path

Goal: Prove Medusa can create the commerce record before adding Razorpay.

Tasks:

- Implement customer/address collection.
- Add shipping method.
- Use a temporary/manual/test payment method if needed.
- Complete a Medusa order.
- Verify order totals, line items, customer, and address.

Pass condition:

- Medusa creates a correct order from a storefront checkout path.

### 5. Airtable Sync

Goal: Mirror Medusa order into Airtable without making Airtable commerce truth.

Use:

- `integrations/airtable/order-field-map.md`

Tasks:

- Confirm target Airtable base/table with Dan/Ops.
- Create a minimal order sync from Medusa to Airtable.
- Use Medusa order ID as idempotency key.
- Sync only mirror fields plus ops-editable fields.
- Do not write Airtable changes back into Medusa during Phase 0.

Pass condition:

- One Medusa order creates one Airtable ops record.
- Re-running sync does not duplicate the Airtable record.

### 6. GA4 Readiness

Goal: Prove event implementation is ready before final payment/shipping validation.

Tasks:

- Implement basic GA4 helper.
- Fire:
  - `view_item`
  - `add_to_cart`
  - `view_cart`
  - `begin_checkout`
  - test `purchase` after order creation
- Verify in GA4 DebugView if measurement ID is available.

Pass condition:

- Core ecommerce events fire with SKU/item data.

### 7. Razorpay Integration

Goal: Replace temporary payment proof with Razorpay test checkout.

Tasks:

- Use maintained Medusa Razorpay provider if compatible.
- If not, build the thinnest custom proof:
  - Create Razorpay order server-side.
  - Open Razorpay checkout client-side.
  - Verify signature server-side.
  - Confirm payment via webhook or verification endpoint.
  - Mark/complete Medusa payment/order using supported Medusa workflow.
- Test success and failure paths.

Pass condition:

- Razorpay test payment succeeds.
- Razorpay dashboard shows captured payment.
- Medusa order has correct payment state.

Fail condition:

- Payment state requires fragile hacks or cannot be reconciled cleanly.

### 8. Shiprocket Feasibility

Goal: Prove Medusa order can be handed to Shiprocket without Fynd.

Use:

- `integrations/shiprocket/feasibility-notes.md`

Tasks:

- Authenticate with Shiprocket API.
- Map Medusa order to Shiprocket payload.
- Test pincode/serviceability if possible.
- Create Shiprocket order if API access allows.
- Attempt AWB/label generation if safe.
- Document COD requirements separately.

Pass condition:

- Shiprocket order/AWB path is working or proven with high confidence from API docs/access.

Fail condition:

- AWB, label generation, prepaid/COD flags, or order payload requirements are unclear by the end of the spike.

## Brutal Honesty Rules

Say Fynd is safer if:

- Razorpay cannot be integrated cleanly.
- Shiprocket requires too much custom work before launch.
- Airtable sync becomes fragile.
- Medusa admin is too technical for Dan.
- Supabase connection/runtime behavior is unstable.
- The spike starts turning into a custom commerce platform build.

Say Medusa + Supabase is viable only if:

- Medusa + Supabase runs cleanly.
- 10 SKUs import cleanly.
- Storefront PDP/cart/order path works.
- Airtable mirror is idempotent.
- GA4 events are ready.
- Razorpay and Shiprocket are proven after the commerce spine is up.

## What Not To Build

Do not build:

- Full branded storefront polish
- Production returns/refunds flow
- Full COD automation unless the prepaid path is already proven
- Artist dashboards
- B2B/offline order system
- Raw material inventory
- Full Supabase reporting layer
- Custom commerce logic in Supabase
- Airtable-to-Medusa writeback

## Final Output Expected

At the end of the spike, produce:

```text
# Phase 0 Technical Spike Recommendation

Recommendation: Proceed / Conditional Proceed / Do Not Proceed

## Evidence
- Medusa + Supabase:
- Product import:
- Storefront PDP/cart:
- Medusa order creation:
- Airtable sync:
- GA4 events:
- Razorpay:
- Shiprocket:
- Admin usability:
- Deployment feasibility:

## Critical Risks

## Work Required Before Launch

## Fynd Comparison

## Decision
```

The decision must be direct. If Fynd is safer for launch, say it clearly.
