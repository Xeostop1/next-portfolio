'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToastState } from '@/lib/hook/useToastState'; //  Toast 훅 사용

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToastState(); //  Toast 보여주기 함수 호출

  useEffect(() => {
    if (status === 'authenticated') {
      if (session.user?.email !== '11requiem27@gmail.com') {
        showToast('❌ 접근 권한이 없습니다.'); //  토스트 알림 사용
        router.replace('/');
      }
    }
  }, [session, status, router, showToast]);

  if (status === 'loading') return <div className="text-white p-6">로딩 중...</div>;

  return <>{children}</>;
}