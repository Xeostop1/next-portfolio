
import Header from './Header';
import Footer from './Footer';

export default function GlassLayoutWithHeader({ children }: { children: React.ReactNode }) {
  return (
   
    <div className="min-h-screen flex flex-col">
      {/* 헤더 */}
      <Header />

      {/* 콘텐츠 */}
      <main className="flex-1 pt-10">
        {children}
      </main>

      {/* 푸터 */}
      <Footer />
    </div>

  );
}
