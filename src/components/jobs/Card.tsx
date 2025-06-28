import './Card.css';

import { useState } from 'react';

import { FaCheckSquare, FaDollarSign, FaRegClock, FaShare } from "react-icons/fa";
import { BsBriefcase, BsCalendar3 } from 'react-icons/bs';
import { CiBookmark, CiViewList } from "react-icons/ci";
import { MdOutlineLocationOn, MdOutlinePeopleOutline } from 'react-icons/md';
import { IoBookmark, IoHomeOutline } from 'react-icons/io5';
import { GiHotMeal } from 'react-icons/gi';
import { PiCarProfileThin } from 'react-icons/pi';

import { timeAgo } from "../../helpers/functions/textFunctions";
import { BASE_API_URL, BASE_APP_URL } from "../../helpers/constants"
import Tooltip from './Tooltip';
import http from '../../helpers/http';
import useShowMessage from '../../helpers/Hooks/useShowMessage';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { markdownToPlainText, salaryPerAnnum } from '../../helpers/functions/textFunctions';
import { useDispatch } from 'react-redux';
import { setInfo, setLocation } from '../../helpers/slices/generalSlice';

export default function Card2({ job }) {
    const savedJobIds = JSON.parse(sessionStorage.getItem('savedJobIds'))
    const [isJobSaved, setIsJobSaved] = useState(savedJobIds?.includes(job?._id) || false)
   const { _id: user_id, role } = useCurrentUser() || {}
    const message = useShowMessage()
    const dispath = useDispatch()

    function handleSave(e: React.MouseEvent) {
  if (user_id && role === "user") {
    const data = {
      saved_date: new Date().toLocaleDateString('en-GB'),
      userId: user_id,
      jobId: job._id,
      saved: true,
    };

    http.post("/jobs/save", data)
      .then(() => {
        message({
          status: "success",
          message: "Job Saved Successfully",
        });
        setIsJobSaved(true);
        savedJobIds.push(job._id);
        sessionStorage.setItem("savedJobIds", JSON.stringify(savedJobIds));
      })
      .catch((e) => {
        message({
          status: "error",
          message: "Failed to save job", // ✅ REQUIRED
          error: e,
        });
      });
  } else {
    message({
      status: "error",
      message: "Please login as user to save job", // ✅ REQUIRED
      error: { message: "Unauthenticated access" },
    });
  }
  e.stopPropagation();
}


    const openInNewTab = () => {
        const url = `${BASE_APP_URL}/jobs/${job._id}`
        window.open(url, '_blank', 'noopener,noreferrer')
    }

    const handleShare = (event) => {
        navigator.clipboard.writeText(`${BASE_APP_URL}/jobs/${job._id}`)
        message({
            status: "success",
            message: "Link Copied"
        })
        event.stopPropagation();
    }

    const handleLocation = (e) => {
        dispath(setLocation({
            show: true,
            city: job.location
        }))
        e.stopPropagation();
    }

    const handleInfo = (e) => {
        dispath(setInfo({
            show: true,
            info: job.info,
            job: job
        }));
        e.stopPropagation();
    }

    const getJobsbyCompany = (e) => {
        window.location.href = `/jobs?company=${job.company}`;
        e.stopPropagation();
    }

    const date = new Date(job?.creationdate).toLocaleDateString('en-GB')

    return (
        <div onClick={openInNewTab} className='job-card px-3 py-2 rounded grid lg:grid-cols-4 bg-white'>
            {/* Removed border and hover effect */}
            <div className='lg:col-span-3 flex flex-col gap-1'>
                <div className='flex lg:hidden items-center text-sm gap-3'>
                    {date} ({timeAgo(date)})
                    <div className='flex gap-3 lg:hidden justify-end items-center py-1'>
                        <Tooltip tooltipText={"Share"} size={10}><FaShare fontSize={16} onClick={handleShare} /></Tooltip>
                        <Tooltip tooltipText={isJobSaved ? "Saved" : "Save"} size={10}>
                            {isJobSaved ? <IoBookmark fontSize={16} /> : <CiBookmark fontSize={16} onClick={handleSave} />}
                        </Tooltip>
                    </div>
                </div>

                <div className='lg:hidden mb-2 w-[125px]'>
                {job.companyLogo && job.companyLogo.length > 0 && (
                    <img
                        className="rounded border company-logo"
                        src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`}
                        alt={job.company}
                    />
                    )}  </div>

                <h3 className='font-bold job-title'>{job.jobTitle}</h3>

                <div className='flex'>
                    <Tooltip tooltipText={"View All Jobs"} size={12}><CiViewList fontSize={22} onClick={getJobsbyCompany} /></Tooltip>
                    {job.info?.length > 0 ? (
                        <Tooltip tooltipText={"View Company Info"} size={12}>
                            <span className='underline text-blue-600' onClick={handleInfo}>{job.company}</span>
                        </Tooltip>
                    ) : job.company}
                </div>

                <div className='flex'>
                    <MdOutlineLocationOn size="22px" />
                    <Tooltip tooltipText={"View Activities"} size={12}>
                        <span onClick={handleLocation} className='underline text-blue-600'>{job.location}</span>
                    </Tooltip>
                </div>

                <div className='grow mt-1'>
                    <p className='text-slate-400 text-sm description'>{markdownToPlainText(job.description)}</p>
                </div>

                <div className='hidden lg:flex gap-2 text-sm items-center'>
                    {date} ({timeAgo(date)})
                    <div className='flex gap-2'>
                        <Tooltip tooltipText={"Share"} size={10}><FaShare fontSize={20} onClick={handleShare} /></Tooltip>
                        <Tooltip tooltipText={isJobSaved ? "Saved" : "Save"} size={10}>
                            {isJobSaved ? <IoBookmark fontSize={20} /> : <CiBookmark fontSize={22} onClick={handleSave} />}
                        </Tooltip>
                    </div>
                </div>
            </div>

            <div className='flex flex-col'>
                <div className='hidden lg:block'>
                    {job.companyLogo && job.companyLogo.length > 0 && (
                    <img
                        className="rounded border company-logo"
                        src={`${BASE_API_URL}/uploads/logos/${job.companyLogo}`}
                        alt={job.company}
                    />
                    )}     </div>

                <div className='mobile-card flex'>
                    <div className='job-details'>
                        {job.rateperhour &&
                            <Tooltip tooltipText={"Approximate salary"}>
                                <span className='flex gap-1 items-center'>
                                    <FaDollarSign fontSize={13} />
                                    {job.salary_type === "negotiable" ? "Negotiable" :
                                        <>
                                            {job.salary_type === "per annum" ? salaryPerAnnum(job.rateperhour) : job.rateperhour} {job.salary_type}
                                        </>
                                    }
                                </span>
                            </Tooltip>}
                        <Tooltip tooltipText={"Job Type"}>
                            <span className='flex gap-1 items-center'><BsBriefcase fontSize={13} />{job.jobtype}</span>
                        </Tooltip>
                        <Tooltip tooltipText={"Duration"}>
                            <span className='flex gap-1 items-center'><BsCalendar3 fontSize={13} />{job.duration}</span>
                        </Tooltip>
                        {job.weeklyperhour > 0 &&
                            <Tooltip tooltipText={"Weekly Hours"}>
                                <span className='flex gap-1 items-center'><FaRegClock fontSize={13} />{job.weeklyperhour} hours/week</span>
                            </Tooltip>}
                        {job.numberofvacancies > 1 &&
                            <Tooltip tooltipText={"Vacancies"}>
                                <span className='flex gap-1 items-center'><MdOutlinePeopleOutline fontSize={16} />{job.numberofvacancies} Vacancies</span>
                            </Tooltip>}
                        {job.training?.includes("Yes") &&
                            <span className='flex gap-1'><FaCheckSquare fontSize={13} />Training provided</span>}
                        {job.benifits &&
                            <ul className='flex gap-2 m-0 p-0 text-[12px] items-center list-none'>
                                {job.benifits.includes("Accommodation") &&
                                    <li><Tooltip tooltipText={"Accommodation"}><IoHomeOutline fontSize={13} /></Tooltip></li>}
                                {job.benifits.includes("Food") &&
                                    <li><Tooltip tooltipText={"Food"}><GiHotMeal fontSize={13} /></Tooltip></li>}
                                {job.benifits.includes("Transport") &&
                                    <li><Tooltip tooltipText={"Transport"}><PiCarProfileThin fontSize={17} /></Tooltip></li>}
                                <li>Benefits</li>
                            </ul>}
                    </div>
                </div>
            </div>
        </div>
    );
}