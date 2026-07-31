# Accessibility Review

Target: WCAG 2.2 Level AA practices.

## Implemented

- Skip-to-content link
- Semantic header, navigation, main, sections, articles, lists, forms, and footer
- One H1 per page
- Logical heading structure
- Native `details`/`summary` accordions and service menu
- Keyboard-operable mobile menu
- Escape closes mobile menu and restores focus
- Mobile menu contains keyboard focus, makes background regions inert, and closes above its responsive breakpoint
- Visible focus indicators
- Minimum practical touch targets
- Labeled inputs and native autocomplete
- Inline validation, `aria-invalid`, and live status region
- Correct links versus buttons
- Reduced-motion media query
- Cross-document view transitions disabled for reduced-motion users
- Critical hero content remains visible if JavaScript is unavailable
- No autoplay, carousel, hover-only content, or color-only instructions
- Decorative hero image marked with empty alt; meaningful images use descriptive alt text
- High-contrast white/cream body copy and restrained gold use
- Mobile reading order and persistent actions
- Missing-image fallback without broken icon

## Manual checks completed by code inspection

- Header menu state and accessible names
- Form required fields and recovery state
- Accordion keyboard behavior via native controls
- Focus style coverage
- No hidden critical copy inside images
- No legacy or unverified badge text

## Browser smoke verification

- Mobile menu opens, exposes navigation, locks background scroll, and closes with an explicit control
- Mobile navigation aligns beneath the complete header at 390 and 768 pixels, contains focus, restores focus on Escape, and closes when resized to desktop
- Blank form submission exposes three required-field errors and a recovery message
- Valid form values clear field errors and produce the honest endpoint-configuration recovery state
- Hero headline, lead, and actions remain visible with the application script blocked
- Reduced-motion mode leaves hero and below-fold content visible
- IntersectionObserver reveals complete after real scrolling and remove their temporary motion state
- Exact desktop and mobile service links receive `aria-current="page"`
- All 21 routes have explicit screenshot coverage
- Every route is checked for horizontal overflow at 390 pixels; priority routes are also checked at 768 and 1440 pixels
- Unknown routes return a real HTTP 404 page

## Remaining verification

- Axe or Pa11y route sweep in a browser environment
- Screen-reader pass on macOS/iOS and Windows
- 200% zoom and high-contrast/forced-colors review
- Production font-loading and layout review
- Final color-contrast measurement after approved photography is locked
- Third-party form, CRM, scheduling, and review-widget accessibility

Accessibility feedback is directed to the verified phone and email on `/accessibility/`.
