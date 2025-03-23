
// services/project/getProjects.ts
import { client } from '@/sanity/client';

export async function getProjects() {
  return await client.fetch(`
    *[_type == "project"]{
      id,
      title,
      subtitle,
      createdAt
    }
  `);
}
