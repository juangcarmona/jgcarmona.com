# jgcarmona.com

Personal site and blog of Juan G. Carmona: articles since 2012 in English and Spanish, talks, projects and books. Built with [Astro](https://astro.build), styled with [Lighthouse UI](https://lighthouse.jgcarmona.com/) and deployed to Azure Static Web Apps when `main` changes.

## Develop

Requires Node.js 22.

```sh
npm ci --ignore-scripts
npm run dev      # http://localhost:4321
npm run verify   # build the site and run lighthouse verify
```

`npm run brand` regenerates the favicon, touch icon and default social image from the portrait in `src/assets/portrait.jpg` (`scripts/brand.mjs`).

## Write

Add an article as `src/content/blog/<id>/index.md` with `title`, `description`, `pubDate` and `lang` (`en` or `es`). Its URL is `/<lang>/<id>/`. Give an article and its real translation the same `translationKey`. Talks and projects live in `src/data/`; record the source of every entry.

To publish on a date, push a branch named `publish/YYYY-MM-DD-<slug>`; the scheduled workflow merges it on that day.

## Documentation

- Product definition (ProductShape): [`docs/product`](docs/product/README.md)
- Architecture (arc42 with ArcShape): [`docs/architecture`](docs/architecture/README.md)
- Design system: [`docs/design/DESIGN.md`](docs/design/DESIGN.md)
- Engineering baseline: [`LIGHTHOUSE.md`](LIGHTHOUSE.md)

Content is licensed under CC BY 4.0; code under the [MIT license](LICENSE).
