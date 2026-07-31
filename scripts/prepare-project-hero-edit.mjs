import { join } from "node:path";
import { pathToFileURL } from "node:url";

const moduleRoot = process.env.RR_NODE_MODULES;

if (!moduleRoot) {
  throw new Error("Set RR_NODE_MODULES to the bundled Node module directory.");
}

const { default: sharp } = await import(
  pathToFileURL(join(moduleRoot, "sharp", "lib", "index.js"))
);

const [sourcePath, outputPath] = process.argv.slice(2);

if (!sourcePath || !outputPath) {
  throw new Error(
    "Usage: node scripts/prepare-project-hero-edit.mjs <source> <output.png>"
  );
}

const width = 1920;
const height = 1080;

await sharp(sourcePath)
  .resize(width, height, { fit: "fill" })
  .removeAlpha()
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

const derivativeStem = outputPath.replace(/\.png$/i, "");
const derivativeWidths = [640, 1280, 1600, 1920];

await Promise.all(
  derivativeWidths.map((derivativeWidth) =>
    sharp(outputPath)
      .resize({ width: derivativeWidth, withoutEnlargement: true })
      .webp({
        quality: derivativeWidth >= 1600 ? 84 : 82,
        effort: 6,
        smartSubsample: true
      })
      .toFile(`${derivativeStem}-${derivativeWidth}.webp`)
  )
);

console.log(
  `Wrote ${outputPath} at ${width}x${height} with responsive WebP derivatives.`
);
