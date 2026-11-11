// Prefixes a /public file path with the app's basePath (set in next.config.mjs).
// Use for plain string paths only — not for <Link href> or static image imports.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const asset = (path) => `${BASE_PATH}${path}`;
