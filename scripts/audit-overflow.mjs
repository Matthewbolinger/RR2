// Horizontal-overflow audit: scans every route at desktop and mobile widths for
// elements whose bounding box escapes the viewport. Exits non-zero on findings.
import {
  ensureServer,
  launchBrowser,
  openTab,
  PREVIEW,
  ROUTES,
  VIEWPORTS,
} from "./audit-lib.mjs";

const PORT = 9401;

const SCAN = `(() => {
  const vw = document.documentElement.clientWidth;
  const bad = [];
  for (const el of document.querySelectorAll("h1,h2,h3,p,a,button,li,figcaption")) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) continue;
    const over = Math.round(Math.max(rect.right - vw, -rect.left));
    if (over > 8) {
      const text = (el.textContent || "").trim().slice(0, 50);
      if (text) bad.push({ tag: el.tagName, over, text });
    }
  }
  const seen = new Set();
  return bad
    .filter((b) => (seen.has(b.text) ? false : seen.add(b.text)))
    .slice(0, 6);
})()`;

const stopServer = await ensureServer();
const chrome = await launchBrowser(PORT);
const tab = await openTab(PORT);

const findings = {};
try {
  for (const [label, vp] of Object.entries(VIEWPORTS)) {
    await tab.setViewport(vp.width, vp.height, vp.dpr, vp.mobile);
    for (const route of ROUTES) {
      await tab.navigate(`${PREVIEW}${route}`, 250);
      const bad = await tab.evaluate(SCAN, false, 10000);
      const key = `${label} ${route}`;
      if (bad && bad.length) {
        findings[key] = bad;
        console.log(`OVERFLOW ${key}: ${JSON.stringify(bad)}`);
      } else {
        console.log(`ok ${key}`);
      }
    }
  }
} finally {
  await tab.close(PORT);
  chrome.kill();
  stopServer();
}

const count = Object.keys(findings).length;
console.log(`\nOverflow audit: ${count} route/viewport combinations with findings.`);
if (count > 0) process.exit(1);
