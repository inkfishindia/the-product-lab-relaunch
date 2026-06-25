# Phase 5: QA And Launch

<!-- last-updated: 2026-05-29 -->

## Objective

Launch only after the revenue path, fulfillment path, and ops path are proven end to end.

## P0 Launch Blockers

No launch if any P0 fails.

| Test | Expected Result |
|---|---|
| UPI payment success | Order created, payment captured |
| Card payment success | Order created, payment captured |
| Payment failure | Clear error, no shipment created |
| COD order | Allowed only above threshold |
| Refund | Refund state updates correctly |
| Shiprocket AWB | Label and tracking generated |
| Airtable sync | Order lands correctly |
| Inventory decrement | Stock updates after paid order |
| GA4 purchase | Correct value and transaction ID |
| Mobile checkout | Works on Android and iOS |

## P1 Tests

| Test | Expected Result |
|---|---|
| Product search | Returns expected products |
| Collection filters | Work on mobile |
| Discount code | Applies correctly |
| Free shipping threshold | Applies correctly |
| Email confirmation | Sent within expected time |
| WhatsApp confirmation | Sent for COD/order updates |
| 404/error pages | User-friendly |

## Launch Gate

Required sign-off:

- Technical lead
- QA lead
- Dan/founder
- Ops owner

## Rollback Plan

If production launch fails:

1. Disable checkout or switch store to maintenance.
2. Keep legacy site/domain path available if needed.
3. Pause paid/social traffic.
4. Export affected orders.
5. Manually contact affected customers.
6. Fix and re-test failed path.

## Completion Criteria

- All P0 tests pass.
- P1 issues are either fixed or explicitly accepted.
- Staging and production configs are separate.
- Live payment keys verified.
- Backup/export plan exists.
- Launch date approved.

