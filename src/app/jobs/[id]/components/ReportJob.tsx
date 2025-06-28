
'use client';

import { useState } from 'react';

interface Props {
  jobId: string;
}

export default function ReportJob({ jobId }: Props) {
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Reported job ${jobId} for reason: ${reason}`);
  };

  return (
    <div className="report-job mt-6 p-4 border border-red-400 rounded">
      <h5 className="text-lg font-semibold mb-2">Report Job</h5>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="flex gap-2 items-center">
          <input
            type="radio"
            value="Discriminatory Content"
            checked={reason === 'Discriminatory Content'}
            onChange={(e) => setReason(e.target.value)}
          />
          Contains Discriminatory Content
        </label>
        <label className="flex gap-2 items-center">
          <input
            type="radio"
            value="Scam or Fraud"
            checked={reason === 'Scam or Fraud'}
            onChange={(e) => setReason(e.target.value)}
          />
          Looks Like a Scam
        </label>
        <button className="btn btn-sm bg-red-500 text-white mt-2" type="submit">
          Report
        </button>
      </form>
    </div>
  );
}
