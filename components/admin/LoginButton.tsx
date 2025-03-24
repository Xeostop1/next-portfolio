// components/admin/LoginButton.tsx
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session } = useSession();

  return (
    <div className="text-white">
      {session ? (
        <>
          <p>환영합니다, {session.user?.name}!</p>
          <button onClick={() => signOut()}>로그아웃</button>
        </>
      ) : (
        <button onClick={() => signIn('google')}>구글 로그인</button>
      )}
    </div>
  );
}
