---
id: UC-PUBLISH-ARTICLE
type: use-case
title: Publish an article
status: active
primary-actor: ACT-AUTHOR
supporting-actors: []
governed-by:
  - BR-CANONICAL-URL
  - BR-REAL-TRANSLATIONS
uses-terms: []
---

## Goal

A new article becomes available to readers and crawlers.

## Trigger

The author merges an article to main, directly or through a dated publish branch.

## Preconditions

The article has a title, description, publication date and language.

## Main Flow

1. The author writes the article in Markdown.
2. The change is reviewed in a pull request with a preview deployment.
3. The merge to main deploys the site.

## Alternative Flows

A dated publish branch is merged automatically on its date by the scheduled publish workflow.

## Failure Conditions

The build fails: nothing is deployed and the author fixes the content.

## Postconditions

The article appears in the blog, the RSS feed, the sitemap and llms.txt.
