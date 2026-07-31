# Master Improvement Plan — Raccoon Restoration

Companion to `design-review-2026-07-31.md` (scored 7.6/10). This plan sequences every
improvement into six phases over roughly twelve weeks, splits work between **code**
(executable in this repo) and **client** (assets, approvals, accounts), and sets a
measurable target per phase. The ambition ladder:

| Milestone | Score target | Meaning |
|---|---|---|
| Today | 7.6 | Top-tier contractor site; soft trust layer; no motion identity |
| End of Phase 2 | 8.2 | Launch-clean, fast, resilient, conversion-complete |
| End of Phase 4 | 8.6 | Unified photography + a kinetic signature |
| End of Phase 5 | 9.0 | Award-submission ready (Awwwards Honorable Mention / SOTD shortlist) |

The two governing principles:

1. **Revenue before trophies.** Phases 1–2 are pure conversion and integrity; nothing
   award-facing ships before the trust layer and performance are fixed.
2. **Keep the constraint that makes this site good.** No runtime framework, no
   third-party JS. Every motion and interaction below is achievable with CSS,
   IntersectionObserver, and progressive enhancement — the dependency-free build is a
   feature, not a limitation.

---

## Phase 0 — Truth & assets (client-critical path, Weeks 1–2)

Everything here blocks later phases. None of it is code.

| # | Item | Blocks | Detail |
|---|---|---|---|
| 0.1 | **Canonize the phone number and tagline** | P1, launch | Fleet wrap reads 224-500-4825 + "We don't follow industry standards, we set them"; site reads (224) 500-6825 + "Built above standard." Decide: tracking numbers (document them) or fix one. One tagline everywhere. |
| 0.2 | **Proof pack** | P1 trust band | Export reviews with permission to publish: reviewer first name + last initial, date, platform, project type. Target 6–10 usable quotes, plus platform totals (count + rating) for BBB/Google. |
| 0.3 | **People pack** | P1 faces | Owner portrait + 2–4 crew portraits (or one team photo), a two-sentence first-person founder line, name and title approvals. |
| 0.4 | **Project releases + metadata** | P3, projects | Publication releases and verified location/date/scope for the supplied archive (register already exists in `image-provenance-register.md` — complete it). |
| 0.5 | **Business verification** | P1 financing band, launch | Verified warranty terms, financing partner + disclosure language, COI review (tracked in `unverified-business-information.md`). |
| 0.6 | **Accounts + endpoints** | P2, P5, launch | Hardened `FORM_ENDPOINT` per `lead-automation-specification.md`, GA4/GTM/Meta IDs, exact GBP city/ZIP list. |

**Exit criteria:** every item delivered or explicitly deferred with a dated owner.

---

## Phase 1 — Conversion core (code, Weeks 1–3, ~8–10 dev-days)

Fixes the two lowest scores (trust frame 6.0, reviews page 6.5) and the small craft debt.

- **1.1 Rebuild the homepage trust frame** (the 6.0). One proof band: aggregate rating +
  review count, three named quotes with portraits, marks row (BBB A+, IL license,
  manufacturer certifications if held), link to `/reviews/`. Design language: cream
  section, gold rules, no carousel — static, scannable, dense with evidence.
- **1.2 Faces.** Founder moment on the homepage (portrait + first-person line + signature
  treatment) and a proper team section on About. This converts the "one accountable local
  team" claim from copy into evidence.
- **1.3 Financing + warranty band** on the homepage between working-standard and storm
  sections: two cards, verified terms only, linking to existing pages.
- **1.4 Reviews page depth.** Platform tiles with counts and outbound links, dated quotes
  grouped by service, `AggregateRating` schema only if the displayed numbers match the
  source platforms.
- **1.5 Craft debt sweep.** "Explore our projects" button wrap; intent-card 05 rhythm;
  FAQ section link to `/faq/`; storm-section eyebrow alignment; footer pattern opacity
  −15–20%.
