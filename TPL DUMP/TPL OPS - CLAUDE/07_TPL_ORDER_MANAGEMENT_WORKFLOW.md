# THE PRODUCT LAB — ORDER MANAGEMENT WORKFLOW (10-STAGE LIFECYCLE)

---

## WORKFLOW PHILOSOPHY

**Core Principle:** Human decisions trigger smart digital cascades. The system assists and accelerates — it does not replace human judgment and quality control.

**Key Innovation:** Physical actions (file uploads, checkbox ticks, QR scans) automatically cascade status updates, notifications, and next-action prompts across the entire system.

---

## 10-STAGE ORDER LIFECYCLE

```
STAGE 1: Order Confirmation → Design Initiation
STAGE 2: Manager Approval & Routing
STAGE 3: Materials Allocation (Bin Creation)
STAGE 4: Factory Coordination
STAGE 5: Assembly
STAGE 6: Quality Control
STAGE 7: Packing
STAGE 8: Order Completion Verification
STAGE 9: Shipping & Dispatch
STAGE 10: Delivery & Feedback
```

---

## STAGE 1: ORDER CONFIRMATION → DESIGN INITIATION

**Trigger:** Order status changed to "Confirmed" (Manual by Dan/Manager)

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Design Team | Upload mock design files | `fldfg582PyUr3F9OD` (Mock up — Attachment) |
| Design Team | Upload print-ready files | `fldQ26a4i91fWdZ4s` (Print file — Attachment) |
| Design Team | Update design status | `fldneNjwxNT9pnVzO` (DESIGN_STATUS → "Ready for Approval") |

### Smart Automation Cascade
When Design Team uploads files:
- ✅ `DESIGN_STATUS_AUTO` (`fldwW5HXaIxOaL8R5`) auto-detects file presence → sets "DESIGN_COMPLETE"
- ✅ Auto-notify Manager: "Order [ID] designs ready for review"
- ✅ Auto-generate design approval checklist
- ✅ Auto-calculate design completion time vs target
- ✅ Auto-update customer: "Design phase complete, awaiting approval"

### Formula: APPROVAL_READY_INDICATOR
```
IF(AND({Mock up} != "", {Print file} != ""), "🟢 READY", "🔴 PENDING")
```

---

## STAGE 2: MANAGER APPROVAL & ROUTING

**Trigger:** Design files marked ready

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Dan (Manager) | Review mock and print files | Visual review |
| Dan | Get client approval (external communication) | External |
| Dan | Update approval status | `fldLKivCDf2gdf40V` (CLIENT_APPROVAL_STATUS → "Approved") |
| Dan | Assign factory routing | `fldp9957OBVdUi1Rt` (TPL Factory Production 1) |
| Dan | Set production method and timeline | Various fields |

### Smart Automation Cascade
When Client Approval = "Approved":
- ✅ Auto-trigger bin creation sequence
- ✅ Auto-generate material allocation checklist based on product type
- ✅ Auto-calculate factory timeline based on assigned factory's standard lead time
- ✅ Auto-notify ops team: "Order [ID] approved, ready for materials"
- ✅ Auto-update customer: "Your order has been approved and is entering production"

---

## STAGE 3: MATERIALS ALLOCATION (BIN CREATION)

**Trigger:** Client approval confirmed + factory routing set

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Dan (Manager) | Create physical bin, label with BIN_CODE | Physical action |
| Kalpana | Take bin from CREATION_STATION to MATERIALS_INVENTORY | QR scan |
| Kalpana | Add materials per auto-generated checklist | Physical action |
| Kalpana | Mark materials allocated | `fldRQeYOG47D47BqD` (MATERIALS_ALLOCATED — Checkbox) |
| Kalpana | Move bin to FACTORY_PICKUP | QR scan |

### Smart Automation Cascade
When MATERIALS_ALLOCATED checkbox = TRUE:
- ✅ `MATERIAL_ALLOCATION_DATE` (`fldRCBv0WvTvWrtjX`) auto-populates with timestamp
- ✅ Auto-deduct quantities from inventory
- ✅ Auto-update bin status to "MATERIALS_READY"
- ✅ Auto-notify Manager: "Bin [CODE] ready for factory pickup"
- ✅ Auto-generate factory pickup schedule
- ✅ Auto-update line item status to "MATERIALS_ALLOCATED"

### BIN_CODE Format
```
TPL-[Order#]-[LineItem#]-[ProductCode]
Examples:
- TPL-412-01-KC (Order 412, Line 1, Keychain)
- TPL-412-02-FM (Order 412, Line 2, Fridge Magnet)
- TPL-413-01-TS (Order 413, Line 1, T-Shirt)
```

