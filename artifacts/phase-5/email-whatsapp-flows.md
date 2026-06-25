<!-- last-updated: 2026-03-26 -->
# Email & WhatsApp Automation Flows

| Field | Value |
|-------|-------|
| **Phase** | 5 — Relaunch Campaign and Go-Live |
| **Producing Agent** | Eli (Retention Lead) |
| **Date** | 2026-03-26 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## Part 1: Welcome Flow — Email

These are the first three emails a subscriber receives. They set the tone for the entire relationship. The goal: confirm they made the right choice subscribing, give them useful information, and deepen their understanding of the brand.

All copy follows TPL voice: direct, opinionated, no corporate warmth.

---

### Email 1: Welcome (Sent Immediately After Subscription)

**Subject line options (pick one):**
- "You're on the list."
- "Welcome to The Product Lab."
- "Something new is coming. You should know."

(Recommend: "You're on the list." It is short, direct, conversational.)

**From:** Dan (name only, not "The Product Lab team")

**Body:**

---

Subject: You're on the list.

Hey [First Name],

You just subscribed to The Product Lab. Good choice.

Here's what you're getting:

— Early access to new drops (48 hours before everyone else)
— First-look previews of new collections
— Occasional (not daily) updates about what we're making
— No spam. No "we're so excited." Just: here's something new.

Who is The Product Lab? We're a Bengaluru-based accessories brand made by independent artists. Card stickers for your bank card. Attitude keychains with opinions. Pins from designers who mean it.

Not everyone gets it. That's the point.

We're launching the new collection next [date], 9 AM. If you're on this list, you get early access. Everyone else gets regular access. The difference? You're first, and the best stuff might not be there by the time others see it.

See you next [date].

— Dan
The Product Lab

P.S. Want to reply to this email? You can. I read every one. People ask: "Will you actually respond?" Yes. Send feedback, complaints, ideas, questions. I reply within 24 hours.

---

**Why this works:**
- Sets expectations clearly (what they'll get, how often, what they won't get)
- Establishes the brand voice (direct, opinionated, no fluff)
- Creates scarcity without being aggressive (early access, limited stock)
- Invites two-way communication (P.S. is genuine — Dan should reply to emails)
- Gets them excited about the launch

**Technical setup:**
- Trigger: Immediately upon opt-in (no delay)
- Segment: All new email subscribers
- Automation: Single send (not part of a sequence, just this one email)

---

### Email 2: Brand Story (Sent 3 Days After Welcome)

**Subject line options:**
- "Why we built this."
- "The story behind The Product Lab."
- "Why card stickers."

(Recommend: "Why we built this." It answers the question: why does this brand exist?)

**From:** Dan

**Body:**

---

Subject: Why we built this.

Hey [First Name],

Three weeks ago, I handed my debit card to a cashier at a coffee shop. He looked at it, looked back at me, and said: "That's a generic-ass card."

He was not wrong.

Most people carry the same boring card. Same design. Same color. Nothing about it says who you are. Your laptop might have stickers. Your phone might have a case. Your bag definitely has character. But your card? Generic.

So I started asking: why doesn't anyone make card stickers? Something that fits on an actual bank card? Not a case, not a wallet. An actual sticker that lives on the card itself.

Turns out, nobody does. (I checked.)

So we made one.

And then I thought: if the card is generic, what else is generic?

Keychains. Every person has a keychain that says nothing. Store keychains. Generic keychains. Keychains that anyone could carry.

So we made some with opinions. "Bullshit Remover." "Idiot Repellent." "Enjoy the ShitShow." These are keychains for people who have a voice and are not afraid to use it.

And pins. We found independent artists making original designs, and we said: why are we not selling these?

Here's the actual story: The Product Lab was not a plan. It was a frustration. I looked at accessories and realized: they do not have to be generic. They can say something. They can be made by real people. They can be honest.

So we're starting here.

The collection launches next [date]. Every product we're shipping has an opinion. Every product is designed by someone whose name is on it.

See you then.

— Dan

P.S. Want to know what inspired a specific product? Reply and ask. I'll tell you the story.

---

**Why this works:**
- Explains the "why" without corporate mission-speak
- Tells a real origin story (frustrated with generic design)
- Connects the products to a philosophy
- Invites deeper engagement
- Positions Dan as a real person, not a brand

**Technical setup:**
- Trigger: 3 days after first email
- Segment: All new email subscribers
- Automation: Automatically sent (part of the welcome sequence)

---

