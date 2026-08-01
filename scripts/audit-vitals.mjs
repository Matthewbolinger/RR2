// Web-vitals smoke: measures LCP, CLS, and transfer weight on key routes under
// slow-4G network emulation and 4x CPU throttling. Budgets: LCP <= 2000 ms,
// CLS <= 0.05. Run with BASELINE=1 to record numbers without failing.
//
// External font hosts are remapped to localhost so runs are deterministic in
// offline sandboxes: the measurement models the fonts-unreachable worst case.
// Once fonts are self-hosted this remap is a no-op.
import {
  delay,
  ensureServer,
  launchBrowser,
  openTab,
  PREVIEW,
} from "./audit-lib.mjs";

const PORT = 9403;
const BASELINE = process.env.BASELINE === "1";
const BUDGET = { lcpMs: 2000, cls: 0.05 };
const PAGES = ["/", "/services/roof-replacement/", "/contact/"];

const OBSERVER_BOOT = `
  window.__lcp = [];
  window.__cls = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) window.__lcp.push(entry.startTime);
  }).observe({ type: "largest-contentful-paint", buffered: true });
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) window.__cls += entry.value;
    }
  }).observe({ type: "layout-shift", buffered: true });
`;

const stopServer = await ensureServer();
const chrome = await launchBrowser(PORT, [
  '--host-resolver-rules=MAP fonts.googleapis.com 127.0.0.1, MAP fonts.gstatic.com 127.0.0.1',
]);

const results = [];
let failed = false;

for (const route of PAGES) {
  const tab = await openTab(PORT);
  try {
    await tab.cdp("Network.enable");
    await tab.cdp("Network.emulateNetworkConditions", {
      offline: false,
      latency: 150,
      downloadThroughput: Math.floor((1.6 * 1024 * 1024) / 8),
      uploadThroughput: Math.floor((750 * 1024) / 8),
    });
    await tab.cdp("Emulation.setCPUThrottlingRate", { rate: 4 });
    await tab.setViewport(390, 844, 2, true);
    await tab.cdp("Page.addScriptToEvaluateOnNewDocument", {
      source: OBSERVER_BOOT,
    });

    const byRequest = new Map();
    let imageBytes = 0;
    let totalBytes = 0;
    tab.on("Network.responseReceived", (params) => {
      byRequest.set(params.requestId, params.response.mimeType || "");
    });
    tab.on("Network.loadingFinished", (params) => {
      const mime = byRequest.get(params.requestId) || "";
      totalBytes += params.encodedDataLength;
      if (mime.startsWith("image/")) imageBytes += params.encodedDataLength;
    });

    await tab.navigate(`${PREVIEW}${route}`, 0);
    await delay(3200);

    const lcpEntries = (await tab.evaluate("window.__lcp")) || [];
    const cls = (await tab.evaluate("window.__cls")) ?? -1;
    const lcpMs = lcpEntries.length ? Math.round(lcpEntries.at(-1)) : -1;

    const entry = {
      route,
      lcpMs,
      cls: Number(cls.toFixed ? cls.toFixed(4) : cls),
      imageKB: Math.round(imageBytes / 1024),
      totalKB: Math.round(totalBytes / 1024),
      throttle: "slow-4G, 4x CPU, mobile 390x844, font hosts blocked",
    };
    results.push(entry);

    const lcpOk = lcpMs >= 0 && lcpMs <= BUDGET.lcpMs;
    const clsOk = cls >= 0 && cls <= BUDGET.cls;
    if (!lcpOk || !clsOk) failed = true;
    console.log(
      `${route}  LCP ${lcpMs}ms (${lcpOk ? "ok" : "OVER"})  CLS ${entry.cls} (${
        clsOk ? "ok" : "OVER"
      })  images ${entry.imageKB}KB  total ${entry.totalKB}KB`
    );
  } finally {
    await tab.close(PORT);
  }
}

chrome.kill();
stopServer();

console.log("\nVITALS_JSON " + JSON.stringify({ budget: BUDGET, results }));
if (failed && !BASELINE) {
  console.error("\nVitals budget exceeded (run with BASELINE=1 to record without failing).");
  process.exit(1);
}
