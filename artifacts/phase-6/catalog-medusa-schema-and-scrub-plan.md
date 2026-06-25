# Catalog to Medusa Schema and Scrub Plan

Last updated: 2026-06-11

## Current State

Medusa has a TPL seed path at `backend/medusa/src/scripts/seed-tpl.ts` using `backend/medusa/src/scripts/seed-data.ts`.

- Seed data exists for 100 products.
- The current seed shape is lean: title, handle, category, description, image, price.
- The seed creates India region, INR store currency, India tax region, one stock location, manual fulfillment, shipping options, publishable API key, categories, products, one default variant per product, and inventory of 100 units per inventory item.
- The local `backend/medusa/db.sqlite` is empty, while `.env` points to Postgres `tpl_spike`; this repo proves the seed script exists, not that the active local Postgres DB is populated.
- The `package.json` `seed` script still runs Medusa demo seed data, not the TPL seed. TPL seed is run with `npx medusa exec ./src/scripts/seed-tpl.ts`.

## Audit Snapshot

From `seed-data.ts`:

| Check | Result |
| --- | --- |
| Product count | 100 |
| Categories | Card Stickers 11, Fridge Magnets 25, Earrings 12, Keychains 21, Pop-up 3D Stickers 7, Stickers 14, Lapel Pins 9, Uncategorized 1 |
| Price range | INR 99 to INR 2499 |
| Duplicate handles | 0 |
| Duplicate titles | 1 duplicate title: `Nike Air Red offwhite lapel pin` |
| Obvious IP/licensing flags | 39 title-level flags from terms like Nike, Adobe, Pokemon, Star Wars, Superman, Marvel-adjacent, football clubs, Rick and Morty, Simpsons, etc. |

## Canonical Import Schema

This should become the cleaned source of truth before generating Medusa seed/import payloads.

| Field | Required | Type | Notes |
| --- | --- | --- | --- |
| `source_id` | Yes | string | Stable source record ID from WooCommerce/Airtable/sheet. Do not use title as ID. |
| `sku` | Yes | string | Stable SKU. Current generated SKUs are acceptable for spike only, not production. |
| `parent_sku` | No | string | Use for variants or bundles. Empty for simple products. |
| `title` | Yes | string | Customer-facing title, title-cased consistently. |
| `handle` | Yes | string | Unique slug. Preserve old WooCommerce handle where useful for redirects/SEO. |
| `status` | Yes | enum | `draft`, `published`, `archived`. Default questionable rows to `draft`. |
| `category` | Yes | enum | Controlled taxonomy: `lapel-pin`, `keychain`, `card-sticker`, `fridge-magnet`, `earring`, `sticker`, `luggage-tag`, `pop-sticker`, `bundle`. |
| `collection` | No | string[] | Campaign/merchandising collections, separate from category. |
| `tags` | No | string[] | Themes like `sassy`, `food`, `design`, `travel`, `gift`, `pop-culture`. |
| `description` | Yes | string | Clean PDP copy. Remove scraped boilerplate and broken truncation. |
| `short_description` | No | string | Optional listing/card copy. |
| `price_inr` | Yes | integer | Rupee amount before paise conversion. |
| `compare_at_price_inr` | No | integer | Only where a real promo anchor exists. |
| `cost_inr` | No | number | Needed for margin reporting; can be private metadata. |
| `weight_g` | No | integer | Current seed hardcodes 50g. Replace by product family defaults. |
| `dimensions_mm` | No | object | Useful later for shipping/packaging. |
| `image_urls` | Yes | string[] | At least one production-ready image. |
| `alt_text` | No | string | Required before final launch for accessibility/SEO quality. |
| `inventory_qty` | Yes | integer | Current seed hardcodes 100. Replace with real or launch allocation. |
| `is_track_inventory` | Yes | boolean | Usually true for finished goods. |
| `material` | No | string | Acrylic, enamel, metal, etc. |
| `size_label` | No | string | Example: `1 inch`, `3 inch`, `full card`, `half card`. |
| `variant_options` | No | object | Example: `{ "Size": "Full Card" }`; default one-size for simple products. |
| `ip_risk` | Yes | enum | `none`, `review`, `blocked`. Launch only `none` unless approved. |
| `license_notes` | No | string | Notes/evidence for branded/pop-culture references. |
| `seo_title` | No | string | Keep separate from title if needed. |
| `seo_description` | No | string | Clean meta description. |
| `redirect_from` | No | string[] | Old WooCommerce URLs/slugs. |

## Medusa Mapping

| Canonical field | Medusa field |
| --- | --- |
| `title` | product `title` |
| `handle` | product `handle` |
| `description` | product `description` |
| `status` | product `status` |
| `category` | product category ID lookup |
| `collection` | product collection link, once collections are created |
| `image_urls` | product `images` |
| `weight_g` | product `weight` |
| `sku` | variant `sku` |
| `variant_options` | product `options` and variant `options` |
| `price_inr` | variant `prices[].amount = price_inr * 100` |
| `inventory_qty` | inventory level `stocked_quantity` |
| `ip_risk`, `source_id`, `cost_inr`, `tags`, `material`, `size_label`, `redirect_from` | product or variant `metadata` unless first-class support is added |

## Scrub Rules

1. Normalize categories into the controlled taxonomy; no `Uncategorized` rows can publish.
2. Deduplicate titles and confirm duplicates are real variants, separate products, or data errors.
3. Make SKU stable and human-readable by family, not generated from title at seed time.
4. Flag IP-sensitive products and set them to `draft` or exclude until approved.
5. Replace boilerplate descriptions copied from WooCommerce snippets with proper PDP copy.
6. Validate every image URL resolves and matches the product title/category.
7. Resolve price conflicts between sources; current source files disagree on some family prices.
8. Add variant modeling for card stickers, bundles, and any size/material options before production.
9. Replace hardcoded stock quantity with real stock or launch allocation.
10. Make import idempotent: update by `source_id`, `handle`, or `sku` instead of blindly creating new records.

## Recommended Pipeline

1. Export all source data from WooCommerce, Airtable, sheets, and current catalog files into one raw folder.
2. Transform raw sources into `catalog.clean.json` or `catalog.clean.csv` using the canonical schema above.
3. Run validation: required fields, unique handles/SKUs, category enum, price sanity, image checks, IP flags.
4. Generate Medusa payloads from the clean catalog.
5. Dry-run report: created, updated, skipped, blocked, warnings.
6. Seed/import into Medusa only from the clean catalog.

## Immediate Changes Needed

- Point `npm run seed` or add `seed:tpl` for `medusa exec ./src/scripts/seed-tpl.ts`.
- Rename log text from `TPL spike data` to `TPL catalog data`.
- Move `makeSku` out of runtime generation and use explicit SKU from clean catalog.
- Add idempotency before rerunning against shared/staging databases.
- Add launch filters so `ip_risk: blocked` and incomplete products stay draft.
