<!-- last-updated: 2026-03-26 -->
# Phase 4 Sprint Briefs — Active Agent Assignments

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build & Merchandising Implementation |
| **Producing Agent** | Harley (Program Director) |
| **Date** | 2026-03-26 |
| **Status** | draft |
| **Reviewer** | Dan (CEO) |

---

> **Context:** Phase 3 is fully approved. All creative artifacts are locked. This document tells each agent exactly what to do, in what order, with no ambiguity. Every reference points to a specific file. Operator is Dan — sole person executing.

---

## Brief 1: Tobi — Build Lead

**Status:** Ready. Blocked on Fynd/Commerce.com credentials. Start immediately upon receiving access.

**Your one job in Phase 4:** Build the Fynd store to spec. On time. No P0 or P1 issues at handoff to James.

### Files to read first (in this order):
1. `artifacts/phase-4/technical-implementation-plan.md` — your full blueprint
2. `artifacts/phase-3/ui-system.md` — CSS tokens and every component variant
3. `artifacts/phase-3/hifi-page-designs.md` — section-by-section page specs (all 8 pages)
4. `artifacts/phase-3/ux-ia-wireframes.md` — sitemap, IA, nav structure
5. `artifacts/phase-3/visual-identity.md` — Darkroom system, photography rules
6. `artifacts/phase-3/copy-system.md` — voice rules for any copy you place in templates
7. `artifacts/phase-4/analytics-event-schema.md` — GA4 events you must implement during build

### Build sequence (non-negotiable order):

**Week 1: Platform + Integrations**
1. Fynd store config: domain (theproductlab.in), GST (GSTIN from `knowledge/16-COMPANY-FACTS.md`), tax zones (India), currency (INR), language (English).
2. Razorpay integration: test mode first. Enable UPI (highest priority), cards, wallets. COD via Shiprocket, NOT Razorpay.
3. Shiprocket integration: warehouse address, weight/dimension defaults, COD toggle. Test end-to-end AWB generation before moving on. COD minimum ₹299 (D-006).
4. GA4 + Microsoft Clarity: both must be live before any page is published. Use event schema from `artifacts/phase-4/analytics-event-schema.md`.
5. Klaviyo/Mailchimp: install plugin, connect API. Coordinate with Eli on account details.

**Week 2: Theme + CSS**
6. Implement design tokens from `artifacts/phase-3/ui-system.md` as CSS custom properties. Do not deviate. Every color, spacing, radius, and weight is specified.
7. Typography: load Barlow Condensed + Inter + Space Mono via Google Fonts. Confirm render on Android Chrome at 320px width.
8. Build global components: Navigation (mobile drawer + desktop inline), Footer, Cart drawer. These appear on every page — get them right before building any page.
9. Build PDP template (highest commercial priority). Use Julie's spec from `artifacts/phase-3/hifi-page-designs.md`, Page 4.
10. Build Homepage. Use `hifi-page-designs.md`, Page 1.

**Week 3: Collection pages + Catalog**
11. Collection page template (standard grid). Use `hifi-page-designs.md`, Page 3.
12. Upload hero SKUs (Dan provides photos and copy). Card stickers → No Filter attitude products → keychains → pins. Andy coordinates product data.
13. Bundles page. Use `hifi-page-designs.md`, Page 6.
14. Gifts hub. Use `hifi-page-designs.md`, Page 7.
15. About page + Drop hub shell. About: brand story. Drop hub: empty shell, just structure.

**Week 4: QA prep + Performance**
16. Performance audit: LCP <3s on 4G is a hard launch requirement. Test on real Android device (not simulator) on 4G speed throttle in Chrome DevTools.
17. Image optimization: all product images ≤80KB at display size. Use WebP with JPEG fallback. `loading="lazy"` on all below-fold images. `loading="eager"` + `fetchpriority="high"` on hero image only.
18. Hand off to James. Provide: staging URL, Fynd admin credentials (store-level only), test card details, test COD order, GA4 property ID.

