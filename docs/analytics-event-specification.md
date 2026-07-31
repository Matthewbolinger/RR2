# Analytics Event Specification

No production analytics script or identifier is committed. The front end pushes privacy-conscious events to `window.dataLayer`; a consent-aware analytics owner can map them later.

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

## Configuration checklist

- Confirm consent requirements.
- Load exactly one analytics/tag manager path.
- Map events without duplicating page views.
- Test Google Ads/Meta conversions separately from UI event firing.
- Document retention, access, and deletion.
- Validate that error and thank-you events reflect real server outcomes.
