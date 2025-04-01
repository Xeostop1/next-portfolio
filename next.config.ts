// next.config.ts (또는 next.config.js)
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ 빌드 시 ESLint 무시
  },
};

export default nextConfig;
