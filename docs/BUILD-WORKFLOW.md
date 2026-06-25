# Build & Workflow Guide

**The Product Lab — Relaunch Project**

This is the single source of truth for build, test, deploy, and CI operations across both the storefront (`storefront/`) and commerce backend (`backend/medusa/`). Read it before making any commit that touches build configuration, package scripts, CI files, Docker files, or environment variables.

---

## 1. Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| Node.js | `>=20` (enforced by `backend/medusa/package.json` engines field) | Use `nvm` or `fnm` to manage versions |
| npm | 10+ (ships with Node 20+) | Both projects use npm |
| PostgreSQL | 16+ | Local install or Docker |
| Redis | 7+ | Local install or Docker |
| Docker + Docker Compose | Latest | Optional but recommended for full-stack local dev |
| Git | Latest | For version control |

### Quick Install Checks

```bash
node --version   # Must be >=20
npm --version    # Must be 10+
psql --version   # Postgres client
redis-cli --version
docker --version && docker compose version
```

---

## 2. Getting Started (Local Dev)

### 2.1 Clone and Structure

The root workspace is **not a git repo**. Individual subdirectories have their own git state:

```bash
# Backend (if using git)
cd backend/medusa && git init   # Or clone from your remote

# Storefront (if using git)
cd storefront && git init       # Or clone from your remote
```

### 2.2 Backend Setup

```bash
cd backend/medusa

# Create environment file from template
cp .env.template .env

# Required: edit .env and set at minimum:
#   DATABASE_URL           — e.g. postgres://medusa:medusa@localhost:5432/tpl_spike
#   JWT_SECRET              — any strong random string
#   COOKIE_SECRET           — any strong random string

# Install dependencies
npm install

# Build the project (must pass before dev)
npm run build

# Run database migrations
npx medusa db:migrate

# Seed the TPL catalog
npm run seed:tpl

# Start development server (watches for changes)
npm run dev
```

The backend starts on `http://localhost:9000`. Medusa admin is at `http://localhost:9000/app`.

### 2.3 Storefront Setup

```bash
cd storefront

# Create environment file from example
cp .env.example .env.local

# Edit .env.local and set at minimum:
#   NEXT_PUBLIC_MEDUSA_BACKEND_URL  — http://localhost:9000
#   MEDUSA_BACKEND_URL              — http://localhost:9000
#   MEDUSA_ADMIN_EMAIL              — admin@theproductlab.in
#   MEDUSA_ADMIN_PASSWORD           — from your Medusa setup
#   JWT_SECRET                      — must match backend JWT_SECRET

# Install dependencies
npm install

# Start development server
npm run dev
```

The storefront starts on `http://localhost:3000`.

### 2.4 Full-Stack via Docker Compose

```bash
# From project root
docker compose up -d

# This starts:
#   - PostgreSQL on :5432
#   - Redis on :6379
#   - Medusa backend on :9000
#   - Next.js storefront on :3000
```

Run migrations and seeds after compose comes up:

```bash
docker compose exec medusa npx medusa db:migrate
docker compose exec medusa npm run seed:tpl
```

---

## 3. Environment Setup

### 3.1 Environment File Matrix

| File | Location | Purpose | Git |
|------|----------|---------|-----|
| `.env.template` | `backend/medusa/` | Documents every env var with descriptions | Committed |
| `.env` | `backend/medusa/` | Local secrets, overrides | **Gitignored** |
| `.env.test` | `backend/medusa/` | Test environment vars | Committed (empty initially) |
| `.env.example` | `storefront/` | Documents all storefront env vars | Committed |
| `.env.local` | `storefront/` | Local secrets, overrides | **Gitignored** |

### 3.2 Backend Environment Variables

#### Required (app will not start without these)

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgres://medusa:medusa@localhost:5432/tpl_spike` |
| `JWT_SECRET` | Token signing secret | Random 64-char string |
| `COOKIE_SECRET` | Session cookie secret | Random 64-char string |
| `STORE_CORS` | Allowed storefront origins for CORS | `http://localhost:3000` |
| `ADMIN_CORS` | Allowed admin origins for CORS | `http://localhost:9000,http://localhost:5173` |
| `AUTH_CORS` | Allowed auth origins for CORS | `http://localhost:3000,http://localhost:9000,http://localhost:5173` |

#### Optional (dormant until credentials set)

