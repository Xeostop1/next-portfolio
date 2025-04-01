// next.config.ts
/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // ✅ ESLint 오류 무시
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ 타입스크립트 오류 무시
  },
};

export default nextConfig;
