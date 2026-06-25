<!-- last-updated: 2026-06-11 -->
# Supabase Production Migration + Re-Seed Guide

| Field | Value |
|-------|-------|
| **Phase** | 4 — Build and Merchandising Implementation |
| **Producing Agent** | Tobi (Developer) |
| **Date** | 2026-06-11 |
| **Status** | active |
| **Reviewer** | Harley |

**Prerequisite:** `backend/medusa/src/scripts/import-catalog.json` exists (produced by `prep-woo-catalog.py`).

---

## Step-by-Step

### 1. Set Environment Variables

```bash
export DATABASE_URL="postgresql://postgres:[PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres"
export REDIS_URL="rediss://default:[PASSWORD]@[HOST]:6379"
```

### 2. Run the Script

```bash
cd /path/to/the-product-lab-relaunch
./scripts/migrate-and-seed.sh
```

**What it does:**
1. Runs `npm ci` in `backend/medusa/`
2. Runs `npx medusa db:migrate` against Supabase
3. Runs `seed-tpl.ts` (region, sales channel, shipping profiles, API key)
4. Runs `import-woo.ts` (502 products, categories, images)
5. Reports counts and health status

### 3. Manual Verification Commands

```bash
# Connect to Supabase
cd backend/medusa
npx medusa db:show  # or use psql directly

# Check product count
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM product;"

# Check category count
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM product_category;"

# Check images
psql "$DATABASE_URL" -c "SELECT COUNT(*) FROM product_image;"

# Verify a sample product
psql "$DATABASE_URL" -c "SELECT title, handle, status FROM product LIMIT 5;"
```

### 4. Update Storefront Environment

After `seed-tpl.ts` runs, it prints a **publishable API key**. Add to `storefront/.env.local`:

```bash
NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY=[token-from-seed-output]
NEXT_PUBLIC_MEDUSA_REGION_ID=[region-id-from-seed-output]
```

### 5. Restart & Test

```bash
# Start Medusa (production or local with prod DB)
cd backend/medusa
npm run start

# In another terminal, test API
curl "http://localhost:9000/store/products?limit=5" \
  -H "x-publishable-api-key: YOUR_KEY"

# Start storefront
cd storefront
npm run dev
```

### 6. Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `connection refused` to Supabase | IP not whitelisted | Add your IP in Supabase Dashboard → Database → IPv4 |
| `relation "product" does not exist` | Migrations didn't run | Check `npx medusa db:migrate` output for errors |
| `No 'Default Sales Channel' found` | `seed-tpl.ts` not run | Run seed script before import |
| 502 products imported but no images | `import-catalog.json` missing image URLs | Re-run `prep-woo-catalog.py` with image data |
| Duplicate products on re-run | `KEEP_EXISTING=1` set | Use `KEEP_EXISTING=0` to wipe first |

---

## Partial Import (Testing)

Import only one category:

```bash
IMPORT_CATEGORY="Fridge Magnets" ./scripts/migrate-and-seed.sh
```

Import only first 20 products:

```bash
IMPORT_LIMIT=20 ./scripts/migrate-and-seed.sh
```

Append to existing catalog (don't wipe):

```bash
KEEP_EXISTING=1 ./scripts/migrate-and-seed.sh
```

---

## Post-Migration Checklist

- [ ] Supabase Table Editor shows `medusa_*` tables
- [ ] `product` table has 502 rows
- [ ] `product_category` has 9 rows
- [ ] API returns products via curl
- [ ] Storefront homepage renders products
- [ ] Product images display (or show fallback)
- [ ] Add to Cart works (no connection refused)

---

**Linked:** `deploy-checklist.md` | `backend/medusa/src/scripts/import-woo.ts` | `qa-checklist.md`