| Variable | Description | Dormancy Behavior |
|----------|-------------|-------------------|
| `RAZORPAY_KEY_ID` | Razorpay public key | COD-only mode |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key | COD-only mode |
| `RAZORPAY_WEBHOOK_SECRET` | Webhook verification secret | Webhook validation skipped |
| `SHIPROCKET_EMAIL` | Shiprocket login email | Shiprocket sync disabled |
| `SHIPROCKET_PASSWORD` | Shiprocket password | Shiprocket sync disabled |
| `SHIPROCKET_PICKUP_LOCATION` | Pickup location name | Defaults to `Primary` |
| `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` | SMTP credentials | Notification module runs in **stub mode** (logs to stdout + `notification-audit/*.jsonl`) |
| `RESEND_API_KEY` | Resend API token | Overrides SMTP; falls back to SMTP |
| `SENDGRID_API_KEY` | SendGrid API token | Overrides SMTP/Resend; falls back |
| `GUPSHUP_API_KEY` / `GUPSHUP_SOURCE_NUMBER` | Gupshup WhatsApp credentials | WhatsApp module runs in stub mode (logs to `notification-audit/whatsapp-*.jsonl`) |
| `MSG91_AUTH_KEY` / `MSG91_SENDER_NUMBER` | MSG91 WhatsApp credentials | Fallback to Gupshup; stub if none |
| `META_WABA_PHONE_NUMBER_ID` | Meta WhatsApp Cloud API | Direct Meta transport (zero BSP markup) |
| `META_WHATSAPP_ACCESS_TOKEN` | Meta permanent system-user token | Direct Meta transport |

### 3.3 Dormancy Pattern

Every integration (payments, shipping, notifications, WhatsApp) follows the same pattern:

1. **No credentials set** → module runs in stub/dormant mode, app boots cleanly, all actions logged to stdout + audit files
2. **Credentials set** → module activates transparently, no config changes needed beyond env vars
3. **Partial credentials** → module logs a warning and stays dormant

This means you can run the full stack locally with **zero external dependencies** configured.

### 3.4 Storefront Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | Yes | Public-facing Medusa URL (`http://localhost:9000`) |
| `MEDUSA_BACKEND_URL` | Yes | Server-side Medusa URL (`http://localhost:9000`; `http://medusa:9000` in Docker) |
| `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | No | Medusa publishable key (if using Medusa auth) |
| `NEXT_PUBLIC_MEDUSA_REGION_ID` | No | Default region ID |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | COD-only | Razorpay public key (same as backend `RAZORPAY_KEY_ID`) |
| `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | No | Google Analytics 4 measurement ID |
| `MEDUSA_ADMIN_EMAIL` | Yes | Admin login email for server-side admin client |
| `MEDUSA_ADMIN_PASSWORD` | Yes | Admin login password for server-side admin client |
| `ADMIN_LOGIN_EMAIL` | Yes | Admin UI login email |
| `JWT_SECRET` | Yes | Must match backend `JWT_SECRET` |

---

## 4. Build Pipeline

### 4.1 Storefront Build

```bash
cd storefront

# Full production build
npm run build
```

**Requirements:**
- Must pass before any commit
- Produces ~46 static routes (verify count in build output: "generated ___ routes")
- Output goes to `.next/` (standalone mode per `next.config.ts`)
- Uses Turbopack in development (`turbo dev`), standard build in production

**Known state (as of June 2026):**
- Build: **PASSES** (46 routes generated)
- Lint: **FAILS** (34 errors, 9 warnings) — see Section 7

**Build config (`next.config.ts`):**
```typescript
import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  output: "standalone",
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
```

### 4.2 Backend Build

```bash
cd backend/medusa

# Full production build (via Medusa CLI)
npm run build
```

**Requirements:**
- Must pass before any commit
- Output goes to `.medusa/server/`

**Known state (as of June 2026):**
- Build: **FAILS** — two known issues:

**Issue 1: SMTP notification module is incomplete/incompatible with Medusa v2.15**
- References `nodemailer` which may not be installed or correctly resolved
- Module may reference APIs that changed between Medusa versions
- **Fix:** Audit `backend/medusa/src/modules/smtp-notification/` against current Medusa v2.15 module API; ensure `nodemailer` is in `dependencies` (not just `@types/nodemailer`)

**Issue 2: `apply-pdp-copy.ts` has TypeScript error with nullable description**
- File: `backend/medusa/src/scripts/apply-pdp-copy.ts`
- Description field accessed without null check
- **Fix:** Add nullish coalescing or optional chaining on description access

**Issue 3: `tsconfig.json` includes `scripts/` in build surface**
- `tsconfig.json` has `"include": ["**/*"]` which includes `src/scripts/`
- Script files meant only for `npx medusa exec` get type-checked and bundled into the build
- **Fix:** Add `"src/scripts"` to `tsconfig.json` exclude array, or create a separate `tsconfig.scripts.json`

### 4.3 Build Gate (pre-commit)

Run these checks before every commit:

```bash
# Storefront
cd storefront && npm run build && npm run lint

# Backend
cd backend/medusa && npm run build

# Backend (optional until tsc --noEmit is configured)
cd backend/medusa && npx tsc --noEmit
```

---

## 5. Database & Migrations

### 5.1 Migration Workflow

Medusa manages schema migrations through its own CLI tooling:

```bash
# Run all pending migrations
npx medusa db:migrate

# Check migration status
npx medusa db:migrate --status
```

Migrations are applied automatically in Docker Compose startup (see `command` in `docker-compose.yml`).

### 5.2 Seed Scripts

All seed scripts live in `backend/medusa/src/scripts/`:

