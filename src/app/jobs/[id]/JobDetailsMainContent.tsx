
'use client';

import './components/view-job.css';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import ReportJob from './components/ReportJob';
import UploadDocs from './components/UploadDocs';
import JobContent from './components/JobContent';

interface Job {
  _id: string;
  title: string;
  description: string;
  location: string;
  company: string;
}

export default function JobDetailsMainContent() {
  const { id } = useParams();
  const [jobview, setJobview] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [isJobApplied, setIsJobApplied] = useState(false);
  const [isJobSaved, setIsJobSaved] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchJob = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/jobs/${id}`);
        if (!res.ok) throw new Error('Failed to fetch job');
        const data = await res.json();
        setJobview(data);
      } catch (err) {
        console.error('Error fetching job:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  if (loading) return <div className="p-10 text-gray-500">Loading...</div>;
  if (!jobview) return <div className="p-10 text-red-500">Job not found</div>;

  return (
    <div className="view-job-container">
      <JobContent
        job={jobview}
        isJobApplied={isJobApplied}
        isJobSaved={isJobSaved}
        setIsJobSaved={setIsJobSaved}
        setIsJobApplied={setIsJobApplied}
      />
      <UploadDocs jobId={jobview._id} />
      <ReportJob jobId={jobview._id} />
    </div>
  );
}
