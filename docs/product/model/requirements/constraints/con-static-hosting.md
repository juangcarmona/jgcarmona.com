---
id: CON-STATIC-HOSTING
type: constraint
title: Static hosting on Azure Static Web Apps
status: active
uses-terms: []
---

## Constraint

The site is a static build deployed to Azure Static Web Apps on merge to main, with a configuration file of at most 20 KB.

## Rationale

Zero hosting cost and no server to operate.

## Consequences

Per-article redirects are static pages rather than server rules; there is no server-side code.
