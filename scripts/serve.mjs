import { createReadStream } from "node:fs";
import { access, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "node:http";
import { legacyRedirects } from "../src/legacy-routes.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const publicRoot = join(root, "dist");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".avif": "image/avif",
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".jpeg": "image/jpeg",
  ".jpg": "image/jpeg",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8"
};

createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host}`);
  const pathname = decodeURIComponent(url.pathname);
  const legacyRedirect = legacyRedirects.find(
    ({ source }) => source === pathname
  );

  if (legacyRedirect) {
    response.statusCode = legacyRedirect.status;
    response.setHeader("Location", legacyRedirect.destination);
    response.end();
    return;
  }

  const safePath = normalize(pathname).replace(/^(\.\.(\/|\\|$))+/, "");
  let filePath = join(publicRoot, safePath);

  try {
    const info = await stat(filePath);
    if (info.isDirectory()) filePath = join(filePath, "index.html");
    await access(filePath);
  } catch {
    filePath = join(publicRoot, "404.html");
    response.statusCode = 404;
  }

  response.setHeader(
    "Content-Type",
    mime[extname(filePath)] || "application/octet-stream"
  );
  response.setHeader("X-Content-Type-Options", "nosniff");
  createReadStream(filePath).pipe(response);
}).listen(port, "127.0.0.1", () => {
  console.log(`Raccoon Restoration preview: http://127.0.0.1:${port}`);
});
