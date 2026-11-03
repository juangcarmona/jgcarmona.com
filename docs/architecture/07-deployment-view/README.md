---
title: Deployment view
arc42-section: "07"
description: Infrastructure and deployment mapping.
---

# 7. Deployment view

## Infrastructure overview

```mermaid
flowchart LR
  dev[Author] -->|pull request| gh[GitHub]
  gh -->|website-cd.yml| ci[GitHub Actions build]
  ci -->|dist/| prev[SWA preview environment]
  gh -->|merge to main| ci2[GitHub Actions build]
  ci2 -->|dist/| prod[Azure Static Web Apps: jgcarmona.com]
  gh -->|lighthouse.yml| guard[Lighthouse verify]
```

## Deployment mapping

| Artifact | Target |
| --- | --- |
| `dist/` from `npm run build` | Azure Static Web Apps, free tier |
| `public/staticwebapp.config.json` | SWA routing, 404 page, trailing slash and global headers |
| Pull request builds | SWA staging environment, closed with the pull request |
