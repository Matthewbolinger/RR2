import { access, readFile, readdir } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");
const canonicalOrigin = "https://www.raccoonrestoration.com";
const canonicalSitemap = `${canonicalOrigin}/sitemap.xml`;
const failures = [];
const stats = {
  indexableHtml: 0,
  sitemapUrls: 0,
  resourceArticlesWithSources: 0,
  indexNow: "not configured"
};

const fail = (scope, message) => failures.push(`${scope}: ${message}`);

const exists = async (path) => {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
};

const walk = async (directory) => {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? walk(path) : [path];
    })
  );
  return files.flat();
};

const decodeXml = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&apos;", "'");

const textFromTag = (source, tag) => {
  const match = source.match(
    new RegExp(`<${tag}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${tag}>`, "i")
  );
  return match ? decodeXml(match[1].trim()) : null;
};

const attrFromTag = (tag, attribute) => {
  const match = tag.match(
    new RegExp(`\\b${attribute}\\s*=\\s*(?:"([^"]*)"|'([^']*)')`, "i")
  );
  return match ? match[1] ?? match[2] : null;
};

const tags = (html, name) =>
  [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, "gi"))].map(
    (match) => match[0]
  );

const canonicalUrl = (value, scope) => {
  try {
    const url = new URL(value);
    if (url.origin !== canonicalOrigin) {
      fail(scope, `must use the canonical www origin (${canonicalOrigin}); found ${value}`);
    }
    if (url.search || url.hash) {
      fail(scope, `canonical URLs cannot include a query or fragment; found ${value}`);
    }
    return url;
  } catch {
    fail(scope, `invalid URL: ${value}`);
    return null;
  }
};

const flattenJsonLd = (value, nodes = []) => {
  if (Array.isArray(value)) {
    value.forEach((item) => flattenJsonLd(item, nodes));
    return nodes;
  }
  if (!value || typeof value !== "object") return nodes;
  nodes.push(value);
  if (Array.isArray(value["@graph"])) {
    value["@graph"].forEach((item) => flattenJsonLd(item, nodes));
  }
  return nodes;
};

const nodeHasType = (node, expected) => {
  const types = Array.isArray(node?.["@type"])
    ? node["@type"]
    : [node?.["@type"]];
  return types.some((type) => expected.includes(type));
};

const nonempty = (value) => {
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0 && value.every(nonempty);
  if (value && typeof value === "object") return Object.keys(value).length > 0;
  return value !== null && value !== undefined;
};

const parseJsonLd = (html, scope) => {
  const scripts = [
    ...html.matchAll(
      /<script\b[^>]*type\s*=\s*(?:"application\/ld\+json"|'application\/ld\+json')[^>]*>([\s\S]*?)<\/script>/gi
    )
  ];
  if (!scripts.length) {
    fail(scope, "missing application/ld+json structured data");
    return [];
  }

  const nodes = [];
  scripts.forEach((match, index) => {
    try {
      flattenJsonLd(JSON.parse(match[1]), nodes);
    } catch (error) {
      fail(scope, `JSON-LD block ${index + 1} is invalid: ${error.message}`);
    }
  });
  return nodes;
};

const robots = await readFile(join(dist, "robots.txt"), "utf8").catch(() => null);
if (robots === null) {
  fail("robots.txt", "missing generated robots.txt");
} else {
  const groups = robots
    .split(/\r?\n(?=\s*user-agent\s*:)/i)
    .map((block) => block.trim())
    .filter(Boolean);
  const oaiGroup = groups.find((block) =>
    /^user-agent\s*:\s*oai-searchbot\s*$/im.test(block)
  );

  if (!oaiGroup) {
    fail("robots.txt", "must include an explicit User-agent: OAI-SearchBot group");
  } else {
    if (!/^allow\s*:\s*\/\s*$/im.test(oaiGroup)) {
      fail("robots.txt", "OAI-SearchBot group must explicitly include Allow: /");
    }
    if (/^disallow\s*:\s*\/\s*$/im.test(oaiGroup)) {
      fail("robots.txt", "OAI-SearchBot cannot be disallowed from /");
    }
  }

  const sitemapDirectives = [
    ...robots.matchAll(/^sitemap\s*:\s*(\S+)\s*$/gim)
  ].map((match) => match[1]);
  if (!sitemapDirectives.includes(canonicalSitemap)) {
    fail("robots.txt", `must reference ${canonicalSitemap}`);
  }
}

