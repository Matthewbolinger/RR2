# Editorial V2 Image Provenance Register

Created: July 30, 2026

Scope: `public/assets/editorial-v2/`

## Branded social preview

| Asset | Source | Treatment | Status |
| --- | --- | --- | --- |
| `public/assets/social-preview-backdrop-v1.png` | Original image generated for this project with OpenAI image generation on 2026-07-30 | Text-free charcoal roof texture with gold edge light; retained as the project-bound source backdrop | Approved source |
| `public/assets/raccoon-restoration-social-preview.png` | Deterministic 1200×630 composition of the generated backdrop and the approved transparent horizontal logo | Adds exact brand mark, “Built Above Standard,” Greater Chicago positioning, and Barrington headquarters line without AI-rendered lettering | Approved production asset |

This register covers the first route-specific image candidates created while executing the image-system jury plan. All derivatives use deterministic center cropping and resizing only. No generative fill, object removal, landscaping changes, sharpening, color grading, or factual alteration was applied.

## Status rules

- **Candidate — owner verification required:** derived from a file the owner supplied as company project or vehicle media. Confirm the project, usage rights, people/property release, and location before publishing.
- **Owner-supplied presentation:** the owner supplied and identified the subject as company brand/vehicle material. It may support a clearly separated brand-presentation role, but it is not treated as project-outcome proof.
- **Conditional editorial only:** the source is known or suspected to be generated/editorial. It may support atmosphere after owner approval, but it must not be labeled or implied as documentary “Real Work.”
- **Missing:** no semantically honest, production-quality source was available. No substitute was invented.

## Route mapping

| Route | Status | Desktop candidate | Mobile candidate | Intended role | Approval caveat |
| --- | --- | --- | --- | --- | --- |
| Home | Conditional editorial only | Existing `public/assets/images/hero-home.jpg` | `home-hero-mobile-800x1000.jpg` | Primary brand atmosphere | The mobile asset is a crop of the existing approved composition; neither version is labeled as project proof |
| Roof Replacement card + detail hero | Conditional editorial only | `roof-replacement-premium-service-card-1280.jpg` | Card uses `-640`; mobile hero crops the 1280 source | One continuous premium roof-replacement service illustration | Generated specifically for service discovery and the linked detail hero; it is captioned as a service illustration and must not be presented as project proof |
| Roof Repair card + detail hero | Conditional editorial only | Hero: `images/roofer-inspection.jpg`; card: `images/roof-repair-inspection-card-640.jpg` | Same source scene at both breakpoints | One continuous roof-inspection service illustration | The card is a crop of the same generated editorial scene used in the hero; it is captioned as a service illustration and must not be represented as an employee or documented repair |
| Storm Damage card + detail hero | Conditional editorial only | `storm-restoration-assessment-service-card-v2-1280.jpg` | Card uses `-640`; mobile hero crops the 1280 source | One continuous storm-assessment service illustration | Generated/editorial assessment scene; do not present the depicted condition as verified storm damage or project evidence |
| Gutters & Exteriors card + detail hero | Conditional editorial only | `gutters-exteriors-installation-service-card-v2-1280.jpg` | Card uses `-640`; mobile hero crops the 1280 source | One continuous gutter-installation service illustration | Generated/editorial installation scene; do not present the worker or property as verified company/project documentation |
| About | Owner-supplied presentation | `about-branded-fleet-rain-web-1254.jpg` | `about-branded-fleet-rain-mobile-800.jpg` | Branded fleet presentation featuring two company vehicles | Owner supplied this image for the About section; confirm the vehicles, wraps, visible contact details, and publication rights before production publication |
| Process | Candidate — owner verification required | `process-commercial-installation-crew-desktop-1600x900.jpg` | `process-commercial-installation-crew-mobile-800x1000.jpg` | Crew installing a commercial membrane system | Confirm crew/site permission and describe this as commercial installation, not residential repair |
| Reviews | Candidate — owner verification required | `reviews-finished-tudor-project-desktop-1600x900.jpg` | `reviews-finished-tudor-project-mobile-800x1000.jpg` | Completed-project outcome beside verified review content | Link only to a review for this project if that relationship is verified |
| Warranty | Conditional editorial only | `warranty-finished-roof-editorial-desktop-1600x900.jpg` | `warranty-finished-roof-editorial-mobile-800x1000.jpg` | Temporary finished-roof craftsmanship atmosphere | Source filename identifies it as a ChatGPT image; do not imply documentary proof |
| Financing | **Missing** | — | — | Real estimate review, material-option comparison, or planning interaction | No honest finance/planning source was supplied |
| Service Areas | Candidate — owner verification required | `service-areas-residential-project-aerial-optimized-1600x900.jpg` | `service-areas-residential-project-aerial-optimized-800x1000.jpg` | Optimized residential project context for the Greater Chicago coverage hub | Project location is unverified; do not label it Barrington or another municipality without confirmation |
| Projects — brand in motion | Owner-supplied presentation | `contact-branded-service-truck-editorial-desktop-1440x810.jpg` | `contact-branded-service-truck-editorial-mobile-landscape-800x450.jpg` | Branded fleet presentation, separated from project case studies | Owner described the source as a better image of the company vehicle; confirm the vehicle and wrap remain exact before production publication |

