
'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import JobContent from './components/JobContent';
import ReportJob from './components/ReportJob';
import Swal from 'sweetalert2';
import { getYoutubeVideoId } from '../../../helpers/functions/textFunctions';

 import { FaDollarSign, FaRegClock, FaShare, FaYoutube } from "react-icons/fa6";
   

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL!;

export default function JobDetailsMainContent() {
  const { id } = useParams();
  const [job, setJob] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    fetch(`${BASE_API_URL}/jobs/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          console.error('Backend error:', text);
          throw new Error('Failed to load job');
        }
        return res.json();
      })
      .then((data) => setJob(data))
      .catch((err) => console.error('Fetch error:', err));
  }, [id]);



  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    Swal.fire({
      icon: 'success',
      text: 'Link copied to clipboard!',
      showConfirmButton: false,
      timer: 1500,
    });
  };
 const youtubeRef = useRef(null);

  if (!job) return <p className="p-4">Loading...</p>;
  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left */}
        <div className="lg:col-span-2 space-y-6">
          {job.banner && (
            <img
              src={`${BASE_API_URL}/uploads/banners/${job.banner}`}
              alt={job.company}
              className="rounded w-full h-[40vh] object-cover border"
            />
          )}

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              {job.companyLogo && (
                <img
                  src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`}
                  alt={job.company}
                  className="w-16 h-16 object-contain rounded-full border"
                />
              )}
              <h3 className="text-xl font-semibold">{job.company}</h3>
            </div>
         {job.youtubeUrl && (
                <div className="relative hidden lg:block">
                    <iframe
                    ref={youtubeRef}
                    className="rounded logo-youtube"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(job.youtubeUrl)}`}
                    allowFullScreen
                    />
                    <span
                    role="button"
                    onClick={() => youtubeRef.current?.requestFullscreen()}
                    className="youtube-play-button"
                    >
                    <FaYoutube fontSize={70} fill="#FF3D00" />
                    </span>
                </div>
                )}
          </div>

          <div className="border rounded p-6 bg-white shadow-sm">
            <JobContent job={job} />
           
          </div>

          <div className="border rounded p-6 bg-white shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Job Description</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {job.description || 'No description provided.'}
            </p>
            <div className="mt-6 text-right">
              <ReportJob jobId={id as string} />
            </div>
          </div>
        </div>

        {/* Right Ads */}
        <div className="space-y-4">
          <div className="h-[300px] bg-gray-100 border rounded shadow-sm flex items-center justify-center text-gray-500">
            Ad or Promotion
          </div>
          <div className="h-[300px] bg-gray-100 border rounded shadow-sm flex items-center justify-center text-gray-500">
            Sponsored Content
          </div>
        </div>
      </div>
    </div>
  );
}
