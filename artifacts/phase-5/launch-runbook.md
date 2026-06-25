<!-- last-updated: 2026-03-26 -->
# Launch Runbook — Day-by-Day Operations Manual

| Field | Value |
|-------|-------|
| **Phase** | 5 — Relaunch Campaign and Go-Live |
| **Producing Agent** | Andrew (Campaign Lead) + Tony (Brand Ops) |
| **Date** | 2026-03-26 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## Part 1: T-7 Checklist (7 Days Before Launch)

This is the last checkpoint before going live. Everything on this list must be done and verified. If any item is not 100% complete, delay the launch by one week.

---

### Product & Catalog

- [ ] All hero products (card stickers, attitude keychains, pins) are live on staging site with final photography
- [ ] Product descriptions match copy-system.md voice guidelines (Joanna reviews)
- [ ] All product pages include artist attribution where applicable
- [ ] Pricing is final and confirmed (₹149-199 card stickers, ₹249 keychains, ₹249-299 pins)
- [ ] Product images load correctly on mobile (all images <1MB for 4G speed)
- [ ] Bundle products are created (e.g., card sticker + keychain combo at ₹399-499)
- [ ] Out-of-stock products are hidden (no "coming soon" products visible)
- [ ] Variant selector works correctly (half card vs. full card, color options)
- [ ] Related products are set up on each product page (upsells, cross-sells)

### Site & Checkout

- [ ] Homepage is live and finalized (hero section, collections visible)
- [ ] Navigation is correct (Products, About, Contact visible and working)
- [ ] Checkout flow tested end-to-end (add to cart → payment → confirmation)
- [ ] Payment gateway configured: Razorpay (UPI, cards, wallets) and COD via Shiprocket
- [ ] Razorpay test transactions completed (₹1 test transaction successful)
- [ ] COD order flow tested (Shiprocket integration working)
- [ ] Free shipping threshold is set (target: ₹499+)
- [ ] Discount code "EARLYBIRD" created (10% off, valid for first 500 orders)
- [ ] Cart page displays correctly (item count, price, shipping estimate)
- [ ] Mobile checkout is optimized (<3 second load time on 4G)
- [ ] Error pages configured (404, 500, etc. are branded)
- [ ] SSL certificate is valid (green lock icon visible in all browsers)

### Analytics & Monitoring

- [ ] Google Analytics 4 is installed and firing correctly
  - [ ] Test transaction shows up in GA4 with full flow
  - [ ] Events are tracking: add-to-cart, initiate-checkout, purchase
- [ ] Microsoft Clarity is installed and recording sessions
- [ ] Conversion tracking is set up (pixel-based, not just GA4)
- [ ] Error tracking is set up (Sentry or equivalent to catch bugs)
- [ ] Daily metrics dashboard is created (Google Sheet template ready)

### Communication

- [ ] Email service is live: Klaviyo or Mailchimp account set up
- [ ] Welcome email sequence is live and tested (test subscriber receives all 3 emails)
- [ ] Abandoned cart emails are configured and tested
- [ ] Post-purchase emails are configured and tested
- [ ] WhatsApp Business account is set up and verified
- [ ] WhatsApp broadcast list is ready (200+ subscribers confirmed)
- [ ] Gupshup or MSG91 is configured for broadcast sends

### Content

- [ ] All 10 pre-launch Instagram posts are published and live
- [ ] Instagram profile is updated with new bio and link-in-bio
- [ ] Instagram Highlights are set up (New, No Filter, Cards, Artists, FAQs)
- [ ] Launch day Reel is created and scheduled for 9:00 AM
- [ ] Launch day email is written and scheduled for 9:00 AM
- [ ] WhatsApp broadcast message is drafted and ready to send manually at 9:05 AM

### Fulfillment & Operations

