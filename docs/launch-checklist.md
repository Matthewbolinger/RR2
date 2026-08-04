# Launch Checklist

## Repository and build

- [x] Production build succeeds
- [x] Internal-link, metadata, heading, schema, image-dimension, and claim checks pass
- [x] Sitemap, robots, 404, security headers, and redirects generated
- [x] OAI-SearchBot and OAI-AdsBot explicitly allowed
- [x] Sitemap freshness dates and IndexNow deployment notification implemented
- [x] Legacy redirects and retired WordPress URLs centralized and build-checked
- [x] Source-generated Vercel adapter added and drift-checked
- [x] Mobile conversion actions implemented
- [x] Approved Vercel production hosting target configured
- [x] Production domain, DNS, SSL, www/apex, and legacy redirects tested on August 4, 2026

## Migration preservation

- [x] Public DNS and email baseline recorded on July 31, 2026
- [x] Current WordPress sitemaps and known public/utility routes inventoried
- [x] Current WordPress Meta Pixel ID and CAPI signal recorded
- [x] Local redirect and retired-route response smoke test passed
- [x] Backup, rollback, Vercel preview, cutover, and acceptance runbooks prepared
- [x] Complete UpdraftPlus WordPress backup downloaded outside the hosting account and archive integrity verified
- [x] Private migration package organized with a verified SHA-256 manifest
- [x] WordPress database and uploads backed up and verified
- [ ] Full managed-hosting account or `public_html`, `wp-config.php`, and `.htaccess` captured if Name.com exposes file/SFTP access
- [x] Complete Name.com DNS zone exported and reconciled with the public baseline
- [ ] Active mailbox provider and Google-MX/Titan-SPF combination confirmed
- [x] Vercel Pro team, production RR2 GitHub deployment, sole Owner, and Owner 2FA confirmed
- [x] Automatic paid-seat creation disabled; new repository committers require manual approval
- [x] Conservative $25 on-demand budget configured with production pause at the threshold
- [ ] Vercel invoice recipient and company name changed from personal-style values to approved business billing details
- [ ] Accountable recovery administrator and budget-resume operator documented
- [ ] Preview deployment passes the full acceptance runbook
- [ ] Rollback operator has independent access and the prior A-record values
- [ ] WordPress hosting retained through the post-launch stabilization window

## Business information

- [x] Company name and descriptor
- [x] Built Above Standard. slogan
- [x] Phone, email, Barrington location, and license
- [x] Greater Chicago regional service positioning
- [ ] Full approved public address
- [ ] Business hours and urgent-response policy
- [ ] Exact city/ZIP operating list for Google Business Profile
- [ ] Current insurance/bonding evidence
- [ ] Written warranty terms
- [ ] Financing provider/program
- [ ] Current manufacturer certifications and logo rights
- [ ] Approved review rating/count snapshot
- [ ] Founder, team, and company-history approval
- [x] Social profile URLs verified against the managed Google Business Profile

## Brand and content

- [x] Client-supplied primary raster logo implemented
- [x] Client-supplied horizontal desktop/footer and compact mobile PNG lockups implemented
- [x] Client-supplied real project and field photography integrated
- [ ] Approved monochrome, favicon, social, and small-format supporting marks
- [ ] Approved mascot asset
- [ ] Approved monogram pattern
- [ ] Real hero and team photography
- [ ] Project image publication releases and structured project metadata
- [~] Project case studies: two live, register-verified (`/projects/tudor-exterior-transformation/`, `/projects/commercial-flat-roof/`); a third when new archive material is released
- [x] Original Greater Chicago roofing Resources hub and four pillar guides
- [x] Public resource references reviewed for freshness on July 30, 2026
- [ ] Approved reviews with source links
- [ ] Final service catalog
- [ ] Final warranty and financing copy
- [ ] Final legal review of privacy, terms, consent, and accessibility statement

## Integrations and data

- [x] Full quote form posts to the server-side production endpoint and only navigates to thank-you after a durable AccuLynx receipt
- [x] Thank-you navigation and success tracking wait for endpoint confirmation
- [x] Secure server-side `FORM_ENDPOINT=/api/quote/`
- [x] Server validation, sanitization, honeypot protection, deduplication, and Vercel Firewall rate limiting
- [ ] CRM field mapping, deduplication, pipeline stage, and lead-owner routing
- [ ] Consent evidence, retention, and suppression workflow approved
- [ ] Real desktop and mobile delivery tests
- [x] Production endpoint success tied to a durable AccuLynx receipt; broader routing matrix remains open
- [ ] IDPixel consent/legal review and production request validation; configure any additional analytics IDs only if approved
- [ ] Preserve, replace, or formally retire live Meta Pixel `1583403939041768`
- [ ] Preserve or rebuild equivalent CAPI attribution if Meta tracking remains active
- [x] Search Console ownership previously verified; current sitemap coverage remains a recurring check
- [x] Google Business Profile service areas, services, hours, and photos owner-confirmed complete; monitor Google's pending UTM website publication
- [ ] Bing Places and core citation consistency review
- [ ] Google Ads and Meta conversions
- [ ] Call tracking policy and number replacement behavior
- [ ] Error monitoring and backup/rollback

