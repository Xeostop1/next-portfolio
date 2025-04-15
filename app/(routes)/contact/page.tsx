import type { Metadata } from 'next'; // *** SEO 메타데이터용 타입 추가
import SendMail from '@/components/mail/SendMail';
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';

// ✅ SEO 최적화 메타데이터 설정
export const metadata: Metadata = {
  title: 'Contact | 서하나 포트폴리오',
  description: '프론트엔드 개발자 서하나에게 궁금한 점이 있다면 언제든지 연락 주세요.',
  keywords: [
    '서하나', '프론트엔드 포트폴리오', 'Contact 서하나', '프론트엔드 개발자 연락처',
    '웹 개발자 이메일', '포트폴리오 문의', '채용 문의', '프론트엔드 지원자',
    '포트폴리오 연락', '개발자 지원서', '개발자 연락 방법'
  ]
};

export default function ContactPage() {
  return (
    <GlassLayoutWithHeader>
      <div className="min-h-screen p-8 text-white bg-gradient-to-br from-black via-indigo-900 to-purple-900">
        <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold mb-6">📮 Contact Me</h1>
          <p className="mb-4">궁금한 점이 있다면 언제든지 연락 주세요!</p>

          <SendMail />
        </div>
      </div>
    </GlassLayoutWithHeader>
  );
}
