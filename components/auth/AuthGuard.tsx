'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToastState } from '@/lib/hook/useToastState';

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { showToast } = useToastState();

  useEffect(() => {
    // console.log('세션 상태:', status);
    // console.log('현재 세션:', session);

    if (status === 'authenticated') {
      // 관리자가 아니면 메인 페이지로 강제 이동
      if (session.user?.email !== '11requiem27@gmail.com') {
        showToast('❌ 접근 권한이 없습니다.');
        router.replace('/'); // 홈으로 강제 이동
      }
    }

    // 로그인 안 된 경우에도 이동
    if (status === 'unauthenticated') {
      showToast('❌ 로그인 후 이용해 주세요.');
      router.replace('/');
    }
  }, [session, status, router, showToast]);

  if (status === 'loading') {
    return <div className="text-white p-6">🔐 확인 중...</div>;
  }

  // 인증되지 않았거나 관리자가 아니면 아무것도 안 보여줌
  // 자동으로 알려주는 세션 상태 -> loading authenticated	(로그인 완료 / 세션 유효) unauthenticated (비 로그인, 세션없음)
  if (
    status === 'unauthenticated' ||
    (status === 'authenticated' && session?.user?.email !== '11requiem27@gmail.com')
  ) {
    return null; 
  }

  return <>{children}</>;
}


/*if (
  session &&
  session.user &&
  session.user.email !== '11requiem27@gmail.com'
) {
  
session이 없으면 → undefined
user가 없으면 → undefined
email까지 안전하게 접근
세션? 없으면 언디파인
user? 없으면 언디파인
다 하면 email 반환 


*/