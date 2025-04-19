// 📄 /sanity/lib/mail.ts
import { client } from '../client'

//메일 가져오기 쿼리로 메일 가져오기 
export async function getMails() {
  const query = `*[_type == "mail"] | order(_createdAt desc){
    _id,
    name,
    email,
    message,
    _createdAt
  }`;
  return await client.fetch(query);
}
