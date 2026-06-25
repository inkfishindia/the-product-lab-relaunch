# Platform Decision: Medusa + Supabase/Postgres

<!-- last-updated: 2026-05-29 -->

## Decision

TPL will evaluate **Medusa + Supabase-hosted Postgres** as the ownership-first alternative to Fynd.

This is not a decision to build a fully custom commerce stack from scratch. Medusa provides the commerce engine. Supabase provides hosted Postgres and system infrastructure. Airtable remains the human operations cockpit during the transition.

## Why This Path Exists

Fynd is faster, but it creates platform dependency. Medusa + Supabase creates ownership and flexibility, especially for workflows that are specific to TPL:

- Opinion-led merchandising
- Drops
- Artist attribution
- Custom bundles
- COD rules
- B2B/offline order extensions
- Production and fulfillment workflows
- Airtable/Supabase reporting
- Future partner or artist dashboards

## Recommendation

Do not commit blindly. Run a 7-10 day spike.

| If the spike proves... | Decision |
|---|---|
| Razorpay checkout works | Continue |
| Orders land correctly in Medusa | Continue |
| Orders sync to Airtable | Continue |
| Shiprocket flow is feasible | Continue |
| Admin is manageable for Dan | Continue |
| Any critical item fails | Reassess or use Fynd for first launch |

## Why Not Fully Custom

Fully custom commerce would require owning cart logic, checkout state, payment failure handling, refunds, shipping labels, order status, tax logic, admin permissions, inventory decrementing, analytics events, security, and uptime.

That is not where TPL should spend its first engineering energy.

## Why Not Airtable Only

Airtable is excellent for human operations. It is not a reliable transactional backend for commerce. It should not own payment truth, checkout state, order totals, inventory reservations, or customer account logic.

## Why Not Supabase Only

Supabase is a database and backend platform, not a commerce engine. Building commerce directly on Supabase would still require building most of what Medusa already provides.

## Decision Summary

| Layer | Tool | Reason |
|---|---|---|
| Storefront | Next.js | Flexible customer-facing UX |
| Commerce backend | Medusa | Open-source commerce engine |
| Database | Supabase Postgres | Managed Postgres with future platform capabilities |
| Ops cockpit | Airtable | Human-readable operations workflow |
| Payments | Razorpay | India payment standard |
| Shipping | Shiprocket | India D2C shipping/COD workflow |
| Reporting | GA4 + Supabase/Looker | Behavioral and operational reporting |

## Devil's Advocate

This path is only right if TPL accepts engineering ownership. If Dan wants the lowest operational burden and fastest possible launch, Fynd is safer. If TPL wants long-term platform control, Medusa + Supabase is the stronger foundation.

