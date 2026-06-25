# TPL Production Costs — Actual Data

<!-- last-updated: 2026-03-20 -->

Source: Handoff document 03-TPL-PRODUCTS-PRICING-PRODUCTION.md

## Materials

| Material | Sheet Size | Cost/sq ft |
|----------|-----------|------------|
| Acrylic (3mm) | 8×4 ft | ₹90 |
| Birch | 5×5 ft | ₹43 |
| MDF | 8×4 ft | ₹30 |

## Print Options

| Method | Format | Cost/sheet |
|--------|--------|-----------|
| Digital Print (acrylic only) | A4 | ₹150 |
| Digital Print (acrylic only) | A3 | ₹250 |
| UV Print (all materials) | A4 | ₹200 |
| UV Print (all materials) | A3 | ₹350 |

## Attachments

| Type | Cost/piece |
|------|-----------|
| Rubber pin back | ₹6 |
| Magnetic pin back | ₹15 |
| Keychain ring | ₹2.5 |
| Fridge magnet | ₹4 |

## Packaging (MOQ 100 pcs)

| Type | Cost/piece |
|------|-----------|
| Plain card | ₹5 |
| Printed card | ₹8 |
| Die-cut card | ₹11 |

## Labor

₹3/piece base (₹1 per process step: base, print, attachment)

## Unit Cost Formula

```
Unit Cost = Material Cost + (Print Cost ÷ pieces per sheet) + Attachment + Packaging + Labor

Where:
  Material Cost = (size_inches² ÷ 144) × material_rate × wastage_factor
  Pieces per Sheet = floor(sheet_width_mm ÷ (product_width_mm + 6mm)) × floor(sheet_height_mm ÷ (product_height_mm + 6mm))
  Bleed = 3mm per side = 6mm total
```

## Example: 1"×1" Lapel Pin (Acrylic, UV A4, Rubber Back, Plain Card)

```
Cutting size: 31.4mm × 31.4mm
Pieces per A4: 6 × 9 = 54 pieces
Material: (1/144) × 90 = ₹0.625
Print: 200/54 = ₹3.70
Attachment: ₹6
Packaging: ₹5
Labor: ₹3
UNIT COST: ≈₹18.33
```

## Comparison: Handoff Actuals vs Patrick's Phase 1 Estimates

| Product | Handoff COGS | Patrick Estimate | Delta |
|---------|-------------|-----------------|-------|
| Lapel pin | ₹18.33 | ₹15-30 | Within range ✓ |
| Keychain | ~₹20-30 (varies) | ₹20-40 | Within range ✓ |
| Card sticker | ~₹8-12 | ₹5-12 | Within range ✓ |

**Conclusion:** Patrick's estimates were reasonable. Actual costs from the handoff can now be used for precise margin calculations in Phase 2 pricing work.
