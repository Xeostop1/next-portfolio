'use client';

import { useEffect, useState } from 'react';
import { fetchLatestEpicImage } from '@/services/nasa/epicApi';

export default function EarthFromEpic() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    async function getImage() {
      const url = await fetchLatestEpicImage();
      setImageUrl(url);
    }
    getImage();
  }, []);

  if (!imageUrl) return <p className="text-white">지구 이미지를 불러오는 중...</p>;

  return (
    <div className="flex justify-center items-center p-4">
      <img
        src={imageUrl}
        alt="Latest Earth from NASA EPIC"
        className="rounded-xl shadow-lg border border-white/20 max-w-full h-auto"
      />
    </div>
  );
}
