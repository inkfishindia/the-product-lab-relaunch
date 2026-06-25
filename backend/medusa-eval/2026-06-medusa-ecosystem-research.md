# Medusa.js Ecosystem Research — Mid-2026

**Date:** 2026-06-06  
**Scope:** Indian D2C brand readiness assessment for The Product Lab  
**Author:** Harley (Program Director)  
**Status:** Complete  

---

## Executive Summary

- **Medusa v2 is production-stable.** At v2.15.5 (June 2026), the platform has matured significantly since the v2 rewrite landed in late 2024. The modular architecture, TypeScript codebase, and admin dashboard are genuinely solid. However, it remains a developer-first platform — not a no-code solution.
- **India readiness is partial, not native.** Medusa has built-in multi-currency and multi-region support (INR works as a currency), but there is no India-specific tax provider, no GST configuration, no Indian shipping zone presets, and no Shiprocket plugin. Everything India-specific requires custom development.
- **Razorpay works on v2 via community plugins.** `@devx-commerce/razorpay` and `SGFGOV/medusa-payment-plugins` provide Razorpay support for Medusa v2 with UPI, cards, netbanking, and INR. These are community-maintained — not official. COD can be handled via the `medusa-payment-manual` plugin pattern.
- **Shiprocket integration requires custom build.** There is no off-the-shelf Shiprocket plugin for Medusa. The Shiprocket API is well-documented (REST, token-based auth), and several agencies offer Shiprocket + Razorpay integration as a service. Expect 1-2 weeks of dev time to build and test.
- **Best as a Day-30 migration target, not a launch platform.** For The Product Lab's context (solo founder, under 100 orders/month, Indian market), Medusa's developer overhead outweighs its benefits at launch. It is viable as a post-launch migration once Fynd/Commerce.com constraints become limiting, but Day 1 on Medusa would consume engineering budget better spent on brand, product, and marketing.

---

## 1. Current Medusa Version & Stability

**Latest stable: v2.15.5** (published June 1, 2026 on npm; `@medusajs/js-sdk` at v2.15.5, `@medusajs/medusa` at v2.15.3).

- **Release cadence:** Very active — 157 releases on GitHub, with frequent patch releases. Recent releases include v2.13.6 (Apr 8), v2.15.2 (May 13), v2.15.5 (Jun 1).
- **GitHub:** 34.1k stars, 4.6k forks, 10.4k dependents, 186 watching. One of the most active open-source commerce projects.
- **V2 maturity:** v2 was released as stable in late 2024. The RC phase ended ~20 months ago. Multiple production deployments confirmed (Heineken, Mitsubishi, Mech Moscow fashion brand).
- **Breaking changes:** Still happening — the monorepo restructure (`dtc-starter` replacing `nextjs-starter-medusa`), Zod schema upgrades, React 19 support in icons package, HTTP type renames. The upgrade pace is high; you need to follow release notes.
- **Upgrade path:** Documented upgrade guides at `docs.medusajs.com/learn/update`. Breaking changes are flagged in release notes. The `create-medusa-app` CLI now creates monorepo projects using `dtc-starter`.

**Verdict:** Stable and production-ready for teams with Node.js/TypeScript expertise. Not for teams that can't keep up with a fast-moving codebase.

---

## 2. India Readiness

**Currency:**
- Multi-currency is built-in — any currency code works, including INR.
- Price lists can be defined per currency per region.
- A "Repository-wide Currency" feature was recently added (v2.15.x), improving multi-currency handling.

**Taxes:**
- Medusa has a tax provider system that uses regions. The **default tax provider** calculates basic rates, but it is not India-specific.
- **No GST support out of the box.** GST (CGST, SGST, IGST) requires a custom tax provider module. Agencies like Intuio have built custom tax calculation modules for Medusa, but nothing pre-built for India.
- HSN/SAC code mapping, GSTIN collection at checkout, and e-invoicing would all require custom work.

**Shipping:**
- Regions support shipping options per zone, but there are no Indian shipping zone presets.
- India pin code-based shipping (pincode serviceability, zone-based rates) requires custom logic.
- A GitHub discussion (Oct 2025) confirms: no India-specific shipping plugins exist. The Medusa team recommended custom development.

**Verdict:** INR works as a currency. Everything else (GST, India tax, Indian shipping zones, pincode validation) is DIY. Estimate 2-4 weeks of custom development for India-specific commerce logic.

---

## 3. Razorpay Integration

