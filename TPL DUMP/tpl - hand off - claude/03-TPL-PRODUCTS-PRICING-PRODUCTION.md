# THE PRODUCT LAB — PRODUCTS, PRICING & PRODUCTION

## Product Categories

### 1. Accessories
| Product | Price Range | SKU Pattern |
|---|---|---|
| Keychains (single-sided) | ₹149 | IF-SSKC-XXXXX |
| Keychains (double-sided) | ₹199 | IF-DSKC-XXXX |
| Lapel Pins (butterfly back) | ₹149 | IF-LP-XXXX |
| Lapel Pins (magnetic back) | ₹149 | IF-LP-XXXXM |
| Fridge Magnets | ₹199-₹249 | IF-FM-XXXX |
| Card Stickers | ₹109-₹149 | — |
| Luggage Tags | — | — |
| Earrings | — | — |

### 2. Fashion & Lifestyle
| Product | Price Range |
|---|---|
| T-shirts | ₹999-₹1,499 |
| Hoodies | ₹999-₹1,499 |
| Caps | ₹629 AOV |
| Totes/Bags | ₹399-₹699 |
| Polos | — |
| Jackets | — |

### 3. Stationery
| Product | Price Range |
|---|---|
| Stickers | — |
| Laptop Stickers | — |
| Custom Notebooks (wood covers) | — |
| Pop-up 3D Stickers | — |

### 4. Home & Decor
| Product | Price Range |
|---|---|
| Wooden Coasters | — |
| Enamel Mugs | — |
| Wooden Clocks | — |
| Plaques/Frames | — |

### 5. Services / B2B
| Product | Price Range |
|---|---|
| PR Kits | ₹808 AOV |
| Employee Welcome Kits | MOQ-based |
| Corporate Gifting | ₹10-25K per project |
| Custom Brand Merchandise | ₹20-75K per project |
| Event Merchandise | Quote-based |

---

## Product Architecture: 3-Level Database Structure

```
Design: "Always tired"
├── Keychain
│   ├── Single-sided (₹149) → IF-SSKC-10001
│   └── Double-sided (₹199) → IF-DSKC-0003
├── Lapel Pin
│   ├── Butterfly pin (₹149) → IF-LP-0001
│   └── Magnetic pin (₹149) → IF-LP-0001M
└── Magnet
    └── Standard (₹225) → IF-FM-0045
```

**Level 1**: Design Library (core creative assets — artist attribution, files, themes)
**Level 2**: Design-Product Combinations (which designs go on which product types)
**Level 3**: Design-Product Variations (WooCommerce Simple Products with specific SKU, price, stock)

> **Decision**: WooCommerce Simple Products (not Variable Products) — each design-product-variation = one WooCommerce product. Better for JIT inventory, artist commissions, SEO, and scaling.

---

## Pricing Strategy

### Retail Pricing Tiers
| Tier | Price Range | Description |
|---|---|---|
| Essential | ₹299-₹499 | Text-only personalization, basic materials |
| Premium | ₹599-₹899 | Photo integration, premium materials, gift packaging |
| Luxury | ₹999-₹1,499 | Full custom design, artisanal materials, express delivery |

### B2B Pricing Tiers
| Tier | MOQ | Description |
|---|---|---|
| White Label Basic | 50-100 pcs | Pre-existing designs + company logo, 7-14 day turnaround |
| Brand Partnership Pro | 200-500 pcs | Co-designed products, custom packaging |
| Enterprise Custom | 500+ pcs | Fully bespoke, dedicated account management |

### Channel-Specific
- B2B accessories: 60% of retail price
- Custom add-ons: 10-20% premium
- Bundle pricing: 15-22% savings highlighted
- Festival premiums: 10-15% during peak seasons
- Volume discounts: 10-25% for bulk orders

---

## Dynamic Pricing Calculator (Configurable Products)

