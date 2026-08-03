# Vercel to AccuLynx Lead Integration

## Outcome

The website now includes a server-only Vercel Function at `/api/quote/`. A completed quote request is validated on the server and then written directly into AccuLynx as:

1. a contact, or a matched existing contact;
2. a Lead (Unassigned) job with the property address, service, urgency, claim stage, campaign attribution, source page, and consent evidence; and
3. an external reference using the browser-generated `submission_id` for retry protection.

The browser receives a successful response only after AccuLynx confirms a durable job record. AccuLynx credentials and optional Slack webhook values never appear in generated HTML or client JavaScript.

Contact duplicate detection searches by name across the full available creation
date range, then confirms candidates by email or phone. The search deliberately
does not filter by contact type: AccuLynx's search contract accepts contact-type
names, while contact creation uses contact-type IDs, and an existing customer
may already be classified under a different type. Although the reference schema
labels the search dates as date-time values, the live endpoint currently
requires `YYYY-MM-DD` date strings.

## Required production variables

Set these in the Vercel project for Production. Apply them to Preview only when a preview environment is intentionally allowed to create AccuLynx test data.

| Variable | Scope | Value |
| --- | --- | --- |
| `FORM_ENDPOINT` | Build + browser | `/api/quote/` |
| `SITE_URL` | Build + server | `https://www.raccoonrestoration.com` |
| `FORM_ALLOWED_ORIGINS` | Server | Comma-separated exact production origins |
| `ACCULYNX_API_KEY` | Server secret | API key for the correct AccuLynx location |
| `ACCULYNX_CONTACT_TYPE_ID` | Server | Customer/homeowner contact type UUID |
| `ACCULYNX_LEAD_SOURCE_ID` | Server | Active website lead source UUID |

Optional variables:

- `ACCULYNX_JOB_CATEGORY_ID`
- `ACCULYNX_WORK_TYPE_ID`
- `ACCULYNX_TRADE_TYPE_ID`
- `SLACK_LEADS_WEBHOOK_URL`

Do not put any server secret in a variable prefixed with a public/browser namespace. Do not commit `.env` files.

## Discover the AccuLynx IDs

An AccuLynx administrator must create or retrieve the API key for the correct company location. Keep it in the shell only long enough to run:

```bash
ACCULYNX_API_KEY='paste-temporarily-here' npm run acculynx:discover
```

The command prints active contact types and lead sources without writing the key to disk. Select:

- the contact type used for a homeowner/customer; and
- a lead source named clearly, such as `Website - Instant Quote`.

If the desired lead source is absent, create it in AccuLynx first and rerun discovery.

## Vercel setup

1. Open the `raccoon-restoration` Vercel project.
2. Add the required variables under Project Settings → Environment Variables.
3. Keep CRM credentials server-only.
4. Set `FORM_ALLOWED_ORIGINS` to:

   ```text
   https://www.raccoonrestoration.com,https://raccoonrestoration.com
   ```

5. While the Vercel alias is being used for acceptance testing, append that exact HTTPS origin temporarily.
6. Add a Vercel Firewall rate-limit rule for `/api/quote*`. The function includes a best-effort per-instance limit and honeypot, but production abuse controls must also be enforced at Vercel's edge.
7. Redeploy after saving variables. `FORM_ENDPOINT` is embedded during the build, so changing it without a redeploy will not update the form.

## Data mapping

| Website field | AccuLynx destination |
| --- | --- |
| Name, phone, email | Contact |
| `submission_id` | Contact cross-reference and job external reference |
| Street, city, ZIP | Job location address (Illinois, United States) |
| Service, property type, timing, claim stage | Job notes and priority |
| Campaign and source page | Job notes |
| Consent text and timestamp | Contact note and job notes |

Urgent requests become `Urgent`. Storm-damage and claim-related requests become `High`. Other requests become `Normal`.

The integration intentionally creates jobs in AccuLynx's Lead (Unassigned) milestone. Assignment rules, first-response tasks, and acknowledgments should be configured in AccuLynx after the CRM owner confirms the desired queues and service-level targets.

## Optional Slack alert

When `SLACK_LEADS_WEBHOOK_URL` is configured, the server sends a minimal alert only after AccuLynx accepts the job. The alert contains the AccuLynx job ID, service, city/ZIP, timing, and submission ID. It does not send the customer's name, email, phone, street address, or free-text message.

A Slack delivery failure never turns an accepted AccuLynx lead into a failed browser submission.

## Production acceptance test

After variables are configured, submit unique tests for:

1. residential roof replacement;
2. urgent active issue;
3. storm or open-claim request; and
4. commercial or association property.

For each test, verify:

- one AccuLynx contact/job path;
- complete address and field mapping;
- correct priority and lead source;
- visible consent/source notes;
- correct routing or owner task;
- no duplicate job after resubmitting the same `submission_id`;
- browser success only after AccuLynx accepts the job; and
- no customer PII in browser analytics or Vercel structured logs.

Delete or clearly mark acceptance-test records after verification.

## Safe rollback

If AccuLynx delivery cannot be verified, set `FORM_ENDPOINT` to an empty value and redeploy. The full quote form remains visible, but the site truthfully reports that online delivery is not connected and directs the visitor to call. Never point `FORM_ENDPOINT` directly at an AccuLynx URL or private webhook.

## Current API references

Implementation was checked against the AccuLynx v2 documentation on August 3, 2026:

- [Authentication](https://apidocs.acculynx.com/docs/authentication)
- [Create Contact](https://apidocs.acculynx.com/reference/postcontacts)
- [Search Contacts](https://apidocs.acculynx.com/reference/postcontactsearch)
- [Get Jobs for a Contact](https://apidocs.acculynx.com/reference/getcontactjobs)
- [Create Job](https://apidocs.acculynx.com/reference/createjob)
- [Create Job External Reference](https://apidocs.acculynx.com/reference/postcreatejobexternalreference)
- [Get Contact Types](https://apidocs.acculynx.com/reference/getcontacttypes)
- [Get Active Lead Sources](https://apidocs.acculynx.com/reference/getactiveleadsources)
