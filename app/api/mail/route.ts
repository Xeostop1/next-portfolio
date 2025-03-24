// 📂 app/api/mail/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return new NextResponse('Missing fields', { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail', // 또는 다른 이메일 서비스
      auth: {
        user: process.env.EMAIL_USER, // .env.local 에 추가
        pass: process.env.EMAIL_PASS, // .env.local 에 추가
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER, // 수신자 이메일
      subject: `📩 포트폴리오 메일: ${name}`,
      text: message,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ 메일 전송 실패:', err);
    return new NextResponse('Failed to send email', { status: 500 });
  }
}
