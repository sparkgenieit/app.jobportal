'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import JobsMainContent from './JobsMainContent';

export default function JobPage() {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setIsReady(true);
      //router.replace('/login'); 
    } else {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return null;

  return <JobsMainContent />;
}
