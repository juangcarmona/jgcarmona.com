---
id: UC-READ-ARTICLE
type: use-case
title: Read an article
status: active
primary-actor: ACT-READER
supporting-actors: []
governed-by:
  - BR-CANONICAL-URL
  - BR-NO-COOKIES
uses-terms: []
---

## Goal

The reader reads one article at its canonical URL.

## Trigger

The reader opens an article link from search, a feed, social media or the site.

## Preconditions

The article is published.

## Main Flow

1. The reader opens the link.
2. The site serves the article in its original language with its date, topics and any real translation.
3. The reader reads it and may open comments on request.

## Alternative Flows

The link points to a WordPress-era URL or the other language prefix: the site redirects permanently to the canonical URL.

## Failure Conditions

The URL never existed: the site answers with its 404 page and links to the blog and search.

## Postconditions

No cookie has been set on the reader's device.
