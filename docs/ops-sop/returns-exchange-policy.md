<!-- last-updated: 2026-03-27 -->
# Returns & Exchange Policy

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build |
| **Producing Agent** | Patrick (Finance & Operations) |
| **Date** | 2026-03-27 |
| **Status** | draft |
| **Reviewer** | Dan |

---

## CUSTOMER-FACING POLICY

The content in this section is what appears on theproductlab.in/returns (or via customer support channels).

---

### Our Returns Promise

We stand behind everything we ship. If something arrives and it's not right — wrong item, damaged in transit, or just not what you expected — we make it right.

---

### CAN I RETURN SOMETHING?

**Yes, if:**
- Your order arrives within 30 days
- The item is unused, unworn, and in original condition
- Original packaging is intact (or can be reasonably restored)
- All tags are attached (if applicable)
- For card stickers: backing film is still in place (not applied to a card)

**No, if:**
- Item has been used, worn, or applied
- Tags have been removed or damaged
- Packaging shows signs of wear
- Item has been exposed to sun, moisture, or extreme conditions
- 30 days have passed since you received it

**Non-returnable items:**
- Bundles once opened (includes multiple items)
- Custom or personalized orders
- Digital products (if we ever offer them)

---

### HOW DO I START A RETURN?

**Step 1:** Message us on WhatsApp or email productlab.info@gmail.com with:
- Your order number
- Photo of the item (with tags visible, if applicable)
- Reason for return

**Step 2:** We'll respond within 24 hours with:
- Return authorization number (RAG-001, etc.)
- Your prepaid return shipping label (see "Shipping Your Return" below)
- Refund timeline based on your payment method

**Step 3:** Pack the item in its original packaging (or a small box if original is damaged). Include your return authorization number on the package.

**Step 4:** Drop off at any courier partner location. We'll track it from there.

---

### HOW MUCH DOES RETURN SHIPPING COST?

**If you paid with Prepaid (card, UPI, wallet):**
- We cover return shipping cost (₹40-80, India-wide)
- Return label provided by us (prepaid)
- No cost to you

**If you paid with Cash on Delivery (COD):**
- You pay return shipping to courier partner (~₹40-80, depending on your city)
- You can arrange your own courier or we can send a label (you still pay, we reimburse at end)
- We reimburse return shipping when we process your refund

---

### WHEN DO I GET MY MONEY BACK?

**If you paid with Prepaid (card, UPI, wallet):**
- We receive your return → verify condition (24 hours)
- We process refund → amount credited to original payment method
- **Timeline: 5-7 business days from when we receive the item**
- Your bank or UPI app may take another 1-2 business days to show the credit

**If you paid with COD (cash on delivery):**
- We receive your return → verify condition (24 hours)
- We process refund → bank transfer to the account details you provide
- **Timeline: 7-10 business days from when we receive the item** (because we need your bank details)
- Please include your bank account number (with IFSC code) when initiating return

---

### I WANT TO EXCHANGE INSTEAD. HOW DOES THAT WORK?

We don't swap one item for another in-box. Instead:
1. Start a return (same process as above)
2. Once we receive and verify your item, we'll process the refund
3. You reorder the item you actually want (you get the same prepaid discount if available)

**This takes longer than a simple swap, but it's clearer for both of us.**

If the item is genuinely wrong (we sent you the wrong thing), email us immediately and we'll expedite a replacement at no cost.

---

### I RECEIVED A DAMAGED ITEM. WHAT NOW?

**Photo first.** The moment you open the box, if something is broken or damaged:
1. Take a photo of the damage (with the item and packaging visible)
2. Message us on WhatsApp or email with the photo + order number
3. Do NOT throw away the packaging

We'll either:
- Send you a replacement at no cost (ship within 48 hours)
- Process a full refund (you return the item with packaging)
- Give you a partial refund if you prefer to keep it (your call)

**Response time: Same day or next morning.**

---

### I LOST MY RECEIPT / CAN'T FIND MY ORDER NUMBER.

No problem. Message us:
- Email address you used to place the order
- Approximate date of purchase
- What you ordered

We'll find it and send you everything you need.

---

### COMPLAINING ABOUT CONDITION AFTER 30 DAYS

If you discover an issue after 30 days (defective manufacture, material failure, etc.), message us anyway. We'll ask for evidence and decide case-by-case. We're not trying to dodge legitimate problems — we just need 30 days to be the hard cutoff so returns don't become indefinite.

---

## INTERNAL PROCEDURES FOR DAN

This section describes how to handle returns operationally. Use this as your checklist.

---

### STEP 1: CUSTOMER INITIATION & RETURN AUTHORIZATION

**When customer messages on WhatsApp or emails:**

