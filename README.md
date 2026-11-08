# Martlet — Astro reference site

A **cloneable, content-neutral Astro project** extracted from the working [jameshoward.us](https://jameshoward.us/) design. Martlet retains blue, gold and white, with its own warmer bronze-and-gold emphasis. The original site remains the visual and behavioral reference.

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

The original source code is `k3jph/k3jph.github.io` at commit `d52c7193ea9090ed11fdc8b3f2fd454c0e77d50c`; see [EXTRACTION-MAP.md](EXTRACTION-MAP.md). Reference content is fictional; the retained original photo is used solely to study the source hero treatment.

**Status:** development on `develop`. No release tags, production deployments, or npm publications. A reusable npm site initializer is a separate publication step, not falsely claimed here.
