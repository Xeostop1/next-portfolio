import { client } from '@/sanity/client';

export async function deleteProjectById(id: number) {
  try {
    await client.delete(id.toString()); 
    return true;
  } catch (error) {
    console.error('삭제 실패:', error);
    return false;
  }
}
