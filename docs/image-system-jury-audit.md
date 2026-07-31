# Image System Jury Audit

Review date: July 30, 2026

Status: read-only review and improvement plan. No production images, layouts, or source code were changed during this audit.

This is a synthetic jury review based on the current local build, production asset inventory, desktop and mobile screenshots, source usage, and the Awwwards benchmark. It predicts likely expert and customer reactions; it is not an official Awwwards score or a substitute for observed customer research.

## Executive verdict

The website shell is premium. The current image system is not yet award-level.

**Synthetic Awwwards-weighted image-system score: 6.6/10**

| Criterion | Weight | Score | Jury reading |
| --- | ---: | ---: | --- |
| Design | 40% | 7.2 | Strong composition, typography, palette, and several excellent project frames; exposure and grading are inconsistent |
| Usability | 30% | 7.4 | Text remains readable, but imagery is often sacrificed to heavy overlays and mobile crops |
| Creativity | 20% | 5.2 | Repeated images and shared hero templates make the experience feel assembled rather than art-directed route by route |
| Content | 10% | 5.8 | Authentic project images are valuable, but generated editorial imagery is overused and several proof images are semantically weak |
| Weighted total | 100% | **6.6** | Professional and attractive, but not yet distinctive or proof-rich enough for an award-level visual narrative |

The weighting follows Awwwards' published evaluation model: Design 40%, Usability 30%, Creativity 20%, and Content 10%. See the [official evaluation example](https://www.awwwards.com/sites/computerized-forms) and [Sites of the Year collection](https://www.awwwards.com/websites/sites_of_the_year/).

The largest gap is not a lack of effects. It is image authorship: the same small group of polished images is carrying too many unrelated stories.

## Jury composition

The review combined three independent lenses:

1. Senior art direction: exposure, composition, rhythm, route identity, originality, and award-level coherence
2. Customer trust: anxious storm homeowner, premium homeowner, price-conscious homeowner, commercial property manager, and mobile-first visitor
3. Asset forensics: production usage, exact and perceptual duplicates, source dimensions, responsive derivatives, compression, and provenance risk

## Evidence reviewed

- 21 built routes and their active image references
- 96 files in `public/assets`: 94 raster images and 2 SVG files
- 37 active production image files totaling 7.45 MiB
- 59 unused source/intermediate files totaling 50.16 MiB
- Desktop screenshots at 1440px and mobile screenshots at 390px
- Homepage 11-frame contact sheet
- Home, Services, service detail, About, Process, Projects, Reviews, Warranty, Financing, Service Areas, Contact, and Thank-you routes
- Current CSS exposure, crop, filter, and overlay treatments

There are no dangling production image references and no stale image copies in the build. Repository duplication is substantial, but the build correctly excludes the unused files.

## The decisive findings

### 1. The homepage hero is materially too dark

The hero source is already intentionally low-key, with mean thumbnail luminance around 28/255. The desktop treatment then adds a horizontal scrim from 98% black on the left to 18% on the right, plus a 58% bottom gradient. Mobile becomes heavier, including a 96% bottom gradient at the smallest breakpoint.

The copy remains readable, but roof texture, facade depth, landscaping, and architectural detail disappear. Desktop feels underexposed; mobile approaches a silhouette.

Decision: keep the current subject only as a temporary homepage-exclusive asset. Lift the image-side shadows and midtones, protect the warm windows, reduce the middle and right scrim, and create a separate mobile crop.

### 2. Four generic images dominate the visible site

Four editorial images occupy 31 of 45 visible content-image placements, or approximately 69%:

| Asset | Visible placements | Current problem |
| --- | ---: | --- |
| `hero-home.jpg` | 10 | Used for Home, Roof Replacement, Reviews, Service Areas, Barrington, Financing, Contact, and shared metadata/background roles |
| `roofer-inspection.jpg` | 9 | Repeated across Home, Services, Roof Repair, About, Process, FAQ, and Barrington |
| `storm-assessment.jpg` | 6 | Repeated across Home, Services, Storm Damage, and Barrington |
| `gutters-detail.jpg` | 6 | Repeated across Home, Services, Gutters, Warranty, and Barrington |

