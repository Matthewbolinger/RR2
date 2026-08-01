import { spawn } from "node:child_process";
import { mkdir, mkdtemp, readdir, rm, stat, writeFile } from "node:fs/promises";
import { homedir, tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

// Editorial-v3 grading pipeline.
//
// Produces the graded real-archive service-card derivatives in
// public/assets/editorial-v3/ from the client project photography in
// public/assets/projects/. Rendering uses headless Chromium's canvas
// (the repository's approved build-time browser pattern; see
// scripts/encode-images.mjs) so the pipeline needs no third-party tools.
//
// One treatment, applied identically to every editorial-v3 output:
//   1. filter: saturate(0.86) contrast(1.06) brightness(0.97)
//   2. warm gold wash: #c7a24a at alpha 0.07 composited with "soft-light"
//   3. cool dusk shadows: #1d2a38 at alpha 0.30 composited with "lighten"
//      (a per-channel max, so only tones darker than the fill are lifted
//      toward the cool slate floor; midtones and highlights are untouched)
// Cropping is deterministic cover-crop with an optional focal override per
// job (focal 0.5/0.5 = centered; 0 = top/left edge, 1 = bottom/right edge)
// and an optional zoom (> 1 tightens the crop window around the focal point;
// the driver refuses any window smaller than the output, so no output is
// ever upscaled). Same input + same job constants -> same output bytes.

const root = fileURLToPath(new URL("..", import.meta.url));
const publicRoot = join(root, "public");
const outputRoot = join(publicRoot, "assets", "editorial-v3");

// The single editorial-v3 grade (cool dusk shadows, warm gold highlights).
const TREATMENTS = {
  "editorial-v3": {
    saturate: 0.86,
    contrast: 1.06,
    brightness: 0.97,
    goldColor: "#c7a24a",
    goldAlpha: 0.07,
    coolColor: "#1d2a38",
    coolAlpha: 0.3
  },
  // Heavier candidate grade for the homepage hero exploration only. Not used
  // by any shipped reference; kept here so the exploration is reproducible.
  "dusk-hero": {
    saturate: 0.8,
    contrast: 1.08,
    brightness: 0.7,
    goldColor: "#c7a24a",
    goldAlpha: 0.07,
    coolColor: "#1b2836",
    coolAlpha: 0.5
  }
};

// source: repo path under public/. out: file name in assets/editorial-v3/.
// Landscape pairs keep the service-card intrinsic aspect (16:9, the aspect
// the pre-swap cards declared in src/data.mjs); the 800x1000 portrait is the
// site's mobile art-direction convention (see editorial-v2 *-800x1000 files).
// The two square sources (dormer detail, material delivery) cap their large
// landscape derivative at 1020w: their honest pixel width. No output is ever
// upscaled beyond its source pixels.
const CARD_JOBS = [
  {
    source: "assets/projects/project-residential-completed-roof-aerial-1920.webp",
    out: "roof-replacement-completed-aerial-1280.webp",
    width: 1280,
    height: 720,
    focalX: 0.42,
    focalY: 0.72,
    zoom: 1.35,
    quality: 0.7
  },
  {
    source: "assets/projects/project-residential-completed-roof-aerial-1920.webp",
    out: "roof-replacement-completed-aerial-640.webp",
    width: 640,
    height: 360,
    focalX: 0.42,
    focalY: 0.72,
    zoom: 1.35,
    quality: 0.7
  },
  {
    source: "assets/projects/project-residential-completed-roof-aerial-1920.webp",
    out: "roof-replacement-completed-aerial-mobile-800x1000.webp",
    width: 800,
    height: 1000,
    focalX: 0.62,
    quality: 0.7
  },
  {
    source: "assets/projects/project-roof-detail-dormers-1020.jpg",
    out: "roof-repair-dormer-detail-1020.webp",
    width: 1020,
    height: 574,
    focalY: 0.3,
    quality: 0.7
  },
  {
    source: "assets/projects/project-roof-detail-dormers-1020.jpg",
    out: "roof-repair-dormer-detail-640.webp",
    width: 640,
    height: 360,
    focalY: 0.3,
    quality: 0.7
  },
  {
    source: "assets/projects/project-roof-detail-dormers-1020.jpg",
    out: "roof-repair-dormer-detail-mobile-800x1000.webp",
    width: 800,
    height: 1000,
    focalX: 0.42,
    focalY: 0.55,
    quality: 0.7
  },
  {
    source: "assets/projects/project-material-delivery-clear-v2-1020.jpg",
    out: "storm-restoration-material-delivery-1020.webp",
    width: 1020,
    height: 574,
    focalY: 0.28,
    quality: 0.7
  },
  {
    source: "assets/projects/project-material-delivery-clear-v2-1020.jpg",
    out: "storm-restoration-material-delivery-640.webp",
    width: 640,
    height: 360,
    focalY: 0.28,
    quality: 0.7
  },
  {
    source: "assets/projects/project-material-delivery-clear-v2-1020.jpg",
    out: "storm-restoration-material-delivery-mobile-800x1000.webp",
    width: 800,
    height: 1000,
    focalY: 0.45,
    quality: 0.7
  },
  {
    source: "assets/projects/project-tudor-residence-exterior-1920.webp",
    out: "gutters-exteriors-tudor-exterior-1280.webp",
    width: 1280,
    height: 720,
    focalY: 0.35,
    zoom: 1.2,
    quality: 0.7
  },
  {
    source: "assets/projects/project-tudor-residence-exterior-1920.webp",
    out: "gutters-exteriors-tudor-exterior-640.webp",
    width: 640,
    height: 360,
    focalY: 0.35,
    zoom: 1.2,
    quality: 0.7
  },
  {
    source: "assets/projects/project-tudor-residence-exterior-1920.webp",
    out: "gutters-exteriors-tudor-exterior-mobile-800x1000.webp",
    width: 800,
    height: 1000,
    focalX: 0.62,
    focalY: 0.42,
    quality: 0.7
  }
];

// Homepage-hero exploration (run with --set=hero). The output is a candidate
// only: nothing in src/ references it, and shipping it is a coordinator call.
const HERO_JOBS = [
  {
    source: "assets/projects/project-tudor-residence-exterior-1920.webp",
    out: "home-hero-dusk-candidate-1800x1013.webp",
    width: 1800,
    height: 1013,
    focalY: 0.42,
    quality: 0.72,
    treatment: "dusk-hero"
  }
];

async function fileInfo(path) {
  try {
    return await stat(path);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
}

async function findChromium() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.CHROMIUM_PATH,
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    "/Applications/Chromium.app/Contents/MacOS/Chromium"
  ].filter(Boolean);

  const browserRoots = [
    "/opt/pw-browsers",
    join(homedir(), ".cache", "ms-playwright"),
    join(homedir(), "Library", "Caches", "ms-playwright")
  ];
  for (const browserRoot of browserRoots) {
    let entries = [];
    try {
      entries = (await readdir(browserRoot)).sort().reverse();
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!/chromium/i.test(entry)) continue;
      candidates.push(
        join(browserRoot, entry, "chrome-linux", "chrome"),
        join(browserRoot, entry, "chrome-linux", "headless_shell"),
        join(
          browserRoot,
          entry,
          "chrome-mac",
          "Chromium.app",
          "Contents",
          "MacOS",
          "Chromium"
        )
      );
    }
  }

  for (const candidate of candidates) {
    if (await fileInfo(candidate)) return candidate;
  }
  return null;
}

