// **** [새로 생성]
import { NextResponse } from 'next/server';
import { deleteProjectById } from '@/services/project/deleteProject'; // ****

export async function DELETE(req: Request) {
  const { id } = await req.json(); // ****
  const success = await deleteProjectById(id); // ****

  if (success) {
    return NextResponse.json({ message: '삭제 성공' }); // ****
  } else {
    return NextResponse.json({ message: '삭제 실패' }, { status: 500 }); // ****
  }
}
