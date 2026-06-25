# Target Architecture

<!-- last-updated: 2026-05-29 -->

## High-Level System

```text
Customer
  |
  v
Next.js Storefront
  |
  v
Medusa Backend
  |
  v
Supabase Postgres
  |
  +--> Razorpay
  +--> Shiprocket
  +--> Airtable
  +--> WhatsApp/SMS/Email
  +--> GA4/GTM/Meta Pixel
```

## Component Responsibilities

| Component | Responsibility | Must Not Own |
|---|---|---|
| Next.js storefront | Homepage, collections, PDP, cart UI, checkout UI, account UI | Payment truth, order truth |
| Medusa backend | Products, variants, carts, orders, pricing, discounts, inventory, customers | Production workflow details |
| Supabase Postgres | Medusa database and future system data layer | Ad hoc ops workflow UI |
| Airtable | Ops workflow, production stages, packing, QC, exceptions | Financial truth, payment status |
| Razorpay | Payment authorization, capture, refunds, webhooks | Order lifecycle beyond payment |
| Shiprocket | AWB, labels, courier tracking, COD/NDR data | Product/order master data |
| WhatsApp/SMS/Email | Customer communication | System-of-record data |
| GA4/GTM | Funnel and marketing analytics | Operational reporting truth |

## Initial Deployment Model

| Service | Deployment |
|---|---|
| Next.js | Vercel |
| Medusa backend | Render, Fly.io, Railway, or AWS |
| Postgres | Supabase hosted Postgres |
| File storage | Supabase Storage or S3-compatible storage |
| Background jobs | Medusa workers first; external queue later if needed |

## Key Flows

### Purchase Flow

```text
Customer adds item to cart
  -> Medusa creates cart
  -> Customer checks out
  -> Razorpay payment attempt
  -> Razorpay webhook confirms payment
  -> Medusa creates/updates order
  -> Order sync worker creates Airtable ops record
  -> Shiprocket worker creates shipment when order is ready
```

### COD Flow

```text
Customer selects COD
  -> Medusa validates COD minimum and serviceability rules
  -> Order is created with COD payment status
  -> WhatsApp confirmation is sent
  -> Shiprocket order is created with COD flag
  -> NDR/RTO updates sync back from Shiprocket
```

### Ops Flow

```text
Medusa order
  -> Airtable ops record
  -> Production/Packing/QC statuses updated in Airtable
  -> Fulfillment status updates in Medusa when shipped
  -> Customer receives tracking updates
```

## Architecture Rules

1. Medusa owns commerce truth.
2. Razorpay owns payment truth.
3. Shiprocket owns shipping truth.
4. Airtable owns human ops workflow.
5. Supabase/Postgres owns system data.
6. Notion owns strategy/docs, not operational truth.