## Derivative records

| Source path | Source SHA-256 | Source dimensions | Output family | Edit |
| --- | --- | ---: | --- | --- |
| `public/assets/images/hero-home.jpg` | `8480dc34c4bc669d8b1dfcc115dac8e18f849fdea72dc7d1ed4f328e86915568` | 1800×1013 | `home-hero-mobile-*` | Mobile 4:5 crop positioned to preserve the house, resized to 800×1000; no generative alteration |
| Built-in image generation output `call_SA1UO4KO92pQRw1HnZIxdhbJ.png` | `0f1a203a6bf21f3f1a02a9828604f3b744675174fa5993f63825cdce0b37f1e0` | 1672×941 | `roof-replacement-premium-service-card-*` | Generated as a dedicated 16:9 illustrative service-card composition; resized to 1280×720 and 640×360 JPEG derivatives |
| `/Users/matthew/Downloads/raccoon-restoration-website-frames 2/jpg-master/03-completed-residential-roof-aerial-wide-1920x1080.jpg` | `0c229a5455e1778b4258f8cb7c3dab8c41d28fa84b793a487fbf03c9f70a344b` | 1920×1080 | `roof-replacement-completed-aerial-*` | Desktop resized to 1600×900; mobile centered 4:5 crop resized to 800×1000 |
| `/Users/matthew/Downloads/raccoon-restoration-website-frames 2/jpg-master/13-raccoon-restoration-rivian-project-1920x1080.jpg` | `aba09725cd22f0b477b152e0527e52706278b894ad5110be58b104dba34750c1` | 1920×1080 | `about-branded-vehicle-on-project-*` | Desktop resized to 1600×900; mobile centered 4:5 crop resized to 800×1000 |
| `/Users/matthew/Downloads/ChatGPT Image Jul 30, 2026, 04_46_00 PM.png` | `370c131356e0c976bdef4268901c088feee595a0dc27757699f29d66680c1cb6` | 1254×1254 | `about-branded-fleet-rain-*` | Square source exported as optimized 1254×1254 and 800×800 JPEG derivatives; no crop or factual alteration |
| `/Users/matthew/Downloads/raccoon-restoration-website-frames 2/jpg-master/08-commercial-roof-installation-crew-1920x1080.jpg` | `0d48b02709b81ebbdff6f52083753d4aa5ef820231a255fe24066ce96302ee1a` | 1920×1080 | `process-commercial-installation-crew-*` | Desktop resized to 1600×900; mobile centered 4:5 crop resized to 800×1000 |
| `/Users/matthew/Downloads/raccoon-restoration-website-frames 2/jpg-master/14-luxury-tudor-roof-project-1920x1080.jpg` | `34ff8ed0c6828c1f25eb277926e31755219d78cddf4f18d6174f5060eb063700` | 1920×1080 | `reviews-finished-tudor-project-*` | Desktop resized to 1600×900; mobile centered 4:5 crop resized to 800×1000 |
| `/Users/matthew/Downloads/raccoon-restoration-website-frames 2/jpg-master/04-luxury-home-roof-aerial-1920x1080.jpg` | `d25a099c49a69c144f4d9db08885f86ee488c50565f1ddde0680d11df62a348c` | 1920×1080 | `service-areas-residential-project-aerial-*` | Desktop resized to 1600×900; mobile centered 4:5 crop resized to 800×1000 |
| `public/assets/images/storm-assessment-source.png` | `b3d9cf83dc9f19d09970414a9c14b11ea5fb541cbaee518e0d8d7e1aabdac819` | 1536×1024 | `storm-assessment-editorial-*` | Centered 16:9 and 4:5 crops, resized to 1440×810 and 800×1000 |
| `public/assets/images/gutters-detail-source.png` | `f6e8188cb83b9a955945cc264c73df07a6a9168714c83f2328a011c19afb0faf` | 1448×1086 | `gutters-system-editorial-*` | Centered 16:9 and 4:5 crops, resized to 1280×720 and 800×1000 |
| `/Users/matthew/Downloads/ChatGPT Image Jul 30, 2026, 11_41_08 AM.png` | `81f0c0451138c20c626271d2e9cc9edae3eec419faf4d253ebebb337bd7f916f` | 1672×941 | `warranty-finished-roof-editorial-*` | Centered 16:9 and 4:5 crops, resized to 1600×900 and 800×1000 |
| `/Users/matthew/Downloads/ChatGPT Image Jul 30, 2026, 09_16_45 AM.png` | `96089645fe95caf13b80eb927c8b30b3bda1fee081dc30d553d41ac93478baa4` | 1536×1024 | `contact-branded-service-truck-editorial-*` | Centered 16:9 crop resized to 1440×810 and 800×450; portrait 4:5 derivative retained outside active use |