const sitemapXml = await readFile(join(dist, "sitemap.xml"), "utf8").catch(
  () => null
);
const sitemapUrls = new Set();
if (sitemapXml === null) {
  fail("sitemap.xml", "missing generated sitemap.xml");
} else {
  const urlBlocks = [
    ...sitemapXml.matchAll(/<url(?:\s[^>]*)?>([\s\S]*?)<\/url>/gi)
  ].map((match) => match[1]);
  stats.sitemapUrls = urlBlocks.length;
  if (!urlBlocks.length) fail("sitemap.xml", "contains no <url> entries");

  urlBlocks.forEach((block, index) => {
    const scope = `sitemap.xml URL ${index + 1}`;
    const loc = textFromTag(block, "loc");
    const lastmod = textFromTag(block, "lastmod");
    if (!loc) {
      fail(scope, "missing <loc>");
    } else {
      canonicalUrl(loc, scope);
      if (sitemapUrls.has(loc)) fail(scope, `duplicate <loc>: ${loc}`);
      sitemapUrls.add(loc);
    }

    if (!lastmod) {
      fail(scope, "missing <lastmod>");
    } else {
      const fullDate = /^\d{4}-\d{2}-\d{2}$/;
      const dateTime =
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/;
      if (
        (!fullDate.test(lastmod) && !dateTime.test(lastmod)) ||
        Number.isNaN(Date.parse(lastmod))
      ) {
        fail(scope, `lastmod must be an ISO 8601 date or datetime; found ${lastmod}`);
      }
    }
  });
}

const htmlFiles = (await walk(dist)).filter((path) => path.endsWith(".html"));
let homepageNodes = null;

for (const file of htmlFiles) {
  const html = await readFile(file, "utf8");
  const scope = relative(dist, file);
  const robotsMeta = tags(html, "meta").find(
    (tag) => attrFromTag(tag, "name")?.toLowerCase() === "robots"
  );
  const robotsContent = robotsMeta
    ? attrFromTag(robotsMeta, "content")?.toLowerCase() || ""
    : "";
  if (robotsContent.split(/\s*,\s*/).includes("noindex")) continue;

  stats.indexableHtml += 1;
  const canonicalTags = tags(html, "link").filter((tag) =>
    (attrFromTag(tag, "rel") || "")
      .toLowerCase()
      .split(/\s+/)
      .includes("canonical")
  );
  if (canonicalTags.length !== 1) {
    fail(scope, `expected exactly one canonical link; found ${canonicalTags.length}`);
  }

  const href =
    canonicalTags.length === 1 ? attrFromTag(canonicalTags[0], "href") : null;
  if (!href) {
    if (canonicalTags.length === 1) fail(scope, "canonical link is missing href");
  } else {
    canonicalUrl(href, scope);
    if (sitemapXml !== null && !sitemapUrls.has(href)) {
      fail(scope, `indexable canonical is absent from sitemap.xml: ${href}`);
    }
  }

  const nodes = parseJsonLd(html, scope);
  if (scope === "index.html") homepageNodes = nodes;

  const route = href ? new URL(href, canonicalOrigin).pathname : "";
  const isResourceArticle =
    /^\/resources\/[^/]+\/$/.test(route) && route !== "/resources/";
  if (!isResourceArticle) continue;

  const articleNode = nodes.find((node) =>
    nodeHasType(node, ["Article", "BlogPosting", "NewsArticle"])
  );
  if (!articleNode) {
    fail(scope, "resource article is missing Article JSON-LD");
    continue;
  }

  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || "";
  const outboundSources = [
    ...main.matchAll(/<a\b[^>]*href\s*=\s*(?:"(https?:\/\/[^"]+)"|'(https?:\/\/[^']+)')[^>]*>/gi)
  ]
    .map((match) => match[1] ?? match[2])
    .filter((hrefValue) => {
      try {
        return new URL(hrefValue).origin !== canonicalOrigin;
      } catch {
        return false;
      }
    });

  if (outboundSources.length) {
    stats.resourceArticlesWithSources += 1;
    if (!nonempty(articleNode.citation)) {
      fail(
        scope,
        `Article JSON-LD needs a nonempty citation because the article links to ${outboundSources.length} external source(s)`
      );
    }
  }
}

