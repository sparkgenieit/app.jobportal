'use client';

import React, { useEffect, useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import axios from 'axios';

interface Ad {
  id: number;
  title: string;
  description?: string;
  redirect_url?: string;
  ad_image_url?: string;
  image?: string;
  company_id?: number;
}

const LandingPagePopup: React.FC = () => {
  const [show, setShow] = useState(false);
  const [ad, setAd] = useState<Ad | null>(null);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      if (path.startsWith('/company') || path.startsWith('/admin')) {
        setIsHidden(true);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const alreadyShown = sessionStorage.getItem('landingPopupShown');
    if (alreadyShown) return;

    axios
      .get(`${process.env.NEXT_PUBLIC_API_URL}/ads/show-ad?type=landing-page-popup`)
      .then((res) => {
        const data = res.data;
        if (data) {
          setAd(data);
          setShow(true);
          sessionStorage.setItem('landingPopupShown', 'true');

          setTimeout(() => {
            setShow(false);
          }, 10000); // ✅ Hide after 10 seconds
        }
      })
      .catch(() => setAd(null));
  }, []);

  const closePopup = () => {
    setShow(false);
    sessionStorage.setItem('landingPopupShown', 'true');
  };

  if (!show || !ad || isHidden) return null;

  const imgSrc = ad.company_id
    ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/ads/${ad.image}`
    : ad.ad_image_url || '';

  return (
    <div className="fixed top-10 left-1/2 transform -translate-x-1/2 z-[9999]">
      <div className="bg-white rounded-lg shadow-lg max-w-lg w-full relative p-4 border border-gray-200">
        <button
          onClick={closePopup}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
        >
          <RxCross1 size={20} />
        </button>

        <div className="flex flex-col items-center text-center gap-4">
          {ad.title && <h2 className="text-lg font-bold">{ad.title}</h2>}

          {imgSrc && (
            <img
              src={imgSrc}
              alt={ad.title}
              className="w-full max-h-80 object-contain rounded"
            />
          )}

          {ad.description && <p className="text-gray-700">{ad.description}</p>}

          {ad.redirect_url && (
            <a
              href={ad.redirect_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Learn More
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default LandingPagePopup;
