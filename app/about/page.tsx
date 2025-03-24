'use client';

import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';

export default function AboutPage() {
  // <img
//   src="/profile.mp4"
//   alt="프로필"
//   className="rounded-xl w-55 h-110 object-cover border-4 border-white/20 shadow-xl"
// />
  return (
    <GlassLayoutWithHeader>
      <div className="grid md:grid-cols-2 gap-8">
        {/* 👈 왼쪽: 소개 */}
        <div className="backdrop-blur-sm bg-white/5 rounded-xl p-6 shadow-md border border-white/20 text-white space-y-4 flex flex-col justify-center">
          <h1 className="text-3xl font-bold">서하나</h1>
          <p>Next.js로 우주 감성 포트폴리오를 만드는 중...</p>
          <p>
          🛸　　　 　🌎　°　　🌓　•　　.°•　　　🚀 ✯
　　　★　*　　　　　°　　　　🛰 　°·　　   🪐
.　　　•　° ★　•  ☄
▁▂▃▄▅▆▇▇▆▅▄▃▁▂

          </p>

          <div>
            <h2 className="text-xl font-semibold mt-4">기술 스택</h2>
            <ul className="list-disc list-inside">
              <li>React</li>
              <li>TypeScript</li>
              <li>Tailwind CSS</li>
              <li>Sanity</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mt-4">연락처</h2>
            <p>Email: hanadev@example.com</p>
            <p>GitHub: github.com/hanadev</p>
          </div>
        </div>

        {/* 👉 오른쪽: 이미지 */}
        <div className="flex items-center justify-center">
        <video
            src="/profile.mp4" // 🎬 public 폴더에 profile.mp4 파일 있어야 해!
            autoPlay
            loop
            muted
            playsInline
            className="rounded-lg w-[300px] h-[540px] object-cover border-4 border-white/10 shadow-xl" 
          />

        </div>
      </div>
      </GlassLayoutWithHeader>
  );
}