if (!homepageNodes) {
  fail("index.html", "homepage is missing or marked noindex");
} else {
  const contractor = homepageNodes.find((node) =>
    nodeHasType(node, ["RoofingContractor"])
  );
  if (!contractor) {
    fail("index.html", "homepage JSON-LD is missing a RoofingContractor node");
  } else {
    const requirements = {
      name: contractor.name,
      url: contractor.url,
      telephone: contractor.telephone,
      email: contractor.email,
      address: contractor.address,
      areaServed: contractor.areaServed,
      credential: contractor.hasCredential ?? contractor.credential,
      sameAs: contractor.sameAs,
      hasOfferCatalog: contractor.hasOfferCatalog
    };
    for (const [field, value] of Object.entries(requirements)) {
      if (!nonempty(value)) {
        fail("index.html", `RoofingContractor JSON-LD is missing ${field}`);
      }
    }
    if (nonempty(contractor.url)) canonicalUrl(contractor.url, "index.html RoofingContractor");
  }
}

const searchConfigPath = join(root, "src", "search-config.mjs");
if (await exists(searchConfigPath)) {
  try {
    const imported = await import(
      `${pathToFileURL(searchConfigPath).href}?check=${Date.now()}`
    );
    const config = imported.searchConfig ?? imported.default ?? imported;
    const indexNow = config.indexNow ?? imported.indexNow ?? {};
    const key =
      indexNow.key ??
      config.indexNowKey ??
      imported.indexNowKey ??
      imported.INDEXNOW_KEY;
    const configuredFile =
      indexNow.keyFile ??
      indexNow.keyPath ??
      config.indexNowKeyFile ??
      config.indexNowKeyPath ??
      imported.indexNowKeyFile ??
      imported.indexNowKeyPath;

    if (key || configuredFile) {
      const keyFile = configuredFile
        ? join(
            dist,
            configuredFile
              .replace(canonicalOrigin, "")
              .replace(/^\/+/, "")
          )
        : join(dist, `${key}.txt`);
      const content = await readFile(keyFile, "utf8").catch(() => null);
      if (content === null) {
        fail(
          "IndexNow",
          `configured key file is missing from dist: ${relative(dist, keyFile)}`
        );
      } else if (!key) {
        fail("IndexNow", "search config provides a key file but no IndexNow key");
      } else if (content.trim() !== String(key).trim()) {
        fail("IndexNow", "generated key file content does not match the configured key");
      } else {
        stats.indexNow = `verified ${relative(dist, keyFile)}`;
      }
    }
  } catch (error) {
    fail("src/search-config.mjs", `could not import local search config: ${error.message}`);
  }
}

if (failures.length) {
  console.error(`AI-search check failed with ${failures.length} issue(s):`);
  failures.forEach((message) => console.error(`- ${message}`));
  process.exitCode = 1;
} else {
  console.log(
    `AI-search check passed: ${stats.indexableHtml} indexable HTML files, ` +
      `${stats.sitemapUrls} sitemap URLs, ${stats.resourceArticlesWithSources} ` +
      `cited resource articles; IndexNow ${stats.indexNow}.`
  );
}
