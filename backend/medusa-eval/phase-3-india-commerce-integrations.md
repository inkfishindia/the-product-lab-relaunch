# Phase 3: India Commerce Integrations

<!-- last-updated: 2026-05-29 -->

## Objective

Make the platform usable in the Indian D2C context: Razorpay, COD, Shiprocket, WhatsApp, and analytics.

## Integrations

| Integration | Purpose | Priority |
|---|---|---|
| Razorpay | UPI, cards, wallets, refunds | Critical |
| COD logic | COD order path and minimum order rule | Critical |
| Shiprocket | AWB, labels, tracking, NDR/RTO | Critical |
| WhatsApp/SMS | Confirmation, COD verification, tracking updates | High |
| GA4/GTM | Funnel and ecommerce analytics | High |
| Meta Pixel | Paid/retargeting readiness | Medium |

## Razorpay Requirements

- Test mode payment
- Live mode payment
- UPI success
- Card success
- Failed payment
- Capture verification
- Refund flow
- Webhook signature verification
- Payment status update in Medusa

## COD Requirements

- COD minimum: Rs. 299
- COD disabled below threshold
- COD order clearly marked in Medusa
- COD order synced to Airtable
- WhatsApp confirmation sent before dispatch
- COD flag sent to Shiprocket

## Shiprocket Requirements

- Create shipment from Medusa order
- Customer address mapping
- Product/weight mapping
- COD/prepaid flag
- AWB generation
- Label generation
- Tracking status sync
- NDR/RTO status handling

## Analytics Events

Minimum GA4 ecommerce events:

- `view_item`
- `view_item_list`
- `add_to_cart`
- `view_cart`
- `begin_checkout`
- `add_payment_info`
- `purchase`
- `refund`
- `search`
- `share`

## Completion Criteria

- Payment success creates correct order.
- Payment failure does not create fulfillment order.
- Refund can be tested.
- COD order can be placed above threshold.
- Shiprocket receives correct order data.
- GA4 purchase event matches order value.

