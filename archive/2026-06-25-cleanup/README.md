# Archive — 2026-06-25 Workspace Cleanup

Files moved here during the workspace hygiene pass. **Nothing was deleted.** Every file
below was *moved* (reversible). No app, code, or live data files were touched — only
dead duplicates.

## What & why

### `root-knowledge-duplicates/` (15 files)
Root-level copies of `knowledge/NN-*.md` docs. Each was verified **byte-identical**
(`diff -q`) to its `knowledge/` counterpart at move time. `knowledge/` is the single
source of truth (per CLAUDE.md and the artifact map); nothing referenced the root copies
— the only links to these filenames live in `knowledge/INDEX.md` / `knowledge/README.md`
and point at the `knowledge/` versions.

### `root-screenshots/` (3 files)
Unreferenced admin QA screenshots from the root: `tpl-admin-order-final-verified.png`,
`tpl-admin-order-verified.png`, `tpl-admin-products.png`. Verified zero references in
`.md`/`.html`/`.tsx`/`.ts` before moving. (The still-referenced root PNGs —
`checkout-mobile-2026-06-11.png`, `home-mobile.png`, `pdp-mobile.png` — were left in place.)

### `copy-2-artifacts/` (6 files)
"` 2`" Drive-sync / local-export duplicates. The plain original of each remains in place:
- `catalogs/cleaned_catalog 2.csv`        → original: `catalogs/cleaned_catalog.csv`
- `generate_clean_catalog 2.py`           → original: `generate_clean_catalog.py`
- `process_catalog 2.py`                  → original: `process_catalog.py`
- `mission-control-eval/RUN-NOTES 2.md`   → original: `mission-control-eval/RUN-NOTES.md`
- `mission-control-eval/.env 2`           → original: `mission-control-eval/.env` (confirmed present, untouched)
- `TPL DUMP/wc-product-export-11-6-2026-1781128734010 2.csv` → original: same name without " 2"

## How to reverse
Move any file back to the path shown by its location inside this archive (paths are
preserved relative to the project root). Example:

```
mv "archive/2026-06-25-cleanup/root-knowledge-duplicates/00-MASTER-BRIEF.md" "00-MASTER-BRIEF.md"
```

## Not touched in this pass
Nested Git repos (`storefront`, `backend/medusa`, `mission-control-eval`), live `.env` /
log / DB files (gitignored), and the future `apps/`/`services/`/`brand/` restructure.
