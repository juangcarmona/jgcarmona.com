---
title: Cross-cutting concepts
arc42-section: "08"
description: Concepts that apply across building blocks.
---

# 8. Cross-cutting concepts

## Domain model

An article has a title, description, publication date, language (`en` or `es`), tags, an optional hero image and an optional `translationKey`. Its canonical URL is `/<lang>/<id>/`. Talks (appearances and sessions) and projects are typed data in `src/data`.

## Security and privacy

- No cookies; the privacy page (`src/pages/privacy.astro`) states it. <!-- pdac:cite id="BR-NO-COOKIES" digest="sha256:b1dd085a18db5696945d1ea141ef46bd2306e93275c9e20f3911d7bcaecee974" -->
- Global headers: `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. No Content Security Policy yet (see risks).
- Clients served through Plain Concepts are never named.

## Observability and operations

GoatCounter for aggregate page counts. Build failures stop the deploy. `lighthouse verify` checks repository guardrails in CI.
