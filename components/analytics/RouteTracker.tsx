'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { pageview } from '@/lib/gtag';

export default function RouteTracker() {
  const pathname = usePathname();

  useEffect(() => {
    pageview(pathname); // *** 페이지 전환 시 pageview 호출 ***
  }, [pathname]);

  return null;
}
