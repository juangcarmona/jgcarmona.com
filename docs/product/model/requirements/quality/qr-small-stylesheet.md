---
id: QR-SMALL-STYLESHEET
type: quality-requirement
title: Own CSS stays small
status: active
quality-attribute: maintainability
applies-to:
  - UC-PUBLISH-ARTICLE
verification:
  - scenario: The site stylesheet plus any component style blocks total fewer than 400 lines
uses-terms: []
---

## Requirement

The site MUST build its look on @juangcarmona/lighthouse-ui and keep its own CSS under 400 lines, using only --lh- roles for colour.

## Measurement

Count lines in src/styles/site.css and every <style> block under src/: total below 400.
