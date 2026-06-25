<!-- last-updated: 2026-06-11 -->
# Deploy Checklist — Medusa + Next.js Production

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Merchandising Implementation |
| **Producing Agent** | Tobi (Developer) |
| **Date** | 2026-06-11 |
| **Status** | active |
| **Reviewer** | Harley |

**Source:** `artifacts/phase-4/technical-implementation-plan.md` (rewritten for Medusa/Next.js path per D-025)

---

## Overview

This document is the single source of truth for moving from **local development** (`localhost:9000` + `localhost:3000`) to a **live staging/production environment**.

**Platform stack (D-025):**
- **Storefront:** Next.js 16 → **Vercel** (recommended)
- **Medusa API:** Node.js + Express → **Railway / Render / Fly** (choose one)
- **Database:** PostgreSQL → **Supabase** (managed)
- **Cache/Queue:** Redis → **Upstash / Redis Cloud / Railway Redis** (managed)

**What this checklist covers:**
1. Infrastructure setup (Supabase, Redis, Vercel, Medusa host)
2. Environment configuration
3. Production database migrations + catalog seed
4. Razorpay + Shiprocket integration
5. Performance & QA gate

---

## 1. Infrastructure Setup

### 1.1 Supabase Production Project

**Owner:** Dan (create) → Tobi (configure)

- [ ] Create new Supabase project at https://supabase.com
  - Project name: `tpl-production` (or `tpl-staging` for staging)
  - Region: Mumbai (closest to India)
  - Database password: **save in 1Password / Bitwarden**
- [ ] Go to Project Settings → Database → Connection string (URI)
  - Copy `postgresql://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres`
  - This is your `DATABASE_URL`
- [ ] Go to Project Settings → API
  - Copy `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY` (if using Supabase Auth)
  - Copy `service role secret` → `SUPABASE_SERVICE_ROLE_KEY` (server-side only — never expose to frontend)
- [ ] Whitelist Tobi's and Medusa host IPs (if required by Supabase)

### 1.2 Managed Redis

**Owner:** Tobi

- [ ] **Option A: Upstash Redis** (recommended — free tier: 10K req/day)
  - Sign up at https://upstash.com
  - Create database → Region: Mumbai
  - Copy `REDIS_URL` (format: `rediss://default:[PASSWORD]@[HOST]:6379`)
- [ ] **Option B: Railway Redis**
  - In Railway project → New → Redis
  - Copy connection string
- [ ] **Option C: Redis Cloud**
  - https://redis.com/try-free/ → free tier 30MB

### 1.3 Medusa API Host

**Owner:** Tobi

- [ ] **Option A: Railway** (recommended — simple, good DX)
  - Sign up at https://railway.app
  - Create new project → Deploy from GitHub repo
  - Root directory: `backend/medusa/`
  - Add environment variables (see Section 2)
  - Railway auto-detects Dockerfile or `package.json` start script
- [ ] **Option B: Render**
  - https://render.com → New Web Service
  - Connect GitHub repo
  - Build command: `cd backend/medusa && npm install && npm run build`
  - Start command: `cd backend/medusa && npm start`
- [ ] **Option C: Fly.io**
  - Install `flyctl`, run `fly launch` in `backend/medusa/`
  - More control, slightly more setup

### 1.4 Storefront Host (Vercel)

**Owner:** Tobi

- [ ] Sign up / log in at https://vercel.com
- [ ] Import GitHub repo
- [ ] Root directory: `storefront/`
- [ ] Build command: `cd storefront && npm run build` (or auto-detected)
- [ ] Add environment variables (see Section 2)
- [ ] Deploy → confirm build succeeds

---

## 2. Environment Variables

### 2.1 Medusa Backend (`backend/medusa/.env`)

Copy `.env.template` to `.env` and fill:

```bash
# Database (Supabase)
DATABASE_URL=postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres

# Redis
REDIS_URL=rediss://default:[PASSWORD]@[HOST]:6379

# CORS — update with your Vercel domain
STORE_CORS=https://tpl-storefront.vercel.app,https://staging-tpl.vercel.app
ADMIN_CORS=https://tpl-admin.vercel.app
AUTH_CORS=https://tpl-storefront.vercel.app,https://tpl-admin.vercel.app

# Secrets (generate strong random strings)
JWT_SECRET=[64-char-random]
COOKIE_SECRET=[64-char-random]

# Medusa publishable key (auto-created on first run, or set manually)
MEDUSA_PUBLISHABLE_KEY=[key-from-admin]
```

### 2.2 Storefront (`storefront/.env.local`)