1. **Check if return is eligible:**
   - Is the order less than 30 days old? (Check Fynd order date)
   - Does item condition match the policy? (Ask for photo if not clear)
   - Is the item non-returnable? (Bundles, custom items, digital)

2. **If INELIGIBLE:**
   - Reply within 2 hours (WhatsApp priority): "Thanks for reaching out. Unfortunately, this item doesn't qualify for return because [reason]. However, if you believe there's a defect, feel free to share more details."
   - Document reason in return log (see Step 5 below)

3. **If ELIGIBLE:**
   - Generate Return Authorization number: Use format RAG-### (001, 002, etc.) — count sequentially, log in spreadsheet
   - Reply within 2 hours:
     ```
     Hi [customer name],

     Thanks for reaching out. We've approved your return.

     Return Authorization: RAG-001
     Your return address: [use Ink Fish production facility address in Bangalore]
     Courier: You can use any courier. We're sending a prepaid label below (if prepaid payment).

     [Attach or link prepaid shipping label if prepaid payment method]

     Once we receive and verify your item, we'll refund you:
     - Original payment method within 5-7 business days (if prepaid)
     - Bank transfer within 7-10 business days (if COD) — please share your bank details when you ship

     Any questions, just reply here.
     - The Product Lab
     ```

   - **Prepaid returns:** Generate label via Shiprocket (India-wide prepaid label, ₹0 cost to customer)
   - **COD returns:** Ask customer for return shipping preference (they pay now, refund later; or they arrange)

4. **Log the return:**
   - Create entry in RETURNS LOG (Sheet in inventory-tracker.xlsx or separate doc)
   - Fields: Date initiated, Order #, Product (SKU), Customer name, Payment method, Reason, RAG#, Status

---

### STEP 2: CUSTOMER SHIPS ITEM TO YOU

Customer receives the prepaid label (if prepaid) or arranges their own courier (if COD). They pack the item with original packaging and include the RAG number.

**Your job:** Nothing, until package arrives. The courier will deliver to the address on the return label (Ink Fish production facility).

---

### STEP 3: YOU RECEIVE RETURN — CONDITION VERIFICATION

**Timeline: Within 24 hours of receiving the return package**

**Location:** Unpack in a quiet area where you can inspect carefully.

**Inspection checklist:**
- [ ] Item is unworn / unused
- [ ] All original tags are present and intact
- [ ] Original packaging is present (or reasonably intact)
- [ ] For card stickers: backing film is NOT applied (still in place)
- [ ] For keychains / pins: no visible wear, scratches, or scuffs
- [ ] For magnets: no damage to printing
- [ ] No smell of smoke, perfume, or other contamination
- [ ] No missing pieces or components

**If condition is GOOD:**
- Item is refundable — proceed to Step 4

**If condition is QUESTIONABLE:**
- Take a photo (with your phone, in daylight)
- Message customer on WhatsApp: "We received your return. Condition looks [condition]. Can you clarify [specific question]?" (e.g., "There's a small mark on the back — is this from shipping or was it on the item before?")
- Customer has 24 hours to respond
- If customer disputes your assessment, offer a partial refund (50-75%) and keep the item, or ask them to pay return shipping and re-ship

**If condition is POOR (clearly used, damaged, worn):**
- Reject return
- Message customer: "Thanks for sending this back. Unfortunately, the item shows signs of use (specific details), so it doesn't meet our return condition. We can't refund this one, but let us know if you'd like to discuss further."
- Return the item at your cost, or ask customer if they want to abandon it (and you donate / repurpose)

---

### STEP 4: PROCESS THE REFUND

**Timeline: Immediately after condition verification (usually same day)**

**For PREPAID orders (card, UPI, wallet):**
1. Log into Razorpay dashboard
2. Find the original transaction
3. Issue refund via Razorpay (not a manual bank transfer)
4. Razorpay processes to original payment method
5. Customer sees credit in 5-7 business days (depending on their bank)
6. Message customer on WhatsApp: "We've processed your refund of ₹[amount]. You should see it in your [payment method] within 5-7 business days. RAG-001 complete."

**For COD orders (cash on delivery):**
1. Customer should have provided bank details when initiating return
2. If not: Message customer requesting:
   - Bank account holder name
   - Bank account number
   - IFSC code
   - Bank name (optional but helpful)
3. Once you have details, initiate bank transfer:
   - Use your Ink Fish business account (or TPL account if Dan has one)
   - Enter customer details
   - Refund amount = original COD transaction amount (less any return shipping they paid upfront)
   - Reference: "Return RAG-001, [customer name]"
   - Process transfer within 24 hours
