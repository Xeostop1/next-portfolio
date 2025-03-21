import { getProjects } from '@/sanity/lib/sanity';
import { Project } from '../lib/types'

export default async function HomePage() {
  const projects:Project[] = await getProjects();

  return (
    <div>
      <h1>My Projects</h1>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h2>{project.title}</h2>
            <p>{project.subtitle}</p>
            <p>{project.description}</p>
            <p>Skills: {project.skills.join(', ')}</p>
            <p>Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
            <hr/>
          </li>
        ))}
        
      </ul>
    </div>
  );
}
