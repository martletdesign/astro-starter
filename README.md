# Martlet — Astro reference site

A **cloneable, content-neutral Astro project** extracted from the working [jameshoward.us](https://jameshoward.us/) design. Martlet retains blue, gold and white, with its own warmer bronze-and-gold emphasis. The original site remains the structural and behavioral reference; the default color emphasis is intentionally warmer.

## Clone and run

```bash
git clone https://github.com/martletdesign/site.git
cd site
npm ci
npm run dev
```

Edit `src/pages/`, `src/components/`, and `public/`. Then run:

```bash
npm run build
npm run preview
```

The static application builds to `dist/`. Cloudflare can use the ordinary **Build command** `npm run build`, **Root directory** `/`, and **Build output** `dist`. `wrangler.json` is included for optional static Workers hosting. No custom build/deploy scripts are needed.

## Scope

This is a **source-derived working baseline** with placeholder pages, not yet a feature-complete language distribution. Source CSS and the historical Astro/theme package versions are intentionally retained for direct comparison. The work ahead is to extract complete reusable behavior and presentation into Martlet Core and Astro, then make this site a clean published-package consumer.

The app currently has three sample routes: `/`, `/article/` and `/document/`. Core must eventually support these and all the additional canonical examples, dashboards and workspaces without reference-only CSS.

The original source code is `k3jph/k3jph.github.io` at commit `d52c7193ea9090ed11fdc8b3f2fd454c0e77d50c`; see [EXTRACTION-MAP.md](EXTRACTION-MAP.md). Reference content is fictional; the approved Martlet sunset panorama replaces the original site photograph, with provenance in `public/assets/images/hero/provenance.json`.

**Status:** development on `develop`. No release tags, production deployments, or npm publications. A reusable npm site initializer is a separate publication step, not falsely claimed here.

## Identity and imagery

The masthead, navigation, footer and favicon use the design language's **gold martlet on a blue field** (`public/assets/mark.svg`), not James Howard's personal arms or `owner.svg`. The panoramic sunset artwork is copied from the approved Martlet Jekyll reference. The warm bronze/gold composition deliberately differs from jameshoward.us while retaining Martlet blue as a supporting color. No site generated from this template represents an affiliation with James Howard or any personal institution.