---

## STAGE 4: FACTORY COORDINATION

**Trigger:** Materials allocated, bin at FACTORY_PICKUP

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Dan/Sara | Coordinate factory pickup schedule | `FACTORY_PICKUP_SCHEDULED` |
| Dan/Sara | Send bin to factory | QR scan: "Sent to factory [Name]" |
| Dan/Sara | Confirm factory receipt | `fldd5uDWxaAxcwTpR` (FACTORY_RECEIVED — Checkbox) |
| Dan/Sara | Note when production starts | `fldkzczXdUrE3sB8h` (FACTORY_TIMELINE_START) |

### Smart Automation Cascade
When QR scanned "Sent to Factory":
- ✅ Auto-start factory production timeline
- ✅ Auto-update bin location to "AT_FACTORY"
- ✅ Auto-calculate expected completion date based on factory lead times
- ✅ Auto-set factory follow-up reminders
- ✅ Auto-update customer: "Production started at [Factory]"

### Factory Lead Times (Confirmed by Dan)
| Factory | Code | Lead Time |
|---------|------|-----------|
| Ink Fish (In-house) | IF | 1 day (assembly) |
| Arun CADD | AC | 1 day (laser) |
| Your Design | YD | 2 days (apparel) |
| Om Digital | OD | 1 day print + 1 day finishing |

---

## STAGE 5: ASSEMBLY

**Trigger:** Factory returns completed items

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Sara/Anthony | Receive factory return, verify quantities | QR scan: "Factory delivery received" |
| Sara/Anthony | Sort factory returns into client/product bins | Physical sorting |
| Sara/Anthony | Assemble per product-specific assembly cards | Physical assembly |
| Sara/Anthony | Mark assembly complete | `fldm8fmyME6HHgJY0` (ASSEMBLY_COMPLETE — Checkbox) |

### Smart Automation Cascade
When ASSEMBLY_COMPLETE = TRUE:
- ✅ Auto-change item status to "ASSEMBLY_COMPLETE"
- ✅ Auto-update bin location to "QC_CHECKPOINT"
- ✅ Auto-notify Manager/Sara: "Order ready for QC inspection"
- ✅ Auto-generate QC checklist based on product type
- ✅ Auto-calculate assembly duration vs target

---

## STAGE 6: QUALITY CONTROL

**Trigger:** Assembly marked complete

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Dan/Sara | Inspect against quality standards | Visual + physical inspection |
| Dan/Sara | Record passed quantity | `fldGMRDKXcG709d7R` (QC_QUANTITY_PASSED) |
| Dan/Sara | Record failed quantity | `fldVA6JI9M0srGZma` (QC_QUANTITY_FAILED) |
| Dan/Sara | Update QC status | `fldTAUlY4PCr8dPAF` (QC_STATUS_ENHANCED) |

### Smart Automation Cascade
When QC_STATUS = "PASS":
- ✅ Auto-change item status to "QC_COMPLETE"
- ✅ Auto-move bin location to "PACKING_STATION"
- ✅ Auto-notify Kalpana: "Order ready for packing"
- ✅ Auto-generate packing checklist
- ✅ Auto-prioritize by shipping deadlines

When QC_STATUS = "FAIL":
- ✅ Auto-create rework task
- ✅ Auto-reassign to assembly
- ✅ Auto-notify Manager of quality issue
- ✅ Auto-update timeline

---

## STAGE 7: PACKING

**Trigger:** QC passed

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Kalpana | Pack per product-specific packing standards | Physical packing |
| Kalpana | Apply appropriate protection materials | Per product spec |
| Kalpana | Mark packing complete | PACKING_COMPLETE checkbox |
| Kalpana | Move to SHIPPING_READY | QR scan |

### Smart Automation Cascade
When PACKING_COMPLETE = TRUE:
- ✅ Auto-advance to shipping preparation
- ✅ Auto-notify Muskan: "Package ready for dispatch"
- ✅ Auto-generate shipping labels
- ✅ Auto-update customer: "Your order is packed and ready to ship"

---

## STAGE 8: ORDER COMPLETION VERIFICATION

**Trigger:** All line items packed

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Dan (Manager) | Verify all items packed | `fld9oib3BNkOTOfSD` (ORDER_READY_FOR_SHIPPING — Checkbox) |
| Dan | Confirm final order value | `fldCem6dr61PPUuKz` (FINAL_ORDER_VALUE_CONFIRMED) |

