# Vercel Preview, Cutover, and Acceptance Runbook

**Status:** Prepared, not executed

**Prerequisite:** Every owner/account gate in `hosting-migration-readiness.md` is complete

## Phase 1 — Preview only

1. Import `Matthewbolinger/RR2` into the approved Vercel team.
2. Use Node.js 20 or newer.
3. Set the build command to `npm run build`.
4. Set the output directory to `dist`.
5. Do not attach the production domain.
6. Add only approved environment variables.
7. Deploy a preview from an immutable commit.
8. Record the deployment URL, commit SHA, build log, and operator.

## Phase 2 — Platform adapter

`vercel.json` is now generated and locally reviewed. It reproduces:

- The routes in `src/legacy-routes.mjs`
- Security headers currently emitted in `dist/_headers`
- Cache behavior for versioned assets and HTML
- The custom `404.html`
- Canonical `www` behavior

The source route list remains authoritative. Do not maintain an unrelated manual redirect list.

The build check compares the committed adapter with the source-generated configuration and fails on drift. The adapter still requires validation on an actual Vercel preview before this phase is accepted for production.

## Phase 3 — Preview acceptance

### Build and content

- [ ] `npm test` passes from a clean checkout
- [ ] All indexable routes return 200
- [ ] The custom 404 returns 404
- [ ] Every approved legacy redirect returns one 301 hop
- [ ] Retired placeholder routes return 404
- [ ] Canonical, robots, and sitemap URLs use the production `www` origin
- [ ] No preview URL appears in canonical tags or structured data

### Conversion

- [ ] Quote form creates a traceable test lead
- [ ] Required fields, validation, and consent evidence are present
- [ ] UTM/source values reach the CRM
- [ ] Duplicate-submission behavior is acceptable
- [ ] Owner assignment and alerts work
- [ ] Phone and email actions work on desktop and mobile
- [ ] Thank-you behavior occurs only after durable lead acceptance

### Tracking and privacy

- [ ] IDPixel loads once, only under the approved consent behavior
- [ ] Meta Pixel/CAPI has an explicit preserve/replace/retire decision
- [ ] Browser and server events are not duplicated
- [ ] Quote-field values are not sent to analytics
- [ ] Privacy disclosure and opt-out behavior are approved
- [ ] Google Ads, call tracking, and other integrations are tested if enabled

### Experience and technical quality

- [ ] Chrome, Safari, Firefox, and Edge pass
- [ ] 390, 768, and 1440 pixel layouts pass
- [ ] Keyboard, focus, reduced motion, VoiceOver, and NVDA checks pass
- [ ] Production-mode Lighthouse is recorded
- [ ] Images, fonts, icons, logos, and project galleries load without 404s
- [ ] No mixed content, console errors, or failed first-party requests

## Phase 4 — Domain cutover

1. Take the final WordPress/database backup.
2. Confirm no unresolved preview defects.
3. Add the domain in Vercel and record the exact DNS values Vercel supplies.
4. In Name.com, change only the necessary apex/`www` website records.
5. Leave NS, MX, TXT, SPF, DKIM, DMARC, and mail records untouched.
6. Confirm TLS and canonical redirect behavior.
7. Run the critical-route and conversion smoke tests.
8. Send and receive a business email test.
9. Record DNS before/after values and timestamps.

## Phase 5 — First-hour checks

- [ ] Apex redirects to the canonical `www` HTTPS URL
- [ ] Home, services, projects, reviews, resources, and contact return 200
- [ ] All legacy redirect rules behave as approved
- [ ] Retired WordPress placeholders return 404
- [ ] Test lead is visible in the CRM
- [ ] Analytics requests and events are correct
- [ ] Business email sends and receives
- [ ] No elevated 404 or server error pattern is visible

## Phase 6 — Search handoff

- [ ] Submit the new sitemap in Search Console
- [ ] Inspect home, contact, service-area, and primary service URLs
- [ ] Preserve the existing DNS verification record
- [ ] Update Google Business Profile website link with approved UTM values
- [ ] Remove old WordPress sitemap submissions after the new sitemap is accepted
- [ ] Request removal/deindexing for retired placeholder URLs where appropriate
- [ ] Monitor indexation, redirects, rankings, and crawl errors for at least 30 days

## Rollback

If a rollback trigger occurs, follow `wordpress-backup-and-rollback-runbook.md`. Restore only the previous website A records, preserve mail records, and keep a written incident log.

## Provider references

- [Vercel: Configure a build](https://vercel.com/docs/builds/configure-a-build)
- [Vercel: Git deployments](https://vercel.com/docs/git)
- [Vercel: Set up a custom domain](https://vercel.com/docs/domains/set-up-custom-domain)
