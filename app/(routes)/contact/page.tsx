// 📄 app/(routes)/contact/page.tsx
'use client';
import SendMail from '@/components/mail/SendMail';
import GlassLayoutWithHeader from '@/components/layout/GlassLayoutWithHeader';

export default function ContactPage() {
  return (
    <GlassLayoutWithHeader>
        <div className="min-h-screen p-8 text-white bg-gradient-to-br from-black via-indigo-900 to-purple-900">
          <div className="max-w-3xl mx-auto backdrop-blur-md bg-white/10 p-8 rounded-2xl shadow-lg">
            <h1 className="text-3xl font-bold mb-6">📮 Contact Me</h1>
            <p className="mb-4">궁금한 점이 있다면 언제든지 연락 주세요!</p>

            <SendMail /> {/* ✅ 만든 폼 재사용 */}
            
          </div>
          
      </div>
    </GlassLayoutWithHeader>
  );
}
