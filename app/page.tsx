

import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';
import ProjectCarousel from '@/components/project/ProjectCarousel';
import { getProjects } from '@/sanity/lib/sanity'; // 이미 만든 함수 사용
import { Project } from '@/types/Project';

export default async function Home() {
  const projects: Project[] = await getProjects(); // ✅ 프로젝트 불러오기
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