| Command | Script | Purpose |
|---------|--------|---------|
| `npm run seed:tpl` | `src/scripts/seed-tpl.ts` | Seeds the full TPL product catalog, collections, and base config |
| `npm run seed:shipping` | `src/scripts/seed-shipping.ts` | Sets up shipping options, COD provider, and shipping regions |
| `npm run seed` | `src/scripts/seed.ts` | Generic/fallback seed (not TPL-specific) |

**Order of operations for a fresh database:**

```bash
npx medusa db:migrate
npm run seed:tpl
npm run seed:shipping
```

### 5.3 Database Targets

| Environment | Provider | Connection |
|-------------|----------|------------|
| Local dev | Local PostgreSQL | `postgres://medusa:medusa@localhost:5432/tpl_spike` |
| Staging | Supabase | Supabase connection string (project settings) |
| Production | Supabase | Supabase connection string (project settings) |

### 5.4 Supabase Connection

For staging/production, get the connection string from Supabase dashboard → Project Settings → Database → Connection string (URI format with password).

Set `DATABASE_URL` in the production environment to the Supabase connection string with `?sslmode=require` appended.

---

## 6. Testing

### 6.1 Backend Tests

Three test suites exist in `backend/medusa/`:

```bash
cd backend/medusa

# HTTP integration tests — tests API routes end-to-end
npm run test:integration:http

# Module integration tests — tests Medusa modules in isolation
npm run test:integration:modules

# Unit tests — tests individual functions and utilities
npm run test:unit
```

**Coverage Targets:**

| Area | Test Type | Priority |
|------|-----------|----------|
| COD checkout flow | `integration:http` | P0 |
| Prepaid discount calculation | `integration:http` | P0 |
| Razorpay webhook (idempotency, state update) | `integration:http` | P0 |
| Guest tracking (orders without account) | `integration:http` | P1 |
| Claim-order flow | `integration:modules` | P1 |
| Customer auth routes (login, register, password) | `integration:http` | P1 |
| Admin password routes (operator password change) | `integration:http` | P1 |
| Shiprocket sync (no duplicates, failure alert) | `integration:modules` | P1 |

### 6.2 Storefront Tests

No test script currently exists. This needs to be set up.

**Recommended setup: Playwright E2E**

```bash
cd storefront
npm install --save-dev @playwright/test
npx playwright install
```

Add to `storefront/package.json`:
```json
"test:e2e": "playwright test",
"test:e2e:ui": "playwright test --ui"
```

**Screenshot Breakpoints** (all E2E tests should capture at these widths):

| Device | Width x Height |
|--------|---------------|
| Mobile | 390 x 844 |
| Tablet | 768 x 1024 |
| Desktop small | 1280 x 800 |
| Desktop medium | 1440 x 900 |
| Desktop large | 1920 x 1080 |

**Test Coverage Targets:**

| Area | Priority |
|------|----------|
| Auth flows (login, register, logout, password reset) | P0 |
| Cart operations (add, remove, update quantity) | P0 |
| Checkout (address, shipping, payment method selection) | P0 |
| COD floor enforcement (min order for COD) | P0 |
| Admin order mutations (view, fulfill, cancel, mark COD collected) | P0 |
| Product listing and detail pages | P1 |
| Account orders and profile | P1 |
| Search and collection browsing | P2 |

### 6.3 Running All Tests

```bash
# Storefront (after Playwright setup)
cd storefront && npm run test:e2e

# Backend
cd backend/medusa && npm run test:unit && npm run test:integration:modules && npm run test:integration:http
```

---

## 7. Lint & Type Checking

### 7.1 Storefront Lint

```bash
cd storefront
npm run lint
```

**Config:** `storefront/eslint.config.mjs` — uses `eslint-config-next` with `core-web-vitals` and `typescript` presets.

**Current state:** 34 errors, 9 warnings.

**Priority fixes (by category):**
1. Unused imports and variables (highest count)
2. Missing dependency arrays in hooks (`react-hooks/exhaustive-deps`)
3. `any` types that should be typed
4. Accessibility issues (`jsx-a11y` rules)

**Approach:**
```bash
# Auto-fix what you can
npm run lint -- --fix

# Then fix remaining manually
npm run lint
```

### 7.2 TypeScript Configuration

| Project | strict | strictNullChecks | Notes |
|---------|--------|------------------|-------|
| Storefront | `true` | `true` (implied by strict) | Full strict mode |
| Backend | `false` | `true` | Missing `strict: true` |

**Backend tsconfig fix required:**
```json
{
  "compilerOptions": {
    "strict": true,
    "strictNullChecks": true
    // ... existing options
  }
}
```

At minimum, the backend needs:
- `strict: true` — enables full type checking family
- `noUncheckedIndexedAccess` — catches null/undefined on array/dictionary access
- Exclusion of `src/scripts/` from the build surface

### 7.3 Type Check Scripts

Add these to the respective `package.json` files:

**Storefront:**
```json
"typecheck": "tsc --noEmit"
```

**Backend:**
```json
"typecheck": "tsc --noEmit --project tsconfig.json"
```

Then run:
```bash
cd storefront && npm run typecheck
cd backend/medusa && npm run typecheck
```

