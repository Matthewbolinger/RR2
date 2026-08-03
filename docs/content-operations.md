# Content Operations

Run `npm test` after every content change.

For a substantive public content change, update the affected page's
`lastModified` value. Resource pages inherit `dateModified` from
`src/resources.mjs`; other routes use `defaultLastModified` in
`src/search-config.mjs`. Do not bump dates for cosmetic-only changes.

## Change business information

Edit the `business` object in `src/data.mjs`. Phone changes require both the display value and E.164 `phoneHref`. Rebuild and verify header, footer, contact, thank-you, schema, and phone links.

## Change the service area

1. Keep the public regional promise aligned with actual Greater Chicago operations.
2. Maintain the exact city/ZIP list in Google Business Profile and operational systems; do not paste it into every site page.
3. Update `business` and the service-area copy in `src/pages.mjs` when the regional promise changes.
4. Add a city page only when unique local proof, accurate availability, useful local guidance, and a clear internal-link role exist.
5. Add the page to the `pages` export so it enters the sitemap.
6. Rebuild and validate metadata, schema, links, and copy differentiation.

## Add or change a service

Add one object to `services` in `src/data.mjs` with a unique slug, summary, image, signs, inclusions, and FAQs. The service grid, menu, related links, form option, service detail, schema, and content manifest are generated from this data.

## Add a project

Do not duplicate the editorial image system and call it proof. Create an approved project record containing:

- slug and title
- municipality (not a private street address)
- homeowner concern
- inspection findings
- options considered
- approved scope
- materials
- challenges
- completed work
- final result
- photography and release status
- optional verified review source

Use the six-part project standard on `/projects/`. Add a project-detail renderer to `src/pages.mjs`, link it from the project index, and add Project/Breadcrumb structured data.

## Add a review

Record exact approved excerpt, public display name, platform, date, direct source URL, and permission/source status. Never add stars or totals unless the dated claim is approved in `docs/claims-registry.md`.

## Add a team member

Create a centralized team collection before adding cards. Required fields: approved public name, role, short bio, image, alt text, and approval date. Do not infer licenses or credentials from job titles.

## Add a location

Create a distinct page with the city’s real service availability, local project proof, approved local review, unique FAQs, and links to relevant services. Do not mass-generate near-duplicate pages.

## Add a roofing resource

1. Confirm the topic answers a recurring customer question or a Search Console query.
2. Add one record to `resourceArticles` in `src/resources.mjs`.
3. Prefer maintained official guidance pages over dated press releases, archived alerts, or old PDFs.
4. Use original explanations and link to primary government, manufacturer, or research sources where a factual source adds value.
5. Record `sourceReviewed` and verify every public reference at least every six months, and sooner after material legal, regulatory, or program changes.
6. Keep diagnosis, engineering, legal, and insurance-coverage boundaries explicit.
7. Connect the guide to one or two relevant services and at least one other guide.
8. Add the slug label to structured-data breadcrumbs in `src/templates.mjs`.
9. Add desktop screenshot coverage and mobile coverage for any new layout pattern.
10. Run `npm test` and inspect the rendered article.
11. After the production deployment is live, confirm the IndexNow workflow
    succeeded and request indexing in Search Console for major new pages.

Do not publish on a calendar merely to increase volume. Update or expand the strongest existing guide when that better serves the query.

## Update FAQs

Global FAQs live in `src/data.mjs` → `faqs`. Service FAQs live on each service object. Keep answers property-specific, avoid guarantees, and preserve insurance/legal boundaries.

## Update metadata

Each page in `src/pages.mjs` supplies a unique title, description, and canonical path to `layout()`. Keep titles useful and descriptions factual.

## Replace a hero or service image

1. Save an optimized final image in `public/assets/images/`.
2. Keep an aspect ratio suitable for desktop and mobile crops.
3. Update the centralized image path and descriptive alt text.
4. Preserve explicit width and height values.
5. Add a smaller responsive source pipeline when real production photography arrives.
6. Remove editorial disclosure only when the image is approved real company proof.

## Replace logo, mascot, or pattern assets

Use approved source files. Prefer SVG for logos/patterns and optimized WebP/PNG for mascot imagery. Update the wordmark component in `src/templates.mjs`. Do not redraw the RR monogram or add a crown without approval.

## Update CTAs

Shared buttons are rendered by `button()` in `src/templates.mjs`. Preserve one dominant inspection CTA, phone access, analytics event name, and position property.

## Verify or disable a claim

1. Update `docs/claims-registry.md`.
2. Record source, owner, review date, and exact approved wording.
3. Add the claim to centralized data.
4. Publish it through a shared component.
5. To disable, remove it from data and rebuild; do not hide it only with CSS.

## Add analytics IDs

Do not hardcode IDs into source. Configure environment variables in the hosting platform, add one consent-aware loader, and map existing `dataLayer` events. Test in preview and production.

## Test form delivery

1. Configure `FORM_ENDPOINT` in the deployment environment.
2. Confirm it is a public intake route or serverless proxy; never expose a private CRM webhook in generated HTML.
3. Verify server-side validation, sanitization, rate limiting, spam protection, deduplication, consent evidence, and safe errors.
4. Submit desktop and mobile test leads through every service and urgency route.
5. Confirm CRM arrival, field mapping, pipeline stage, assigned owner, task creation, and acknowledgement timing.
6. Confirm the thank-you redirect and `form_submit_success` occur only after durable receipt.
7. Test timeouts, CRM outages, duplicate requests, and recovery.
8. Delete test customer data when no longer needed.
