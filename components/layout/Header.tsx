'use client';

import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useEffect } from 'react'; 
import { useProjectStore } from '@/lib/store/projectStore'; // ****

export default function Header() {
  const { data: session, status } = useSession();
  const setIsAdmin = useProjectStore((state) => state.setIsAdmin); // ****

  // **** 로그인 후 관리자 인증 여부 판단
  useEffect(() => {
    if (session?.user?.email === '11requiem27@gmail.com') {
      setIsAdmin(true); 
    } else {
      setIsAdmin(false); 
    }
  }, [session, setIsAdmin]); 

  return (
    <header className="w-full px-6 py-4 text-white flex justify-between items-center bg-black/30 backdrop-blur-md shadow-md z-50">
      <h1 className="text-xl font-bold">
        <Link href="/">🌌 Hana's Portfolio</Link>
      </h1>

      <nav className="flex items-center gap-4">
        <Link href="/projects">프로젝트</Link>
        <Link href="/about">About</Link>
        <Link href="/admin">Admin</Link>
        <Link href="/contact">Contact</Link>

        {status === 'loading' ? (
          <span>로딩 중...</span>
        ) : session ? (
          <>
            <span className="text-sm text-gray-300">
              {session.user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition"
            >
              로그아웃
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="px-3 py-1 rounded bg-white/20 hover:bg-white/30 transition"
          >
            로그인
          </button>
        )}
      </nav>
    </header>
  );
}
