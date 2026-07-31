# Frame-by-Frame Design Review — 2026-07-31

Independent review of the built site (commit `dd8c9f5`) against award-winning web standards
(Awwwards/CSSDA-level criteria: design 40%, usability 30%, creativity 20%, content 10%),
read through two lenses: **brand manager** (attention, trust, differentiation, conversion)
and **expert website designer** (typography, layout, art direction, motion, craft).

Method: the site was built (`npm run build`), served locally, and captured headlessly at
1440×900 (desktop, frame by frame through the full homepage scroll), 390×844 @2x (mobile,
full scroll plus open navigation), and full-page renders of 12 interior routes. Brand
webfonts (Bebas Neue, Montserrat) were installed into the render environment so captures
reflect production typography. A programmatic overflow audit ran across 17 routes at desktop
and mobile viewports. The project's own gates (`npm test` — build, metadata/heading/link checks,
image dimension checks) pass clean.

Scores are 1–10. 8+ is competitive with award-submission work; 9+ is Site-of-the-Day
territory.

---

## Verdict up front

**Overall: 7.6 / 10 — a top-tier contractor site, roughly “Honorable Mention” class;
not yet a Site-of-the-Day contender.**

Against the real competitive set (Greater Chicago roofing contractors), this site is in
the top few percent: disciplined black/gold system, a distinctive monogram identity,
genuinely excellent copywriting, and a conversion architecture (intent triage, three-step
form, sticky mobile call bar) that most contractors never reach. The five-second test
passes: who, what, where, and the next step are all answered above the fold, with a
premium mood that matches the "Built Above Standard" promise.

What separates it from award-winning work is concentrated in three areas:

1. **Motion and interaction identity.** Award juries expect a signature kinetic idea —
   scroll choreography, a hero reveal, meaningful hover states. The site's reveal-on-scroll
   fades are competent hygiene, not identity.
2. **Social proof depth.** Two anonymous-style quotes and a BBB card are the entire
   visible proof layer. Award-level trust design shows faces, names, counts, ratings,
   and third-party marks in context.
3. **Photographic consistency.** Real documentary work (Tudor project, fleet, aerials)
   sits next to editorial images that read as AI-generated on inspection. The mixed
   provenance is noticeable at this polish level and is the single biggest brand-trust
   risk on the site.

---

## Homepage, desktop — frame by frame (1440×900)

### Frame 1 — Hero · **8.5**
Dusk photography of a premium home, two-line Bebas Neue statement with "STANDARD." in
gold, clear subhead, gold primary + ghost secondary CTA, utility bar carrying the license
number and phone, trust-chip strip entering at the fold.
- **Works:** instant category and quality read; license number above the fold is a quiet
  trust masterstroke; CTA hierarchy is unambiguous; the vertical "EXPLORE" affordance is a
  nice editorial touch.
- **Holds it back:** static presentation (no motion moment, no video/parallax); the house
  photo reads stock/AI rather than a real Raccoon project — on brand promise, the hero
  should be *their* work; Bebas+Montserrat is a ubiquitous free pairing at award level.

### Frame 2 — "What brings you here?" intent triage · **8.0**
Five numbered jobs-to-be-done cards (active leak → gutters) routing users by situation.
- **Works:** genuinely user-centered IA that almost no contractor attempts; copy is
  concrete; sentence-case editorial headline against all-caps cards gives rhythm.
- **Holds it back:** card 05's number-to-title spacing breaks the vertical rhythm of
  01–04; cards have no imagery or hover state in the static frame, so the row reads
  slightly austere after the rich hero.

### Frame 3 — Services ("Protection from the roofline down.") · **8.0**
Four photo cards with numbered Bebas titles and "Explore service" links on dark ground.
- **Works:** strong headline; consistent moody art direction; scannable card anatomy.
- **Holds it back:** the roofer/inspector images read AI-generated on close look (harness
  and tool details); monogram background pattern is slightly loud behind the section head.

### Frame 4 — Selected work · **7.5**
Split layout: large autumn aerial of an in-progress install; "SEE THE SYSTEM TAKING
SHAPE." right rail with a projects CTA.
- **Works:** real, credible field photography; "documented from installation through
  completion" is a differentiating claim; asymmetric layout is the most editorial moment
  on the page.
- **Holds it back:** the bright red/autumn palette of this one image sits outside the
  black/gold world and momentarily breaks the spell; the "Explore our projects" button
  label wraps to three lines (button min-width needed); only one project is shown where a
  jury expects a 2–3 item taste.

### Frame 5 — "What above standard looks like." · **7.5**
Cream section, five numbered working-standard columns, process CTA.
- **Works:** the promise is operationalized into five verifiable behaviors — excellent
  brand-to-proof translation; cream/dark alternation paces the page well.
- **Holds it back:** third use of the same numbered-column pattern on one page; template
  fatigue sets in mid-scroll; descriptions hug the column width unevenly.

