# Phase 0: Technical Spike

<!-- last-updated: 2026-05-29 -->

## Objective

Prove that Medusa + Supabase can support TPL's first D2C relaunch before committing to it as the production platform.

Duration: 7-10 days.

## Scope

Build the thinnest working commerce path:

1. Medusa backend connected to Supabase Postgres
2. Next.js storefront shell
3. 10 real TPL SKUs
4. PDP
5. Cart
6. Checkout
7. Razorpay test payment
8. Order creation in Medusa
9. Airtable order sync
10. Shiprocket flow validated or mocked with documented API path
11. GA4 basic events

## Inputs Needed

| Input | Owner |
|---|---|
| Supabase project | Dan/CTO |
| Razorpay test credentials | Dan |
| Airtable API access | Dan |
| Shiprocket API access or docs/account | Dan |
| 10 approved SKUs | Dan/Catalog |
| Product images and prices | Dan/Catalog |

## Pass Criteria

| Test | Pass Condition |
|---|---|
| Database | Medusa runs against Supabase Postgres |
| Products | 10 SKUs import cleanly |
| PDP/cart | Customer can add item to cart |
| Payment | Razorpay test payment succeeds |
| Order | Medusa creates order with correct totals |
| Airtable | Order appears in Airtable with key fields |
| Shipping | Shiprocket AWB path is proven or clearly feasible |
| Analytics | View item, add to cart, checkout, purchase events fire |
| Admin | Dan can view order and product state |

## Fail Criteria

Any of these blocks the move to Phase 1:

- Razorpay cannot be integrated cleanly.
- Order creation is unstable.
- Airtable sync is brittle or unclear.
- Shiprocket integration cannot support COD/AWB requirements.
- Admin workflow is too technical for day-to-day use.
- Deployment requires a level of DevOps ownership TPL cannot maintain.

## Decision At End

| Outcome | Action |
|---|---|
| Spike passes | Proceed with Medusa + Supabase build |
| Spike partially passes | Fix blocker or reduce scope |
| Spike fails | Use Fynd for launch, revisit custom later |

