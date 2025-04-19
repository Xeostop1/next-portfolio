'use client';

import { useState } from 'react';
import GlassButton from '@/components/common/GlassButton';
import { event } from '@/lib/gtag'; 

export default function SendMail() {
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  //useState로 폼상태 관리 사용자 실시간 입력 관리 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); //폼 제출시 페이지 새로고침 불가 아래 실행 
    setStatus('⏳ 메일 전송 중...');

    //ga4
    event({
      action: 'contact_form_submit',
      category: 'Contact',
      label: 'Contact Form Submission',
    });

    //api 호출로 메일 전송  엔드주소 api mail send로 json 데이터 전송 
    const res = await fetch('/api/mail/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, message }),
    });

    //전송되면 status 변경 후 입력 폼 초기화 
    if (res.ok) {
      setStatus('✅ 메일이 성공적으로 전송되었습니다!');
      setEmail('');
      setname('');
      setMessage('');
    } else {
      setStatus('❌ 메일 전송 실패...');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-xl text-black"
    >
      <input
        type="email"
        placeholder="받는 사람 이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-white/20 placeholder-gray-600 text-black"
        required
      />

      <input
        type="text"
        placeholder="제목"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="w-full p-2 rounded bg-white/20 placeholder-gray-600 text-black"
        required
      />

      <textarea
        placeholder="내용"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 h-32 rounded bg-white/20 placeholder-gray-600 text-black"
        required
      />

      <GlassButton type="submit">메일 보내기</GlassButton>

      {status && <p className="text-black">{status}</p>}
    </form>
  );
}