**Available options for Medusa v2:**

| Plugin | Maintainer | Status | Features |
|--------|-----------|--------|----------|
| `@devx-commerce/razorpay` | Community | Active on npm | UPI, cards, netbanking, wallets, refunds, webhooks, auto-capture, multi-currency |
| `SGFGOV/medusa-payment-plugins` (Razorpay V2) | Community (SGFTech) | Active on GitHub | UPI, NetBanking, wallets, cards, EMI, INR support |
| `medusa-payment-razorpay` | Community | Published (v1.0.0) | Basic Razorpay support (v1 era) |

- **`@devx-commerce/razorpay`** is the most promising — it follows Medusa v2's module-based payment provider pattern, supports webhooks, and has proper TypeScript types. Installed via:
  ```
  npm install @devx-commerce/razorpay
  ```
  Configured in `medusa-config.js` under the `payment` module providers array.

- **`SGFGOV/medusa-payment-plugins`** is a monorepo with Razorpay V2 and BTCPay plugins. Well-documented, TypeScript, production-focused.

**Risk:** Both are community-maintained. No official Medusa-backed Razorpay plugin. If the maintainer abandons the project, you own the code.

**Verdict:** Razorpay integration is workable and reasonably well-maintained by the community. Budget for maintenance risk.

---

## 4. Shiprocket Integration

**Status:** No existing Medusa plugin for Shiprocket.

- Shiprocket has a well-documented REST API (`apidocs.shiprocket.in`) with token-based auth, rate calculation, order creation, label generation, tracking, and COD support.
- ArkOne Softwares advertises Medusa + Shiprocket + Razorpay integration as a service, suggesting custom integration is the norm.
- ConstaCloud's "Commercium" offers a Medusa-Shiprocket connector (third-party middleware), not a native plugin.
- AfterShip provides a Shiprocket tracking API wrapper but that's tracking-only, not fulfillment.

**Implementation approach:**
- Build a custom Fulfillment Provider module in Medusa v2.
- The module would call Shiprocket's API to create shipments, generate labels, and update tracking.
- Webhook handling for shipment status updates back to Medusa.
- Estimated dev time: 1-2 weeks for a production-grade integration (including testing COD flow).

**Verdict:** DIY only. No shortcut exists. Budget 1-2 weeks of developer time.

---

## 5. COD Payment Provider

**Pattern:** Medusa has a `medusa-payment-manual` plugin (v1.0.25, 4,383 weekly downloads, MIT) that provides a restriction-free manual payment provider.

**How COD works on Medusa:**
1. Install `medusa-payment-manual` as a payment provider.
2. Enable it in the region's payment providers via admin.
3. During checkout, the storefront shows "Cash on Delivery" as an option.
4. When selected, the payment is marked as "awaiting" — no capture happens at checkout.
5. On the admin side, orders are manually marked as captured when COD payment is collected.

**For Medusa v2 specifically:**
- The module-based payment system accepts custom payment providers.
- COD can be implemented as a custom payment provider module that skips the payment gateway interaction.
- The `medusa-payment-manual` plugin was built for v1 and may need adaptation for v2's module system, but the pattern is well-understood.
- Codando (community project) provides a COD-as-payment-method implementation pattern.

**Verdict:** COD is straightforward but requires ~3-5 days of custom development to implement properly in v2 with admin workflows for COD collection tracking.

---

## 6. Airtable Sync

**Status:** No existing Medusa plugin for Airtable sync.

**Patterns available:**
- **n8n / Zapier / Make (Integromat):** The most practical approach. Medusa exposes REST APIs for orders, products, customers. You can use a webhook trigger in Medusa (event-based: `order.placed`, `order.fulfilled`, etc.) or poll via n8n.
- **Custom Medusa module:** Build a subscriber that listens to Medusa events (`order.placed`, `order.completed`, `fulfillment.created`) and writes to Airtable via the Airtable REST API.
- **BuildShip / other middleware:** BuildShip offers an AI workflow builder that can connect Medusa webhooks to Airtable.

**Recommended approach for The Product Lab:**
1. Use Medusa's event system (`order.placed`, `payment.captured`, `fulfillment.created`).
2. Write a lightweight subscriber module that posts to Airtable REST API.
3. Estimated: 2-3 days to build and test.

**Verdict:** No pre-built solution, but trivially achievable via Medusa webhook events + Airtable REST API or n8n middleware.

---

## 7. Deployment Options