### Email 3: Product Preview (Sent 7 Days After Welcome)

**Subject line options:**
- "Here's what's launching."
- "First look: The new collection."
- "See what we're about to ship."

(Recommend: "Here's what's launching." Directness, clarity, no hype.)

**From:** Dan

**Body:**

---

Subject: Here's what's launching.

Hey [First Name],

You're about to see the new collection for the first time. Everyone else sees it next [date]. You get 48 hours first.

Here's what you're getting:

**Card Stickers (₹149-199)**
Your bank card upgraded. Takes five minutes to apply. Stays there forever. Waterproof. When you pay, you say something.

**Attitude Keychains (₹249)**
For people who have opinions and do not apologize for them.
— Bullshit Remover (for people whose patience is limited)
— Idiot Repellent (for the friend who quit small talk)
— Enjoy the ShitShow (for realists)
— Straight outta F#_ks to give (for people who decided honesty > politeness)

**Original Lapel Pins (₹249-299)**
Designed by independent artists. Limited runs. Collectible. Each pin comes with the artist's name and bio.

**Why these products:**
Because accessories are the most personal things you carry. We made products for people who have a point of view and are not afraid to show it.

Everything ships in 3-5 days. Everything is made by someone whose name is on it. Nothing is generic.

You get access next [date] at 9 AM. Link coming in your next email.

See you then.

— Dan

---

**Why this works:**
- Gives them a preview so they can decide what they want before launch day
- Explains the "why" behind each product (who it is for)
- Builds anticipation without being desperate
- Clear on pricing so they can budget
- Short enough to read in a minute

**Technical setup:**
- Trigger: 7 days after first email
- Segment: All new email subscribers
- Automation: Automatically sent (part of welcome sequence)

---

## Part 2: Welcome Flow — WhatsApp

WhatsApp is more immediate than email. These are shorter, more personal, sent to people who have explicitly opted in to receive updates on WhatsApp.

---

### Message 1: Welcome (Sent Immediately After Opt-in)

**Message:**

"Hey — thanks for joining the Product Lab list. You're getting early access to the new drop (48 hours before everyone else). Details coming Friday. Quick question: what's your vibe? (card stickers, keychains, pins?)"

**Why this works:**
- Confirms their opt-in (no mystery about what they signed up for)
- Creates engagement immediately (asks a question)
- Gathers preference data (what product interests them)
- Personal and direct (this feels like a real message, not a broadcast)

**Technical setup:**
- Trigger: Immediately upon WhatsApp opt-in
- Segment: All new WhatsApp subscribers
- Send via: Gupshup or MSG91 broadcast
- Expected response: 20-30% will reply with preferences

---

### Message 2: Launch Reminder (Sent 3 Days Later)

**Message:**

"Drop is tomorrow, 9 AM. You get early access for 48 hours (everyone else has to wait). What do you want to see first? [Link to shop]"

**Why this works:**
- Timely reminder (not too early, not too late)
- Builds FOMO (early access is real and limited)
- Asks for feedback (increases engagement)
- Has a direct link (easy conversion)

**Technical setup:**
- Trigger: 3 days after first message
- Segment: All WhatsApp subscribers
- Send via: Broadcast message
- Expected CTR: 15-20% (WhatsApp has much higher CTR than email)

---

## Part 3: Abandoned Cart Flow — Email

When someone adds a product to their cart but does not complete the purchase, this flow kicks in. Goal: remind them about the cart without being pushy. The tone is conversational, not desperate.

---

### Email 1: Abandoned Cart Reminder (1 Hour After Abandonment)

**Subject line options:**
- "You left something."
- "Still thinking about it?"
- "Your cart is waiting."

(Recommend: "You left something." Short, direct, zero assumption.)

**From:** Dan

**Body:**

---

Subject: You left something.

Hey [First Name],

You added [Product Name] to your cart, then left. No judgment. Life happens.

Just wanted to make sure you didn't forget. The [Product Name] is still there, waiting.

Click below to finish your order:
[Checkout link]

If something didn't work (weird error, confusing checkout, unclear product detail), reply and let me know. I'll fix it.

— Dan

P.S. If you decide not to buy, no worries. But if you have feedback on why, I'd genuinely like to know. Reply with whatever — too expensive, wrong color, changed your mind, whatever. I read every one.

---

**Why this works:**
- No urgency or pressure (not "LIMITED TIME" or "ONLY 3 LEFT")
- Acknowledges they may not buy and that is okay
- Invites feedback (helpful for future optimization)
- Tone is conversational, not desperate
- CTA is clear and direct

