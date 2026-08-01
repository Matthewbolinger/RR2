# Launch Checklist

## Repository and build

- [x] Production build succeeds
- [x] Internal-link, metadata, heading, schema, image-dimension, and claim checks pass
- [x] Sitemap, robots, 404, security headers, and redirects generated
- [x] Mobile conversion actions implemented
- [ ] Approved hosting target configured
- [ ] Production domain, DNS, SSL, www/apex, and legacy redirects tested

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
- [ ] Analytics/tag manager consent and IDs
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

**Blocked for public production launch** until the supplied project imagery is cleared for publication, detailed case-study facts are verified, remaining brand/people assets are approved, form delivery works, required business facts and legal text are reviewed, and hosting is configured. The local production build is ready for final responsive review and integration.

## Sprint delta — 2026-08-01 agentic sprint

Shipped on `claude/webpage-design-review-s7pxzi` (see `sprint-plan-8h.md`,
`baseline-2026-07-31.json`):

- [x] Self-hosted WOFF2 fonts + size-adjust fallbacks (Google Fonts removed;
      fonts-blocked LCP 13.1s → 1.79s; clipped-tagline first paint eliminated)
- [x] WebP pipeline + `<picture>` transform; homepage payload 2331 → 809 KiB,
      900 KiB budget enforced in `npm test`
- [x] Homepage trust band rebuilt (BBB + IL license marks, two verified quotes,
      verified-slot system for future reviews)
- [x] Real-archive graded imagery across all service cards AND service detail
      heroes; zero AI-generated images in the conversion path (homepage hero is
      the one deliberate exception, pending a real shoot)
- [x] Two scroll-narrative case studies from register-supported material only
- [x] Audit harness in repo: `npm run audit` (frames / overflow / vitals gates)
- [x] Zero horizontal overflow across 19 routes × 2 viewports; CLS 0; LCP under
      2.0s budget on throttled slow-4G

## Owner decisions required (blocking or brand-sensitive)

- [ ] **Phone + tagline canon:** fleet wrap reads 224-500-4825 / "We don't follow
      industry standards, we set them"; site reads (224) 500-6825 / "Built above
      standard." Confirm tracking-number setup or correct one of them.
- [ ] **Tudor lawn retouch disclosure:** the projects-page hero and homepage
      strip use the digitally composited lawn variant (`landscape-finished-v6`;
      the provenance register documents the retouch series, and
      `scripts/composite-project-hero-yard.mjs` is the mechanism). The case
      study deliberately uses only the unretouched frame with labeled
      presentation cuts. Decide: swap remaining v5/v6 usages to the original
      frame, add a treatment label, or accept as presentation imagery.
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