### Hard constraints:
- **LCP <3s on 4G.** No exceptions. James will not sign off otherwise.
- **COD must work end-to-end** (order → AWB → tracking) before handoff. This is 40-60% of expected orders.
- **Razorpay must be in live mode** (not test) before launch. Test mode is fine for QA, must flip to live at launch day.
- **No fonts, images, or scripts loaded from non-approved CDNs.** Approved: Google Fonts, jsDelivr, cdnjs.cloudflare.com.
- **Mobile-first always.** Every component is designed for 320px → 767px first. Desktop is the responsive evolution.

### Fynd-specific constraints (from `knowledge/11-PLATFORM-AND-TOOLING.md`):
- Theme customization via Fynd's theme editor — no raw file server access.
- Use Fynd's built-in SEO fields (meta title, description, OG tags) — do not override with custom scripts.
- Collection creation via Fynd admin, not API. Product upload via Fynd bulk upload CSV or admin UI.
- Shiprocket and Razorpay both have official Fynd plugins — use those, not custom integrations.

### What Tobi does NOT decide:
- Pricing (D-006 locked)
- Copywriting (use Joanna's copy-system.md and Dan's PDP copy)
- Visual system (D-015 locked — follow ui-system.md exactly)
- Launch date (Dan's decision — escalate)

---

## Brief 2: James — QA Lead

**Status:** Active. Can start now. Does not need Fynd access to prepare.

**Your one job in Phase 4:** Build the test infrastructure. Sign off on launch. No P0 or P1 issues go live.

### Files to read first:
1. `artifacts/phase-4/qa-checklist.md` — your full P0/P1/P2 criteria
2. `artifacts/phase-4/technical-implementation-plan.md` — Tobi's build scope (understand what you're testing)
3. `artifacts/phase-3/hifi-page-designs.md` — design intent (test against spec)
4. `knowledge/16-COMPANY-FACTS.md` — GST number, entity name (verify in footer, invoices)

### What James does right now (pre-build):

**1. Review and validate QA checklist:**
Read `artifacts/phase-4/qa-checklist.md` in full. For every P0 item, confirm you understand the pass/fail criteria. If any criteria is ambiguous, flag to Harley before Tobi builds it.

**2. Set up test environment:**
- Get 2 test Android devices (or use BrowserStack with Android Chrome profiles)
- Target devices: mid-range Android (Redmi Note, Samsung M-series) — this is the primary customer device
- Chrome DevTools 4G throttle profile: 9 Mbps down / 2.7 Mbps up / 80ms RTT
- Install Razorpay test card details: 4111 1111 1111 1111, any expiry, any CVV
- Razorpay test UPI: `success@razorpay`
- Shiprocket test COD order: coordinate with Tobi for test credentials

**3. Prepare test scripts:**
Write step-by-step test scripts for all P0 scenarios. These must be repeatable — someone else (including Dan) must be able to run them without interpretation. Use this format:
```
[TEST ID]: P0-01
[Scenario]: User adds product to cart and completes UPI payment
[Steps]:
  1. Navigate to /products/[slug] on Android Chrome
  2. Tap "Add to Cart"
  3. Proceed to checkout
  4. Enter address
  5. Select UPI payment
  6. Enter success@razorpay
  7. Confirm payment
[Pass criteria]: Order confirmation page shown, order visible in Fynd admin, email confirmation received
[Fail criteria]: Any of the above steps errors, hangs >10s, or does not reach confirmation page
```

**4. Create test data:**
- 3 test addresses (Bengaluru, Delhi, Mumbai — different pincodes, different courier zones)
- 2 test customer accounts (email + phone)
- COD test order (₹299 minimum, Shiprocket AWB must generate)
- Prepaid test order (₹249, UPI, ₹30 discount applied)

### QA execution (when Tobi hands off staging):

James runs P0 tests first. Does not proceed to P1 until all P0s pass. Does not proceed to P2 until all P0s and P1s pass.

