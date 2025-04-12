'use client';

import { useState } from 'react'; // ⭐ useState 추가

type Props = {
  skills: string[];
  selectedSkill: string | null;
  onChange: (skill: string | null) => void;
};

export default function SkillFilter({ skills, selectedSkill, onChange }: Props) {
  const [showAll, setShowAll] = useState(false); // ⭐ 더보기 상태

  const visibleSkills = showAll ? skills : skills.slice(0, 5); // ⭐ 최대 5개 제한

  return (
    <div className="flex flex-wrap gap-2 mb-4 text-white">
      <button
        onClick={() => onChange(null)}
        className={`px-2 py-1 rounded ${
          selectedSkill === null ? 'font-bold bg-white/20' : 'hover:bg-white/10'
        }`}
      >
        All
      </button>

      {visibleSkills.map((skill) => (
        <button
          key={skill}
          onClick={() => onChange(skill)}
          className={`px-2 py-1 rounded ${
            selectedSkill === skill ? 'font-bold bg-white/20' : 'hover:bg-white/10'
          }`}
        >
          {skill}
        </button>
      ))}

      {/* ⭐ 더보기 / 접기 버튼 */}
      {skills.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="px-2 py-1 rounded hover:bg-white/10 text-sm "
        >
          {showAll ? '▲' : '▼'}
        </button>
      )}
    </div>
  );
}
