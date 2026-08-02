# 8-Hour Agentic Sprint Plan

Operational brief for executing the master plan (`master-plan-2026-07-31.md`) in a single
8-hour agentic coding session. This document is the working contract for every agent in
the sprint: scope, file ownership, guardrails, gates, and the clock.

## What compresses into 8 hours — and what cannot

**In scope (code-provable):** all of Phase 1 that doesn't require new client assets,
all of Phase 2 except full critical-CSS inlining, the code half of Phase 3 (grading +
swaps + provenance captions), all of Phase 4 (motion identity), Phase 5's case-study
system built from the existing verified archive, and the audit tooling from Phase 6.

**Out of scope (integrity- or client-blocked — build the slots, never the content):**

| Item | Why | What ships instead |
|---|---|---|
| New named reviews with photos | Only two publishable quotes exist in repo data | Trust band ships with BBB + license + the two real quotes + platform links; extra quote slots render only when `verified: true` data lands in `data.mjs` |
| Founder/team faces | No portrait assets exist; fabricating people is forbidden | Founder-moment section built behind a data flag, hidden until a real portrait + approved line exist |
| Phone/tagline canon | Client decision (wrap says 224-500-4825 / site says (224) 500-6825) | Untouched; flagged in launch checklist |
| Live form endpoint, analytics IDs | Client accounts | Honest no-endpoint fallback stays |
| AVIF encoding | No native encoder in a dependency-free build | WebP via headless-Chromium canvas (fits the house style — scripts already drive Chrome); JPEG fallback retained |
| "9.0 award-ready" | Requires real people, real reviews, a shoot | Honest target for this sprint: **8.4–8.6** |

## Hard guardrails (every agent, every wave)

1. **Never fabricate**: no invented reviews, names, faces, ratings, counts, or claims.
   All new copy must be derivable from `data.mjs`, the claims registry, or existing pages.
2. **Dependency-free stays dependency-free**: no npm packages, no third-party JS.
   Build-time Chromium (already the house pattern) is the only tool allowed.
3. **Don't touch**: the phone number, the tagline, the IA/navigation, `_redirects`,
   legal pages.
4. **Reduced motion is a peer, not an afterthought**: every animation lands with its
   `prefers-reduced-motion` state in the same commit.
5. **Green gates or no merge**: `npm test` + frame capture diff + overflow audit must
   pass before any wave merges to the sprint branch.

## Verification harness (built first, used by every wave)

New scripts, committed in Wave 0, spawning the container's Chromium over CDP:

- `npm run audit:frames` — captures the homepage frame-by-frame (desktop + mobile) and
  above-the-fold for all key routes into `screenshots/`; used for visual diff review.