### Formula: ALL_ITEMS_PACKED_CHECK
```
Rollup: Check if ALL line items have PACKING_COMPLETE = TRUE
```

### Formula: ORDER_COMPLETION_PERCENTAGE
```
COUNT(Packed_line_items) / COUNT(Total_line_items) * 100
```

---

## STAGE 9: SHIPPING & DISPATCH

**Trigger:** Order marked ready for shipping

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Muskan | Prepare final shipping package | Physical |
| Muskan | Book parcel with courier | `fldvs7GXEClnJXCr0` (PARCEL_BOOKED — Checkbox) |
| Muskan | Enter tracking number | `fldS8bPsUEnFjTojg` (Shipping ID) |
| Muskan | Select shipping method | Dispatch method field |

### Smart Automation Cascade
When PARCEL_BOOKED = TRUE:
- ✅ `SHIPPING_DATE_ENHANCED` (`fldCf5wcOMrx1M7fC`) auto-populates
- ✅ Auto-update order status to "SHIPPED"
- ✅ Auto-send tracking information to customer
- ✅ Auto-calculate shipping costs
- ✅ Auto-generate delivery timeline estimate
- ✅ Auto-set delivery follow-up reminders

### Shipping Methods Available
- BlueDart
- Delhivery
- FedEx
- India Post
- Pickup

---

## STAGE 10: DELIVERY & FEEDBACK

**Trigger:** Delivery confirmed by courier/customer

### Human Actions
| Who | Action | Field Updated |
|-----|--------|---------------|
| Dan (Manager) | Monitor delivery status | Tracking system |
| Dan | Confirm delivery | `fldhslcD7vEoLKWTe` (Delivery confirmation time) |
| Dan | Contact customer for feedback | External |
| Dan | Record feedback | `fldepvyu3x3JDQbHR` (CUSTOMER_FEEDBACK) |
| Dan | Rate satisfaction | `fldDK2gJ5utkqkHYs` (CUSTOMER_SATISFACTION_RATING — 1-5 stars) |

### Smart Automation Cascade
When Order marked "COMPLETED":
- ✅ Auto-calculate total order completion time (TOTAL_ORDER_DURATION formula)
- ✅ Auto-generate order performance report
- ✅ Auto-update customer satisfaction metrics
- ✅ Auto-archive all order bins
- ✅ Auto-generate final invoice and profit analysis
- ✅ Auto-create reorder opportunity if applicable

### Formula: TOTAL_ORDER_DURATION
```
ORDER_COMPLETION_TIME - Created date
```

### Formula: ORDER_PERFORMANCE_SCORE
```
Weighted score: on-time delivery + quality + customer satisfaction + efficiency
```

---

## ORDER STATUS PROGRESSION MAP

```
Lead → Processing → Confirmed → In-Production → Assembly → QC → Packed → Shipped → Delivered → Completed
                                                                                              ↗
                                                                           Cancelled ←── (any stage)
                                                                           Escalated ←── (any stage)
```

### Status Field Options (`fldTnuKO3MMforu0E`)
- Lead
- Processing
- Confirmed
- In-Production
- Assembly
- QC
- Packed
- Shipped
- Delivered
- Completed
- Cancelled
- Escalated

---

## SMART VALIDATION RULES (ERROR PREVENTION)

| Rule | Logic | Purpose |
|------|-------|---------|
| No status jumping | Cannot advance stages without completing prerequisites | Prevent workflow shortcuts |
| Inventory protection | Cannot allocate materials that don't exist | Prevent phantom allocation |
| Timeline conflict prevention | Auto-alerts when deadlines conflict with capacity | Realistic delivery promises |
| Quality gate enforcement | Cannot proceed to packing without QC pass | Maintain quality standards |
| Cost variance protection | Alerts when costs exceed budget by 10% | Financial control |

---

## ESCALATION & CANCELLATION TRACKING

**Table:** Cancellation & escalations - overview (`tblZ9Xt38WQTn0ohK`)

| Field Name | Field ID | Type |
|------------|----------|------|
| Name | `fldNeOjEP0trcMdJx` | Text |
| Tag | `fldo6ALuGWQbfflv9` | Select |
| Applicable Levels (Tags) | `fldRjvOyWq6IFTUUh` | Multi-select |
| Offline orders | `fldwuR1LjMYHZGzne` | Link |
| orders Product line item | `fldklvP9f6GUd13qs` | Link |

### Views Available
- Overview
- Cancellation (Client Level / Order Level / Product Level)
- Escalation (Client Level / Order Level / Product Level / Production Level)
