// 📂 app/api/projects/edit/route.ts
import { client } from '@/sanity/client'

export async function PUT(req: Request) {
  try {
    const body = await req.json()
    const { _id, title, subtitle, description, skills } = body

    if (!_id) {
      return new Response('Missing _id', { status: 400 })
    }

    await client
      .patch(_id)
      .set({
        title,
        subtitle,
        description,
        skills,
      })
      .commit() // ✅ 수정 내용 커밋

    return new Response(JSON.stringify({ message: '수정 성공' }), { status: 200 })
  } catch (error) {
    console.error('❌ 수정 실패:', error)
    return new Response(JSON.stringify({ message: '수정 실패' }), { status: 500 })
  }
}
