'use client';

import Link from 'next/link';
import { useSession, } from 'next-auth/react';
import { useEffect } from 'react';
import { useProjectStore } from '@/lib/store/projectStore';

export default function Header() {
  const { data: session, status } = useSession();
  const setIsAdmin = useProjectStore((state) => state.setIsAdmin);

  useEffect(() => {
    if (session?.user?.email === '11requiem27@gmail.com') {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, [session, setIsAdmin]);

  return (
    <header className="fixed top-0 w-full px-4 py-3 bg-black/30 backdrop-blur-md shadow-md z-50">
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-2 sm:gap-4"> {/* *** wrap 막고 가로 정렬 */}

        {/* 왼쪽: 로고 */}
        <h1 className="text-base sm:text-xl font-bold whitespace-nowrap"> {/* *** 모바일 글자 크기 줄임 */}
          <Link href="/">🌌 Hana's Portfolio</Link>
        </h1>

        {/* 오른쪽: 메뉴 */}
        <nav className="flex items-center gap-3 text-sm sm:text-base whitespace-nowrap overflow-x-auto"> {/* *** 글자 작게 + 줄바꿈 방지 */}
          <Link href="/projects">프로젝트</Link>
          <Link href="/about">About</Link>
          <Link href="/contact">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
