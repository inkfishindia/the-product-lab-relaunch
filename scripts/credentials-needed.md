# Credentials & Access Needed
<!-- last-updated: 2026-03-26 -->

Dan fills this out. Once provided, paste credentials into the relevant agent session at spawn time.

**Security note:** Store actual credentials in a password manager (1Password, Bitwarden), not in this file. This doc is just the checklist of what's needed and who gets what.

---

## 🔴 CRITICAL — Phase 4 blocked without these

### Fynd / Commerce.com
- **Who needs it:** Tobi (build), Andy (catalog)
- **What to get:** Store admin login URL, email, password
- **Where:** commerce.fynd.com or your store admin URL
- **Status:** [ ] Not yet provided

### Razorpay
- **Who needs it:** Tobi (integration), Patrick (financial reporting post-launch)
- **What to get:** API Key ID + API Key Secret (from Razorpay Dashboard → Settings → API Keys)
- **Test mode first:** Yes — get test keys first, go live only at launch
- **Status:** [ ] Not yet provided

### Shiprocket
- **Who needs it:** Tobi (integration), Raj (operations)
- **What to get:** Email + password for Shiprocket account (API tokens generated from there)
- **Status:** [ ] Not yet provided

### Google Analytics 4 (GA4)
- **Who needs it:** Tobi (install), Avinash (dashboards), James (QA verification)
- **What to get:** GA4 Property ID (format: G-XXXXXXXXXX) + admin access to property
- **If no GA4 property exists:** Create at analytics.google.com → Admin → Create Property
- **Status:** [ ] Not yet provided

---

## 🟡 HIGH — Phase 4-5

### Microsoft Clarity
- **Who needs it:** Avinash (heatmaps), James (QA behavior testing)
- **What to get:** Clarity Project ID + tracking code
- **Create at:** clarity.microsoft.com (free, takes 5 minutes)
- **Status:** [ ] Not yet created

### Klaviyo
- **Who needs it:** Eli (email flows)
- **What to get:** Public API key from Klaviyo account settings
- **Create at:** klaviyo.com (free up to 250 contacts, 500 email sends/month)
- **Status:** [ ] Not yet created

### MSG91 or Gupshup (WhatsApp Business API)
- **Who needs it:** Eli (WhatsApp flows), Rachel (broadcast to seeding list)
- **Decision needed:** MSG91 vs Gupshup — see Eli's agent card for comparison
- **Requires:** Facebook Business Manager account + verified WhatsApp Business number
- **Timeline:** WhatsApp Business API approval takes 2–5 business days
- **Status:** [ ] Decision not made → [ ] Account not created

---

## 🟢 MEDIUM — Phase 5

### Instagram Business Account
- **Who needs it:** Chase (content), Rachel (seeding research + DMs), Andrew (launch management)
- **What to get:** Admin access to @theproductlab Instagram business account
- **If not converted:** Instagram → Settings → Account → Switch to Professional → Business
- **Status:** [ ] Confirm business account status

### Canva
- **Who needs it:** Casey (social content), Sean (brand templates)
- **What to get:** Dan's Canva login (for Chrome browser sessions)
- **Dan shares access with agents:** by being logged in during Chrome MCP sessions
- **Status:** [ ] Confirm Canva account exists

### Google Account (for NotebookLM)
- **Who needs it:** Maria (research synthesis), Weiss (insight synthesis)
- **What to get:** Dan's Google account login (for Chrome browser sessions)
- **Used for:** notebooklm.google.com — upload research docs, ask synthesis questions
- **Status:** [ ] Confirm Google account

### Figma
- **Who needs it:** Sean, Kurt, Julie (design agents)
- **What to get:** TPL Figma file URL → share with Figma MCP
- **Status:** [ ] Figma file URL not yet provided

---

## How to Provide Credentials to Agents

When spawning an agent that needs platform access, add to the invocation prompt:

```
Platform credentials for this session:
- [Platform name]: [key type] = [value]
- [Platform name]: [login URL] — you are already logged in via Chrome
```

For Chrome-based tools (Fynd admin, GA4, Clarity, Klaviyo, Canva):
→ Dan stays logged in to these platforms in Chrome
→ Chrome MCP then accesses them via the existing session

For API-based integrations (Razorpay, Shiprocket, GA4 Measurement ID):
→ Paste the key directly into Tobi's session prompt
→ Tobi uses it to configure integrations in the Fynd theme/admin
