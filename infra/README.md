# Infrastructure

The site runs on Azure Static Web Apps. There is no infrastructure as code yet; the resource was created by hand in the Azure portal.

- Deployment: [`.github/workflows/website-cd.yml`](../.github/workflows/website-cd.yml) builds the site and uploads `dist/` with `Azure/static-web-apps-deploy`. Pull requests get a preview environment, which closes with the pull request.
- Routing, redirects and security headers: [`public/staticwebapp.config.json`](../public/staticwebapp.config.json), copied into `dist/` at build time.
- Secret: `WEB_SITE_DEPLOYMENT_TOKEN`, the Static Web App deployment token, stored as a GitHub Actions secret.

See [the deployment view](../docs/architecture/07-deployment-view/) for the architecture.
