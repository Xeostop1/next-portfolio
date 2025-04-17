// /app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import Script from 'next/script'; // *** GA 스크립트 추가 ***
import RouteTracker from '@/components/analytics/RouteTracker'; // *** 페이지 변경 추적 컴포넌트 ***

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ SEO용 메타데이터
export const metadata: Metadata = {
  title: '하나의 포트폴리오',
  description: '프론트엔드 개발자 서하나의 포트폴리오입니다.',
  icons: {
    icon: '/favicon-v2.ico', // *** 파비콘 경로 ***
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        {/* ✅ Google Analytics 스크립트 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive" // *** GA 스크립트 비동기 로딩 ***
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <RouteTracker /> {/* *** 페이지 이동 추적 컴포넌트 삽입 *** */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