**Technical setup:**
- Trigger: Cart abandonment (1 hour after last activity in cart)
- Segment: Carts with value >₹150 (do not send for tiny carts)
- Automation: Shopify/Fynd abandoned cart email integration

---

### Email 2: Second Cart Reminder (24 Hours After Abandonment)

**Subject line options:**
- "Still there."
- "[Product Name] is still waiting."
- "One more thing?"

(Recommend: "[Product Name] is still waiting." Specific, light, not desperate.)

**From:** Dan

**Body:**

---

Subject: [Product Name] is still waiting.

Hey [First Name],

Last reminder: the [Product Name] is in your cart. If you want it, grab it now. If you don't, no harm done.

[Checkout link]

That's it. No more emails about this.

— Dan

---

**Why this works:**
- Shorter than email 1 (second reminder should be faster)
- Clear that this is the last reminder (respects their inbox)
- No manipulation or false scarcity
- Direct CTA

**Technical setup:**
- Trigger: 24 hours after abandonment (only if email 1 was sent)
- Segment: Same as email 1
- Automation: Shopify/Fynd abandoned cart sequence

---

## Part 4: Post-Purchase Flow — Email

These emails go out after an order is placed. Email 1 is functional (order confirmation). Email 2 is relational (thank you + engagement).

---

### Email 1: Order Confirmation (Immediate)

**Subject line:** "Order confirmed — [Order Number]"

**From:** The Product Lab

**Body:**

---

Subject: Order confirmed — #12345

Thanks for your order.

**Order details:**
[Product name] x [qty]
[Product name] x [qty]
Total: [amount]

**What happens next:**
We pack and ship within 48 hours. You'll get a tracking email as soon as it ships. Most orders arrive in 3-5 days depending on your city.

If you have questions about your order, reply to this email and I'll help.

— Dan
The Product Lab

---

**Why this works:**
- Functional (has all the info they need)
- Still has personality (from Dan, not "order confirmation system")
- Manages expectations (3-5 days is clear)
- Opens door for questions

**Technical setup:**
- Trigger: Immediately upon order completion
- Segment: All customers
- Automation: Shopify/Fynd order confirmation

---

### Email 2: Thank You + Engagement (7 Days After Order)

**Subject line options:**
- "How's the [Product]?"
- "Hope you love it."
- "Quick question."

(Recommend: "How's the [Product]?" Open-ended, invites response.)

**From:** Dan

**Body:**

---

Subject: How's the [Product]?

Hey [First Name],

Your order should have arrived by now (or be arriving today). Quick question: do you actually like it?

Not the "company asks for review" like. The real like. Does it feel good? Did it say what you wanted it to say? Did you already tell a friend about it?

If yes: awesome. I read every piece of feedback, so feel free to hit reply and tell me what you got right.

If no: even more important. Reply and tell me what is wrong. Bad quality? Wrong size? Changed your mind? I genuinely want to know.

Also, if you liked it and you know someone who would like it: share it. Word-of-mouth is how this brand survives.

— Dan

P.S. If you want to share a photo of your order: send it over. I love seeing what people do with the products.

---

**Why this works:**
- Asks for real feedback (not a fake survey)
- Invites sharing (word-of-mouth without being pushy)
- Opens door for UGC (photos, testimonials)
- Shows that Dan actually cares about the experience
- Tone is genuine, not corporate

**Technical setup:**
- Trigger: 7 days after order completion
- Segment: All customers (or high-value customers >₹350 if budget is limited)
- Automation: Manual send or Klaviyo automation

---

## Part 5: Drop Announcement Flow — Email + WhatsApp

When a new drop launches, both channels get an announcement. Email is longer and strategic. WhatsApp is short and urgent.

---

### Email: Drop Announcement (Subject: New Drop Available)

**Subject line:** "New drop — [Product name] — limited run"

**From:** Dan

**Body:**

---

Subject: New drop — Limited artist series — Available now

Hey [First Name],

New drop just went live: [Product name] by [Artist name].

Here's the thing about limited runs: when they are gone, they are gone. This artist made 50. Once those sell out, that design will not come back.

**The product:**
[1-2 sentence description of what it is]

**The artist:**
[1-2 sentence bio or story about the artist]

**The price:**
[Price]

**Why it matters:**
Every product we drop is designed by an independent artist who keeps ownership of their work. When you buy this, you're supporting someone who makes things they believe in.

**Available:** Now, at [link]
**Until:** [Specific end time or "sold out"]

