# AI Search Visibility Plan

Last reviewed: 2026-08-03

## Objective

Make Raccoon Restoration easy for search engines and answer engines to crawl,
understand, verify, cite, and measure without creating thin location pages,
inventing business facts, or adding copy solely for bots.

No technical change can guarantee a ranking or inclusion in ChatGPT. The goal is
to remove discovery barriers and strengthen the public evidence that ranking and
answer systems can evaluate.

## Implemented automatically

- Explicit `robots.txt` access for `OAI-SearchBot` and `OAI-AdsBot`
- Canonical `www` URLs and accurate `lastmod` values in the XML sitemap
- Public IndexNow ownership verification at the production host root
- IndexNow dry-run and submission commands
- GitHub Actions notification after meaningful public-content changes on `main`
- Canonical key-file verification before any live IndexNow submission
- Richer `RoofingContractor` schema with contact point and service catalog
- Source citations in Article structured data when a guide links to primary
  guidance
- Vercel custom-event delivery for privacy-safe conversion events
- First-landing attribution for ChatGPT referrals and form submissions
- Offline regression checks for crawler access, sitemap integrity, and schema

## Evidence and content operating model

1. Maintain complete business facts in `src/data.mjs`.
2. Keep service pages factual, property-focused, and linked to relevant guides.
3. Publish only case studies supported by real company work and approved media.
4. Add a city page only when Raccoon Restoration has unique local proof and
   useful local guidance; do not mass-produce city or ZIP-code doorway pages.
5. Review official resource links at least every six months and update
   `dateModified` only when the public content changes meaningfully.
6. Earn consistent third-party corroboration through the Google Business
   Profile, BBB, manufacturer profiles, directories, local press, associations,
   and original-source reviews.

## Owner-controlled setup still required

- Verify the domain property in Google Search Console.
- Submit `https://www.raccoonrestoration.com/sitemap.xml`.
- Add the site to Bing Webmaster Tools; import from Search Console when useful.
- After the Vercel domain cutover, manually run the `Notify IndexNow` workflow once; before cutover it safely skips submission.
- Confirm the Google Business Profile website URL carries an approved UTM tag.
- Keep name, phone, service area, license, services, and hours consistent across
  the website and major profiles.
- Monitor Vercel Analytics for `ai_referral_landing`, quote CTA, phone, and
  successful form events.
- Review Search Console queries and cited/referral traffic monthly; use those
  questions to improve existing service pages and guides before publishing new
  content.

## Monthly scorecard

- Indexed canonical pages versus sitemap pages
- Search Console clicks, impressions, non-brand queries, and service-area terms
- ChatGPT referral sessions and their quote/phone conversion rate
- Quote form success rate and CRM acceptance
- New approved reviews and third-party profile consistency
- Resource pages updated from real customer questions
- Broken citations, redirect errors, crawl blocks, and schema failures

## Guardrails

- Never publish private customer data, claim files, street addresses, or
  unapproved project details.
- Never fabricate ratings, review counts, certifications, cities served, or
  project results.
- Do not send names, phone numbers, emails, street addresses, or free-text form
  fields to Vercel custom analytics.
- IndexNow is a discovery notification, not a substitute for the sitemap,
  Search Console, useful content, third-party reputation, or technical QA.
