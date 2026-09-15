import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Turbopack is deliberately not enabled. `next dev` and `next build` on
  // Next 15 use webpack by default, which is the more predictable of the two
  // bundlers today. Do not add `--turbopack` to the npm scripts.
};

export default nextConfig;
