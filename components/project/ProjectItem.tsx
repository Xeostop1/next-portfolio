'use client';

import Link from 'next/link';
import { Project } from '@/types/Project';
import slugify from 'slugify';

type Props = {
  project: Project;
  isAdmin?: boolean;
  onEdit?: (project: Project) => void;
  onDelete?: (id: number) => void;
};

export default function ProjectItem({ project, isAdmin, onEdit, onDelete }: Props) {
  const { id, title, subtitle, skills, createdAt } = project;

  return (
    <li className="border p-4 rounded mb-4">
      <Link href={`/projects/${slugify(title)}`}>
        <h3 className="text-lg font-semibold hover:underline">{title}</h3>
        <p className="text-sm text-gray-500">{subtitle}</p>
        <p className="text-sm mt-1">기술: {skills?.join(', ')}</p>
        <p className="text-xs text-gray-400 mt-1">작성일: {new Date(createdAt).toLocaleDateString()}</p>
      </Link>
      {isAdmin && (
        <div className="mt-2 flex gap-2">
          <button
            className="px-2 py-1 border text-sm rounded hover:bg-gray-100"
            onClick={() => onEdit?.(project)}
          >
            수정
          </button>
          <button
            className="px-2 py-1 border text-sm rounded text-red-600 hover:bg-red-100"
            onClick={() => onDelete?.(id)}
          >
            삭제
          </button>
        </div>
      )}
    </li>
  );
}
