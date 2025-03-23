'use client';

import { useRouter } from 'next/navigation';
import GlassButton from '../GlassButton'; // ✅ 위에서 만든 버튼

export default function BackHomeButton() {
  const router = useRouter();

  return (
    <GlassButton onClick={() => router.push('/')}>
      🏠 홈으로
    </GlassButton>
  );
}
