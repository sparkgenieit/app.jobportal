// components/ads/TopAdBanner.tsx
'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Ad {
  id: number;
  ad_image_url: string;
  redirect_url?: string;
}

const TopAdBanner: React.FC = () => {
  const [ad, setAd] = useState<Ad | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/ads/show-ad?type=home-page-banner`) // ✅ same as legacy usage
      .then((res) => {
        setAd(res.data);
      })
      .catch(() => {
        setAd(null);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading || !ad || !ad.ad_image_url) return null;

  return (
    <div className="w-full flex justify-center">
      <a
        href={ad.redirect_url || '#'}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full flex justify-center"
      >
        <img
          src={ad.ad_image_url}
          alt="Ad Banner"
          className="w-full max-w-screen-xl object-contain"
        />
      </a>
    </div>
  );
};

export default TopAdBanner;
