# Airtable Order Sync Field Map

<!-- last-updated: 2026-05-29 -->

Spike rule: Medusa creates commerce truth. Airtable receives an ops mirror and must not edit financial truth.

## Proposed Fields

| Airtable field | Source | Editable in Airtable? | Notes |
|---|---|---:|---|
| Medusa Order ID | Medusa | No | Use as idempotency key. |
| Display Order Number | Medusa | No | Human-readable reference. |
| Created At | Medusa | No | ISO timestamp. |
| Customer Name | Medusa | No | PII; keep target table permissions tight. |
| Customer Email | Medusa | No | PII; mirror only if ops needs it. |
| Customer Phone | Medusa | No | Required for fulfillment/WhatsApp ops. |
| Shipping Address | Medusa | No | Full delivery address. |
| SKU List | Medusa | No | Comma-separated for spike only. |
| Line Items Summary | Medusa | No | Human-readable ops summary. |
| Quantity Total | Medusa | No | Derived from line items. |
| Order Total | Medusa | No | Financial mirror only. |
| Payment Method | Razorpay/Medusa | No | Prepaid/COD mirror. |
| Payment Status | Razorpay/Medusa | No | Mirror only; do not manually edit. |
| Razorpay Payment ID | Razorpay | No | Payment reconciliation reference. |
| Fulfillment Status | Medusa/Shiprocket | No | Mirror until shipping integration is proven. |
| Ops Status | Airtable | Yes | Production/packing workflow. |
| QC Status | Airtable | Yes | Internal ops only. |
| Internal Notes | Airtable | Yes | Human workflow notes. |

## Spike Validation

- Creating the same Medusa order twice must update or skip the existing Airtable record, not duplicate it.
- A failed payment must not create a ready-to-fulfill Airtable ops record.
- Airtable edits must not write back to Medusa during Phase 0.