```bash
# Medusa backend URL (Railway/Render/Fly domain)
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://tpl-api.railway.app
MEDUSA_BACKEND_URL=https://tpl-api.railway.app

# Medusa publishable key (from Medusa admin or seed output)
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=[pk_from_medusa]

# Region ID (from seed output or Medusa admin)
NEXT_PUBLIC_MEDUSA_REGION_ID=[region-id]

# Razorpay (test mode first)
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_[YOUR_KEY]

# GA4 (optional for staging)
NEXT_PUBLIC_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2.3 Local `.env` for Development

Keep local `.env` pointing to local services:

```bash
# backend/medusa/.env (local)
DATABASE_URL=postgresql://localhost:5432/tpl_spike
REDIS_URL=redis://localhost:6379
STORE_CORS=http://localhost:3000
ADMIN_CORS=http://localhost:9000
AUTH_CORS=http://localhost:3000,http://localhost:9000
```

---

## 3. Production Database Migration & Seed

### 3.1 Run Medusa Migrations

```bash
# On Medusa host (Railway/Render/Fly shell), or locally with prod DB:
cd backend/medusa
npx medusa db:migrate
```

**Verify:** Check Supabase Table Editor → `medusa_*` tables created.

### 3.2 Seed Infrastructure (Region, Sales Channel, etc.)

```bash
npx medusa exec ./src/scripts/seed-tpl.ts
```

**Expected output:**
- India region created
- Default Sales Channel created
- Stock location (Cunningham Road) created
- Shipping profiles (Standard ₹49.90, Free ₹0) created
- Publishable API key generated

**Save the publishable API key token from output — it goes into `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY`.**

### 3.3 Import 502-Product Catalog

```bash
# Ensure import-catalog.json is present (from prep-woo-catalog.py)
npx medusa exec ./src/scripts/import-woo.ts
```

**Verify in Supabase:**
- `product` table → 502 rows
- `product_category` → 9 categories
- `product_image` → image URLs (hotlinked for now)

### 3.4 Verify Storefront Can Read Products

```bash
# Test API endpoint
curl https://tpl-api.railway.app/store/products?limit=10 \
  -H "x-publishable-api-key: YOUR_KEY"
```

**Expected:** JSON with 10 products, each with `title`, `handle`, `thumbnail`, `variants`.

---

## 4. Integration Setup

### 4.1 Razorpay (Payment Provider)

**Owner:** Dan (account) → Tobi (integration)

- [ ] Create / log in to Razorpay dashboard
- [ ] Copy Test Key ID and Secret
- [ ] In Medusa: install Razorpay payment provider plugin
- [ ] Configure webhook endpoint: `https://tpl-api.railway.app/hooks/payment/razorpay`
- [ ] Test UPI flow with `testmerchant@razorpay`

### 4.2 Shiprocket (Shipping/Fulfillment)

**Owner:** Dan (account) → Tobi (integration)

- [ ] Get Shiprocket API credentials
- [ ] In Medusa: install Shiprocket fulfillment plugin
- [ ] Configure warehouse address (Cunningham Road)
- [ ] Test AWB generation with test order

### 4.3 Airtable (Ops Sync)

**Owner:** Andy + Tobi

- [ ] Share Airtable base access with Tobi
- [ ] Configure Medusa → Airtable sync (webhook or scheduled job)
- [ ] Verify idempotency (Medusa order ID as unique key)

---

## 5. QA Gate Checklist

Before James can sign off, confirm:

| # | Check | How |
|---|-------|-----|
| 1 | Medusa API responds | `curl /store/products` returns 200 |
| 2 | Storefront builds on Vercel | Zero build errors |
| 3 | Homepage loads <3s LCP | Lighthouse mobile, 4G throttled |
| 4 | Product images render | 502 products, thumbnails visible |
| 5 | Add to Cart works | No `ERR_CONNECTION_REFUSED` |
| 6 | Cart → Checkout flow | Razorpay test payment succeeds |
| 7 | COD option shows for ₹299+ | Verified at checkout |
| 8 | Shiprocket AWB generates | Tracking number returned |
| 9 | Airtable syncs order | Row appears with Medusa order ID |
| 10 | GA4 purchase event fires | DebugView shows `purchase` event |

---

## 6. Known Issues from Current Build (Address Before Deploy)

Refer to `artifacts/phase-4/qa-checklist.md` for full detail. Critical items:

| ID | Issue | Fix | Owner |
|----|-------|-----|-------|
| LB-01 | Add to Cart button shows raw template literal | Fix JSX string in `add-to-cart-button.tsx` | Tobi |
| LB-02 | No product images (thumbnail null) | Add fallback image URL; port images to CDN | Tobi / Shreyas |
| LB-03 | Fonts not loaded (Barlow Condensed, Inter) | Add `next/font/google` in `layout.tsx` | Tobi |
| LB-04 | No focus rings (`outline: none` on buttons) | Implement `--shadow-pop` focus ring | Tobi |
| LB-05 | Mobile nav dead (no href on bottom-nav buttons) | Add working hamburger drawer or functional routes | Tobi |
| LB-07 | Medusa backend offline (`:9000` refused) | Ensure Medusa host is running and accessible | Tobi |

---

## 7. Rollback Plan

If anything breaks in production:

1. **Database:** Supabase has point-in-time recovery (PITR) — restore to pre-deploy snapshot.
2. **Medusa API:** Re-deploy previous commit via Railway/Render dashboard.
3. **Storefront:** Vercel keeps every deployment — roll back to previous build in dashboard.
4. **DNS:** If using custom domain, point back to old Fynd store (emergency only).

---

## 8. Sign-Off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Infrastructure | Tobi | | |
| QA | James | | |
| Program Director | Harley | 2026-06-11 | |

---

**Next steps after this checklist:**
1. Dan creates Supabase project, shares `DATABASE_URL`
2. Tobi provisions Redis, Medusa host, Vercel
3. Tobi runs migrations + seed + import on production DB
4. Tobi fixes LB-01 through LB-07
5. James runs full QA pass
6. Harley reviews, updates `knowledge/26-CURRENT-STATE.md`