### Frame 6 — Field protocol / storm guidance split · **8.5**
Dark split: numbered storm protocol left; gold headline "Storm damage is stressful. Your
contractor should not be." right, with public-adjusting explanation and CTA.
- **Works:** the best copy on the site — empathetic, specific, category-elevating; the
  two-tone gold/white type treatment is the page's most memorable typographic moment;
  protocol list is calm and useful.
- **Holds it back:** the "FIELD PROTOCOL" eyebrow floats mid-column with dead space above;
  the left/right columns don't share a top edge, so the frame feels one notch under-composed.

### Frame 7 — Local accountability / BBB · **6.0** ← weakest frame
"Barrington based. Greater Chicago focused." headline with a single BBB A+ card.
- **Works:** honest sourcing ("verify at the original source") is admirable and unusual;
  BBB A+ is a real asset.
- **Holds it back:** this is the trust section of the page and it is nearly empty — one
  card, no reviews, no ratings count, no logos row, no faces; the layout leaves a large
  hole bottom-left; conversion-critical proof is deferred to a subpage.

### Frame 8 — FAQ ("Answers before the inspection.") · **7.5**
Three accordions, first open by default.
- **Works:** first-item-open is correct; questions are the real top three; copy is tight.
- **Holds it back:** only three questions with a mostly empty left column — the section
  under-delivers against its own headline; no link to the full FAQ page from the section.

### Frame 9 — Final CTA + footer · **8.0**
"READY TO BUILD ABOVE STANDARD?" with stacked quote/call CTAs; monogram-pattern footer
with full sitemap, license, contact, legal links.
- **Works:** the Vuitton-style monogram field is the boldest brand move on the site and
  lands as luxury texture; footer IA is complete; license repeated; accessibility page
  linked.
- **Holds it back:** pattern opacity slightly competes with link legibility; CTA block
  right-aligns against a lot of dark empty space.

**Homepage desktop journey: 7.8** — front-loaded excellence (frames 1–6) with a soft
back half (7–8) exactly where proof should peak.

---

## Homepage, mobile (390×844 @2x) · **8.5**

- Hero scales correctly with the production font; "BUILT ABOVE STANDARD." fits with
  drama intact. Trust chips follow immediately.
- **Sticky bottom bar (Call now / Free quote) is the single best conversion decision on
  the site** — always-on thumb-reach contact.
- Open navigation is exemplary: Call and Quote CTAs first, then six items with chevrons;
  generous targets; clean overlay.
- Section stacking, card scale, and the field-protocol list all read comfortably; no
  clipped or cramped frames observed across the 15-frame scroll.
- Watch item: with `font-display: swap`, the pre-font first paint uses wide system
  fallbacks at the `clamp()` floor (80px), which overflows the 390px viewport and clips
  the tagline to "STANDAR" until Bebas arrives — visible on slow connections or if
  Google Fonts is unreachable. Self-hosting with preload plus a `size-adjust`-tuned
  fallback face (or a lower clamp floor at ≤400px) removes the risk.

---

## Interior pages (desktop)

| Page | Score | Reading |
|---|---|---|
| Services hub | 8.0 | Confident typographic hero, gold rule, breadcrumbs, active-nav state. Clean but image-less relative to siblings. |
| Roof Replacement | 8.5 | Best commercial page: split hero with captioned photo, checkmark scope chips, dual CTA, complete anatomy. |
| Storm Damage Restoration | 8.0 | Same skeleton, strong claims-advocacy content carried over. |
| Projects | 8.0 | Real-work portfolio in four categories with captioned grids ("Scale. Shape. Finish.", "Logistics are part of the work."). The strongest authenticity asset on the site. Large dark gap observed pre-footer in full-page render (see audit note). |
| About | 7.5 | Cohesive narrative + the branded Rivian fleet photo (a premium differentiator worth far more homepage exposure). Missing: any human face, name, or history — an about page without people caps trust. |
| Process | 8.0 | "From first look to final walkthrough." + Inspect/Explain/Plan/Build/Verify chips — clear and ownable. |
| Reviews | 6.5 | "Trust is easier to verify." is a great line, but proof is two short quotes + BBB. No ratings, counts, dates, platforms, or faces. The headline promises more than the page delivers. |
| Service areas | 8.0 | "Regional reach. One accountable team." + address-check CTA is smart functional conversion. |
| Resources hub + articles | 7.5 | Four original guides, honest editorial. Good SEO base; visual treatment is plainer than the rest of the system. |
| Contact / quote | 8.5 | Three-step form starting with the property address is textbook friction reduction; step indicator, honest no-endpoint fallback with phone handoff, contact rails. |
| FAQ | 7.5 | Clean accordions; consistent hero. |

---

## Brand system

