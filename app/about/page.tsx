'use client';

import Link from 'next/link'; // *** Link 추가
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';

export default function AboutPage() {
  return (
    <GlassLayoutWithHeader>
      {/* ✅ 항상 가로 정렬 */}
      <div className="flex flex-row flex-wrap justify-center items-center gap-4 p-4">
        {/* 👈 소개 카드 */}
        <div className="w-[320px] h-[540px] backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-md border border-white/20 text-white flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">서하나</h1>
            <p className="mt-2 text-sm">Next.js로 우주 감성 포트폴리오를 만드는 중...</p>
          </div>

          <div className="text-sm leading-relaxed mt-2">
            🛸　　　 　🌎　°　　🌓　•　　.°•　　　🚀 ✯ <br />
            ★　*　　　　　°　　　　🛰 　°·　　   🪐 <br />
            .　　　•　° ★　•  ☄ <br />
            ▁▂▃▄▅▆▇▇▆▅▄▃▁▂
          </div>

          <div>
            <h2 className="text-lg font-semibold mt-4">기술 스택</h2>
            <ul className="list-disc list-inside text-sm">
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Sanity</li>
            </ul>
          </div>

          <div>
            <h2 className="text-lg font-semibold mt-4">연락처</h2>
            <p className="text-sm">
              📩{' '}
              <Link href="/contact" className="underline text-blue-300 hover:text-blue-400"> {/* *** Contact 페이지로 이동 */}
                stop1@daum.net
              </Link>
            </p>
            <p className="text-sm mt-1">
              🔗{' '}
              <a
                href="https://github.com/Xeostop1?tab=overview&from=2025-03-01&to=2025-03-12"
                target="_blank"
                rel="noopener noreferrer"
                className="underline text-blue-300 hover:text-blue-400"
              >
                GitHub 바로가기
              </a> 
            </p>
          </div>
        </div>

        {/* 👉 비디오 카드 */}
        <div className="w-[320px] h-[540px] rounded-xl overflow-hidden border border-white/10 shadow-xl">
          <video
            src="/profile.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </GlassLayoutWithHeader>
  );
}
