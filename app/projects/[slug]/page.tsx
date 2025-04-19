// 📄 app/projects/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { client } from '@/sanity/client';
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';
import { Project } from '@/types/Project';
import type { Metadata } from 'next';

// SEO 메타데이터 생성
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const allProjects: Project[] = await client.fetch(`*[_type == "project"]`);
  const project = allProjects.find((p) => p.path === params.slug);

  if (!project) return {};

  return {
    title: `${project.title} | 서하나 포트폴리오`,
    description: project.description || `${project.title} 프로젝트 상세 설명`,
    keywords: project.skills?.join(', '), 
  };
}

type Props = {
  params: { slug: string };
};

export default async function ProjectDetailPage({ params }: Props) {
  //패치로 모든 것 모든 프로젝트를 가져왔다가 
  const allProjects: Project[] = await client.fetch(`*[_type == "project"]`);
  //패스와 슬러그(URL)와 맞는 프로젝트를 찾음 
  const project = allProjects.find((p) => p.path === params.slug);

  if (!project) return notFound();

  return (
    <GlassLayoutWithHeader>
      <div className="p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
        <p className="text-lg text-gray-300 mb-4">{project.subtitle}</p>
        <img
          src={`/project/${project.path}.jpg`}
          alt={project.title}
          className="w-full h-[300px] object-cover rounded-lg mb-6"
        />
        <p className="mb-2">{project.description}</p>
        <p className="text-sm text-gray-400">
          기술: {project.skills?.join(', ')}
        </p>
        <p className="text-xs mt-1">
          만든 기간: {new Date(project.createdAt).toLocaleDateString('ko-KR')}
        </p>
      </div>
    </GlassLayoutWithHeader>
  );
}
