<!-- last-updated: 2026-03-20 -->
# Handoff Intake — Per-Pod Briefs

| Field | Value |
|-------|-------|
| **Phase** | Cross-phase |
| **Producing Agent** | Harley (Program Director) |
| **Date** | 2026-03-20 |
| **Status** | draft |
| **Reviewer** | Dan |

---

## Context

On 2026-03-20, Dan provided 10 documents from his Claude project history covering the full business context of The Product Lab. This document summarizes what each pod needs to know from that handoff, beyond what already exists in Phase 1-2 artifacts.

Full handoff analysis: `knowledge/15-HANDOFF-INTAKE.md`

---

## Pod A: Command (Claire, Maria)

### Claire (Chief of Staff)
**New information:**
- Project has a richer history than the Phase 1 artifacts suggest — 30+ Claude conversations preceded this work
- YDS merger negotiations are an active thread that could change project scope entirely
- Design Yatra 2025 happened (Sept 4-6, Goa) — outcomes need to be captured

**Action:** Track the 7 open questions in `knowledge/15-HANDOFF-INTAKE.md` as blockers until Dan responds.

### Maria (Research Librarian)
**New information:**
- Enterprise B2B clients confirmed: Meta, Diageo, Coca-Cola, Amazon
- Competitor landscape in handoff largely aligns with your Phase 1 research
- Boltminor and Fosite are known artist collaborators — can be referenced as evidence of the artist model

**Action:** Add B2B client portfolio to competitor/market context. Note that competitive analysis was accessories-only; if apparel enters scope, landscape needs expansion.

---

## Pod B: Strategy (Weiss, Heyward, Jenna)

### Weiss (Customer Insight)
**New information:**
- 5,000 email subscribers + 10,000 total contacts exist — this is a real audience to survey
- Actual revenue split is 80% B2B / 20% D2C — the D2C customer base is very small
- ₹5K average revenue per artist per month — artist economics are thin

**Action:** Consider recommending a pre-launch survey of existing email list to validate persona assumptions.

### Heyward (Brand Strategy)
**New information:**
- TPL has apparel and home/decor products (t-shirts ₹999-1,499, hoodies, caps, totes, coasters, mugs, clocks) beyond accessories
- "Small objects. Big opinions." may need expansion or a decision to exclude non-accessories from relaunch scope
- Mission/vision statements exist but are generic and don't match the positioning you created — the new positioning supersedes them

**Action:** Prepare a recommendation for Dan on whether relaunch scope should remain accessories-only or include apparel/home. The positioning works for accessories; apparel changes the competitive set entirely.

### Jenna (Merchandising)
**New information:**
- Handoff confirms 3-level product database: Design Library → Design-Product Combinations → Design-Product Variations
- Cross-format designs are intentional (same design across keychain, magnet, earrings)
- Collection architecture targets: Core Classics 40%, Cultural Moments 30%, Artist Collabs 20%, Experimental 10%

**Action:** Your hero/support/filler classification aligns with the handoff data. The collection architecture percentages from the handoff are aspirational — your 10-collection launch structure is better scoped for MVL.

---

## Pod C: Product (Shreyas, Andy)

### Shreyas (Product Manager)
**New information:**
- In-house production via Ink Fish is a major operational advantage — faster iteration, lower MOQs
- Service category (B2B custom) generates ₹12K AOV — highest per-unit value but excluded from D2C scope
- PMF assessment flagged pre-launch social proof gap — handoff confirms only 2,943 Instagram followers

**Action:** Your conditional-go PMF verdict is reinforced. The pre-launch validation plan (gift 20+ products, 10 content pieces, seed 500 subscribers) is even more critical given the confirmed small D2C base.

### Andy (Catalog Operations)
**New information:**
- Actual SKU codes follow pattern: IF-SSKC-XXXXX (keychains), IF-DSKC-XXXX (double-sided), IF-LP-XXXX (lapel pins), IF-FM-XXXX (magnets)
- Airtable has dedicated bases for products, inventory, and costing — existing data can be migrated
- WooCommerce uses Simple Products (not Variable) — each design-product-variation = one product

**Action:** Catalog migration from WooCommerce to Fynd will need to preserve SKU structure. Coordinate with Tobi on Fynd's product data model. The Airtable product bases (appyVrj8IjgJH1b2w, app4KLymPlO7X3n5e) contain source catalog data.

---

## Pod D: Creative (Sean, Joanna, Kurt, Julie)

### Sean (Creative Director)
**New information:**
- Product photography exists: lapel pins, keychains, Spotify keychains, half/full card stickers, custom t-shirt GIF
- Figma design file exists (Product Lab.fig)
- Brand guidelines and content guides exist in text format (3 versions of Creative Guide)
- DTP designer was being hired — CorelDRAW, Illustrator, Photoshop, Canva required

