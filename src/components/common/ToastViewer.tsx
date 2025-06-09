'use client';

import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const Viewer = dynamic(() => import('@toast-ui/react-editor').then(mod => mod.Viewer as any), {
  ssr: false,
});

interface ToastViewerProps {
  content?: string;
  loading?: boolean;
}

export default function ToastViewer({ content = '', loading = false }: ToastViewerProps) {
  const viewerRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (viewerRef.current && isMounted && content?.trim()) {
      viewerRef.current.getInstance()?.setMarkdown(content);
    }
  }, [content, isMounted]);

  if (loading) return <div>Loading content...</div>;
  if (!isMounted) return null;

  return (
    <div className="border p-3 rounded bg-white shadow-sm">
       {/* @ts-ignore */}
      <Viewer ref={viewerRef} initialValue={content} />
    </div>
  );
}