### 7.4 Pre-Commit Lint Gate

Until CI is set up, run manually:

```bash
echo "=== Storefront ===" && cd storefront && npm run lint && npm run build && echo "=== Backend ===" && cd ../backend/medusa && npm run build && echo "=== ALL PASS ==="
```

---

## 8. CI/CD Pipeline Design

### 8.1 Proposed GitHub Actions Workflow

**File: `.github/workflows/ci.yml`**

```yaml
name: CI

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install storefront dependencies
        working-directory: storefront
        run: npm ci
      - name: Lint storefront
        working-directory: storefront
        run: npm run lint
      - name: Install backend dependencies
        working-directory: backend/medusa
        run: npm ci
      - name: TypeScript check backend
        working-directory: backend/medusa
        run: npx tsc --noEmit

  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install storefront deps
        working-directory: storefront
        run: npm ci
      - name: TypeScript check storefront
        working-directory: storefront
        run: npx tsc --noEmit
      - name: Install backend deps
        working-directory: backend/medusa
        run: npm ci
      - name: TypeScript check backend
        working-directory: backend/medusa
        run: npx tsc --noEmit

  build:
    runs-on: ubuntu-latest
    needs: [lint, typecheck]
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Build storefront
        working-directory: storefront
        run: npm ci && npm run build
      - name: Build backend
        working-directory: backend/medusa
        run: npm ci && npm run build

  test:
    runs-on: ubuntu-latest
    needs: [build]
    services:
      postgres:
        image: postgres:16-alpine
        env:
          POSTGRES_DB: medusa_test
          POSTGRES_USER: medusa
          POSTGRES_PASSWORD: medusa
        ports:
          - 5432:5432
      redis:
        image: redis:7-alpine
        ports:
          - 6379:6379
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Install backend deps
        working-directory: backend/medusa
        run: npm ci
      - name: Run unit tests
        working-directory: backend/medusa
        run: npm run test:unit
      - name: Run integration tests
        working-directory: backend/medusa
        run: npm run test:integration:http
        env:
          DATABASE_URL: postgres://medusa:medusa@localhost:5432/medusa_test

  secret-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run Gitleaks
        uses: gitleaks/gitleaks-action@v2
        with:
          config-path: .gitleaks.toml

  dependency-audit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - name: Audit storefront
        working-directory: storefront
        run: npm audit --audit-level=high
      - name: Audit backend
        working-directory: backend/medusa
        run: npm audit --audit-level=high
```

### 8.2 Proposed CI Gates (Summary)

| # | Gate | Tool | Fail Condition |
|---|------|------|---------------|
| 1 | **Lint** | ESLint (storefront), tsc (backend) | Any error |
| 2 | **Typecheck** | `tsc --noEmit` (both) | Any type error |
| 3 | **Build** | `npm run build` (both) | Non-zero exit |
| 4 | **Test** | Jest (backend), Playwright (storefront) | Any test failure |
| 5 | **Secret scan** | Gitleaks or truffleHog | Any secret detected |
| 6 | **Dependency audit** | `npm audit` | High or critical vuln |
| 7 | **Container scan** | Trivy or Docker Scout | Critical vulns in final image |

### 8.3 Deployment Targets

| Component | Staging | Production | Provider |
|-----------|---------|------------|----------|
| Storefront | Preview deploys per branch | `main` branch → production | **Vercel** |
| Backend | Staging Railway/Render service | Production Railway/Render/Fly service | **Railway** or **Render** or **Fly** |
| Database | Supabase staging project | Supabase production project | **Supabase** |
| Redis | Upstash staging | Upstash production | **Upstash** or Railway managed |

### 8.4 Environment Matrix (Production)

Store these in the deploy provider's secrets manager (not in `.env` files):

| Service | Variable | Source |
|---------|----------|--------|
| Storefront (Vercel) | `NEXT_PUBLIC_MEDUSA_BACKEND_URL` | `https://api.theproductlab.in` |
| Storefront (Vercel) | `MEDUSA_BACKEND_URL` | `https://api.theproductlab.in` |
| Storefront (Vercel) | `NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY` | Medusa dashboard |
| Storefront (Vercel) | `NEXT_PUBLIC_MEDUSA_REGION_ID` | Medusa backend (run `npx medusa exec` to get ID) |
| Storefront (Vercel) | `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay dashboard (live keys) |
| Storefront (Vercel) | `NEXT_PUBLIC_GA4_MEASUREMENT_ID` | Google Analytics 4 |
| Storefront (Vercel) | `MEDUSA_ADMIN_EMAIL` | `admin@theproductlab.in` |
| Storefront (Vercel) | `MEDUSA_ADMIN_PASSWORD` | Generated random password |
| Storefront (Vercel) | `JWT_SECRET` | Random 64-char string (match backend) |
| Backend (Railway) | `DATABASE_URL` | Supabase production connection string |
| Backend (Railway) | `JWT_SECRET` | Random 64-char string (match storefront) |
| Backend (Railway) | `COOKIE_SECRET` | Random 64-char string |
| Backend (Railway) | `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` / `RAZORPAY_WEBHOOK_SECRET` | Razorpay live keys |
| Backend (Railway) | `SHIPROCKET_EMAIL` / `SHIPROCKET_PASSWORD` | Shiprocket credentials |
| Backend (Railway) | `SMTP_HOST` / `SMTP_USER` / `SMTP_PASS` | Transactional email provider |
| Backend (Railway) | `GUPSHUP_API_KEY` / `GUPSHUP_SOURCE_NUMBER` | Gupshup WhatsApp credentials |
| Backend (Railway) | `REDIS_URL` | Upstash Redis connection string |
| Backend (Railway) | `STOREFRONT_URL` | `https://www.theproductlab.in` |

