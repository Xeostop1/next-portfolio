'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full px-6 py-4 text-white flex justify-between items-center bg-black/30 backdrop-blur-sm shadow-md z-20">
      <h1 className="text-xl font-bold">하나의 우주 포트폴리오</h1>
      <nav className="flex gap-4">
        <Link href="/">홈</Link>
        <Link href="/projects">프로젝트</Link>
        <Link href="/about">소개</Link>
      </nav>
    </header>
  );
}
