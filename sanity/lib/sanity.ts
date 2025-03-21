import { client } from '../client';

export async function getProjects() {
  const query = `*[_type == "project"]{ id, title, subtitle, description, skills, createdAt }`;
  return await client.fetch(query);
}
