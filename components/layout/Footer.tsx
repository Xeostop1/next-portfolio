
'use client';

export default function Footer() {
  return (
    <footer className="backdrop-blur-md bg-white/10 border-t border-white/20 text-white text-sm py-4 px-6 text-center shadow-inner">
      <p>&copy; {new Date().getFullYear()} 우주 테마 포트폴리오 🚀</p>
    </footer>
  );
}
