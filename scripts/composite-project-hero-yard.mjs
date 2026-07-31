import { join } from "node:path";
import { pathToFileURL } from "node:url";

const moduleRoot = process.env.RR_NODE_MODULES;

if (!moduleRoot) {
  throw new Error("Set RR_NODE_MODULES to the bundled Node module directory.");
}

const { default: sharp } = await import(
  pathToFileURL(join(moduleRoot, "sharp", "lib", "index.js"))
);

const [originalPath, editedPath, outputPath] = process.argv.slice(2);

if (!originalPath || !editedPath || !outputPath) {
  throw new Error(
    "Usage: node scripts/composite-project-hero-yard.mjs <original> <edited> <output>"
  );
}

const {
  data: original,
  info: { width, height }
} = await sharp(originalPath)
  .removeAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

const edited = await sharp(editedPath)
  .resize(width, height, { fit: "fill" })
  .removeAlpha()
  .raw()
  .toBuffer();

const mask = Buffer.alloc(width * height);

const rgbToHsv = (red, green, blue) => {
  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let hue = 0;

  if (delta) {
    if (max === r) hue = 60 * (((g - b) / delta) % 6);
    if (max === g) hue = 60 * ((b - r) / delta + 2);
    if (max === b) hue = 60 * ((r - g) / delta + 4);
  }

  if (hue < 0) hue += 360;

  return {
    hue,
    saturation: max === 0 ? 0 : delta / max,
    value: max
  };
};

for (let y = 0; y < height; y += 1) {
  for (let x = 0; x < width; x += 1) {
    const pixel = y * width + x;
    const source = pixel * 3;
    const nx = x / width;
    const ny = y / height;
    const { hue, saturation, value } = rgbToHsv(
      original[source],
      original[source + 1],
      original[source + 2]
    );

    const leftLion = nx > 0.02 && nx < 0.2 && ny > 0.65;
    const rightLion = nx > 0.53 && nx < 0.72 && ny > 0.64;
    const foregroundWall = ny > 0.955;
    const protectedEntry =
      nx > 0.61 && nx < 0.94 && ny > 0.59 && ny < 0.82;

    const vegetationColor =
      hue >= 18 &&
      hue <= 170 &&
      saturation >= 0.09 &&
      value >= 0.08 &&
      value <= 0.82;

    const grass =
      ny >= 0.73 &&
      ny <= 0.955 &&
      vegetationColor &&
      !leftLion &&
      !rightLion &&
      !protectedEntry &&
      !foregroundWall;

    const centralBrownPatch =
      nx >= 0.16 &&
      nx <= 0.58 &&
      ny >= 0.84 &&
      ny <= 0.955 &&
      !leftLion &&
      !rightLion &&
      !foregroundWall;

    const centralLowerLawn =
      nx >= 0.2 && nx <= 0.52 && ny > 0.9 && !leftLion && !rightLion;

    const hedge =
      nx >= 0.12 &&
      nx <= 0.62 &&
      ny >= 0.64 &&
      ny <= 0.79 &&
      hue >= 48 &&
      hue <= 170 &&
      saturation >= 0.12 &&
      value <= 0.58;

    mask[pixel] =
      grass || centralBrownPatch || centralLowerLawn ? 226 : hedge ? 148 : 0;
  }
}

const alpha = await sharp(mask, {
  raw: { width, height, channels: 1 }
})
  .blur(2.2)
  .png()
  .toBuffer();

const overlay = await sharp(edited, {
  raw: { width, height, channels: 3 }
})
  .joinChannel(alpha)
  .png()
  .toBuffer();

await sharp(originalPath)
  .composite([{ input: overlay, blend: "over" }])
  .png({ compressionLevel: 9 })
  .toFile(outputPath);

const derivativeStem = outputPath.replace(/\.png$/i, "");
const derivativeWidths = [640, 1280, 1600, 1920];

await Promise.all(
  derivativeWidths.map((derivativeWidth) =>
    sharp(outputPath)
      .resize({ width: derivativeWidth, withoutEnlargement: true })
      .webp({
        quality: derivativeWidth >= 1600 ? 82 : 80,
        effort: 6,
        smartSubsample: true
      })
      .toFile(`${derivativeStem}-${derivativeWidth}.webp`)
  )
);

console.log(
  `Wrote ${outputPath} at ${width}x${height} with responsive WebP derivatives.`
);