4. Message customer: "Your refund of ₹[amount] has been initiated to your bank account. It should appear within 2-3 business days. RAG-001 complete."

**Note on COD refund timing:** If customer paid return shipping upfront, calculate:
- Original COD amount: ₹X
- Return shipping they paid: ₹Y
- Refund = ₹X − ₹Y (but this is rare; most ask you to reimburse, which you do via bank transfer)

---

### STEP 5: WHAT TO DO WITH THE RETURNED ITEM

**After condition verification and refund processing:**

**If item is SELLABLE (unused, all tags, original packaging):**
- Restock it immediately
- Update inventory-tracker.xlsx SHEET 2: Add 1 unit back to that SKU's stock count
- Log in OPERATIONS LOG (SHEET 3): "Return RAG-001 received, restocked CS-001"
- Item is now available for future orders

**If item is SELLABLE but condition is IMPERFECT (minor cosmetic defect):**
- You have options:
  1. Restock as-is and mark "B-grade" in notes (reduces price on next order if customer notices)
  2. Store for bundle filler (non-hero items only)
  3. Keep for sample / photography use
- Log: "Return RAG-001 received, B-grade stock, held for bundling"

**If item is NOT SELLABLE (used, damaged, worn):**
- You have options:
  1. Keep for Ink Fish production reference (defect analysis)
  2. Donate to a local school, community center, or artist collective
  3. Scrap it (not preferred, but an option if it's truly ruined)
- Log: "Return RAG-001 received, unsellable condition, [reason], [disposition]"

---

### STEP 6: LOG AND CLOSE THE RETURN

**At the end of the day, update your RETURNS LOG:**

| RAG # | Order # | Customer | Product (SKU) | Payment | Initiated | Received | Condition | Refund Amount (₹) | Refund Method | Refund Processed | Disposition | Notes |
|-------|---------|----------|-------------|---------|-----------|----------|-----------|-------------------|----------------|-----------------|-----------|----|
| RAG-001 | FYD-98765 | Priya S. | CS-001 | Prepaid | 2026-03-28 | 2026-03-31 | Unused | 199 | Razorpay (refund) | 2026-03-31 | Restocked | Fast turn |
| RAG-002 | FYD-98799 | Raj M. | KC-101 | COD | 2026-03-29 | 2026-04-02 | Used | 0 | None | — | Scrapped | Rejected |

**Why this log matters:**
- At month-end: How many returns? What's the return rate? (Target: <3% of orders)
- Which SKUs have high return rates? (Signal for defect or poor description)
- Which payment methods have higher return rates? (Prepaid vs COD)
- This feeds into Phase 6 optimization

---

### STEP 7: HANDLING EDGE CASES

**"I returned the item but it's been 30 days and I haven't received the refund yet"**

1. Check your RETURNS LOG — what status do you have?
2. If refund was processed: "Your refund was initiated on [date]. Banks usually take 5-7 business days. If it's been longer, reply with your bank name and I'll check with them."
3. If refund wasn't processed yet: "I'm so sorry — I missed this one. Let me process it today. You'll have it within 5-7 business days."
4. Process immediately and update log.

**"The item arrived damaged but I already opened/used part of it"**

1. Ask for photos of the damage + how much was used
2. Decide: Full refund (if manufacturing defect), partial refund (if user damage after opening), or no refund (if clearly used)
3. Message decision to customer with reasoning
4. Most users accept this if you're transparent

**"I want to return it but I'm outside India"**

1. Check customer location
2. If within India: Proceed normally
3. If outside India: "Unfortunately we can't manage international returns right now. If you reach out within 48 hours of purchase, we can offer a full refund instead of a return." (This saves you courier costs.)

**"I ordered from Instagram/WhatsApp, not the website"**

If customer has a receipt or order confirmation, treat it the same as website orders. If not:
1. Ask for payment proof (screenshot of transfer, COD delivery confirmation, etc.)
2. Match to your Fynd order history (look up customer phone number or name)
3. Proceed with normal return

---

### QUICK REFERENCE: RETURN DECISION TREE

```
Customer asks for return
├─ Is order < 30 days old?
│  └─ NO → Reject. Offer to investigate if defect claim.
│  └─ YES → Continue
├─ Is item unused / unworn / original packaging intact?
│  └─ NO → Reject or offer partial refund (depends on specific condition)
│  └─ YES → Continue
├─ Is item a bundle / custom / non-returnable?
│  └─ YES → Reject
│  └─ NO → Continue
├─ Approve return
├─ Generate RAG #, send return label (if prepaid)
├─ Wait for item to arrive
├─ Verify condition on receipt (24 hrs)
├─ Process refund (same day as verification)
└─ Restock item or dispose

```

---

### COMMUNICATION TEMPLATES

Use these to respond to common return scenarios. Adapt with customer name + specifics.

**Template 1: Approved Return (Prepaid)**
```
Hi [name],

Thanks for reaching out. We've approved your return.

Return Authorization: RAG-[number]
Return address: The Product Lab, Ink Fish Production, [address]

We're attaching a prepaid return label. Just pack the item in its original box, include this RAG number, and drop it off at any courier location.

Once we receive and verify the item, we'll refund you to your original payment method. You should see the credit within 5-7 business days.

Any questions, just reply here.
- The Product Lab
```

**Template 2: Approved Return (COD)**
```
Hi [name],

Thanks for reaching out. We've approved your return.

Return Authorization: RAG-[number]
Return address: The Product Lab, Ink Fish Production, [address]

You can arrange a return with any courier partner (~₹40-80 depending on your city). Once you ship, reply here with:
- Courier name
- Tracking number
- Your bank account details (for refund)

Once we receive and verify the item, we'll refund you via bank transfer. You should see the money within 7-10 business days.

Any questions, just reply here.
- The Product Lab
```

**Template 3: Rejected Return (Past 30 Days)**
```
Hi [name],

Thanks for reaching out. Unfortunately, we've passed the 30-day return window (your order was from [date]). We keep that window tight so both of us know where we stand.

That said, if you believe there's a manufacturing defect or the item is broken, just let me know and we can talk through it. No promises, but I won't turn you away without listening.

- The Product Lab
```

**Template 4: Rejected Return (Used Condition)**
```
Hi [name],

Thanks for sending the item back. I appreciate the effort.

The item shows signs of wear/use ([specific details]), so it doesn't meet our "unused condition" requirement. I can't process a full refund on this one.

I'm happy to offer [options — e.g., 50% refund and you keep item, or you cover return shipping and we resend, etc.]. Let me know what works for you.

- The Product Lab
```

**Template 5: Refund Processed**
```
Hi [name],

Your return has been received and verified. We've processed a refund of ₹[amount] to your [payment method].

You should see this in your account within 5-7 business days (some banks are slower).

Thanks for the return. If you ever want to give us another shot, let me know.

- The Product Lab
```

---

### VOLUME & TIME EXPECTATIONS

**Time to process one return (start to finish):**
- Customer initiation to RAG issue: 15 min
- Condition verification on receipt: 10 min
- Refund processing: 5 min
- Documentation: 5 min
- **Total: 35 minutes per return**

**Expected return volume at launch:**
- Conservative: 1-2 returns per 50 orders (2-4% return rate)
- Monthly at 200 orders: 4-8 returns
- This scales with volume; your main bottleneck will be courier pickup coordination

**Peak times:**
- First week of launch (customers testing product fit)
- Week after major campaign drops (volume surge → more returns)
- Plan for 1-2 hours of return handling on weeks with multiple returns

---

### COMPLIANCE NOTES

**India ecommerce return standards (Consumer Protection Act, 2019):**
- ✅ We comply: 30-day return window exceeds most guidelines (some require only 7 days, some 14 days)
- ✅ We comply: We accept returns on prepaid orders
- ✅ We comply: Refund timelines are clear and disclosed upfront
- ✅ We comply: Return shipping is seller-paid (for prepaid orders, not COD)
- ⚠️ Note: COD returns are a gray area legally. We require customers to pay return shipping on COD orders because COD itself absorbs our payment risk. This is standard practice but worth noting if customer escalates.

If a customer disputes this or threatens legal action over a return, escalate to Dan or Harley (outside the scope of this operational procedure).

---

### INTEGRATION WITH OTHER SYSTEMS

**This policy references:**
- Razorpay (for prepaid refunds)
- Shiprocket (for return labels on prepaid orders)
- Fynd order history (to verify order date and original payment method)
- Customer WhatsApp + Email (primary communication channels)

**This policy feeds into:**
- inventory-tracker.xlsx (returned items restocked)
- Phase 6 optimization plan (return rate analysis, product quality signals)
- Customer trust signals (returns handled well = repeat purchases)

---

## VOICE & TONE NOTES

This policy uses the TPL brand voice (from artifacts/phase-3/copy-system.md) in the customer-facing section:

- **Opinionated:** We name what's returnable and what's not (no hedging with "we recommend" or "most customers")
- **Direct:** We don't apologize for the 30-day window or return shipping costs — we explain why
- **Short enough to forward:** Customer-facing sections can be copy-pasted into WhatsApp without losing meaning
- **Named outcomes:** "You get your money back in 5-7 days" not "please allow 5-7 business days for processing"

The internal procedures section is operational (not brand voice) — clarity and completeness matter more than attitude here.

