import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,
    // Turbopack config (Next.js 16 uses Turbopack by default)
    turbopack: {},
    webpack: (config) => {
        // Required for react-pdf / pdfjs-dist to work in Next.js
        config.resolve.alias["canvas"] = false;
        return config;
    },
};

export default nextConfig;
