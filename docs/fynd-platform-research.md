# Fynd (Commerce.com) Platform Research — Mid-2026

**Prepared for:** Tobi (Build Lead)  
**Date:** 2026-06-06  
**Source:** Web research, Fynd official docs, API reference, press releases  
**Brand:** The Product Lab — D2C Indian lifestyle brand launching on Fynd

---

## Quick Reference Table

| Capability | Supported? | Notes |
|---|---|---|
| Product catalog (manual + CSV) | ✅ Yes | Bulk CSV import, AI-powered PIM, individual create |
| Variants (size/color) | ✅ Yes | Up to 40 variants per product, auto-linking, swatch images |
| Collections (handpicked + automated) | ✅ Yes | Basic (rule-based: brand, category, dept) + Handpicked (manual) |
| Themed drops (Drop 1, Drop 2) | ✅ Yes | Collections + scheduling on coupons/promotions |
| Custom CSS / theme editor | ✅ Yes | No-code live editor + custom CSS + FDK for full theme builds |
| PDP customization | ✅ Partial | Section-based builder, custom fields, schema markup; rich content via custom sections |
| Bundle products | ✅ Yes | Native product bundles — group SKUs, set bundle price, single shipment |
| Discount engine | ✅ Yes | Coupons (% , flat, BOGO, bundle, ATV) + Promotions (auto-apply, tiered, free gift) |
| Gift features | ✅ Partial | Free gift promotions; no native gift messaging/wrapping/receipt — build via custom fields |
| Checkout customization | ✅ Partial | Optimised default flow, custom fields API, agentic checkout; full rewrite via headless |
| Razorpay integration | ✅ Yes | Native — UPI, cards, wallets, net banking, EMI, Pay Later |
| Shiprocket integration | ✅ Yes | Live for 300+ D2C brands, automated courier selection, AWB, tracking |
| GA4 & analytics | ✅ Yes | GA4, GTM, data layer events, custom events via FPI |
| SEO (meta, sitemap, schema) | ✅ Yes | Full control: robots.txt, sitemap.xml, JSON-LD schema, custom meta tags |
| Multi-warehouse | ✅ Yes | Multiple inventory locations supported, real-time sync |
| REST API | ✅ Yes | Platform API + Storefront API + Partner API (REST + GraphQL) |
| Headless mode | ✅ Yes | Fully headless/composable — use Fynd back-end with custom front-end |
| Admin mobile app | ❌ No | No dedicated mobile admin app (web-based admin only) |
| Customer mobile app | ✅ Yes | PWA-based; iOS/Android apps possible via Fynd |
| GST/compliance | ✅ Yes | GST invoicing, e-invoice, e-waybill, TCS, SAC/HSN codes |
| Pricing | ₹11,111–₹33,333/yr + GST | 1.5%–2.5% transaction fees + payment gateway fees |
| 30-day free trial | ✅ Yes | No credit card required |

---

## 1. Product Catalog Management

### Capabilities
- **Manual creation** via Commerce Panel → Products → My Products → Create Product
- **Bulk CSV import** with validation; AI-powered auto-enrichment via AI PIM
- **Unlimited products** on all plans
- **Variants:** Up to 40 per product (size, color, material, etc.)
- **Auto-linking:** Link variants once; system auto-links across all products in the group
- **Swatch images:** Hex color codes or image swatches for PDP variant tiles
- **Identifiers:** SKU, EAN, UPC, ISBN, GTIN — multi-identifier support with one PRIMARY
- **Inventory tracking:** Per-variant toggle (tracked or infinite)
- **Product types:** `standard`, `set`, `composite`, `digital`
- **SEO per product:** Custom title, description, slug, AI-generated meta

### Implementation Notes
- Use AI PIM to auto-generate titles, descriptions, SEO tags from raw images/data
- Variants only appear on PDP after inventory is added for every variant in the group
- After linking variants once, adding inventory to one product syncs across all linked variants
- CSV bulk upload is the recommended path for initial catalog (100+ SKUs)

### API Endpoints
```
POST /v3/catalog/product          — Create products (bulk, with variants)
PUT  /v3/catalog/product          — Update products
GET  /v3/catalog/product          — List/filter products
POST /v3/catalog/product/bulk     — Bulk upload
```

