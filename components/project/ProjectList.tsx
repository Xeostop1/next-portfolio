'use client';

import { Project } from '@/types/Project';
import ProjectItem from './ProjectItem'; // 다음 단계에서 만들거야

type Props = {
  projects: Project[];
  isAdmin: boolean;
  handleDelete: (_id: string) => void;
  handleEdit: (project: Project) => void;
};

export default function ProjectList({
  projects,
  isAdmin,
  handleDelete,
  handleEdit,
}: Props) {
  return (
    <ul>
      {projects.map((project) => (
        <ProjectItem
          key={project.id}
          project={project}
          isAdmin={isAdmin}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </ul>
  );
}