Files were exported as JPEG quality 84–86. No derivative exceeds its source's available pixel dimensions.

## Hold list

The four files named `ChatGPT Image Jul 30, 2026, 11_41_*.png` require explicit classification as either owner-approved editorial renderings or faithful edits before public use. The pickup and two-vehicle fleet images were owner-supplied and identified as company vehicle imagery; they are used only in separated brand-presentation sections and not as project-outcome proof.

The existing before/after composites were not copied into this library because they include baked typography and insufficient clean source separation. The soft ridge-detail image was also excluded.

## Editorial V3 — archived real-project service derivatives (August 1, 2026)

Scope: `public/assets/editorial-v3/`. These derivatives were initially used
across both the service cards and service-detail heroes. After visual review,
the owner directed that the homepage and `/services/` cards return to the
original cohesive Editorial V2 set, then directed that each linked
service-detail hero use the same visual family as its card. The four V3
service derivatives are therefore preserved in the asset library but are no
longer referenced by the service cards or service-detail heroes. Every output
was produced by
`scripts/grade-images.mjs` (deterministic headless-Chromium canvas pipeline):
cover-crop, resize, and one shared color grade only — no generative fill,
object removal, compositing, upscaling, or content alteration of any kind.

Treatment "editorial-v3 grade" (identical constants for every output):
saturate 0.86, contrast 1.06, brightness 0.97; warm gold wash `#c7a24a` at
alpha 0.07 composited with `soft-light`; cool shadow floor `#1d2a38` at
alpha 0.30 composited with `lighten`. Landscape crops keep the service-card
16:9 intrinsic aspect; the `*-mobile-800x1000` crops follow the site's 4:5
mobile art-direction convention. Square sources cap their large landscape
derivative at 1020 px wide (the honest source width — no upscaling).

| Source path | Source SHA-256 | Source dimensions | Derivatives | Treatment | Role |
| --- | --- | ---: | --- | --- | --- |
| `public/assets/projects/project-residential-completed-roof-aerial-1920.webp` | `4bc8965d4383227b07020ee4b9778db781d1cdef8e2dafad7bf1d2756920fc70` | 1920×1080 | `roof-replacement-completed-aerial-1280.webp` (1280×720), `-640.webp` (640×360), `-mobile-800x1000.webp` (800×1000) | editorial-v3 grade; crop zoom 1.35 focal 0.42/0.72 (landscape), focal 0.62/0.5 (portrait) | Archived Roof Replacement route candidate |
| `public/assets/projects/project-roof-detail-dormers-1020.jpg` | `4462a6eeb6375167fc70e165d35bcdbbd26885702664d4ad18da838c5c142f15` | 1020×1020 | `roof-repair-dormer-detail-1020.webp` (1020×574), `-640.webp` (640×360), `-mobile-800x1000.webp` (800×1000) | editorial-v3 grade; focal 0.5/0.3 (landscape), 0.42/0.55 (portrait) | Archived Roof Repair route candidate |
| `public/assets/projects/project-material-delivery-clear-v2-1020.jpg` | `5674febb1da80e9e6e066ba03f8bcf9d2d07f3e7ba6d0081f627f11df580d475` | 1020×1020 | `storm-restoration-material-delivery-1020.webp` (1020×574), `-640.webp` (640×360), `-mobile-800x1000.webp` (800×1000) | editorial-v3 grade; focal 0.5/0.28 (landscape), 0.5/0.45 (portrait) | Archived Storm Damage Restoration route candidate |
| `public/assets/projects/project-tudor-residence-exterior-1920.webp` | `db82884e2c35914b76997a6bb46d2577babdb8c8c57c99576abf73d6f23299bd` | 1920×1080 | `gutters-exteriors-tudor-exterior-1280.webp` (1280×720), `-640.webp` (640×360), `-mobile-800x1000.webp` (800×1000) | editorial-v3 grade; crop zoom 1.2 focal 0.5/0.35 (landscape), focal 0.62/0.42 (portrait) | Archived Gutters & Exteriors route candidate |

