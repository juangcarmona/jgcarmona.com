---
title: Architecture constraints
arc42-section: "02"
description: Technical, organizational, and convention constraints.
---

# 2. Architecture constraints

## Technical constraints

- Static output only, hosted on Azure Static Web Apps; `staticwebapp.config.json` is limited to 20 KB, so per-article redirects cannot be server rules. <!-- pdac:cite id="CON-STATIC-HOSTING" digest="sha256:8943622b02cda4f3021964bc30ef0c272dfd84574f690c4897a69aa32dbb6e81" -->
- Node.js 22 and Astro 5 build the site; Sharp processes images at build time.

## Organizational constraints

- The repository follows the Lighthouse baseline with the `visual-theme` profile; ProductShape owns product intent and ArcShape owns this documentation. <!-- pdac:cite id="CON-LIGHTHOUSE-BASELINE" digest="sha256:3a665663609ca4a349a16e183b5f69350dc237f2273ec21f2078c7c2a563a372" -->
- Merging to `main` deploys to production; pull requests get a preview environment.

## Conventions

- Conventional Commits and the Lighthouse branch pattern, checked by `scripts/lighthouse-guard.mjs`.
- Colours, spacing and radii come from `--lh-` tokens of `@juangcarmona/lighthouse-ui`; see [`docs/design/DESIGN.md`](../../design/DESIGN.md).
- Articles are Markdown or MDX under `src/content/blog/<id>/index.md`, validated by the schema in `src/content.config.ts`.
