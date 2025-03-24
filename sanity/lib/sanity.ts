import { client } from '../client';

export async function getProjects() {
  const query = `*[_type == "project"]{ _id, id, title, subtitle, description, skills, createdAt }`; // ✅ _id 포함
  return await client.fetch(query);
}
