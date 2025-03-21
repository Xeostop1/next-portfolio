// app/projects/[slug]/page.tsx

import { notFound } from 'next/navigation';
import slugify from 'slugify';
import { getProjects } from '@/services/project/getProject';
import { Project } from '@/types/Project';

type Props = {
  params: { slug: string };
};

export default async function ProjectDetail({ params }: Props) {
  const projects: Project[] = await getProjects();

  const matched = projects.find((project) => {
    return slugify(project.title) === params.slug;
  });

  if (!matched) {
    return notFound();
  }

  return (
    <div>
      <h1>{matched.title}</h1>
      {matched.subtitle && <h2>{matched.subtitle}</h2>}
      {matched.description && <p>{matched.description}</p>}
      {matched.skills && (
        <ul>
          {matched.skills.map((skill, idx) => (
            <li key={idx}>{skill}</li>
          ))}
        </ul>
      )}
      <p>Created At: {new Date(matched.createdAt).toLocaleDateString()}</p>
    </div>
  );
}