Hero exploration (not shipped): `home-hero-dusk-candidate-1800x1013.webp`
(1800×1013) is cut from the same untouched Tudor source
(`project-tudor-residence-exterior-1920.webp`, SHA above; crop zoom 1,
focal 0.5/0.42) with the heavier deterministic "dusk-hero" grade
(saturate 0.8, contrast 1.08, brightness 0.7, gold `#c7a24a` @ 0.07
soft-light, cool floor `#1b2836` @ 0.5 lighten) via
`scripts/grade-images.mjs --set=hero`. No production reference points at
it; `assets/images/hero-home.jpg` remains the live hero pending an owner
decision.

Selection notes: the labeled before/after composite
(`project-roof-before-after-aerial-*`) was considered for the storm card and
rejected because of its baked BEFORE/AFTER typography (see hold list). The
material-delivery and Tudor derivatives were briefly used as route media, then
withdrawn when the owner prioritized card-to-detail visual continuity. The Tudor
derivative is cut from the untouched original exterior frame
(`project-tudor-residence-exterior-*`), not from the `yard-*`/`landscape-
finished` retouch series, and the alt text describes only what the original
frame shows. All four sources are client-supplied project media from the
supplied archive (`assets/projects/*`; see the asset-replacement manifest);
alt text describes visible content only and makes no project, location, or
storm-evidence claims. No on-image labels were added.

## Owner-directed Tudor completion polish (August 1, 2026)

The owner explicitly requested that the completed Tudor-project image receive
a premium presentation finish because the untreated completion frame appeared
visually weaker than the newly supplied before photograph. The built-in OpenAI
image editor used
`projects/project-tudor-residence-landscape-finished-v6-1920.webp` as its edit
reference and produced
`projects/project-tudor-residence-exterior-polished-v7-source.png`
(1672×941, SHA-256
`8a6c0fae207743238924542da559b9219473f1f373d69162151c26b67636e93a`).

The edit brief was limited to realistic presentation finishing: healthier and
more even grass, crisp lawn edges, tidier low foundation planting and mulch
beds, removal of loose landscaping/entry clutter, restrained porch staging,
and careful clarity, exposure, dynamic-range, and color refinement. The prompt
explicitly required the same camera position and preservation of every roof
plane, gable, window, door, brick/stone surface, Tudor trim line, copper
awning, gutter/downspout, tower, sculpture, retaining wall, and walkway. No
people, vehicles, signage, logos, text, or new architectural elements were
requested.

| Production asset | SHA-256 | Dimensions | Bytes | Treatment / role |
| --- | --- | ---: | ---: | --- |
| `projects/project-tudor-residence-exterior-polished-v7-1600.jpg` | `8bfc09829f793276c2817ae0e716d12a5e6c67053658a9616c344d25e1522d1b` | 1600×900 | 488,578 | Full-width Projects and case-study hero; JPEG quality 82 |
| `projects/project-tudor-residence-exterior-polished-v7-1280.jpg` | `2874b340cc5f958d30599af94dc4b6219d677e4084a6fec56bbe011bfc033079` | 1280×720 | 332,624 | Case-study completed/outcome frame and social image; JPEG quality 80 |
| `projects/project-tudor-residence-exterior-polished-v7-640.jpg` | `1db4dc10da819bb39074d441271b985bfe26c8371b6300f51e3db4c771bb2b68` | 640×360 | 84,518 | Responsive gallery and completed-frame derivative; JPEG quality 72 |
| `projects/project-tudor-residence-exterior-polished-v7-mobile-800x1000.jpg` | `67265fb03e700e2b1178df94859eb8fe52662d983b7f29aff57a526ad938e1f0` | 800×1000 | 239,965 | Right-biased mobile crop preserving the turret, entry, lawn, and central gables; JPEG quality 80 |