**P0 (show-stoppers — must pass for launch):**
- Homepage loads <3s LCP on 4G Android
- Product added to cart successfully
- Cart shows correct price, quantity, and free shipping threshold progress
- Checkout reaches payment step without errors
- UPI payment completes successfully
- Card payment completes successfully
- COD order placed successfully, AWB generated in Shiprocket
- Order confirmation email received <5 minutes
- GA4 receives purchase event with correct value

**James controls the launch gate. If any P0 is failing at T-0, Dan is informed. Launch does not happen. No one overrules James on this.**

---

## Brief 3: Andy — Shiprocket + Catalog Operations

**Status:** Active. Can start now.

**Your one job in Phase 4:** Prepare the product catalog (data) and Shiprocket (operations) so Tobi can upload and James can test.

### Files to read first:
1. `artifacts/phase-1/logistics-baseline.md`
2. `artifacts/phase-1/shipping-partner-evaluation.md`
3. `artifacts/phase-1/cod-strategy.md`
4. `artifacts/phase-2/product-hierarchy.md` — collection structure, hero products
5. `artifacts/phase-2/pricing-framework.md` — all pricing tiers (D-006)

### Task 1: Product catalog CSV

Build the Fynd bulk upload CSV for all launch products. Columns required:
- Product name
- SKU / product code (format: TPL-[CATEGORY]-[NUMBER], e.g. TPL-CS-001 for card sticker 1)
- Collection(s) — can be multiple
- Price (see D-006 pricing tiers: Entry ₹149-199, Core ₹249, Premium ₹299-349)
- Compare-at price (leave blank unless running a promotion)
- Product type (Card Sticker / Lapel Pin / Keychain / Magnet / Bundle)
- Weight (grams) — required for Shiprocket rate calculation
- Dimensions (cm, L×W×H) — required for volumetric weight
- Image slots (image URLs — Dan provides after photography)
- Tags (for search + filtering)
- SEO title + description (pull from Joanna's PDP copy templates in `copy-system.md`)
- Artist name (for artist credit)

Get the actual product list from `artifacts/phase-2/product-hierarchy.md`. Prioritize:
- **Card stickers** (hero): upload first, highest priority
- **No Filter attitude collection** (hero): second priority
- **Bundles** (₹399-999): third — these need component products live first

### Task 2: Shiprocket setup

1. Create Shiprocket account (or verify existing). Warehouse address = Cunningham Road store (from `knowledge/16-COMPANY-FACTS.md`).
2. Carrier selection: Delhivery for standard, Ekart for budget short-distance. Test both for Bengaluru → Delhi and Bengaluru → Mumbai routes.
3. COD settings:
   - Enable COD on all products ≥₹299
   - COD charge: ₹0 (absorb into pricing — see cod-strategy.md recommendation)
   - COD remittance: weekly cycle
4. Packaging defaults: weight 50g standard, 100g for bundles. Dimensions: 15×10×2cm standard.
5. Test AWB generation: place a test order in Shiprocket UI (not through Fynd yet), generate AWB, confirm tracking URL works.
6. Coordinate with Tobi to connect Shiprocket plugin in Fynd.

### Task 3: Packaging materials order

Per Sean's packaging spec (`artifacts/phase-3/visual-identity.md`, packaging section):
- Black poly mailers (A5 size for standard orders, A4 for bundles): order 200 units
- Single-color sticker seal (red, TPL logo): order 300 units
- Black card insert (300gsm, A6): order 200 units (print locally in Bengaluru)

Get quotes from 2 vendors. Do not order unless Dan approves. Total packaging budget: ≤₹5,000 for initial 200-order stock.

---

## Brief 4: Chase — Content Preparation

**Status:** Active. Can start now. Does not need store to be live.

**Your one job right now:** Pre-produce all 10 pre-launch posts so they are ready to publish on schedule. Nothing should be written when it's time to post — it should already exist.

### Files to read first:
1. `artifacts/phase-5/content-calendar.md` — your full script (all 10 posts, exact copy, by date)
2. `artifacts/phase-5/teaser-campaign-strategy.md` — campaign arc, context for each post
3. `artifacts/phase-3/copy-system.md` — voice rules (every caption must pass the 5 rules check)
4. `artifacts/phase-3/visual-identity.md` — Darkroom visual spec for all assets

### Your deliverable is a "post-ready package" for each of the 10 posts:

For every post in `content-calendar.md`, produce one folder/document containing:
1. **Caption** (final, ready to paste — from content-calendar.md, reviewed against copy-system.md rules)
2. **Hashtag set** (10 tags max, from content-calendar.md, no generic tags)
3. **Asset brief** (tell Casey exactly what image/video she needs — format, dimensions, visual direction)
4. **Publish date/time** (from campaign strategy — confirmed against launch date once set)
5. **Platform** (Instagram feed / Stories / Reel — confirmed)
6. **Link in bio status** (coming soon page for all pre-launch posts; live store from T-0)
7. **Story link** (subscribe page for Acts 2-4; store for Act 5)

### Priority order for Chase:
1. Post 1 (brand intro Reel) — brief Casey immediately, this needs most production lead time
2. Post 4 (card sticker Reel) — highest-impact post, needs Dan to shoot footage
3. Posts 2, 5, 6 (Carousels + static) — lower production overhead, design-heavy
4. Posts 3, 7, 9 (Stories) — quickest to produce, but must stay on voice

### Chase's copy checklist (apply to every caption):
- [ ] Does not use any banned word (see `copy-system.md` banned words list)
- [ ] Does not start with "We" or describe what the brand does
- [ ] Has one opinion, clearly stated
- [ ] Short enough to screenshot and forward on WhatsApp
- [ ] Has a clear action (subscribe, visit, tap link) — except Act 1 (no CTA in Act 1)
- [ ] Hashtags: max 10, all relevant, no generic (#love, #instagood, etc.)

---

## Brief 5: Rachel — Seeding & Community

**Status:** Active. Can start now.

**Your one job right now:** Get 20+ products into the right hands before launch. Begin building the subscriber list from warm contacts.

### Files to read first:
1. `artifacts/phase-5/seeding-plan.md` — your full recipient strategy
2. `artifacts/phase-5/teaser-campaign-strategy.md` — where seeding fits in the campaign arc
3. `knowledge/16-COMPANY-FACTS.md` — Design Yatra context (D-013)

### Task 1: Recipient list (do this first)

Build a shortlist of 30 candidates for the 20 gifted products. Use these criteria:
- 19-28 years old, Tier 1 Indian city (Bengaluru, Mumbai, Delhi, Pune, Hyderabad, Chennai)
- Active on Instagram — posts regularly, has genuine engagement (not inflated)
- Aesthetically coherent feed — they curate what they share, they have taste
- Not a professional "influencer" with an agent. Taste-setters, not brand ambassadors.
- Priority: Design Yatra network contacts (D-013) — these are warm, they know Dan

Format: name, Instagram handle, city, why they're right for this, product recommendation (which 2 products fit them best).

Do NOT send to: anyone with >50k followers (too commercial), anyone who posts brand deals regularly, anyone in a Chumbak/mainstream aesthetic.

### Task 2: Gift messaging

Every gift includes a handwritten note. Write 3 note templates:
- **Design Yatra contacts:** More personal, references the connection. "I've been building something new. This is the first physical proof of it. Tell me what you think."
- **General warm contacts:** "This is The Product Lab's new direction. Card stickers and attitude accessories — made for people with opinions. You're one of the first 25 people to have this."
- **Cold targets (if any):** "We don't know each other yet. But I looked at your feed and I think this belongs in your world."

Each note is handwritten by Dan. Do not make them sound like PR kits.

### Task 3: Subscriber list building (parallel)

**DM script for warm contacts (Dan sends these):**
*"Hey — I rebuilt The Product Lab. New direction, new products. I think you'd be into it. Want to be on the early access list? I'll send you the link before it's public."*

**WhatsApp broadcast script (T-30, to Dan's contacts):**
*"I've been working on something. The Product Lab is getting a proper relaunch — card stickers, attitude keychains, original artist pins. Real brand, real opinion. I want you to be first. Want the link when it's ready?"*

**Subscriber target (Rachel tracks this):**

| Milestone | Target | By |
|-----------|--------|----|
| List started | 30+ warm outreach | T-28 |
| First 100 subscribers | 100 email + 50 WhatsApp | T-23 |
| Mid-campaign check | 300+ total | T-14 |
| Pre-launch gate | 500+ total | T-0 |

If the list is below 200 at T-14, escalate to Harley. May need to extend pre-launch window.

### Task 4: Social proof tracking

Create a shared doc (Google Sheets or Notion) to track:
- Every person who receives a gift product
- Date shipped
- Whether they posted on Instagram (Y/N, link)
- What they said (direct quote for future testimonials)
- Whether they subscribed

This becomes the social proof bank for email, website, and future campaigns.

---

## Brief 6: Eli — Platforms Setup

**Status:** Active. Can start now. Does not need store to be live.

**Your one job right now:** Get Klaviyo (or Mailchimp) and MSG91/Gupshup live with all flows ready to activate at T-0.

### Files to read first:
1. `artifacts/phase-5/email-whatsapp-flows.md` — all flows, copy, timing, triggers
2. `artifacts/phase-5/teaser-campaign-strategy.md` — email's role in the campaign arc
3. `artifacts/phase-3/copy-system.md` — voice rules apply to email and WhatsApp copy too
4. `knowledge/16-COMPANY-FACTS.md` — entity name, address (required in email footer)

### Task 1: Email platform setup

**Platform choice:** Klaviyo (preferred — native Shopify/Fynd integrations, behavioral triggers) or Mailchimp (fallback if Klaviyo >₹5K/month). Confirm cost with Dan before committing.

Setup checklist:
- [ ] Account created, domain authenticated (SPF + DKIM for theproductlab.in)
- [ ] Sender name: "The Product Lab" | Sender email: hello@theproductlab.in
- [ ] Unsubscribe page styled (minimal, on-brand)
- [ ] Physical address in footer (legal): Cunningham Road store address from `knowledge/16-COMPANY-FACTS.md`
- [ ] Welcome flow active (trigger: new subscriber from coming soon page)
- [ ] Abandoned cart flow built (trigger: cart abandoned >1 hour, 2 emails)
- [ ] Post-purchase flow built (trigger: order confirmed, 3 emails)
- [ ] Drop announcement template ready (trigger: manual send, T-0)

All email copy from `artifacts/phase-5/email-whatsapp-flows.md`. Do not write new copy — use what's there.

### Task 2: WhatsApp Business setup

**Platform:** MSG91 (preferred for India, WhatsApp Business API) or Gupshup (fallback). Keep under ₹2K/month.

Setup checklist:
- [ ] WhatsApp Business API account approved (can take 2-5 business days — start immediately)
- [ ] Business profile: The Product Lab, theproductlab.in, Bengaluru, accessories
- [ ] Phone number verified (use a dedicated number, not Dan's personal)
- [ ] Broadcast lists created: Subscribers, Design Yatra, Past Customers
- [ ] Message templates submitted for WhatsApp approval (required for broadcast messages):
  - "Launch announcement" template
  - "Order confirmation" template
  - "Shipping update" template
- [ ] Opt-in flow connected to coming soon page (checkbox: "Get WhatsApp updates")

### Task 3: Integration with Fynd

Coordinate with Tobi:
- [ ] Klaviyo/Mailchimp Fynd plugin installed and connected
- [ ] Test purchase event fires to Klaviyo (post-purchase flow trigger)
- [ ] Test cart abandonment fires to Klaviyo (abandoned cart trigger)
- [ ] WhatsApp order confirmation message fires on Fynd order creation

### Email design constraint:
All emails follow Darkroom aesthetic: dark background (#1A1A1A), warm white text (#F5F0EB), red CTA buttons (#E63B2E). Barlow Condensed for email headlines (use as image or web-safe fallback: Arial Black all-caps). Body in Inter or system sans-serif. Max email width 600px.

---

*Harley signs off all briefs. Questions go to Harley first, Dan if escalation criteria met. No agent unilaterally changes scope, pricing, or visual system.*
