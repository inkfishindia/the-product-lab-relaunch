<!-- last-updated: 2026-03-26 -->
# Analytics Event Schema & GA4 Implementation — The Product Lab Phase 4

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Merchandising Implementation |
| **Producing Agent** | Tobi (Developer) |
| **Date** | 2026-03-26 |
| **Status** | draft |
| **Reviewer** | Harley |

---

## 1. GA4 Event Schema — Complete Reference

### 1.1 Standard Events (Commerce.com Auto-Fires)

These events fire automatically when Razorpay + Commerce.com are integrated. **No custom implementation needed** for these, but verify in GA4 DebugView.

| Event Name | Trigger | Parameters | Example |
|------------|---------|------------|---------|
| `page_view` | User lands on any page | `page_location`, `page_title`, `page_referrer` | User lands on homepage |
| `scroll` | User scrolls 90% down page | `percent_scrolled` | User reads product description |
| `click` | User clicks link | `link_url`, `link_text` | User clicks "Add to Cart" |
| `purchase` | Order confirmed | `transaction_id`, `value`, `currency`, `items[]`, `coupon` | Customer completes checkout |
| `view_item` | User views product page | `items[].item_id`, `items[].item_name`, `items[].price` | User views PDP |
| `add_to_cart` | Item added to cart | `items[].item_id`, `items[].item_name`, `items[].price`, `items[].quantity` | Customer clicks "Add to Cart" |
| `begin_checkout` | Checkout starts | `value`, `currency`, `items[]`, `coupon` | Customer clicks "Proceed to Checkout" |
| `view_cart` | User opens cart | `value`, `currency`, `items[]` | User clicks cart icon |

**Verification (Tobi):**
1. Go to GA4 dashboard → Admin → Events
2. Look for "purchase", "view_item", "add_to_cart", "begin_checkout"
3. If missing, contact Commerce.com support (they may need to enable)

---

### 1.2 Custom Events (Must Implement)

These events do NOT fire automatically. Tobi must add custom event tracking code to the store.

#### 1.2.1 Collection View

**Event name:** `view_collection`

**Trigger:** User lands on any collection page (/collections/card-stickers/, /collections/attitude-keychains/, etc.)

**Parameters:**
- `collection_id` (string): Unique ID (e.g., "card-stickers")
- `collection_name` (string): Human-readable name (e.g., "Card Stickers")

**Example:**
```
Event: view_collection
collection_id: "attitude-keychains"
collection_name: "Attitude Keychains"
```

**Implementation (Tobi):**
Add this code to collection page template:

```javascript
gtag('event', 'view_collection', {
  'collection_id': 'attitude-keychains',
  'collection_name': 'Attitude Keychains'
});
```

---

#### 1.2.2 Product Search

**Event name:** `search`

**Trigger:** User types in search box and hits Enter (or clicks search result).

**Parameters:**
- `search_term` (string): What user typed (e.g., "red keychain")
- `results_count` (number): Number of products returned (e.g., 12)

**Example:**
```
Event: search
search_term: "red keychain"
results_count: 12
```

**Implementation (Tobi):**
Add this code to search form submission:

```javascript
const searchTerm = document.getElementById('search-input').value;
const resultsCount = document.querySelectorAll('.product-card').length;

gtag('event', 'search', {
  'search_term': searchTerm,
  'results_count': resultsCount
});
```

---

#### 1.2.3 Social Share (WhatsApp)

**Event name:** `share`

**Trigger:** User clicks "Share on WhatsApp" button (on PDP or elsewhere).

**Parameters:**
- `method` (string): Always "whatsapp"
- `content_type` (string): "product" or "collection"
- `item_id` (string): Product/collection ID
- `item_name` (string): Product/collection name

**Example:**
```
Event: share
method: "whatsapp"
content_type: "product"
item_id: "no-filter-attitude-keychain-red"
item_name: "No Filter Attitude Keychain — Red"
```

**Implementation (Tobi):**
Add click handler to WhatsApp share button:

```javascript
document.getElementById('share-whatsapp-btn').addEventListener('click', function() {
  gtag('event', 'share', {
    'method': 'whatsapp',
    'content_type': 'product',
    'item_id': 'no-filter-attitude-keychain-red',
    'item_name': 'No Filter Attitude Keychain — Red'
  });
});
```

---

#### 1.2.4 Drop Signup

**Event name:** `drop_signup`

**Trigger:** User enters email to sign up for Drop notifications (/the-drop/ page).

