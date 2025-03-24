// 📂 app/api/projects/delete/route.ts
import { NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export async function DELETE(req: Request) {
  const body = await req.json();
  const { _id } = body;

  console.log('🧩 삭제 요청 _id:', _id); // 로그 꼭 추가!

  if (!_id) {
    console.error('❌ _id가 없습니다');
    return new NextResponse('Missing _id', { status: 400 });
  }

  try {
    const result = await client.delete(_id); // ✅ _id 사용
    console.log('✅ 삭제 성공:', result);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ 삭제 실패:', err);
    return new NextResponse('Failed to delete project', { status: 500 });
  }
}
