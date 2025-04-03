'use client';

import { Project } from '@/types/Project';
import ProjectItem from './ProjectItem';

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
    <ul className="flex flex-wrap justify-center gap-6">
      {projects.map((project) => (
        <li key={project.id} className="w-[300px]">
          <ProjectItem
            project={project}
            isAdmin={isAdmin}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </li>
      ))}
    </ul>
  );
}
