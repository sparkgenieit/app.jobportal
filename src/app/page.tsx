'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { IoSearch } from "react-icons/io5";

import NZMap from '../components/home/NZMap';
import GalleryGrid from '../components/home/GalleryGrid';

import LocationPopup from '../components/home/LocationPopup';

import ComboBox from '../components/home/ComboBox';

function Home() {
  const [searchBox, setSearchBox] = useState({
    jobTitle: '',
    location: ''
  });
  const [searchButton, setSearchButton] = useState('');
  const [locationSuggestions, setLocationSuggestions] = useState(null);
  const [jobSuggestions, setJobSuggestions] = useState(null);

  const router = useRouter();

  const handleInput = async (name, event) => {
    setSearchBox({ ...searchBox, [name]: event.target.value });

    try {
      const data = []; // mocked
      if (name === 'location') {
        setLocationSuggestions(data);
      } else if (name === 'jobTitle') {
        setJobSuggestions(data);
      }
    } catch {
      clearSuggestions();
    }
  };

  useEffect(() => {
    document.title = 'Working Holiday Jobs New Zealand';
  }, []);

  const clearSuggestions = () => {
    setJobSuggestions(null);
    setLocationSuggestions(null);
  };

  const handleSearch = () => {
    if (searchBox.location.trim() === '' && searchBox.jobTitle.trim() === '') {
      setSearchButton('border border-2');
    } else {
      router.push(`/jobs?location=${searchBox.location}&keyword=${searchBox.jobTitle}`);
    }
  };

  return (
    <main className='m-0 p-0 text-sm md:text-base mb-4'>
    

     <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

  {/* Left Empty Column */}
  <div className="hidden lg:block col-span-3"></div>

  {/* Main Content */}
  <div className="col-span-6 flex flex-col gap-6">
  <GalleryGrid />  {/* ✅ Add this above */}
    {/* NZ Map */}
    <div className="w-full flex justify-center">
      <NZMap />
       <LocationPopup />
    </div>

    {/* YouTube Videos (stacked vertically) */}
    <section className="flex flex-col gap-6">
      <div className="flex flex-col">
        <iframe
          className="rounded w-full aspect-video"
          src="https://www.youtube.com/embed/7r-If5smQ_s?si=zd0NUcT7rsEV7a4k"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="font-bold mt-2 text-center">
          Experience New Zealand with a Working Holiday Visa
        </div>
      </div>

      <div className="flex flex-col">
        <iframe
          className="rounded w-full aspect-video"
          src="https://www.youtube.com/embed/P98SjgerM8g?si=x36wJ4kJRg86288m"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
        <div className="font-bold mt-2 text-center">
          Life in New Zealand on a Working Holiday Visa
        </div>
      </div>
    </section>
  </div>

  {/* Right Empty Column */}
  <div className="hidden lg:block col-span-3"></div>
</div>



    </main>
  );
}

export default Home;
