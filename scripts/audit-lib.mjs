// Shared CDP plumbing for the audit scripts. Dependency-free: drives a local
// Chromium over the DevTools protocol using Node's built-in WebSocket (Node 20+).
import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { join } from "node:path";

const root = fileURLToPath(new URL("..", import.meta.url));

export const PREVIEW = process.env.PREVIEW_URL || "http://127.0.0.1:4173";

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  "/opt/pw-browsers/chromium",
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
].filter(Boolean);

export function findChrome() {
  for (const candidate of CHROME_CANDIDATES) {
    if (existsSync(candidate)) return candidate;
  }
  throw new Error(
    "No Chromium/Chrome binary found. Set CHROME_PATH to a browser executable."
  );
}

export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const withTimeout = (promise, ms, fallback = null) =>
  Promise.race([promise, delay(ms).then(() => fallback)]);

async function serverUp(url) {
  try {
    const response = await withTimeout(fetch(url, { redirect: "manual" }), 2500);
    return Boolean(response);
  } catch {
    return false;
  }
}

// Ensures the preview server is running; spawns scripts/serve.mjs if not.
// Returns a cleanup function.
export async function ensureServer() {
  if (await serverUp(PREVIEW)) return () => {};
  const child = spawn(process.execPath, [join(root, "scripts/serve.mjs")], {
    stdio: "ignore",
    detached: false,
  });
  for (let i = 0; i < 40; i++) {
    if (await serverUp(PREVIEW)) break;
    await delay(250);
  }
  if (!(await serverUp(PREVIEW))) {
    child.kill();
    throw new Error(`Preview server did not come up at ${PREVIEW}. Run npm run build first.`);
  }
  return () => child.kill();
}

export async function launchBrowser(port, extraArgs = []) {
  const chrome = spawn(
    findChrome(),
    [
      "--headless=new",
      "--no-sandbox",
      "--disable-gpu",
      "--disable-dev-shm-usage",
      "--hide-scrollbars",
      "--disable-background-networking",
      "--disable-component-update",
      "--no-first-run",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=/tmp/rr2-audit-${port}`,
      ...extraArgs,
      "about:blank",
    ],
    { stdio: "ignore" }
  );
  for (let i = 0; i < 60; i++) {
    try {
      const response = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (response.ok) return chrome;
    } catch {}
    await delay(250);
  }
  chrome.kill();
  throw new Error("Chromium debugger endpoint never came up.");
}

export async function openTab(port) {
  const response = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, {
    method: "PUT",
  });
  const info = await response.json();
  const ws = new WebSocket(info.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => {
    ws.addEventListener("open", resolve, { once: true });
    ws.addEventListener("error", reject, { once: true });
  });

  let messageId = 0;
  const pending = new Map();
  const eventListeners = new Map();

  ws.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.id !== undefined && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      data.error ? reject(new Error(`${data.error.message}`)) : resolve(data.result);
    } else if (data.method && eventListeners.has(data.method)) {
      for (const listener of eventListeners.get(data.method)) listener(data.params);
    }
  });

  const tab = {
    id: info.id,
    ws,
    // Every command carries a timeout so a dead tab can never hang an audit.
    cdp(method, params = {}, timeoutMs = 20000) {
      const id = ++messageId;
      const call = new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
      return withTimeout(call, timeoutMs, null);
    },
    on(method, listener) {
      if (!eventListeners.has(method)) eventListeners.set(method, []);
      eventListeners.get(method).push(listener);
    },
    waitEvent(method, timeoutMs = 20000) {
      return withTimeout(
        new Promise((resolve) => tab.on(method, resolve)),
        timeoutMs,
        null
      );
    },
    async evaluate(expression, awaitPromise = false, timeoutMs = 15000) {
      const result = await tab.cdp(
        "Runtime.evaluate",
        { expression, awaitPromise, returnByValue: true },
        timeoutMs
      );
      return result?.result?.value;
    },
    async navigate(url, settleMs = 400) {
      const loaded = tab.waitEvent("Page.loadEventFired");
      await tab.cdp("Page.navigate", { url });
      await loaded;
      await tab.evaluate("document.fonts.ready.then(() => true)", true, 9000);
      await delay(settleMs);
    },
    async setViewport(width, height, deviceScaleFactor = 1, mobile = false) {
      await tab.cdp("Emulation.setDeviceMetricsOverride", {
        width,
        height,
        deviceScaleFactor,
        mobile,
        screenWidth: width,
        screenHeight: height,
      });
      if (mobile) await tab.cdp("Emulation.setTouchEmulationEnabled", { enabled: true });
    },
    async close(port) {
      try {
        ws.close();
      } catch {}
      await fetch(`http://127.0.0.1:${port}/json/close/${info.id}`).catch(() => {});
    },
  };

  await tab.cdp("Page.enable");
  await tab.cdp("Runtime.enable");
  return tab;
}

export const ROUTES = [
  "/",
  "/services/",
  "/services/roof-replacement/",
  "/services/roof-repair/",
  "/services/storm-damage-restoration/",
  "/services/gutters-exteriors/",
  "/projects/",
  "/about/",
  "/process/",
  "/reviews/",
  "/service-areas/",
  "/service-areas/barrington-il/",
  "/resources/",
  "/contact/",
  "/faq/",
  "/financing/",
  "/warranty/",
];

export const VIEWPORTS = {
  desktop: { width: 1440, height: 900, dpr: 1, mobile: false },
  mobile: { width: 390, height: 844, dpr: 2, mobile: true },
};
