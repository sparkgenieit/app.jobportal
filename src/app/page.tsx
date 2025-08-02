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
    <main className="m-0 p-0 text-sm md:text-base mb-4">

      {/* ✅ Full-Width GalleryGrid (OUTSIDE grid) */}
      <section className="w-full">
        <GalleryGrid />
      </section>

      {/* ✅ Map + YouTube Grid (Centered in 12 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* Left Empty Column */}
        <div className="hidden lg:block col-span-3"></div>

        {/* Main Content */}
        <div className="col-span-6 flex flex-col gap-6">

          {/* NZ Map */}
          <div className="w-full flex justify-center overflow-x-auto">
            <NZMap />
            <LocationPopup />
          </div>

       
        </div>

        {/* Right Empty Column */}
        <div className="hidden lg:block col-span-3"></div>
      </div>
    </main>
  );
}

export default Home;
