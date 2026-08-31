import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import {
  dateInChicago,
  loadResourceFiles,
  publishedDirectory,
  queueDirectory
} from "./resource-queue-lib.mjs";

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const dateArgument = args.find((arg) => arg.startsWith("--date="))?.split("=")[1];
const slugArgument = args.find((arg) => arg.startsWith("--slug="))?.split("=")[1];
const releaseDate = dateArgument || dateInChicago();

if (!/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)) {
  throw new Error("--date must use YYYY-MM-DD");
}

const queued = await loadResourceFiles(queueDirectory);
const published = await loadResourceFiles(publishedDirectory);
const publishedSequences = new Set(
  published.map(({ article }) => article.sequence)
);
const candidates = queued
  .filter(({ article }) =>
    slugArgument
      ? article.slug === slugArgument
      : article.releaseDate <= releaseDate
  )
  .sort((a, b) => a.article.sequence - b.article.sequence);

if (!candidates.length) {
  console.log(
    slugArgument
      ? `No queued resource matches ${slugArgument}.`
      : `No resource is due on or before ${releaseDate}.`
  );
  process.exit(0);
}

const next = candidates[0];
for (let sequence = 1; sequence < next.article.sequence; sequence += 1) {
  if (!publishedSequences.has(sequence)) {
    throw new Error(
      `Cannot release sequence ${next.article.sequence}; sequence ${sequence} is not published.`
    );
  }
}

console.log(
  `${dryRun ? "Would release" : "Releasing"} #${next.article.sequence}: ${next.article.title} (${next.article.releaseDate})`
);

if (dryRun) process.exit(0);

await mkdir(publishedDirectory, { recursive: true });
const destination = join(publishedDirectory, next.filename);
await writeFile(
  destination,
  `${JSON.stringify(
    {
      ...next.article,
      status: "published",
      releasedAt: releaseDate
    },
    null,
    2
  )}\n`
);
await unlink(next.path);

console.log(`Moved ${next.filename} into the published resource collection.`);
