'use client';

type Props = {
  skills: string[];
  selectedSkill: string | null;
  onChange: (skill: string | null) => void;
};

export default function SkillFilter({ skills, selectedSkill, onChange }: Props) {
  return (
    <div className="flex gap-2 mb-4 text-white">
      <span>기술 필터:</span>
      <button
        onClick={() => onChange(null)}
        style={{ fontWeight: selectedSkill === null ? 'bold ' : 'normal' }}
      >
        All
      </button>
      {skills.map((skill) => (
        <button
          key={skill}
          onClick={() => onChange(skill)}
          style={{ fontWeight: selectedSkill === skill ? 'bold' : 'normal' }}
        >
          {skill}
        </button>
      ))}
    </div>
  );
}
