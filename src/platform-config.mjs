import { legacyRedirects } from "./legacy-routes.mjs";

export const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()"
  },
  { key: "X-Frame-Options", value: "SAMEORIGIN" }
];

export const htmlCacheHeader = {
  key: "Cache-Control",
  value: "public, max-age=0, must-revalidate"
};

export const assetCacheHeader = {
  key: "Cache-Control",
  value: "public, max-age=3600, must-revalidate"
};

export function renderStaticHeaders() {
  return `/*
${[...securityHeaders, htmlCacheHeader]
  .map(({ key, value }) => `  ${key}: ${value}`)
  .join("\n")}

/assets/*
  ${assetCacheHeader.key}: ${assetCacheHeader.value}
`;
}

export function createVercelConfig() {
  return {
    $schema: "https://openapi.vercel.sh/vercel.json",
    buildCommand: "npm run build",
    outputDirectory: "dist",
    framework: null,
    functions: {
      "api/quote.mjs": {
        maxDuration: 30
      }
    },
    cleanUrls: false,
    trailingSlash: true,
    redirects: [
      {
        source: "/:path*",
        has: [{ type: "host", value: "raccoonrestoration.com" }],
        destination: "https://www.raccoonrestoration.com/:path*",
        statusCode: 301
      },
      ...legacyRedirects.map(({ source, destination, status }) => ({
        source,
        destination,
        statusCode: status
      }))
    ],
    headers: [
      {
        source: "/:path*",
        headers: [...securityHeaders, htmlCacheHeader]
      },
      {
        source: "/assets/:path*",
        headers: [assetCacheHeader]
      }
    ]
  };
}
