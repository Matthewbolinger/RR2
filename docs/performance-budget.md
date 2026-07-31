# Performance Budget

## Current local build

| Resource | Budget | Current build |
| --- | --- | --- |
| Application JavaScript | 20 KB compressed | 11.1 KB raw / 3.4 KB gzip |
| CSS | 35 KB compressed | 94.4 KB raw / 15.3 KB gzip |
| Homepage hero | 300 KB target | 275 KB desktop / 189 KB mobile |
| Service hero | 300 KB target | 155–337 KB desktop / 135–250 KB mobile |
| Service-area hero | 300 KB target | 280 KB desktop / 166 KB mobile |
| Service card image | 140 KB target | 67–127 KB |
| Primary logo lockup | 100 KB target | 65 KB transparent PNG |
| Footer brand textile | 160 KB target | 146 KB JPEG |
| Fonts | 160 KB total | Google Fonts external; self-host recommended |
| Third-party scripts | 50 KB initial | 0 KB |
| Layout shift | CLS < 0.1 | Explicit image dimensions and stable components |
| Interaction | INP < 200 ms | Small event surface and no framework runtime |
| Largest contentful paint | < 2.5 s representative mobile | Requires a hosted production test |

## Implemented

- Static HTML generated at build time with no frontend framework runtime
- Responsive desktop and mobile hero sources on the largest service pages
- Dedicated 640-pixel service-card crops instead of full hero downloads
- Recompressed art-directed service-area desktop and mobile hero sources
- Optimized 480-pixel transparent header and footer logo
- Explicit image dimensions, lazy loading below the fold, and asynchronous decoding
- One prioritized hero image per visual route
- No carousel, autoplay, video, ambient audio, or decorative animation dependency
- Small vanilla JavaScript for navigation, form behavior, attribution, and resilience
- Reduced-motion support and hero visibility without JavaScript
- Active-image gate for missing files, invalid dimensions, exact duplicates, and oversized assets

## Known exceptions

- Roof replacement and warranty desktop hero fallbacks are slightly above the 300 KB target. Add art-directed AVIF/WebP sources after the final photography is approved.
- Google Fonts adds a third-party request. Self-host licensed Bebas Neue and Montserrat WOFF2 subsets to remove that dependency.
- CSS, JavaScript, and image filenames are not content-hashed, so production should not use immutable caching until fingerprinting is added.
- Final Core Web Vitals, cache behavior, and font timing require tests on the production host and representative devices.

## Verification

- `npm test`
- `npm run screenshots`
- Every route checked at 390 pixels; priority routes also checked at 768 and 1440 pixels
- Production Lighthouse and field Core Web Vitals after hosting and integrations are configured
