# WhatsApp Business API — Direct Meta Cloud API Setup

**Last updated:** 2026-06-20
**Purpose:** Set up direct Meta WhatsApp Cloud API integration (zero BSP markup)
**Provider precedence:** Meta > MSG91 > Gupshup (configurable via `WHATSAPP_PROVIDER`)

---

## Overview

The Product Lab sends WhatsApp messages via Meta's Cloud API directly instead of
going through a BSP (Gupshup/MSG91). This means:

- **Zero platform fee** (Meta charges conversation rates only)
- **Zero markup** (BSPs add ₹0.20–₹0.85 per conversation on top of Meta's rate)
- You manage templates, webhooks, and the shared inbox yourself

**At TPL's early volume (~500–2K conversations/month):**

| Cost component | Meta Direct | MSG91 | Gupshup |
|---------------|-------------|-------|---------|
| Platform fee | ₹0/mo | ₹0/mo | ₹4K–6K/mo |
| Conversation cost* | ₹58–₹230/mo | ₹58–₹230/mo | ₹200–₹1,600/mo |
| Your time (setup) | ~2 hrs | ~30 min | ~30 min |

\* Utility conversations at ₹0.115/each. Marketing at ₹0.785/each.

---

## Prerequisites

1. **Meta Business Account** — create at business.facebook.com if you don't have one
2. **Business email** — one that matches your business domain (e.g. dan@theproductlab.in)
3. **Phone number** — not registered with WhatsApp (personal or business) already. If the
   number is already on WhatsApp, you can't use it for the API on the same Meta account.
   Indian SIM works fine.
4. **Domain verified** in Meta Business Settings (ensures templates get approved faster)
5. **Website** with privacy policy + terms of service pages

---

## Step 1: Enroll in WhatsApp Business API

1. Go to [business.facebook.com](https://business.facebook.com/) → Your Business Account
2. Navigate to: **Settings** → **Business Assets** → **WhatsApp Accounts**
3. Click **"Add"** → **"Create a WhatsApp Account"**
4. Fill in:
   - Name: `The Product Lab`
   - Category: `Retail & Consumer Goods`
   - Timezone: `Asia/Kolkata (GMT+5:30)`
5. Click **Continue**, accept WhatsApp Business Terms
6. Note the **WABA ID** (you'll need it)

---

## Step 2: Register Phone Number

1. In the WABA you just created, go to **Phone Numbers**
2. Click **"Add Phone Number"**
3. Enter a number **not registered with WhatsApp** (ideally a new Indian SIM, not your
   personal WhatsApp number)
4. Verification method: **SMS** (fastest, ~30 sec) or **Phone Call** (~2 min)
5. Enter the OTP received
6. Set display name: `The Product Lab`
7. Business profile:
   - Description: `Small objects. Big opinions. A brand for people with opinions they wear.`
   - Email: dan@theproductlab.in
   - Website: https://theproductlab.in
   - Industry: Retail
8. Save

**Note the Phone Number ID** — this is `META_WABA_PHONE_NUMBER_ID`. Find it at:
Meta Dev Dashboard → WhatsApp → API Setup → Phone Number ID.

---

## Step 3: Create Message Templates

Meta requires **pre-approved templates** for business-initiated messages.
Templates must match the content in `backend/medusa/src/modules/whatsapp-notification/templates.ts`.

Template naming convention: replace dots (`.`) with underscores (`_`).
E.g., `order.confirmed_prepaid` → `order_confirmed_prepaid`

### Template submission rules

| Field | Requirement |
|-------|------------|
| Name | Lowercase alphanumeric + underscores. Max 512 chars. |
| Header | Optional. Text (60 chars max) or Image. |
| Body | Required. Text with `{{1}}`, `{{2}}` placeholders. Max 1024 chars. |
| Footer | Optional. 60 chars max. |
| Buttons | Up to 2 Quick Reply, or 1 Call-to-Action (URL or Phone). |
| Category | `MARKETING` for opt-in required; `UTILITY` for transactional |

### Category assignment

| Meta category | Our templates |
|---------------|--------------|
| **UTILITY** (fast approval, lower cost) | `order_confirmed_prepaid`, `order_confirmed_cod`, `order_shipped`, `order_delivered`, `order_refund_prepaid`, `order_refund_cod`, `order_return_requested`, `order_exchange_requested`, `order_issue_damaged`, `order_issue_wrong_item`, `order_lost_shipment`, `order_out_of_stock`, `order_transfer_requested`, `cart_cod_reminder`, `support_escalation` |
| **MARKETING** (slower approval, higher cost, needs opt-in) | `order_post_delivery_review`, `order_back_in_stock`, `cart_abandoned`, `marketing_drop_announcement`, `marketing_reengagement`, `marketing_upsell` |

### How to submit a template

1. Go to Meta Dev Dashboard → WhatsApp → **Message Templates**
2. Click **"Create Template"**
3. Select category (`UTILITY` or `MARKETING`)
4. Name: e.g. `order_confirmed_prepaid`
5. Fill in body text with `{{1}}`, `{{2}}` placeholders
6. Submit for review

**Template body examples:**

| Template | Body |
|----------|------|
| `order_confirmed_prepaid` | `Order confirmed. Here's what just happened:\n\nOrder #{{1}}\n{{2}} item(s) \| ₹{{3}}\n\nYour {{4}} is packed and heading out tomorrow morning.` |
| `order_shipped` | `Out for delivery.\n\nOrder #{{1}}\nTracking: {{2}}\nCarrier: {{3}}\nAWB: {{4}}\n\nShould land in {{5}}.` |
| `order_delivered` | `Delivered.\n\nOrder #{{1}} landed with {{2}}.` |

> **Important:** Template parameters (`{{1}}`, `{{2}}`, etc.) must be in the SAME ORDER
> as they appear in `_extractArgs()` in `index.ts`. See the template file for exact
> parameter mapping.

### Submit all 21 templates

Submit the **minimum viable set** first (these handle the core order lifecycle):

1. `order_confirmed_prepaid` (UTILITY)
2. `order_confirmed_cod` (UTILITY)
3. `order_shipped` (UTILITY)
4. `order_delivered` (UTILITY)

Then add in priority order:

5. `order_refund_prepaid` (UTILITY)
6. `order_refund_cod` (UTILITY)
7. `order_return_requested` (UTILITY)
8. `order_exchange_requested` (UTILITY)
9. `order_issue_damaged` (UTILITY)
10. `order_lost_shipment` (UTILITY)

Then marketing / low-priority:

11–21. Remaining templates

**Approval time:** UTILITY templates typically take 1–24 hours. MARKETING can take up to 48 hours.

---

## Step 4: Generate Permanent Access Token

Meta's temporary tokens expire. You need a **permanent system-user token**.

### Create a System User

1. Go to [business.facebook.com](https://business.facebook.com/) → **Settings**
2. Under **Users**, click **System Users**
3. Click **"Add"** → Name: `WhatsApp-API`, Role: `Admin`
4. Click **"Generate New Token"**
5. Select your **The Product Lab** app (create one if needed at developers.facebook.com)
6. **Required permissions:**
   - `whatsapp_business_messaging`
   - `whatsapp_business_management`
7. Click **"Generate Token"**
8. **Copy the token immediately** — you won't see it again
9. This token **does not expire** (permanent by default for System Users)

Troubleshooting: If your token shows an expiry date, you selected the wrong user type.
Delete and recreate as **System User**, not Employee.

---

## Step 5: Configure Webhooks (for incoming messages + delivery receipts)

Incoming customer replies and delivery status updates come via webhooks.

1. Go to Meta Dev Dashboard → **WhatsApp** → **Configuration**
2. Under **Webhooks**, click **"Edit"**
3. **Callback URL:** `https://theproductlab.in/api/whatsapp/webhook`
4. **Verify Token:** Create a random string, note it as `META_WEBHOOK_VERIFY_TOKEN`
5. **Fields to subscribe:**
   - `messages` (incoming messages)
   - `message_template_status_update` (template approval updates)
   - `message_deliveries` (delivery receipts)
   - `message_reads` (read receipts — optional)

### Build the webhook endpoint

Create `backend/medusa/src/api/store/whatsapp/webhook/route.ts`:

```typescript
import type { MedusaRequest, MedusaResponse } from "@medusajs/framework"

// GET — Meta webhook verification (required by Meta)
export async function GET(req: MedusaRequest, res: MedusaResponse) {
  const mode = req.query["hub.mode"]
  const token = req.query["hub.verify_token"]
  const challenge = req.query["hub.challenge"]

  if (mode === "subscribe" && token === process.env.META_WEBHOOK_VERIFY_TOKEN) {
    return res.status(200).send(challenge)
  }
  return res.status(403).send("Verification failed")
}

// POST — Incoming messages & delivery receipts
export async function POST(req: MedusaRequest, res: MedusaResponse) {
  const body = req.body as any
  // Process incoming messages and delivery receipts
  // Route to WhatsApp Business shared inbox
  return res.status(200).json({ status: "ok" })
}
```

---

## Step 6: Set Environment Variables

Add to `backend/medusa/.env`:

```bash
# Meta WhatsApp Cloud API
META_WABA_PHONE_NUMBER_ID=123456789012345
META_WHATSAPP_ACCESS_TOKEN=EABx...abcd
META_API_VERSION=v22.0

# Provider selection
WHATSAPP_PROVIDER=meta

# Webhook verification (needed if using incoming message handling)
META_WEBHOOK_VERIFY_TOKEN=your-random-verify-token
```

### Credential fallback chain

The WhatsApp notification module checks env vars in this priority order:

| `WHATSAPP_PROVIDER` value | Credential required | Behavior |
|---------------------------|-------------------|----------|
| `meta` | `META_WABA_PHONE_NUMBER_ID` + `META_WHATSAPP_ACCESS_TOKEN` | Sends via Meta directly. Ignores Gupshup/MSG91. |
| `gupshup` (default) | `GUPSHUP_API_KEY` + `GUPSHUP_SOURCE_NUMBER` | Sends via Gupshup. Falls back to MSG91 if Gupshup unavailable. |
| `msg91` | `MSG91_AUTH_KEY` | Sends via MSG91. Falls back to stub. |
| (none set) | Any provider key | Stub mode — logs to stdout + audit trail. |

---

## Step 7: Test the Integration

### Prerequisites

1. At least 4 approved templates (order_confirmed_prepaid, order_confirmed_cod, order_shipped, order_delivered)
2. WhatsApp provider set to `meta`
3. Credentials set

### Test flow

1. **Stub mode test** — start without Meta creds to verify the template rendering:
   ```
   # Remove META creds temporarily
   WHATSAPP_PROVIDER=meta
   # META_WABA_PHONE_NUMBER_ID not set → auto-fallback to stub
   ```
   Place a test order → verify the stub log in `notification-audit/whatsapp-*.jsonl`

2. **Live Meta mode test** — with Meta creds set:
   Place a test order → check that the WhatsApp message arrives at the shipping phone

3. **Error scenarios:**
   - Invalid token → error logged, non-blocking (order still processes)
   - Template not approved → error logged, non-blocking
   - Template parameter mismatch → error logged, non-blocking
   - Invalid phone number → Meta returns 400, error logged, non-blocking

---

## Step 8: WhatsApp Business Shared Inbox

Direct Meta API doesn't include a shared inbox. Options for handling incoming
customer messages:

### Option A: Meta Business Suite Inbox (Free)

Access at: [business.facebook.com](https://business.facebook.com/) → Inbox
- Shows all incoming WhatsApp messages
- Team members can reply
- No integrations, no automation
- Best for early volume (<50 messages/day)

### Option B: WhatsApp Business Desktop App (Free)

Download from [whatsapp.com/business](https://www.whatsapp.com/business)
- Mirror of the mobile Business app
- Quick replies, labels, away messages
- Good for single operator (Dan)

### Option C: Switch to MSG91 when volume grows

At ~5K conversations/month (~₹4K/mo Meta fees), MSG91 transitions to a shared
inbox without changing the integration. Just set `WHATSAPP_PROVIDER=msg91`.

---

## Troubleshooting

### Template approval rejected

**Most common reasons:**
1. **Utility template missing clear transactional purpose** — ensure the template
   describes an action the user took (order placed, shipped, delivered), not a promotion
2. **Placeholders used for non-dynamic content** — hardcode what can be hardcoded
3. **Brand tone too casual** — Meta reviewers sometimes flag conversational Indian English
   as "unprofessional" for UTILITY templates. If rejected, submit as MARKETING instead.

**Fix:** Edit the template in Meta Dev Dashboard, adjust copy, resubmit.

### "Error validating access token"

- Token expired → generate a new one from System Users
- Wrong permissions → ensure `whatsapp_business_messaging` is included
- Wrong user type → must be System User, not Employee

### "Template not found"

- Template not yet submitted → submit in Meta Dev Dashboard
- Template name mismatch → Meta names use underscores, not dots
- Template rejected / in review → check status in Meta Dev Dashboard

### Phone number not eligible

- Number already on WhatsApp → use a different number, or release it from personal WA
- Number in a different country → must match the business profile country
- Carrier restrictions → use a regular Indian mobile number (prepaid/postpaid both work)

### Rate limited (429)

- 80 business-initiated requests per 10 seconds per phone number
- 250K/day per WABA (can request increase via Meta)
- The Meta transport has automatic retry with exponential backoff (3 attempts)

---

## Switching Back to MSG91

If Meta turns out to be more work than it's worth (template approvals, shared inbox):

```bash
# In .env, just change the provider
WHATSAPP_PROVIDER=msg91
# And ensure MSG91 creds are set
MSG91_AUTH_KEY=...
MSG91_SENDER_NUMBER=...
```

**Zero code changes** — the WhatsApp notification module handles all three providers
transparently. The same 21 templates, 3 subscribers, opt-in gates, and audit trail
work identically regardless of provider.
