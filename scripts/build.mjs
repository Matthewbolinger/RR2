import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { business } from "../src/data.mjs";
import { legacyRedirects } from "../src/legacy-routes.mjs";
import { buildManifest, pages } from "../src/pages.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const dist = join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(dist, { recursive: true });

function outputPath(page) {
  if (page.output) return join(dist, page.output);
  if (page.path === "/") return join(dist, "index.html");
  return join(dist, page.path.replace(/^\/|\/$/g, ""), "index.html");
}

for (const page of pages) {
  const target = outputPath(page);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, page.html, "utf8");
}

await mkdir(join(dist, "assets", "images"), { recursive: true });
await mkdir(join(dist, "assets", "projects"), { recursive: true });
await mkdir(join(dist, "assets", "editorial-v2"), { recursive: true });
await cp(join(root, "src", "styles.css"), join(dist, "assets", "styles.css"));
await cp(join(root, "src", "main.js"), join(dist, "assets", "main.js"));

const projectAssets = new Set(
  pages.flatMap((page) =>
    [...page.html.matchAll(/\/assets\/projects\/([^"'?\s]+)/g)].map(
      (match) => match[1]
    )
  )
);

for (const name of projectAssets) {
  await cp(
    join(root, "public", "assets", "projects", name),
    join(dist, "assets", "projects", name)
  );
}

const editorialAssets = new Set(
  pages.flatMap((page) =>
    [...page.html.matchAll(/\/assets\/editorial-v2\/([^"'?\s]+)/g)].map(
      (match) => match[1]
    )
  )
);

for (const name of editorialAssets) {
  await cp(
    join(root, "public", "assets", "editorial-v2", name),
    join(dist, "assets", "editorial-v2", name)
  );
}
await cp(
  join(root, "public", "assets", "brand-pattern.svg"),
  join(dist, "assets", "brand-pattern.svg")
);
await cp(
  join(root, "public", "assets", "favicon.svg"),
  join(dist, "assets", "favicon.svg")
);
await cp(
  join(
    root,
    "public",
    "assets",
    "raccoon-restoration-logo-horizontal-web-480.png"
  ),
  join(
    dist,
    "assets",
    "raccoon-restoration-logo-horizontal-web-480.png"
  )
);
await cp(
  join(root, "public", "assets", "raccoon-restoration-logo.png"),
  join(dist, "assets", "raccoon-restoration-logo.png")
);
await cp(
  join(root, "public", "assets", "footer-brand-pattern.jpg"),
  join(dist, "assets", "footer-brand-pattern.jpg")
);
await cp(
  join(root, "public", "assets", "raccoon-restoration-social-preview.png"),
  join(dist, "assets", "raccoon-restoration-social-preview.png")
);

const imageAssets = new Set(
  pages.flatMap((page) =>
    [...page.html.matchAll(/\/assets\/images\/([^"'?\s]+)/g)].map(
      (match) => match[1]
    )
  )
);

for (const name of imageAssets) {
  await cp(
    join(root, "public", "assets", "images", name),
    join(dist, "assets", "images", name)
  );
}

const sitemapPages = pages.filter(
  (page) => !page.noSitemap && !page.html.includes('name="robots" content="noindex')
);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapPages
  .map(
    (page) => `  <url>
    <loc>${business.siteUrl}${page.path}</loc>
  </url>`
  )
  .join("\n")}
</urlset>
`;

await writeFile(join(dist, "sitemap.xml"), sitemap, "utf8");
await writeFile(
  join(dist, "robots.txt"),
  `User-agent: *
Allow: /

Sitemap: ${business.siteUrl}/sitemap.xml
`,
  "utf8"
);

await writeFile(
  join(dist, "_headers"),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN

/assets/*
  Cache-Control: public, max-age=3600, must-revalidate

/*.html
  Cache-Control: public, max-age=0, must-revalidate
`,
  "utf8"
);

await writeFile(
  join(dist, "_redirects"),
  `${legacyRedirects
    .map(
      ({ source, destination, status }) =>
        `${source} ${destination} ${status}`
    )
    .join("\n")}
`,
  "utf8"
);

await writeFile(
  join(dist, "content-manifest.json"),
  JSON.stringify(buildManifest, null, 2),
  "utf8"
);

console.log(
  `Built ${pages.length} pages, ${sitemapPages.length} indexable URLs, and production assets in dist/.`
);
