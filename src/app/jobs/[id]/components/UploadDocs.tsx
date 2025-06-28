
'use client';

import { useEffect, useState } from 'react';
import { FaRegCircleCheck } from 'react-icons/fa6';

const Tick = () => <FaRegCircleCheck className="text-green-500" />;

interface UploadDocsProps {
  jobId: string;
}

export default function UploadDocs({ jobId }: UploadDocsProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:4000/users/me`);
        if (!res.ok) throw new Error('User not found');
        const data = await res.json();
        setUser(data);
      } catch {
        setUser(null);
      }
    };
    fetchUser();
  }, [jobId]);

  if (!user) return null;

  return (
    <div className="upload-docs mt-6 p-4 border rounded">
      <h4 className="text-lg font-semibold mb-2">Upload Documents</h4>
      <div className="text-sm text-gray-600">Resume: {user.resume ? <Tick /> : 'Missing'}</div>
      <div className="text-sm text-gray-600">Cover Letter: {user.coverLetter ? <Tick /> : 'Missing'}</div>
    </div>
  );
}
