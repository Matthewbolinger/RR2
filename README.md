# Raccoon Restoration

Production website foundation for **Raccoon Restoration — Built Above Standard.**

The repository started empty. It now contains a dependency-free static site generator, centralized business, service, and resource data, 26 generated pages, responsive brand components, Greater Chicago SEO and structured-data foundations, an accessible lead form shell, analytics event hooks, and launch documentation.

## Quick start

Requirements:

- Node.js 20 or newer

Commands:

```bash
npm run build
npm run check
npm test
npm run dev
```

`npm run dev` serves the generated `dist/` directory at `http://127.0.0.1:4173`. Run `npm run build` after changing source files.

## Architecture

```text
src/
  data.mjs       Central business facts, navigation, services, FAQs, and claims
  resources.mjs  Original roofing guides and article metadata
  templates.mjs  Shared layout, navigation, schema, forms, and components
  pages.mjs      Route content and page composition
  styles.css     Design tokens and responsive visual system
  main.js        Navigation, forms, UTM persistence, and event hooks
scripts/
  build.mjs      Generates production pages and platform assets
  check.mjs      Checks metadata, headings, links, image dimensions, and claims
  serve.mjs      Local static preview server
public/assets/   Brand assets, editorial imagery, and responsive project media
docs/            Audit, content operations, launch, and QA documentation
dist/            Generated production build; not committed
```

The site uses no runtime framework or third-party JavaScript, and makes no third-party front-end requests: Bebas Neue and Montserrat are self-hosted WOFF2 files served same-origin with size-adjusted local fallbacks.

## Editing content

- Business contact details and license: `src/data.mjs` → `business`
- Navigation: `src/data.mjs` → `navigation`
- Services and service FAQs: `src/data.mjs` → `services`
- Roofing resources: `src/resources.mjs` → `resourceArticles`
- Homepage and page content: `src/pages.mjs`
- Shared components: `src/templates.mjs`
- Design tokens and layout: `src/styles.css`
- Analytics event behavior: `src/main.js`

Full instructions for adding projects, reviews, services, locations, team members, claims, and media are in [content operations](docs/content-operations.md).

## Forms and environment variables

Copy `.env.example` values into the deployment environment. This repository intentionally contains no production secrets.

- `FORM_ENDPOINT`: public HTTPS lead-intake route or serverless proxy that accepts multipart quote-form POSTs
- `GA_MEASUREMENT_ID`: optional Google Analytics configuration
- `GTM_CONTAINER_ID`: optional Google Tag Manager container
- `META_PIXEL_ID`: optional Meta Pixel configuration
- `SITE_URL`: production canonical origin

The full three-step form remains visible without `FORM_ENDPOINT`, but it does not pretend to deliver. A completed local submission states that the information was not sent and offers a phone handoff. With an endpoint configured, the browser waits for a successful server response before recording `form_submit_success` or opening the thank-you page.

`FORM_ENDPOINT` is public in the generated HTML and must point to a hardened intake layer—not directly to a private CRM webhook. The server-side layer must validate and sanitize fields, enforce spam and rate controls, deduplicate requests, store consent evidence, route the lead into the CRM, and return a successful HTTP response only after the lead is durably accepted. See [lead automation specification](docs/lead-automation-specification.md).

## Deployment

The generated `dist/` folder can be deployed to a static host that supports:

- `404.html`
- `_headers`
- `_redirects`

Run `npm test` immediately before deployment. The repository is not pushed or deployed by this task because the governing brief explicitly withheld remote push authorization and no hosting target was supplied.

## Current launch blockers

The build is complete and testable, with client-supplied responsive PNG logo lockups, a real-work Projects portfolio, a Greater Chicago service-area hub, and four original roofing guides implemented. Production launch is still blocked by supporting brand/people approvals, publication releases and verified metadata for the supplied project archive, verified warranty and financing details, certificate-of-insurance review, the exact Google Business Profile city/ZIP list, production form delivery, analytics IDs, and final legal approval. See [launch checklist](docs/launch-checklist.md), [Greater Chicago SEO plan](docs/greater-chicago-seo-plan.md), and [unverified business information](docs/unverified-business-information.md).