---

## 9. Docker Convention

### 9.1 Current Setup

`docker-compose.yml` at project root runs four services:
- **postgres** — PostgreSQL 16 Alpine with health check and persistent volume
- **redis** — Redis 7 Alpine with health check
- **medusa** — Backend, multi-stage build, runs migrations then start
- **storefront** — Next.js 16, standalone output, depends on medusa

### 9.2 Dev vs. Production Split

**Current:** Single `docker-compose.yml` for both dev and prod.

**Required:** Split into two files:

| File | Purpose |
|------|---------|
| `docker-compose.yml` | Dev (exposes ports, no resource limits, hot-reload) |
| `docker-compose.prod.yml` | Production (internal networking, resource limits, restart policies, log rotation) |

Dev compose:
```yaml
# docker-compose.yml (simplified — already exists)
services:
  postgres:
    image: postgres:16-alpine
    ports: ["5432:5432"]
    volumes: [postgres-data:/var/lib/postgresql/data]
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U medusa -d medusa"]
      interval: 10s
      timeout: 5s
      retries: 5

  redis:
    image: redis:7-alpine
    ports: ["6379:6379"]
    healthcheck:
      test: ["CMD", "redis-cli", "ping"]
      interval: 10s
      timeout: 5s
      retries: 5

  medusa:
    build: ./backend/medusa
    ports: ["9000:9000"]
    depends_on:
      postgres: { condition: service_healthy }
      redis: { condition: service_healthy }
    command: ["sh", "-c", "npx medusa db:migrate && npm run start"]

  storefront:
    build: ./storefront
    ports: ["3000:3000"]
    depends_on: [medusa]

volumes:
  postgres-data:
```

### 9.3 Production Docker Requirements

**Postgres + Redis:**
- No exposed ports (internal to Docker network only)
- Persistent volume for Postgres
- Health checks (already present)
- Restart policy: `unless-stopped`
- Resource limits: `mem_limit: 1g` for Postgres, `mem_limit: 256m` for Redis

**Medusa Dockerfile (`backend/medusa/Dockerfile`) — Required Fixes:**

```dockerfile
FROM node:22-slim AS deps
WORKDIR /app
RUN apt-get update \
  && apt-get install -y python3 make g++ --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
WORKDIR /app
COPY . .
RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=9000

# Create non-root user
RUN addgroup --system --gid 1001 medusa \
  && adduser --system --uid 1001 medusa

# Copy only what's needed (no build tools)
COPY --from=build /app/.medusa/server .medusa/server
COPY --from=build /app/node_modules node_modules
COPY --from=build /app/package.json ./
COPY --from=build /app/medusa-config.ts ./

RUN chown -R medusa:medusa /app
USER medusa

EXPOSE 9000
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:9000/health || exit 1

CMD ["npm", "run", "start"]
```

**Storefront Dockerfile (`storefront/Dockerfile`):**
```dockerfile
FROM node:22-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
WORKDIR /app
COPY . .

ARG NEXT_PUBLIC_MEDUSA_BACKEND_URL
ARG NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
ARG NEXT_PUBLIC_MEDUSA_REGION_ID
ARG NEXT_PUBLIC_RAZORPAY_KEY_ID
ARG NEXT_PUBLIC_GA4_MEASUREMENT_ID

ENV NEXT_PUBLIC_MEDUSA_BACKEND_URL=${NEXT_PUBLIC_MEDUSA_BACKEND_URL}
ENV NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=${NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY}
ENV NEXT_PUBLIC_MEDUSA_REGION_ID=${NEXT_PUBLIC_MEDUSA_REGION_ID}
ENV NEXT_PUBLIC_RAZORPAY_KEY_ID=${NEXT_PUBLIC_RAZORPAY_KEY_ID}
ENV NEXT_PUBLIC_GA4_MEASUREMENT_ID=${NEXT_PUBLIC_GA4_MEASUREMENT_ID}

RUN npm run build

FROM node:22-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Already has non-root user — good
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=build /app/.next/standalone ./
COPY --from=build /app/.next/static ./.next/static
COPY --from=build /app/public ./public

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

CMD ["node", "server.js"]
```

### 9.4 Resource Limits (Production Compose)

