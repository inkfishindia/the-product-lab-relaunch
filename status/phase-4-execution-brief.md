<!-- last-updated: 2026-03-26 -->
# Phase 4 Execution Brief — Agent Activation Sequence

All agents are prepped and ready to activate. Three critical blockers must be resolved first.

---

## BLOCKERS (Immediate)

### 1. Fynd/Commerce.com Store Access
- **Owner:** Dan
- **Blocks:** Tobi's entire build track
- **What we need:** Fynd store login credentials + admin access
- **Timeline:** Needed immediately to unlock Tobi

### 2. Hero Product Photography
- **Owner:** Dan
- **Blocks:** Product pages, PDP, hero product display
- **What we need:** 15 hero SKU photos per shot list in `artifacts/phase-3/asset-list.md`
- **Details from asset-list.md:**
  - Dark background (Darkroom aesthetic — #1A1A1A)
  - Phone camera acceptable (quality: sharp, colors accurate)
  - Hero SKUs: Card stickers (full + half-card variants), No Filter keychains, artist pins
  - Lighting: Simple desk lamp + dark posterboard rig
  - Timeline: Can start immediately, needed by Phase 4 mid-point
- **Deliverable location:** Photos go to `/the-product-lab-relaunch/assets/photography/`

### 3. Hero Product Copy
- **Owner:** Dan
- **Blocks:** Product pages, collection headers, About page
- **What we need:** Product descriptions for top 15 SKUs using voice rules from `artifacts/phase-3/copy-system.md`
- **Voice rules (5 non-negotiable):**
  1. Have an opinion or stay quiet
  2. Talk like the smartest person in the group chat
  3. The humor has edges. Keep them.
  4. Name the person, not the product
  5. Short enough to forward on WhatsApp
- **Banned words:** quirky, unique, fun, curated, explore, premium, vibrant, everyday, special, amazing, delight, journey, passion, innovative, elevate, thoughtfully, oops
- **Timeline:** Can start immediately, needed by Phase 4 mid-point

---

## AGENT ACTIVATION ORDER (Ready to Spawn When Blockers Resolved)

### Immediate (No dependencies — can start now)
1. **James** (QA Lead) — no blocker dependencies
2. **Andy** (Operations Lead) — no blocker dependencies
3. **Chase** (Social & Content Strategy) — no blocker dependencies
4. **Rachel** (Influencer & Community) — no blocker dependencies
5. **Eli** (Retention/Email/WhatsApp) — no blocker dependencies

### When Fynd Access Arrives
6. **Tobi** (Build Lead) — blocked on store access

### When Phase 4 Gate Passes (site live, hero products live, payments working)
7. **Nik** (Growth Lead) — Phase 5 activation trigger
8. **Andrew** (Campaign Lead) — Phase 5 activation trigger
9. **Casey** (Content Creator) — needs to produce Reels + assets with final site context

---

## EACH AGENT'S TASK SUMMARY

### James (QA Lead) — Can start NOW
**Primary artifact:** `artifacts/phase-4/qa-checklist.md`
**Timeline:** Parallel with build, handoff when staging site exists
**Key responsibilities:**
- Review P0/P1/P2 defect classification
- Set up QA environment (staging site access when available)
- Write test scripts for all P0 and P1 criteria
- Test on Android Chrome (hard requirement)
- Confirm LCP <3s on 4G (hard blocker)
- Be ready to sign off on Phase 4 gate (only James controls this — Harley cannot override)

**Phase 4 Gate Criteria James Owns:**
- ✓ No P0 issues open (checkout broken, payments not processing, Shiprocket not generating AWBs, GA4 not tracking, LCP >3s, Android Chrome broken)
- ✓ All hero products uploaded with real photos
- ✓ Razorpay processing live (test transactions + at least 1 real transaction)
- ✓ Shiprocket generating AWBs (including COD tested end-to-end)

**Next step:** Read qa-checklist.md, set up QA environment prep, begin writing test scripts.

---

### Andy (Operations Lead) — Can start NOW
**Primary artifact:** Deliverable = `artifacts/phase-4/ops-implementation-plan.md`
**Timeline:** Parallel with build, complete before Phase 4 gate
**Key responsibilities:**
- Shiprocket account configuration (zones, rate cards, COD workflow)
- COD end-to-end validation (order → Shiprocket → AWB → pickup)
- Razorpay payout timing confirmation (T+3 settlement)
- Return/exchange SOP (customer-facing FAQ format)
- Packaging specification + QA (dark mailers, kraft tissue, sticker seal, handwritten note cards)
- Fulfillment checklist for Dan (what Dan does before first order ships)

**Key decisions already locked:**
- Free shipping threshold: ₹499
- COD minimum: ₹293
- Prepaid discount: ₹30
- Packaging: matte black mailer bags + kraft tissue + TPL sticker seal + handwritten note card stock

**Deliverable format:** Artifact with sections:
1. Shiprocket checklist (what's configured, what's tested)
2. COD workflow diagram + test results
3. Packaging specification (dimensions, packing procedure, QA notes)
4. Return SOP (public-facing FAQ)
5. Dan's fulfillment checklist (step-by-step for first order)
6. Open questions for Dan/Harley

**Next step:** Create `artifacts/phase-4/ops-implementation-plan.md` with full spec.

---

### Chase (Social & Content Strategy) — Can start NOW
**Primary artifact:** `artifacts/phase-5/content-calendar.md` (already written — use as reference)
**Timeline:** Prep now, publish starting T-27 (before Tobi's site is live)
**Key responsibilities:**
- Prepare the 10 pre-launch posts for scheduling (full copy already written in content-calendar.md)
- Create Reel storyboards and shot lists for Casey to produce
- Prepare Instagram Stories templates
- Set up content calendar in Google Sheets (with columns: Date, Day, Format, Topic, Copy, Visual, Posted?, Engagement)
- Identify asset needs for Casey (what visuals are required)
- Prepare WhatsApp broadcast messaging schedule

**The 10 Pre-Launch Posts (Content Calendar already has full copy):**
1. T-27: Brand re-intro Reel ("Small objects. Big opinions.")
2. T-25: Carousel ("We're not doing quirky")
3. T-23: Stories (product teasers, hard asset for Casey)
4. T-21: Hero Reel (card stickers feature)
5. T-19: Carousel (attitude keychain collection)
6. T-17: Voice content — static post (philosophy, no product)
7. T-15: Artist & process Reel (behind-the-scenes)
8. T-13: Studio carousel (where things are made)
9. T-11: User testimonial (seeded customer feedback)
10. T-7: Launch announcement Reel

**Voice rules (non-negotiable for every caption):**
1. Have an opinion or stay quiet
2. Talk like smartest person in group chat
3. Humor has edges. Keep them.
4. Name the person, not the product
5. Short enough to forward on WhatsApp

**Next step:** Convert content-calendar.md copy into scheduled posts, create shot lists for Casey, prepare visual asset requirements.

---

### Rachel (Influencer & Community) — Can start NOW
**Primary artifact:** `artifacts/phase-5/seeding-plan.md` (already written — use as reference)
**Timeline:** T-30 onward; need 20-30 gifts shipped by T-0
**Key responsibilities:**
- Identify 20-30 taste-setters (not influencers, not follower-counts — real people with taste)
- Reach out to Design Yatra community (5-10 people) with personalized emails
- Execute 4 seeding waves (T-30, T-23, T-16, T-9)
- Build 500+ email + WhatsApp subscriber list
- Document seeding in spreadsheet (who, what, when, did they post?)
- Create "Pre-Launch Social Proof" folder (screenshots of organic posts)

**Target Profile for Seeding:**
- Age 19-28, Tier 1-2 cities (Bangalore, Mumbai, Delhi, Hyderabad, Pune, Chandigarh)
- Instagram following: 500-10,000 (real people, not micro-influencers)
- Posting frequency: 3-5 per week, organic engagement
- Behavioral: posts about objects they own (stickers, pins, keychains, desk setups)
- Has aesthetic coherence (visible point of view)
- Not a professional creator (no "collab inquiries," no sponsored posts)

**Seeding Package Contents:**
- 1 hero product (card sticker ₹150-200 or attitude keychain ₹249)
- 1 variant (if card sticker, both half-card and full-card)
- 1 support product (keychain or magnet ₹199-249)
- Handwritten note (two versions in seeding-plan.md)
- Printed business card (@the.product.lab)
- Same packaging as customer orders (not promotional packaging)

**Subscriber List Targets:**
- Email: 400+ before launch
  - 30-50 existing customers
  - 30-50 Design Yatra network
  - 100-150 Instagram Story CTA
  - 50-100 website form
  - 50-100 WhatsApp
- WhatsApp: 200+ before launch
  - 30-50 personal invitations
  - 50-100 QR code (Stories + bio)
  - 50-100 email to existing customers
  - 30-50 word-of-mouth

**Seeding Budget:** ₹23,000 total (30 gifts + packaging + shipping + Design Yatra outreach)

**Next step:** Use seeding-plan.md to identify 20-30 taste-setters from Dan's current following, prepare Design Yatra outreach emails, create seeding tracking spreadsheet.

---

### Eli (Retention/Email & WhatsApp) — Can start NOW
**Primary artifact:** `artifacts/phase-5/email-whatsapp-flows.md` (reference document)
**Timeline:** Set up platforms T-30, flows live by T-20
**Key responsibilities:**
- Set up Klaviyo or Mailchimp account (email service)
- Set up MSG91 or Gupshup account (WhatsApp service)
- Build email flows:
  - Welcome email (T-0, after signup)
  - Post-purchase email (order confirmation + tracking)
  - Abandoned cart email
  - Drop announcement emails
- Build WhatsApp broadcasts (no 1-on-1 chat requirement, just broadcast list)
- Create double opt-in workflow for email
- Track email open rates (target: 35%+)
- Track WhatsApp CTR (target: 15%+)
- Prepare broadcast messaging schedule (see content-calendar.md)

**Voice for Email/WhatsApp:**
- Same 5 rules as Instagram
- Tone: personal, direct, like a DM from a friend
- No "we're delighted to announce"
- More: "Hey — new thing dropped you should know about"

**Next step:** Select email platform (Klaviyo recommended), set up accounts, review email-whatsapp-flows.md for flow templates, prepare list-building CTAs for Rachel and Chase to use.

---

### Tobi (Build Lead) — READY TO ACTIVATE (Waiting on Fynd Access)
**Primary artifact:** `artifacts/phase-4/technical-implementation-plan.md`
**Timeline:** 45 hours estimated, parallel with Dan's photography + copy
**Key responsibilities (in order):**
1. Fynd platform config (store settings, domain, GST, tax zones)
2. Payment integration — Razorpay (UPI, cards, wallets, EMI)
3. Shipping integration — Shiprocket (multi-carrier, COD, auto-AWB)
4. Analytics — GA4 property + Clarity heatmaps
5. CSS/Darkroom theme implementation (tokens first, then components)
6. Homepage build
7. Collection pages (card stickers hero, No Filter hero, supporting collections)
8. Product detail pages
9. Cart drawer + checkout flow
10. Gifting hub + bundles
11. About page + Drop hub shell
12. Performance audit (<3s LCP on 4G)
13. QA handoff to James

**Non-negotiable constraint:** LCP <3s on 4G is a launch blocker. If it fails, James does not clear launch.

**Visual direction (locked — D-015):**
- Darkroom hybrid with Type Pressure
- Base: #1A1A1A (off-black)
- Text: #F5F0EB (warm white)
- Accent: #E63B2E (red)
- Secondary: #F2D024 (yellow)
- Typography: Barlow Condensed (headings) + Inter (body)
- Font-display: swap (performance requirement)
- Gifting surface exception: #F5F0EB background ONLY on /gifts/, /bundles/, checkout

**What Tobi Needs from Others:**
- Dan: Fynd credentials + product photos + product copy (Phase 4 mid-point)
- James: QA checklist + test scripts (Phase 4 end)
- Andy: Shiprocket configuration confirmation (Phase 4 mid-point)

**Next step:** Await Fynd credentials. In the meantime, review technical-implementation-plan.md end-to-end, plan CSS architecture, prepare component list, create timeline for the 13 build tasks.

---

## PHASE 4 GATE CRITERIA (Before Phase 5 Activates)

All of the following must be TRUE:

- [ ] Staging site live on Fynd
- [ ] All hero products uploaded with real photos and copy
- [ ] Razorpay processing live (test + real transactions)
- [ ] Shiprocket generating AWBs (including COD tested end-to-end)
- [ ] GA4 tracking all key events (page view, add to cart, purchase)
- [ ] LCP <3s on 4G confirmed
- [ ] **James has signed off** (no P0/P1 issues open)
- [ ] COD tested end-to-end
- [ ] At least 3 collections live with correct products

**Gate approval:** Harley reviews, James controls sign-off.

---

## DAN'S PARALLEL TRACK

### Photography (Start immediately)
- **Timeline:** T-30 to T-0, deliverable by Phase 4 mid-point
- **Location:** Dark rig (posterboard #1A1A1A + desk lamp)
- **Products:** 15 hero SKUs from asset-list.md
- **Output:** Photos go to `/assets/photography/` — Tobi will use these on product pages
- **Quality:** Phone camera acceptable, colors must be accurate

### Product Copy (Start immediately)
- **Timeline:** T-30 to T-0, deliverable by Phase 4 mid-point
- **Scope:** Top 15 SKUs, collection headers, About page (3 sections total)
- **Voice rules:** 5 rules from copy-system.md — non-negotiable
- **Output:** Copy goes to artifact or spreadsheet — Tobi will implement in site
- **Example:** Instead of "unique card stickers," use "Your bank card doesn't have to be boring"

### Design Yatra Outreach (for Rachel)
- **Timeline:** T-30 onward
- **Your role:** Write personalized outreach emails (template in seeding-plan.md)
- **Activation:** Rachel executes, you review and approve
- **Volume:** 5-10 people from Design Yatra community first wave

---

## CURRENT BLOCKERS TO RESOLVE (From Dan)

**These three things must happen before Tobi and James can make progress:**

1. **Fynd store access credentials**
   - What: Login email + password + admin panel access
   - Where: Send to Harley (will be used by Tobi only)
   - When: ASAP — this is the critical path blocker

2. **Photography rig setup confirmation**
   - What: Dark background (matte black, #1A1A1A), desk lamp, phone camera ready
   - Where: Your desk/studio
   - When: Today or tomorrow — so you can start shooting by T-30

3. **Copy system review**
   - What: Read `artifacts/phase-3/copy-system.md` (5 voice rules, banned words, examples)
   - Where: Read in Harley's artifact directory
   - When: Before you start writing product copy

---

## PARALLEL PHASE 5 PREP (Teams Can Start Planning)

While Phase 4 build is underway, Phase 5 teams are preparing:

- **Chase:** 10 pre-launch posts scheduled
- **Rachel:** Subscriber list building to 500+
- **Eli:** Email/WhatsApp flows live and tested
- **Casey:** Reels + visuals produced
- **Nik & Andrew:** Launch narrative + runbook ready to execute (but NOT publishing until Phase 4 gate passes)

---

## NEXT IMMEDIATE STEPS FOR HARLEY

1. **Ask Dan for three blockers** (Fynd access, photography rig, copy system confirmation)
2. **Spawn agents immediately:**
   - James (QA)
   - Andy (Ops)
   - Chase (Social)
   - Rachel (Seeding)
   - Eli (Retention)
3. **Queue Tobi** — ready to activate the moment Fynd credentials arrive
4. **Update weekly status** at end of each working session
5. **Track Phase 4 gate progress** — James owns launch sign-off

---

**Status:** Ready. Waiting on Dan.
