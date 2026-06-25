<!-- last-updated: 2026-06-06 -->
# Fynd/Commerce.com Account Setup — Dan's One-Page Checklist

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build |
| **Purpose** | Unblock Tobi's build by getting Fynd credentials |
| **Status** | Waiting on Dan |
| **Unblocks** | Tobi's entire track (platform setup, CSS, catalog, checkout) |

---

## What Dan Needs to Do (30 min, once)

**Step 1: Check if account exists**
- Go to https://commerce.com (Commerce.com = Fynd's ecommerce platform)
- Try logging in with theproductlab.in email or any email you've used for Fynd
- If you remember the password → skip to Step 4
- If you don't → click "Forgot Password"

**Step 2: Create account if none exists**
- Go to https://commerce.com/register
- Sign up with your business details:
  - Brand name: The Product Lab
  - Legal name: Ink Fish (proprietorship)
  - GST: 29APFPH6495C1ZP
  - Phone: +91 9945057312
  - Email: use the one associated with the business
- Choose plan — there should be a free starter or pay-as-you-go option

**Step 3: Verify your store**
- Check email for verification link
- Verify phone number via OTP
- Upload GST certificate if prompted (this is required for COD and payment gateway setup)

**Step 4: Get credentials for Tobi**
Once logged in, you need to share these with Tobi (paste in our shared doc or DM):

```
Fynd Store URL/Subdomain: _________________________
Fynd Admin Login Email: ___________________________
Fynd Admin Password: ______________________________
(Or: invite Tobi as staff with admin permissions instead of sharing password)
```

**Recommended:** Invite Tobi as a staff member via Fynd admin → Settings → Staff → Add Staff. This is safer than sharing your password.

**Step 5: Confirm store is active**
- Navigate to the dashboard
- Confirm the store shows "Active" status
- Take a screenshot and send to Harley

---

## What Tobi Does Once He Has Access (Parallel Track)

1. Domain configuration
2. GST/tax zone setup
3. Razorpay integration
4. Shiprocket integration
5. GA4 + Clarity setup
6. Brand theme CSS implementation
7. Catalog structure + collections
8. Product uploads (once photos + copy arrive)

---

## Blocking Tree

```
Dan gets Fynd access
         ↓
    Tobi starts build
         ↓
Dan shoots photos ────→ Tobi uploads product images
Dan writes copy ──────→ Tobi fills product descriptions
         ↓
    Staging site live
         ↓
    James QA + sign-off
         ↓
    LAUNCH
```

**⏳ The clock is running on this. Every day without Fynd access is a day Tobi can't build.**
