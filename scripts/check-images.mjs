import { createHash } from "node:crypto";
import { readFile, readdir, stat } from "node:fs/promises";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicRoot = join(root, "public");
const assetsRoot = join(publicRoot, "assets");
const sourceRoot = join(root, "src");
const distRoot = join(root, "dist");

const imageExtensions = new Set([
  ".avif",
  ".bmp",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp"
]);
const sourceExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".mjs",
  ".svg",
  ".txt",
  ".xml"
]);

const failures = [];
const warnings = [];

async function pathInfo(path) {
  try {
    return await stat(path);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function walkFiles(directory) {
  if (!(await pathInfo(directory))) return [];

  const files = [];
  const pending = [directory];
  while (pending.length) {
    const current = pending.pop();
    const entries = await readdir(current, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));
    for (const entry of entries) {
      const path = join(current, entry.name);
      if (entry.isDirectory()) pending.push(path);
      else if (entry.isFile()) files.push(path);
    }
  }
  return files.sort();
}

function isImagePath(path) {
  return imageExtensions.has(extname(path).toLowerCase());
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KiB`;
  return `${(bytes / 1024 ** 2).toFixed(2)} MiB`;
}

function mimeForExtension(path) {
  return (
    {
      ".avif": "image/avif",
      ".bmp": "image/bmp",
      ".gif": "image/gif",
      ".ico": "image/x-icon",
      ".jpeg": "image/jpeg",
      ".jpg": "image/jpeg",
      ".png": "image/png",
      ".svg": "image/svg+xml",
      ".webp": "image/webp"
    }[extname(path).toLowerCase()] ?? "application/octet-stream"
  );
}

function jpegDimensions(buffer) {
  const startOfFrameMarkers = new Set([
    0xc0,
    0xc1,
    0xc2,
    0xc3,
    0xc5,
    0xc6,
    0xc7,
    0xc9,
    0xca,
    0xcb,
    0xcd,
    0xce,
    0xcf
  ]);

  let offset = 2;
  while (offset + 3 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    while (offset < buffer.length && buffer[offset] === 0xff) offset += 1;
    if (offset >= buffer.length) break;

    const marker = buffer[offset];
    offset += 1;
    if (
      marker === 0xd8 ||
      marker === 0xd9 ||
      marker === 0x01 ||
      (marker >= 0xd0 && marker <= 0xd7)
    ) {
      continue;
    }
    if (offset + 1 >= buffer.length) break;

    const segmentLength = buffer.readUInt16BE(offset);
    if (segmentLength < 2 || offset + segmentLength > buffer.length) break;
    if (startOfFrameMarkers.has(marker) && segmentLength >= 7) {
      return {
        width: buffer.readUInt16BE(offset + 5),
        height: buffer.readUInt16BE(offset + 3)
      };
    }
    offset += segmentLength;
  }
  return {};
}

function webpDimensions(buffer) {
  let offset = 12;
  while (offset + 8 <= buffer.length) {
    const chunkType = buffer.toString("ascii", offset, offset + 4);
    const chunkLength = buffer.readUInt32LE(offset + 4);
    const dataOffset = offset + 8;
    if (dataOffset + chunkLength > buffer.length) break;

    if (chunkType === "VP8X" && chunkLength >= 10) {
      return {
        width: 1 + buffer.readUIntLE(dataOffset + 4, 3),
        height: 1 + buffer.readUIntLE(dataOffset + 7, 3)
      };
    }
    if (
      chunkType === "VP8L" &&
      chunkLength >= 5 &&
      buffer[dataOffset] === 0x2f
    ) {
      const bits = buffer.readUInt32LE(dataOffset + 1);
      return {
        width: 1 + (bits & 0x3fff),
        height: 1 + ((bits >>> 14) & 0x3fff)
      };
    }
    if (
      chunkType === "VP8 " &&
      chunkLength >= 10 &&
      buffer[dataOffset + 3] === 0x9d &&
      buffer[dataOffset + 4] === 0x01 &&
      buffer[dataOffset + 5] === 0x2a
    ) {
      return {
        width: buffer.readUInt16LE(dataOffset + 6) & 0x3fff,
        height: buffer.readUInt16LE(dataOffset + 8) & 0x3fff
      };
    }
    offset = dataOffset + chunkLength + (chunkLength % 2);
  }
  return {};
}

function svgDimensions(buffer) {
  const source = buffer.toString("utf8", 0, Math.min(buffer.length, 131072));
  const svg = source.match(/<svg\b[^>]*>/i)?.[0];
  if (!svg) return {};

  const numericAttribute = (name) => {
    const match = svg.match(
      new RegExp(`\\b${name}\\s*=\\s*["']\\s*([0-9]*\\.?[0-9]+)`, "i")
    );
    return match ? Number(match[1]) : null;
  };
  const width = numericAttribute("width");
  const height = numericAttribute("height");
  if (width && height) return { width, height };

  const viewBox = svg.match(
    /\bviewBox\s*=\s*["']\s*[-+.\d]+\s+[-+.\d]+\s+([-+.\d]+)\s+([-+.\d]+)/i
  );
  if (!viewBox) return {};
  return {
    width: width ?? Number(viewBox[1]),
    height: height ?? Number(viewBox[2])
  };
}

async function inspectImage(path) {
  const info = await stat(path);
  const buffer = await readFile(path);
  let type = mimeForExtension(path);
  let dimensions = {};

  if (
    buffer.length >= 24 &&
    buffer.subarray(0, 8).equals(
      Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])
    )
  ) {
    type = "image/png";
    dimensions = {
      width: buffer.readUInt32BE(16),
      height: buffer.readUInt32BE(20)
    };
  } else if (
    buffer.length >= 10 &&
    (buffer.toString("ascii", 0, 6) === "GIF87a" ||
      buffer.toString("ascii", 0, 6) === "GIF89a")
  ) {
    type = "image/gif";
    dimensions = {
      width: buffer.readUInt16LE(6),
      height: buffer.readUInt16LE(8)
    };
  } else if (
    buffer.length >= 4 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8
  ) {
    type = "image/jpeg";
    dimensions = jpegDimensions(buffer);
  } else if (
    buffer.length >= 16 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    type = "image/webp";
    dimensions = webpDimensions(buffer);
  } else if (
    extname(path).toLowerCase() === ".svg" ||
    buffer.toString("utf8", 0, Math.min(buffer.length, 512)).includes("<svg")
  ) {
    type = "image/svg+xml";
    dimensions = svgDimensions(buffer);
  }

  return {
    bytes: info.size,
    type,
    width: dimensions.width ?? null,
    height: dimensions.height ?? null
  };
}

