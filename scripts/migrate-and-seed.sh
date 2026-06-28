#!/bin/bash
###############################################################################
# Supabase Production Migration + Re-Seed Script
# The Product Lab — Medusa Backend
#
# Usage:
#   1. Set DATABASE_URL to your Supabase production connection string
#   2. Ensure import-catalog.json exists in backend/medusa/src/scripts/
#   3. Run: ./migrate-and-seed.sh
###############################################################################

set -euo pipefail

MEDUSA_DIR="backend/medusa"
SCRIPT_DIR="$MEDUSA_DIR/src/scripts"

# ---------------------------------------------------------------------------
# Configuration (override with env vars)
# ---------------------------------------------------------------------------
DATABASE_URL="${DATABASE_URL:-}"
REDIS_URL="${REDIS_URL:-}"
IMPORT_LIMIT="${IMPORT_LIMIT:-0}"          # 0 = all products
IMPORT_CATEGORY="${IMPORT_CATEGORY:-}"     # optional: "Fridge Magnets"
KEEP_EXISTING="${KEEP_EXISTING:-0}"        # 1 = append, 0 = wipe + re-import

# ---------------------------------------------------------------------------
# Validation
# ---------------------------------------------------------------------------
if [ -z "$DATABASE_URL" ]; then
  echo "ERROR: DATABASE_URL is not set."
  echo "Example: postgresql://postgres:password@db.ref.supabase.co:5432/postgres"
  exit 1
fi

echo "============================================"
echo "  TPL Medusa — Production Migration + Seed"
echo "============================================"
echo ""
echo "Database:  ${DATABASE_URL//:*@/:***@}"
echo "Redis:     ${REDIS_URL:-(local default)}"
echo "Catalog:   ${IMPORT_LIMIT:-all} products${IMPORT_CATEGORY:+ (category=$IMPORT_CATEGORY)}"
echo "Strategy:  ${KEEP_EXISTING == "1" ? "append" : "wipe + re-import"}"
echo ""
read -rp "Press Enter to continue or Ctrl-C to abort..."

# ---------------------------------------------------------------------------
# Step 1: Install dependencies
# ---------------------------------------------------------------------------
echo ""
echo "[1/6] Installing dependencies..."
cd "$MEDUSA_DIR"
npm ci

# ---------------------------------------------------------------------------
# Step 2: Run database migrations
# ---------------------------------------------------------------------------
echo ""
echo "[2/6] Running Medusa migrations..."
npx medusa db:migrate

# ---------------------------------------------------------------------------
# Step 3: Seed infrastructure (region, sales channel, shipping, API key)
# ---------------------------------------------------------------------------
echo ""
echo "[3/6] Seeding store infrastructure (seed-tpl.ts)..."
npx medusa exec ./src/scripts/seed-tpl.ts

echo ""
echo "       IMPORTANT: Save the publishable API key printed above."
echo "       Set it as NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY in storefront."

# ---------------------------------------------------------------------------
# Step 4: Import 502-product catalog
# ---------------------------------------------------------------------------
if [ ! -f "$SCRIPT_DIR/import-catalog.json" ]; then
  echo ""
  echo "ERROR: import-catalog.json not found at $SCRIPT_DIR/import-catalog.json"
  echo "Run: python $SCRIPT_DIR/prep-woo-catalog.py first."
  exit 1
fi

echo ""
echo "[4/6] Importing product catalog (import-woo.ts)..."
IMPORT_LIMIT="$IMPORT_LIMIT" \
IMPORT_CATEGORY="$IMPORT_CATEGORY" \
KEEP_EXISTING="$KEEP_EXISTING" \
npx medusa exec ./src/scripts/import-woo.ts

# ---------------------------------------------------------------------------
# Step 5: Verify
# ---------------------------------------------------------------------------
echo ""
echo "[5/6] Verifying catalog import..."
PRODUCT_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM product;" 2>/dev/null || echo "?")
CATEGORY_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM product_category;" 2>/dev/null || echo "?")
IMAGE_COUNT=$(psql "$DATABASE_URL" -t -c "SELECT COUNT(*) FROM product_image;" 2>/dev/null || echo "?")

echo "  Products:  $PRODUCT_COUNT"
echo "  Categories: $CATEGORY_COUNT"
echo "  Images:  $IMAGE_COUNT"

# ---------------------------------------------------------------------------
# Step 6: Health check
# ---------------------------------------------------------------------------
echo ""
echo "[6/6] Running health checks..."

# Check if Medusa API is responding locally
if curl -s http://localhost:9000/health > /dev/null 2>&1; then
  echo "  ✓ Medusa API responding on localhost:9000"
else
  echo "  ⚠ Medusa API not detected on localhost:9000 (expected if not running)"
fi

echo ""
echo "============================================"
echo "  Migration + Seed Complete"
echo "============================================"
echo ""
echo "Next steps:"
echo "  1. Copy the publishable API key to storefront .env"
echo "  2. Set REDIS_URL and restart Medusa API"
echo "  3. Verify storefront can fetch products"
echo "  4. Run: npm run dev (in storefront) and test add-to-cart"
