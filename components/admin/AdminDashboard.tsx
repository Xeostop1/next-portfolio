'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/Project';
import { useProjectStore } from '@/lib/store/projectStore';
import { getProjectCount } from '@/services/project/getProjectCount';
import ProjectList from '@/components/project/ProjectList';
import AddProject from '@/components/project/AddProject'; // ✅ 추가
import EditProject from '@/components/project/EditProject';
import MailList from './MailList'; 

export default function AdminPage() {
  const { isAdmin } = useProjectStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false); // ✅ 추가 폼 상태
  const [projectCount, setProjectCount] = useState<number | null>(null);

  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);
  useEffect(() => {
    async function fetchCount() {
      const count = await getProjectCount(); // ✅ 프로젝트 수 가져오기
      setProjectCount(count);
    }
    fetchCount();
  }, []);

  const handleDelete = async (_id: string) => {
    const res = await fetch('/api/projects/delete', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ _id }),
    });

    if (res.ok) {
      setProjects((prev) => prev.filter((p) => p._id !== _id));
    }
  };

  return (

      <div className="p-6">
        <h1 className="text-2xl font-bold text-white mb-4">🛠 Admin Dashboard</h1>
        <div className="backdrop-blur-md bg-white/10 rounded-2xl shadow-lg p-6 text-white w-full max-w-xl mx-auto mt-10">
      {projectCount !== null ? (
        <p>📊 총 프로젝트 수: <span className="font-semibold">{projectCount}</span></p>
      ) : (
        <p>로딩 중...</p>
      )}
       <MailList /> {/* 📬 받은 메일 리스트 표시 */}
    </div>

        {/* ✅ 추가 버튼 */}
        <br/>
        <button
          className="mb-4 px-4 py-2 rounded bg-white/20 hover:bg-white/30 text-white"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '닫기' : '➕ 새 프로젝트 추가'}
        </button>


        {/* ✅ 추가 폼 */}
        {showAddForm && (
          <AddProject
            onAdded={() => {
              setShowAddForm(false);
              fetchProjects(); // 갱신
            }}
          />
        )}
        <br/>
        <br/>
        {/* ✅ 수정 폼 */}
        {editingProject && (
          <EditProject
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onSaved={fetchProjects}
          />
        )}

        {/* ✅ 리스트 */}
        <ProjectList
          projects={projects}
          isAdmin={isAdmin}
          handleEdit={setEditingProject}
          handleDelete={handleDelete}
        />
      </div>

  );
}