function assetUrlToPublicPath(assetUrl) {
  let decoded = assetUrl;
  try {
    decoded = decodeURIComponent(assetUrl);
  } catch {
    // Keep malformed encoded paths intact so they are reported as missing.
  }
  const candidate = resolve(publicRoot, decoded.replace(/^\/+/, ""));
  if (
    candidate !== publicRoot &&
    !candidate.startsWith(`${publicRoot}${sep}`)
  ) {
    return null;
  }
  return candidate;
}

function lineNumberAt(source, index) {
  let line = 1;
  for (let cursor = 0; cursor < index; cursor += 1) {
    if (source.charCodeAt(cursor) === 10) line += 1;
  }
  return line;
}

function extractImageAssetOccurrences(source) {
  const expression = /\/assets\/[A-Za-z0-9._~!$&+,;=:@%/-]+/g;
  const occurrences = [];
  let match;
  while ((match = expression.exec(source))) {
    if (!isImagePath(match[0])) continue;
    occurrences.push({
      url: match[0],
      line: lineNumberAt(source, match.index)
    });
  }
  return occurrences;
}

function attributeValue(tag, name) {
  const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = tag.match(
    new RegExp(
      `\\b${escapedName}\\s*=\\s*(?:"([^"]*)"|'([^']*)'|([^\\s>]+))`,
      "i"
    )
  );
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? null;
}

function pageLabel(htmlPath) {
  const path = relative(distRoot, htmlPath).replaceAll(sep, "/");
  if (path === "index.html") return "/";
  if (path.endsWith("/index.html")) return `/${path.slice(0, -10)}`;
  return `/${path}`;
}

function addCount(map, key, page) {
  const existing = map.get(key) ?? { placements: 0, pages: new Set() };
  existing.placements += 1;
  if (page) existing.pages.add(page);
  map.set(key, existing);
}

function printSection(title, lines, emptyMessage = "None.") {
  console.log(`\n${title}`);
  console.log("-".repeat(title.length));
  if (!lines.length) {
    console.log(emptyMessage);
    return;
  }
  for (const line of lines) console.log(line);
}

