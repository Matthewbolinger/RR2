import { writeFile } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { createVercelConfig } from "../src/platform-config.mjs";

const root = fileURLToPath(new URL("..", import.meta.url));
const target = join(root, "vercel.json");

await writeFile(
  target,
  `${JSON.stringify(createVercelConfig(), null, 2)}\n`,
  "utf8"
);

console.log("Generated vercel.json from the authoritative route and header configuration.");