These images also share one polished, fictional-house visual universe. Individually they look refined. Collectively they reveal a thin image library and make secondary pages feel templated.

Decision: establish a one-role-per-image rule. No image may repeat as a major hero on unrelated routes. An image may repeat only inside one clearly documented case study.

### 3. Service detail pages repeat the hero image below the fold

Each service page currently uses `service.image` in the hero and then uses the same file again in the service-detail image block.

Decision: every service route needs at least two distinct visual roles:

- Hero: emotional or outcome-led
- Detail: diagnostic, material, installation, or process evidence

### 4. The proof message and the visual evidence conflict

The homepage says proof should be real rather than manufactured while displaying an editorial roofer image that is reused throughout the site. The Storm image depicts a pristine property rather than observable storm evidence. About and Process use a generic worker rather than the actual team or workflow.

Decision: trust-critical chapters must use verified people, projects, documents, vehicles, findings, and outcomes.

### 5. Projects is the strongest direction, but quality is uneven

The Projects hero, modern aerial, brick aerial, installation imagery, material delivery, and branded truck create the most credible and proprietary visual chapter.

The section loses quality in three places:

- The roof-ridge detail is visibly over-sharpened and still soft at display size.
- Commercial images are authentic but hazier and lower-resolution than the residential set; three frames appear to be one white-membrane project without being presented as a case-study sequence.
- Before/after composites are low-resolution and contain baked-in social-media typography that competes with the site's typography.

Decision: make Projects the source of the site's proof language, but improve its editing, sequencing, and metadata.

## Frame scores

| Frame | Score | Verdict |
| --- | ---: | --- |
| Homepage hero — desktop | 6.2 | Strong composition; house and roof are too dark |
| Homepage hero — mobile | 5.4 | Image nearly disappears beneath the crop and scrim |
| Homepage service grid | 6.2 | Attractive cards merge tonally and repeat the hero/service imagery |
| Proof chapter | 5.6 | Strong message, contradictory generic image |
| Storm chapter | 6.5 | Good mood and copy, weak evidence and repeated image |
| Projects hero | 8.2 | Best large-format visual frame |
| Residential portfolio | 7.6 | Strong aerial proof; one soft detail image |
| Commercial portfolio | 6.0 | Authentic but hazy, repetitive, and insufficiently varied |
| Transformations | 4.8 | Low-resolution composites and embedded typography feel amateur |
| Field-presence truck | 7.5 | Strong proprietary brand moment if representative and approved |
| Generic secondary-page heroes | 5.5 | Same layout and images weaken route identity |

## Active asset-family verdicts

### Editorial and generated imagery

| Asset | Verdict | Required action |
| --- | --- | --- |
| `hero-home.jpg` | Keep temporarily on Home only | Regrade, lighten selectively, create mobile crop, replace all secondary-route uses, and obtain a true 1920/2560 source |
| `roofer-inspection.jpg` | Replace | Use a verified company team member with clear compliant fall protection; do not place it beside proof claims |
| `storm-assessment.jpg` | Keep only as temporary atmosphere | Use once on the Storm route; replace homepage use with actual documented damage, inspection, or temporary protection |
| `gutters-detail.jpg` | Replace or restrict to Gutters | Export a proper 1200–1600px derivative from the larger source and stop using it for Warranty |

### Projects imagery

| Asset family | Verdict | Required action |
| --- | --- | --- |
| Tudor landscape V6 hero | Keep with provenance caveat | Preserve the original; confirm that landscape edits do not imply work outside the actual project scope |
| Modern residence aerial | Keep | Add a 1600px WebP candidate if the approved source supports it |
| Residential installation aerial | Keep temporarily | Valuable process proof but visibly softer; replace when a higher-resolution original is available |
| Brick residence aerial | Keep | Add a larger derivative if the approved source supports it |
| Dormer detail | Keep | Use as a material/detail counterpoint to aerials |
| Enhanced ridge detail | Replace | Do not sharpen further; use a naturally sharp close-up |
| Commercial crew | Keep | Present as part of one named case study and use a restrained natural grade |
| Commercial roof aerial | Keep | Present as the same case-study sequence or replace with a distinct property |
| Commercial top-down | Keep | Present as the same case-study sequence or replace with a distinct system |
| Material delivery | Keep | Strong logistics/process evidence |
| Residential before/after | Replace first | Current active file is only 480px wide and includes baked lettering |
| Commercial/aerial before/after | Rebuild | Use clean source halves and native HTML labels or an accessible comparison control |
| Branded truck | Keep and promote | Add the available 1536px derivative to `srcset`; pair with arrival, crew, inspection, or handoff photography |