- **1.6 Homepage projects taste.** Expand "Selected work" to a 3-item strip (one per
  category) so the portfolio's authenticity reaches the homepage.

**Exit criteria:** homepage frame 7 rescored ≥ 8.0 in an internal re-review; no visual
regressions in the frame capture set.

---

## Phase 2 — Performance & resilience (code, Weeks 2–4, ~6–8 dev-days)

- **2.1 Self-host fonts.** Bebas Neue + Montserrat WOFF2 in `public/assets/fonts/`,
  `<link rel="preload">`, `font-display: swap` retained, plus a `size-adjust`-tuned
  local fallback face so the pre-font paint no longer overflows (the verified
  "BUILT ABOVE STANDAR" clip). Drop the hero `clamp()` floor to ~3.4rem under 400px as
  belt-and-braces. Removes the Google Fonts single point of failure entirely.
- **2.2 Image pipeline in `build.mjs`.** Generate AVIF + WebP + JPEG fallback with
  `srcset/sizes` for every raster; hero gets `fetchpriority="high"`; homepage image
  payload target **< 900 KB** (currently ~1.9 MB); enforce via a new check in
  `check.mjs` so the budget can never silently regress.
- **2.3 Critical CSS.** Split `styles.css` (97 KB): inline the above-the-fold token +
  layout layer, defer the rest. Target < 25 KB render-blocking CSS.
- **2.4 Web-vitals gate.** Add a headless LCP/CLS smoke test to `npm test` using the
  existing capture tooling; budgets from `performance-budget.md` become enforced, not
  aspirational.

**Exit criteria:** LCP < 2.0 s on throttled 4G emulation, CLS < 0.05, zero layout shift
from font swap, `npm test` enforces all budgets.

---

## Phase 3 — Photography unification (mixed, Weeks 3–6)

The 6.5 photography score is the biggest brand-trust risk. Strategy: **make the real
archive the only voice.**

- **3.1 Grade the archive** (code/design). One LUT/treatment (cool dusk shadows, warm
  gold highlights) applied to the strongest real frames; replace the four AI-reading
  service-card images and the stock-reading homepage hero. The Tudor, aerials, and fleet
  material is strong enough today.
- **3.2 One brand shoot day** (client + photographer). Shot list from
  `photography-requirements.md`: crew portraits, five process steps as documentary
  frames, fleet beauty shots at dusk, detail macros (drip edge, ridge, flashing). Half a
  day on an active site, half at HQ.
- **3.3 Provenance system** (code). Extend the Projects page's honest labeling
  ("no baked labels or artificial upscaling") into a site-wide caption standard —
  every image carries location-class + verification chip. Turns an integrity practice
  into a differentiator.

**Exit criteria:** zero AI-generated imagery in the conversion path; one photographic
voice site-wide; provenance register complete.

---

## Phase 4 — Motion identity (code + design, Weeks 5–8, ~8–10 dev-days)

One kinetic idea, executed deeply, everything else quiet. The idea: **"the gold line
draws the work"** — the brand's gold rule becomes a living element that traces rooflines
and section edges as you scroll.

- **4.1 Hero reveal.** On load: dusk photo eases from 96 % scale, headline lines rise in
  a 3-step stagger, then a single gold rule draws left-to-right under "STANDARD." and the
  house's windows warm up (pre-baked two-frame crossfade). ~1.4 s, once per session,
  fully disabled under `prefers-reduced-motion` (infrastructure already exists).
- **4.2 Scroll choreography.** The gold rule motif draws along section dividers as they
  enter; numbered items (01–05) count up their gold numerals; project images reveal with
  a clip-path wipe from the roofline angle. CSS scroll-driven animations where supported,
  IntersectionObserver fallback — still zero dependencies.
- **4.3 Micro-interactions.** Magnetic gold CTA (±6 px translate toward cursor), nav
  underline that slides between items, accordion easing curve, card hover: image scales
  1.03 + caption chip slides up.