### Docs
- https://documentation.fynd.com/commerce/docs/products/overview-product-creation.md
- https://platform.fynd.com/help/docs/products/catalogue/create-variants
- https://www.fynd.com/ai-pim

---

## 2. Collection / Category Management

### Capabilities
- **Two types:**
  - **Basic Collections** — Rule-based: auto-populate based on brand, category, department, or combination
  - **Handpicked Collections** — Manually select individual products regardless of categorization
- **Categories:** Hierarchical (L1 → L2 → L3), multi-category assignment per product
- **Themed drops:** Create a Handpicked Collection per drop (e.g., "Drop 1 — Small Objects"), schedule via coupon/promotion visibility

### Implementation Notes
- Use Handpicked Collections for Drop 1, Drop 2, Drop 3 — full manual control over which products appear
- Use Basic Collections for "All Tees" or "Under ₹999" type groupings
- Collections can be featured on homepage, navigation, or linked from anywhere

### API Endpoints
```
GET    /v3/catalog/category          — List categories
POST   /v3/catalog/category          — Create category
PUT    /v3/catalog/category          — Update category
GET    /v3/catalog/collection        — List collections
POST   /v3/catalog/collection        — Create collection
```

### Docs
- https://docs.fynd.com/partners/commerce/sdk/2.11.1/platform/application/catalog

---

## 3. Theme & Customization

### Capabilities
- **No-code theme editor** — live preview, drag-and-drop section builder, change colors/fonts/layouts visually
- **Pre-built themes** — customizable, modular design blocks
- **AI section builder** — describe in plain language, generate custom page sections
- **Global design controls** — typography, color palette, spacing
- **Custom CSS** — can inject custom CSS
- **Full theme development** — via FDK CLI, build and publish custom themes
- **Section-based page builder** — add/reorder/remove sections on any page
- **Responsive** — desktop, tablet, mobile views configurable independently

### Implementation Notes
- For a brand like TPL, use the no-code editor for most pages, custom CSS for specific brand flourishes
- If unique layout needs can't be met by the section builder, build a custom theme via FDK
- The AI section builder is good for rapid prototyping but likely needs manual polish for production

### Docs
- https://www.fynd.com/features/storefront
- https://docs.fynd.com/partners/commerce/developer-tools/overview/
- https://docs.fynd.com/partners/commerce/themes-doc/development/add-utm-tracking

---

## 4. PDP (Product Detail Page) Customization

### Capabilities
- Section-based layout — add/reorder sections on the PDP
- Custom fields on products (API-driven)
- SEO meta per product (title, description, slug, AI-generated)
- Schema markup per page type (custom JSON-LD per product page)
- Image galleries, videos, 3D models supported in product media
- Variant swatches (image, color, text)
- Quick View and Buy Now buttons
- Rich product descriptions (HTML)

### Known Gaps
- No native "how-to" or "care instructions" section — build via custom fields or custom page sections
- Rich content sections require the section builder or custom theme development
- Full PDP redesign requires headless approach or custom theme

### Workarounds
- Use custom fields to add care instructions, how-to content, material details
- Create a custom page section (via theme development) for rich content below the fold
- For deep customization, use Fynd headless (custom front-end, Fynd back-end)

### API Endpoints
```
GET /service/application/catalog/v1.0/product/{slug}/detail   — Product detail
```

### Docs
- https://documentation.fynd.com/commerce/docs/manage-website/products.md
- https://docs.fynd.com/partners/commerce/sdk/latest/platform/application/configuration (custom fields)

---

## 5. Bundle / Combo Products

### Capabilities
- **Native product bundles** — group multiple SKUs and sell as one product
- **Bundle pricing** — set MRP + selling price; auto-calculates discount
- **Single shipment** — all items in the bundle ship together
- **Use cases:** Shirt + T-shirt combos, "Collect Sets" with multiple items, complementary products

### Implementation Notes
- Create bundle products for "Collect Sets" or themed product combos
- Bundle pricing can show "Better value than individual items" messaging
- Return/config for bundles is per-SKU within the bundle
- Inventory tracks each component SKU independently

