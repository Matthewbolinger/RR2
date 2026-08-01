# Analytics Event Specification

The supplied IDPixel loader is committed in the shared page layout and renders exactly once on every generated HTML page. It loads with `defer` so it does not block HTML parsing. The front end separately pushes privacy-conscious events to `window.dataLayer`; a consent-aware analytics owner can map those events later.

| Event | Trigger | Key properties |
| --- | --- | --- |
| `inspection_cta_click` | Standard inspection CTA | `page_path`, `page_type`, `CTA_position` |
| `quote_cta_click` | “Get My Instant Quote” CTA | `CTA_position`, `intent` |
| `phone_click` | Any tracked phone link | `CTA_position` |
| `mobile_sticky_call_click` | Mobile call action | `CTA_position` |
| `service_card_click` | Service card/link | `service_interest` |
| `intent_selector_click` | Homeowner intent card | `intent` |
| `project_card_click` | Project proof navigation | `CTA_position` |
| `project_cta_click` | Project inquiry | `CTA_position` |
| `storm_damage_cta_click` | Storm CTA | `CTA_position` |
| `location_page_cta_click` | Location CTA | `CTA_position` |
| `resource_card_click` | Roofing guide card or service-guide link | `CTA_position`, `resource` when present |
| `claim_support_click` | Claims-support CTA | `CTA_position` |
| `email_click` | Email link | `CTA_position` |
| `form_start` | First form input | `form_type` |
| `quote_form_step_view` | Quote step first reached | `form_type`, `step_number`, `step_name` |
| `quote_form_step_complete` | Valid quote step continued | `form_type`, `step_number`, `step_name` |
| `form_field_error` | Validation error | `form_type`, `field_name` |
| `form_submit_attempt` | Valid request sent to configured endpoint | `form_type`, `service_interest` |
| `form_submit_success` | Endpoint confirms successful receipt | `form_type`, `service_interest`, `property_type` |
| `form_submit_error` | Endpoint unavailable, times out, or fails | `form_type`, `error_type` |
| `thank_you_call_click` | Thank-you phone action | `CTA_position` |

Quote CTA placements currently include `header`, `hero`, `page_hero`, `reviews_hero`, `final_cta`, `mobile_menu`, `sticky`, and `footer`. This allows placement-level conversion analysis without collecting personal information.

Standard properties:

- `page_path`
- `page_type`
- `device_category`
- `campaign_source`
- `campaign_medium`
- `campaign_name`

UTM values are stored in session storage only. Names, email addresses, phone numbers, street addresses, ZIP codes, message text, claim context, and other form values must never be sent to analytics.

## Existing production tracking

A read-only review of the live WordPress home page on July 31, 2026 found Meta Pixel ID `1583403939041768` and an `includeCapiIntegration: true` initialization signal. The new static build does not currently reproduce that Meta browser/server tracking.

Before cutover, the business and analytics owners must explicitly choose one path:

1. Preserve the existing Meta Pixel and rebuild equivalent consent-aware CAPI conversion handling.
2. Replace it with an approved measurement architecture and document audience/attribution consequences.
3. Formally retire it after confirming no active campaign, audience, or reporting dependency remains.

Do not configure Meta through both a hard-coded pixel and a tag manager. If Meta remains, test browser/server deduplication with a shared event identifier and confirm no form-field values are included.

## Configuration checklist

- Confirm IDPixel consent, disclosure, retention, and opt-out requirements before public launch.
- Keep the IDPixel loader centralized in `src/templates.mjs`; do not add page-level duplicates.
- Validate the production request, provider account destination, and expected page-view behavior.
- Resolve the live Meta Pixel/CAPI continuity decision and assign an accountable owner.
- Load no additional analytics or tag-manager path without checking for duplicate measurement.
- Map events without duplicating page views.
- Test Google Ads/Meta conversions separately from UI event firing.
- Document retention, access, and deletion.
- Validate that error and thank-you events reflect real server outcomes.
