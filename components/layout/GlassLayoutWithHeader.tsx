'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

type Props = {
  children: React.ReactNode;
};

export default function GlassLayoutWithHeader({ children }: Props) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-indigo-900 to-purple-900 overflow-hidden">
      {/* 🌠 배경 별 애니메이션 */}
      <div className="absolute inset-0 z-0 animate-pulse bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/5 via-transparent to-transparent pointer-events-none" />

      <Header />

      <main className="relative z-10 flex justify-center items-center p-8">
        <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl w-full max-w-5xl p-6 md:p-12">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
