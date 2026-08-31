# RR2 weekly roofing resource queue

This directory contains the ten-article roofing series scheduled for one release per week. Articles remain private source files in `resource-queue/` until the release script moves the next due file into `published-resources/`. Only files in `published-resources/` are included in the normal site build, navigation, resource index, structured data, AI-search files, and sitemap.

## Editorial calendar

| Week | Publication date | Article |
| ---: | :--- | :--- |
| 1 | 2026-09-07 | Tile & Slate Roof Storm Damage: Repair or Restore? |
| 2 | 2026-09-14 | What Does a Roof Replacement Cost? 9 Factors That Shape the Price |
| 3 | 2026-09-21 | Emergency Roof Leak: What to Do Before the Roofer Arrives |
| 4 | 2026-09-28 | Roof Hail Damage: Signs Homeowners Should Know |
| 5 | 2026-10-05 | How Long Does a Roof Last? Materials, Weather & Maintenance |
| 6 | 2026-10-12 | Professional Roof Inspection Checklist: What a Roofer Should Examine |
| 7 | 2026-10-19 | How to Choose Asphalt Shingles for an Illinois Home |
| 8 | 2026-10-26 | Should You Replace Gutters When You Replace the Roof? |
| 9 | 2026-11-02 | Historic & Specialty Roof Restoration: Slate, Tile and Complex Roofs |
| 10 | 2026-11-09 | Roof Insurance Claims: What Your Contractor Can—and Cannot—Do |

Dates use the America/Chicago timezone. A date in a JSON file does not publish an article by itself; the release commit must be merged and deployed.

## Validation commands

```sh
npm run content:queue:check
npm run content:queue:render
npm test
```

`content:queue:render` temporarily includes all queued articles in a test build, validates the generated routes, internal links, metadata, structured data, and AI-search artifacts, and then restores a normal public build that excludes unreleased articles.

## Release command

```sh
npm run content:release-next -- --dry-run
npm run content:release-next
npm test
```

The release script moves no more than one eligible article and refuses to skip an earlier sequence. Do not alter publication dates simply to force eligibility.

## Weekly production workflow

1. Start from a clean checkout of the current `origin/main`.
2. Confirm the prior weekly resource is on `main` and live. Do not stack a new release behind an unmerged release PR.
3. Create a dated `codex/publish-resource-YYYY-MM-DD` branch.
4. dry-run the release, then release exactly one eligible article.
5. Run `npm test` and `git diff --check`.
6. Confirm that one JSON file moved from `resource-queue/` to `published-resources/` and that no unrelated file changed.
7. Commit, push, and open a pull request to `main`.
8. Stop for human review and merge approval. A Vercel deployment from `main` is the production gate.
9. After deployment, verify the live article URL, `/resources/`, `/sitemap.xml`, and the production deployment status.

The automation prepares a tested release PR. It does not merge the PR, change DNS, or bypass the production approval gate.
