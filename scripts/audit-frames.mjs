// Frame capture: the homepage scroll frame-by-frame (desktop + mobile) plus
// above-the-fold captures of every route, for visual diff review. Output goes
// to screenshots/audit/ (gitignored) — these are working artifacts, not fixtures.
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  delay,
  ensureServer,
  launchBrowser,
  openTab,
  PREVIEW,
  ROUTES,
  VIEWPORTS,
} from "./audit-lib.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const OUT = join(root, "screenshots/audit");
const PORT = 9402;

await mkdir(OUT, { recursive: true });
const stopServer = await ensureServer();
const chrome = await launchBrowser(PORT);
const tab = await openTab(PORT);

async function shot(file, quality = 66) {
  const result = await tab.cdp("Page.captureScreenshot", {
    format: "jpeg",
    quality,
  });
  if (result?.data) {
    await writeFile(join(OUT, file), Buffer.from(result.data, "base64"));
    console.log("saved", file);
  } else {
    console.error("FAILED capture", file);
  }
}

async function scrollFrames(route, name, vp, maxFrames = 18) {
  await tab.setViewport(vp.width, vp.height, vp.dpr, vp.mobile);
  await tab.navigate(`${PREVIEW}${route}`, 1100);
  const total = await tab.evaluate("document.documentElement.scrollHeight");
  const steps = Math.min(maxFrames, Math.max(1, Math.ceil(total / vp.height)));
  for (let i = 0; i < steps; i++) {
    let y = i * vp.height;
    if (y + vp.height > total) y = Math.max(0, total - vp.height);
    await tab.evaluate(`window.scrollTo({ top: ${y}, behavior: "instant" })`);
    await delay(950);
    await shot(`${name}-f${String(i + 1).padStart(2, "0")}.jpg`);
    if (y + vp.height >= total) break;
  }
}

try {
  await scrollFrames("/", "home-desktop", VIEWPORTS.desktop);
  await scrollFrames("/", "home-mobile", VIEWPORTS.mobile);

  // Open mobile navigation state.
  await tab.setViewport(390, 844, 2, true);
  await tab.navigate(`${PREVIEW}/`, 900);
  await tab.evaluate(
    `document.querySelector('[data-nav-toggle], .nav-toggle, button[aria-controls]')?.click()`
  );
  await delay(900);
  await shot("home-mobile-nav-open.jpg");

  // Above-the-fold for every route, desktop + mobile.
  for (const [label, vp] of Object.entries(VIEWPORTS)) {
    await tab.setViewport(vp.width, vp.height, vp.dpr, vp.mobile);
    for (const route of ROUTES) {
      const slug =
        route === "/" ? "home" : route.replaceAll("/", " ").trim().replaceAll(" ", "-");
      if (slug === "home") continue;
      await tab.navigate(`${PREVIEW}${route}`, 900);
      await shot(`${slug}-${label}-fold.jpg`);
    }
  }
} finally {
  await tab.close(PORT);
  chrome.kill();
  stopServer();
}
console.log("Frame capture complete →", OUT);
