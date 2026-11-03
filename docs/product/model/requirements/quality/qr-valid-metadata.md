---
id: QR-VALID-METADATA
type: quality-requirement
title: Metadata is valid on every page
status: active
quality-attribute: discoverability
applies-to:
  - UC-READ-ARTICLE
verification:
  - scenario: Every JSON-LD block in the build output parses as JSON and every page has an absolute canonical URL and social image
uses-terms: []
---

## Requirement

Every page MUST publish a parseable schema.org graph, an absolute canonical URL and an absolute social image.

## Measurement

Parse every application/ld+json block in dist/: zero failures. Check that every canonical and og:image starts with https://.
