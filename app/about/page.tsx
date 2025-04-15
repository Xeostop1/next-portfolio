// app/about/page.tsx
import { Metadata } from 'next';
import AboutClient from './AboutClient'; // 클라이언트 컴포넌트 불러오기

export const metadata: Metadata = {
  title: '서하나 소개 | 프론트엔드 개발자 포트폴리오',
  description: '서하나 프론트엔드 개발자 소개 페이지입니다. 기술 스택과 연락처 정보를 확인할 수 있어요.',
  keywords: [
    '서하나', 'Hana Seo', '프론트엔드 포트폴리오', '프론트엔드 개발자',
    'React 개발자', 'Next.js 포트폴리오', '타입스크립트 개발자',
    '프로그래머 포트폴리오', '개발자 소개', '프론트엔드 이력서',
    '웹 개발자 포트폴리오', '개발자 웹사이트',
    'Sanity CMS', 'Tailwind CSS 예제', '개발자 프로젝트',
    'React 프로젝트', 'Next.js 프로젝트', '개발자 블로그',
    '포트폴리오 사이트 예제', '프론트엔드 기술'
  ]
  ,
};

export default function AboutPage() {
  return <AboutClient />;
}
