'use client';

import { useEffect, useRef, useState } from 'react';
import { BsFilter } from 'react-icons/bs';
import Filter from '../../components/jobs/Filter';
import Pagination from '../../components/jobs/Pagination';
import Loader from '../../components/jobs/Loader';
//import Ads from '../../components/jobs/Ads';
import JobCardList from '../../components/jobs/JobCardsList';

const itemsPerPage = 12;

const initialValues = {
  company: "",
  jobTitle: "",
  location: "",
  jobtype: "",
  jobCategory: "",
  subCategory: "",
  rateperhour: null,
  duration: null,
  weeklyperhour: null,
  date: null,
  sort: "creationdate",
  salaryType: "per hour"
};

export default function JobsMainContent() {
  const [jobs, setJobs] = useState<any[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [pgNumber, setPgNumber] = useState(1);
  const [refresh, setRefresh] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filterFields, setFilterFields] = useState(initialValues);
  const [showFilter, setShowFilter] = useState(false);
  const sortRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    fetchJobs(pgNumber);
  }, [refresh]);

  const fetchJobs = async (page: number) => {
    setLoading(true);
    const skip = (page - 1) * itemsPerPage;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/jobs/filtered-jobs?limit=${itemsPerPage}&skip=${skip}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(filterFields),
        }
      );
      const data = await res.json();
      setJobs(data.jobs || []);
      setTotalItems(data.total || 0);
    } catch (err) {
      console.error('Error fetching jobs:', err);
      setJobs([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterFields(prev => ({ ...prev, sort: e.target.value }));
    setRefresh(prev => !prev);
  };

  return (
    <main>
      <div className='grid lg:grid-cols-4 m-0'>
        <div ref={sortRef} className='lg:col-span-3 w-full mb-2 flex items-center'>
          <BsFilter onClick={() => setShowFilter(prev => !prev)} className='lg:hidden' fontSize={20} />
          <div className='grow flex justify-end items-center text-sm lg:text-base'>
            <label className='text-sm text-nowrap pb-[1px] px-2'>Sort by:</label>
            <select className='rounded border-0 px-2' value={filterFields.sort} onChange={handleSort}>
              <option value="creationdate">Date posted</option>
              <option value="rateperhour">Rate per hour</option>
              <option value="weeklyperhour">Weekly hours</option>
            </select>
          </div>
        </div>
      </div>

      <div className='grid lg:grid-cols-4'>
        <section className={`${showFilter ? '' : 'filter-hide'} lg:flex p-0 justify-end`}>
          <Filter filterFields={filterFields} setFilterFields={setFilterFields} setRefresh={setRefresh} />
        </section>

        <section className='lg:col-span-3 grid lg:grid-cols-3 lg:gap-2 scrollbar hide-scrollbar'>
          <div className='lg:col-span-2 p-0'>
            <Pagination
              currentPage={pgNumber}
              setCurrentPage={setPgNumber}
              itemsPerPage={itemsPerPage}
              totalCount={totalItems}
              fetchItems={fetchJobs}
              pageNumberToShow={2}
            >
              <div className='mb-3'>
                {loading && <Loader />}
                {!loading && <div className='jobs-list'><JobCardList jobs={jobs} /></div>}
              </div>
            </Pagination>
          </div>
       {/*   <div><Ads /></div> */}
        </section>
      </div>
    </main>
  );
}