**Action:** Request access to existing brand assets from Dan. The Figma file and existing brand guides should be reviewed before creating new visual identity — build on what exists rather than starting from zero.

### Joanna (Copy Strategist)
**New information:**
- Handoff confirms multiple existing brand documents: Brand Content Guide, Brand Creative Guide (3 versions), Company Orientation doc, Content Guide
- An RPG-overlay team onboarding document exists ("The Labyrinth of Merch") — shows playful internal culture
- Existing tagline "Find your thing" and Instagram bio "Everyday accessories with designs you'll love" — both flagged for replacement in Phase 2

**Action:** Your voice principles from Phase 2 supersede the handoff's existing brand guides. But review them for any usable elements. The RPG onboarding doc may inform internal brand culture copy.

### Kurt (UX/IA Lead)
**New information:**
- Current site is WordPress + WooCommerce + Divi theme (JS-rendered, slow)
- Softr app (tpl.softr.app) handles internal ops: products, inventory, orders, clients
- Card stickers have half-card and full-card variants — product page needs to surface this clearly
- "Sell Your Art" artist marketplace page exists on current site — artist portal concept is proven

**Action:** Fynd Commerce migration means new IA from scratch. The Softr app may continue as internal tool (non-customer-facing). Artist marketplace/portal is a Phase 6 feature, not MVL.

### Julie (UI System Lead)
**New information:**
- Existing design assets in Figma (Product Lab.fig) and Canva
- Current site uses Divi theme — no design system exists
- Mobile-first requirement reinforced: 80%+ traffic expected on mobile, <3s LCP on 4G

**Action:** Start clean on Fynd Commerce. No components to inherit from Divi. Coordinate with Sean on visual identity before creating component specs.

---

## Pod E: Build/QA (Tobi, James)

### Tobi (Frontend Build)
**New information:**
- **Critical:** The migration is WooCommerce → Fynd Commerce.com. This is not an enhancement — it's a platform change.
- 30+ Airtable bases exist. Key ones for integration: Inventory, Orders, Products, Production
- n8n automation workflows are designed but not all deployed — need Fynd API equivalents
- Shiprocket is the shipping partner
- Razorpay for payments (UPI, cards, wallets)
- WhatsApp Business API integration planned

**Action:** Evaluate Fynd's native capabilities vs what was built in WooCommerce plugins. Many plugin functions (cart abandonment, wishlists, upsells) may be native in Fynd. Prioritize: (1) storefront build, (2) Razorpay integration, (3) Shiprocket integration, (4) Airtable sync for inventory.

### James (QA Lead)
**New information:**
- Current WooCommerce site is JS-rendered — performance likely poor (40-65 PageSpeed mobile)
- No-return policy currently exists — competitors offer returns (flagged as risk)
- COD orders at <₹200 lose money — checkout flow must enforce minimum COD threshold

**Action:** QA plan should include: Fynd PageSpeed mobile target (<3s LCP), COD flow validation (₹299 minimum), payment gateway testing (Razorpay UPI/cards/wallets), shipping integration test (Shiprocket), WhatsApp notification delivery.

---

## Pod F: Growth (Nik, Avinash, Eli)

### Nik (Growth Launch Lead)
**New information:**
- 5K email subscribers + 10K total contacts = launch audience exists
- Design Yatra 2025 produced B2B leads (quantity unknown) and brand exposure
- 60-day scale plan from handoff targets ₹6L/month — this is aspirational, not Phase 5 target
- Artist drop campaign sequence is pre-designed: teaser → 10-day countdown → early bird → launch → post-analysis

**Action:** The existing contact base changes the launch plan. Pre-launch can seed to 5K email subscribers and WhatsApp broadcast list. Drop mechanics from the handoff can be used directly. The ₹6L target is post-relaunch, not launch-day.

### Avinash (Analytics Lead)
**New information:**
- GA4 access needed from Dan (flagged as action item)
- No baseline analytics exist in project — traffic, conversion, bounce rates all unknown
- Dashboard targets from handoff: daily (cash, orders, AOV), weekly (revenue vs target, margins), monthly (full P&L)
- Event tracking for Fynd Commerce needs to be set up from scratch

**Action:** Analytics setup is net-new. Coordinate with Tobi on Fynd's analytics capabilities. GA4 + Microsoft Clarity are the planned tools (per CLAUDE.md).

### Eli (Retention/Lifecycle)
**New information:**
- Average revenue per artist/month: ₹5K (thin — retention of artists matters too)
- Planned customer lifecycle automation: welcome, post-purchase, abandoned cart, drops, re-engagement
- Membership concept explored: TPL VIP at ₹2K/month — not validated
- Repeat purchase rate target: 25-35% (no baseline data exists)

