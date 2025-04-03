'use client';

import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';

export default function AboutPage() {
  return (
    <GlassLayoutWithHeader>
      {/* ✅ flex-row로 항상 가로로 유지 */}
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
            <p className="text-sm">Email: hanadev@example.com</p>
            <p className="text-sm">GitHub: github.com/hanadev</p>
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
