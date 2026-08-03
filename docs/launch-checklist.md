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
- [ ] Approved hosting target configured
- [ ] Production domain, DNS, SSL, www/apex, and legacy redirects tested

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
- [ ] Vercel owner/team, billing, and RR2 GitHub access confirmed
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
- [ ] Social profile URLs

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

- [x] Full quote form remains visible and fails honestly while online delivery is unconfigured
- [x] Thank-you navigation and success tracking wait for endpoint confirmation
- [ ] Secure `FORM_ENDPOINT`
- [ ] Server validation, sanitization, rate limiting, and spam protection
- [ ] CRM field mapping, deduplication, pipeline stage, and lead-owner routing
- [ ] Consent evidence, retention, and suppression workflow approved
- [ ] Real desktop and mobile delivery tests
- [ ] Production endpoint success tied to durable CRM receipt
- [ ] IDPixel consent/legal review and production request validation; configure any additional analytics IDs only if approved
- [ ] Preserve, replace, or formally retire live Meta Pixel `1583403939041768`
- [ ] Preserve or rebuild equivalent CAPI attribution if Meta tracking remains active
- [ ] Search Console verification
- [ ] Google Business Profile service areas, services, hours, photos, and UTM website link
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
- [ ] Submit sitemap and inspect indexation
- [ ] After the Vercel domain cutover, manually run the `Notify IndexNow` GitHub workflow once. It safely skips submission until the canonical key file is live.

## Launch decision

**Blocked for public production launch** until the authenticated WordPress backup and DNS export are complete, mail ownership is confirmed, the supplied project imagery is cleared for publication, detailed case-study facts are verified, remaining brand/people assets are approved, form delivery works, tracking continuity is resolved, required business facts and legal text are reviewed, and a preview deployment passes the acceptance runbook. The local production build is ready for final responsive review and integration.

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
