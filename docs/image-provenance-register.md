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
| Services grid — Roof Replacement card | Conditional editorial only | `roof-replacement-premium-service-card-1280.jpg` | `roof-replacement-premium-service-card-640.jpg` | Consistent premium service-category illustration | Generated specifically for service discovery; do not label or imply that this residence is a Raccoon Restoration project |
| Roof Replacement | Conditional editorial only | `roof-replacement-premium-service-card-1280.jpg` | `roof-replacement-premium-service-card-640.jpg` | Consistent premium roof-replacement service illustration | Generated specifically for service discovery and the service-detail hero; it is not labeled or presented as a Raccoon Restoration project |
| Roof Repair | **Missing** | — | — | Actual defect, flashing repair, leak source, or technician documentation | Available project images depict installation or completed roofs, not a verified repair |
| Storm Damage | Conditional editorial only | `storm-assessment-editorial-desktop-1440x810.jpg` | `storm-assessment-editorial-mobile-800x1000.jpg` | Temporary storm/inspection atmosphere | Shows no observable damage; do not present as storm-damage proof |
| Gutters & Exteriors | Conditional editorial only | `gutters-system-editorial-desktop-1280x720.jpg` | `gutters-system-editorial-mobile-800x1000.jpg` | Gutter, downspout, soffit, and roof-edge context | Existing editorial source has no documented real-project provenance |
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

## Required acquisition list

1. Roof repair: naturally sharp photo of an actual condition and a second frame showing the completed repair.
2. Storm damage: observable hail, wind, flashing, tarp, or documentation evidence from a verified job.
3. Financing: genuine estimate/material-option discussion without visible customer financial information.
4. Warranty: real closeout packet, product registration, material label, or homeowner handoff.
5. Reviews: customer/project pair with permission and a verified review source.
