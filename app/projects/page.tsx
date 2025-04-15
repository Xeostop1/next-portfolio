// 📄 app/projects/page.tsx
import { getProjects } from '@/sanity/lib/sanity';
import type { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient'; // 👈 클라이언트 컴포넌트 분리
import { Project } from '@/types/Project';

// ✅ SEO 메타데이터 생성 함수
export async function generateMetadata(): Promise<Metadata> {
  const projects: Project[] = await getProjects();

  const skillKeywords = Array.from(
    new Set(projects.flatMap((p) => p.skills || []))
  );

  return {
    title: '프로젝트 | 서하나 포트폴리오',
    description:
      '서하나 프론트엔드 개발자의 프로젝트들을 확인하세요. 최신 웹 기술을 활용한 다양한 작업 사례를 소개합니다.',
    keywords: [
      '서하나',
      '프론트엔드 개발자',
      '프로젝트 포트폴리오',
      '포트폴리오 웹사이트',
      '프론트엔드 사례',
      ...skillKeywords // ✅ 실제 기술 키워드 삽입
    ],
  };
}

// ✅ 서버 컴포넌트: 클라이언트 컴포넌트를 불러오기만 함
export default async function ProjectsPage() {
  const projects: Project[] = await getProjects();

  return <ProjectsPageClient initialProjects={projects} />;
}