function driverHtml(jobs) {
  const payload = JSON.stringify(jobs).replace(/</g, "\\u003c");
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><title>editorial grade</title></head>
<body>
<script type="application/json" id="jobs">${payload}</script>
<script>
(async () => {
  const jobs = JSON.parse(document.getElementById("jobs").textContent);
  const results = {};
  for (const job of jobs) {
    try {
      const image = new Image();
      const loaded = new Promise((resolveLoad, rejectLoad) => {
        image.onload = resolveLoad;
        image.onerror = () => rejectLoad(new Error("image failed to load"));
      });
      image.src = job.fileUrl;
      await loaded;
      const iw = image.naturalWidth;
      const ih = image.naturalHeight;
      const zoom = job.zoom ?? 1;
      const scale = Math.max(job.width / iw, job.height / ih) * zoom;
      if (scale > 1.0001) {
        throw new Error(
          "output " + job.width + "x" + job.height + " at zoom " + zoom +
          " would upscale source " + iw + "x" + ih
        );
      }
      const srcW = Math.min(iw, Math.round(job.width / scale));
      const srcH = Math.min(ih, Math.round(job.height / scale));
      const fx = job.focalX ?? 0.5;
      const fy = job.focalY ?? 0.5;
      const srcX = Math.round(Math.min(Math.max((iw - srcW) * fx, 0), iw - srcW));
      const srcY = Math.round(Math.min(Math.max((ih - srcH) * fy, 0), ih - srcH));
      const canvas = document.createElement("canvas");
      canvas.width = job.width;
      canvas.height = job.height;
      const context = canvas.getContext("2d");
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
      const t = job.treatment;
      context.filter =
        "saturate(" + t.saturate + ") contrast(" + t.contrast + ") brightness(" + t.brightness + ")";
      context.drawImage(image, srcX, srcY, srcW, srcH, 0, 0, job.width, job.height);
      context.filter = "none";
      context.globalCompositeOperation = "soft-light";
      context.globalAlpha = t.goldAlpha;
      context.fillStyle = t.goldColor;
      context.fillRect(0, 0, job.width, job.height);
      context.globalCompositeOperation = "lighten";
      context.globalAlpha = t.coolAlpha;
      context.fillStyle = t.coolColor;
      context.fillRect(0, 0, job.width, job.height);
      context.globalCompositeOperation = "source-over";
      context.globalAlpha = 1;
      const dataUrl = canvas.toDataURL("image/webp", job.quality);
      if (!dataUrl.startsWith("data:image/webp;base64,")) {
        throw new Error("browser did not produce WebP output");
      }
      results[job.id] = { data: dataUrl.slice(23), width: job.width, height: job.height };
    } catch (error) {
      results[job.id] = { error: String((error && error.message) || error) };
    }
  }
  const json = JSON.stringify(results);
  const pre = document.createElement("pre");
  pre.textContent =
    "RRGRADE:BEGIN" + btoa(unescape(encodeURIComponent(json))) + "RRGRADE:END";
  document.body.appendChild(pre);
})();
</script>
</body>
</html>
`;
}

function runProcess(command, args, timeoutMs) {
  return new Promise((resolveRun, rejectRun) => {
    const child = spawn(command, args, { stdio: ["ignore", "pipe", "pipe"] });
    const stdout = [];
    const stderr = [];
    const timer = setTimeout(() => {
      child.kill("SIGKILL");
      rejectRun(new Error(`Chromium timed out after ${timeoutMs}ms`));
    }, timeoutMs);
    child.stdout.on("data", (chunk) => stdout.push(chunk));
    child.stderr.on("data", (chunk) => stderr.push(chunk));
    child.on("error", (error) => {
      clearTimeout(timer);
      rejectRun(error);
    });
    child.on("close", () => {
      clearTimeout(timer);
      resolveRun({
        stdout: Buffer.concat(stdout).toString("utf8"),
        stderr: Buffer.concat(stderr).toString("utf8")
      });
    });
  });
}

async function renderWithChromium(chromium, jobs) {
  const workDir = await mkdtemp(join(tmpdir(), "rr-grade-"));
  try {
    const driverPath = join(workDir, "grade.html");
    await writeFile(driverPath, driverHtml(jobs), "utf8");
    let lastStderr = "";
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      const args = [
        "--headless=new",
        "--disable-gpu",
        "--no-first-run",
        "--no-default-browser-check",
        "--disable-background-networking",
        "--disable-component-update",
        "--disable-sync",
        "--disable-crash-reporter",
        "--disable-dev-shm-usage",
        "--hide-scrollbars",
        "--allow-file-access-from-files",
        "--force-color-profile=srgb",
        `--user-data-dir=${join(workDir, `profile-${attempt}`)}`,
        `--virtual-time-budget=${30000 * attempt}`,
        "--dump-dom",
        pathToFileURL(driverPath).href
      ];
      if (typeof process.getuid === "function" && process.getuid() === 0) {
        args.unshift("--no-sandbox");
      }
      const { stdout, stderr } = await runProcess(chromium, args, 180000);
      lastStderr = stderr;
      const match = stdout.match(/RRGRADE:BEGIN([A-Za-z0-9+/=]+)RRGRADE:END/);
      if (match) {
        return JSON.parse(Buffer.from(match[1], "base64").toString("utf8"));
      }
    }
    throw new Error(
      `Chromium did not return grader output. stderr tail: ${lastStderr
        .split("\n")
        .slice(-4)
        .join(" ")}`
    );
  } finally {
    await rm(workDir, { recursive: true, force: true });
  }
}

const WEBP_MAGIC = (buffer) =>
  buffer.length > 16 &&
  buffer.toString("ascii", 0, 4) === "RIFF" &&
  buffer.toString("ascii", 8, 12) === "WEBP";

export async function gradeImages({ set = "cards", log = console } = {}) {
  const jobList = set === "hero" ? HERO_JOBS : CARD_JOBS;
  const chromium = await findChromium();
  if (!chromium) {
    throw new Error(
      "grade-images: no Chromium/Chrome binary found. Set CHROME_PATH and retry."
    );
  }

  const jobs = [];
  for (const job of jobList) {
    const sourcePath = join(publicRoot, job.source);
    if (!(await fileInfo(sourcePath))) {
      throw new Error(`grade-images: source missing on disk: ${job.source}`);
    }
    jobs.push({
      id: job.out,
      fileUrl: pathToFileURL(sourcePath).href,
      width: job.width,
      height: job.height,
      focalX: job.focalX ?? 0.5,
      focalY: job.focalY ?? 0.5,
      zoom: job.zoom ?? 1,
      quality: job.quality,
      treatment: TREATMENTS[job.treatment ?? "editorial-v3"]
    });
  }

  log.log(`grade-images: rendering ${jobs.length} output(s) with ${chromium}`);
  const results = await renderWithChromium(chromium, jobs);
  await mkdir(outputRoot, { recursive: true });

  let failed = 0;
  for (const job of jobList) {
    const result = results[job.out];
    if (!result || result.error) {
      failed += 1;
      log.warn(`grade-images: failed ${job.out}: ${result?.error || "no result"}`);
      continue;
    }
    const buffer = Buffer.from(result.data, "base64");
    if (!WEBP_MAGIC(buffer)) {
      failed += 1;
      log.warn(`grade-images: output for ${job.out} was not valid WebP; skipped`);
      continue;
    }
    const outPath = join(outputRoot, job.out);
    await writeFile(outPath, buffer);
    log.log(
      `grade-images: ${job.source} -> assets/editorial-v3/${job.out} ` +
        `${job.width}x${job.height} ${(buffer.length / 1024).toFixed(1)} KiB`
    );
  }
  return { rendered: jobList.length - failed, failed };
}

const isDirectRun =
  process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;

if (isDirectRun) {
  const setArg = process.argv.find((arg) => arg.startsWith("--set="));
  const summary = await gradeImages({
    set: setArg ? setArg.slice("--set=".length) : "cards"
  });
  if (summary.failed) process.exitCode = 1;
  console.log(
    `grade-images: ${summary.rendered} output(s) written, ${summary.failed} failed.`
  );
}
