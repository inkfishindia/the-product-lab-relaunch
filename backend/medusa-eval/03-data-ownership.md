# Data Ownership Strategy

<!-- last-updated: 2026-05-29 -->

## Principle

Every important field must have one source of truth. Other systems may mirror that field, but they should not compete to update it.

## Source Of Truth Map

| Data Type | Source Of Truth | Mirrors / Consumers | Notes |
|---|---|---|---|
| Product ID | Medusa | Airtable, GA4 | SKU must remain stable |
| Product title | Medusa | Storefront, Airtable | Airtable can hold ops notes, not master title |
| Product copy | Medusa | Storefront | Approved copy imported from relaunch docs |
| Product images | Medusa/S3/Supabase Storage | Storefront | Keep original assets organized outside CMS too |
| Product cost | Airtable | Reporting | Do not expose to storefront |
| Retail price | Medusa | Airtable, GA4 | Medusa owns sellable price |
| Inventory available to sell | Medusa | Storefront, Airtable | Airtable can track raw/production stock |
| Raw materials inventory | Airtable | Reporting | Not needed in Medusa at launch |
| Cart | Medusa | Storefront | Never in Airtable |
| Order | Medusa | Airtable, reporting | Medusa is financial order record |
| Payment status | Razorpay | Medusa, Airtable | Razorpay webhook updates Medusa |
| Refund status | Razorpay | Medusa, Airtable | Must be auditable |
| Shipment | Shiprocket | Medusa, Airtable | Shiprocket owns AWB/tracking truth |
| Production status | Airtable | Medusa optional | Human workflow status |
| QC status | Airtable | Medusa optional | Internal ops only |
| Customer profile | Medusa/CRM | Airtable support view | Avoid scattering PII |
| Support notes | Airtable or CRM | Reporting | Choose one later |
| Analytics events | GA4/GTM | Supabase/reporting | GA4 for behavior, not ops truth |

## Airtable Rules

Airtable should be used for:

- Production status
- Packing status
- QC status
- Internal notes
- Exception handling
- B2B/offline workflows
- Purchase orders and supplier tracking
- Human dashboards

Airtable should not own:

- Payment status
- Order total
- Tax/shipping charges
- Refund truth
- Customer account auth
- Cart state
- Checkout state

## Supabase Rules

Supabase should be used for:

- Medusa Postgres database
- Future reporting tables
- Integration logs
- Retry/error logs
- Future custom dashboards
- Future partner/artist portal data

Supabase should not become:

- A replacement for Medusa commerce logic
- A spreadsheet UI for ops
- A place where non-technical users manually edit commerce state

## Migration Stance

Do not migrate all Airtable data into Supabase on day one.

Start with:

1. Product import into Medusa.
2. Medusa order sync into Airtable.
3. Airtable remains ops cockpit.
4. Supabase reporting layer is added after launch data exists.