- **4.4 Page transitions.** View Transitions API progressive enhancement: shared-element
  morph of the page-hero gold rule between routes. No-JS and unsupported browsers get
  instant navigation, unchanged.

**Exit criteria:** motion audit — the signature appears in exactly three places
(hero, dividers, CTA); everything else ≤ 200 ms utility easing; reduced-motion parity
verified in the capture suite.

---

## Phase 5 — Signature experiences (Weeks 8–12)

The pieces juries remember, and the ones that close high-ticket customers.

- **5.1 Two scroll-narrative case studies.** Before → field protocol → documentation →
  verified outcome, built from the real archive (Tudor exterior transformation; one
  commercial flat roof). Sticky media rail, step-locked scroll on desktop, plain
  stacked flow on mobile. These become the award-submission centerpiece.
- **5.2 "Instant quote" made true.** With the hardened endpoint live: response-time
  promise on the form ("photo-documented findings within 24 hours of inspection"),
  progress persistence across steps, SMS/email confirmation copy. The promise in the CTA
  finally matches the mechanism behind it.
- **5.3 "The system, explained" interactive.** An exploded roof-system diagram
  (deck → underlayment → ice barrier → shingle → ridge vent) that assembles on scroll —
  SVG layers, no libraries. Educational, ownable, and perfectly on-message for
  "See the system taking shape."
- **5.4 Award submissions.** After four weeks of clean analytics: Awwwards + CSSDA
  entries (submission screenshots, 30-second screen capture, write-up of the
  documentation-first concept), timed to a Tuesday–Thursday window.

**Exit criteria:** case studies live with verified metadata; form delivering to CRM with
audit trail; submissions filed.

---

## Phase 6 — Launch & growth loop (parallel from Week 4, ongoing)

- Complete `launch-checklist.md` (legal approval, GBP list, analytics live).
- **Review flywheel:** post-completion ask (QR card + SMS link) feeding new quotes into
  the Phase 1 trust band monthly — the trust section compounds instead of aging.
- Local SEO execution per `greater-chicago-seo-plan.md`: town pages built from the
  Barrington template as real service history accumulates (no thin doorway pages).
- Quarterly resources cadence (one guide per season; winter ice-dam guide refreshed each
  November).
- Monitoring: CrUX/CWV monthly, event funnel per `analytics-event-specification.md`
  (call taps, quote starts/completions by step, triage-card usage), quarterly frame-audit
  re-run using the capture tooling from this review.

---

## Risk register

| Risk | Phase | Mitigation |
|---|---|---|
| Review permissions not granted | 0/1 | Fall back to platform-linked counts + anonymized quotes; never fabricate |
| Photo releases unavailable for key projects | 3 | Shoot day supplies replacements; provenance register gates usage |
| Motion work degrades LCP/CLS | 4 | Phase 2 budgets enforced in `npm test` — animation cannot ship if gates fail |
| AVIF encoding bloats build time | 2 | Cache derivatives by content hash in `build.mjs` |
| "Instant quote" promise vs. slow follow-up reality | 5 | Promise states the verified SLA only; measured in the funnel |
| Award redesign temptation (scope creep) | 4–5 | The system stays; only photography, motion, and proof evolve |

## Effort summary

| Phase | Window | Code effort | Client effort |
|---|---|---|---|
| 0 Truth & assets | W1–2 | — | High (decisions + collection) |
| 1 Conversion core | W1–3 | 8–10 days | Low (approvals) |
| 2 Performance | W2–4 | 6–8 days | None |
| 3 Photography | W3–6 | 3–4 days | Medium (half-day shoot) |
| 4 Motion identity | W5–8 | 8–10 days | None |
| 5 Signature pieces | W8–12 | 10–12 days | Low (verification) |
| 6 Growth loop | W4→ | 1–2 days/month | Low, recurring |

Roughly **36–46 dev-days across twelve weeks**, with the client-side critical path
(Phase 0) fully parallel to the first two code phases.