### API Endpoints
```
POST /v3/catalog/product   — set item_type: "set" or "composite"
```

### Docs
- https://documentation.fynd.com/commerce/docs/products/product-bundle.md
- https://docs.fynd.com/partners/commerce/webhooks/latest/application/article (set/is_set field)

---

## 6. Discount & Promotion Engine

### Capabilities

**Coupon Types:**
- X Percentage Value
- X Amount Value
- Bundle Percentage Discount
- Bundle Amount Discount
- Buy X Items Get Y Free (BOGO)
- Buy X Items at Absolute Amount
- Bundle On Quantity Percentage Discount
- Average Transactional Value (ATV) Discount
- Bulk coupon generation (prefix + count)

**Promotion Types:**
- Percentage, amount, fixed_price, BOGO, contract_price, ladder_price, custom
- Free gift promotions (buy ₹X, get free item)
- Auto-apply or coupon code
- Scheduled (start/end, cron-based, recurring)
- Stackable or exclusive
- Product-level, cart-level, contract, ladder pricing

**Applicable On:**
- Category, Brand, Seller, Stores, Collection, Exclude Brands, All Products

**Restrictions:**
- Max uses (total, per user, per app)
- Min/max item price
- Payment mode restriction
- User type (all, registered, guests)
- Platform (web, Android, iOS)

### Implementation Notes
- Use **auto-apply promotions** for launch discounts (e.g., "20% off sitewide")
- Use **coupon codes** for influencer/affiliate campaigns
- **Scheduled promotions** are ideal for Drop 1 / Drop 2 timed launches
- **Free gift promotions** work for "Free tote with orders above ₹999"
- Coupons and promotions are separate entities — they can stack or be exclusive

### API Endpoints
```
POST /service/platform/offer/v1.0/company/{id}/offers    — Create offer (coupon/promotion)
POST /service/platform/offer/v1.0/company/{id}/coupons   — Create coupon
POST /service/platform/offer/v1.0/company/{id}/promotions — Create promotion
```

### Docs
- https://documentation.fynd.com/commerce/docs/marketing/coupons/how-to-create-coupon.md
- https://documentation.fynd.com/commerce/docs/marketing/promotions/gift-promotion.md

---

## 7. Gift / Gifting Features

### Capabilities
- **Free gift promotions** — buy ₹X, get a free product added to cart
- **Custom fields** on orders/products to store gift messages

### Known Gaps
- **No native gift wrapping** option at checkout
- **No native gift messaging** field
- **No gift receipt** option
- **No "This is a gift" checkbox**

### Workarounds
- Add custom fields at checkout for gift message input
- Add a "gift wrapping" product as a cart add-on (a ₹0 or ₹99 item the customer adds)
- Use custom fields API to store gift preferences on the order
- Build a gift option via checkout extension (headless route)

---

## 8. Checkout Customization

### Capabilities
- **Optimised checkout flow** — address autocomplete, guest checkout, mini cart, in-cart recommendations
- **Agentic checkout** — AI chat assistant that adds to cart, applies coupons, guides checkout
- **Real-time delivery promise** — shows shipping estimates before payment
- **Custom fields at checkout** — via API (add fields to order/bag objects)
- **Guest checkout** supported
- **Multiple payment options** — UPI, cards, wallets, COD, net banking, EMI

### Customization Options
- **Custom fields API** — add fields at bag, order, or coupon level
- **Checkout extensions** — build custom checkout flows via Fynd extension framework
- **Headless checkout** — full control over checkout UX with custom front-end + Fynd Storefront API
- **Custom forms** — contact/feedback forms on storefront

### Implementation Notes
- For basic customization (order notes field), use custom fields API
- For deep checkout customization, use headless mode with the Storefront API
- Agentic checkout is new (2026) — test before relying on it for launch

### API Endpoints
```
GET  /service/platform/configuration/v1.0/company/{id}/custom_field_types
POST /service/platform/configuration/v1.0/company/{id}/custom_field_definition
PUT  /service/application/checkout/v1.0/cart/{cart_id}/items   — Add items
POST /service/application/checkout/v1.0/checkout               — Create checkout
```

