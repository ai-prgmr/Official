import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactStrictMode: true,
  basePath: "/Official",
  images: { unoptimized: true },
};

export default nextConfig;