- [ ] Inventory is confirmed (all hero products are in stock and counted)
- [ ] Shiprocket account is live and configured
- [ ] Shipping labels can be generated from Fynd (test label created)
- [ ] COD settings are correct in Shiprocket (cash handling process clear)
- [ ] Packaging materials are ready (boxes, tissue paper, business cards, notes)
- [ ] Packing SOP is written and Dan is familiar with it (order → pack → label → ship)
- [ ] Shipping partners are confirmed (Shiprocket will deliver to all Tier 1 and Tier 2 cities)

### Social Proof & Seeding

- [ ] 20+ seeded customers have received gifts
- [ ] 10+ pieces of social proof are documented (screenshots saved)
- [ ] Seeding log is complete (who got gifted what, when)
- [ ] Permission is confirmed from customers before using their photos/posts

### Backup & Contingency

- [ ] Database backup is scheduled (daily)
- [ ] Site backup is scheduled (daily)
- [ ] Fynd support contacts are saved (phone, email, ticket number)
- [ ] Razorpay support contacts are saved
- [ ] Shiprocket support contacts are saved
- [ ] Dan has tested calling each support line (confirm wait times, response)

### Final Sign-Off

- [ ] James (QA) sign-off: "Site is production-ready, no critical bugs"
- [ ] Harley (Program Director) sign-off: "All materials are on-brand, copy is correct, launch plan is solid"
- [ ] Dan (Owner) sign-off: "I'm ready to go live"

---

## Part 2: T-1 Checklist (The Night Before Launch)

This is the final 24 hours. Dan does this checklist the evening before launch (5:00 PM the day before).

### Site Final Check

- [ ] Log in to Fynd/Shopify, navigate homepage, verify everything looks correct on mobile and desktop
- [ ] Add a test product to cart, complete a test purchase with a test payment method (₹1 transaction)
- [ ] Check that test order appears in Fynd admin and Razorpay dashboard
- [ ] Verify test order confirmation email was sent
- [ ] Check that site is loading fast (use PageSpeed Insights, target: >90 on mobile)
- [ ] Verify all product images are loading correctly
- [ ] Test all external links (About, Contact, Instagram, etc.)

### Email & Communication Final Check

- [ ] Launch day email is ready to send at 9:00 AM (copy, subject line, images verified)
- [ ] WhatsApp message is drafted and ready (will be sent manually at 9:05 AM)
- [ ] Instagram Reel is scheduled for 9:00 AM (or will be manually posted)
- [ ] Email list subscriber count is confirmed (target: 400+)
- [ ] WhatsApp list subscriber count is confirmed (target: 200+)

### Fulfillment & Operations Final Check

- [ ] Packing materials are organized and ready
- [ ] Dan knows the packing process (product → tissue → business card → order note → box → label → ready to ship)
- [ ] Shiprocket labels can be printed on demand (test label printed and verified)
- [ ] Shipping estimation tool is checked (how long will delivery take to major cities?)

### Analytics & Monitoring Final Check

- [ ] Google Analytics 4 is connected and showing real-time data
- [ ] Microsoft Clarity is recording (check Real Time dashboard)
- [ ] DebugView is enabled in GA4 (to see real-time conversion data on launch day)
- [ ] Daily metrics spreadsheet is created and ready to fill in at 6:00 PM launch day

### Contingency Prep

- [ ] Fynd/Shopify status page is bookmarked (will check if there are any service issues)
- [ ] Razorpay status page is bookmarked
- [ ] List of support contacts is printed or saved to phone:
  - Fynd support: [phone/email]
  - Razorpay support: [phone/email]
  - Shiprocket support: [phone/email]
- [ ] Dan's personal email is confirmed as the primary contact for all services

### Final Mental Prep

- [ ] Dan has reviewed the launch narrative (knows the story he is telling)
- [ ] Dan has reviewed the first day's schedule (hour-by-hour, T-0 to T+13)
- [ ] Dan is not stressed (this is exciting, not terrifying; if terrified, we have a problem to fix)

---

## Part 3: T-0 Execution (Launch Day, Hour-by-Hour)

