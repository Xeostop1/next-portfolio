'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react';
import { useProjectStore } from '@/lib/store/projectStore';
import { useRouter } from 'next/navigation'; // ✅ 추가

export default function Footer() {
  const { data: session, status } = useSession();
  const setIsAdmin = useProjectStore((state) => state.setIsAdmin);
  const router = useRouter(); // ✅ 추가

  useEffect(() => {
    if (session?.user?.email === '11requiem27@gmail.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session, setIsAdmin]);

  return (
    <footer className="backdrop-blur-md bg-white/10 border-t border-white/20 text-white text-sm py-4 px-6 text-center shadow-inner">
      <p>&copy; {new Date().getFullYear()} 우주 테마 포트폴리오 🚀</p>

      {/* 로그인/로그아웃 및 Admin 링크 표시 */}
      <div className="mt-2 flex flex-col sm:flex-row gap-2 justify-center items-center text-xs sm:text-sm">
        {status === 'loading' ? (
          <span>⏳ 확인 중...</span>
        ) : session ? (
          <>
            <span className="text-gray-300">{session.user?.email}</span>
            <a href="/admin" className="underline hover:text-white">Admin</a>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition"
            >
              로그아웃
            </button>
          </>
        ) : (
          <button
            onClick={() =>
              signIn('google', { callbackUrl: '/admin' }) // ✅ 로그인 성공 시 /admin으로 이동
            }
            className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition"
          >
            로그인
          </button>
        )}
      </div>
    </footer>
  );
}
