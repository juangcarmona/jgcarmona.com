---
id: BR-CANONICAL-URL
type: business-rule
title: One canonical URL per article
status: active
applies-to:
  - UC-READ-ARTICLE
  - UC-PUBLISH-ARTICLE
uses-terms: []
---

## Rule

Every article has exactly one canonical URL, under the prefix of its original language; every other address of that article redirects permanently to it.

## Rationale

Duplicate URLs split ranking and confused readers with untranslated copies labelled as translations.

## Examples

/es/principios-solid/ is canonical; /principios-solid/ and /en/principios-solid/ redirect to it.

## Exceptions

None.
