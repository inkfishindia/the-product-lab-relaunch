# The Product Lab Platform and Tooling

## 1. Primary Commerce Platform

**Commerce.com (Fynd Platform)**

Indian-native commerce platform. Chosen over Shopify for:

- India-first payment infrastructure (Razorpay, Paytm, UPI native)
- Built-in Indian shipping integrations (Shiprocket, Delhivery, BlueDart, Ecom Express)
- COD support as a first-class feature
- GST-compliant invoicing
- INR pricing without currency conversion overhead
- Indian CDN and hosting for faster load times domestically
- Lower total cost of ownership vs Shopify + Indian plugin stack

### Platform Evaluation Checklist (for Tobi to validate)

- [ ] Theme customization depth — can we build a distinctive storefront or are we template-locked?
- [ ] API access — headless capability if needed for custom frontends
- [ ] Collection and catalog management flexibility
- [ ] Bundle and combo product support
- [ ] Discount and promotion engine sophistication
- [ ] Analytics and event tracking integration capability
- [ ] Email/SMS integration (native or via API)
- [ ] SEO control (meta tags, URL structure, sitemap, schema markup)
- [ ] Multi-image and video support on PDPs
- [ ] Blog/editorial content capability
- [ ] Checkout customization options
- [ ] Mobile app or PWA capability
- [ ] Abandoned cart recovery
- [ ] Customer account and order history
- [ ] Inventory sync and multi-location support

### Fallback

If Commerce.com cannot support the experience requirements defined in Phase 3, the Build Lead (Tobi) will recommend alternatives with a migration plan. Possible fallbacks:

- Shopify India (higher cost, stronger ecosystem)
- WooCommerce (more control, higher maintenance)
- Custom headless build on Commerce.com API (more dev effort)

## 2. Tool Stack by Function

### Analytics and Measurement (Avinash owns)

| Tool | Purpose |
|---|---|
| Google Analytics 4 | Site analytics, funnel tracking, attribution |
| Microsoft Clarity | Session recordings, heatmaps (free) |
| Google Search Console | SEO performance, indexing |
| Commerce.com native analytics | Sales, orders, inventory dashboards |
| Google Looker Studio | Custom dashboards, cross-source reporting |

### Email and SMS (Chase owns)

| Tool | Purpose |
|---|---|
| Klaviyo or Mailchimp | Email flows, campaigns, segmentation |
| MSG91 or Gupshup | SMS and WhatsApp Business API (India-native) |
| Commerce.com email (if available) | Transactional emails |

### Paid Media (Andrew owns)

| Tool | Purpose |
|---|---|
| Meta Ads Manager | Facebook and Instagram ads |
| Google Ads | Search, Shopping, YouTube, Performance Max |
| Meta Pixel + CAPI | Conversion tracking |
| Google Ads conversion tracking | Purchase and event tracking |
| UTM framework | Campaign attribution |

### Social Media (Rachel owns)

| Tool | Purpose |
|---|---|
| Instagram (primary) | Visual brand presence, Reels, Stories, Shop |
| YouTube | Shorts, product videos, brand content |
| WhatsApp Business | Community, customer communication |
| X / Twitter | Brand voice, trending moments |
| Pinterest | Product discovery, lifestyle boards |
| Buffer or Later | Scheduling and planning |

### Design and Creative (Sean + Casey own)

| Tool | Purpose |
|---|---|
| Figma | UI design, design system, prototyping |
| Canva | Quick social assets, campaign graphics, templates |
| Adobe Lightroom | Photo editing |
| CapCut or DaVinci Resolve | Video editing |
| Unsplash / locally sourced | Stock and lifestyle photography |

### Content and Copy (Joanna owns)

| Tool | Purpose |
|---|---|
| Google Docs | Copy decks, editorial drafts |
| Notion or Google Sheets | Content calendar, copy inventory |
| Grammarly | Copy polish |

### Project Management (Claire owns)

| Tool | Purpose |
|---|---|
| Notion | Project hub, decision logs, task tracking, knowledge base |
| Google Drive | File storage, shared assets |
| Slack or Discord | Agent communication (simulated or real-time) |

### Customer Research (Weiss owns)

| Tool | Purpose |
|---|---|
| Google Forms / Typeform | Surveys |
| Social listening (manual) | Instagram comments, Reddit, Twitter |
| Review mining | Commerce.com reviews, Google reviews |

### Shipping and Logistics (Raj owns)

| Tool | Purpose |
|---|---|
| Shiprocket | Multi-carrier shipping aggregation |
| Delhivery | Direct integration if volume justifies |
| Commerce.com shipping module | Native order fulfillment |
| Pin code serviceability checker | Delivery coverage validation |

### Payments (Raj + Patrick own)

| Tool | Purpose |
|---|---|
| Razorpay | Payment gateway (UPI, cards, wallets, netbanking) |
| COD via shipping partner | Cash on delivery |
| Razorpay Affordability Suite | EMI, Pay Later options |

### Finance (Patrick owns)

| Tool | Purpose |
|---|---|
| Google Sheets or Zoho Books | P&L tracking, margin analysis |
| Razorpay Dashboard | Payment reconciliation |
| Commerce.com order reports | Revenue and refund tracking |

### Customer Support (Tony owns)

| Tool | Purpose |
|---|---|
| Freshdesk or Zoho Desk | Ticketing, SLA tracking |
| WhatsApp Business | Direct customer communication |
| Commerce.com order system | Order lookup, status updates |

## 3. Integration Architecture

```
Commerce.com (storefront + catalog + orders)
├── Razorpay (payments)
├── Shiprocket (shipping)
├── GA4 + Clarity (analytics)
├── Meta Pixel + CAPI (ad tracking)
├── Google Ads (ad tracking)
├── Klaviyo/Mailchimp (email)
├── MSG91/Gupshup (SMS + WhatsApp)
├── Freshdesk (support)
└── Google Sheets/Zoho (finance)
```

## 4. Technical Constraints

- Mobile-first: 80%+ Indian ecommerce traffic is mobile
- Page speed: target < 3s LCP on 4G connections
- Image optimization: WebP format, lazy loading mandatory
- COD: must be supported; expect 40-60% COD orders initially
- UPI: fastest growing payment method, must be frictionless
- Vernacular readiness: English-first, but Hindi/regional language support may be needed for ads and social
- WhatsApp: primary communication channel for Indian customers, not email

## 5. Cost Tier

All tool selections should target the free or starter tier. This is a bootstrapped one-person company. No tool should exceed ₹5,000/month unless it directly generates measurable revenue.

Priority order when budget is limited:
1. Commerce platform (required)
2. Payment gateway (required)
3. Shipping aggregator (required)
4. Analytics (free tier)
5. Email tool (free tier to start)
6. Design tools (Figma free + Canva free)
7. Everything else scales with revenue