### Docs
- https://docs.fynd.com/partners/commerce/sdk/latest/application/payment
- https://www.fynd.com/features/storefront

---

## 9. Razorpay Integration

### Capabilities
- **Native integration** — Razorpay is pre-integrated; no separate gateway setup needed
- **Payment modes via Razorpay:**
  - UPI (GPay, PhonePe, Paytm, BHIM)
  - Credit/Debit cards
  - Wallets
  - Net banking
  - EMI (cardless EMI available)
  - Pay Later (Razorpay Pay Later)
  - QR code payments
- **Dynamic QR** — per-transaction QR for UPI
- **Magic Checkout** — Razorpay's modal checkout with address validation, coupon management
- **UPI intent flow** — direct app-to-app payments on mobile
- **Refunds** — processed through OMS, end-to-end refund management (including offline/bank/UPI refunds) coming in 2026

### Implementation Notes
- Razorpay works out of the box — no custom development needed for basic payment flows
- For Magic Checkout features (in-modal address, coupon, shipping), build payment extension endpoints
- Fynd handles Razorpay API keys via the Fynd dashboard
- Payment gateway fees are separate from Fynd's transaction fees

### API Endpoints (via Fynd)
```
GET  /service/application/payment/v1.0/payment-modes   — List available payment modes
POST /service/application/payment/v1.0/payment/session  — Initiate payment session
```

### Docs
- https://docs.fynd.com/partners/commerce/sdk/latest/application/payment
- https://docs.fynd.com/partners/commerce/extension/payments-doc/development/
- https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/

---

## 10. Shiprocket Integration

### Capabilities
- **Strategic partnership** (announced June 2025) — live for 300+ D2C brands
- **Shiprocket courier aggregation** within Fynd OMS:
  - Automated courier selection (AI-powered, price+delivery time optimization)
  - Price comparison across carriers
  - Real-time tracking
  - AWB generation (automatic)
  - Label generation
  - Manifest creation
- **COD handling** — COD eligibility checks, COD fee configuration, RTO prediction
- **Wider pin code coverage** — especially Tier II/III cities
- **Returns management** — NDR workflows, reverse logistics
- **100+ courier partners** available through Fynd Logistics

### Implementation Notes
- Shiprocket integration is **native within Fynd OMS** — no separate Shiprocket account needed
- Configure courier partners, weight slabs, and shipping zones in Fynd dashboard
- RTO prediction and address intelligence features are planned for 2026
- For COD-heavy orders (expected 40–60% for TPL), test Shiprocket COD flow before launch

### API Endpoints
```
POST /service/platform/logistics/v1.0/company/{id}/shipments   — Create shipment
GET  /service/platform/logistics/v1.0/company/{id}/track/{awb} — Track shipment
```

### Docs
- https://www.fynd.com/solutions/logistics
- https://docs.fynd.com/partners/commerce/sdk/latest/application/logistic
- https://www.fynd.com/press-releases/shiprocket-fynd-partner

---

## 11. GA4 & Analytics

### Capabilities
- **GA4 integration** — pre-built extension, Enhanced Ecommerce (GA4) support
- **Google Tag Manager** — native extension, push events to data layer
- **Data layer events** — structured, real-time event capture (view, click, add-to-cart, purchase, etc.)
- **Custom events** — via FPI (Fynd Platform Intelligence) or custom GTM tags
- **Native Pixel & CAPI integrations** — Facebook/Instagram conversion API
- **Product feed auto-sync** — Google, Meta, AI surfaces
- **Fynd Intelligence** — new platform (2026) unifying data, insights, AI actions
- **Pre-built analytics** — real-time storefront analytics, automated reports
- **llms.txt support** — storefront discoverable by AI crawlers

### Implementation Notes
- Turn on GA4 via Fynd Extensions marketplace (google-tag-manager extension)
- Use the `@gofynd/storefront-tag-templates` package for custom tag templates
- Use FPI (Fynd Platform Intelligence) for deeper storefront event tracking
- Custom events can be sent via GTM data layer with custom triggers

