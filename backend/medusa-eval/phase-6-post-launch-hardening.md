# Phase 6: Post-Launch Hardening

<!-- last-updated: 2026-05-29 -->

## Objective

Turn the launch stack into an operating system that can survive real orders, support issues, and growth.

## First 30 Days After Launch

Track:

- Sessions
- PDP views
- Add-to-cart rate
- Checkout start rate
- Purchase conversion
- Payment failure rate
- COD percentage
- RTO/NDR rate
- Average order value
- Top SKUs
- Refund/replacement cases
- Fulfillment SLA

## Hardening Workstreams

| Workstream | Output |
|---|---|
| Error logging | Central logs for payment, sync, shipping failures |
| Retry queues | Failed Airtable/Shiprocket sync retries |
| Admin dashboard | Daily view of orders, revenue, exceptions |
| Inventory reconciliation | Medusa stock vs Airtable production stock |
| Support workflow | WhatsApp/support macros and status taxonomy |
| Reporting | Daily dashboard for Dan |
| Backup/export | Product, order, customer export process |
| Documentation | Runbooks and vendor handoff docs |

## When To Add Supabase Beyond Medusa DB

Use Supabase for extra platform data only when needed:

- Integration logs
- Reporting tables
- Customer segmentation
- Artist/drop portal
- Partner dashboard
- Internal production app
- Event audit trail

Do not build these before the core D2C funnel works.

## Scale Triggers

| Trigger | Action |
|---|---|
| 100+ orders/month | Improve reporting and ops dashboard |
| 300+ orders/month | Add retry queues and fulfillment dashboard |
| 500+ orders/month | Revisit inventory architecture |
| Frequent manual exceptions | Build custom internal tools |
| Artist drops drive demand | Build artist/drop module |
| B2B online demand grows | Build B2B order portal separately |

## Completion Criteria

- Dan can see daily business health without manual digging.
- Failed integrations are visible and recoverable.
- Ops workflow is documented enough to train a hire.
- System ownership is clear.
- Roadmap is based on real launch data, not guesses.

