'use client';

import Link from 'next/link';
import { Project } from '@/types/Project';
import slugify from 'slugify';

type Props = {
  project: Project;
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (_id: string) => void;
};

export default function ProjectItem({ project, isAdmin, onEdit, onDelete }: Props) {
  const { id, title, subtitle, skills, createdAt } = project;

  return (
    <li
      className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-4 mb-4 text-white shadow-lg" 
    >
      <Link href={`/projects/${slugify(title)}`}>
        <h3 className="text-lg font-semibold hover:underline text-white"> {title}</h3>
        <p className="text-sm text-gray-300 mt-1"> {subtitle}</p>
        <p className="text-sm mt-1 text-gray-200"> 기술: {skills?.join(', ')}</p>
        <p className="text-xs text-gray-400 mt-1">
          작성일: {new Date(createdAt).toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })
            .replace(/\./g, ' /')
            .replace(/\/\s?$/, '')
            .trim()}
        </p>
      </Link>

      {isAdmin && (
        <div className="mt-2 flex gap-2">
          <button
            className="px-2 py-1 border text-sm rounded hover:bg-white/20 text-white" // 
            onClick={() => onEdit?.(project)}
          >
            수정
          </button>
          <button
              className="px-2 py-1 border text-sm rounded text-red-300 hover:bg-red-500/20"
              onClick={() => onDelete?.(project._id)} // ✅ 수정 완료!
            >
              삭제
          </button>
        </div>
      )}
    </li>
  );
}
