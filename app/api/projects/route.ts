import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';
import { v4 as uuidv4 } from 'uuid';
import { getProjects } from '@/sanity/lib/sanity'; // ✅ GET용 헬퍼 함수 import

// ✅ GET: 프로젝트 목록 가져오기
export async function GET() {
  try {
    const projects = await getProjects();
    return NextResponse.json(projects);
  } catch (err) {
    console.error('❌ GET 실패:', err);
    return new NextResponse('Failed to fetch projects', { status: 500 });
  }
}

// ✅ POST: 새 프로젝트 추가
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, subtitle, path, description, skills } = body;

    const newProject = await client.create({
      _id: uuidv4(), // 고유 _id 생성
      _type: 'project',
      id: Number(new Date().getTime()), // 보조용 숫자 ID
      title,
      subtitle,
      path,
      description,
      skills,
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json(newProject);
  } catch (err) {
    console.error('❌ 추가 실패:', err);
    return new NextResponse('Failed to add project', { status: 500 });
  }
}
