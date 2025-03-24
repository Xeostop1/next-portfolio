'use client';

import { useEffect } from 'react';

type Props = {
  message: string;
  visible: boolean; // **** visible 추가
  onClose: () => void;
};

export default function Toast({ message, visible, onClose }: Props) {
  useEffect(() => {
    if (visible) {
      const timer = setTimeout(onClose, 3000); // **** 3초 후 자동 종료
      return () => clearTimeout(timer);
    }
  }, [visible, onClose]); // **** visible 추가

  if (!visible) return null; // **** 안 보이면 렌더링 안 함

  return (
    <div className="fixed bottom-6 right-6 z-50 px-6 py-3 rounded-2xl shadow-lg border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm transition-opacity duration-300">
      {message}
    </div>
  );
}
