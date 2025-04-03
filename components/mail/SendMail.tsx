'use client';

import { useState } from 'react';
import GlassButton from '@/components/common/GlassButton';

export default function SendMail() {
  const [email, setEmail] = useState('');
  const [name, setname] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('⏳ 메일 전송 중...');

    const res = await fetch('/api/mail/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, message }),
    });

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
      className="space-y-4 bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-xl text-black" // **** text-black로 변경
    >
    

      <input
        type="email"
        placeholder="받는 사람 이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 rounded bg-white/20 placeholder-gray-600 text-black" // ****
        required
      />

      <input
        type="text"
        placeholder="제목"
        value={name}
        onChange={(e) => setname(e.target.value)}
        className="w-full p-2 rounded bg-white/20 placeholder-gray-600 text-black" // ****
        required
      />

      <textarea
        placeholder="내용"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full p-2 h-32 rounded bg-white/20 placeholder-gray-600 text-black" // ****
        required
      />

      <GlassButton type="submit">메일 보내기</GlassButton>

      {status && <p className="text-black">{status}</p>} {/* **** 상태 메시지도 검정으로 */}
    </form>
  );
}
