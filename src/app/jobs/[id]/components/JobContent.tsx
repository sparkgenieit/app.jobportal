'use client';

import React from 'react';
import { FaRegBookmark, FaShareAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';

const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL!;

interface Job {
  title: string;
  company?: string;
  banner?: string;
  companyLogo?: string;
  youtubeUrl?: string;
  category?: string;
  location?: string;
  salary?: string;
  type?: string;
  duration?: string;
  hoursPerWeek?: string;
  benefits?: string[];
  vacancies?: number;
  postedDate?: string;
}

const JobContent = ({ job }: { job: Job }) => {
  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      Swal.fire('Link copied!', '', 'success');
    });
  };
  const handleApplyClick = () => {
    Swal.fire({
      icon: 'info',
      text: 'Please login as user to apply to job',
      confirmButtonColor: '#3085d6',
    });
  };
  const handleSave = () => {
    Swal.fire('Saved!', 'This job was bookmarked (placeholder)', 'info');
  };

  return (
    <div className="job-card">
      <div className="text-sm space-y-1">
        <p><strong>Location:</strong> {job.location}</p>
        <p><strong>Salary:</strong> {job.salary || 'Not Specified'}</p>
        <p><strong>Job Type:</strong> {job.type || 'N/A'}</p>
        <p><strong>Duration:</strong> {job.duration || 'N/A'}</p>
        <p><strong>Hours/Week:</strong> {job.hoursPerWeek || 'N/A'}</p>
        <p><strong>Vacancies:</strong> {job.vacancies || 'N/A'}</p>
        <p><strong>Benefits:</strong> {job.benefits?.join(', ') || 'None'}</p>
      </div>

      <div className="flex items-center gap-4 mt-4">
        <button onClick={handleApplyClick} className="apply-button bg-purple-600 text-white px-4 py-2 rounded">
          Apply
        </button>
        <button onClick={handleShare} title="Share" className="text-gray-600 hover:text-black">
          <FaShareAlt size={20} />
        </button>
        <button onClick={handleSave} title="Save" className="text-gray-600 hover:text-black">
          <FaRegBookmark size={20} />
        </button>
      </div>
    </div>
  );
};

export default JobContent;