## Route-by-route image plan

| Route or chapter | Current visual problem | Award-level replacement role |
| --- | --- | --- |
| Home | Dark universal house image and repeated service cards | Unique flagship completed property with copy-safe space; distinct problem-led service images |
| Services | Generic roofer hero plus repeated cards | Branded team or inspection overview that introduces the service system |
| Roof Replacement | Universal house image | Completed roof aerial or exterior outcome, paired with material/ventilation detail |
| Roof Repair | Same roofer image twice | Verified technician documenting an actual defect, paired with flashing/leak-source detail |
| Storm Damage | Same pristine storm image twice | Observable hail/wind/flashing evidence, property documentation, or temporary protection |
| Gutters & Exteriors | Same detail twice | Full exterior/gutter system hero, paired with downspout/edge/soffit detail |
| About | Generic roofer | Owner, leadership, team, local operation, and branded field presence |
| Process | Generic roofer | Inspection notes, scope review, protection setup, progress update, cleanup, and handoff |
| FAQ | Reused roofer | No large hero required, or use a restrained documentation/service image |
| Reviews | Universal house | Verified project/customer pairings and direct source context |
| Projects | Strong hero; mixed grid quality | Keep hero, remove soft detail, rebuild transformations, and structure commercial work as case studies |
| Warranty | Gutter image | Closeout documents, material registration, craftsmanship detail, or verified handoff |
| Financing | Universal house | Estimate review, option comparison, or material-selection planning without generic stock-finance imagery |
| Service Areas | Universal house | Barrington-area context, local project map, or recognizable verified local work |
| Barrington | Universal hero and repeated cards | One local case study with municipality, service, material, and outcome |
| Contact | Nearly invisible duplicate background | Branded vehicle arrival, real team welcome, or a clean low-noise form background |
| Social preview | Universal hero reused | Dedicated 1200×630 branded Open Graph image |

## Customer jury

| Persona | Score | Main trust reaction |
| --- | ---: | --- |
| Anxious storm homeowner | 6.4 | Clear actions help, but storm mood increases anxiety without enough real proof or response detail |
| Premium homeowner | 7.0 | Brand and best project images feel upscale; repeated staged imagery weakens bespoke credibility |
| Price-conscious homeowner | 5.7 | Free inspection is clear; Financing and Warranty imagery/content do not yet answer practical risk |
| Commercial property manager | 5.8 | Real commercial work helps; limited project variety and missing specifications reduce confidence |
| Mobile-first visitor | 7.2 | Strong actions and typography; oversized text and heavy overlays hide the visual story |

**Average customer image/trust score: 6.4/10.**

## Prioritized execution plan

### P0 — Fix the visible credibility breaks

1. Lighten the homepage hero without losing the nocturnal mood.
   - Lift the right-side image exposure and midtones approximately 10–15%.
   - Reduce the middle/right desktop scrim.
   - Create a separate mobile crop and a lighter mobile overlay.
   - Preserve a high-contrast text zone on the left.
2. Make the homepage hero exclusive to Home.
3. Remove every same-image hero/detail duplication on service pages.
4. Replace the soft ridge detail and both baked-text before/after composites.
5. Reframe the three white-membrane commercial images as one explicit case study until additional commercial projects are available.
6. Create an asset registry with image, route, role, provenance, project, crop, source dimensions, release status, and quality score.

### P1 — Replace trust-critical generic imagery

Replace in this order:

1. About: owner/team/local operation
2. Process: real multi-step field sequence
3. Roof Repair: branded technician and observable condition
4. Storm: real damage/documentation/mitigation evidence
5. Reviews: verified project and customer proof
6. Service Areas/Barrington: local proof and context
7. Warranty: closeout and documentation
8. Financing: planning and option comparison
9. Contact: branded arrival or real team