**Parameters:**
- `drop_id` (string): Drop code (e.g., "spring-2026-nomad-pin")
- `drop_name` (string): Drop title (e.g., "Spring 2026 — The Nomad Lapel Pin")
- `signup_date` (string): Date user signed up (ISO format: YYYY-MM-DD)

**Example:**
```
Event: drop_signup
drop_id: "spring-2026-nomad-pin"
drop_name: "Spring 2026 — The Nomad Lapel Pin"
signup_date: "2026-03-26"
```

**Implementation (Tobi):**
Add code to drop signup form:

```javascript
document.getElementById('drop-signup-form').addEventListener('submit', function(e) {
  e.preventDefault();

  gtag('event', 'drop_signup', {
    'drop_id': 'spring-2026-nomad-pin',
    'drop_name': 'Spring 2026 — The Nomad Lapel Pin',
    'signup_date': new Date().toISOString().split('T')[0]
  });

  // Then submit form
  this.submit();
});
```

---

#### 1.2.5 Newsletter Signup

**Event name:** `newsletter_signup`

**Trigger:** User enters email in newsletter signup form (homepage, footer, or anywhere).

**Parameters:**
- `signup_method` (string): Where signup happened (e.g., "homepage", "footer", "pop-up")
- `consent_type` (string): Type of consent (e.g., "email", "sms", "both")

**Example:**
```
Event: newsletter_signup
signup_method: "footer"
consent_type: "email"
```

**Implementation (Tobi):**
Add code to newsletter form:

```javascript
document.getElementById('newsletter-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const signupMethod = this.getAttribute('data-signup-location') || 'unknown';
  const consentType = document.querySelector('input[name="consent"]:checked')?.value || 'email';

  gtag('event', 'newsletter_signup', {
    'signup_method': signupMethod,
    'consent_type': consentType
  });

  this.submit();
});
```

---

#### 1.2.6 Bundle View

**Event name:** `view_bundle`

**Trigger:** User views a bundle product page.

**Parameters:**
- `bundle_id` (string): Unique bundle ID (e.g., "starter-bundle")
- `bundle_name` (string): Bundle name (e.g., "Starter Pack")
- `bundle_price` (number): Bundle price in ₹ (e.g., 449)
- `items_in_bundle` (number): How many products in bundle (e.g., 2)

**Example:**
```
Event: view_bundle
bundle_id: "starter-bundle"
bundle_name: "Starter Pack — Card Stickers + Attitude Keychain"
bundle_price: 449
items_in_bundle: 2
```

**Implementation (Tobi):**
Add code to bundle product page:

```javascript
gtag('event', 'view_bundle', {
  'bundle_id': 'starter-bundle',
  'bundle_name': 'Starter Pack — Card Stickers + Attitude Keychain',
  'bundle_price': 449,
  'items_in_bundle': 2
});
```

---

### 1.3 Event Schema Summary Table

| Event | Type | Trigger | Key Parameters | Tobi Effort |
|-------|------|---------|-----------------|-------------|
| `page_view` | Standard | Page load | page_location, page_title | 0h (auto) |
| `view_item` | Standard | PDP load | item_id, item_name, item_price | 0h (auto) |
| `add_to_cart` | Standard | "Add to Cart" click | item_id, item_name, item_price | 0h (auto) |
| `begin_checkout` | Standard | "Proceed to Checkout" click | value, currency, items | 0h (auto) |
| `purchase` | Standard | Order confirmed | transaction_id, value, items, coupon | 0h (auto) |
| `view_collection` | Custom | Collection page load | collection_id, collection_name | 0.5h |
| `search` | Custom | Search submission | search_term, results_count | 0.5h |
| `share` | Custom | WhatsApp share click | method, content_type, item_id | 0.5h |
| `drop_signup` | Custom | Drop form submit | drop_id, drop_name, signup_date | 0.5h |
| `newsletter_signup` | Custom | Newsletter form submit | signup_method, consent_type | 0.5h |
| `view_bundle` | Custom | Bundle page load | bundle_id, bundle_name, bundle_price | 0.5h |

**Total custom implementation effort:** 3–4 hours

---

## 2. GA4 Conversion Goals

### 2.1 Conversion Definition

A **conversion** is a valuable business action that Dan wants to track. Not all events are conversions.

### 2.2 Conversion Events for TPL

