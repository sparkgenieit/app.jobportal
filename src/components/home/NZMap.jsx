'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NZMap() {
  const [mapWidth, setMapWidth] = useState(300);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const w = window.innerWidth;
      const calculated = w > 768 ? Math.round(0.45 * w) : Math.round(0.9 * w);
      setMapWidth(Math.min(648, calculated));
    }

    // ✅ Attach click event manually to area elements
    const handleClick = (e) => {
      e.preventDefault();
      const region = e.target.getAttribute('data-region');
      if (region) {
        alert(`${region} clicked`);
        // router.push(`/jobs?region=${region}`); // or dispatch(setLocation(...))
      }
    };

    const areaElements = document.querySelectorAll('area[data-region]');
    areaElements.forEach((area) => {
      area.addEventListener('click', handleClick);
    });

    return () => {
      areaElements.forEach((area) => {
        area.removeEventListener('click', handleClick);
      });
    };
  }, []);

  return (
    <div className="flex justify-center">
      <img
        src="/Nz-map/NZRegionsMapFinalVersion_files/image051.gif"
        alt="New Zealand Map"
        useMap="#nzmap"
        width={mapWidth}
        height="auto"
      />

      <map name="nzmap">
        <area
          shape="rect"
          coords="260,335,360,370"
          href="#"
          alt="Nelson"
          data-region="Nelson"
        />
        <area
          shape="rect"
          coords="269,235,386,274"
          href="#"
          alt="Taranaki"
          data-region="Taranaki"
        />
        {/* ✅ Add the rest similarly */}
      </map>
    </div>
  );
}
