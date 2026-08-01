# Sprint Report — 2026-08-01 Agentic Sprint

Executed per `sprint-plan-8h.md` against the baseline in
`design-review-2026-07-31.md` (7.6/10) and `baseline-2026-07-31.json`.
Five waves, five parallel/sequenced agents plus orchestrator integration work,
every merge behind the gate suite (`npm test` + overflow + vitals + visual review).

## What shipped

| Wave | Delivered |
|---|---|
| 0 | Audit harness in-repo (`npm run audit`: frames / overflow / vitals with budgets), baseline metrics |
| 1A | Trust band rebuilt (BBB + IL license marks, two verified quotes, verified-slot system), 3-project real work strip, financing/warranty band, five craft-debt fixes, flagged-off founder section |
| 1B | Self-hosted WOFF2 fonts (Bebas + variable Montserrat), preload, measured `size-adjust` fallbacks (59.2% / 114%), hero clamp fix — Google Fonts dependency and clipped-tagline first paint eliminated |
| 1C | WebP pipeline (45 derivatives, content-hash manifest), build-time `<picture>` transform, 900 KiB homepage payload gate in `npm test` |
| 2 | Motion identity — "the gold line draws the work": session-once hero reveal (LCP-protected), gold divider draws + numeral rises, magnetic primary CTA (hover-gated), quiet utility motion, cross-document View Transitions; reduced-motion and no-JS parity proven by capture |
| 3 | All four service cards AND all four service detail heroes now graded real archive photography (one deterministic treatment); factual captions replace "illustrative" labels; provenance register updated |
| 4 | Two scroll-narrative case studies (`/projects/tudor-exterior-transformation/`, `/projects/commercial-flat-roof/`) built strictly from register-supported material; sticky media rail desktop, stacked mobile; the Tudor study's "record vs presentation cut" section turns provenance discipline into a visible trust feature |
| 5 | CSS minification (131→102 KB) + gzip preview transport; final certification; this report |

Dropped by the clock rule: the exploded roof-system SVG diagram (stretch).

## The numbers

| Metric (slow-4G, 4× CPU, 390×844) | Baseline | Shipped |
|---|---|---|
| Homepage LCP, font host unreachable | 13,164 ms | **1,428 ms** |
| Service page LCP | 13,128 ms | **1,112 ms** |
| Contact LCP | 13,116 ms | **1,140 ms** |
| CLS (all routes measured) | 0 | **0** |
| Homepage image payload (referenced) | ~2,331 KiB | **809 KiB** (gate: 900) |
| Homepage transfer, mobile throttled | 541 KB | **294 KB** |
| Horizontal overflow, 19 routes × 2 viewports | 0 | **0** |
| Third-party requests | 1 render-critical (Google Fonts) | **0** |
| Pages | 26 | 28 |
| AI-generated images in conversion path | 6 | **1** (homepage hero — deliberate, pending real shoot; see launch checklist) |

Baseline vitals reflect the fonts-blocked worst case (render-blocking third-party
CSS); on unimpeded networks the baseline was faster than 13 s, but that failure
mode existed and is now structurally impossible.

## Integration defects caught by the gates (the reason the gates exist)

1. Combined image branches breached the payload budget (1,218 KiB) though each
   was green alone → strip re-referenced to 640w variants (670 KiB, better than
   either branch).
2. Variable-font metrics blew a mobile grid track 27px past its shell →
   class-level `min-width: 0` guard on layout-grid children.
3. Longest CTA label overflowed at 390px under the new nowrap rule → buttons
   wrap below 480px only.
4. Motion + case-study CSS pushed throttled LCP to 2,328 ms → minification +
   compression-aware preview; LCP landed better than pre-motion.
5. A leftover preview server from an agent worktree served stale builds to
   captures → audit harness now always spawns its own server on a private port.

## Re-score (same rubric as design-review-2026-07-31.md)

Self-scored by the same reviewer that set the baseline; a blind re-score by a
fresh session is recommended before quoting these numbers externally.

| Frame / surface | Was | Now | Why |
|---|---|---|---|
| Hero | 8.5 | 9.0 | Reveal choreography + drawn gold rule; capped by the AI hero photo |
| Intent triage | 8.0 | 8.2 | Rhythm normalized, numeral rises |
| Services | 8.0 | 8.6 | Real photography, motion |
| Selected work | 7.5 | 8.6 | Three real projects, case-study depth behind it |
| Working standard | 7.5 | 7.8 | Numeral motion; pattern repetition remains |
| Storm split | 8.5 | 8.6 | Overflow fixed |
| Trust band | 6.0 | 8.0 | Real proof, real quotes; capped by two quotes + no faces |
| FAQ | 7.5 | 7.8 | Path to full FAQ |
| CTA + footer | 8.0 | 8.2 | Pattern opacity balanced |
| Homepage journey | 7.8 | **8.4** | |
| Mobile journey | 8.5 | **8.7** | Faster, wrap-proof, sticky bar untouched |
| Projects surface | 8.0 | **8.8** | Case studies are the site's strongest asset now |
| Reviews page | 6.5 | 6.8 | Structurally shared with trust band; still content-thin (client-blocked) |
| Photography (system) | 6.5 | 8.0 | One graded real voice everywhere but the hero |
| Motion (system) | 5.5 | 8.0 | A signature, executed with restraint and full a11y parity |
| Performance/craft | 7.5 | 8.8 | Measured, gated, enforced in CI |
| Trust architecture | 6.5 | 7.5 | Real marks + quotes; faces and counts remain client-blocked |

**Awwwards-style composite: Design 8.1 · Usability 8.6 · Creativity 7.6 ·
Content 8.8 → weighted 8.2. Overall: ~8.3** (sprint target was 8.4–8.6; the
gap to target is exactly the client-blocked content — review depth and faces —
plus the dropped stretch piece).

## What the site still needs from its owner

See "Owner decisions required" in `launch-checklist.md`: phone/tagline canon,
Tudor retouch disclosure policy, homepage hero shoot, founder section assets,
review pipeline. None of these are code.
