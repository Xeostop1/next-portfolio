// components/project/DeleteProject.tsx
'use client';

type Props = {
  id: number;
  onDelete: (id: number) => void;
};

export default function DeleteProject({ id, onDelete }: Props) {
  return (
    <button
      onClick={() => onDelete(id)}
      className="px-2 py-1 text-red-500 hover:text-red-700"
    >
      삭제
    </button>
  );
}