| Conversion | Event | Trigger | Business Value |
|------------|-------|---------|-----------------|
| Purchase | `purchase` | Order confirmed | ₹ Revenue |
| Add to Cart | `add_to_cart` | Customer clicks "Add" | Intent to buy |
| Begin Checkout | `begin_checkout` | Customer proceeds to checkout | High purchase intent |
| Newsletter Signup | `newsletter_signup` | Customer signs up for email | Future revenue (retention) |
| Drop Signup | `drop_signup` | Customer signs up for drop | Future revenue (engagement) |
| Product View | `view_item` | Customer views product | Interest indicator |
| Search | `search` | Customer searches | Intent + discovery |
| Social Share | `share` | Customer shares on WhatsApp | Viral/word-of-mouth |

### 2.3 Conversion Mark-Up in GA4

**Action:** Mark these events as conversions in GA4 dashboard (Dan or Tobi).

1. Go to GA4 → Admin → Conversions
2. Click "New conversion event"
3. Search for event name (e.g., "purchase", "newsletter_signup")
4. Click ✓ to mark as conversion
5. Repeat for all events in table above

**Effect:** These events now appear in "Conversions" reports.

### 2.4 Conversion Goals & Targets

| Conversion | Target Rate | Rationale | Dan's Action |
|------------|-------------|-----------|--------------|
| Purchase | >1.5% | 1.5% conversion is good for ecommerce | Monitor weekly |
| Add to Cart | >15% | 15% of visitors should add something | Monitor weekly |
| Begin Checkout | >50% | 50% of cart visitors should proceed | Monitor daily (funnel) |
| Newsletter Signup | >5% | 5% newsletter opt-in rate is strong | Monitor monthly |
| Drop Signup | >3% | 3% of visitors sign up for drops | Monitor per drop |
| Product View | N/A | Track all product views | Monitor for top performers |
| Search | >2% | 2% of visitors use search (basic, mobile-first) | Monitor quarterly |
| Social Share | >0.5% | 0.5% WhatsApp shares is viral-adjacent | Monitor monthly |

**Dan's weekly dashboard:** Should show `[purchase rate today] = [purchases today / sessions today]`. If <1.5%, investigate why (traffic quality, product relevance, checkout friction).

---

## 3. Microsoft Clarity — Session Recording & Heatmaps

### 3.1 What is Clarity?

Microsoft Clarity records user sessions (video replay) and generates heatmaps (where users click/scroll). Goal: Identify UX problems without guessing.

### 3.2 Clarity Configuration (Tobi)

**Pages to enable heatmaps & recording:**

| Page | Priority | Recording | Heatmap | Why |
|------|----------|-----------|---------|-----|
| Homepage | P0 | Yes | Yes | Entry point, bounce rate matters |
| PDP | P0 | Yes | Yes | Conversion driver, learn what users click |
| Cart | P0 | Yes | Yes | Pre-purchase friction point |
| Checkout | P0 | Yes | Yes | Payment friction, UX critical |
| Collections | P1 | Yes | Yes | Discovery, filter usage |
| About | P1 | No | No | Low traffic, low impact |

### 3.3 Clarity Metrics to Monitor

**Heatmap insights:**
- Rage clicks: Users clicking repeatedly on same element (broken button? unclear affordance?)
- Dead clicks: Clicks on non-clickable elements (user expected click, but element not clickable)
- Excess scrolling: Users scrolling below fold excessively (information not above fold?)

**Session recordings (watch 5–10 videos per day):**
- Where do users get stuck?
- Do users find the "Add to Cart" button?
- Do users notice free shipping message?
- Do users understand product variants (color, size)?

### 3.4 Clarity Implementation (Dan's side)

Already covered in Technical Implementation Plan, Section 2.4:
1. Create Clarity project
2. Install tracking code (Clarity measurement ID) in Commerce.com
3. Let it run for 48 hours before analyzing (need sample size)

**Tobi's role:** Monitor Clarity dashboard weekly, report findings in analytics report.

---

## 4. UTM Parameter Convention (Campaign Tracking)

### 4.1 What are UTM Parameters?

UTM parameters are tags in URLs that tell GA4 the source of traffic. Example:

```
https://theproductlab.in?utm_source=instagram&utm_medium=social&utm_campaign=spring-drop
```

GA4 reads these and organizes traffic by source.

### 4.2 UTM Naming Convention for TPL

**Format:** Always lowercase, hyphens instead of spaces. Consistency is critical.

