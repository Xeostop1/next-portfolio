'use client';

type Props = {
  children: React.ReactNode;
};

export default function GlassLayout({ children }: Props) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-indigo-900 to-purple-900 p-8">
      <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 md:p-12 w-full max-w-5xl">
        {children}
      </div>
    </div>
  );
}
