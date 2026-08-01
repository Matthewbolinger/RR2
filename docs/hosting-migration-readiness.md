# Hosting Migration Readiness

**Prepared:** July 31, 2026

**Production domain:** `https://www.raccoonrestoration.com`

**Recommended target:** Vercel, after every preflight gate below is complete

**Current state:** Preparation only. No Vercel project, production deployment, DNS, WordPress, or email setting has been changed.

## Decision

The site is a dependency-free static Node build that produces a deployable `dist/` directory. Vercel is the preferred production target because it can build directly from RR2, preserve immutable deployments, provide preview URLs, manage TLS, and support a later serverless lead-intake layer without converting the website back into WordPress.

cPanel remains a viable static-hosting fallback, but it would require manually uploading `dist/`, translating redirects and headers into Apache configuration, and maintaining a separate release and rollback process. The site does not require PHP, MySQL, or WordPress to run.

The first Vercel action is intentionally deferred until the preflight gates are satisfied.

## Completed preparation

- [x] Confirmed the source repository is `Matthewbolinger/RR2`
- [x] Isolated migration preparation on `codex/vercel-readiness-prep`
- [x] Confirmed the production build uses Node.js 20+ and outputs `dist/`
- [x] Confirmed the full local production test passes
- [x] Recorded the canonical production origin as `https://www.raccoonrestoration.com`
- [x] Recorded the current public DNS baseline, including mail records
- [x] Confirmed the apex and `www` hostnames currently resolve to `169.60.159.40`
- [x] Confirmed the A-record TTL is 300 seconds
- [x] Inventoried the public WordPress sitemap and known indexed/utility routes
- [x] Centralized approved legacy redirects in `src/legacy-routes.mjs`
- [x] Added build checks that prevent redirect sources and retired WordPress routes from becoming generated pages
- [x] Locally confirmed approved legacy routes return 301 and retired placeholder routes return 404
- [x] Preserved current Search Console verification in the DNS record inventory
- [x] Identified the live Meta Pixel ID and the current WordPress CAPI signal
- [x] Documented backup, rollback, cutover, and validation procedures
- [x] Completed an UpdraftPlus WordPress backup containing the database, plugins, themes, uploads, and other `wp-content` files
- [x] Downloaded all five backup components outside the hosting account and verified every archive
- [x] Created and revalidated a SHA-256 manifest for the private migration package
- [x] Exported the authenticated Name.com DNS zone and reconciled it with the public baseline
- [x] Added a source-generated Vercel adapter for exact legacy 301 redirects, canonical host routing, security headers, cache headers, trailing slashes, and the `dist` output
- [x] Added a quality check that fails if `vercel.json` drifts from the authoritative route and header configuration

## Owner/account gates before Vercel setup

These require authenticated account access or a business decision and cannot be safely inferred from public records.

- [x] Generate and download a restorable WordPress backup outside the hosting account
- [x] Export the WordPress database separately
- [x] Download and verify `wp-content/uploads`
- [ ] Obtain a full managed-hosting account backup or separately capture `public_html`, `wp-config.php`, and the current `.htaccess` if Name.com exposes an authenticated file/SFTP route
- [x] Export the complete Name.com DNS zone; compare it with the public baseline
- [ ] Confirm where `info@raccoonrestoration.com` and every other mailbox are actually hosted
- [ ] Confirm why Google MX records coexist with a Titan SPF include before changing any mail record
- [ ] Confirm the Vercel owner/team and billing account
- [ ] Confirm GitHub access from that Vercel account to `Matthewbolinger/RR2`
- [ ] Choose and approve the production lead destination/CRM
- [ ] Build and test the secure `FORM_ENDPOINT`; never expose a private CRM webhook
- [ ] Confirm IDPixel ownership, consent mode, retention, opt-out, and expected production requests
- [ ] Decide whether to preserve, replace, or formally retire Meta Pixel `1583403939041768`
- [ ] If Meta remains, preserve or rebuild equivalent browser and server-side/CAPI conversion tracking
- [ ] Confirm Google Ads, call tracking, and any other conversion integrations
- [ ] Confirm access to Google Search Console and Google Business Profile
- [ ] Approve project-image releases, legal text, and the remaining launch-checklist items

## Tracking continuity gate

The public WordPress home page was observed on July 31, 2026 with:

- Meta Pixel ID `1583403939041768`
- `includeCapiIntegration: true`
- WordPress 7.0.2
- Elementor 4.2.1

The new build currently includes the supplied IDPixel loader exactly once per page. It does not currently render a Meta Pixel or implement a Meta Conversions API service. That difference must be resolved before production cutover. Launching without a decision could break advertising attribution, audiences, and historical conversion continuity.

The migration must not treat analytics scripts as evidence that consent and legal requirements are complete. Production validation must cover consent behavior, network requests, duplicate events, personally identifiable information, retention, and opt-out behavior.

## Lead-capture gate

The structured quote experience is present and validated in the new site, but `FORM_ENDPOINT` is blank. Until a hardened endpoint durably accepts a lead into the chosen CRM, the form correctly reports that the request was not sent.

Production launch is blocked until the endpoint:

1. Validates and sanitizes every field server-side.
2. Applies rate limits, bot/spam controls, and deduplication.
3. Stores consent evidence and attribution parameters.
4. Creates or updates the lead in the CRM.
5. Assigns the correct pipeline stage and owner.
6. Alerts the responsible team.
7. Returns success only after durable acceptance.
8. Is tested on desktop and mobile with a traceable test lead.

## Platform adapter gate

The current build emits `_headers` and `_redirects`, which are useful for local artifacts and compatible static platforms. They are not the final Vercel configuration.

During the Vercel phase:

- Add a reviewed `vercel.json` generated from the same `legacyRedirects` source.
- Recreate security and cache headers.
- Configure `npm run build` and `dist`.
- Set `SITE_URL`, `FORM_ENDPOINT`, and approved analytics variables in Vercel.
- Keep previews off the production domain until the acceptance suite passes.

If cPanel is selected instead, translate the same source-of-truth routes and headers into a reviewed `.htaccess` file and upload only the contents of `dist/`.

## Go/no-go rule

Do not change Name.com A/CNAME records until all of the following are true:

- A restorable WordPress backup exists outside the hosting account.
- The complete DNS zone has been exported.
- Email ownership and records are confirmed.
- A Vercel preview passes the production build, redirect, form, analytics, accessibility, browser, and visual acceptance tests.
- The production form creates a traceable CRM lead.
- Tracking continuity has an explicit owner-approved decision.
- The rollback operator has the old IP and access to Name.com.

## Backup execution record

On July 31, 2026, UpdraftPlus 1.26.6 completed one backup set at 16:35 UTC. The database, plugins, themes, uploads, and other files were downloaded to the operator's local machine. `gzip -t` and `unzip -t` completed without errors for every component.

This satisfies the off-host, restorable WordPress backup gate. It is not represented as a cPanel full-account image: the Name.com managed WordPress product page did not expose cPanel, a file manager, or a full-account-backup control. Root-level `wp-config.php`, `.htaccess`, and the complete `public_html` tree remain a separate evidence item if Name.com support or an authenticated SFTP route makes them available.

## Next phase

Once the account gates are checked, begin Vercel migration in a preview-only state. Do not attach the production domain or change DNS during initial project creation.

Use `migration-owner-inputs.md` to collect the remaining decisions without storing passwords or secrets in GitHub.

The current decision packet is summarized in `pre-vercel-go-no-go-2026-07-31.md`.