| Parameter | Values | Example |
|-----------|--------|---------|
| `utm_source` | instagram, whatsapp, email, google, direct | utm_source=instagram |
| `utm_medium` | social, organic, paid, email, sms, referral | utm_medium=social |
| `utm_campaign` | product/event name (kebab-case) | utm_campaign=spring-drop-2026 |
| `utm_content` | ad variant (optional) | utm_content=carousel-1 |
| `utm_term` | keyword (optional, for paid search) | utm_term=card-stickers |

### 4.3 Campaign Structure for Each Channel

#### **Instagram (Organic Posts)**

Post caption includes link:

```
"Speak up. Wear your opinion. Shop now: theproductlab.in?utm_source=instagram&utm_medium=social&utm_campaign=spring-collection"
```

| Post | utm_campaign |
|------|--------------|
| Product feature post | product-[product-name] (e.g., product-no-filter-keychain) |
| Collection highlight | collection-[collection-name] (e.g., collection-card-stickers) |
| Drop announcement | drop-[drop-name] (e.g., drop-spring-nomad-pin) |
| Bundle promotion | bundle-[bundle-name] (e.g., bundle-starter-pack) |

#### **WhatsApp Business (Broadcasts)**

Broadcast message includes link:

```
"Limited drops available. Shop now before they're gone: theproductlab.in?utm_source=whatsapp&utm_medium=social&utm_campaign=drop-alert-spring-2026&utm_content=subscriber-segment"
```

| Broadcast | utm_campaign |
|-----------|--------------|
| New product | whatsapp-new-product |
| Drop countdown | whatsapp-drop-countdown |
| Sale/discount | whatsapp-sale-[event] (e.g., whatsapp-sale-founders-week) |
| Re-engagement | whatsapp-reactivation |

#### **Email (Klaviyo / Mailchimp)**

Email link includes UTM:

```
<a href="theproductlab.in?utm_source=email&utm_medium=email&utm_campaign=welcome-series&utm_content=email-1">Shop now</a>
```