Launch day is scripted down to the hour. Dan follows this schedule exactly.

### 8:45 AM (T-15 Minutes)

**Action:** Final 15-minute prep

- [ ] Take a screenshot of the homepage (archive it as proof of day-1 state)
- [ ] Log into GA4 and enable DebugView (so real-time data is visible)
- [ ] Log into Razorpay dashboard (to see payment confirmations in real-time)
- [ ] Open email client — verify launch email is ready to send
- [ ] Open WhatsApp Business — verify message is drafted and ready to send
- [ ] Have Instagram open in a new tab (to verify Reel posts successfully at 9:00 AM)
- [ ] Deep breath. You are ready.

### 9:00 AM (T-0)

**Action:** Go live

#### 9:00 AM — Publish Instagram Reel

- Publish the launch Reel (or confirm it publishes if it was scheduled)
- Reel title: "We're live."
- Caption: (see content-calendar.md)
- First comment on the Reel: Include the shop link (in case link sticker fails)
- Verify the Reel is visible on the Instagram profile within 60 seconds

#### 9:01 AM — Send Launch Email

- Open Klaviyo/Mailchimp
- Send the launch email to all 400+ subscribers
- Subject: "It's live." (see email-whatsapp-flows.md for full copy)
- Monitor delivery status (should say "sent" within 30 seconds)
- Take a screenshot of the sent email (archive as proof)

#### 9:02 AM — Check Traffic

- Open GA4 DebugView
- Verify sessions are coming in (should see first few users within 30-60 seconds)
- Screenshot the DebugView showing real-time traffic

### 9:05 AM (T+5 Minutes)

**Action:** Send WhatsApp broadcast

- Open Gupshup/MSG91 or WhatsApp Business
- Send the launch broadcast to all 200+ WhatsApp subscribers
- Message: "The Product Lab is live. Card stickers. Attitude keychains. Original artist pins. First 50 orders get 10% off. [link]"
- Monitor delivery status
- Take a screenshot of the sent broadcast

### 10:00 AM (T+1 Hour)

**Action:** Early metrics check

Open GA4 DebugView and record:
- **Sessions so far:** [number] (target: 50+ sessions)
- **Add-to-cart events:** [number] (target: 10+ events)
- **Completed orders:** [number] (target: 2+ orders)
- **Top traffic source:** [Instagram / Email / WhatsApp / Organic / Direct]

If sessions or orders are very low (< 10 sessions), do not panic. Wait until 12:00 PM. People take time to click through. Email click rates peak at 1-3 hours after send.

If there is a critical error (checkout not working, payment failures), escalate immediately:
1. Check Fynd/Shopify status page
2. Check Razorpay status page
3. If all services are up, call Fynd support: [phone]

### 12:00 PM (T+3 Hours)

**Action:** Mid-day metrics + Instagram Story

#### 12:00 PM — Record Metrics

Open GA4 and record:
- **Total sessions (9:00 AM - 12:00 PM):** [number] (target: 100-150)
- **Total add-to-cart:** [number] (target: 15-25)
- **Total orders:** [number] (target: 3-7)
- **Conversion rate:** [order / sessions %] (target: 2-3%)

If conversion rate is <1%, something is broken. Check:
- Is checkout working? (complete a test purchase)
- Are people reaching checkout? (add-to-cart events should be 5-10x orders)
- Are there payment errors? (check Razorpay dashboard for failed transactions)

#### 12:00 PM — Publish Instagram Story

- Screenshot the metrics from GA4 (blur sensitive data, keep order count visible)
- Instagram Story: "[X] people bought in the first 3 hours."
- Add a link sticker to the shop
- Post the Story

#### 12:00 PM — Check Instagram DMs

- Open Instagram DMs
- Read all messages from the last 3 hours
- Reply to any product questions within 30 minutes
- Respond in TPL brand voice (direct, helpful, no fluff)

### 6:00 PM (T+9 Hours)

**Action:** Daily metrics review + Instagram Story

