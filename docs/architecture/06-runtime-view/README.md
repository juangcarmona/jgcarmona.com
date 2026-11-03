---
title: Runtime view
arc42-section: "06"
description: Important runtime scenarios.
---

# 6. Runtime view

## Runtime scenarios

### Reading a WordPress-era link

```mermaid
sequenceDiagram
  participant B as Browser
  participant S as Static Web Apps
  B->>S: GET /principios-solid/
  S-->>B: Redirect page (meta refresh 0, canonical, noindex)
  B->>S: GET /es/principios-solid/
  S-->>B: Article HTML
```

### Opening comments

The article renders without any third-party request except GoatCounter. When the reader presses *Show comments*, the page injects the giscus client with the post title as the discussion term; giscus then loads its frame from giscus.app.

### Publishing on a date

`scheduled-publish.yml` runs daily, merges every `publish/YYYY-MM-DD-*` branch whose date has arrived into `main`, and triggers `website-cd.yml`, which builds and deploys.
