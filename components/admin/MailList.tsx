'use client';

import { useEffect, useState } from 'react';
import { getMails } from '@/sanity/lib/mail';

type Mail = {
  _id: string;
  name: string;
  email: string;
  message: string;
  _createdAt: string;
};

export default function MailList() {
  const [mails, setMails] = useState<Mail[]>([]);

  useEffect(() => {
    getMails().then(setMails);
  }, []);

  return (
    <div className="mt-8">
      <h2 className="text-xl text-white font-semibold mb-4">📬 받은 메일</h2>
      <ul className="space-y-4">
        {mails.map((mail) => (
          <li key={mail._id} className="p-4 rounded-lg bg-white/10 backdrop-blur text-white shadow-md">
            <p className="text-sm text-gray-300 mb-1">보낸 사람: {mail.name} ({mail.email})</p>
            <p className="text-sm mb-2 whitespace-pre-wrap">{mail.message}</p>
            <p className="text-xs text-gray-400">받은 날짜: {new Date(mail._createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
