# Raccoon Restoration Production + Growth Master Plan

**Plan date:** August 4, 2026  
**Canonical website:** `https://www.raccoonrestoration.com`  
**Production repository:** `Matthewbolinger/RR2`  
**Production host:** Vercel project `raccoon-restoration`  
**Operating principle:** Revenue integrity first, search authority second, award polish third.

This is the operational source of truth for the production website, lead delivery,
local search, analytics, and ongoing content program. The earlier award and design
roadmaps remain useful creative references; this document controls execution order
and launch gates.

## Status legend

- **DONE** — verified with current evidence.
- **IN PROGRESS** — work has started, but the definition of done is not met.
- **BLOCKED** — requires a named external decision, account action, or production proof.
- **QUEUED** — intentionally follows a preceding gate.
- **RECURRING** — continues after launch.

## Current verified baseline

| Workstream | Status | Current evidence | Definition of done |
|---|---|---|---|
| Repository production build | **DONE** | `npm test` passed August 4: 28 pages, 25 indexable URLs, seven lead-intake tests, image gate with zero warnings | The same gates pass on the release commit |
| Responsive image and performance budget | **DONE** | Homepage payload 593.7 KiB against a 900 KiB budget | No production regression |
| Vercel account and spend governance | **IN PROGRESS** | Pro is active; one Owner has 2FA; extra repository committers require manual approval; a $25 on-demand budget pauses production when reached | Approved business invoice identity and an accountable backup administrator are recorded |
| Google Business Profile access | **DONE** | Existing verified profile found; client remains owner and Matthew has Manager access | No duplicate profile; access remains controlled by the business |
| Google profile website | **DONE** | Secure canonical URL saved as `https://www.raccoonrestoration.com/` | Google displays the HTTPS URL |
| Google profile description | **DONE** | Profile editor displays the approved Greater Chicago/service-focused description | Keep the description aligned with verified services and credentials |
| Google profile completeness | **DONE — OWNER CONFIRMED** | Owner reported the remaining profile facts and visual setup complete on August 4; the UTM website URL remains subject to Google's publication timing | Monitor Google for unintended changes or rejected edits |
| Website-to-AccuLynx code | **DONE** | Seven local integration tests pass; server-only `/api/quote/` exists | Release commit remains green |
| Production lead delivery | **DONE — CORE PATH ACCEPTED** | A controlled residential test returned HTTP 201 and an AccuLynx job ID; the owner confirmed the CRM receipt and routing proof on August 4 | Deferred edge-case tests remain in the hardening backlog |
| Conversion analytics | **IN PROGRESS** | Vercel Analytics is active and receiving privacy-safe form conversion events; IDPixel account/legal decisions remain open | Production events and destinations are verified without PII |
| Search discovery | **IN PROGRESS** | Live robots, sitemap, canonical domain, HTTPS redirects, and legacy contact redirect verified August 4 | Search Console/Bing status and priority URL indexing are reconciled |
| Local authority and evidence | **QUEUED** | Project and resource foundations exist | Consistent citations, real case studies, review cadence, and reporting loop |

## August 4 execution checkpoint

| Control | Verified production evidence |
|---|---|
| Release identity | Vercel Production is running repository commit `b0745f8`; local `main` and `origin/main` point to the same commit |
| Vercel account controls | Pro is active with one Owner and 2FA. Automatic paid seat creation is disabled; repository committers now require manual approval |
| Spend containment | The team has a $25 on-demand budget. **Pause Production Deployments** is enabled, so reaching the budget pauses every production project on the team until an administrator intervenes |
| Production configuration | Vercel contains the required Production/Preview variable names for the form route, allowed origins, canonical site, AccuLynx key, contact type, and lead source; secret values were not exposed |
| Quote firewall | Rule **Protect quote submissions** matches `/api/quote/`, uses a 600-second fixed window keyed by IP, allows five requests, then returns HTTP 429 |
| Durable CRM receipt | Controlled residential submission returned HTTP 201 with submission ID `daca3306-af27-4b7a-9fb4-6a9b60f548a1` and AccuLynx job ID `5c590790-b753-4831-87f7-50db140f871f` |
| Conversion measurement | Vercel Analytics showed 19 visitors, 105 page views, and the privacy-safe `form_start`, `form_submit_attempt`, `form_submit_success`, `quote_form_step_view`, and `quote_form_step_complete` events in the observed seven-day window |
| Domain and TLS | HTTP upgrades to HTTPS; the apex permanently redirects to `https://www.raccoonrestoration.com/`; the canonical host returns HTTP 200 with HSTS |
| Crawler foundation | Production `robots.txt` allows the general crawler plus OAI Search and Ads bots; sitemap advertises the canonical URLs; `/contact-us-3/` returns HTTP 301 to `/contact/` |
| Google profile | New description is current in the profile editor; the UTM-tagged website URL is submitted and pending Google review |
| Entity graph | Verified Instagram and Facebook profiles were added to the sitewide `RoofingContractor.sameAs` schema alongside BBB and GAF |
| Search platforms | Google Search Console reports the sitemap as **Success** with 25 discovered pages; page indexing and performance data are processing. Bing reports one successful sitemap, zero errors, zero warnings, and 25 discovered URLs |
| IndexNow release notification | The production key was verified and all 25 canonical URLs were accepted by IndexNow with HTTP 200 on August 4 |
| Bing production scan | A bounded 25-page sitemap scan named **RR production launch 2026-08-04** is queued; findings must be reconciled when Bing completes it |
| Priority Google URLs | Homepage, Contact, Roof Replacement, Projects, Service Areas, and Barrington are indexed. `/resources/` was discovered but not indexed, so it was submitted to Google's priority crawl queue on August 4 |

