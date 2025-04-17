// gtag.ts

// GA 측정 ID를 환경변수에서 가져옵니다
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

// ✅ 타입스크립트에서 window.gtag을 인식하도록 선언
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// ✅ pageview 이벤트 추적 함수
export const pageview = (url: string) => {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('config', GA_ID, {
    page_path: url,
  });
};

// ✅ 이벤트 추적 함수 (선택적으로 사용할 수 있음)
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label: string;
  value?: number;
}) => {
  if (!GA_ID || typeof window === 'undefined' || typeof window.gtag !== 'function') return;

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value,
  });
};
