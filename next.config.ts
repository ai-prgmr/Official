import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  reactStrictMode: true,
  basePath: "/grass",
  images: { unoptimized: true },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: "https", // or 'http' if applicable, but HTTPS is recommended
  //       hostname: "images.unsplash.com", // Replace with your image host
  //       port: "", // Leave empty if no specific port
  //       pathname: "/**", // Use /** for any path, or be more specific
  //     },
  //   ],
  //   unoptimized: true
  // },
};

export default nextConfig;
