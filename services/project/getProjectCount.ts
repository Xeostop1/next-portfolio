// services/project/getProjectCount.ts
import { client } from '@/sanity/client';
//세니티에 연결된  데이터를 요청할 수 있게 해주는 객체 임포트 

export async function getProjectCount(): Promise<number> {
  // GROQ (Graph-Relational Object Queries) 문법으로 작성된 쿼리 타입인 모든 문서를 선택 count(...): 그 문서들의 개수만 가져오라는 의미
  const query = `count(*[_type == "project"])`; // ✅ 전체 개수만 가져옴
  //쿼리날려서 리턴값 카운터 리턴하기 
  const count: number = await client.fetch(query); 
  return count;
}

//왜 서비스에 만들었나? -> 컴포넌트는 ui / 서비스는 데이터 처리나 외부 api 호출을 하는게 좋음 