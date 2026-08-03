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
  const inScroller = (el) => {
    for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
      const cs = getComputedStyle(n);
      if ((cs.overflowX === "auto" || cs.overflowX === "scroll") && n.scrollWidth > n.clientWidth + 4) {
        return true;
      }
    }
    return false;
  };
  for (const el of document.querySelectorAll("h1,h2,h3,p,a,button,li,figcaption")) {
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) continue;
    const over = Math.round(Math.max(rect.right - vw, -rect.left));
    if (over > 8 && !inScroller(el)) {
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
await tab.cdp("Log.enable");
await tab.cdp("Network.enable");

const findings = {};
const runtimeIssues = {};
let currentKey = "";
const isExpectedThirdPartyFailure = (url = "") =>
  url.startsWith(
    "https://cdn.idpixel.app/v1/idp-analytics-6a57c20f5c012440693ab2b9.min.js"
  ) ||
  url.startsWith(
    "https://collector.idpixel.app/v1/batch?pid=6a57c20f5c012440693ab2b9"
  );
const recordRuntimeIssue = (message) => {
  if (!currentKey || !message) return;
  const issues = runtimeIssues[currentKey] || [];
  if (!issues.includes(message)) issues.push(message);
  runtimeIssues[currentKey] = issues.slice(0, 8);
};

tab.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
  recordRuntimeIssue(
    `exception: ${exceptionDetails?.exception?.description || exceptionDetails?.text || "unknown"}`
  );
});
tab.on("Runtime.consoleAPICalled", ({ type, args = [] }) => {
  if (type !== "error" && type !== "assert") return;
  recordRuntimeIssue(
    `console.${type}: ${args.map((arg) => arg.value ?? arg.description ?? "").join(" ")}`
  );
});
tab.on("Log.entryAdded", ({ entry }) => {
  if (isExpectedThirdPartyFailure(entry?.url)) return;
  if (entry?.level === "error") {
    recordRuntimeIssue(
      `log: ${entry.text || "unknown"}${entry.url ? ` (${entry.url})` : ""}`
    );
  }
});
tab.on("Network.responseReceived", ({ response, type }) => {
  if (!response || response.status < 400) return;
  if (isExpectedThirdPartyFailure(response.url)) return;
  const expected404 =
    currentKey.endsWith(" /404.html") && type === "Document" && response.status === 404;
  if (!expected404) {
    recordRuntimeIssue(
      `http ${Math.round(response.status)} (${type || "Other"}): ${response.url}`
    );
  }
});

try {
  for (const [label, vp] of Object.entries(VIEWPORTS)) {
    await tab.setViewport(vp.width, vp.height, vp.dpr, vp.mobile);
    for (const route of ROUTES) {
      currentKey = `${label} ${route}`;
      await tab.navigate(`${PREVIEW}${route}`, 250);
      const bad = await tab.evaluate(SCAN, false, 10000);
      const key = currentKey;
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
const runtimeCount = Object.keys(runtimeIssues).length;
console.log(`\nOverflow audit: ${count} route/viewport combinations with findings.`);
console.log(`Runtime audit: ${runtimeCount} route/viewport combinations with errors.`);
for (const [key, issues] of Object.entries(runtimeIssues)) {
  console.log(`RUNTIME ${key}: ${JSON.stringify(issues)}`);
}
if (count > 0 || runtimeCount > 0) process.exit(1);
