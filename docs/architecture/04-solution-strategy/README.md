---
title: Solution strategy
arc42-section: "04"
description: Fundamental technology and decomposition choices.
---

# 4. Solution strategy

## Technology decisions

- Astro 5 static site generation with content collections; MDX and Mermaid for rich articles.
- `@juangcarmona/lighthouse-ui` as the design system, plus one site stylesheet ([ADR-0003](../09-architecture-decisions/ADR-0003-lighthouse-ui-design-system.md)).
- Canonical article URLs with static redirect pages ([ADR-0001](../09-architecture-decisions/ADR-0001-canonical-urls-with-static-redirects.md)).
- Cookieless analytics and comments on request ([ADR-0002](../09-architecture-decisions/ADR-0002-cookieless-site.md)).
- llms.txt and Markdown sources for agents ([ADR-0004](../09-architecture-decisions/ADR-0004-llms-txt.md)).

## Top-level decomposition

Content (`src/content`), data (`src/data` for talks and projects), presentation (`src/layouts`, `src/components`, `src/styles`) and routes (`src/pages`), with build helpers in `scripts/`.

## Quality realization

| Goal | How |
| --- | --- |
| Canonical URLs | Original-language route only; other addresses render redirect pages excluded from the sitemap. |
| Real translations only | `translationKey` frontmatter links pairs; hreflang is emitted only for them. |
| No cookies | GoatCounter, theme in localStorage, giscus behind a button. |
| Sourced facts | Talk and project data in `src/data` record their source next to each entry. |

<!-- pdac:cite id="BR-CANONICAL-URL" digest="sha256:1e706c4482baff2177a6d596b75aea28026fc446f28700aa089f971c04b3f561" -->
<!-- pdac:cite id="BR-REAL-TRANSLATIONS" digest="sha256:f62ac3182a492fc2bc069a5b746ca9a5c821b5a7108827577a9eb87ca830a8f3" -->
<!-- pdac:cite id="BR-NO-COOKIES" digest="sha256:b1dd085a18db5696945d1ea141ef46bd2306e93275c9e20f3911d7bcaecee974" -->
<!-- pdac:cite id="BR-SOURCED-FACTS" digest="sha256:b16de8d5734e34e4648f332290bf84a5c49a27b67110f08f85e112598fb629ad" -->