### Materials
| Material | Sheet Size | Cost/sq ft |
|---|---|---|
| Acrylic (3mm) | 8x4 ft | ₹90 |
| Birch | 5x5 ft | ₹43 |
| MDF | 8x4 ft | ₹30 |

### Print Options
| Method | Format | Cost |
|---|---|---|
| Digital Print (acrylic only) | A4 | ₹150 |
| Digital Print (acrylic only) | A3 | ₹250 |
| UV Print (all materials) | A4 | ₹200 |
| UV Print (all materials) | A3 | ₹350 |

### Attachment Costs
| Attachment | Cost/piece |
|---|---|
| Rubber pin back | ₹6 |
| Magnetic pin back | ₹15 |
| Keychain ring | ₹2.5 |
| Fridge magnet | ₹4 |

### Packaging Costs (MOQ 100 pcs)
| Type | Cost/piece |
|---|---|
| Plain card | ₹5 |
| Printed card | ₹8 |
| Die-cut card | ₹11 |

### Labor: ₹3/piece base (₹1 per process step: base, print, attachment)

### Per Unit Cost Formula
```
Unit Cost = Material Cost + (Print Cost ÷ pieces per sheet) + Attachment + Packaging + Labor

Where:
  Material Cost = (size_inches² ÷ 144) × material_rate × wastage_factor
  Pieces per Sheet = floor(sheet_width_mm ÷ (product_width_mm + 6mm)) × floor(sheet_height_mm ÷ (product_height_mm + 6mm))
  Bleed = 3mm per side = 6mm total added to each dimension
  Wastage = (Sheet Area - (Pieces × Cutting Size)) ÷ Sheet Area
```

### Example: 1"×1" Lapel Pin on Acrylic, UV A4, Rubber Back, Plain Card
```
Cutting size: 31.4mm × 31.4mm
Pieces per A4: floor(210/31.4) × floor(297/31.4) = 6 × 9 = 54 pieces
Material: (1/144) × 90 = ₹0.625
Print: 200/54 = ₹3.70
Attachment: ₹6
Packaging: ₹5
Labor: ₹3
UNIT COST: ≈₹18.33
```

### Google Sheets Formula References
```
D1: =B1*B2                              (Area sq in)
D2: =D1/144                             (Area sq ft)
D3: =D2*VLOOKUP(B3,$A$11:$B$13,2,0)    (Material cost)
D4: =(B1*25.4)+6                        (Width+bleed mm)
D5: =(B2*25.4)+6                        (Height+bleed mm)
D6: =IF(OR(B4="Digital_A4",B4="UV_A4"),210,297)
D7: =IF(OR(B4="Digital_A4",B4="UV_A4"),297,420)
D8: =INT(D6/D4)                         (Pieces per row)
D9: =INT(D7/D5)                         (Pieces per column)
D10: =D8*D9                             (Total pieces/sheet)
D11: =VLOOKUP(B4,$A$16:$B$19,2,0)/D10   (Print cost/unit)
D15: =D3+D11+D12+D13+D14                (UNIT COST)
D17: =(D10*D4*D5)/(D6*D7)*100           (Material utilization %)
```

---

## Production Infrastructure

- **Facility**: Shared with parent company Ink Fish
- **Capabilities**: Screen printing (up to 12-color), UV printing, digital printing, DTG, sublimation, embroidery, vinyl, DTF
- **Inventory Model**: JIT (Just-In-Time) — 75-80% of products are 1-2 piece customizable; 45-day max stock policy
- **Production Volume**: ~40 orders/day, 150-250 pieces
- **Apparel Range**: Hoodies, t-shirts, polos, jackets + sub-variants

---

## Airtable Product Formula (Design Name Extraction)

```
REGEX_REPLACE(
  Design,
  ' (Fridge magnets?|Lapel pins?|Card stickers?|Pop up 3D Stickers?|Luggage tags?|Keychains?|Stickers?|Notebooks?|Mugs?|Coasters?|T-shirts?|Hoodies?|Clocks?|Plaques?|Frames?|earrings?)$',
  ''
)
```
