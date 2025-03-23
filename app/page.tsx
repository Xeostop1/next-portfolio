import Header from '@/components/layout/Header';
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';

export default function Home() {
  return (
    <main>
        <GlassLayoutWithHeader>
          <section className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Welcome!</h2>
            <p>포트폴리오 사이트에 오신 걸 환영합니다. 상단 버튼을 눌러 프로젝트를 확인해보세요.</p>
          </section>
      </GlassLayoutWithHeader>
    </main>

  );
}
