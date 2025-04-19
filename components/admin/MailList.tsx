// /components/mail/MailList.tsx
'use client';

import { useEffect, useState } from 'react';
import { getMails } from '@/sanity/lib/mail';
import { Mail } from '@/types/Mail'; 

export default function MailList() {
  //메일 목록을 담는 상태값: 배열 / 메일 목록을 설정하는 함수 
  const [mails, setMails] = useState<Mail[]>([]);

  //디비값을 setMails에 저장  
  useEffect(() => {
    getMails().then(setMails);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl text-white font-semibold mb-4">📬 받은 메일</h2>
      <ul className="space-y-4">
        {mails.map((mail) => (
          <li key={mail._id} className="p-4 rounded-lg bg-white/10 backdrop-blur text-white shadow-md">
            <p className="text-sm text-gray-300 mb-1">
              보낸 사람: {mail.name} ({mail.email})
            </p>
            <p className="text-sm mb-2 whitespace-pre-wrap">{mail.message}</p>
            <p className="text-xs text-gray-400">
              받은 날짜: {new Date(mail._createdAt).toLocaleString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
