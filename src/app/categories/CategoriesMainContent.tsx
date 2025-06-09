'use client';

import { useEffect, useState } from 'react';
import ToastViewer from '@/components/common/ToastViewer';

interface Props {
  category: string;
  topic: string;
  content: string;
}

export default function CategoriesMainContent({ category, topic, content }: Props) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="min-h-[70vh] py-6 px-3">
      {/* SSR fallback - Visible to bots but not to users */}
      {!isClient && (
        <div
          className="sr-only" // ✅ This class hides visually but keeps content accessible for bots
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}

      {/* Hydrated TUI Viewer */}
      {isClient && <ToastViewer content={content} />}
    </div>
  );
}
