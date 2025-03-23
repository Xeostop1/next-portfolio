
import { NextRequest, NextResponse } from 'next/server';
import { client } from '@/sanity/client';

export async function GET() {
  const query = `*[_type == "project"] | order(createdAt desc)`;
  const projects = await client.fetch(query, {}, { next: { revalidate: 30 } });
  return NextResponse.json(projects);
}

// **** POST 추가: 새 프로젝트 생성
export async function POST(req: NextRequest) {
  const body = await req.json();

  const newProject = {
    _type: 'project',
    title: body.title,
    subtitle: body.subtitle,
    description: body.description,
    skills: body.skills,
    createdAt: body.createdAt || new Date().toISOString(),
  };

  try {
    const result = await client.create(newProject);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: '프로젝트 생성 실패', error }, { status: 500 });
  }
}
