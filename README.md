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
  legacy-routes.mjs  Legacy redirects and retired WordPress URL policy
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

- `FORM_ENDPOINT`: same-origin Vercel lead-intake route (`/api/quote/`)
- `ACCULYNX_API_KEY`, `ACCULYNX_CONTACT_TYPE_ID`, and `ACCULYNX_LEAD_SOURCE_ID`: server-only AccuLynx connection values
- `FORM_ALLOWED_ORIGINS`: exact browser origins allowed to submit
- `SLACK_LEADS_WEBHOOK_URL`: optional server-only post-acceptance notification
- `GA_MEASUREMENT_ID`, `GTM_CONTAINER_ID`, and `META_PIXEL_ID`: reserved decision fields; the current templates do not read them, so setting them does not activate tracking
- `SITE_URL`: production canonical origin

The client-supplied IDPixel loader is centralized in `src/templates.mjs` and included once on every generated page. Its provider-account destination, production behavior, consent requirements, retention, and opt-out handling must be verified before public launch.

The live WordPress site currently exposes Meta Pixel `1583403939041768` with a CAPI integration signal. The new build intentionally does not copy that implementation until the business approves a preserve, replace, or retire decision and the consent/deduplication architecture is defined.

The full three-step form remains visible without `FORM_ENDPOINT`, but it does not pretend to deliver. A completed local submission states that the information was not sent and offers a phone handoff. With an endpoint configured, the browser waits for a successful server response before recording `form_submit_success` or opening the thank-you page.

`FORM_ENDPOINT` is public in the generated HTML and must point to the hardened
same-origin intake layer—not directly to AccuLynx or a private webhook. The
implemented Vercel Function validates and sanitizes fields, applies origin and
spam controls, suppresses repeated submissions, stores consent and source
evidence, creates the AccuLynx contact/job path, and returns success only after
AccuLynx durably accepts the job. A production Vercel Firewall rate-limit rule
is still required. See [lead automation specification](docs/lead-automation-specification.md)
and [Vercel to AccuLynx integration](docs/acculynx-vercel-integration.md).

## Deployment

The generated `dist/` folder can be deployed to a static host. It currently emits:

- `404.html`
- `_headers`
- `_redirects`

Platform-specific deployment adapters must reproduce those behaviors rather than silently dropping them. Run `npm test` immediately before deployment. Source is tracked in [Matthewbolinger/RR2](https://github.com/Matthewbolinger/RR2); no production hosting target has been configured.

`npm run build` also regenerates the committed `vercel.json` from the authoritative legacy-route and header configuration. The quality check fails if that adapter drifts from source.

The recommended Vercel migration is intentionally still in preparation. No Vercel project, production deployment, DNS, WordPress, or email setting has been changed. Start with [hosting migration readiness](docs/hosting-migration-readiness.md), complete the [owner-input worksheet](docs/migration-owner-inputs.md), preserve the [DNS baseline](docs/dns-baseline-2026-07-31.md), execute the [WordPress backup and rollback runbook](docs/wordpress-backup-and-rollback-runbook.md), and then follow the [Vercel cutover runbook](docs/vercel-cutover-runbook.md).

## Current launch blockers

The build is complete and testable, with client-supplied responsive PNG logo lockups, a real-work Projects portfolio, a Greater Chicago service-area hub, and four original roofing guides implemented. Production launch is still blocked by supporting brand/people approvals, publication releases and verified metadata for the supplied project archive, verified warranty and financing details, certificate-of-insurance review, the exact Google Business Profile city/ZIP list, production form delivery, tracking-continuity and consent decisions, authenticated backup/DNS exports, and final legal approval. See [launch checklist](docs/launch-checklist.md), [Greater Chicago SEO plan](docs/greater-chicago-seo-plan.md), and [unverified business information](docs/unverified-business-information.md).
