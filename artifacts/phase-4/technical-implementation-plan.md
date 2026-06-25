<!-- last-updated: 2026-03-28 -->
# Technical Implementation Plan — The Product Lab Phase 4

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Merchandising Implementation |
| **Producing Agent** | Tobi (Developer) |
| **Date** | 2026-03-28 |
| **Status** | draft |
| **Reviewer** | Harley |

**Revision note (2026-03-28):** Visual direction has changed from Darkroom (dark #1A1A1A dominant surface) to Light+Bold / Organised Chaos (cream #F5F0EB dominant surface, off-black as ink). All CSS token references, component specs, and implementation notes have been updated throughout. Five new components added in Section 4.2. Hour estimate revised from 45h to 53h. Darkroom-specific implementation notes removed.

---

## 1. Platform Setup — Commerce.com (Fynd) Store Configuration

### 1.1 Store Creation & Basic Configuration

**Action:** Create new store on Commerce.com dashboard.

- **Store name:** The Product Lab
- **Business type:** Fashion/Accessories (B2C)
- **Currency:** INR (₹)
- **Timezone:** Asia/Kolkata
- **Primary market:** India
- **Payment methods:** Enable Razorpay, COD

**Dan's role:** Complete store creation through Commerce.com dashboard (self-service, 15 mins).

### 1.2 Storefront Theme Configuration

Commerce.com provides theme customisation through their dashboard. You will NOT use custom code here unless absolutely necessary.

**Theme settings to configure (Dan, self-service):**
- Logo: Upload TPL logo (SVG or PNG, max 500KB)
- Favicon: TPL favicon (32x32px PNG)
- Primary color: #F5F0EB (cream base — the dominant canvas)
- Text color: #1A1A1A (off-black — the ink)
- Secondary accent 1: #E63B2E (red — signal color for CTAs)
- Secondary accent 2: #F2D024 (yellow — signal color for drops)
- Font family: System allows Barlow Condensed (headings) + Inter (body) — map through Google Fonts integration

**Critical direction note:** The surface color is cream (#F5F0EB), not dark. Off-black (#1A1A1A) is the text/ink, not the background. This is the opposite of the previous Darkroom direction. Set theme defaults accordingly.

**Requires technical help (Tobi):** If Commerce.com theme builder doesn't directly support these fonts and surface colors, Tobi creates a custom CSS file that overrides default theme fonts and backgrounds. See Section 1.4.

### 1.3 Store Navigation & Pages

Configure these pages in the Commerce.com dashboard:

| Page | URL Slug | Type | Status |
|------|----------|------|--------|
| Homepage | / | Opinion Wall entry | Public |
| Collections Hub | /collections/ | Mood Wall browse | Public |
| Your Card Has a Personality | /collections/your-card-has-a-personality/ | Category | Public |
| No Filter | /collections/no-filter/ | Category | Public |
| Best Sellers | /collections/best-sellers/ | Category | Public |
| New In | /collections/new-in/ | Category | Public |
| The Drop | /collections/the-drop/ | Countdown/signup | Public |
| For the Friend | /collections/for-the-friend/ | Category | Public |
| All Products | /shop/ | Format browse | Public |
| Bundles | /bundles/ | Category | Public |
| Gifting Hub | /gifts/ | Category | Public |
| Artists | /artists/ | Information/links | Public |
| About | /about/ | Information | Public |
| Cart | /cart/ | System (auto) | Public |
| Checkout | /checkout/ | System (auto) | Public |
| Order Confirmation | /order-confirmation/ | System (auto) | Public |
| 404 | /404/ | Error page | Public |

**Dan's role:** Create pages in Commerce.com dashboard and add to main navigation menu.

### 1.4 Storefront Theme Customisation — CSS Overrides

**Requirement:** Implement Light+Bold / Organised Chaos visual system (cream #F5F0EB canvas, off-black #1A1A1A ink, red/yellow signal accents) on Commerce.com default theme.

**Deliverable:** Single CSS file placed in Commerce.com theme assets folder.

**File name:** `/custom-theme-overrides.css`

**Contents:**

```css
/* ============================================================
   THE PRODUCT LAB — Theme Overrides
   Direction: Light+Bold / Organised Chaos (2026-03-28)
   Surface: cream #F5F0EB | Ink: #1A1A1A | Signal: red/yellow
   ============================================================ */

/* Google Fonts — must be preconnected in <head> */
/* See Section 4.3 for the <link> tags */

:root {
  /* Surfaces */
  --color-surface-base:       #F5F0EB;  /* Primary page background — cream canvas */
  --color-surface-raised:     #EDE8E3;  /* Slightly darker cream — nav, footer, secondary cards */
  --color-surface-dark:       #1A1A1A;  /* Dark surface — opinion bar, drop strips, Record Store Browse */
  --color-surface-dark-raised: #2D2D2D; /* Elevated dark — used inside dark-surface components */

  /* Text */
  --color-text-primary:       #1A1A1A;  /* All headlines, body, product names on cream */
  --color-text-secondary:     #6B6B6B;  /* Metadata, captions, disabled */
  --color-text-on-dark:       #F5F0EB;  /* Text on dark surface */
  --color-text-on-accent:     #1A1A1A;  /* Text on yellow background */
  --color-text-on-red:        #F5F0EB;  /* Text on signal red */

  /* Accent */
  --color-accent-primary:     #E63B2E;  /* CTAs, badges, error states */
  --color-accent-secondary:   #F2D024;  /* Drop announcements, new badges, opinion bar */
  --color-accent-pure-white:  #FFFFFF;  /* Sold-out badge, max-contrast alerts */

  /* Functional */
  --color-success:            #3ECF4C;
  --color-border:             #D4CFC9;  /* Card borders, rule lines on cream */
  --color-border-dark:        #3A3A3A;  /* Rule lines on dark surface */

  /* Shadows — visible on cream canvas, "placed on surface" effect */
  --shadow-product:       0 2px 4px rgba(0, 0, 0, 0.12);
  --shadow-product-hover: 0 8px 16px rgba(0, 0, 0, 0.20);
  --shadow-sm:            0 1px 3px rgba(0, 0, 0, 0.12);
  --shadow-md:            0 4px 12px rgba(0, 0, 0, 0.16);
  --shadow-focus:         0 0 0 2px var(--color-accent-secondary);

  /* Transitions */
  --transition-fast:    150ms ease-out;
  --transition-normal:  200ms ease-out;
  --transition-slow:    300ms ease-in-out;
  --transition-settle:  250ms ease-in;

  /* Spacing */
  --space-1:   4px;
  --space-2:   8px;
  --space-3:  12px;
  --space-4:  16px;
  --space-6:  24px;
  --space-8:  32px;
  --space-12: 48px;
  --space-16: 64px;
  --space-24: 96px;

  /* Typography — Opinion text uses viewport units */
  --font-heading:    'Barlow Condensed', system-ui, sans-serif;
  --font-body:       'Inter', system-ui, sans-serif;
  --font-mono:       'Space Mono', 'Courier New', monospace;
  --weight-bold:     700;
  --weight-semibold: 600;
  --weight-medium:   500;
  --weight-regular:  400;
  --text-opinion-xl:  18vw;
  --text-opinion-lg:  14vw;
  --text-opinion-md:  10vw;
  --text-opinion-sm:   8vw;
  --leading-opinion: 0.92;
  --tracking-opinion: -0.03em;

  /* Border radius */
  --radius-none: 0;
  --radius-sm:   2px;
  --radius-md:   4px;
  --radius-pill: 9999px;
}

/* ---- Base layer ---- */
body {
  font-family: var(--font-body);
  font-size: 16px;
  line-height: 1.6;
  color: var(--color-text-primary);
  background-color: var(--color-surface-base);  /* CREAM — not dark */
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  letter-spacing: -0.02em;
  color: var(--color-text-primary);
}

h1 { font-size: 2rem; line-height: 1.1; margin-bottom: 1.5rem; }
h2 { font-size: 1.5rem; line-height: 1.2; margin-bottom: 1.25rem; }
h3 { font-size: 1.25rem; line-height: 1.3; margin-bottom: 1rem; }

/* ---- Layout ---- */
.storefront-container {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
}

.container {
  width: 100%;
  padding-inline: var(--space-3);
  margin-inline: auto;
  max-width: 1280px;
}

/* ---- Buttons ---- */
.btn-primary {
  background-color: var(--color-accent-primary);
  color: var(--color-text-on-red);
  border: none;
  padding: 0.75rem 1.5rem;
  font-family: var(--font-heading);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: filter var(--transition-fast);
}

.btn-primary:hover { filter: brightness(1.1); }
.btn-primary:active { filter: brightness(0.9); scale: 0.99; }

.btn-secondary {
  background-color: transparent;
  color: var(--color-text-primary);
  border: 1.5px solid var(--color-text-primary);
  padding: 0.75rem 1.5rem;
  font-family: var(--font-heading);
  font-weight: var(--weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  border-radius: var(--radius-md);
  transition: all var(--transition-normal);
}

/* ---- Product Cards — cream surface, visible shadow ---- */
.product-card {
  background-color: var(--color-surface-base);
  box-shadow: var(--shadow-product);
  border-radius: var(--radius-none);
  padding: var(--space-3);
  transition: box-shadow var(--transition-fast), transform var(--transition-fast);
}

.product-card__image {
  width: 100%;
  aspect-ratio: 1 / 1;
  object-fit: cover;
  margin-bottom: var(--space-2);
  background-color: var(--color-surface-raised);
}

.product-card__title {
  font-family: var(--font-heading);
  font-size: 1.125rem;
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
}

.product-card__price {
  font-family: var(--font-mono);
  font-size: 1rem;
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
}

/* ---- Navigation — cream surface ---- */
nav {
  background-color: var(--color-surface-base);
  border-bottom: 1px solid var(--color-border);
}

nav a {
  color: var(--color-text-primary);
  text-decoration: none;
  font-family: var(--font-heading);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color var(--transition-normal);
}

nav a:hover { color: var(--color-accent-primary); }

/* ---- Forms & Inputs ---- */
input[type="text"],
input[type="email"],
input[type="tel"],
input[type="number"],
textarea,
select {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  padding: 0.75rem 1rem;
  border-radius: var(--radius-md);
  font-family: var(--font-body);
  font-size: 1rem;
  transition: border-color var(--transition-normal);
}

input:focus,
textarea:focus,
select:focus {
  outline: none;
  border-color: var(--color-accent-primary);
  box-shadow: var(--shadow-focus);
}

/* ---- Cart & Checkout — cream surface ---- */
.cart-summary {
  background-color: var(--color-surface-raised);
  border: 1px solid var(--color-border);
  padding: 1.5rem;
  border-radius: var(--radius-sm);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  padding: 1rem 0;
  border-bottom: 1px solid var(--color-border);
}

.cart-item:last-child { border-bottom: none; }

.order-total {
  font-family: var(--font-mono);
  font-size: 1.5rem;
  font-weight: var(--weight-bold);
  color: var(--color-text-primary);
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 2px solid var(--color-border);
}

/* ---- Pricing ---- */
.price-free-shipping {
  color: var(--color-accent-secondary);
  font-weight: var(--weight-bold);
}

.price-prepaid-discount {
  color: var(--color-accent-primary);
  font-weight: var(--weight-bold);
}

/* ---- Accessibility ---- */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

/* ---- Mobile ---- */
@media (max-width: 768px) {
  h1 { font-size: 2rem; }
  h2 { font-size: 1.5rem; }
  h3 { font-size: 1.25rem; }
  body { font-size: 14px; }
}

@media (min-width: 1024px) {
  h1 { font-size: 3.5rem; }
  h2 { font-size: 2.5rem; }
  h3 { font-size: 1.75rem; }
}
```

**Dan's role:** Upload this CSS file through Commerce.com theme asset manager and link in head of all pages.

**Tobi's role:** Create and maintain the CSS file, test visual system implementation across all pages.

---

## 2. Integration Checklist

### 2.1 Payment Integration — Razorpay

**Razorpay account setup (Dan, 30 mins):**
1. Go to https://dashboard.razorpay.com
2. Sign up with email + mobile (India number required)
3. Complete KYC verification (Aadhaar/PAN)
4. Enable payments: Credit/Debit cards, UPI, Wallets (Google Pay, PhonePe, Paytm)
5. Copy API Key ID and API Secret

**Commerce.com integration (Dan, 15 mins):**
1. In Commerce.com dashboard, go to Settings → Payment Gateways
2. Click "Add Payment Gateway"
3. Select Razorpay
4. Enter API Key ID and API Secret
5. Enable the following payment methods:
   - UPI (primary method, highest conversion)
   - Credit/Debit Cards
   - Google Pay
   - PhonePe
   - Paytm Wallet
6. Set test mode ON until launch (Razorpay test credentials provided automatically)

**Test mode (Tobi + Dan):**
- Use Razorpay test cards: 4111 1111 1111 1111 (Visa), 5555 5555 5555 4444 (Mastercard), 6250 9462 3333 3333 (RuPay)
- Test UPI: testmerchant@razorpay (instant success)
- Test failed payment: Use any card ending in 0000

**Go-live (Dan, before launch):**
1. Submit live activation request in Razorpay dashboard
2. Switch Commerce.com to live mode (toggle in payment settings)
3. Verify first real transaction

**Dan's decision:** Dan must decide between 3 Razorpay plans:
- Starter: 2% fee (no support)
- Growth: 1.5% fee + ₹1,000/month (email support)
- Pro: 1% fee + ₹5,000/month (phone support)

Recommendation: Start with **Starter**, upgrade to Growth if revenue >₹50K/month.

### 2.2 Shipping Integration — Shiprocket

**Shiprocket account setup (Dan, 30 mins):**
1. Go to https://www.shiprocket.in
2. Sign up with email, business name (The Product Lab), registered address
3. Complete seller verification
4. Add warehouse address (your fulfillment location or home address if dropshipping)
5. Verify bank details for payouts
6. Enable carriers: Ecom Express, DTDC, BlueDart, Fedex (all major India networks)
7. Copy API Key

**Commerce.com integration (Dan, 15 mins):**
1. In Commerce.com dashboard, go to Settings → Shipping Integrations
2. Select Shiprocket
3. Enter Shiprocket API Key
4. Configure shipping rules:
   - Free shipping for orders ₹499 and above (national)
   - Flat ₹50 shipping for orders ₹299–₹498 (national)
   - No shipping for orders <₹299 (COD not available)
5. Enable COD:
   - Minimum order value: ₹299
   - COD available for all national carriers
   - Shiprocket collects payment on delivery, remits to your bank

**Shipping costs (for profit margin calculation):**
- Card stickers (small): ₹20–₹30 (Ecom Express)
- Keychains/pins (small): ₹25–₹35 (Ecom Express)
- Bundles (medium): ₹40–₹60 (DTDC)

**Test mode (Dan + Tobi):**
1. Create test orders with different values (₹200, ₹350, ₹500)
2. Verify shipping cost calculated correctly
3. Verify free shipping threshold
4. Check Shiprocket order creation webhook fires

**Go-live:** Switch to live mode in Commerce.com. Shiprocket will auto-integrate with real carriers.

### 2.3 Analytics — Google Analytics 4 (GA4)

**GA4 setup (Dan, 30 mins):**
1. Go to https://analytics.google.com
2. Create new property: "The Product Lab"
3. Install Google Analytics measurement ID (G-XXXXXXXXXX) in Commerce.com dashboard
4. Commerce.com auto-fires standard events (page_view, purchase)

**Custom events configuration (Tobi, see analytics-event-schema.md):**
- Product view
- Add to cart
- Begin checkout
- Collection view
- Search
- Drop signup
- Newsletter signup
- Social share (WhatsApp)
- Bundle view
- Opinion Wall skip (measures intent quality above fold)

**Enable data collection:**
1. Enable Google Signals (requires user to opt-in)
2. Enable demographics & interests reporting
3. Set data retention to 14 months (default)

**Key reports to set up (Tobi, after go-live):**
- Product performance (top 10 by revenue, by views)
- Traffic source breakdown (Instagram, WhatsApp, direct, etc.)
- Device breakdown (mobile vs desktop)
- Checkout flow (funnel from product view → purchase)

### 2.4 Session Recording — Microsoft Clarity

**Microsoft Clarity setup (Dan, 20 mins):**
1. Go to https://clarity.microsoft.com
2. Sign up with Microsoft account (create if needed)
3. Add project: "theproductlab.in"
4. Install Clarity tracking code in Commerce.com dashboard (measurement ID: C-XXXXXXXXXX)

**Configuration (Dan):**
1. Enable session recording for all users
2. Set privacy: Mask sensitive data (passwords, credit cards) — auto-enabled
3. Enable heatmaps on: Homepage, Product Detail Page, Cart, Checkout, Collection Pages
4. Set daily recording limit: 100 sessions (covers ~10K daily visitors at 1% rate)

**Dashboards to monitor (Tobi after launch):**
- Rage clicks (users clicking repeatedly on same element — indicates confusion)
- Dead clicks (users clicking on non-clickable elements)
- Scroll depth on Opinion Wall (key new-direction data point)
- User flow: Where users spend time, where they drop off

### 2.5 Email & SMS Integration — Klaviyo or Mailchimp + WhatsApp

**Option A: Klaviyo (Recommended for ecommerce)**

**Setup (Dan, 30 mins):**
1. Go to https://www.klaviyo.com
2. Sign up, connect to Commerce.com store
3. Klaviyo auto-syncs customers and purchases
4. Create SMS sender ID (Klaviyo handles MSG91 backend)

**Cost:** Free for first 500 contacts, ₹0–₹5K/month at scale.

**Flows to set up (Tobi after launch):**
- Welcome series (first purchase incentive)
- Abandoned cart (recovery at 1hr, 24hr)
- Order confirmation
- Shipping notification
- Post-purchase (cross-sell bundles)
- Re-engagement (inactive 30+ days)

**Option B: Mailchimp (Lower cost, feature-limited)**

**Setup (Dan, 20 mins):**
1. Go to https://mailchimp.com
2. Sign up, connect to Commerce.com
3. Configure SMS through Message Bird integration (₹0.50–₹1 per SMS)

**Cost:** Free for <500 contacts, ₹0–₹2K/month.

**Recommendation:** Start with **Mailchimp** (lower overhead). Upgrade to Klaviyo if automation becomes bottleneck.

**WhatsApp Business Integration (Tobi + Dan, 1 hour):**

**Goal:** Send order confirmations, shipping updates, and promotional messages via WhatsApp (primary channel in India).

1. Set up Meta Business Account (for WhatsApp Business API)
2. Register business phone number with Meta
3. Create WhatsApp Business Account
4. Request approval for message templates:
   - "Order Confirmation" template
   - "Shipping Update" template
   - "Abandoned Cart" template
5. Install WhatsApp integration in Klaviyo/Mailchimp
6. Trigger messages on purchase, shipment, abandoned cart

**Cost:** ₹0.50–₹1 per message (meta rates, passed through Klaviyo).

**Configuration:**
- Enable opt-in messaging on checkout (required by law)
- Message scheduling: 9 AM – 9 PM IST only (user preference)

---

## 3. Product Catalog Setup

### 3.1 Collection Structure

Create these collections in Commerce.com:

| Collection | Slug | Description | Hero Image | Featured Products |
|------------|------|-------------|------------|-------------------|
| Your Card Has a Personality | /collections/your-card-has-a-personality/ | Your card has a personality. | TBD | Top 3 best sellers |
| No Filter | /collections/no-filter/ | Attitude keychains, lapel pins, humor stickers. | TBD | Top 3 best sellers |
| Best Sellers | /collections/best-sellers/ | The ones that keep selling. | TBD | Manually curated 12–16 |
| New In | /collections/new-in/ | Last 30 days. | TBD | Auto-populates |
| The Drop | /collections/the-drop/ | Limited. Seasonal. | TBD | Current/next drop |
| Gifting | /gifts/ | Gifts for people with opinions. | TBD | Pre-built gift sets |

**Dan's role:** Create collections in Commerce.com dashboard, upload hero images.

**Tobi's role:** Verify collection pages load correctly, featured products display, Sticker Wall layout renders, filters work.

### 3.2 Product Naming & SEO Slug Convention

**Naming pattern:** [Opinion] [Product Type] [Variant]

Examples:
- "No Filter Attitude Keychain — Red" → Slug: `/products/no-filter-attitude-keychain-red/`
- "Be Yourself Card Sticker Set" → Slug: `/products/be-yourself-card-sticker-set/`
- "Speak Up Lapel Pin — Gold" → Slug: `/products/speak-up-lapel-pin-gold/`

**Rules:**
- All lowercase
- Replace spaces with hyphens
- Remove special characters (keep & as "and")
- Max 60 characters
- Include primary keyword (card sticker, keychain, pin)

**Meta title:** [Product Name] — Small Objects. Big Opinions. (max 60 chars)
**Meta description:** [2-3 sentence opinion-driven description] (max 155 chars)

**Dan's role:** Enter product names and copy in Commerce.com.

**Tobi's role:** Verify slugs are SEO-friendly, meta tags display correctly in Google search preview.

### 3.3 Product Catalog Schema

Every product entry must include:

| Field | Example | Required |
|-------|---------|----------|
| Product Name | No Filter Attitude Keychain | Yes |
| SKU | TPL-AK-NF-RED-001 | Yes (inventory) |
| Collection | Attitude Keychains | Yes |
| Price (₹) | 249 | Yes |
| Cost of Goods | 80 | Yes (margin calc) |
| Description (short) | Carry your no-filter attitude. 2.5" keychain, durable silicone. | Yes |
| Description (long) | [100–150 word opinion + specs + care] | Yes |
| Images (primary) | product-photo-01.jpg (400x400px min) | Yes |
| Images (secondary) | 2–4 lifestyle/detail shots | Yes |
| Variants | Color (Red, Blue, Black), Size (if applicable) | If relevant |
| Tags | attitude, keychain, gift, under-500 | Yes |
| SEO title | No Filter Attitude Keychain — Wear Your Opinion | Yes |
| SEO description | Carry your no-filter attitude with this durable silicone keychain. Perfect for gifting or keeping your opinion on display. | Yes |
| Stock qty | 100 | Yes |
| Barcode (GTIN) | [13-digit barcode] | Optional (for larger retailers) |

**Dan's role:** Fill in product data in Commerce.com admin.

**Tobi's role:** Verify all fields populated, images optimized, slugs correct, schema valid.

### 3.4 Bundle Product Setup

Bundles are pre-curated collections sold as single SKU.

**Example bundle:**
- Name: "Starter Pack — Card Stickers + Attitude Keychain"
- Price: ₹499
- Includes:
  - 1x Card Stickers (full set, value ₹349)
  - 1x Attitude Keychain (value ₹249)
- Bundled saving: ₹99 discount (normal total ₹598)

**Setup in Commerce.com:**
1. Create "Bundle" product type (if available, else create as standard product with custom description)
2. Link child products (card sticker set + keychain)
3. Set bundle price (lower than sum of parts)
4. Describe bundle value in copy: "Save ₹99 when you bundle."

**Bundles to create (minimum):**
- Starter Bundle (₹399–₹449)
- Confidence Bundle (₹599–₹699)
- The Works Bundle (₹899–₹999)

**Dan's role:** Create bundles, write bundle copy.

**Tobi's role:** Test bundle add-to-cart, verify correct items included, price correct.

### 3.5 Drop Product Setup (Time-Limited)

The Drop: Limited seasonal products with countdown timer.

**Product structure:**
- Name: "Spring Drop 2026 — The Nomad Lapel Pin"
- Availability: Available [DATE] at 6 PM IST
- Stock: 200 units
- Price: ₹349
- Description: "A limited edition pin for the eternal wanderer. Available only this season. Sign up below for early access."

**Setup:**
1. Create product with "Coming Soon" status
2. Set pre-order start date/time
3. Display countdown timer on product page
4. Collect pre-orders (if applicable)
5. Publish product on exact date/time
6. Monitor stock, disable when sold out

**Dan's role:** Plan drop schedule, create product details, manage countdown messaging.

**Tobi's role:** Implement countdown timer (JavaScript or Commerce.com widget), test availability trigger at launch time, monitor stock in real-time.

### 3.6 Image Optimization Rules (Critical for Performance)

**All product images must:**
1. **Format:** WebP (primary), JPEG fallback
2. **File size:** <150KB per image (WebP), <300KB (JPEG)
3. **Resolution:** 400x400px (minimum), 1200x1200px (ideal for Retina)
4. **Primary image:** Must be hero/front view — shot on neutral cream or white surface (matches new canvas direction; do NOT shoot on dark backgrounds as primary)
5. **Secondary images:** Lifestyle (in use), detail (close-up), back view

**Tools (all free):**
- Image optimization: TinyPNG.com, Squoosh (Google), or ImageOptim
- WebP conversion: Squoosh, FFmpeg, or online converters
- Batch processing: If >50 products, Tobi creates ImageMagick script

**Example workflow:**
```
Raw photo (2000x2000px, 2.5MB JPEG)
  ↓ [Crop to 400x400px]
  ↓ [Compress to WebP, <150KB]
  ↓ [Create JPEG fallback, <300KB]
  ↓ [Upload to Commerce.com]
```

**Tobi's role:** Create image optimization checklist, batch-process all product images before launch.

---

## 4. Custom CSS & Theme Customization

### 4.1 Light+Bold Visual System Implementation

**Objective:** Apply Light+Bold / Organised Chaos system (cream canvas, off-black ink, red/yellow signal accents, Barlow Condensed + Inter fonts, new component layer) to Commerce.com storefront.

**Primary approach:** CSS overrides (Section 1.4 covers full CSS file).

**Secondary approach (if needed):** Custom HTML/JavaScript in theme template (only if Commerce.com doesn't support CSS customization).

### 4.2 New Component Implementations

These five components are Priority 1. They define the visual direction. The CSS base in Section 1.4 creates the token layer; these components use those tokens.

---

#### 4.2.1 Opinion Wall — Homepage Hero

**What it does:** Full-viewport, text-only above-fold section. Opinion phrases at varying sizes and opacities, staggered via nth-child transforms. No image requests above the fold — the LCP element is text, which renders instantly.

**LCP impact:** The Opinion Wall replaces the hero image as the above-fold experience. Text renders before images load. This is the primary mechanism for achieving <3s LCP on 4G mobile. Zero image bytes above the fold.

**Fynd path:** Implement as a custom Liquid section (`opinion-wall.liquid`) added to the homepage template. Commerce.com / Fynd supports custom sections in the theme editor. The section schema allows Dan to update opinion phrases without touching code.

**Implementation notes:**
- Full-viewport height using `100svh` (not `100vh` — `svh` corrects for iOS browser chrome collapse)
- Background: `var(--color-surface-base)` (cream #F5F0EB) — no dark background
- Opinion phrases in `.tpl-opinion-wall__inner` container: `display: flex; flex-wrap: wrap; align-content: center`
- Phrase sizes: `--text-opinion-xl` (18vw), `--text-opinion-lg` (14vw), `--text-opinion-md` (10vw), `--text-opinion-sm` (8vw)
- Opacity tiers: xl = 1.0 (fully legible), lg/md = 0.55 (supporting), sm = 0.22 (texture)
- Rotation via nth-child (deterministic, not random — same build = same layout):
  ```css
  .tpl-opinion-wall__phrase:nth-child(odd)  { transform: rotate(-2deg) translateY(0); }
  .tpl-opinion-wall__phrase:nth-child(even) { transform: rotate(1.5deg) translateY(-8px); }
  .tpl-opinion-wall__phrase:nth-child(3n)   { transform: rotate(-3.5deg) translateY(12px); }
  ```
- `will-change: transform` on each phrase — promotes to GPU layer, prevents repaint on scroll
- Skip link: `<a href="#first-product-section" class="tpl-skip-link">Skip to products</a>` — visible on focus, off-screen by default
- All decorative phrases: `aria-hidden="true"` on the inner container. The section itself has `aria-label="Homepage — brand statement"`
- Tagline (`small objects. big opinions.`) is NOT aria-hidden — it is the primary message

**Platform constraint:** Fynd's section schema (`settings_schema.json`) allows text field inputs. Map each opinion phrase to a schema input so Dan can update content via theme editor without code changes. Cap at 8 phrases maximum (layout tested to this limit).

**Mobile behavior:** Reduce to 6 phrases on mobile via CSS `display: none` on `.tpl-opinion-wall__phrase:nth-child(n+7)`. Two text layers maximum on 320px viewport.

---

#### 4.2.2 Sticker Wall Product Layout — Collection Pages

**What it does:** Replaces the standard CSS grid on collection pages. Products appear at slight angles with staggered baselines and visible shadows — the visual equivalent of a felt board or desk covered in stickers.

**Fynd path:** Implement as a CSS override on the collection product grid. Fynd renders the product grid as a CSS grid or flexbox container. Override with the Sticker Wall positioning system via custom class on the collection template.

**Implementation notes:**
- Container: CSS grid with gap `var(--space-2)` (8px) — tighter than standard grid
- Each product card: normal flow (NOT `position: absolute`) — this is critical for Fynd compatibility. Absolute positioning breaks Fynd's grid rendering and add-to-cart event bubbling.
- Stagger via `nth-child` CSS custom property injection:
  ```css
  .tpl-sticker-wall .product-card:nth-child(1)  { --tile-rotation: -1.5deg; margin-top: 0; }
  .tpl-sticker-wall .product-card:nth-child(2)  { --tile-rotation:  2deg;   margin-top: 12px; }
  .tpl-sticker-wall .product-card:nth-child(3)  { --tile-rotation: -0.8deg; margin-top: 6px; }
  .tpl-sticker-wall .product-card:nth-child(4)  { --tile-rotation:  1.2deg; margin-top: 18px; }
  .tpl-sticker-wall .product-card:nth-child(5)  { --tile-rotation: -2deg;   margin-top: 4px; }
  .tpl-sticker-wall .product-card:nth-child(6)  { --tile-rotation:  0.5deg; margin-top: 20px; }
  /* Pattern repeats with nth-child(6n+1), (6n+2), etc. */
  ```
- Apply rotation: `transform: rotate(var(--tile-rotation, 0deg));`
- Shadow: `box-shadow: var(--shadow-product);` — always on. The shadow creates the "placed on surface" depth against the cream background.
- Negative margin overlap: `margin-top: calc(var(--tile-offset, 0px) - 4px)` — slight overlap between rows. Keep overlap at 4–8px maximum to avoid covering product names.
- Rotation never exceeds 3 degrees on mobile (tighter to preserve readability on small screens). On desktop: up to 4 degrees.
- Hit targets: touch event area uses `padding: var(--space-2)` on the card container — the rotation is visual only, the tap zone remains rectangular and full-size.

**Platform constraint:** Fynd's collection page template renders product cards in a standard grid loop. The Sticker Wall styles are applied to the outer grid container class. No changes to individual product card Liquid code are needed — the CSS does the work.

---

#### 4.2.3 Record Store Browse — Horizontal Scroll Section

**What it does:** A horizontally scrolling row of large collection cards. Each card is 85vw wide, dark background, collection name at very large type. The visual metaphor is flipping through record sleeves in a bin.

**When used:** Homepage (between Opinion Wall and Best Sellers sections). Optional use on /collections/ index page.

**Fynd path:** Implement as a custom Liquid section (`record-store-browse.liquid`). Fynd's homepage builder supports custom sections. The schema allows Dan to configure which collections appear and their display names.

**Implementation notes:**
- Container: `overflow-x: scroll; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;`
- Hide scrollbar cross-browser: `scrollbar-width: none;` (Firefox) + `::-webkit-scrollbar { display: none; }` (Chrome/Safari)
- Each card: `scroll-snap-align: start; flex-shrink: 0; width: 85vw;`
- Card background: `var(--color-surface-dark)` (#1A1A1A) — this is one of the legitimate uses of the dark surface in the Light+Bold direction
- Collection name typography: `font-size: clamp(2rem, 18vw, 7rem)` — scales from 32px on small phone to 112px on desktop, but capped at 112px. This is the single instance of a clamp-based size outside the standard token system.
- Collection name color: `var(--color-text-on-dark)` (#F5F0EB) — cream text on dark card
- Card padding: `var(--space-6)` (24px) all sides
- Card height: 260px mobile, 320px desktop
- Product count label: `var(--font-mono)`, `var(--text-caption)`, `var(--color-text-on-dark)`, opacity 0.6, bottom of card
- Arrow or swipe indicator: small chevron at card right edge, `var(--color-text-on-dark)`, opacity 0.4

**Performance:** No images in this section. Text-only cards. Negligible render cost.

**Accessibility:**
- Container: `role="region"` `aria-label="Browse collections"`
- Each card: `<a>` wrapping the full card, `aria-label="Browse [Collection Name] — [X] products"`
- Keyboard: cards are focusable and navigable with Tab + Enter

---

#### 4.2.4 Counter Display Tile — Drop and Limited Edition Products

**What it does:** A product tile with a large count display (remaining stock) and a two-tap add-to-cart interaction. Used specifically for The Drop section and limited-edition products where scarcity is a purchase signal.

**Fynd path:** Implement as a specialized variant of the product card, activated via a product tag (`drop-limited` or `counter-display`). When Fynd renders a product with this tag in The Drop section, the Counter Display Tile template is used instead of the standard card.

**Implementation notes:**
- CSS custom property `--tile-rotation` controls the tilt angle. For Drop products, set to a fixed value per position (e.g., `-2deg` for first tile, `1.5deg` for second).
- Rotation application: `transform: rotate(var(--tile-rotation, 0deg));`
- Shadow: `var(--shadow-product)` at rest, `var(--shadow-product-hover)` on interaction
- `will-change: transform` declared on the tile — promotes to GPU composite layer. Critical for low-end Android. Remove `will-change` after the Pick Up animation completes (reset in the transitionend handler) to free GPU memory.

**Two-tap interaction — JavaScript implementation (<30 lines, no library):**

```javascript
// Counter Display Tile — two-tap add-to-cart
// Tap 1: reveal price + ADD button (Pick Up state)
// Tap 2: add to cart
// Total: ~28 lines

document.querySelectorAll('.tpl-counter-tile').forEach(tile => {
  let revealed = false;

  tile.addEventListener('click', function(e) {
    if (!revealed) {
      // First tap — lift and reveal
      tile.classList.add('tpl-counter-tile--lifted');
      tile.querySelector('.tpl-counter-tile__cta').setAttribute('aria-hidden', 'false');
      revealed = true;
      e.preventDefault(); // Don't navigate on first tap
    }
    // Second tap falls through to the ATC button click handler
  });

  // Reset on focus-out (user moved on)
  tile.addEventListener('focusout', function() {
    tile.classList.remove('tpl-counter-tile--lifted');
    tile.querySelector('.tpl-counter-tile__cta').setAttribute('aria-hidden', 'true');
    revealed = false;
  });
});
```

**`will-change` lifecycle management:**
```javascript
tile.addEventListener('transitionend', function(e) {
  if (e.propertyName === 'transform') {
    // Free GPU layer after animation completes
    tile.style.willChange = tile.classList.contains('tpl-counter-tile--lifted')
      ? 'transform'  // Keep during lifted state
      : 'auto';      // Release when settled
  }
});
```

**Platform constraint:** The Fynd add-to-cart API must be called on the second tap. Use Fynd's native add-to-cart endpoint rather than a custom implementation. Map the product variant ID from the Liquid template.

---

#### 4.2.5 Pick Up Interaction State

**What it does:** When a customer touches or hovers over a product in the Sticker Wall or Counter Display layouts, the product "lifts" from the surface. An opinion text overlay fades in. The metaphor: picking a record out of the bin.

**CSS implementation (GPU-accelerated, no JavaScript for the base effect):**

```css
/* Default: product at rest on the cream surface */
.tpl-sticker-wall .product-card,
.tpl-counter-tile {
  transform: rotate(var(--tile-rotation, 0deg));
  box-shadow: var(--shadow-product);
  transition:
    transform var(--transition-fast),
    box-shadow var(--transition-fast),
    z-index 0s;
  will-change: transform;
  position: relative;
  z-index: 1;
}

/* Lifted state — scale up, shadow deepens, rises above neighbours */
.tpl-sticker-wall .product-card:hover,
.tpl-sticker-wall .product-card:focus-within,
.tpl-counter-tile--lifted {
  transform: rotate(var(--tile-rotation, 0deg)) translateY(-4px) scale(1.05);
  box-shadow: var(--shadow-product-hover);
  z-index: 10;
  transition:
    transform var(--transition-fast),     /* 150ms ease-out — fast lift */
    box-shadow var(--transition-fast);
}

/* Settle back — slightly slower on the way down (gravity) */
.tpl-sticker-wall .product-card:not(:hover):not(:focus-within),
.tpl-counter-tile:not(.tpl-counter-tile--lifted) {
  transition:
    transform var(--transition-settle),   /* 250ms ease-in — deliberate settle */
    box-shadow var(--transition-settle);
}

/* Opinion text overlay — appears on lift */
.product-card__opinion-overlay {
  position: absolute;
  inset: 0;
  background: rgba(245, 240, 235, 0.88);  /* Cream at 88% opacity */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-4);
  opacity: 0;
  transition: opacity var(--transition-fast);
  pointer-events: none;  /* Doesn't block the card link */
}

.product-card:hover .product-card__opinion-overlay,
.product-card:focus-within .product-card__opinion-overlay {
  opacity: 1;
}

.product-card__opinion-text {
  font-family: var(--font-heading);
  font-weight: var(--weight-bold);
  font-size: clamp(1rem, 5vw, 1.5rem);
  text-transform: uppercase;
  letter-spacing: var(--tracking-opinion);
  line-height: var(--leading-opinion);
  color: var(--color-text-primary);
  text-align: center;
}
```

**Performance rules:**
- Only `transform` and `box-shadow` are animated — both are GPU-composited properties. No layout properties (width, height, top, left) are animated.
- `will-change: transform` is set at rest. After `transitionend`, reset to `auto` if the card is not hovered (see Counter Display Tile JS above for the pattern — apply same lifecycle to Sticker Wall cards).
- On low-end Android: test with Chrome DevTools → Performance → 6x CPU throttle. Frame rate must stay above 50fps during the Pick Up animation. If it drops below 50fps, disable the opinion text overlay (simpler: just the scale + shadow transition survives without the overlay).
- Mobile touch: `touchstart` triggers the hover state via CSS `:active` — no JavaScript needed for the base lift effect.

**Neighbour isolation:** Neighbouring products do NOT move when one lifts. The lifted product uses `z-index: 10` to appear above neighbours without pushing them.

---

### 4.3 Font Loading (Critical for Performance)

**Fonts must load from Google Fonts (CDN):**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=Inter:wght@400;500&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
```

**CSS font loading:**
```css
h1, h2, h3, h4, h5, h6 {
  font-family: 'Barlow Condensed', system-ui, sans-serif;
  font-display: swap;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  font-display: swap;
}
```

**Why:** `font-display: swap` prevents invisible text during load (improves CLS, Core Web Vital).

**Tobi's role:** Add Google Fonts link, verify `font-display: swap` in CSS, test font loading on 4G.

---

## 5. Performance Requirements — <3s LCP on 4G

### 5.1 LCP (Largest Contentful Paint) Target: <3 seconds

**Why:** 80%+ of TPL users on mobile, 4G network, India. Pages must load fast or bounce rate increases 40%.

**LCP element on each page — updated for new direction:**
- Homepage: Opinion Wall text (above fold — zero image requests = direct LCP improvement). The LCP element is a `<span>` with the primary opinion phrase. Text renders before any image.
- PDP: Product image (above fold)
- Cart: Cart summary section
- Collections: First product image in Sticker Wall (lazy-loaded except row 1)

**Homepage LCP improvement from new direction:** The Opinion Wall eliminates the hero image as an LCP bottleneck. Text is render-blocking only by fonts. With `font-display: swap`, the system font renders immediately. LCP target for the homepage is now achievable at <2s on 4G mobile.

### 5.2 Image Optimization

**Rules:**
1. **All product images:** Max 150KB (WebP), max 300KB (JPEG)
2. **Hero images:** None above fold on homepage (Opinion Wall is text-only)
3. **Format:** Serve WebP to modern browsers, JPEG to older browsers
   ```html
   <picture>
     <source srcset="image.webp" type="image/webp">
     <img src="image.jpg" alt="Product">
   </picture>
   ```
4. **Responsive images:** Serve different sizes for mobile/desktop
   ```html
   <img
     src="image-400.webp"
     srcset="image-400.webp 400w, image-800.webp 800w"
     sizes="(max-width: 768px) 100vw, 50vw"
     alt="Product">
   ```
5. **Lazy loading:** Non-above-fold images lazy-load
   ```html
   <img src="..." loading="lazy" alt="...">
   ```
6. **First row of Sticker Wall:** `loading="eager"` `fetchpriority="high"` on the first 2–4 visible cards.

**Tobi's role:** Create image optimization checklist, script to convert and compress all images, test on throttled 4G.

### 5.3 Critical CSS (Above-The-Fold)

**Inline critical CSS in `<head>` (no file download needed):**

```css
:root {
  --color-surface-base: #F5F0EB;
  --color-text-primary: #1A1A1A;
  --color-accent-primary: #E63B2E;
  --font-heading: 'Barlow Condensed', system-ui, sans-serif;
  --tracking-opinion: -0.03em;
  --leading-opinion: 0.92;
}

body {
  background-color: var(--color-surface-base);
  color: var(--color-text-primary);
  font-family: system-ui;  /* Fallback while Inter loads */
  margin: 0;
}

/* Opinion Wall — renders immediately, no image dependency */
.tpl-opinion-wall {
  background-color: var(--color-surface-base);
  height: 100svh;
  overflow: hidden;
}
```

**Defer non-critical CSS:** Animations, hover states, Sticker Wall rotations, Pick Up interaction can load async.

### 5.4 Font Loading Optimization

Already covered in Section 4.3, but emphasize:
- Use system font stack as fallback (prevent FOIT/FOUT)
- Load fonts from Google Fonts CDN (cached globally)
- Use `font-display: swap`

### 5.5 Lazy Loading & Asset Prioritization

**Load order:**
1. **Render-blocking:** HTML + critical CSS (inline)
2. **High priority:** Above-fold text content (Opinion Wall phrases), Inter font, Barlow Condensed font
3. **Medium priority:** Below-fold images (lazy), non-critical CSS, Sticker Wall rotation styles
4. **Low priority:** Analytics scripts, tracking pixels, social embeds, Pick Up JS

**Commerce.com native support:** Most ecommerce platforms auto-lazy-load below-fold images. Verify in dashboard settings.

### 5.6 Third-Party Script Optimization

**Scripts to defer/async:**
- GA4 (use async)
- Microsoft Clarity (use async)
- WhatsApp Business (use async)
- Social embeds (use async)

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script async src="https://clarity.ms/tag/c-XXXXXXXXXX"></script>
```

**Tobi's role:** Ensure all tracking scripts marked async, test LCP with Chrome DevTools (throttle to 4G), target <3s.

### 5.7 Performance Testing Checklist

**Before launch, Tobi must verify:**
1. Homepage LCP <3s (4G throttled, Android device) — Opinion Wall text must be the LCP element
2. PDP LCP <3s (4G throttled, Android device)
3. Cart page LCP <3s (4G throttled)
4. All product images load in WebP (or fallback to JPEG)
5. No layout shift (CLS <0.1) — Sticker Wall nth-child offsets must not cause reflow
6. No blocking scripts (FID <100ms)
7. No jank on scroll (frame rate >50fps), specifically during Pick Up interaction
8. Pick Up animation stays above 50fps on 6x CPU throttle (Chrome DevTools)
9. Opinion Wall skip link appears on keyboard focus (accessibility)
10. Sticker Wall tap targets minimum 44x44px despite rotation

**Tools:**
- Chrome DevTools (Lighthouse tab)
- WebPageTest.org (simulate 4G)
- GTmetrix.com (visual timeline)

---

## 6. Build Sequence & Dependencies

### 6.1 Build Tasks (Ordered)

| Task # | Task Name | Owner | Effort | Dependencies | Blocking |
|--------|-----------|-------|--------|--------------|----------|
| 1 | Store creation & initial setup | Dan | 0.5h | — | No |
| 2 | Razorpay account & API keys | Dan | 0.5h | Task 1 | No |
| 3 | Shiprocket account & API keys | Dan | 0.5h | Task 1 | No |
| 4 | Commerce.com integrations (Razorpay, Shiprocket) | Dan | 0.5h | Tasks 2, 3 | No |
| 5 | GA4 setup & measurement ID | Dan | 0.5h | — | No |
| 6 | Microsoft Clarity setup | Dan | 0.25h | — | No |
| 7 | Klaviyo/Mailchimp account & WhatsApp integration | Dan | 1h | — | No |
| 8 | CSS base theme file (tokens + existing components) | Tobi | 2h | Design system (Phase 3) | No |
| 9 | Opinion Wall component (Liquid section + CSS) | Tobi | 3h | Task 8 | No |
| 10 | Sticker Wall layout (CSS + nth-child system) | Tobi | 3h | Task 8 | No |
| 11 | Record Store Browse (horizontal scroll section) | Tobi | 2h | Task 8 | No |
| 12 | Counter Display Tile + Pick Up interaction (CSS + JS) | Tobi | 3h | Tasks 8, 10 | No |
| 13 | CSS theme file upload to Commerce.com | Dan | 0.25h | Task 8 | No |
| 14 | Homepage setup & content entry (Opinion Wall live) | Dan | 2h | Tasks 9, 13 | No |
| 15 | Collection pages setup (4 collections, Sticker Wall) | Dan | 2h | Tasks 10, 13 | No |
| 16 | Product image optimization & batch processing | Tobi | 4h | Hero product list | No |
| 17 | Product catalog data entry (50+ products) | Dan | 6h | Product list, Task 16 | Yes |
| 18 | Bundle product setup (3–5 bundles) | Dan | 1h | Task 17 | No |
| 19 | The Drop page setup & countdown timer + Counter Tile | Tobi | 2h | Tasks 12, 13 | No |
| 20 | Custom CSS testing (colors, fonts, responsive, new components) | Tobi | 2h | Tasks 9–12 | No |
| 21 | Image optimization verification | Tobi | 1h | Task 16 | No |
| 22 | Performance testing (LCP, CLS, FID, Pick Up animation) | Tobi | 2h | Tasks 14, 17 | Yes |
| 23 | GA4 custom events implementation | Tobi | 3h | Task 5 | No |
| 24 | Microsoft Clarity heatmap setup | Tobi | 0.5h | Task 6 | No |
| 25 | Klaviyo/Mailchimp email flow templates | Tobi | 2h | Task 7 | No |
| 26 | Razorpay test mode transactions | Dan + Tobi | 1h | Task 4 | No |
| 27 | Shiprocket test orders | Dan + Tobi | 1h | Task 4 | No |
| 28 | Full end-to-end test (checkout flow) | Dan + Tobi | 1h | Tasks 26, 27 | Yes |
| 29 | Staging store review (pre-launch QA) | Tobi + James | 2h | Task 28 | Yes |
| 30 | Final go/no-go decision | Harley + Dan | 0.25h | Task 29 | Yes |

### 6.2 Critical Path (Minimum Time to Launch)

**Fastest possible timeline (no parallelization gaps):**
1. **Day 1 (Fri):** Tasks 1–7 (accounts & integrations)
2. **Day 2 (Sat):** Tasks 8–12 (CSS base + 5 new components), Task 13 (upload)
3. **Day 3 (Sun):** Tasks 14–15 (homepage + collections), Task 16 (image optimization)
4. **Day 4 (Mon):** Tasks 17–19 (product data, bundles, drop page)
5. **Day 5 (Tue):** Tasks 20–22 (testing, performance)
6. **Day 6 (Wed):** Tasks 23–28 (analytics, email, testing)
7. **Day 7 (Thu):** Tasks 29–30 (staging QA, go/no-go)

**Estimated total effort:** 53 hours (up from 45h due to 5 new component implementations)
- Tobi: 28 hours (tech + testing + new components)
- Dan: 22 hours (setup + data entry)
- James: 3 hours (QA + sign-off)

**The 8-hour increase is concentrated in Tasks 9–12 (new components).** These are the Opinion Wall, Sticker Wall, Record Store Browse, and Counter Display / Pick Up. No other tasks have changed materially.

### 6.3 Parallelizable Tasks

**These can happen in parallel (no dependencies):**
- Tasks 2 & 3 (Razorpay + Shiprocket account creation)
- Tasks 5, 6, 7 (GA4, Clarity, Klaviyo setup)
- Tasks 8–12 (CSS creation) while Dan does Tasks 1–7
- Task 16 (image optimization) while Dan works on Task 17

**Recommended parallelization:**
- **Tobi:** Tasks 8–12, 16, 19–25 (tech work)
- **Dan:** Tasks 1–7, 14, 15, 17, 18 (setup + data)
- **Both:** Tasks 26–29 (testing)

### 6.4 Blocking Tasks

**Do NOT start these until dependencies complete:**
- Task 14 (homepage) — blocked until Opinion Wall Liquid section is complete (Task 9)
- Task 15 (collection pages) — blocked until Sticker Wall CSS is complete (Task 10)
- Task 17 (product data entry) — blocked until images optimized (Task 16)
- Task 22 (performance testing) — blocked until products live
- Task 28 (end-to-end testing) — blocked until Razorpay + Shiprocket test (Tasks 26, 27)
- Task 30 (go/no-go) — blocked until staging passes QA (Task 29)

---

## 7. Staging Environment Setup

### 7.1 What is a Staging Store?

A staging store is a **duplicate of production** for testing before launch. All functionality is identical, but real customers cannot access it.

**Benefits:**
- Test checkout without real transactions
- Test payment flows (Razorpay, COD)
- Verify all products load correctly
- Test analytics event firing
- Test email flows
- Test all 5 new components on actual devices (Opinion Wall, Sticker Wall, Record Store Browse, Counter Display, Pick Up)
- Identify bugs before real customers see them

### 7.2 Creating a Staging Store in Commerce.com

**Option A: Duplicate store (if Commerce.com supports)**
1. In Commerce.com dashboard, go to Settings → Advanced
2. Click "Duplicate Store"
3. Name it "The Product Lab - Staging"
4. This creates a full copy (products, settings, integrations)

**Option B: Manual staging (if no duplicate feature)**
1. Create new store: "The Product Lab - Staging"
2. Manually configure integrations (Razorpay TEST mode, Shiprocket, GA4)
3. Upload all products again (or ask Fynd support for bulk import)

### 7.3 Staging Store Configuration

**Razorpay:** Enable TEST mode (automatic, Razorpay provides test credentials)

**Shiprocket:** Create test warehouse (optional, or use same production warehouse)

**GA4:** Create new GA4 property "TPL - Staging" (separate from production)

**URL:** Typically `staging-theproductlab.commerce.com` or similar

**Credentials:** Share staging URL + admin login with Tobi + James for QA.

### 7.4 Testing in Staging

**Full checkout flow (Tobi + James):**
1. Add product to cart
2. Proceed to checkout
3. Enter test customer details
4. Select payment method (UPI, card, COD)
5. Complete Razorpay payment (use test card)
6. Verify order confirmation page
7. Verify order created in Shiprocket
8. Verify shipping label generated
9. Verify order confirmation email sent
10. Verify GA4 purchase event fires

**Each payment method must be tested separately:**
- UPI (use testmerchant@razorpay)
- Visa (use 4111 1111 1111 1111)
- Mastercard (use 5555 5555 5555 4444)
- COD (order value >₹299)

**New component testing (Tobi must verify on actual Android device, not emulator):**
- Opinion Wall: renders correctly on 375px, skip link appears on Tab, phrases visible and readable
- Sticker Wall: nth-child rotations render correctly, Pick Up animation at 50+fps, tap targets hit correctly despite rotation
- Record Store Browse: horizontal scroll works on iOS Safari and Android Chrome, snap points activate
- Counter Display Tile: two-tap interaction works, `will-change` releases after animation
- Pick Up: scale + shadow transition at 50+fps on mid-range Android (use Chrome DevTools 4x CPU throttle)

**Browser/device testing:**
- Mobile (Android + iOS, Chrome + Safari)
- Desktop (Chrome, Firefox, Safari)
- Screen sizes: 375px, 768px, 1024px (responsive)

**Regression testing:**
- Verify all pages load (homepage, collections, PDP, cart, checkout)
- Verify all products display correctly
- Verify collection filters work
- Verify search works
- Verify social share buttons work
- Verify 404 page works

### 7.5 Sign-Off Checklist

**Before James signs off, all of the following must pass:**

- [ ] Homepage LCP <3s (4G throttled, Android)
- [ ] PDP LCP <3s (4G throttled, Android)
- [ ] Opinion Wall: text-only above fold, zero image requests before first scroll
- [ ] Sticker Wall: products visible at correct angles, Pick Up works on touch
- [ ] Record Store Browse: horizontal scroll functional on iOS + Android
- [ ] Counter Display Tile: two-tap interaction, stock count visible
- [ ] Pick Up animation: 50+fps on mid-range Android (Redmi 10 or equivalent)
- [ ] All payment methods: UPI, card, COD tested and working
- [ ] Shiprocket: order creation and label generation working
- [ ] GA4: standard events firing (page_view, purchase)
- [ ] Clarity: sessions recording
- [ ] Skip link: visible on keyboard focus on Opinion Wall
- [ ] Aria attributes correct on all new components
- [ ] No layout shift (CLS <0.1) across all pages
- [ ] 404 page styled correctly