```yaml
services:
  postgres:
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 1G
        reservations:
          cpus: "0.5"
          memory: 512M
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  redis:
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 256M
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"

  medusa:
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 1G
        reservations:
          cpus: "0.5"
          memory: 512M
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "5"

  storefront:
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 512M
    restart: unless-stopped
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

---

## 10. Launch Gate Checklist

This checklist must be fully verified before launch sign-off. James controls launch QA — no one overrules James.

### Build & Lint

- [ ] `storefront: npm run build` — passes (46 routes generated, verify count)
- [ ] `storefront: npm run lint` — passes with zero errors
- [ ] `backend/medusa: npm run build` — passes
- [ ] `backend/medusa: npx tsc --noEmit` — passes with zero errors

### Tests

- [ ] Backend unit tests pass (`npm run test:unit`)
- [ ] Backend HTTP integration tests pass (`npm run test:integration:http`)
- [ ] Backend module integration tests pass (`npm run test:integration:modules`)
- [ ] Storefront E2E auth smoke tests pass (login, register, password reset)
- [ ] Storefront E2E cart/checkout smoke tests pass (add to cart, checkout, COD selection)
- [ ] Storefront E2E admin smoke tests pass (orders list, fulfill, cancel)

### Payments

- [ ] Razorpay webhook correctly updates Medusa payment session state
- [ ] Razorpay webhook is idempotent (duplicate webhooks do not double-capture)
- [ ] COD minimum order amount is enforced server-side (not just client-side)
- [ ] Prepaid discount is enforced server-side (₹30 off when paying online)

### Shipping

- [ ] Shiprocket sync cannot duplicate orders (idempotent create/update)
- [ ] Shiprocket sync alerts on failure (does not fail silently)
- [ ] COD shipping options resolve correctly for all India pincodes (no rule-context matching bug)

### Security

- [ ] No known live secrets remain in docs, run notes, or locally committed files
- [ ] `.env` files are gitignored in both projects
- [ ] JWT_SECRET and COOKIE_SECRET are unique random strings in production
- [ ] Production JWT_SECRET differs from all staging/dev values

### Operations

- [ ] Production environment matrix is complete (all vars set in deploy provider)
- [ ] Deployment runbook exists and is tested
- [ ] Rollback path exists (Vercel instant rollback, Railway restore from backup)
- [ ] Docker health checks pass for all services

### SEO & Public Surfaces

- [ ] Responsive QA passes for all device bands (390, 768, 1280, 1440, 1920)
- [ ] Product JSON-LD structured data is live in staging
- [ ] XML sitemap is live and contains all public product/collection URLs
- [ ] `robots.txt` is live and correct (allow all, sitemap URL)
- [ ] Canonical metadata on all pages
- [ ] Product feed (Google Merchant Center or equivalent) is live in staging
- [ ] `/llms.txt` exists, is public, contains only public links
- [ ] Agent-readable surfaces (API docs, sitemaps) are read-only by default

---

## 11. 30-Day Improvement Schedule

From the CTO codebase audit (June 2026). Execute in order.

### Days 1-3: Critical Fixes

| Task | Owner | Verification |
|------|-------|-------------|
| Fix Medusa build (smtp-notification module, `apply-pdp-copy.ts` nullable, tsconfig include) | Backend | `npm run build` passes |
| Fix storefront lint errors (34 errors, 9 warnings) | Storefront | `npm run lint` passes |
| Patch cart/prepaid discount server-side enforcement | Backend | Integration test passes |
| Rotate any secrets found in committed files or docs | Both | Gitleaks scan passes |
| Resolve docs contradictions (D-022 superseded by D-025) | Docs | ARCHITECTURE.md is consistent |

### Days 4-10: Payment, Shipping, Testing

| Task | Owner | Verification |
|------|-------|-------------|
| Complete Razorpay payment flow (webhook, capture, refund, idempotency) | Backend | Integration test passes |
| Complete Shiprocket shipping flow (label generation, tracking sync, COD/NDR) | Backend | Integration test passes |
| Add rate limiting to API routes (auth, checkout, admin) | Backend | Load test or manual verify |
| Fix mobile checkout responsive issues | Storefront | Screenshot tests pass at 390x844 |
| Add Playwright screenshot tests for all breakpoints | Storefront | `npm run test:e2e` passes |

### Days 11-20: CI, Docker, SEO

| Task | Owner | Verification |
|------|-------|-------------|
| Set up GitHub Actions CI with all 7 gates | DevOps | CI green on PR |
| Harden Docker (non-root runtime, health checks, resource limits, log rotation) | DevOps | `docker compose up` with prod compose |
| Implement sitemap generation (dynamic XML from products/collections) | Storefront | Sitemap lints valid |
| Implement `robots.txt` | Storefront | Live at `/robots.txt` |
| Implement JSON-LD structured data on product pages | Storefront | Google Rich Results Test passes |
| Implement product feed (RSS/XML for Google Merchant Center) | Backend | Feed validates |
| Write deployment runbook and rollback procedures | Docs | Reviewed by James |
| Write database backup/restore runbook | Docs | Reviewed by James |

### Days 21-30: Repo Structure & Polish

| Task | Owner | Verification |
|------|-------|-------------|
| Restructure repo layout (apps/storefront, services/commerce, etc.) | DevOps | All imports update, build passes |
| Archive old/stale files and raw dumps | Docs | `git status` shows clean archive |
| Lock catalog truth to a single source (`catalogs/`) | Product | Seed produces identical catalog |
| Add Architecture Decision Records (ADRs) for key choices | Docs | `decisions/decision-log.md` is current |
| Implement agent tools for automated ops (QA, deploy, rollback) | DevOps | Tool smoke test passes |
| Final launch gate review | James | All checklist items verified |

---

## 12. Code Review Process

### 12.1 Pre-Requisites (Must Pass Before Review)

- [ ] Storefront build passes (`npm run build`)
- [ ] Storefront lint passes (`npm run lint`)
- [ ] Backend build passes (`npm run build`)
- [ ] Backend type check passes (`npx tsc --noEmit`)
- [ ] No new secrets committed (manual scan + Gitleaks once CI is set up)
- [ ] Tests pass (backend + storefront once Playwright is configured)

### 12.2 Review Checklist

Reviewers must verify:

**Correctness:**
- Does the code do what it says on the ticket/PR description?
- Are edge cases handled (empty states, error states, loading states)?
- Are idempotency guarantees maintained for payment/shipping operations?

**Security:**
- No hardcoded secrets, API keys, or tokens
- Input validation on all API routes (no SQL injection, no XSS)
- CSRF protection on state-changing operations
- Rate limiting on auth and checkout routes
- Auth checks on admin routes (deny-by-default via `requireRole`)

**Error Handling:**
- External service calls (Razorpay, Shiprocket, WhatsApp, email) are non-blocking
- Failed external calls are logged and surfaced, not silently swallowed
- Payment webhooks are idempotent (duplicate calls do not double-process)
- Stub/dormancy mode works correctly when credentials are missing

**Testing:**
- Money/order flows have integration tests
- Payment and shipping have coverage for success + failure paths
- At least one screenshot test per new page/component

### 12.3 Branch Strategy

```
main          ← production (protected, no direct commits)
  └─ develop  ← integration branch
       └─ feature/*  ← feature branches off develop
       └─ fix/*      ← hotfix branches off develop
```

- No commit to `main` without review
- No commit to `develop` without CI passing (once CI is set up)
- Feature branches merge to `develop` via PR
- `develop` merges to `main` for releases

---

## 13. Observability

### 13.1 Structured Logging

All backend services must log in JSON format:

```json
{"level":"info","timestamp":"2026-06-20T10:30:00.000Z","service":"medusa","message":"Order placed","order_id":"ord_xxx","amount":499,"payment_method":"cod"}
```

**Configuration:**
- Medusa: configure `LOGGER_LEVEL=info` and ensure logger outputs JSON
- Storefront: Next.js console logs in dev; use structured logging middleware for server actions
- Notification audit trails: written daily to `notification-audit/*.jsonl` with automatic rotation

### 13.2 Uptime Monitoring

| Surface | Monitoring Tool | Expected SLA |
|---------|----------------|--------------|
| Storefront (theproductlab.in) | Better Uptime or UptimeRobot (free tier) | 99.9% |
| API (api.theproductlab.in) | Better Uptime or UptimeRobot (free tier) | 99.9% |
| Medusa Admin (:9000/app) | Internal (not publicly monitored) | Best effort |

### 13.3 Error Reporting

| Service | Tool | Free Tier Limit |
|---------|------|-----------------|
| Storefront | Sentry | 5k events/month |
| Backend | Sentry | 5k events/month |

**Key alert rules:**
- Payment failure rate > 1% in 5-minute window
- Shiprocket sync failure (any order that fails to sync after 3 retries)
- Razorpay webhook HMAC verification failure
- Order creation without corresponding payment record

### 13.4 Payment Reconciliation Alerts

The system must detect and alert on:
- Orders marked as paid in Medusa where Razorpay shows no successful payment (or vice versa)
- COD orders stuck in uncollected state for > 7 days
- Refunds created in Razorpay but not reflected in Medusa (or vice versa)
- Duplicate webhook processing (same `razorpay_payment_id` processed twice)

### 13.5 User Analytics

| Tool | Purpose | Implementation |
|------|---------|---------------|
| GA4 | User behavior, funnel analysis, conversion tracking | `NEXT_PUBLIC_GA4_MEASUREMENT_ID` env var |
| Microsoft Clarity | Session recording, heatmaps, rage clicks | Next.js script component (free tier) |

### 13.6 Notification Audit Trails

All notification modules (email, WhatsApp) maintain audit logs:
- **Path:** `notification-audit/` at the application root
- **Format:** JSONL (one JSON object per line, one file per day)
- **Rotation:** Daily — `email-YYYY-MM-DD.jsonl`, `whatsapp-YYYY-MM-DD.jsonl`
- **Retention:** 30 days (local cleanup script or log rotation)
- **Content:** recipient, template, status (sent/failed/stub), error message, timestamp
- **Purpose:** Debug delivery issues, compliance proof, billing reconciliation for BSP providers

---

## Appendix A: Quick Reference

### Common Commands

```bash
# ── Backend ──
cd backend/medusa
npm run dev          # Start development server (watch mode)
npm run build        # Production build
npm run start        # Start production server
npm run seed:tpl     # Seed TPL catalog
npm run seed:shipping # Seed shipping options
npm run test:unit    # Unit tests
npm run test:integration:http     # HTTP integration tests
npm run test:integration:modules  # Module integration tests
npx medusa db:migrate             # Run migrations
npx medusa db:migrate --status    # Check migration status

# ── Storefront ──
cd storefront
npm run dev          # Start development server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Lint check
npm run lint -- --fix # Auto-fix lint errors

# ── Docker ──
docker compose up -d            # Start all services
docker compose down             # Stop all services
docker compose logs -f medusa   # Follow backend logs
docker compose exec medusa sh   # Shell into backend container
docker compose exec postgres psql -U medusa  # SQL shell

# ── Database ──
psql -U medusa -d tpl_spike -c "\dt"  # List tables
psql -U medusa -d tpl_spike -c "SELECT COUNT(*) FROM product;"  # Count products
```

### File Paths

| What | Path |
|------|------|
| Backend package | `backend/medusa/package.json` |
| Backend Dockerfile | `backend/medusa/Dockerfile` |
| Backend tsconfig | `backend/medusa/tsconfig.json` |
| Backend env template | `backend/medusa/.env.template` |
| Storefront package | `storefront/package.json` |
| Storefront Dockerfile | `storefront/Dockerfile` |
| Storefront config | `storefront/next.config.ts` |
| Storefront eslint | `storefront/eslint.config.mjs` |
| Storefront tsconfig | `storefront/tsconfig.json` |
| Storefront env example | `storefront/.env.example` |
| Docker compose | `docker-compose.yml` |
| Decision log | `decisions/decision-log.md` |
| Architecture docs | `docs/ARCHITECTURE.md` |
| Current state | `knowledge/26-CURRENT-STATE.md` |

### Env Var Dependencies Between Services

```
Backend JWT_SECRET  ← Must match →  Storefront JWT_SECRET
Backend RAZORPAY_KEY_ID  ← Same as →  Storefront NEXT_PUBLIC_RAZORPAY_KEY_ID
Backend STOREFRONT_URL  ← Same as →  Storefront NEXT_PUBLIC_STOREFRONT_URL
Backend DATABASE_URL  ← Supabase →  Supabase project connection string
Backend REDIS_URL  ← Upstash →  Upstash Redis connection string
```

---

## Appendix B: Troubleshooting

### Build Failures

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Medusa build fails: "Cannot find module 'nodemailer'" | SMTP notification module missing dependency | `npm install nodemailer` in backend |
| Medusa build fails: "Object is possibly 'null'" on `apply-pdp-copy.ts` | Nullable description without guard | Add `?.` or `??` to description access |
| Storefront build fails: "Module not found" | Missing dependency | `npm install` in storefront |
| Storefront lint fails with 30+ errors | Multiple eslint violations | Run `npm run lint -- --fix`, then fix remaining manually |
| Docker compose fails: "service 'medusa' failed to build" | Dockerfile issue or npm install failure | `docker compose build --no-cache medusa` to rebuild |

### Database Issues

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `npx medusa db:migrate` fails: "relation does not exist" | Database not created | `createdb tpl_spike` or use Docker Postgres |
| Seed fails: "duplicate key value violates unique constraint" | Already seeded | Drop and recreate: `npx medusa db:migrate` after truncate |
| Connection refused to Postgres | Postgres not running | `docker compose up -d postgres` or `brew services start postgresql` |
| "ECONNREFUSED :6379" | Redis not running | `docker compose up -d redis` or `brew services start redis` |

### Docker Issues

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Port 5432 already in use | Local Postgres running | Stop local Postgres: `brew services stop postgresql` |
| Port 3000 already in use | Another dev server running | Kill process: `lsof -ti:3000 \| xargs kill` |
| Container exits immediately | Missing env vars or config | `docker compose logs medusa` to see error |

### Environment Variable Issues

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| Storefront can't reach backend at build time | MEDUSA_BACKEND_URL wrong | Set `MEDUSA_BACKEND_URL=http://medusa:9000` in Docker, `http://localhost:9000` locally |
| Admin login returns 401 | JWT_SECRET mismatch between services | Ensure both storefront and backend use the same JWT_SECRET |
| Razorpay not showing in checkout | Razorpay env vars empty or publishable key missing | Set `NEXT_PUBLIC_RAZORPAY_KEY_ID` in storefront + both keys in backend |
| COD option missing in checkout | Shipping setup not complete | Run `npm run seed:shipping` in backend |
| Emails not sending | No SMTP credentials configured | Check `notification-audit/` logs — module runs in stub mode by design |

---

*Last updated: 2026-06-20 | Phase 4 — Build | Maintained by Harley (Program Director)*