**Action:** Lifecycle design is net-new. The automation architecture (n8n-based) is designed but needs Fynd integration. Focus on post-purchase WhatsApp flow first — this is the highest-impact lifecycle touchpoint for Indian D2C.

---

## Pod G: Marketing (Andrew, Chase, Rachel)

### Andrew (Performance Marketing)
**New information:**
- Current ad budget: ₹20K Instagram/FB + ₹10K Google = ₹30K/month
- ROAS target: 4-5x
- Patrick's Phase 1 finding: Paid acquisition not viable until AOV >₹400 and 100+ reviews exist
- CAC benchmark: ₹200-400 for accessories in India

**Action:** Do NOT launch paid acquisition at relaunch. Per Patrick and Shreyas, focus on organic until unit economics are validated. Plan paid for Month 3+ post-relaunch.

### Chase (Email/SMS Lead)
**New information:**
- 5K email subscribers exist — this is your launch list
- WhatsApp is primary communication channel in India, not email
- MSG91/Gupshup planned for WhatsApp Business API
- Klaviyo or Mailchimp for email (budget: no tool >₹5K/month)
- Newsletter cadence was bi-monthly — needs to increase for relaunch

**Action:** Build welcome + drop announcement + abandoned cart flows. WhatsApp-first, email-second. The existing 5K list needs a re-engagement campaign before launch day.

### Rachel (Social Media)
**New information:**
- Instagram: @the.product.lab, ~2,943 followers, 55 posts total
- Content mix was: Product 40%, Artist Features 30%, BTS/Cultural 30%
- Posting cadence: 3 feed/week, 5-7 stories/week
- YouTube and WhatsApp Business also planned channels

**Action:** Audit existing 55 posts for quality and engagement. The new brand voice ("Wear your opinion") requires a content reset. Consider archiving old posts that don't match new positioning. Pre-launch content plan needs 10+ pieces in new voice (per D-007 decision).

---

## Pod H: Content (Casey)

### Casey (Content Production)
**New information:**
- Existing product photography: flat shots on plain backgrounds (per Maria's audit)
- Brand assets: Figma file, brand icon, product comparison images, custom t-shirt GIF
- DTP designer being hired with CorelDRAW, Illustrator, Photoshop, Canva skills
- Design Yatra produced event photography/content (outcome unknown)

**Action:** Photography brief needed for lifestyle shots (Sean's direction). Existing flat product photography may be reusable for catalog but not for hero/brand content. Coordinate with Sean on shoot plan.

---

## Pod I: Ops/Finance (Patrick, Raj, Tony, Lenny)

### Patrick (Finance/Pricing)
**New information:**
- **Actual unit costs now available** — see `knowledge/17-PRODUCTION-COSTS.md`
- In-house production (Ink Fish) means COGS may be lower than your IndiaMart-based estimates
- Gross margin 73% and net margin 34% from Accounts Wizard analysis (on actual data)
- Artist revenue share (40-60% of net) + lab fee (15-25%) must be factored into margins
- B2B profit margins 30% vs D2C 75% — validates D2C focus for margin improvement

**Action:** Update pricing framework with actual cost data from handoff. The ₹18.33 unit cost for a lapel pin confirms your estimates. Artist commission adds 8-15% to per-unit cost depending on tier.

### Raj (Logistics/Fulfillment)
**New information:**
- Shiprocket confirmed as shipping partner
- Handoff's ₹6L target P&L allocates ₹30K/month for logistics
- Production happens at Ink Fish facility (Cunningham Road, Bangalore)
- 45-day max stock policy for JIT inventory

**Action:** Your logistics baseline and COD strategy align with handoff. Confirm Shiprocket rate card for actual vs estimated shipping costs. The in-house production + Shiprocket fulfillment path is validated.

### Tony (Customer Support)
**New information:**
- AI customer service agent planned (n8n + Claude API + Airtable) — 80% auto-resolve target
- Chat widget planned for website
- Current contact: productlab.info@gmail.com
- No-return policy flagged as risk (competitors offer returns)

**Action:** Support setup is Phase 6 scope. Pre-launch: create FAQ content, return policy decision (escalate to Dan), and basic WhatsApp support flow.

### Lenny (Community Manager)
**New information:**
- 4 active artists, 12+ in pipeline — artist community exists
- "The Labyrinth of Merch" RPG-overlay onboarding doc shows community-first culture
- WhatsApp is primary community channel
- Artist app exists (Softr-based) for portfolio/earnings tracking
- Drop culture mechanics pre-designed (teasers, countdowns, early bird)

**Action:** Artist community management is Phase 6 scope. For launch: WhatsApp broadcast group setup, artist feature content coordination with Rachel/Casey.
