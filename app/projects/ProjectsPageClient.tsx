'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types/Project';
import { useProjectStore } from '@/lib/store/projectStore';
import EditProject from '@/components/project/EditProject';
import ProjectList from '@/components/project/ProjectList';
import SortControls from '@/components/project/SortControls';
import SkillFilter from '@/components/project/SkillFilter';
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';
import Toast from '@/components/feedback/Toast';
import { useToastState } from '@/lib/hook/useToastState';

type Props = {
  initialProjects: Project[];
};

export default function ProjectsPageClient({ initialProjects }: Props) {
  const { isAdmin } = useProjectStore();
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { message, visible, showToast, hideToast } = useToastState();

  useEffect(() => {
    const sorted = [...projects].sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setSortedProjects(sorted);
  }, [projects, sortOrder]);

  const handleDelete = async (_id: string) => {
    const res = await fetch('/api/projects/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });

    if (res.ok) {
      setProjects((prev) => prev.filter((project) => project._id !== _id));
      showToast('✅ 삭제되었습니다');
    } else {
      showToast('❌ 삭제에 실패했어요');
    }
  };

  const allSkills = Array.from(
    new Set(sortedProjects.flatMap((project) => project.skills || []))
  );

  const filtered = selectedSkill
    ? sortedProjects.filter((project) => project.skills?.includes(selectedSkill))
    : sortedProjects;

  return (
    <GlassLayoutWithHeader>
      <div className="p-4">
        <h1 className="text-2xl text-white font-bold mb-4">Projects</h1>

        <SkillFilter
          skills={allSkills}
          selectedSkill={selectedSkill}
          onChange={setSelectedSkill}
        />

        <SortControls sortOrder={sortOrder} onChange={setSortOrder} />

        <div className="max-w-screen-lg mx-auto">
          <ProjectList
            projects={filtered}
            isAdmin={isAdmin}
            handleDelete={handleDelete}
            handleEdit={(project) => setEditingProject(project)}
          />
        </div>

        {editingProject && (
          <EditProject
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onSaved={() => {
              setProjects((prev) =>
                prev.map((p) => (p._id === editingProject._id ? editingProject : p))
              );
              showToast('✅ 저장되었습니다!');
            }}
          />
        )}

        <Toast message={message} visible={visible} onClose={hideToast} />
      </div>
    </GlassLayoutWithHeader>
  );
}