const publicAssetFiles = await walkFiles(assetsRoot);
const publicImageFiles = publicAssetFiles.filter(isImagePath);
const publicImageInfo = new Map();
const hashes = new Map();

for (const path of publicImageFiles) {
  const info = await inspectImage(path);
  publicImageInfo.set(path, info);
  if (info.bytes === 0) {
    failures.push(
      `Zero-size image: ${relative(root, path).replaceAll(sep, "/")}`
    );
    continue;
  }
  const digest = createHash("sha256").update(await readFile(path)).digest("hex");
  const group = hashes.get(digest) ?? [];
  group.push(path);
  hashes.set(digest, group);
}

const sourceFiles = (await walkFiles(sourceRoot)).filter((path) =>
  sourceExtensions.has(extname(path).toLowerCase())
);
const sourceReferenceCounts = new Map();
const sourceReferenceLocations = new Map();

for (const path of sourceFiles) {
  const source = await readFile(path, "utf8");
  for (const occurrence of extractImageAssetOccurrences(source)) {
    sourceReferenceCounts.set(
      occurrence.url,
      (sourceReferenceCounts.get(occurrence.url) ?? 0) + 1
    );
    const locations = sourceReferenceLocations.get(occurrence.url) ?? [];
    locations.push(
      `${relative(root, path).replaceAll(sep, "/")}:${occurrence.line}`
    );
    sourceReferenceLocations.set(occurrence.url, locations);
  }
}

const missingSourceReferences = [];
for (const assetUrl of sourceReferenceCounts.keys()) {
  const path = assetUrlToPublicPath(assetUrl);
  if (!path || !(await pathInfo(path))) {
    missingSourceReferences.push(assetUrl);
    failures.push(
      `Missing referenced image: ${assetUrl} (${sourceReferenceLocations
        .get(assetUrl)
        .join(", ")})`
    );
  }
}

const activeImageUrls = [...sourceReferenceCounts.keys()].sort();
const activeImageRows = [];
for (const assetUrl of activeImageUrls) {
  const path = assetUrlToPublicPath(assetUrl);
  if (!path || !(await pathInfo(path))) continue;
  const info = publicImageInfo.get(path) ?? (await inspectImage(path));
  const dimensions =
    info.width && info.height ? `${info.width}×${info.height}` : "unknown";
  if (!info.width || !info.height) {
    warnings.push(`Could not read intrinsic dimensions for ${assetUrl}`);
  }
  activeImageRows.push(
    `${assetUrl} | ${info.type} | ${dimensions} | ${formatBytes(
      info.bytes
    )} | ${sourceReferenceCounts.get(assetUrl)} source ref(s)`
  );
}

const duplicateGroups = [...hashes.values()]
  .filter((group) => group.length > 1)
  .sort((a, b) => a[0].localeCompare(b[0]));
for (const group of duplicateGroups) {
  warnings.push(
    `Exact duplicate files: ${group
      .map((path) => relative(root, path).replaceAll(sep, "/"))
      .join(", ")}`
  );
}

const distInfo = await pathInfo(distRoot);
const htmlFiles = distInfo
  ? (await walkFiles(distRoot)).filter(
      (path) => extname(path).toLowerCase() === ".html"
    )
  : [];
const visibleReuse = new Map();
const dimensionDifferences = new Map();
const missingDistReferences = new Set();

