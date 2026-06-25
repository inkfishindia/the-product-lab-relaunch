# Medusa + Supabase Platform Decision Package

<!-- last-updated: 2026-05-29 -->

This folder documents the proposed open-source commerce path for The Product Lab:

```text
Next.js storefront
  -> Medusa commerce backend
  -> Supabase-hosted Postgres
  -> Razorpay, Shiprocket, Airtable, WhatsApp, GA4
```

The goal is not to build technology for its own sake. The goal is to own the parts of the business that matter: opinion-led merchandising, custom D2C workflows, artist/drop mechanics, B2B/order ops, and long-term data control.

## Current Recommendation

Run a 7-10 day spike before fully abandoning Fynd.

If the spike proves checkout, order creation, Airtable sync, and Shiprocket flow, Medusa + Supabase becomes the long-term platform. If the spike fails, the team should either fix the specific blocker or fall back to Fynd for the first launch.

## Document Map

| Document | Purpose |
|---|---|
| [01-platform-decision.md](01-platform-decision.md) | CTO-level decision rationale and trade-offs |
| [02-target-architecture.md](02-target-architecture.md) | System architecture, components, and integration flow |
| [03-data-ownership.md](03-data-ownership.md) | Source-of-truth rules for Medusa, Supabase, and Airtable |
| [phase-0-technical-spike.md](phase-0-technical-spike.md) | 7-10 day proof-of-concept scope and pass/fail criteria |
| [phase-1-commerce-foundation.md](phase-1-commerce-foundation.md) | Core Medusa commerce setup |
| [phase-2-storefront-mvp.md](phase-2-storefront-mvp.md) | Launch storefront scope |
| [phase-3-india-commerce-integrations.md](phase-3-india-commerce-integrations.md) | Razorpay, Shiprocket, COD, WhatsApp, analytics |
| [phase-4-airtable-ops-sync.md](phase-4-airtable-ops-sync.md) | Airtable operational sync and workflow boundaries |
| [phase-5-qa-launch.md](phase-5-qa-launch.md) | Launch gate, P0/P1 QA, go-live criteria |
| [phase-6-post-launch-hardening.md](phase-6-post-launch-hardening.md) | Reliability, reporting, automation, and scale cleanup |

## Non-Negotiable Principle

Commerce creates financial truth. Airtable operates the order. Supabase stores system truth. Do not let three systems become competing databases for the same field.