### P2 — Turn Projects into the site's proof engine

1. Convert featured work into case studies with municipality, service, roof system/material, scope, duration, challenge, process, and verified outcome.
2. Alternate visual scale: exterior, aerial, human process, material detail, vehicle/logistics, and final outcome.
3. Rebuild before/after interactions with clean originals and native site controls.
4. Apply a consistent natural grade with open shadows, protected highlights, realistic greens, and warm brand accents.
5. Preserve original documentary files and approve every materially edited derivative against the original.

### P3 — Technical image system

1. Correct intrinsic `width` and `height` values; 27 rendered image occurrences currently differ from the source ratio by more than 1%, with a worst mismatch of approximately 20.5%.
2. Stop upscaling `gutters-detail.jpg` and `storm-assessment.jpg`.
3. Promote available higher-resolution truck and project candidates.
4. Add route-specific `<picture>` sources and mobile crops.
5. Move source PNGs, factual originals, and final editing masters to a controlled non-public provenance archive.
6. Retire exact duplicate and obsolete intermediates from `public` after approval. Approximately 50 MiB can be moved without changing the deployed site.

## Image governance rules

1. One major role per image.
2. No image repeated as a hero on unrelated routes.
3. No hero image repeated as a detail image on the same page.
4. No generated or materially altered image presented as documentary proof.
5. Projects labeled “Real Work” must retain a factual original and an approved edit record.
6. Landscaping, architecture, roof conditions, materials, branding, safety equipment, and people may not be synthesized in a way that changes the implied project scope or outcome.
7. Real work leads the proof layer; generated atmosphere is supporting editorial material only.
8. Every image must pass desktop and mobile crop review.
9. Every image must have a semantic job: aspiration, diagnosis, process, material, outcome, people, local proof, or conversion.
10. No image below 7.5/10 in the final jury may enter a primary placement.

## Acceptance gate

The image system is ready for a final award-level review when:

- The homepage hero reveals clear roof and facade detail on desktop and mobile.
- No unrelated route shares a major hero.
- Every service page has distinct hero and detail imagery.
- About and Process show real people and operations.
- Storm imagery shows truthful evidence rather than generic weather mood.
- Projects contains no soft upscales or baked social-media typography.
- Commercial work is either varied or clearly organized as one case study.
- All materially edited project images have approved original-to-final comparisons.
- Route-specific crops, intrinsic dimensions, and responsive sources are correct.
- The repeated four-image editorial set accounts for less than 20% of visible content-image placements.

## Execution status — July 30, 2026

Implemented in this pass:

- Lifted the existing Home hero through restrained presentation treatment and added a dedicated deterministic mobile crop without altering the property.
- Assigned route-specific hero sources and mobile crops to the core service routes.
- Removed same-page hero/detail duplication and replaced the repeated detail slot with a code-native evidence panel.
- Reframed the commercial white-membrane photography as one documented sequence.
- Removed the soft roof-detail card and the public-facing production/debug language from Projects.
- Replaced the older field-vehicle placement with the higher-resolution pickup supplied for this review.
- Rebuilt Reviews around direct BBB and GAF source links instead of reusing a project image as decorative proof.
- Added two short, source-linked BBB review excerpts plus the current BBB accreditation/rating signal; the GAF contractor profile remains directly linked.
- Converted Financing, Service Areas, and Contact to deliberate text/graphic compositions where no honest, distinct documentary image was available.
- Removed the reused commercial crew image from Process and replaced it with a code-native five-step first-fold rail.
- Reclassified the newer pickup as an owner-supplied fleet presentation, separated it from project-outcome proof, and added a landscape mobile derivative.
- Shortened Home by removing a duplicate project-proof band and moved the independent BBB signal earlier in the remaining flow.
- Kept Financing out of the search index until a real provider, program, and application path can be published.
- Added source dimensions, responsive `<picture>` sources, a provenance register, and an automated image-quality gate.
- Delayed the mobile conversion bar until the visitor has moved beyond the first hero decision.

Remaining acquisition gaps are intentional rather than substituted: verified roof-repair detail, observable storm damage, a real financing/planning interaction, a warranty handoff, and a permissioned customer/project review pair.
