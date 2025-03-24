// services/project/getProjectCount.ts
import { client } from '@/sanity/client';

export async function getProjectCount(): Promise<number> {
  const query = `count(*[_type == "project"])`; // ✅ 전체 개수만 가져옴
  const count: number = await client.fetch(query);
  return count;
}