#### 6:00 PM — Record Full Day Metrics

Open GA4, Razorpay, and Shiprocket. Record in daily metrics spreadsheet:

| Metric | Value | Target |
|--------|-------|--------|
| Total sessions | [X] | 200-300 |
| Total add-to-cart | [X] | 30-50 |
| Total orders | [X] | 5-15 |
| Total revenue | [X] | ₹2,000-6,000 |
| Conversion rate | [X]% | 2-3% |
| AOV (avg order value) | [X] | ₹350-400 |
| Top product | [name] | Card stickers or attitude keychain |
| Top traffic source | [source] | Instagram, email, or direct |

#### 6:00 PM — Publish Instagram Story

- Screenshot the revenue or order count (or both, if order count is impressive)
- Instagram Story: "[X] orders in the first day."
- If any customers have asked to be tagged, tag them and thank them
- Add a link sticker to the shop

#### 6:00 PM — Check Fulfillment

- Log into Fynd/Shopify and view all orders from the day
- For each order:
  - Verify payment is confirmed (not failed, not pending)
  - Verify shipping address is complete (no missing data)
  - Verify customer email is correct (for tracking email to be delivered)

If there are any payment issues, COD orders with concerns, or address problems:
- Take note and plan to address in the morning
- For now, note the issue in the daily log

#### 6:00 PM — Pack First Orders (If Any)

If there are 3+ orders, pack them this evening:
1. Print the shipping label for each order from Shiprocket
2. Gather products from inventory (card sticker, keychain, etc.)
3. Pack the box: tissue paper, products, business card, handwritten order note
4. Seal the box and apply the shipping label
5. Set aside for morning pickup

If there are <3 orders, wait until morning to pack.

### 8:00 PM (T+11 Hours)

**Action:** Evening DM response + content preparation

#### 8:00 PM — Reply to All DMs and Comments

- Open Instagram DMs
- Reply to all messages from the last 8 hours (even if you replied earlier, new messages may have come in)
- Target: reply within 2 hours of any DM
- Copy questions and answers into a "FAQ" document (may become FAQ highlight on Instagram)

#### 8:00 PM — Respond to Email Replies

- Check personal email for replies to the launch email
- Reply to any feedback, questions, or complaints within 2 hours
- Save positive feedback (may use as testimonials)

#### 8:00 PM — Prepare Tomorrow's Content

- Plan tomorrow's Instagram post (see content-calendar.md)
- Prepare any visuals or copy for Day 1 post
- Verify Day 1 post is on schedule

### 10:00 PM (T+13 Hours)

**Action:** Final check, sleep prep

- Check Fynd dashboard one more time (any new orders? any issues?)
- Check GA4 one more time (any late-evening traffic spike or drop?)
- Check Razorpay for any payment failures or suspicious transactions
- If there are critical errors, log them and plan to address in the morning
- If everything looks normal, close the laptop and go to bed
- Set an alarm for 8:00 AM (to pack orders and prepare for Day 1)

---

## Part 4: First 48 Hours Response Protocol

Launch day is intense. These are the protocols for handling common scenarios in the first 48 hours.

### Response Protocol for Product Questions

**Question:** "Does the card sticker fit my [bank name] card?"

**Response template:** "Yes — it fits standard debit and credit cards. Size is [X]mm x [Y]mm. You can trim it to fit any card shape. Most people apply it to the front, but some apply it to the back. Your call."

**Copy this to a document.** Every product question gets added to an FAQ doc.

---

### Response Protocol for Payment Issues

**Issue:** Customer reports "payment failed" or "I was charged twice."

**Action:**
1. Check Razorpay dashboard for that customer's payment status
2. If charged twice: Issue a refund immediately via Razorpay. Send email: "We refunded [amount] — sorry about that. Your order is still confirmed for [date] shipping."
3. If payment failed: Reply to customer with the error details and ask them to retry or use a different payment method.

---

