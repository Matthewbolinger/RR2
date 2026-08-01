# Launch Checklist

## Repository and build

- [x] Production build succeeds
- [x] Internal-link, metadata, heading, schema, image-dimension, and claim checks pass
- [x] Sitemap, robots, 404, security headers, and redirects generated
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
- [ ] Three verified project case studies
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

## Launch decision

**Blocked for public production launch** until the authenticated WordPress backup and DNS export are complete, mail ownership is confirmed, the supplied project imagery is cleared for publication, detailed case-study facts are verified, remaining brand/people assets are approved, form delivery works, tracking continuity is resolved, required business facts and legal text are reviewed, and a preview deployment passes the acceptance runbook. The local production build is ready for final responsive review and integration.