## QA

- [x] All 26 routes captured and reviewed locally after the Greater Chicago expansion
- [x] Every route checked at 390 pixels; priority routes checked at 768 and 1440 pixels
- [x] No-JavaScript hero, reduced motion, mobile menu, form validation, active navigation, overflow, and real 404 smoke tests pass
- [x] No fictional projects or reviews
- [x] No public unverified placeholder tokens
- [x] Legacy primary slogan removed
- [ ] Browser matrix: current Chrome, Safari, Firefox, Edge
- [ ] VoiceOver/NVDA manual pass
- [ ] Production Lighthouse and Core Web Vitals
- [ ] Structured-data validator
- [x] Final social-preview test
- [ ] Production form and phone attribution test
- [x] Submit the sitemap to Google and Bing; both report Success with 25 discovered URLs. Google page-indexing coverage is still processing.
- [x] Run the production IndexNow submission after cutover; 25 canonical URLs accepted with HTTP 200 on August 4, 2026
- [x] Verify Homepage, Contact, Roof Replacement, Projects, Service Areas, and Barrington individually as indexed in Google
- [x] Submit the discovered-but-not-indexed `/resources/` hub to Google's priority crawl queue
- [ ] Reconcile Bing production Site Scan `RR production launch 2026-08-04` after its current Queued status completes

## Launch decision

**Public production is active.** The release build, canonical domain, HTTPS,
redirects, sitemap, IndexNow submission, firewall, privacy-safe conversion events,
and one durable AccuLynx receipt are verified. The open items above are production
readiness exceptions and growth controls, not evidence that the live site is
offline. Do not declare the revenue path fully accepted until the CRM administrator
reconciles the controlled test record and the remaining routing/failure matrix
passes. Do not retire the WordPress rollback assets until mail ownership, tracking
continuity, legal text, and post-cutover stability are confirmed.

## Sprint delta — 2026-08-01 agentic sprint

Shipped on `claude/webpage-design-review-s7pxzi` (see `sprint-plan-8h.md`,
`baseline-2026-07-31.json`):

- [x] Self-hosted WOFF2 fonts + size-adjust fallbacks (Google Fonts removed;
      fonts-blocked LCP 13.1s → 1.79s; clipped-tagline first paint eliminated)
- [x] WebP pipeline + `<picture>` transform; homepage payload 2331 → 809 KiB,
      900 KiB budget enforced in `npm test`
- [x] Homepage trust band rebuilt (BBB + IL license marks, two verified quotes,
      verified-slot system for future reviews)
- [x] Owner-approved cohesive service illustrations restored across all service
      cards and matched to their linked service-detail heroes; captions keep
      editorial media separate from project proof
- [x] Two scroll-narrative case studies from register-supported material only
- [x] Audit harness in repo: `npm run audit` (frames / overflow / vitals gates)
- [x] Zero horizontal overflow across 19 routes × 2 viewports; CLS 0; LCP under
      2.0s budget on throttled slow-4G

## Owner decisions required (blocking or brand-sensitive)

- [ ] **Phone + tagline canon:** fleet wrap reads 224-500-4825 / "We don't follow
      industry standards, we set them"; site reads (224) 500-6825 / "Built above
      standard." Confirm tracking-number setup or correct one of them.
- [x] **Tudor presentation treatment decided:** on August 1, 2026 the owner
      explicitly requested a more polished completed-project image with
      greener maintained grass, cleaner landscaping, a decluttered porch, and
      higher photographic quality. The resulting OpenAI-assisted
      `project-tudor-residence-exterior-polished-v7-*` family now replaces the
      v6 presentation image across the Projects hero, portfolio gallery, and
      Tudor case study. The case-study hero and completed frames are visibly
      labeled “Presentation enhanced”; the copy does not attribute landscaping
      to the contracted restoration scope, and the original client-archive
      completion frame remains preserved.
- [ ] **Homepage hero swap:** current hero is the last AI-generated image in the
      main flow. A graded real candidate exists
      (`editorial-v3/home-hero-dusk-candidate-1800x1013.webp`) but reads
      storm-light rather than dusk and would triple-expose the Tudor property.
      Recommended: golden-hour shoot of a completed project (shot list in
      `photography-requirements.md`).
- [ ] **Founder section activation:** component ships flagged off in
      `src/data.mjs` (`founder.verified: false`); needs portrait + approved
      first-person line.
- [ ] **Review pipeline:** trust band renders only `verified: true` quotes; add
      new quotes with permission evidence to `src/data.mjs` → `proof`.
