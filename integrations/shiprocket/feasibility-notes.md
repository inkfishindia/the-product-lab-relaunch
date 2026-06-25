# Shiprocket Feasibility Notes

<!-- last-updated: 2026-05-29 -->

Spike goal: prove whether Medusa can hand orders to Shiprocket without relying on Fynd.

## Required Proof

| Proof | Status | Notes |
|---|---|---|
| API authentication works | Not started | Requires Shiprocket credentials or token. |
| Pincode serviceability can be checked | Not started | Needed before COD confidence. |
| Prepaid order can be created | Not started | Map from Medusa paid order. |
| AWB can be generated | Not started | Best evidence for launch feasibility. |
| Label PDF can be generated/downloaded | Not started | Required for ops workflow. |
| COD order can be created with correct flag | Not started | Do not mark COD launch-ready until proven. |

## Medusa To Shiprocket Payload Fields

- Medusa order ID
- Customer name
- Customer email
- Customer phone
- Shipping address line 1
- Shipping address line 2
- City
- State
- Pincode
- SKU
- Product name
- Quantity
- Selling price
- Order total
- Payment method: prepaid or COD
- Package weight
- Package dimensions

## Initial Risk View

Fynd is likely safer for launch shipping because the existing operations docs assume Fynd-to-Shiprocket sync. Medusa should only replace that if this spike proves order creation, AWB generation, label access, and COD flags without brittle manual steps.
