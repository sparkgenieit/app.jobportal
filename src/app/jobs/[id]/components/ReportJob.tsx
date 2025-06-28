
'use client';
import { useState } from 'react';

interface Props {
  jobId: string;
  user?: { role: string };
}

export default function ReportJob({ jobId, user }: Props) {
  const [showModal, setShowModal] = useState(false);
  const [reportReason, setReportReason] = useState('');

  const handleReportClick = () => {
    if (!user || user.role !== 'User') {
      setShowModal(true);
      return;
    }
    // TODO: open actual report form modal
    alert('Open report form here');
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleReportClick}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
      >
        Report
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Please Login as user to report the job</h3>
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
