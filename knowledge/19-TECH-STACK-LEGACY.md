# TPL Technology Stack — Legacy & Migration Context

<!-- last-updated: 2026-03-20 -->

Source: Handoff documents 04, 07

## Current Stack (Pre-Relaunch)

| Layer | Tool | Status for Relaunch |
|-------|------|-------------------|
| E-commerce | WooCommerce | **MIGRATING** to Fynd Commerce.com |
| CRM/Data | Airtable (30+ bases) | Evaluate for Fynd integration |
| App Frontend | Softr (tpl.softr.app) | Internal tool — keep or replace |
| Project Mgmt | Notion | Continue |
| Automation | n8n (self-hosted) | Rework for Fynd APIs |
| AI | Claude API | Continue (now via Claude Code agents) |
| Communication | Slack, Email, WhatsApp | Continue |
| Design | Canva, Figma, Adobe, CorelDRAW | Continue |
| Payments | WooCommerce gateways | **MIGRATING** to Razorpay via Fynd |

## Airtable Ecosystem (30+ Bases)

Key bases that may need Fynd equivalents or API bridges:

| Base | Function | Migration Impact |
|------|----------|-----------------|
| TPL Management | Main ops | Low — operational, not storefront |
| TPL Inventory Management | Stock | High — needs Fynd inventory sync |
| TPL Order Management | Sales | High — Fynd handles orders natively |
| TPL Products | Catalog | High — Fynd has own product DB |
| TPL Production Management | Production | Medium — stays internal |
| TPL OO - WooCommerce | E-commerce | **DEPRECATED** — replaced by Fynd |
| TPL Costing Sheet | Pricing | Low — reference data |
| TPL Design Directory | Assets | Low — creative tooling |

## n8n Workflows (Designed, Not All Deployed)

| Workflow | Status | Fynd Impact |
|----------|--------|-------------|
| Order Fulfillment (WooCommerce → Airtable) | Designed | Needs Fynd webhook trigger |
| Inventory Alerts | Designed | Needs Fynd inventory API |
| Customer Lifecycle | Designed | Can reuse with Fynd events |
| AI Customer Service | Designed | Webhook-based, platform-agnostic |
| Financial Reporting | Designed | Needs Fynd order data |

## WooCommerce Plugin Stack (LEGACY — Do Not Rebuild)

AutomateWoo, Omnisend, Cart Abandonment Recovery, Product Add-ons, YITH Wishlist, PDF Invoices, WP Inventory Manager, WooCommerce Boost Sales, GetButton, WooCommerce Instagram.

**Note:** These plugins' functions must be evaluated against Fynd Commerce native features. Many may be unnecessary on the new platform.

## Softr App Pages

- /products — Product catalog
- /inventory — Inventory management
- /online-orders — E-commerce orders
- /offline-orders — Offline order management
- /clients-details — Client CRM

**Decision needed:** Does Softr stay as internal team tool alongside Fynd storefront?

## Tobi (Build Lead) Implications

- Primary build is on Fynd Commerce.com, not WooCommerce
- Airtable integration strategy needed — which bases sync with Fynd?
- n8n automation must be re-pointed to Fynd APIs
- No need to rebuild WooCommerce plugin functionality