| Email Flow | utm_campaign |
|-----------|--------------|
| Welcome series | email-welcome-[#] (e.g., email-welcome-1) |
| Abandoned cart | email-abandoned-cart |
| Order shipped | email-order-shipped |
| Post-purchase (cross-sell) | email-post-purchase-cross-sell |
| Re-engagement (30+ days) | email-reactivation |

#### **Organic Search (Google, if any)**

No UTM needed (Google auto-tags as "organic/google").

### 4.4 UTM Parameter Tracking Spreadsheet

**Tobi creates this spreadsheet for Dan to use:**

| Date | Channel | Campaign | utm_source | utm_medium | utm_campaign | Notes |
|------|---------|----------|-----------|-----------|--------------|-------|
| 2026-04-01 | Instagram | Spring Collection | instagram | social | collection-card-stickers | Carousel post |
| 2026-04-02 | WhatsApp | Drop Alert | whatsapp | social | drop-alert-spring-2026 | Broadcast to 500 subscribers |
| 2026-04-05 | Email | Welcome Series #1 | email | email | email-welcome-1 | 50 new subscribers |

**Dan's responsibility:** Fill this out every time he shares a link, so Tobi can cross-reference GA4 data.

---

## 5. Key Reports to Build (GA4 Dashboard)

### 5.1 Report #1: Sales Overview Dashboard

**Purpose:** Daily snapshot of business performance. Dan checks every morning.

**Metrics:**
- Sessions (today vs yesterday vs last week)
- Users (unique visitors)
- Purchases (count + revenue in ₹)
- Conversion rate (purchases / sessions)
- Avg order value (revenue / purchases)
- Top 5 products by revenue
- Top 5 products by views
- Top traffic source (Instagram, WhatsApp, direct, etc.)

**Build instructions (Tobi):**
1. GA4 → Reports → Create custom report
2. Add metrics above
3. Segment by date (daily view)
4. Save as "Sales Overview"

---

### 5.2 Report #2: Traffic Source Breakdown

**Purpose:** Understand where visitors come from (Instagram, WhatsApp, email, direct, etc.).

**Metrics:**
- Sessions by source (instagram, whatsapp, email, google, direct, etc.)
- Users by source
- Conversion rate by source (which source converts best?)
- Avg order value by source
- Cost per acquisition (if running ads — not applicable yet)

**Build instructions (Tobi):**
1. GA4 → Acquisition → Traffic Source
2. Add conversion metrics (purchase rate per source)
3. Save as "Traffic Source Analysis"

---

### 5.3 Report #3: Conversion Funnel

**Purpose:** Track customer journey from interest to purchase. Identify drop-off points.

**Funnel steps:**
1. Session start (everyone)
2. View product (`view_item` event)
3. Add to cart (`add_to_cart` event)
4. Begin checkout (`begin_checkout` event)
5. Purchase (`purchase` event)

**Metrics:**
- Users at each step
- Drop-off rate (% who leave at each step)
- Conversion rate to next step

**Build instructions (Tobi):**
1. GA4 → Reports → Create custom report
2. Add events in order: page_view → view_item → add_to_cart → begin_checkout → purchase
3. Segment by user count
4. Save as "Conversion Funnel"

**Dan's use:** If 50% drop between "add_to_cart" and "begin_checkout", checkout process has friction. Flag to Harley.

---

### 5.4 Report #4: Product Performance

**Purpose:** Which products are selling? Which are just viewed but not bought?

**Metrics:**
- Product name (or SKU)
- Views (how many times product page viewed)
- Add-to-cart rate (add-to-carts / views)
- Purchase rate (purchases / views)
- Revenue per product
- Avg price
- Inventory (if integrated)

**Build instructions (Tobi):**
1. GA4 → Reports → Create custom report
2. Dimension: Item name (from `view_item` event)
3. Metrics: Event count (views), add_to_cart count, purchase count, revenue
4. Sort by revenue descending
5. Save as "Product Performance"

**Dan's use:** See which products are duds (high views, low sales) → needs better copy, images, or price.

---

### 5.5 Report #5: Device / Platform Breakdown

**Purpose:** Mobile vs desktop conversion rates. Mobile-first strategy requires this.

**Metrics:**
- Sessions by device (mobile, desktop, tablet)
- Users by device
- Conversion rate by device
- Avg order value by device

**Build instructions (Tobi):**
1. GA4 → Reports → Create custom report
2. Dimension: Device category
3. Metrics: Sessions, users, purchase count, conversion rate
4. Save as "Device Breakdown"

**Dan's use:** If mobile conversion rate <1.5%, but desktop >2%, mobile UX needs work.

---

## 6. GA4 Custom Events — Implementation Checklist

**Tobi's build sequence:**

| Task | Effort | Dependencies |
|------|--------|--------------|
| Set up GA4 measurement ID in Commerce.com | 0.5h | GA4 property created |
| Implement `view_collection` event | 0.5h | GA4 ID installed |
| Implement `search` event | 0.5h | GA4 ID installed |
| Implement `share` event (WhatsApp) | 0.5h | GA4 ID installed |
| Implement `drop_signup` event | 0.5h | GA4 ID installed |
| Implement `newsletter_signup` event | 0.5h | GA4 ID installed |
| Implement `view_bundle` event | 0.5h | GA4 ID installed |
| Mark conversions in GA4 dashboard | 0.5h | All events live |
| Build 5 custom reports | 2h | All events firing |
| Test all events in DebugView | 1h | All events implemented |

**Total effort:** 7–8 hours (Tobi).

---

## 7. GA4 Event Testing — DebugView

**How to verify events are firing correctly:**

1. Open storefront in Chrome
2. Open DevTools (F12)
3. Go to GA4 → Admin → DebugView
4. Look for your device (Chrome will show in DebugView when on site)
5. Perform action on site (e.g., add product to cart)
6. Watch DebugView — should see `add_to_cart` event fire in real-time with parameters
7. Check event name, parameters match expected values

**Example DebugView output:**
```
Event: add_to_cart
Parameters:
  - items: [{item_id: "no-filter-keychain-red", item_name: "No Filter Attitude Keychain — Red", price: 249}]
  - currency: INR
  - value: 249
  - timestamp: 1711270345000
```

**If event doesn't appear:**
- Verify measurement ID is correct in code
- Verify event name matches GA4 naming
- Check browser console for JavaScript errors
- Wait 48 hours for GA4 to process (new custom events may take time)

---

## 8. Klaviyo / Mailchimp Email Event Sync

### 8.1 Email Flows Triggered by GA4 Events

| Trigger Event | Email Flow | Timing |
|---------------|-----------|--------|
| `purchase` | Order Confirmation | Immediately |
| `purchase` + 24h delay | Order Shipped | Shiprocket notifies Klaviyo → email sent |
| Cart abandoned (GA4 tracking) | Abandoned Cart Recovery | 1 hour after last activity |
| `newsletter_signup` | Welcome Series #1 | Immediately |
| No purchase in 30 days | Re-engagement Campaign | Automatic |
| `drop_signup` | Drop Waitlist | Before drop launches |

### 8.2 Klaviyo/Mailchimp Setup for Email Events

**Step 1: Connect to GA4**
1. In Klaviyo dashboard, go to Integrations → Google Analytics 4
2. Authorize Klaviyo to read GA4 data
3. Select GA4 property (The Product Lab)

**Step 2: Create segments based on GA4 events**

Example: "Users who viewed products but didn't purchase"
1. New segment: "Browsed but no purchase"
2. Filter: `view_item` event fired AND `purchase` event did NOT fire in last 7 days
3. Audience: ~500 users (estimate)

**Step 3: Set up email flows triggered by GA4 events**

Example: Abandoned cart recovery
1. New automation: "Abandoned Cart"
2. Trigger: `add_to_cart` event fires AND `purchase` event does NOT fire within 1 hour
3. Actions: Send email at 1h, 24h, 72h
4. Email copy: Remind user, offer incentive (optional: ₹30 off?)

---

## 9. Measurement ID & Implementation Checklist

### 9.1 Google Analytics 4 Measurement ID

**Dan gets this from GA4:**
- Go to GA4 → Admin → Data Streams → Web
- Copy Measurement ID (format: G-XXXXXXXXXX)

**Tobi installs in Commerce.com:**
1. Commerce.com dashboard → Settings → Analytics
2. Paste Measurement ID
3. Enable data collection
4. Wait 24 hours for first data to appear

### 9.2 Microsoft Clarity Measurement ID

**Dan gets this from Clarity:**
- Go to Clarity.microsoft.com → Project Settings
- Copy Project ID (format: C-XXXXXXXXXX)

**Tobi installs in Commerce.com:**
1. Commerce.com dashboard → Settings → Analytics
2. Paste Clarity ID
3. Enable session recording
4. Wait 2 hours for first sessions to record

### 9.3 Verification Checklist

- [ ] GA4 measurement ID installed in Commerce.com
- [ ] Clarity measurement ID installed in Commerce.com
- [ ] GA4 DebugView shows events firing
- [ ] Clarity shows sessions recording
- [ ] 5 custom GA4 reports built and visible
- [ ] Conversions marked in GA4 dashboard
- [ ] Klaviyo/Mailchimp connected to GA4
- [ ] Email flows set up and tested

---

## 10. Analytics Glossary for Dan

| Term | Meaning |
|------|---------|
| **Session** | Single visitor visit to site (ends after 30 min inactivity) |
| **User** | Unique person (identified by browser cookie) |
| **Conversion** | Valuable action (purchase, signup, share) |
| **Conversion rate** | % of sessions that converted (purchases / sessions) |
| **Bounce rate** | % of sessions that left without action |
| **UTM** | Tag in URL to track source (utm_source=instagram) |
| **Event** | User action (purchase, click, view) |
| **Parameter** | Detail of event (e.g., product_id, price) |
| **Funnel** | Series of steps to conversion (view → cart → purchase) |
| **Heatmap** | Visual map of where users click/scroll |
| **Session recording** | Video replay of user session |
| **LCP** | Time for largest image/text to load (<3s target) |

---

## 11. Launch Day Checklist

**Before Dan goes live, Tobi must verify:**

- [ ] GA4 measurement ID live in production store
- [ ] GA4 receiving events (DebugView shows real traffic)
- [ ] Clarity measurement ID live in production store
- [ ] Clarity receiving sessions (dashboard shows recordings)
- [ ] Klaviyo/Mailchimp connected and receiving purchase events
- [ ] UTM parameters tested (Dan clicks Instagram link with UTM, appears in GA4)
- [ ] Conversion funnel visible in GA4 (page_view → view_item → purchase)
- [ ] All 5 reports working and showing data
- [ ] Heatmaps enabled on priority pages (homepage, PDP, cart, checkout)

**Post-launch monitoring (first 7 days):**
- Tobi checks GA4 daily for data anomalies (spike in errors, no purchases, etc.)
- Dan reviews daily sales report
- Tobi watches for top-converting traffic sources
- Tobi reviews Clarity recordings to spot UX issues

---

**Document status:** Draft for Harley review.
**Next steps:** Harley approves → Tobi builds event tracking → Dan tests with staging store.