- `npm run audit:overflow` — element-vs-viewport overflow scan across all routes at
  1440/390 (from this review's tooling).
- `npm run audit:vitals` — throttled LCP/CLS smoke on `/`, `/services/roof-replacement/`,
  `/contact/`; budgets: LCP < 2.0 s emulated 4G, CLS < 0.05.
- `npm run audit` — all three. The sprint's merge gate is `npm test && npm run audit`.

## The clock

### Wave 0 — Harness + baseline (0:00–0:30, orchestrator)
Commit audit tooling; capture and commit baseline screenshots; stage task list.
**Gate:** harness runs clean on the untouched site.

### Wave 1 — Three parallel agents in isolated worktrees (0:30–2:15)

File ownership is exclusive per agent — no shared writes; the orchestrator merges
sequentially (A → B → C), running the gate after each merge.

- **Agent A — Conversion core.** Owns `src/pages.mjs`, `src/templates.mjs`, and an
  appended, clearly-marked section of `src/styles.css`.
  Trust band rebuild (BBB + IL license + both real quotes + platform links + verified-slot
  system); homepage "Selected work" → 3-item strip from the real archive; financing +
  warranty band linking to existing pages using only existing claims; craft-debt sweep
  (projects-button wrap, intent-card 05 rhythm, FAQ section link, storm eyebrow
  alignment, footer pattern opacity −15%); founder-moment section behind data flag.
- **Agent B — Fonts + resilience.** Owns `public/assets/fonts/` (new), the `<head>`
  builder in `src/templates.mjs` (coordinated: B patches only the head function — merged
  after A), and the `:root` token block of `src/styles.css`.
  Self-host Bebas Neue + Montserrat as WOFF2 with `preload`; `size-adjust`-tuned local
  fallback faces so the pre-font paint cannot clip "BUILT ABOVE STANDARD."; hero clamp
  floor lowered under 400 px; Google Fonts requests removed entirely.
- **Agent C — Image pipeline.** Owns `scripts/` (new `encode-images.mjs`) and image
  reference plumbing in `scripts/build.mjs`.
  Chromium-canvas WebP derivatives with content-hash caching; `<picture>`/`srcset`
  emission; `fetchpriority="high"` + explicit dimensions on hero images; homepage image
  payload budget < 900 KB enforced as a new `check.mjs` rule.

**Gate at 2:15:** `npm test && npm run audit` green; homepage payload verified < 900 KB;
fallback-font capture shows no clipping.

### Wave 2 — Motion identity (2:15–4:15, one builder + one verifier)

One agent builds (single design voice matters for motion): hero reveal (photo ease from
96 %, 3-step headline stagger, gold rule draws under "STANDARD.", once per session);
gold-line draw along section dividers on scroll; gold numeral count-up on 01–05 blocks;
roofline-angle clip-path reveals on project imagery; magnetic gold CTA; sliding nav
underline; accordion easing; cross-document View Transitions (`@view-transition`
progressive enhancement — unsupported browsers unchanged).
A second agent verifies in parallel at 3:45: captures with animations mid-flight, with
`prefers-reduced-motion`, and re-runs vitals (motion must not move LCP/CLS).
**Gate at 4:15:** signature appears in exactly three placements; reduced-motion parity
frame-identical to static design; vitals unchanged.

### Wave 3 — Photography honesty pass (4:15–5:30, one agent)

Chromium-canvas grading script (one treatment: lifted cool shadows, warm gold highlights)
applied to the strongest real archive frames; replace the four AI-reading editorial
service cards with graded real crops; extend the Projects provenance chips into a
site-wide caption standard driven by the image-provenance register.
**Gate:** no AI-generated imagery remains in the homepage conversion path; register
updated; visual diff approved.

### Wave 4 — Case studies (5:30–7:00, two parallel agents + stretch)

Case-study template (scroll narrative: before → field protocol → documentation →
verified outcome; sticky media rail desktop, stacked mobile) + two instances from
verified archive material only (the Tudor exterior transformation; the commercial flat
roof). Homepage and Projects wiring. Sitemap/schema updates.
**Stretch — only if the 6:15 gate is green:** "The system, explained" exploded SVG
roof-system diagram assembling on scroll.
**Gate at 7:00:** both case studies pass `npm run check` (metadata, headings, links,
claims); every image traceable in the provenance register.

### Wave 5 — Full re-audit + ship (7:00–8:00, orchestrator)

Full `npm test && npm run audit`; fix regressions only (no new features past 7:00);
re-score against the review rubric; update `launch-checklist.md` with what changed and
what still blocks launch; final commit and push; before/after artifact refresh.

## Mobile contract (binding on every wave)

Mobile (390 px) is the primary surface — it carries the emergency traffic and already
holds the site's best score (8.5). Nothing merges that lowers it.

- **Every gate is dual-viewport by construction**: frame capture, overflow audit, and
  vitals all run at 1440 *and* 390; the vitals budget is measured on throttled 4G —
  i.e., the mobile case is the budget.
- **Wave 1A**: the trust band stacks (marks row first, quotes after, max two visible);
  the 3-project strip becomes a CSS scroll-snap row — no JS carousel; new sections
  reserve bottom padding for the sticky call bar and never occlude it.
- **Wave 1B is a mobile fix in disguise**: the clipped "BUILT ABOVE STANDAR" first
  paint only occurs at phone widths — size-adjust fallbacks + the lower clamp floor
  close a mobile-only failure state.
- **Wave 1C**: `srcset` + portrait mobile crops (the existing 800×1000 editorial-v2
  pattern) mean phones stop downloading desktop-sized images — the single biggest
  mobile LCP lever in the sprint.
- **Wave 2**: hover-dependent effects (magnetic CTA, card hovers, nav underline slide)
  gate behind `@media (hover: hover) and (pointer: fine)`; touch gets tap/active
  states instead. All scroll-linked motion is compositor-only (transform/opacity).
  The hero reveal shortens to ~0.9 s on mobile — phone users scroll immediately.
  Motion cannot merge if it moves the throttled-mobile LCP/CLS numbers.
- **Wave 3**: replacement service-card images ship with art-directed portrait crops via
  `<picture>` media queries, keeping subjects centered at full-bleed card widths.
- **Wave 4**: the stacked mobile flow is the *default* layout of the case-study
  template; the desktop sticky rail is the enhancement. No scroll-jacking on touch,
  ever.
- **Wave 5**: the re-score explicitly re-walks the full mobile frame set (hero → nav →
  triage → trust → CTA → footer) against the 8.5 baseline; a mobile regression is a
  ship blocker even if desktop improved.

## Definition of done

- `npm test` green including the two new gates (payload budget, vitals smoke).
- Zero overflow at 1440/390 with production *and* fallback fonts.
- Reduced-motion parity verified by capture.
- No fabricated content anywhere; claims registry consistent.
- Internal re-score ≥ 8.4 with the same rubric as `design-review-2026-07-31.md`.
- Every wave merged as its own commit series on this branch, pushed.

## Orchestration mechanics

Parallel agents run in isolated git worktrees and never share file ownership within a
wave; the orchestrator merges in a fixed order and runs the gate between merges, so a
regression is always attributable to exactly one merge. Baseline screenshots from Wave 0
are the diff reference all day. If a wave overruns its box by more than 20 minutes, its
unfinished items drop to the stretch list — the clock, not the backlog, is the authority.
