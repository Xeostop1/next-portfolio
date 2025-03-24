'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/api/auth/signin'); // 로그인 페이지로 이동
    }
  }, [status, router]);

  if (status === 'loading') return <p>로딩 중...</p>;

  if (!session) return null; // 인증 안된 경우 아무것도 안 보여줌

  return <>{children}</>; // 인증된 경우 children을 보여줌
}