| Option | Cost (monthly) | Setup Time | Managed? | Notes |
|--------|---------------|-----------|----------|-------|
| **Medusa Cloud (Develop)** | $29/mo | Minutes | Yes | 600 compute hrs, limited GMV |
| **Medusa Cloud (Launch)** | $99/mo | Minutes | Yes | 800 compute hrs, auto-scaling, backups |
| **Medusa Cloud (Scale)** | $299/mo | Minutes | Yes | 2,800 compute hrs |
| **Railway** | ~$5-20/mo | 1 hour | Partially | One-click Medusa v2 deploy template; Postgres + Redis included |
| **Render** | ~$7-25/mo | 2 hours | Partially | Web service + Postgres + Redis |
| **Fly.io** | ~$5-15/mo | 2-4 hours | Partially | Requires Docker config |
| **DigitalOcean (VPS)** | ~$6-24/mo | 4-8 hours | No | Self-managed Docker Compose |
| **AWS (ECS + RDS)** | ~$30-80/mo | 1-2 weeks | No | Full control, highest complexity |

**Standard deployment path (as of 2026):**
- **Development:** Railway one-click deploy is the most popular starting point. The Medusa team maintains a Railway template.
- **Production:** Medusa Cloud or self-hosted on Railway/Render. Growing number of teams use Medusa Cloud for zero-ops.
- **Storefront:** Vercel (free tier works for under 100 orders/month).

**Verdict:** Railway + Vercel is the cheapest and fastest path at $5-20/mo for backend + free storefront hosting. Medusa Cloud at $99/mo if you want managed infrastructure.

---

## 8. Medusa v2 vs v1

**Migration status:** v1 is effectively deprecated. The v2 rewrite was fundamental — complete architectural change from a plugin-based system to a modular module system.

**Key differences:**
- **v1:** Monolithic core with plugins. Modifications required forking core files.
- **v2:** Fully modular. Each commerce feature (products, orders, payments, fulfillment) is an isolated module. Customization via module replacement, not core modification.
- **Database:** v2 uses MikroORM (v6.6.x) instead of TypeORM. Migration is not straightforward.
- **Admin:** v2 has a redesigned React admin dashboard built with Vite, `@medusajs/ui`, and TanStack Query.
- **Workflow engine:** v2 introduces a workflow/transaction engine for multi-step processes (checkout, fulfillment).

**Migration path:** DB migration requires SQL scripts to transform v1 schema to v2. No automated migration tool. Agencies like bqst.fr have published guides showing manual SQL migration for products, customers, inventory, and pricing.

**For new projects:** Always start on v2. v1 is end-of-life.

---

## 9. Headless Storefront Patterns (Next.js)

**Status:** Excellent. Medusa + Next.js is the most documented headless commerce pattern in 2026.

- **Official starter:** Medusa maintains `dtc-starter` (monorepo template with Next.js storefront + Medusa backend). The older `nextjs-starter-medusa` (2.8k stars, 981 forks) is now deprecated in favor of this.
- **SDK:** `@medusajs/js-sdk` provides a full TypeScript client for Store APIs. Works with any frontend.
- **Next.js 15 features supported:** App Router, Server Components, Server Actions, Streaming, ISR, Static Pre-Rendering.
- **Checkout flow:** Stripe is default; PayPal supported. Custom payment providers (Razorpay, COD) can be added to the storefront's checkout components.
- **Performance:** SSR product pages, ISR-cached catalog grids. Well-suited for mobile-first Indian market (80%+ mobile traffic).

**Multiple tutorials exist (2026):**
- Noqta.tn: "Medusa.js 2.0 — Build a Headless E-commerce Store with Next.js (2026)"
- NeedThisDone: "Next.js + Medusa: The Complete Headless Commerce Setup Guide"
- Multiple YouTube walkthroughs (Medusa + Railway + Vercel + Stripe stack)

**Verdict:** Medusa + Next.js is a proven, well-documented combination. The best headless commerce frontend pattern available today.

---

## 10. Admin Usability

**Dashboard capabilities (as of v2):**
- Order management (view, capture, fulfill, exchange, returns)
- Product management (CRUD, categories, collections, variants, inventory)
- Customer management (list, view orders, group into segments)
- Discount/promotion creation
- Region/currency/tax configuration
- Staff/user management
- Multi-warehouse inventory

