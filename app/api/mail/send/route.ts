// 📂 app/api/mail/send/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { client } from '@/sanity/client'; // ✅ Sanity client

export async function POST(req: Request) {
  console.log('📨 메일 API 요청 도착!');
  const { name, email, message } = await req.json();
  console.log('📥 받은 데이터:', { name, email, message });

  if (!name || !email || !message) {
    return new NextResponse('모든 필드를 입력해주세요.', { status: 400 });
  }

  try {
    // ✅ 메일 전송
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] ${name}님의 메시지`,
      text: `이름/ 제목: ${name}\n이메일: ${email}\n내용:\n${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ 메일 전송 성공');

    // ✅ Sanity에 저장
    const saved = await client.create({
      _type: 'mail',
      name,
      email,
      message,
      createdAt: new Date().toISOString(),
    });
    console.log('📝 Sanity에 저장됨:', saved);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ 메일 전송 실패:', err);
    return new NextResponse('메일 전송에 실패했습니다.', { status: 500 });
  }
}
