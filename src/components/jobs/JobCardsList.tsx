//import Ads from './Ads';
import Card from './Card';

interface JobCardListProps {
  jobs: any[];
  type?: string;
}

export default function JobCardsList({ jobs, type }: JobCardListProps) {
  const shouldAdsRender = (index: number) => {
    return (index + 1) % 4 === 0;
  };

  if (!jobs || jobs.length === 0) {
    return (
      <h3 className='h-screen flex justify-center items-center text-gray-600 text-lg font-medium'>
        No Jobs Found
      </h3>
    );
  }

  return (
    <div className="space-y-6">
      {jobs.map((job, index) => (
        <div
          key={index}
          className="w-full bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition duration-300 p-6 cursor-pointer"
        >
          {type && job.jobId && job.jobId.status && (
            <div className="text-sm text-gray-500 mb-2">
              <i className="font-semibold">
                {type} on {type === "Saved" ? job.saved_date : job.applied_date}
              </i>
              {job.jobId.status !== "approved" && (
                <i className="text-red-300 text-xs ml-2">(This job was removed)</i>
              )}
            </div>
          )}

          <div className="mb-3">
            {type && job.jobId && job.jobId.status ? (
              <Card job={job.jobId} />
            ) : !type ? (
              <Card job={job} />
            ) : null}
          </div>

        {/*  {shouldAdsRender(index) && (
            <div className="mt-4">
              <Ads type="short" />
            </div>
          )}*/}
        </div>
      ))}
    </div>
  );
}
