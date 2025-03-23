import { Project } from '@/types/Project';
import { client } from '@/sanity/client';
import { notFound } from 'next/navigation';
import slugify from 'slugify'; // ✅ slug 변환
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';


type Props = {
  params: { slug: string };
};

export default async function ProjectDetailPage({ params }: Props) {
  const decodedSlug = decodeURIComponent(params.slug); 

  const allProjects: Project[] = await client.fetch(`*[_type == "project"]`); // ***
  const project = allProjects.find(
    (p) => slugify(p.title, { lower: true }) === decodedSlug.toLowerCase() // ***
  );

  if (!project) {
    console.warn(' 프로젝트를 찾을 수 없습니다. notFound() 실행'); // ***
    return notFound();
  }

  return (
    <GlassLayoutWithHeader>
      <div className="p-4">
        <h1 className="text-xl font-bold">{project.title}</h1>
        <p>{project.subtitle}</p>
        <p>{project.description}</p>
        <p>기술: {project.skills?.join(', ')}</p>
        <p>
          작성일:{' '}
          {new Date(project.createdAt)
            .toLocaleDateString('ko-KR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })
            .replace(/\./g, ' /')
            .replace(/\/\s?$/, '')
            .trim()}
        </p>
      </div>
    </GlassLayoutWithHeader>
  );
}
