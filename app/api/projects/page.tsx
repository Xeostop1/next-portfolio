'use client';

import { useEffect, useState } from 'react';
import slugify from 'slugify';
import Link from 'next/link';
import { Project } from '@/types/Project';
import { useProjectStore } from '@/lib/store/projectStore'; // **** 추가

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const { isAdmin } = useProjectStore(); // **** 관리자 여부 상태 사용

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const sorted = [...projects].sort((a, b) => {
    if (sortOrder === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    }
  });

  const allSkills = Array.from(
    new Set(sorted.flatMap((project) => project.skills || []))
  );

  const filtered = selectedSkill
    ? sorted.filter((project) => project.skills?.includes(selectedSkill))
    : sorted;

  return (
    <div>
      <h1>Projects</h1>

      <div>
        <strong>기술 필터: </strong>
        <button onClick={() => setSelectedSkill(null)}>All</button>
        {allSkills.map((skill) => (
          <button key={skill} onClick={() => setSelectedSkill(skill)}>
            {skill}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <strong>정렬 기준: </strong>
        <button onClick={() => setSortOrder('newest')}>최신순</button>
        <button onClick={() => setSortOrder('oldest')}>오래된순</button>
      </div>

      <ul>
        {filtered.map((project) => (
          <li key={project.id}>
            <Link href={`/projects/${slugify(project.title)}`}>
              {project.title}
            </Link>

            {isAdmin && ( // **** 관리자일 때만 버튼 보여줌
              <>
                <button>수정</button> {/* **** */}
                <button>삭제</button> {/* **** */}
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