**Is it usable by a solo founder without developer help?**
- **Partially yes** for order management, basic product editing, and customer lookup.
- **No** for: initial setup, adding payment/shipping providers, custom tax configuration, troubleshooting, deployment changes, error handling, integrating new services.
- The admin dashboard is a React SPA built with `@medusajs/ui` — it's functional and clean, but it's not Shopify's admin. You cannot install plugins from a marketplace, manage themes visually, or configure shipping zones through a GUI wizard.
- Every integration (Razorpay, Shiprocket, Airtable) requires editing `medusa-config.js` or `medusa-config.ts` — code, not configuration.

**Multiple sources confirm:** The admin dashboard "works" for order/product management but requires a developer for setup and maintenance. The Orangemantra review (June 2026) explicitly says: *"There is no visual admin panel for non-technical users (though a dashboard exists for order management). Every storefront customization requires code. Self-hosting means you manage infrastructure."*

**Verdict:** A solo founder cannot run Medusa without developer support. You need a Node.js/TypeScript developer for setup, maintenance, and any integration.

---

## 11. Community Health

**Metrics (as of June 2026):**
- **GitHub stars:** 34,100+ (up from ~31k at start of 2026)
- **Monthly growth:** ~33.4% month-over-month (per APEX Digital, Apr 2026)
- **Discord:** 14,000+ members
- **npm downloads:** `@medusajs/js-sdk` at 127,606 weekly downloads
- **Contributors:** Active — 15+ contributors per release batch
- **Job board:** medusajobs.com exists with dedicated Medusa roles
- **Ecosystem:** Perséides (community plugins), GorgoJS (localization plugins), Seeed (v2 agency), u11d (DevOps), CloserWorks (custom modules)
- **Venue funding:** $10M+ raised
- **Enterprise users:** Heineken, Mitsubishi confirmed

**Recent community activity:**
- React 19 support in icons package
- Zod migration (breaking change across codebase)
- Monorepo project structure (`dtc-starter`)
- Medusa MCP Server (community interest, no official MCP server yet)

**Verdict:** Very healthy community. Active development, growing ecosystem, job market emerging, multiple agencies specializing in Medusa.

---

## 12. Cost to Run

**Estimated monthly cost for The Product Lab (<100 orders/month):**

| Component | Option | Monthly Cost |
|-----------|--------|-------------|
| Medusa backend | Railway (starter) | $5-10 |
| PostgreSQL database | Railway (included) | $0 (in Railway plan) |
| Redis | Railway (included) | $0 (in Railway plan) |
| Next.js storefront | Vercel (free tier) | $0 |
| Domain + SSL | Cloudflare + registrar | $2-5 |
| Storage (product images) | Cloudflare R2 / S3 | $1-3 |
| Email (transactional) | Resend / SendGrid free tier | $0-10 |
| **Total (self-hosted)** | | **~$8-28/mo** |
| **Total (Medusa Cloud Develop)** | | **~$29-35/mo** |

**Key cost insight (from BuildWithMatija, Apr 2026):**
- Self-hosted infrastructure: ~$35-106/mo (depends on provider)
- Medusa Cloud: $29-299/mo base
- **Hidden cost:** Developer time. A capable developer takes days to weeks to set up a production Medusa store. Annualized developer cost typically exceeds infrastructure cost by 10-100x.

**For The Product Lab specifically (<100 orders/month):**
- Railway ($5-10/mo) + Vercel (free) is the cheapest viable stack.
- No Medusa platform fees, no GMV fees, no transaction fees.
- You pay only Stripe/Razorpay processing fees (2-3% per transaction).

**Verdict:** Infrastructure cost is negligible (~$10-30/mo). The real cost is developer time for setup and maintenance.

---

## Risk Assessment for an Indian D2C Brand

| Risk | Severity | Likelihood | Mitigation |
|------|----------|-----------|------------|
| **No GST/tax provider** | High | Certain | Build custom tax module (1-2 weeks); or use Fynd's built-in tax handling |
| **No Shiprocket plugin** | High | Certain | Build custom fulfillment module (1-2 weeks); or accept manual fulfillment via Shiprocket dashboard |
| **Razorpay plugin maintenance** | Medium | Moderate | Fork the community plugin; pin versions; have a backup payment provider |
| **Admin complexity for founder** | High | Certain | Need a technical co-founder or part-time developer for ops |
| **Breaking changes** | Medium | Moderate | Follow release notes; automated CI/CD; don't upgrade immediately |
| **No visual storefront builder** | High | Certain | Storefront is 100% custom Next.js code; no page builder |
| **India-specific features (pincode, GSTIN, e-invoice)** | Medium | High | Build custom modules; or integrate third-party APIs |
| **Community plugin abandonment** | Low-Medium | Low | Open-source; can self-maintain if needed |
| **Developer hiring difficulty** | Medium | Moderate | Medusa dev market is emerging but niche; contractors available via medusajobs.com |

