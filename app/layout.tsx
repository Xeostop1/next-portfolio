// /app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from './providers';
import Script from 'next/script'; 
import RouteTracker from '@/components/analytics/RouteTracker'; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: '하나의 포트폴리오',
  description: '개발자 서하나의 포트폴리오입니다.',
  icons: {
    icon: '/favicon-v2.ico',
  },
  other: {
    'google-site-verification': 'aFsMhrHQAZyi-RVSvzb0pDRZSzk4jiFWFQG7NwOwwrA', // ✅ 여기만 추가!
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
          strategy="afterInteractive" 
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
          <RouteTracker /> {/* *** 페이지 이동 추적 컴포넌트 *** */}
          {children}
        </Providers>
      </body>
    </html>
  );
}
