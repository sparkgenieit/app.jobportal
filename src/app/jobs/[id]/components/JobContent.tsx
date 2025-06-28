
'use client';

import { MdOutlineLocationOn, MdOutlinePeopleOutline } from 'react-icons/md';
import { FaDollarSign, FaRegClock } from 'react-icons/fa6';
import { BsBriefcase, BsCalendar3 } from 'react-icons/bs';
import { IoHomeOutline } from 'react-icons/io5';

interface Job {
  _id: string;
  title: string;
  category?: string;
  location: string;
  postedOn?: string;
  salary?: string;
  type?: string;
  duration?: string;
  hours?: string;
  vacancies?: number;
  benefits?: string[];
  company?: string;
}

interface Props {
  job: Job;
  isJobSaved: boolean;
  isJobApplied: boolean;
  setIsJobSaved: (val: boolean) => void;
  setIsJobApplied: (val: boolean) => void;
}

export default function JobContent({
  job,
  isJobSaved,
  isJobApplied,
  setIsJobSaved,
  setIsJobApplied
}: Props) {
  return (
    <div className="job-box border border-green-400 p-4 rounded mb-4">
      <h2 className="text-xl font-semibold">{job.title}</h2>
      <p>{job.category}</p>
      <div className="text-gray-600 flex items-center gap-2">
        <MdOutlineLocationOn />
        {job.location}
      </div>
      <div className="text-sm text-gray-400 mt-1">
        {job.postedOn && `Posted on: ${job.postedOn}`}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div><FaDollarSign /> {job.salary || 'Not Specified'}</div>
        <div><BsBriefcase /> {job.type || 'N/A'}</div>
        <div><BsCalendar3 /> {job.duration || 'N/A'}</div>
        <div><FaRegClock /> {job.hours || 'N/A'} hours/week</div>
        <div><MdOutlinePeopleOutline /> {job.vacancies} Vacancies</div>
        <div><IoHomeOutline /> {job.benefits?.join(', ')}</div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="btn btn-primary">Apply</button>
        <button className="btn btn-outline">Save</button>
      </div>
    </div>
  );
}