---

## Recommendation: Is Medusa Viable for Day 30 Post-Launch Migration?

**Short answer: Yes, as a Day 30-60 migration target. No, as a Day 1 launch platform.**

### Why not Day 1:
1. **The Product Lab is a solo founder operation** — no in-house Node.js/TypeScript developer. Medusa requires developer support for setup, integrations, and maintenance.
2. **India-specific features** (GST, Shiprocket, Razorpay, COD, pincode serviceability) all require custom development with no off-the-shelf solutions. Estimated: 4-6 weeks of dev work to reach feature parity with Fynd's built-in Indian commerce features.
3. **Opportunity cost** — at launch, engineering hours are better spent on product, catalog, brand, and marketing. The Fynd platform (Commerce.com) already handles India commerce (GST, COD, Shiprocket, Razorpay) out of the box.

### Why Day 30-60 migration makes sense:
1. **Medusa v2 is genuinely good** for the long term — zero platform fees, zero GMV fees, zero transaction surcharges. Full ownership of commerce data.
2. **Headless architecture** enables the custom storefront experience The Product Lab needs (expressive brand, unique product pages, opinion-driven UX).
3. **Cost scales favorably** — at ₹5/order (Razorpay) and $10/mo infrastructure, the cost at 100 orders/month is negligible. At 1,000 orders/month, it's still negligible compared to Shopify's %-of-revenue model.
4. **Full data ownership** — no lock-in, no migration pain later, no platform policy risk.
5. **Airtable sync is trivial** via Medusa events, solving the ops workflow need without Shopify-like app costs.

### Recommended approach:
1. **Launch on Fynd (Commerce.com)** — faster path to revenue, India-native commerce features, minimal technical overhead.
2. **Day 1-30:** Focus on brand, product, marketing, and proving PMF.
3. **Day 15-30:** Start Medusa development in parallel (set up backend, build custom modules for Razorpay, COD, Shiprocket, GST).
4. **Day 30-45:** Soft-launch Medusa backend with a subset of products, test payment + shipping flows.
5. **Day 45-60:** Full migration with data export from Fynd to Medusa.
6. **Post-migration:** Maintain Fynd as a secondary sales channel while Medusa becomes the primary commerce engine.

### If you choose Medusa Day 1 anyway:

| Need | Path | Timeline | Cost |
|------|------|----------|------|
| Backend setup | Railway one-click deploy | 1 day | $5/mo |
| Razorpay | `@devx-commerce/razorpay` plugin | 2-3 days | Free |
| COD | Custom payment provider | 3-5 days | Dev time |
| Shiprocket | Custom fulfillment module | 1-2 weeks | Dev time |
| GST tax | Custom tax provider module | 1-2 weeks | Dev time |
| Next.js storefront | DTC starter template + customization | 2-4 weeks | Dev time |
| Airtable sync | Event subscriber module | 2-3 days | Dev time |
| Pincode validation | Custom utility + API integration | 3-5 days | Dev time |
| **Total pre-launch dev** | | **~5-9 weeks** | **Developer full-time** |

---

## Sources

- `@medusajs/medusa` npm registry (v2.15.3, June 2026)
- Orangemantra: "Is Medusa.js Worth It in 2026?" (June 1, 2026)
- BuildWithMatija: "Medusa.js Pricing 2026" (Apr-May 2026)
- APEX Digital: "WooCommerce vs Alternatives 2026" (Apr 2026)
- Noqta.tn: "Medusa.js 2.0 — Build with Next.js" (Apr 2026)
- NeedThisDone: "Next.js + Medusa Setup Guide" (Feb 2026)
- GitHub: medusajs/medusa (releases page, 34.1k stars)
- GitHub Discussions: Shipping plugin support for India (#13850)
- `@devx-commerce/razorpay` npm package
- SGFGOV/medusa-payment-plugins (GitHub)
- Shiprocket API documentation (shiprocket.in/developers)
- CloserWorks: MedusaJS Plugin Case Studies
- MakerStack: Medusa Review 2026
- LushBinary: MedusaJS Guide (Feb 2026)
- Swell.is: "Medusa Pricing 2026" (Apr 2026)