This family is presentation imagery, not an untouched field record. Every
documentary comparison labels the completed frame “Presentation enhanced,”
and the adjacent note states that the landscaping treatment is not evidence
of contracted landscaping work. The original client-archive completion frame
and the v3–v6 retouch history remain preserved. The four production JPEGs are
recorded as `kept-original` in `webp-manifest.json` because the local Chromium
encoder was unavailable during this pass; their responsive dimensions and
compression keep the rendered transfer bounded.

## Wave 4 — case-study page usage (August 1, 2026)

Scope: the two scroll-narrative case-study routes
`/projects/tudor-exterior-transformation/` and
`/projects/commercial-flat-roof/`. The commercial page uses only previously
registered client-archive material. The Tudor page combines the newly supplied
before photograph with the disclosed owner-directed polished completion family
registered above. Captions, chips, alt text, and adjacent disclosure copy
separate the presentation treatment from factual project evidence.

### /projects/tudor-exterior-transformation/

| Asset | Register basis | Role on page |
| --- | --- | --- |
| Client-supplied pre-restoration PNG (1680×888; SHA-256 `bda6b6be1513e79e4c88b3b7924ecc7da61c063cb102e63bdab385d804597e47`) → `projects/project-tudor-residence-before-1280.jpg` (1280×720, SHA-256 `4b9e102e28afe54c858b30a6846251eba57cf64f7cf4f304529e1bbb604e5dc5`) + `-640.jpg` (640×360, SHA-256 `78c7bdf9c392028dc48d589284a886e87f28da46cf3797beb9ac6a707314609b`) | Supplied by the owner on August 1, 2026 and identified as the same residence before restoration. Treatment: centered 16:9 crop, resize, and JPEG compression only; no color grade, object edit, compositing, or generative fill. WebP is intentionally marked `kept-original` because the local Chromium encoder timed out; the JPEG fallbacks are 259,051 B and 77,764 B. | Section 01 condition frame and section 03 before frame; explicitly labeled as the client-supplied pre-restoration original |
| `projects/project-tudor-residence-exterior-polished-v7-1600/1280/640.jpg` + `-mobile-800x1000.jpg` | Owner-directed Tudor completion polish section above; AI-assisted lawn, planting-bed, entry-staging, and photographic finishing over the prior completed presentation frame, with architecture-preservation constraints | Page hero, section 03 completed frame, section 04 outcome, and social image; every visible chip says “Presentation enhanced,” with adjacent treatment disclosure |

Superseded assets: the `project-tudor-residence-exterior-yard-clean-v3/v4`,
`yard-restored-v5`, `landscape-finished-v6`, untouched completed-frame JPEGs,
and Editorial V3 hero derivatives remain archived but are no longer rendered
on this case-study route. The `reviews-finished-tudor-project-*` derivatives
were also not used because they add no distinct moment and their register
caveat ties them to verified review pairing.

### /projects/commercial-flat-roof/

| Asset | Register basis | Role on page |
| --- | --- | --- |
| `projects/project-low-slope-roof-aerial-enhanced-v3-1280/640.webp` (+ `-1280.jpg` as the page's social-preview image) | Client archive frame already published on `/projects/` with the same alt text | Page hero and section 04 (outcome), chip-labeled "Field record" |
| `projects/project-material-delivery-clear-v2-1020/640.webp` | Editorial V3 source record (SHA `5674febb…`, client-supplied field record); published on `/projects/` as a supporting field record | Section 01, chip-labeled "Supporting field record · Material staging" |
| `projects/project-low-slope-installation-crew-enhanced-v3-1280/640.webp` | Client archive frame already published on `/projects/` | Section 03, "Surface installation" |
| `projects/project-low-slope-installation-topdown-enhanced-v3-1280/640.webp` | Client archive frame already published on `/projects/` | Section 03, "Overhead verification" |

Copy notes: the page's single-installation framing ("One low-slope roof
installation documented from crew level to full-building aerial view") is
reused verbatim from the published `/projects/` commercial chapter. No
dates, addresses, durations, or timeline-continuity claims were added, and
the outcome section describes the aerial as documented "while the work is
live," matching its published alt text.

Both pages' protocol sections quote the published five process steps from
`src/data.mjs` verbatim; no new protocol claims were written.

## Required acquisition list

1. Roof repair: naturally sharp photo of an actual condition and a second frame showing the completed repair.
2. Storm damage: observable hail, wind, flashing, tarp, or documentation evidence from a verified job.
3. Financing: genuine estimate/material-option discussion without visible customer financial information.
4. Warranty: real closeout packet, product registration, material label, or homeowner handoff.
5. Reviews: customer/project pair with permission and a verified review source.