## Phase 0 — Finish production account governance

**Objective:** Keep the website available, recoverable, and owned by the business
without accidentally adding paid seats.

### Completed controls

- [x] Confirm Vercel Pro is active on the production team.
- [x] Confirm the only current team Owner has two-factor authentication enabled.
- [x] Change repository-committer membership from automatic paid-seat creation to
  manual approval.
- [x] Confirm a conservative $25 on-demand budget.
- [x] Confirm the budget pauses production deployments when reached.

### Owner actions required

- [ ] Replace the personal-style company name and invoice recipient with approved
  Raccoon Restoration billing details.
- [ ] Add one accountable business-controlled recovery administrator only if the
  operational benefit justifies an additional paid seat.
- [ ] Record who receives spend alerts and who is authorized to resume production
  after a budget pause.
- [ ] Revisit the $25 pause threshold after 30 days of real traffic. A hard pause
  prevents runaway spend, but it also makes the site unavailable after the limit.

### Exit gate

The client can recover the team, invoices identify the correct business, paid seats
cannot be added automatically, and the budget/availability tradeoff has a named
operator.

## Phase 1 — Complete the verified Google Business Profile

**Objective:** Establish one accurate public business entity for Greater Chicago.

### Agent-executable work

- [x] Use the existing verified profile; do not create another listing.
- [x] Preserve the client/business account as the controlling owner.
- [x] Save the secure canonical website URL.
- [x] Submit a concise Greater Chicago and service-focused description.
- [x] Submit the approved UTM-tagged website URL; monitor until Google publishes it.
- [x] Upload an approved logo, cover image, fleet image, and a first set of real project photos. **Owner-confirmed complete August 4.**
- [x] Record owner confirmation of the completed profile state.

### Owner-confirmed facts required

- [x] Exact communities that are actively served. **Owner-confirmed.**
- [x] Whether the published 24-hour Monday–Saturday schedule is accurate. **Owner-confirmed.**
- [x] Opening date. **Owner-confirmed.**
- [x] Approved secondary categories and services. **Owner-confirmed.**
- [x] Any credentials, insurance, warranty, or emergency-response claims shown publicly. **Owner-confirmed.**

### Exit gate

The profile shows one consistent name, phone, HTTPS website, service territory,
hours, categories, services, license, and approved visual proof. No duplicate
listing exists.

## Phase 2 — Prove the production revenue path

**Objective:** A visitor cannot receive a success message unless AccuLynx has durably
accepted the lead.

### Configuration audit

- [x] Confirm the Vercel Production deployment uses `FORM_ENDPOINT=/api/quote/`.
- [x] Confirm `SITE_URL` and `FORM_ALLOWED_ORIGINS` are configured for the canonical production origins.
- [x] Confirm the dedicated server-only AccuLynx API key is active through a controlled production receipt.
- [x] Confirm the production contact type and lead source configuration is accepted by AccuLynx.
- [x] Confirm a redeploy occurred after the current environment variables were saved.
- [x] Verify the Vercel Firewall rule for `/api/quote/`.
- [x] Confirm no secret or customer PII is present in client code, analytics events, or structured acceptance logs.

### Controlled acceptance matrix

| Test | Status | Required result |
|---|---|---|
| Residential roof replacement | **PASS — receipt and routing confirmed** | Accepted AccuLynx job `5c590790-b753-4831-87f7-50db140f871f` proves the core production path |
| Urgent active issue | **DEFERRED HARDENING** | Correct urgent priority and routing |
| Storm or open insurance claim | **DEFERRED HARDENING** | Correct high-priority/claim context without exposing PII to analytics |
| Commercial/association property | **DEFERRED HARDENING** | Correct property type and service mapping |
| Duplicate submission | **DEFERRED HARDENING** | No duplicate job for the same `submission_id` |
| AccuLynx failure | **DEFERRED HARDENING** | Browser shows an honest failure and retains a phone handoff |

### Exit gate

The core live path is accepted. The deferred hardening matrix remains scheduled
before paid lead volume is materially increased.

## Phase 3 — Verify conversion measurement

**Objective:** Attribute qualified leads without collecting form PII in analytics.

