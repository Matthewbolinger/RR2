# Assumptions

## Repository and stack

- RR2 was an empty public GitHub repository and the local checkout had no commits, files, or configured remote.
- A dependency-free static build was selected because there was no existing stack to preserve and the requested site is content-led, performance-sensitive, and does not require application hydration.
- The generator is intentionally small and uses Node.js built-ins. A CMS or framework can be added later only if it solves a confirmed publishing or integration requirement.

## Business facts

- Barrington, Illinois; (224) 500-6825; info@raccoonrestoration.com; and Illinois Roofing License #104.020040 are treated as verified because they appear on the current company website and corroborating public profiles.
- Greater Chicago is treated as the confirmed service market based on direct client confirmation on July 30, 2026. Exact cities, ZIP codes, schedule limits, and address exceptions are still confirmed operationally rather than inferred.
- The exact street address is not published because the master prompt marked it for verification and the existing sources do not fully agree on public display.
- Exact service radius and city/ZIP list, insurance status, business hours, financing, warranty terms, manufacturer relationships, review score/count, team roster, and project metrics are not assumed.

## Content and media

- The active homepage hero plus the four service card/detail visual families are generated atmospheric editorial images, not project evidence. Each service-detail hero is explicitly captioned as a service illustration, and the matching cards make generic service-category claims only.
- The client-supplied project and fleet photographs are presented as real-work visual evidence without inferring client names, exact locations, materials, dates, scope, certifications, or outcomes. Public release approval and structured project facts remain launch requirements.
- The public vehicle image is a publication-safe edited derivative that preserves the truck and primary branding while removing the QR/BBB mark and small unverified contact, credential, and promotional decals. The large residential aerial is cropped to avoid publishing a potentially problematic worker-safety portrayal.
- The Projects hero, portfolio gallery, and Tudor case study use the owner-directed `polished-v7` presentation derivative of the completed Tudor-home project photo. OpenAI image editing was used to refine the lawn, planting beds, porch staging, exposure, color, and clarity while preserving the residence architecture. The original completed-project frame and earlier deterministic derivatives remain archived.
- The Tudor case study includes a client-supplied photograph identified as the same residence before restoration. Only centered crop, resize, and web compression are applied to that before image. The comparison supports a visible exterior transformation, but does not establish exact materials, dates, contracted scope, or landscaping work. The completed frame is explicitly labeled “Presentation enhanced,” and its landscaping treatment is not presented as contracted work.
- The soft textured-roof detail is represented by a clarity-enhanced derivative of the supplied frame. Its role is supporting visual detail, not proof of a named product or a project-specific material claim.
- The commercial aerial and installation frames use restrained clarity-enhanced derivatives to reduce source haze and compression softness. Their role remains documentary; no new project facts, people, equipment, or outcomes are inferred from the restored pixels.
- The modern-white and brick-residence aerials carry OpenAI Content Credentials and are treated as client-supplied enhanced derivatives of project photographs. The untouched field sources, geometry review, property releases, and approval for public use remain launch requirements; the enhanced pixels are not used to infer materials, scope, dates, or outcomes.
- The supplied mood boards are design references only and are not embedded in the site.
- The client-approved horizontal PNG lockup is used responsively across the header and footer. Per client direction, it is transparent and omits the lower “Roofing & Restoration” tagline while retaining the gold rule. The mascot was not redrawn.
- The Projects page uses the supplied visual archive now; deeper case-study claims render only after approved source facts are recorded. The review system still prioritizes honest source requirements over invented proof.

## Integrations

- No production form, analytics, CRM, call-tracking, or advertising identifiers were available.
- The structured three-step quote form always renders. Until a secure endpoint is configured, it validates the full request but clearly states that the information was not sent and offers a phone handoff; it never routes an undelivered request to the thank-you page. When `FORM_ENDPOINT` is supplied at build time, success is recorded only after the intake endpoint returns a successful response. Production delivery, spam protection, CRM mapping, consent review, routing, and real receipt testing remain required.
