# Phase 1: Commerce Foundation

<!-- last-updated: 2026-05-29 -->

## Objective

Set up the core commerce engine that will replace the legacy WooCommerce/Fynd decision path.

## Workstreams

| Workstream | Output |
|---|---|
| Medusa setup | Production-ready backend project |
| Supabase Postgres | Database configured with connection strategy |
| Product model | Products, variants, categories, collections |
| Pricing | INR pricing, discounts, bundles |
| Inventory | Sellable stock tracking |
| Admin | Medusa admin usable for product/order management |
| Import tools | Product import script from CSV/Airtable |
| Environments | Local, staging, production configs |

## Product Setup

Launch with 30-50 SKUs, not the full historical catalog.

Minimum product fields:

- SKU
- Product name
- Category
- Collection
- Variant
- Price
- Compare-at price if needed
- Inventory quantity
- Product image
- Short description
- Long description
- Status: draft/live/hidden
- Hero/support/filler classification

## Inventory Approach

Medusa owns sellable stock.

Airtable continues to track:

- Raw materials
- Packaging
- Production movement
- QC
- Purchase orders

Do not attempt full inventory unification before launch.

## Completion Criteria

- Backend deploys successfully.
- Admin login works.
- Products can be created/imported.
- Products appear in storefront API.
- Inventory decrements on successful order.
- Basic discounts/bundles are possible.

## Risks

| Risk | Mitigation |
|---|---|
| Product import gets messy | Start with 10 SKUs, then 30-50 |
| Admin is not comfortable | Document common tasks |
| Inventory model becomes too complex | Only track sellable stock in Medusa at launch |