for (const htmlPath of htmlFiles) {
  const html = await readFile(htmlPath, "utf8");
  const page = pageLabel(htmlPath);
  for (const match of html.matchAll(/<img\b[^>]*>/gis)) {
    const tag = match[0];
    const src = attributeValue(tag, "src");
    if (!src || !src.startsWith("/assets/") || !isImagePath(src)) continue;
    addCount(visibleReuse, src, page);

    const publicPath = assetUrlToPublicPath(src);
    if (!publicPath || !(await pathInfo(publicPath))) {
      const key = `${src} on ${page}`;
      if (!missingDistReferences.has(key)) {
        missingDistReferences.add(key);
        failures.push(`Missing generated HTML image: ${key}`);
      }
      continue;
    }

    const imageInfo =
      publicImageInfo.get(publicPath) ?? (await inspectImage(publicPath));
    const declaredWidth = Number(attributeValue(tag, "width"));
    const declaredHeight = Number(attributeValue(tag, "height"));
    if (
      !Number.isFinite(declaredWidth) ||
      declaredWidth <= 0 ||
      !Number.isFinite(declaredHeight) ||
      declaredHeight <= 0
    ) {
      warnings.push(`${page}: ${src} is missing valid width/height attributes`);
      continue;
    }
    if (!imageInfo.width || !imageInfo.height) continue;
    if (
      declaredWidth !== imageInfo.width ||
      declaredHeight !== imageInfo.height
    ) {
      const declaredRatio = declaredWidth / declaredHeight;
      const intrinsicRatio = imageInfo.width / imageInfo.height;
      const ratioDelta = Math.abs(declaredRatio / intrinsicRatio - 1);
      const key = [
        src,
        `${declaredWidth}×${declaredHeight}`,
        `${imageInfo.width}×${imageInfo.height}`
      ].join("|");
      const difference = dimensionDifferences.get(key) ?? {
        src,
        declared: `${declaredWidth}×${declaredHeight}`,
        intrinsic: `${imageInfo.width}×${imageInfo.height}`,
        ratioDelta,
        pages: new Set()
      };
      difference.pages.add(page);
      dimensionDifferences.set(key, difference);
    }
  }
}

for (const difference of dimensionDifferences.values()) {
  const severity =
    difference.ratioDelta > 0.01
      ? `aspect differs ${(difference.ratioDelta * 100).toFixed(1)}%`
      : "aspect preserved";
  warnings.push(
    `${difference.src}: declared ${difference.declared}, intrinsic ${
      difference.intrinsic
    } (${severity}; ${difference.pages.size} page(s))`
  );
}

console.log("Raccoon Restoration image quality gate");
console.log("======================================");
console.log(`Public image files: ${publicImageFiles.length}`);
console.log(`Active source-referenced images: ${activeImageRows.length}`);
console.log(
  `Generated HTML reviewed: ${
    htmlFiles.length ? `${htmlFiles.length} file(s)` : "not present"
  }`
);

printSection("Active image inventory", activeImageRows);

printSection(
  "Exact duplicate image files",
  duplicateGroups.map((group, index) => {
    const firstInfo = publicImageInfo.get(group[0]);
    return `${index + 1}. ${formatBytes(firstInfo.bytes)}\n${group
      .map(
        (path) => `   - ${relative(root, path).replaceAll(sep, "/")}`
      )
      .join("\n")}`;
  })
);

const visibleReuseRows = [...visibleReuse.entries()]
  .sort(
    ([firstUrl, first], [secondUrl, second]) =>
      second.placements - first.placements || firstUrl.localeCompare(secondUrl)
  )
  .map(
    ([url, usage]) =>
      `${url} | ${usage.placements} visible placement(s) across ${
        usage.pages.size
      } page(s)`
  );
printSection(
  "Visible source reuse (generated HTML <img> placements)",
  visibleReuseRows,
  htmlFiles.length ? "No visible image placements found." : "dist/ not present."
);

const dimensionRows = [...dimensionDifferences.values()]
  .sort(
    (a, b) =>
      b.ratioDelta - a.ratioDelta ||
      a.src.localeCompare(b.src) ||
      a.declared.localeCompare(b.declared)
  )
  .map((difference) => {
    const note =
      difference.ratioDelta > 0.01
        ? `ASPECT WARNING ${(difference.ratioDelta * 100).toFixed(1)}%`
        : "aspect preserved";
    return `${difference.src} | declared ${difference.declared} | intrinsic ${
      difference.intrinsic
    } | ${note} | ${difference.pages.size} page(s)`;
  });
printSection(
  "Generated HTML intrinsic dimension differences",
  dimensionRows,
  htmlFiles.length ? "None." : "dist/ not present."
);

printSection(
  "Missing referenced images",
  [...missingSourceReferences, ...missingDistReferences].map(
    (item) => `- ${item}`
  )
);

printSection("Warnings", warnings.map((warning) => `- ${warning}`));
printSection("Failures", failures.map((failure) => `- ${failure}`));

if (failures.length) {
  console.error(
    `\nImage quality gate failed with ${failures.length} blocking issue(s).`
  );
  process.exitCode = 1;
} else {
  console.log(
    `\nImage quality gate passed. ${warnings.length} warning(s) require review but do not fail the gate.`
  );
}
