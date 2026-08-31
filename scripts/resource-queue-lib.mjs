import { existsSync } from "node:fs";
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const root = fileURLToPath(new URL("..", import.meta.url));
export const queueDirectory = join(root, "content", "resource-queue");
export const publishedDirectory = join(
  root,
  "content",
  "published-resources"
);

export async function loadResourceFiles(directory) {
  if (!existsSync(directory)) return [];
  const filenames = (await readdir(directory))
    .filter((filename) => filename.endsWith(".json"))
    .sort();
  return Promise.all(
    filenames.map(async (filename) => ({
      filename,
      path: join(directory, filename),
      article: JSON.parse(await readFile(join(directory, filename), "utf8"))
    }))
  );
}

export function articleText(article) {
  return [
    article.title,
    article.description,
    article.dek,
    ...(article.sections || []).flatMap((section) => [
      section.heading,
      ...(section.paragraphs || []),
      ...(section.bullets || []),
      ...(section.links || []).map((link) => link.label)
    ])
  ]
    .filter(Boolean)
    .join(" ");
}

export function articleWordCount(article) {
  return articleText(article)
    .replace(/[—–]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function externalLinks(article) {
  return (article.sections || [])
    .flatMap((section) => section.links || [])
    .filter((link) => /^https?:\/\//.test(link.href));
}

export function dateInChicago(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(date);
  const value = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${value.year}-${value.month}-${value.day}`;
}
