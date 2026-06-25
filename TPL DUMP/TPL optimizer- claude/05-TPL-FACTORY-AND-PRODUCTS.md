# TPL Factory & Products — Complete Documentation

> **Last Updated**: 2026-03-20
> **Source**: Airtable schema (Base 4) + conversation analysis

---

## Overview

**Base 4: TPL Factory & Products** is the **master product database** — the source of truth for all product information across the TPL ecosystem. Product data created here syncs downstream to inventory systems and all three order channels.

---

## Product Data Architecture

### Product Hierarchy

```
Product Category
  └──► Products Range (master catalog)
      └──► Product Variations (size, color, variant)
      └──► TPL Materials (raw materials used)
      └──► TPL Packaging (packaging specifications)
      └──► Parts Inventory (component BOM)
```

### Table Details

#### Factory
| Field (Inferred) | Purpose |
|------------------|---------|
| Factory Code | Unique identifier |
| Factory Name | Display name |
| Location | Address / city / region |
| Capabilities | What they can manufacture |
| Capacity | Production throughput |
| Status | Active / Inactive |

#### Factory Teams
| Field (Inferred) | Purpose |
|------------------|---------|
| Team Member | Person name |
| Factory | Linked factory record |
| Role | Position / function |
| Contact | Phone / email |

#### Product Category
| Field (Inferred) | Purpose |
|------------------|---------|
| Category Name | e.g., Candles, Fragrances, etc. |
| Description | Category details |
| Parent Category | For hierarchical categorization |

#### Products Range (Master Catalog)
| Field (Inferred) | Purpose |
|------------------|---------|
| Product ID | Unique identifier |
| SKU | Stock keeping unit |
| Product Name | Display name |
| Category | Linked Product Category |
| Factory | Linked manufacturing facility |
| Materials | Linked TPL Materials |
| Description | Product details |
| Status | Active / Development / Discontinued |

#### Product Variations
| Field (Inferred) | Purpose |
|------------------|---------|
| Variation ID | Unique identifier |
| Parent Product | Linked Products Range record |
| Variant Type | Size / Color / Scent / etc. |
| Variant Value | Specific attribute value |
| SKU Suffix | Variant-specific SKU extension |

#### TPL Materials
| Field (Inferred) | Purpose |
|------------------|---------|
| Material Name | Raw material identifier |
| Type | Category of material |
| Supplier | Where sourced from |
| Cost | Unit cost |
| Unit | Measurement unit |

#### TPL Packaging
| Field (Inferred) | Purpose |
|------------------|---------|
| Package Type | Box, bag, label, insert, etc. |
| Linked Product | Products Range reference |
| Specifications | Dimensions, weight, material |

#### Key Processes & Capabilities
| Field (Inferred) | Purpose |
|------------------|---------|
| Process Name | Manufacturing process type |
| Factory | Which factory has this capability |
| Capacity | Throughput for this process |
| Equipment | Required machinery |

---

## Product Data Sync Map

Products Range data flows to every order channel:

| Destination Base | Destination Table | Sync Method |
|-----------------|-------------------|-------------|
| Base 1: Inventory Management | Product Inventory | Airtable Sync |
| Base 5: Offline Orders | TPL Products Synced | Airtable Sync |
| Base 6: Retail Orders | Retail Products | Airtable Sync |
| Base 7: Online Orders | Woocom Products / TPL Product Sheet | Airtable Sync + WooCommerce |

---

## Manufacturing Capabilities

The **Key Processes & Capabilities** table maps what each factory can produce. This enables:

- **Order routing**: Assigning orders to the right factory based on product type
- **Capacity planning**: Understanding throughput limits per factory
- **New product feasibility**: Checking if existing factories can handle new product specs

---

## Product Development Flow

```
Product Concept
  └──► Product created in Products Range
      └──► Category assigned
      └──► Materials specified (TPL Materials)
      └──► Factory assigned based on Key Processes & Capabilities
      └──► Packaging defined (TPL Packaging)
      └──► Variations created (Product Variations)
      └──► Sample production at Factory
      └──► Status → Active
      └──► Syncs to Inventory + Order bases
      └──► Available for sale across channels
```

---

## Artist Collaboration Model

Referenced in conversation analysis — TPL works with artists for product collections. This likely involves:

- Artist-designed products or packaging
- Collaboration-specific product variations
- Limited edition or seasonal collections
- Artist attribution in product catalog

**⚠️ No detailed artist collaboration data captured yet** — specific artists, collaboration terms, product lines not documented in this project's conversations.

---

## Recommended Views (from Conversation)

### Product Development & Design Views
- **Product Development Pipeline**: Stages from concept to launch
- **Artist Collaboration Tracker**: Current and upcoming artist projects
- **Material & Component Library**: Available materials for new product design
- **Product Performance Analytics**: Sales and feedback metrics by product

### Recommended Reports
- **New Product Launch Schedule**: Timeline of upcoming releases
- **Product Feedback Compilation**: Customer reviews and suggestions
- **Artist Collaboration Results**: Performance metrics of artist collections
- **Product Category Analysis**: Identifying growth opportunities

### Production & Manufacturing Views
- **Production Schedule Calendar**: Visual timeline of manufacturing commitments
- **Factory Capacity Tracker**: Current workload by factory and production line
- **BIN Management Dashboard**: Status tracking across all active production batches
- **Materials Allocation View**: Raw materials committed to upcoming production

### Recommended Reports
- **Daily Production Status Update**: Progress on active orders
- **Weekly Factory Performance**: Output vs. capacity
- **Quality Control Metrics**: Defect rates by product category and factory
- **Production Efficiency Analysis**: Actual vs. standard production times

---

## ⚠️ Gaps & Open Questions

- What specific product categories exist (candles, fragrances, etc.)?
- How many factories are in operation and where?
- What's the full Products Range catalog?
- How are artist collaborations structured in the data model?
- What's the BOM (Bill of Materials) structure — is it explicit or implied through TPL Materials?
- Are there costing formulas (materials + labor + packaging = COGS)?
- What quality control processes exist?
- How are product variations managed for WooCommerce sync (attribute mapping)?
