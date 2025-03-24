// 📂 app/api/mail/send/route.ts
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, email, message } = await req.json(); // 📨 body에서 데이터 받기

  if (!name || !email || !message) {
    return new NextResponse('모든 필드를 입력해주세요.', { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // ✅ 환경 변수 사용
        pass: process.env.EMAIL_PASSWORD, // ✅ 앱 비밀번호
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `[Portfolio] ${name}님의 메시지`,
      text: `
        이름: ${name}
        이메일: ${email}
        내용:
        ${message}
      `,
    };

    await transporter.sendMail(mailOptions); // ✅ 메일 전송

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('❌ 메일 전송 실패:', err);
    return new NextResponse('메일 전송에 실패했습니다.', { status: 500 });
  }
}