### Docs
- https://extensions.fynd.com/extensions/google-tag-manager
- https://github.com/gofynd/fynd-storefront-tag-template
- https://github.com/fynd-platform/GA4-Extension
- https://docs.fynd.com/partners/commerce/themes-doc/development/add-utm-tracking

---

## 12. SEO Features

### Capabilities
- **Meta tags** — custom per page (title, description, keywords)
- **robots.txt** — fully customizable
- **Sitemap** — auto-generated sitemap.xml, custom sitemap merge support
- **Schema markup** — JSON-LD per page type (Product, Collection, Home, etc.)
- **Canonical URLs** — self-canonical tag support
- **URL structure** — customizable slugs for products, collections, pages
- **SEO Plus extension** — bulk SEO meta updates, alt text, collection meta, blog meta
- **Breadcrumbs** — configurable on pages
- **AI-generated SEO** — auto-generate titles, descriptions from keywords
- **SEO-first architecture** — built-in meta, schema, canonical URLs from day one

### Implementation Notes
- Use Schema editor to create custom JSON-LD for Product pages (reviews, price, availability)
- Use SEO Plus extension for bulk updating SEO meta across all products
- Sitemap is auto-generated; custom sitemap content merges into the default
- For drops (Drop 1, Drop 2), create landing pages with custom SEO

### API Endpoints
```
GET  /service/application/content/v1.0/seo/schema       — List SEO schemas
POST /service/platform/configuration/v1.0/seo/schema    — Create SEO schema
GET  /service/application/content/v1.0/seo/settings     — Get SEO settings
```

### Docs
- https://documentation.fynd.com/commerce/docs/manage-website/seo.md
- https://docs.fynd.com/commerce/docs/extensions/available-extensions/seo-plus
- https://docs.fynd.com/partners/commerce/sdk/latest/platform/application/configuration

---

## 13. Multi-Warehouse / Inventory

### Capabilities
- **Multiple inventory locations** supported — plan limits: 1 (Basic), 2 (Growth), 3 (Scale)
- **Real-time inventory sync** across all stock points (warehouses, stores, dark stores)
- **Per-location inventory tracking** — update quantities per SKU per location
- **Order routing** — automated, rule-based assignment from nearest warehouse/store
- **Bulk inventory updates** — via API (max 500 records per request)
- **Inventory export/import** — CSV-based bulk operations
- **Low stock alerts** — configurable thresholds

### Implementation Notes
- For TPL's initial launch, 1-2 inventory locations should suffice
- Plan for 3 locations as you scale (Scale plan)
- Use the Inventory API for real-time stock sync with your ERP or warehouse system

### API Endpoints
```
POST /service/platform/catalog/v1.0/company/{id}/inventory/bulk   — Bulk update inventory
GET  /service/platform/catalog/v1.0/company/{id}/inventory         — List inventory
POST /service/platform/catalog/v1.0/company/{id}/inventory/export  — Export inventory
```

### Docs
- https://documentation.fynd.com/konnect/apis/konnect/catalog (Inventory section)
- https://docs.fynd.com/partners/commerce/sdk/2.11.1/platform/application/catalog

---

## 14. API Access

### Capabilities
- **Three API tiers:**
  1. **Platform API** — manage company data (products, inventory, orders, promotions, etc.)
  2. **Storefront (Application) API** — customer-facing data (products, collections, cart, checkout, orders)
  3. **Partner API** — for building extensions, themes, and integrations
- **REST + GraphQL** — both supported
- **SDKs** — JavaScript, Python, Java
- **FDK CLI** — command-line tool for scaffolding, testing, building
- **Headless mode** — fully composable, bring your own front-end
- **Webhooks** — events for products, orders, payments, coupons, inventory, etc.
- **OAuth 2.0** — token-based authentication (client credentials, OAuth for extensions)
- **UI component library** — ready-to-use components for extension UIs
- **Extension marketplace** — publish custom extensions

### Key API Endpoints
```
# Platform API (manage your store)
https://api.fynd.com/service/platform/{service}/{version}/company/{company_id}

# Storefront API (customer-facing)
https://api.fynd.com/service/application/{service}/{version}

# Partner API (extensions/themes)
https://api.fynd.com/service/partner/{service}/{version}
```

