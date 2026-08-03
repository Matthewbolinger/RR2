# Lead Automation Specification

## Objective

Every quote request should become a structured, attributable CRM lead without relying on an untracked email. A browser conversion is successful only when the intake service confirms that the request was durably accepted.

## Required architecture

```text
Website quote form
  -> same-origin Vercel Function (/api/quote/)
  -> server validation + spam/rate controls
  -> deduplication + consent evidence
  -> CRM lead/contact/opportunity
  -> assigned owner + response task
  -> server success response
  -> thank-you page + conversion event
```

`FORM_ENDPOINT` is visible in generated HTML. It must be a public intake route or serverless proxy. CRM API keys, private webhook URLs, and other secrets stay on the server.

## Form payload

The browser sends `application/json` to the same-origin Vercel intake route. The
server accepts a strict allowlist of the fields below and rejects unsupported
properties.

| Field | Required | CRM use |
| --- | --- | --- |
| `submission_id` | Yes | Idempotency and duplicate protection |
| `submitted_at` | Yes | Lead timeline |
| `request_type` | Yes | Quote/inspection routing |
| `first_name`, `last_name` | Yes | Contact |
| `phone`, `email` | Yes | Follow-up channels |
| `street_address`, `city`, `postal_code` | Yes | Property/service-area record |
| `property_type` | Yes | Residential/commercial routing |
| `service` | Yes | Trade/service owner |
| `project_timing` | Yes | Urgency and SLA |
| `claim_stage` | No | Claim-support routing |
| `message` | No | Customer context |
| `contact_preference` | No | First-response channel |
| `consent` | Yes | Consent evidence |
| `form_started_at` | Yes | Bot/risk signal |
| `company_website` | Must be blank | Honeypot |
| `source_page` | Yes | Attribution |
| `campaign_source`, `campaign_medium`, `campaign_name`, `campaign_landing_path` | No | Campaign attribution and first local landing path |

## Server acceptance contract

The endpoint should:

1. Accept only expected origins and `POST`.
2. Enforce request-size limits and strict field allowlists.
3. Validate phone, email, ZIP, required enums, consent, and honeypot.
4. Apply durable rate limiting and bot protection.
5. Use `submission_id` plus normalized phone/email/property to prevent duplicates.
6. Write consent text, timestamp, IP-handling policy, and source alongside the lead.
7. Upsert the contact and property, create or update the opportunity, assign an owner, and create the correct response task.
8. Return `2xx` only after durable CRM acceptance. Return a non-`2xx` safe error for rejection or downstream failure.
9. Never return secrets, internal stack traces, or customer records to the browser.

## Implemented AccuLynx adapter

`api/quote.mjs` and `src/lead-intake.mjs` implement the public intake route and
direct AccuLynx adapter. The adapter searches for retry contacts, creates the
contact when required, creates an AccuLynx Lead (Unassigned) job, and writes a
job external reference keyed by `submission_id`. It also supports a minimal
post-acceptance Slack alert without customer PII.

The code-level limiter is best effort because Vercel instances do not share
memory. A production Vercel Firewall rate-limit rule for `/api/quote*` remains a
required launch control. See
[Vercel to AccuLynx integration](acculynx-vercel-integration.md).

## Routing baseline

| Condition | Recommended route |
| --- | --- |
| Urgent active issue | Immediate call task and on-call notification |
| Storm damage or open claim | Storm/claim specialist queue |
| Commercial or association property | Commercial estimator queue |
| Roof replacement or planned project | Retail estimating queue |
| Unknown service | Intake coordinator |

Set a measurable first-response SLA for each route. A common acknowledgment can be automated, but promotional nurture requires separately approved consent and suppression rules.

## Recommended lead workflow

1. Create or update the contact, property, and opportunity in the CRM.
2. Send a transactional acknowledgment through the customer’s preferred channel.
3. Alert the assigned owner with service, urgency, address, source, and requested response channel.
4. Create a first-response task with a tighter SLA for urgent and storm-related requests.
5. Escalate an untouched lead to a backup owner before the SLA expires.
6. Record every call, text, email, appointment, estimate, and disposition on the opportunity.
7. Stop automated follow-up immediately after opt-out, invalid contact, duplicate merge, or a completed disposition.

Suggested operational checkpoints are immediate acknowledgment, first human response, same-day retry when appropriate, next-business-day follow-up, and a documented close/lost reason. Exact timing, channels, and language require CRM-owner and legal approval.

## Analytics boundary

Analytics may receive form type, step number/name, service interest, property type, campaign fields, and success/error state. It must not receive names, phone numbers, emails, addresses, ZIP codes, messages, or claim details.

## Production acceptance test

Before launch, submit unique desktop and mobile test leads for residential, commercial, urgent, and claim-related routes. Confirm:

- one CRM record per test;
- complete field mapping and source attribution;
- correct pipeline, owner, task, and notification;
- no success event before CRM acceptance;
- safe timeout and outage behavior;
- duplicate suppression;
- consent evidence;
- test-data deletion.