- [ ] Verify IDPixel production requests, destination, consent, retention, and opt-out behavior.
- [x] Verify Vercel Web Analytics receives the approved privacy-safe form events.
- [x] Verify `form_start`, `form_submit_attempt`, and `form_submit_success` on production.
- [ ] Verify `quote_cta_click`, `form_submit_error`, and `phone_click` on production.
- [x] Submit the Google Business Profile UTM convention; verify attribution after Google publishes the pending URL.
- [ ] Resolve whether the prior Meta Pixel/CAPI implementation is preserved, replaced, or retired.
- [ ] Configure Google Ads or Meta conversions only after the chosen measurement path is approved.
- [ ] Document who can access analytics and how deletion/retention requests are handled.

### Exit gate

A test lead can be traced from channel and CTA to a durable AccuLynx receipt without
names, email addresses, phone numbers, addresses, claim details, or message text
appearing in analytics.

## Phase 4 — Reconcile indexing and crawler access

**Objective:** Replace stale WordPress results and make the current site easy to
discover in Google, Bing, and AI-assisted search.

- [x] Recheck Google Search Console sitemap status: **Success**, 25 discovered pages.
- [ ] Recheck the aggregate page-indexing report after Google finishes processing the new property data.
- [x] Inspect the homepage, Roof Replacement, Projects, Contact, Service Areas, Barrington, and Resources URLs individually.
- [x] Confirm six priority URLs are indexed and submit the discovered-but-not-indexed `/resources/` hub to Google's priority crawl queue.
- [x] Verify `/contact-us-3/` permanently redirects to `/contact/`.
- [ ] Monitor the search result until Google replaces the stale result with `/contact/`.
- [x] Recheck Bing sitemap status: **Success**, zero errors, zero warnings, 25 discovered URLs.
- [ ] Reconcile the bounded 25-page Bing Site Scan when its current **Queued** status completes.
- [x] Confirm `robots.txt`, `sitemap.xml`, canonical domain behavior, and generated structured data on production.
- [x] Verify the deployed IndexNow key and submit the 25 canonical production URLs; HTTP 200 accepted.
- [x] Confirm the only custom Vercel Firewall rule is scoped to `/api/quote/` and does not block legitimate search or AI crawlers.
- [ ] Track Google, Bing, and AI-referral sessions separately from conversions.

### Exit gate

Priority pages are discoverable, the legacy contact URL remains a permanent redirect,
the current domain is canonical, and no search platform reports a production crawl
block caused by the site.

## Phase 5 — Build local authority and evidence

**Objective:** Earn visibility through verifiable local work rather than thin location
or ZIP-code pages.

- [ ] Reconcile the canonical name, phone, HTTPS website, services, hours, service area,
  license, and credentials across Google, Bing Places, BBB, manufacturer profiles, and social profiles.
- [x] Add verified BBB, GAF, Instagram, and Facebook entity links to the
  sitewide `RoofingContractor.sameAs` schema.
- [ ] Publish real case studies with city/service area, problem, inspection findings,
  completed scope, materials/system, and original before/during/after images.
- [ ] Create new city pages only when unique local evidence and service history support them.
- [ ] Add approved review source links and current rating/count snapshots.
- [ ] Establish a post-completion review request that follows platform policies.
- [ ] Publish seasonal resources that answer real Greater Chicago homeowner questions.

### Exit gate

The business entity is consistent across major sources, every location page has unique
evidence, and project/review content can be traced to a real source.

## Phase 6 — Operate the growth loop

**Objective:** Make search visibility and conversion quality compound over time.

### Monthly

- [ ] Add approved project photos and one proof-rich project update.
- [ ] Respond to all new Google reviews professionally.
- [ ] Review GBP interactions, calls, form starts, accepted leads, and lead-source quality.
- [ ] Review Search Console and Bing queries/pages for indexing or intent gaps.

### Quarterly

- [ ] Run the complete repository and rendered-site QA suite.
- [ ] Review Core Web Vitals and production errors.
- [ ] Audit business facts, credentials, hours, services, and citation consistency.
- [ ] Refresh seasonal resources and retire outdated claims or references.

## Decision and authority register

| Decision | Accountable owner | Agent authority |
|---|---|---|
| Business ownership, hours, address visibility, service territory | Client/business owner | Prepare and implement only verified facts |
| Vercel secrets and production redeploy | Authorized Vercel administrator | Inspect names/status; never expose secret values |
| AccuLynx routing, owners, and test-record handling | Client CRM administrator | Implement and test the agreed mapping |
| Analytics consent and Meta/CAPI continuity | Business + legal/marketing owner | Implement only the approved architecture |
| Reviews, customer outreach, and public claims | Client/business owner | Draft; publish only with authorization and source evidence |
| Code, tests, schema, redirects, and documentation | Repository maintainers | Implement, verify, and prepare release evidence |

## Master release gate

The next production release is accepted only when:

1. `npm test` passes on the release commit.
2. The production deployment identifies that commit.
3. The controlled AccuLynx acceptance matrix passes.
4. Conversion success reflects a durable CRM receipt.
5. Google/Bing crawler and sitemap checks are healthy.
6. Public business facts have an accountable source.
7. A rollback operator and prior DNS/hosting state remain available.
