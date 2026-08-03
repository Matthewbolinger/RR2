import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { business } from "../src/data.mjs";
import { searchConfig } from "../src/search-config.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const shouldSubmit = process.argv.includes("--submit");
const sitemapPath = join(root, "dist", "sitemap.xml");
const sitemap = await readFile(sitemapPath, "utf8");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => match[1]
);
const canonical = new URL(business.siteUrl);

if (!urls.length) {
  throw new Error(`No URLs found in ${sitemapPath}. Run npm run build first.`);
}

if (urls.length > 10_000) {
  throw new Error("IndexNow accepts no more than 10,000 URLs per request.");
}

for (const url of urls) {
  const parsed = new URL(url);
  if (parsed.protocol !== "https:" || parsed.host !== canonical.host) {
    throw new Error(`Refusing to submit a non-canonical URL: ${url}`);
  }
}

const payload = {
  host: canonical.host,
  key: searchConfig.indexNowKey,
  keyLocation: `${business.siteUrl}/${searchConfig.indexNowKey}.txt`,
  urlList: urls
};

if (!shouldSubmit) {
  console.log(
    `IndexNow dry run: ${urls.length} canonical URLs are ready for ${searchConfig.indexNowEndpoint}.`
  );
  console.log(JSON.stringify(payload, null, 2));
  process.exit(0);
}

let verificationResponse;
try {
  verificationResponse = await fetch(payload.keyLocation, {
    headers: {
      "user-agent": "RaccoonRestoration-IndexNow/1.0"
    },
    signal: AbortSignal.timeout(10_000)
  });
} catch (error) {
  console.log(
    `IndexNow submission skipped because the canonical key file is not reachable yet: ${error.message}`
  );
  process.exit(0);
}

const verificationBody = (await verificationResponse.text()).trim();
if (
  !verificationResponse.ok ||
  verificationBody !== searchConfig.indexNowKey
) {
  console.log(
    `IndexNow submission skipped because ${payload.keyLocation} is not live with the expected key. Re-run the workflow after the Vercel domain cutover.`
  );
  process.exit(0);
}

const response = await fetch(searchConfig.indexNowEndpoint, {
  method: "POST",
  headers: {
    "content-type": "application/json; charset=utf-8",
    "user-agent": "RaccoonRestoration-IndexNow/1.0"
  },
  body: JSON.stringify(payload)
});

const responseBody = (await response.text()).trim();
if (response.status !== 200 && response.status !== 202) {
  throw new Error(
    `IndexNow returned ${response.status}${responseBody ? `: ${responseBody}` : ""}`
  );
}

console.log(
  `IndexNow accepted ${urls.length} URLs with HTTP ${response.status}.`
);
