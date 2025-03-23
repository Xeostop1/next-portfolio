'use client';

import { useEffect, useState } from 'react';
import { Project } from '@/types/Project';

type Props = {
  project: Project;
  onClose: () => void;
  onSaved: () => void;
};

export default function EditProject({ project, onClose, onSaved }: Props) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [skills, setSkills] = useState<string[]>([]);


  useEffect(() => {
    setTitle(project.title);
    setSubtitle(project.subtitle || ''); 
    setDescription(project.description || '');
    setSkills(project.skills || []);
  }, [project]);

  const handleSubmit = async () => {
    await fetch('/api/projects/edit', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...project,
        title,
        subtitle,
        description,
        skills,
      }),
    });
  
    onSaved();
    onClose();
  };

  return (
    <div className="border p-4 mt-4 rounded">
      <h2>프로젝트 수정</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="border p-1 my-2 w-full"
      />
      <input
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="부제목"
        className="border p-1 my-2 w-full"
      />
      <input
        value={skills.join(', ')}
        onChange={(e) => setSkills(e.target.value.split(',').map((s) => s.trim()))}
        placeholder="기술 (쉼표로 구분)"
        className="border p-1 my-2 w-full"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명"
        className="border p-1 w-full"
      />
      <div className="flex gap-2 mt-2">
        <button onClick={handleSubmit}>저장</button>
        <button onClick={onClose}>취소</button>
      </div>
    </div>
  );
}
