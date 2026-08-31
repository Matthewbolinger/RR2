import { access } from "node:fs/promises";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import {
  articleText,
  articleWordCount,
  externalLinks,
  loadResourceFiles,
  publishedDirectory,
  queueDirectory,
  root
} from "./resource-queue-lib.mjs";

const failures = [];
const warnings = [];
const requiredFields = [
  "sequence",
  "status",
  "releaseDate",
  "slug",
  "eyebrow",
  "title",
  "seoTitle",
  "shortTitle",
  "description",
  "dek",
  "readTime",
  "datePublished",
  "dateModified",
  "sourceReviewed",
  "sections",
  "relatedServices"
];
const allowedServices = new Set([
  "roof-replacement",
  "roof-repair",
  "storm-damage-restoration",
  "gutters-exteriors"
]);

const [queued, published] = await Promise.all([
  loadResourceFiles(queueDirectory),
  loadResourceFiles(publishedDirectory)
]);
const managed = [...queued, ...published];
const existingModule = await import(
  `${pathToFileURL(join(root, "src", "resources.mjs")).href}?queue-check=${Date.now()}`
);
const existingArticles = existingModule.resourceArticles.filter(
  (article) => !published.some(({ article: item }) => item.slug === article.slug)
);
const knownArticleSlugs = new Set([
  ...existingArticles.map((article) => article.slug),
  ...managed.map(({ article }) => article.slug)
]);

if (managed.length !== 10) {
  failures.push(`expected 10 managed weekly resources, found ${managed.length}`);
}

const sequences = new Set();
const slugs = new Set(existingArticles.map((article) => article.slug));
const titles = new Set(existingArticles.map((article) => article.title));
const releaseDates = [];

for (const { filename, article } of managed) {
  const scope = filename;
  for (const field of requiredFields) {
    if (
      article[field] === undefined ||
      article[field] === null ||
      article[field] === ""
    ) {
      failures.push(`${scope}: missing ${field}`);
    }
  }

  if (!Number.isInteger(article.sequence) || article.sequence < 1) {
    failures.push(`${scope}: sequence must be a positive integer`);
  }
  if (sequences.has(article.sequence)) {
    failures.push(`${scope}: duplicate sequence ${article.sequence}`);
  }
  sequences.add(article.sequence);

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug || "")) {
    failures.push(`${scope}: invalid URL slug`);
  }
  if (slugs.has(article.slug)) failures.push(`${scope}: duplicate slug ${article.slug}`);
  slugs.add(article.slug);
  if (titles.has(article.title)) failures.push(`${scope}: duplicate title ${article.title}`);
  titles.add(article.title);

  if (!/^\d{4}-\d{2}-\d{2}$/.test(article.releaseDate || "")) {
    failures.push(`${scope}: releaseDate must be YYYY-MM-DD`);
  }
  if (article.datePublished !== article.releaseDate) {
    failures.push(`${scope}: datePublished must match releaseDate`);
  }
  if (article.dateModified !== article.releaseDate) {
    failures.push(`${scope}: initial dateModified must match releaseDate`);
  }
  releaseDates.push({ sequence: article.sequence, date: article.releaseDate, scope });

  if (article.description.length < 90 || article.description.length > 170) {
    failures.push(
      `${scope}: description must be 90-170 characters, found ${article.description.length}`
    );
  }
  if (article.seoTitle.length < 25 || article.seoTitle.length > 60) {
    failures.push(
      `${scope}: seoTitle must be 25-60 characters, found ${article.seoTitle.length}`
    );
  }
  if (!Array.isArray(article.sections) || article.sections.length < 6) {
    failures.push(`${scope}: article needs at least six substantive sections`);
  }
  for (const [index, section] of (article.sections || []).entries()) {
    if (!section.heading || !Array.isArray(section.paragraphs) || !section.paragraphs.length) {
      failures.push(`${scope}: section ${index + 1} needs a heading and paragraph`);
    }
    for (const link of section.links || []) {
      if (!link.href || !link.label) {
        failures.push(`${scope}: section ${index + 1} has an incomplete link`);
      }
      const match = link.href?.match(/^\/resources\/([^/]+)\/$/);
      if (match && !knownArticleSlugs.has(match[1])) {
        failures.push(`${scope}: unknown queued resource link ${link.href}`);
      }
      if (link.href?.startsWith("/") && !match) {
        const target =
          link.href === "/"
            ? join(root, "dist", "index.html")
            : join(root, "dist", link.href, "index.html");
        try {
          await access(target);
        } catch {
          warnings.push(`${scope}: internal route requires build verification ${link.href}`);
        }
      }
    }
  }

  const wordCount = articleWordCount(article);
  if (wordCount < 650 || wordCount > 1500) {
    failures.push(`${scope}: editorial word count ${wordCount} is outside 650-1500`);
  }
  if (!externalLinks(article).length) {
    failures.push(`${scope}: at least one authoritative external source is required`);
  }
  for (const service of article.relatedServices || []) {
    if (!allowedServices.has(service)) {
      failures.push(`${scope}: unknown related service ${service}`);
    }
  }

  const text = articleText(article);
  if (
    /(?:we|raccoon restoration) (?:guarantee|promise)[^.]{0,50}(?:approval|coverage|settlement)|insurance will pay/i.test(
      text
    )
  ) {
    failures.push(`${scope}: prohibited insurance-outcome promise found`);
  }
  if (
    /public adjuster|represent(?:s|ing)? the (?:homeowner|policyholder)|negotiat(?:e|ing) (?:the )?(?:claim|settlement)/i.test(
      text
    ) &&
    !/not a public adjuster/i.test(text)
  ) {
    failures.push(`${scope}: insurance content must state that Raccoon Restoration is not a public adjuster`);
  }
}

releaseDates.sort((a, b) => a.sequence - b.sequence);
for (let index = 0; index < releaseDates.length; index += 1) {
  const current = releaseDates[index];
  if (current.sequence !== index + 1) {
    failures.push(`${current.scope}: expected sequence ${index + 1}`);
  }
  if (index) {
    const previous = releaseDates[index - 1];
    const days =
      (Date.parse(`${current.date}T12:00:00Z`) -
        Date.parse(`${previous.date}T12:00:00Z`)) /
      86_400_000;
    if (days !== 7) {
      failures.push(`${current.scope}: release must be exactly seven days after ${previous.scope}`);
    }
  }
}

if (warnings.length) {
  console.warn(`Resource queue warnings:\n- ${warnings.join("\n- ")}`);
}
if (failures.length) {
  console.error(`Resource queue check failed:\n- ${failures.join("\n- ")}`);
  process.exit(1);
}

console.log(
  `Resource queue check passed: ${queued.length} queued, ${published.length} released, ${managed.length} total.`
);
