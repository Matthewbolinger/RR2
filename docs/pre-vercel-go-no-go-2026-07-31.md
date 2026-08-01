# Pre-Vercel Go/No-Go Status

**Reviewed:** July 31, 2026

**Decision:** Local and account-preservation preparation is complete enough to protect the existing WordPress site. Do not create the Vercel project yet; the owner and integration gates below still require explicit decisions.

## Completed

- RR2 builds 26 pages and 23 indexable URLs from a dependency-free Node 20+ static build.
- `npm test` passes the build, metadata, schema, link, claim, form, and image-quality gates.
- `vercel.json` is generated from the same authoritative legacy-route and header configuration used by the static build.
- The adapter defines the `dist` output, trailing-slash policy, canonical apex-to-`www` redirect, exact 301 legacy redirects, security headers, and cache headers.
- Real local HTTP smoke tests return:
  - 200 for `/` and `/contact/`
  - 301 for `/contact-us-3/`, `/contact-us/`, and `/services/roofing/`
  - 404 for retired WordPress placeholder and utility routes
- One complete UpdraftPlus backup set exists off-host and all five components pass archive integrity checks.
- The native WordPress XML export and authenticated Name.com DNS CSV are preserved.
- The private dated migration package has a verified SHA-256 manifest.
- The authenticated Name.com zone is reconciled with the public DNS baseline.
- The prior website origin, TTL, mail records, verification records, and rollback procedure are documented.

## Required before a Vercel preview project

1. Name the Vercel team owner and billing owner.
2. Confirm that team can import `Matthewbolinger/RR2` from GitHub.
3. Confirm whether the preview should live in a personal or company-owned Vercel team.
4. Record the primary migration operator and rollback operator.
5. Confirm where deployment secrets and integration credentials will be stored.

No production domain should be attached during preview creation.

## Required before production cutover

### Lead delivery

- Choose the CRM or lead platform.
- Name the CRM technical owner, pipeline, lead owners, notification channels, and first-response SLA.
- Implement a hardened public `FORM_ENDPOINT`.
- Complete desktop/mobile test leads, deduplication, routing, consent, outage, and deletion tests.

### Tracking and privacy

- Validate IDPixel account ownership, consent behavior, retention, opt-out, and expected requests.
- Decide whether Meta Pixel `1583403939041768` and its CAPI path will be preserved, replaced, or retired.
- Confirm active Meta/Google campaigns, audiences, conversion owners, and call tracking.
- Approve privacy, consent, and suppression behavior.

### Email

- Confirm that every active mailbox is intentionally hosted in Google Workspace.
- Explain or remove the Titan SPF authorization only as a separate, approved mail project.
- Confirm DKIM and the desired DMARC policy.
- Assign a pre- and post-cutover send/receive test owner.

### Business, content, and legal

- Approve project-image releases and verified case-study facts.
- Approve warranty, financing, insurance/bonding, service-area, review, team, and business-hours claims.
- Approve privacy, terms, consent, and accessibility language.

## Useful but still open

- Ask Name.com whether managed WordPress provides SFTP or a support-generated full account/root-file backup.
- If available, privately capture `public_html`, `wp-config.php`, and `.htaccess`.
- Copy the verified migration package to a second independent encrypted location.
- Assign at least two people who know how to access the recovery package.

## Production no-go conditions

Do not change Name.com website records while any of these are true:

- The quote form cannot create a durable, traceable lead.
- Tracking continuity has no explicit decision.
- Email ownership or rollback access is unclear.
- The Vercel preview has not passed the complete acceptance runbook.
- The business owner has not approved the production deployment.