| Aspect | Score | Notes |
|---|---|---|
| Identity / logo system | 8.0 | Crowned raccoon monogram is memorable, ownable, and confidently deployed (header, footer field, favicon). Slight kitsch risk is managed by the restrained palette. |
| Color | 8.0 | Black / gold / cream triad held with discipline across 26 pages; gold reserved for emphasis and action. |
| Typography | 7.0 | Bebas Neue + Montserrat executes well (scale, tracking, hierarchy) but is a commodity pairing seen on thousands of sites; award identity usually needs a more proprietary voice, and Bebas's all-caps-only character limits nuance. |
| Photography | 6.5 | Split personality: authentic documentary (projects, fleet, aerials) vs. editorial images that read as AI-generated. At this polish level the seam shows; provenance discipline exists in docs, the visual seam remains. |
| Voice / copy | 9.0 | The standout. "Built above standard" is systematized through every section; "Storm damage is stressful. Your contractor should not be." and "Trust is easier to verify." are award-grade lines. Honest, concrete, unhyped. |
| Motion / interaction | 5.5 | Reveal-on-scroll fades and hover states only; respects reduced-motion (good), but there is no kinetic signature — the largest single gap to award level. |
| Trust architecture | 6.5 | License, BBB, honest disclaimers: strong compliance spine. Thin humanity: no faces, names, review volume, or platform marks. |
| Performance / craft | 7.5 | Dependency-free static build, semantic checks green, structured data, honest form states. Homepage carries ~1.9 MB of JPEG imagery (cards 300–344 KB each, no AVIF/WebP on the homepage set) and a render-critical Google Fonts dependency. |

**Awwwards-style composite:** Design 7.5 · Usability 8.0 · Creativity 6.5 · Content 8.5
→ **7.6 weighted.**

---

## The brand manager's answer: "Is it good enough to grab attention?"

**Yes — for its actual market.** In a row of Chicago-area roofing sites it wins the
five-second test decisively: premium mood, clear promise, licensed and phone-forward,
obvious next step on every screen size. The people it needs to convert (homeowners with
a leak, a storm, an aging roof) are routed by their own situation within one scroll.

**Not yet — against award-winning company.** The site is composed rather than choreographed;
proof is asserted rather than shown; and the imagery seam undermines the "real work,
documented" positioning at exactly the moment a discerning visitor checks.

---

## Prioritized recommendations

**Now (days) — conversion and integrity**
1. Rebuild the homepage trust frame (frame 7): review count + rating, 3–4 named quotes
   with photos where releases allow, BBB + license + any manufacturer marks in one proof
   band. This is the highest-leverage frame on the page.
2. Put a face on the brand: owner/team portrait and first-person line on About and in the
   homepage flow. Faceless premium services stall at the estimate stage.
3. Fix the "Explore our projects" button wrap (min-width / no-wrap).
4. Normalize intent-card 05 spacing to match 01–04.
5. Surface financing and warranty (pages already exist) as one homepage band — both are
   deciders for replacement-scale tickets.
6. Verify the phone number: the fleet wrap in the Projects photography reads
   **224-500-4825** while the site uses **(224) 500-6825** (and the wrap tagline "We don't
   follow industry standards, we set them" differs from "Built above standard"). If these
   are tracking numbers, fine — confirm; if not, one of them is wrong in public.

**Next (weeks) — performance and resilience**
7. Self-host Bebas/Montserrat with `preload` + `size-adjust` fallback metrics (removes
   the slow-connection clipped-tagline state and the Google Fonts single point of failure);
   or drop the hero `clamp()` floor under 400px.
8. Convert homepage imagery to AVIF/WebP with responsive `srcset`; target < 1 MB above
   the JS/CSS line. Hero LCP image deserves `fetchpriority="high"`.
9. Replace the four AI-reading editorial service images with graded frames from the real
   project archive (the Tudor and aerial material is strong enough).

**Later (quarter) — the award gap**
10. Commission one signature motion idea and apply it in three places max: hero reveal
   (roofline draws in / dusk-to-lit windows), scroll-linked project reveals, magnetic CTA
   hover. One idea, executed deeply, beats scattered effects.
11. Evolve the display face toward something ownable (a licensed condensed grotesque with
    a distinctive voice, or a customized Bebas with bespoke details) while keeping the
    black/gold system.
12. Build 2–3 case studies as scroll narratives (before → protocol → documentation →
    verified outcome) — the "documented" positioning turned into an experience; this is
    the piece juries would remember.

---

## Capture and audit notes

- Full frame sets captured at 1440×900 and 390×844@2x with production webfonts; open
  mobile nav captured separately.
- Programmatic overflow audit (element bounding box vs viewport, 17 routes × 2
  viewports, headings/copy/links/buttons/list items): **zero horizontal overflow** with
  production typography. With fallback fonts active (webfonts blocked), the hero and
  section display type does overflow the 390px viewport and the tagline clips to
  “BUILT ABOVE STANDAR” — the basis of recommendation 7.
- Full-page renders of `/projects/` showed a large empty dark band before the footer.
  Mid-scroll verification captures confirm all four portfolio sections (including
  “04 · A brand that shows up.”) render correctly on normal scrolling — the band is an
  artifact of reveal animations under synthetic full-page capture, not a site defect.