— Dan

---

**Why this works:**
- Creates urgency (limited run, specific quantity)
- Tells the artist's story (increases emotional connection)
- Clear CTA and direct link
- Not pushy, just factual

**Technical setup:**
- Trigger: Manual send (Dan sends when new drop goes live)
- Segment: All email subscribers
- Platform: Klaviyo

---

### WhatsApp: Drop Announcement (Sent 1 Hour After Email)

**Message:**

"New drop just went live. [Product name] — 50 made, limited artist run. [Link] Grab it before it sells out."

**Why this works:**
- Short (works in WhatsApp)
- Urgent (new drop, limited)
- Direct link (easy conversion)
- Immediate (sent after email so both channels hit at different times)

**Technical setup:**
- Trigger: Manual send via Gupshup or MSG91
- Segment: WhatsApp subscribers
- Timing: 1 hour after email drop so people don't see duplicate messages in same window

---

## Part 6: Re-engagement Flow — Email

For subscribers who have not opened an email in 60 days, send one final re-engagement email. If they don't open this one, unsubscribe them.

---

### Re-engagement Email (60 Days No Opens)

**Subject line:** "Last chance — The Product Lab"

**From:** Dan

**Body:**

---

Subject: Last chance.

Hey [First Name],

You subscribed to The Product Lab but haven't opened an email in a while.

Two options:

**1. You're not interested.** That is fine. No judgment. Hit the unsubscribe link at the bottom and we're done.

**2. You're still interested but you have not seen anything good yet.** Fair. We're launching new stuff next month. Want to stick around?

Either way, just let me know by opening this email or clicking one of the links above.

— Dan

---

**Why this works:**
- Gives them an easy out (explicit unsubscribe offer)
- Does not guilt them
- Acknowledges the gap in communication
- Tone is respectful

**Technical setup:**
- Trigger: 60 days without email opens
- Segment: All subscribers with no opens in 60 days
- Automation: Klaviyo re-engagement campaign
- Post-email: Auto-unsubscribe anyone who doesn't open within 7 days

---

## Part 7: Technical Setup & Platform Recommendations

### Email Platform: Klaviyo (Recommended)

**Why Klaviyo:**
- Easy integration with Shopify/Fynd
- Abandoned cart automation built-in
- Good segmentation and personalization
- Relatively affordable for small brands (<₹5K/month until scale)
- Clean interface, easy to use without developer

**Cost:** ₹500-2,000/month depending on list size (free until 300 subscribers)

**Alternative:** Mailchimp (free up to 10K subscribers, but lacks abandoned cart automation)

### WhatsApp Platform: Gupshup or MSG91

**Why Gupshup (Recommended):**
- Built-in broadcast lists (subscribers can opt-in via QR code)
- Easy integration
- Affordable (₹50-200/month for small volume)
- Messages delivered instantly

**Why MSG91 (Alternative):**
- Similar features
- Slightly cheaper
- Good customer support

**Cost:** ₹50-200/month for small volume (<1,000 messages/month)

### Setup Checklist

- [ ] Klaviyo account created, integrated with Fynd/Shopify
- [ ] Welcome email sequence set up (3 emails, automatic)
- [ ] Abandoned cart emails set up (2 emails, automatic)
- [ ] Post-purchase email set up (2 emails, automatic)
- [ ] Re-engagement email set up (automatic)
- [ ] Gupshup or MSG91 account created
- [ ] WhatsApp broadcast list created
- [ ] WhatsApp QR code generated and added to Instagram bio
- [ ] All copy reviewed and approved by Harley
- [ ] Test emails sent to Dan's personal email (check formatting, links, images)
- [ ] Automation tested with test orders (if possible)

---

## Part 8: Metrics to Track

By end of Month 1, Dan reviews:

**Email metrics:**
- Welcome email open rate (target: >30%)
- Abandoned cart recovery rate (target: 10-15% of abandoned carts converted)
- Post-purchase email open rate (target: >25%)
- Email-to-purchase conversion rate (target: 5-10%)

**WhatsApp metrics:**
- WhatsApp subscriber growth (target: 200+ by end of Month 1)
- WhatsApp click-through rate on drop announcements (target: 20-30%)
- WhatsApp-to-purchase conversion (harder to track, but estimate from UTM codes)

**Health metrics:**
- Unsubscribe rate (target: <0.5% per email)
- Spam complaints (target: 0)
- Bounce rate (target: <1%)

Track these in a simple Google Sheet and review weekly.