### Implementation Notes
- For TPL's build phase, focus on: Storefront API (front-end integration) + Platform API (catalog, inventory, orders backend)
- Authentication: Basic auth with base64(client_id:client_secret) for platform; base64(app_id:app_token) for storefront
- Webhooks are critical for real-time sync with your systems
- FDK CLI can scaffold a headless project quickly

### Docs
- https://docs.fynd.com/partners/commerce/sdk/latest/platform/client-libraries
- https://docs.fynd.com/partners/commerce/sdk/latest/application/client-libraries
- https://docs.fynd.com/partners/commerce/headless/
- https://docs.fynd.com/partners/commerce/webhooks/latest/

---

## 15. Mobile App

### Admin Mobile App
- **No dedicated mobile admin app** — admin is web-based only, accessible via mobile browser
- **Staff accounts** — 2 (Basic), 5 (Growth), 10 (Scale) — can access the web admin from mobile

### Customer Mobile App
- **PWA (Progressive Web App)** — Fynd Storefront is PWA-ready, installable on home screen
- **Android/iOS apps** — Fynd can generate native apps, but this is typically for larger deployments
- **Quick commerce PWA** — also available for faster ordering flows

### Implementation Notes
- For TPL's launch, the PWA storefront is sufficient for mobile customers
- Native customer app would be post-launch (Phase 6+)
- Admin staff can manage orders/inventory from mobile browser on the web admin

---

## 16. Pricing

### Plans (Annual, + GST)

| Plan | Price/yr | Transaction Fee | Staff Accts | Inventory Locations | Email/SMS Credits |
|---|---|---|---|---|---|
| Basic (Standard) | ₹11,111 | 2.5% | 2 | 1 | 500 |
| Growth (Professional) | ₹22,222 | 2% | 5 | 2 | 5,000 |
| Scale (Premium) | ₹33,333 | 1.5% | 10 | 3 | 50,000 |

