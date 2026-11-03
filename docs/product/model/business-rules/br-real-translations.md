---
id: BR-REAL-TRANSLATIONS
type: business-rule
title: Only real translations are linked as translations
status: active
applies-to:
  - UC-READ-ARTICLE
  - UC-PUBLISH-ARTICLE
uses-terms: []
---

## Rule

Two articles are presented as translations of each other only when the author wrote both and declared them as a pair.

## Rationale

Machine-generated or missing translations must never be advertised to readers or search engines.

## Examples

The REST API, Radicle and TFST articles exist in English and Spanish and link to each other.

## Exceptions

None.
