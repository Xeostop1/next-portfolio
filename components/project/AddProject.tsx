'use client';

import { useState } from 'react';
import { Project } from '@/types/Project';
import GlassButton from '@/components/common/GlassButton';

type Props = {
  onAdded: () => void;
};

export default function AddProject({ onAdded }: Props) {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        subtitle,
        description,
        skills: skills.split(',').map((s) => s.trim()),
      }),
    });

    if (res.ok) {
      onAdded();
      setTitle('');
      setSubtitle('');
      setDescription('');
      setSkills('');
    } else {
      alert('추가 실패!');
    }
  };

  return (
    <div className="border p-4 rounded mt-4 text-white">
      <h2 className="text-lg font-semibold mb-2">프로젝트 추가</h2>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="제목"
        className="border p-2 mb-2 w-full bg-black/30 text-white"
      />
      <input
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        placeholder="부제목"
        className="border p-2 mb-2 w-full bg-black/30 text-white"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="설명"
        className="border p-2 mb-2 w-full bg-black/30 text-white"
      />
      <input
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        placeholder="기술 (쉼표로 구분)"
        className="border p-2 mb-2 w-full bg-black/30 text-white"
      />
      <GlassButton onClick={handleSubmit}>저장</GlassButton>
    </div>
  );
}
