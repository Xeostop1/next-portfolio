'use client';

import { useState } from 'react';

export default function AddProject({ onAdded }: { onAdded: () => void }) {
  // 👆 여기에만 타입 한 줄 써주면 별도 Props 타입 없이 OK

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
      onAdded(); // ✅ 성공 시 다시 불러오기
      setTitle('');
      setSubtitle('');
      setDescription('');
      setSkills('');
    } else {
      alert('추가 실패!');
    }
  };

  return (
    <div className="mt-6 border p-4 rounded">
      <h2 className="text-lg font-semibold mb-2">➕ 새 프로젝트 추가</h2>
      <input
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 my-1 w-full"
      />
      <input
        placeholder="부제목"
        value={subtitle}
        onChange={(e) => setSubtitle(e.target.value)}
        className="border p-2 my-1 w-full"
      />
      <textarea
        placeholder="설명"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border p-2 my-1 w-full"
      />
      <input
        placeholder="기술 (쉼표로 구분)"
        value={skills}
        onChange={(e) => setSkills(e.target.value)}
        className="border p-2 my-1 w-full"
      />
      <button
        onClick={handleSubmit}
        className="mt-2 px-4 py-2 rounded bg-white/20 text-white hover:bg-white/30"
      >
        추가
      </button>
    </div>
  );
}
