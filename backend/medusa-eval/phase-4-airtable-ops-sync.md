# Phase 4: Airtable Ops Sync

<!-- last-updated: 2026-05-29 -->

## Objective

Keep Airtable as the human operations cockpit while Medusa owns commerce truth.

## Direction

Start with one-way sync:

```text
Medusa order created
  -> Airtable ops record created
  -> Ops updates production/packing/QC in Airtable
```

Do not allow Airtable to overwrite payment totals, order totals, refund state, or customer account data.

## Airtable Order Record

Minimum fields:

- Medusa order ID
- Order date
- Customer name
- Customer phone
- Customer email
- Shipping address
- Payment method
- Payment status
- Order value
- Line items
- SKUs
- Fulfillment status
- Production status
- Packing status
- QC status
- Shiprocket AWB
- Courier name
- Tracking URL
- Internal notes
- Exception status

## Sync Rules

| Direction | Allowed Fields |
|---|---|
| Medusa -> Airtable | Order, customer, payment mirror, line items |
| Shiprocket -> Airtable | AWB, courier, tracking, NDR/RTO status |
| Airtable -> Medusa | Fulfillment note/status only if explicitly approved |
| Airtable -> Razorpay | Never |
| Airtable -> Order total | Never |

## Error Handling

Every sync should log:

- Source system
- Destination system
- Payload ID
- Success/failure status
- Error message
- Retry count
- Timestamp

## Completion Criteria

- New orders appear in Airtable within acceptable delay.
- Failed syncs are visible.
- Duplicate Airtable records are prevented.
- Ops can process an order without entering Medusa admin.
- Medusa remains the financial order record.

