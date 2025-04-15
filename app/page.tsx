import { Metadata } from 'next'; // ✅ SEO용 메타데이터 import
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';
import ProjectCarousel from '@/components/project/ProjectCarousel';
import { getProjects } from '@/sanity/lib/sanity';
import { Project } from '@/types/Project';

// ✅ metadata 추가
export const metadata: Metadata = {
  title: '서하나의 포트폴리오 | 프론트엔드 개발자',
  description: '프론트엔드 개발자 서하나의 포트폴리오입니다. Next.js, React, TypeScript, Sanity로 만든 우주 감성의 웹사이트를 소개합니다.',
  keywords: ['서하나', '프론트엔드', '포트폴리오', 'React', 'Next.js', '타입스크립트', 'Sanity', '개발자 포트폴리오', '개인 포트폴리오 웹사이트', '포트폴리오 사이트', '개인 포트폴리오 예시'],
  openGraph: {
    title: '서하나의 포트폴리오 | 프론트엔드 개발자',
    description: 'React, TypeScript, Sanity로 만든 프론트엔드 포트폴리오입니다.',
    url: 'https://next-portfolio-nine-theta.vercel.app/', 
    siteName: '서하나 포트폴리오',
    images: [
      {
        url: '/og-image.png', 
        width: 1200,
        height: 630,
        alt: '서하나 포트폴리오 미리보기',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
};

export default async function Home() {
  const projects: Project[] = await getProjects();

  return (
    <main>
      <GlassLayoutWithHeader>
        <section className="p-6">
          <h2 className="text-white text-2xl font-semibold mb-4">Welcome!</h2>
          <p className="text-white">
            포트폴리오 사이트에 오신 걸 환영합니다. 상단 버튼을 눌러 프로젝트를 확인해보세요.
          </p>
          <ProjectCarousel projects={projects.slice(0, 5)} />
        </section>
      </GlassLayoutWithHeader>
    </main>
  );
}
