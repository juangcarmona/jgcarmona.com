---
id: QR-READABLE-ANYWHERE
type: quality-requirement
title: Readable on narrow screens in both appearances
status: active
quality-attribute: accessibility
applies-to:
  - UC-READ-ARTICLE
  - UC-REVIEW-SPEAKER
verification:
  - scenario: At 390 px wide, light and dark, pages show no horizontal page scroll and text meets WCAG 2.2 AA contrast
uses-terms: []
---

## Requirement

Pages MUST be usable at 390 px wide in light and dark appearance, keyboard reachable, with visible focus and WCAG 2.2 AA text contrast.

## Measurement

Browser check at 390 px: document scroll width equals the viewport. Contrast comes from the Lighthouse UI tokens.