### Response Protocol for Shipping/COD Issues

**Issue:** Customer is concerned about COD — "How does cash on delivery work?"

**Response template:** "You order now, pay when the package arrives at your door. The delivery person will have a card reader for card payments or accept cash. You don't have to pay anything upfront — you can see the package and pay only if you want it."

---

### Response Protocol for Complaints

**Issue:** Customer received product but it is damaged or defective.

**Action:**
1. Get a photo of the damaged product
2. Offer immediate replacement: "Send me a photo, and I'll ship a replacement right away. No return needed."
3. If photo confirms damage, process replacement same day
4. Take note: which fulfillment partner was used? (May indicate a packing or shipping problem)

---

### Response Protocol for Non-Delivery

**Issue:** Customer's order hasn't arrived 7 days after shipping.

**Action:**
1. Check Shiprocket tracking — where is the package?
2. If stuck in transit: Contact Shiprocket support (phone: [saved contact])
3. If lost: Offer immediate replacement and follow up with Shiprocket for compensation

---

### Response Protocol for Returns/Refunds

**Policy (confirm with Dan before launch):**
- 7-day return window from delivery date
- Item must be unused and in original packaging
- Refund issued within 2 days of receiving returned item
- Shipping cost for return is on customer (or Dan covers for defective items)

**Response template:** "We accept returns within 7 days. Just let me know, and we'll arrange pickup. Once we receive it, we'll refund you within 2 days."

---

## Part 5: Launch Monitoring Dashboard

Dan creates a simple Google Sheet to track daily metrics. This becomes the single source of truth for launch performance.

### Daily Metrics Template

| Date | Sessions | Add-to-cart | Orders | AOV (₹) | Conversion % | Top product | Traffic source | Notes |
|------|----------|-------------|--------|---------|--------------|-------------|-----------------|-------|
| 2026-04-05 | 250 | 40 | 8 | ₹385 | 3.2% | Card sticker | Instagram (40%) | First day strong |
| 2026-04-06 | 180 | 28 | 5 | ₹370 | 2.8% | Keychain | Email (35%) | Weekend traffic lower |
| ... | ... | ... | ... | ... | ... | ... | ... | ... |

**Fill this in every day at 6:00 PM for the first 30 days.**

---

## Part 6: Escalation Path

If something breaks on launch day, follow this path:

### Level 1: Self-Service (0-15 minutes)

- Check if the service is down (Fynd status page, Razorpay status page)
- Restart the browser (clear cache, refresh)
- Test the function again (try a test purchase, test email send, etc.)

### Level 2: Support Chat (15-30 minutes)

- If Level 1 doesn't work, go to the support chat for the service (Fynd, Razorpay, Shiprocket)
- Describe the issue clearly
- Get a ticket number
- Estimated wait: 10-30 minutes

### Level 3: Support Phone (30+ minutes)

- If chat doesn't resolve within 30 minutes, call support phone number
- Have ticket number ready
- Escalate to priority support if available
- Estimated resolution: 30-120 minutes

### Level 4: Escalate to Harley

- If issue is not resolved after 2 hours and is blocking the launch
- Contact Harley (phone: [saved]) with:
  - Issue description
  - Ticket numbers from support
  - What you have already tried
  - Current impact (how many customers affected)
- Harley will assess whether to delay launch or continue with workaround

---

## Part 7: What Success Looks Like (First 24 Hours)

By the end of launch day (10:00 PM), if everything went well:

✓ 150-300 sessions from the Instagram Reel, email, WhatsApp
✓ 20-50 add-to-cart events
✓ 5-15 completed orders
✓ ₹2,000-6,000 in revenue
✓ 2-3% conversion rate
✓ 0 critical errors or payment failures
✓ 3-5 customer DMs, all replied to within 2 hours
✓ 10+ first-day social proof moments (purchases, comments, shares)
✓ All day-1 orders packed and ready to ship by morning

If you hit these numbers, the launch is successful. Growth comes next.

