'use client';

import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useProjectStore } from '@/lib/store/projectStore';
import { event } from '@/lib/gtag'; // ✅ 이벤트 함수 import

export default function Header() {
  const { data: session } = useSession();
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
      <div className="flex items-center justify-between flex-wrap sm:flex-nowrap gap-2 sm:gap-4">
        {/* 왼쪽: 로고 */}
        <h1 className="text-base sm:text-xl font-bold whitespace-nowrap">
          <Link href="/">🌌 Hana's Portfolio</Link>
        </h1>

        {/* 오른쪽: 메뉴 */}
        <nav className="flex items-center gap-3 text-sm sm:text-base whitespace-nowrap overflow-x-auto">
          <Link
            href="/projects"
            onClick={() =>
              event({
                action: 'click_projects',
                category: 'Navigation',
                label: '프로젝트 메뉴 클릭',
              })
            }
          >
            프로젝트
          </Link>

          <Link
            href="/about"
            onClick={() =>
              event({
                action: 'click_about',
                category: 'Navigation',
                label: 'About 메뉴 클릭',
              })
            }
          >
            About
          </Link>

          <Link
            href="/contact"
            onClick={() =>
              event({
                action: 'click_contact',
                category: 'Navigation',
                label: 'Contact 메뉴 클릭',
              })
            }
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
