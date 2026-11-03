---
id: BR-NO-COOKIES
type: business-rule
title: The site sets no cookies
status: active
applies-to:
  - UC-READ-ARTICLE
  - JRN-READ
uses-terms: []
---

## Rule

Reading the site never sets a cookie. Third-party content that may set cookies loads only after an explicit action of the reader.

## Rationale

Readers should not need to consent to anything to read, and the privacy page can state the fact plainly.

## Examples

Analytics use GoatCounter without cookies; comments load only after Show comments; the appearance choice is kept in localStorage.

## Exceptions

None.