**Transaction fees** are exclusive of payment gateway fees (e.g., Razorpay's fees).  
**30-day free trial** available — no credit card required.  
**All plans** include unlimited products, built-in OMS, shipping, WhatsApp integration, AI tools.

### Recommended Plan for TPL
- **Growth (₹22,222/yr)** — good balance: 2 inventory locations, 5 staff accounts, 2% transaction fee
- Upgrade to **Scale (₹33,333/yr)** if order volume exceeds 50K emails/SMS credits or need 3 warehouses

### Docs
- https://fynd.com/storefront/pricing
- https://www.fynd.com/storefront/growth

---

## 17. Known Limitations & Risks

### Confirmed Limitations
1. **No native gift messaging/wrapping** — must build via custom fields or workaround
2. **No admin mobile app** — web-only admin
3. **Checkout customization is limited without headless** — deep changes require headless mode
4. **Max 40 variants per product** — fine for TPL (size+color), but relevant for complex products
5. **PDP rich content is limited** — custom sections or headless needed for advanced layouts
6. **Plan-based inventory location limits** — 1/2/3 locations; more requires custom enterprise plan
7. **Limited public reviews** — G2/Capterra have few reviews; due diligence relies on Fynd-provided references

### Risks to Mitigate
1. **COD RTO rates** — Fynd has RTO prediction tools (2026), but test thoroughly before peak volumes
2. **Shiprocket integration maturity** — partnership announced June 2025; while live, verify T2/T3 coverage for TPL's audience
3. **Platform complexity** — can feel heavy for a small team; invest in setup/training (30-day free trial + free training)
4. **Customization speed** — non-standard features need headless or extension development; factor into timeline
5. **API rate limits** — verify for peak traffic (Fynd claims 350K orders/hr capacity)

### Reported Complaints (from consumer side, not merchant)
- Refund delays (consumer complaints on PissedConsumer)
- Customer support responsiveness (consumer side)
- Delivery partner issues in certain regions (ECOM delivery)

> **Note:** These complaints are from B2C shoppers on Fynd-powered marketplaces — not from merchants using the platform. However, your customers' experience depends on the same logistics partners.

---

## 18. GST & Compliance

### Capabilities
- **Full GST invoicing** — CGST, SGST, IGST, UTGST (added 2026)
- **HSN/SAC codes** — configurable per product; SAC codes for service items (delivery, COD charges)
- **E-invoicing** — IRN generation via Fynd, e-invoice alert system, audit trail
- **E-waybill** — generation for B2B shipments
- **TCS** — Fynd deducts TCS as per Section 52 of GST Act (for marketplace transactions)
- **GSTIN management** — store-level GST credentials, buyer GSTIN capture at checkout
- **Tax invoices** — A4, POS, A6 formats; automatic tax invoice generation
- **Digital signatures** — signed invoices supported
- **QR codes** — dynamic QR on invoices
- **Invoice API** — push IRN, credit notes, invoice updates via API

### Implementation Notes
- Configure HSN codes per product during catalog setup (required field)
- Set up store GST credentials in Fynd dashboard per location
- Enable e-invoicing if required for your business volume
- TPL will handle its own GST returns; Fynd handles TCS deduction and remittance

### API Endpoints
```
POST /oms/v3/shipment/invoiceUpdate    — Push invoice/IRN details
```

### Docs
- https://www.fynd.com/releases/v2-6-0 (UTGST support)
- https://www.fynd.com/releases/v2-0-0 (buyer GSTIN display)
- https://www.fynd.com/releases/v1-9-5 (SAC codes)
- https://www.fynd.com/terms-and-conditions (Section 8 — Tax Compliance)
- https://fyn-gateway.readme.io/reference/post_einvoice-generate-irn

---

## Key Decisions for TPL Build

| Decision | Recommendation |
|---|---|
| **Plan** | Growth (₹22,222/yr) — 2 locations, 5 staff, 2% TXN fee |
| **Catalog approach** | AI PIM for initial bulk upload + manual refinement |
| **Drop structure** | Handpicked Collections per drop + scheduled promotions |
| **Payment** | Razorpay native (default) — UPI, cards, COD |
| **Shipping** | Shiprocket via Fynd OMS (native) |
| **Analytics** | GA4 via GTM extension + Fynd Intelligence |
| **Checkout** | Default optimized checkout + custom fields for order notes |
| **Gift feature** | Custom fields for gift message + free gift promotions for "Free tote" |
| **Mobile** | PWA storefront (no native app at launch) |
| **Headless?** | Not needed for launch — Fynd Storefront is sufficient |

---

## Useful Links

| Resource | URL |
|---|---|
| **Fynd main site** | https://www.fynd.com/ |
| **Storefront features** | https://www.fynd.com/features/storefront |
| **Developer docs** | https://docs.fynd.com/ |
| **Platform API reference** | https://docs.fynd.com/partners/commerce/sdk/latest/platform/client-libraries |
| **Storefront API reference** | https://docs.fynd.com/partners/commerce/sdk/latest/application/client-libraries |
| **Headless guide** | https://docs.fynd.com/partners/commerce/headless/ |
| **Webhooks docs** | https://docs.fynd.com/partners/commerce/webhooks/latest/ |
| **User documentation** | https://documentation.fynd.com/commerce/docs/introduction/what-is-fp.md |
| **Pricing** | https://fynd.com/storefront/pricing |
| **Release notes** | https://www.fynd.com/releases |
| **Extensions marketplace** | https://extensions.fynd.com/ |
| **Fynd AI PIM** | https://www.fynd.com/ai-pim |
| **Fynd Logistics** | https://www.fynd.com/solutions/logistics |
| **Fynd 2026 roadmap** | https://www.fynd.com/en-gb/blog/fynd-in-2026 |
| **Shiprocket partnership** | https://www.fynd.com/press-releases/shiprocket-fynd-partner |
| **Case studies** | https://www.fynd.com/customer-stories |
| **GitHub: Fynd org** | https://github.com/fynd-platform |
| **GitHub: Storefront tags** | https://github.com/gofynd/fynd-storefront-tag-template |

---

*Last updated: 2026-06-06 | Research prepared for Tobi (Build Lead) | The Product Lab relaunch*
