'use client';

import { useEffect, useState } from 'react';
import ToastViewer from '@/components/common/ToastViewer';

interface Props {
  category: string;
  topic: string;
  content: string;
  ads?: any[];
}

export default function CategoriesMainContent({ category, topic, content, ads = [] }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="flex flex-col-reverse lg:flex-row justify-between max-w-[1440px] mx-auto">
      {/* Main Content */}
      <div className="w-full lg:max-w-4xl">
        {/* SSR fallback for SEO */}
        {!isClient && (
          <div
            className="sr-only"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        )}
        {/* Hydrated TUI Viewer */}
        {isClient && <ToastViewer content={content} />}
        
        {/* 📱 Mobile Ads (bottom of content) */}
        <div className="block lg:hidden mt-8">
          {ads.length > 0 && ads.map((ad, index) => (
            <div key={index} className="mb-6">
              <a href={ad.redirect_url} target="_blank" rel="noopener noreferrer">
                <img
                  src={ad.ad_image_url}
                  alt={ad.title || `Ad ${index + 1}`}
                  className="w-full rounded shadow"
                />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* 💻 Desktop Sidebar Ads */}
      <aside className="hidden lg:block w-[400px] pl-4">
        {ads.length > 0 && ads.map((ad, index) => (
          <div key={index} className="mb-6">
            <a href={ad.redirect_url} target="_blank" rel="noopener noreferrer">
              <img
                src={ad.ad_image_url}
                alt={ad.title || `Ad ${index + 1}`}
                className="w-full rounded shadow"
              />
            </a>
          </div>
        ))}
      </aside>
    </div>
  );
}
