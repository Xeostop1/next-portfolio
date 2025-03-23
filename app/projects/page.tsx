'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types/Project';
import { useProjectStore } from '@/lib/store/projectStore';
import EditProject from '@/components/project/EditProject';
import ProjectList from '@/components/project/ProjectList';
import SortControls from '@/components/project/SortControls';
import SkillFilter from '@/components/project/SkillFilter';
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';
import AddProject from '@/components/project/AddProject'; // ✅ 추가

export default function ProjectsPage() {
  const { isAdmin } = useProjectStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [sortedProjects, setSortedProjects] = useState<Project[]>([]);
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false); // ✅ 추가

  const fetchProjects = () => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
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

  const handleDelete = async (id: number) => {
    const res = await fetch('/api/projects/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      setProjects((prev) => prev.filter((project) => project.id !== id));
    } else {
      alert('삭제 실패!');
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
        <h1 className="text-2xl font-bold mb-4">Projects</h1>

        <SkillFilter
          skills={allSkills}
          selectedSkill={selectedSkill}
          onChange={setSelectedSkill}
        />

        <SortControls sortOrder={sortOrder} onChange={setSortOrder} />

        {isAdmin && (
          <>
            <button
              className="bg-white/10 text-white px-4 py-2 rounded-lg shadow mb-4"
              onClick={() => setIsFormOpen((prev) => !prev)} // ✅ 버튼
            >
              {isFormOpen ? '취소' : '➕ 새 프로젝트 추가'}
            </button>

            {isFormOpen && (
              <AddProject
                onAdded={() => {
                  fetchProjects();
                  setIsFormOpen(false);
                }}
              />
            )}
          </>
        )}

        <ProjectList
          projects={filtered}
          isAdmin={isAdmin}
          handleDelete={handleDelete}
          handleEdit={(project) => setEditingProject(project)}
        />

        {editingProject && (
          <EditProject
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onSaved={fetchProjects}
          />
        )}
      </div>
    </GlassLayoutWithHeader>
  );
}
