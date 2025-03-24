'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types/Project';
import { useProjectStore } from '@/lib/store/projectStore';
import EditProject from '@/components/project/EditProject';
import ProjectList from '@/components/project/ProjectList';
import SortControls from '@/components/project/SortControls';
import SkillFilter from '@/components/project/SkillFilter';
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';
import Toast from '@/components/feedback/Toast'; // ***
import { useToastState } from '@/lib/hook/useToastState'; // ***

export default function ProjectsPage() {
  const { isAdmin } = useProjectStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  const { message, visible, showToast, hideToast } = useToastState(); // ***

  const fetchProjects = () => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
      });
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  useEffect(() => {
    const sorted = [...projects].sort((a, b) =>
      sortOrder === 'newest'
        ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    setSortedProjects(sorted);
  }, [projects, sortOrder]);
// -======= 핸들딜리트 확인 !
  const handleDelete = async (_id: string) => { // ***
    const res = await fetch('/api/projects/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }), // ***
    });

    if (res.ok) {
      setProjects((prev) => prev.filter((project) => project._id !== _id)); // ***
      showToast('✅ 삭제되었습니다'); // ***
    } else {
      showToast('❌ 삭제에 실패했어요'); // ***
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

        <SortControls
          sortOrder={sortOrder}
          onChange={setSortOrder}
        />

        <ProjectList
          projects={filtered}
          isAdmin={isAdmin}
          handleDelete={handleDelete} // ***
          handleEdit={(project) => setEditingProject(project)}
        />

        {editingProject && (
          <EditProject
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onSaved={() => {
              fetchProjects();
              showToast('✅ 저장되었습니다!'); // ***
            }}
          />
        )}

        <Toast message={message} visible={visible} onClose={hideToast} /> {/* *** */}
      </div>
    </GlassLayoutWithHeader>
  );
}
