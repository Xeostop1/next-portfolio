'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/types/Project';
import { useProjectStore } from '@/lib/store/projectStore';
import { getProjectCount } from '@/services/project/getProjectCount';
import ProjectList from '@/components/project/ProjectList';
import AddProject from '@/components/project/AddProject'; 
import EditProject from '@/components/project/EditProject';
import MailList from './MailList'; 

export default function AdminPage() {
  const { isAdmin } = useProjectStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [showAddForm, setShowAddForm] = useState(false); 
  const [projectCount, setProjectCount] = useState<number | null>(null);


  //프로젝트 가져오기 
  const fetchProjects = async () => {
    const res = await fetch('/api/projects');
    const data = await res.json();
    setProjects(data);
  };

  //리스트 가져오기  
  useEffect(() => {
    fetchProjects();
  }, []);

  //카운트 작업 서비스에서 불러움  
  useEffect(() => {
    async function fetchCount() {
      const count = await getProjectCount(); 
      // 현재 프로젝트 개수 상태를 count 값으로 업데이트 useStats projectCount을 사용하는 부분이 있다면 자동으로 다시 렌더링
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
      //현재 프로젝트 목록이고 함수형 업데이트 이전 프로젝트 목록에서 _id가 일치 하지 않는것만 남겨 
      //prev 이전에 저장된 프로젝트 목록 filter 조건에 맞는 것만 남김
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
       <MailList />
    </div>
        <br/>
        <button
          className="mb-4 px-4 py-2 rounded bg-white/20 hover:bg-white/30 text-white"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          {showAddForm ? '닫기' : '➕ 새 프로젝트 추가'}
        </button>
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
        {editingProject && (
          <EditProject
            project={editingProject}
            onClose={() => setEditingProject(null)}
            onSaved={fetchProjects}
          />
        )}

        <ProjectList
          projects={projects}
          isAdmin={isAdmin}
          handleEdit={setEditingProject}
          handleDelete={handleDelete}
        />
      </div>

  );
}


/*
setProjects(function updateProjects(previousProjects) {
  const filteredProjects = previousProjects.filter(function (project) {
    return project._id !== _id; // 삭제할 ID와 다른 것만 남김
  });

  return filteredProjects;
});

*/