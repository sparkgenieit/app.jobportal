"use client";
import './Header.css';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RxHamburgerMenu } from "react-icons/rx";
import NavbarInfo from './navbarItems';
import TopAdBanner from '@/components/ads/TopAdBanner';
import LandingPagePopup from '@/components/ads/LandingPagePopup';

// ✅ Safe NavItem with href guard
export const NavItem = ({ title, path, className = "" }) => {
  const safeHref = typeof path === 'string' && path.trim() !== '' ? path : "/";
  return (
    <Link
      href={safeHref}
      className={`no-underline hover:text-blue-700 hover:underline transition-none text-gray-900 ${className}`}
    >
      {title}
    </Link>
  );
};

// ✅ Final dropdown with responsive layout
const NavDropdownItem = ({ title, rightAlign, children }) => {
  const count = React.Children.count(children);
  const isMegaMenu = count > 15;

  return (
    <div className="group relative lg:block hidden text-black">
      <span className="group-hover:text-blue-700 cursor-pointer">{title}</span>

      <div
        className={`absolute top-full z-50 bg-white shadow-xl rounded-lg transform transition-all duration-200 ease-in-out
          ${rightAlign ? 'right-0' : 'left-0'}
          scale-0 group-hover:scale-100 origin-top
        `}
        style={{
          minWidth: isMegaMenu ? '900px' : '240px',
          maxWidth: isMegaMenu ? '1000px' : '300px',
        }}
      >
        <div
          className={`${
            isMegaMenu
              ? 'grid grid-cols-5 gap-x-6 gap-y-3 p-6 text-sm'
              : 'flex flex-col gap-2 p-4 text-sm'
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default function Header() {
  const router = useRouter();

  const [isSignedIn, setIsSignedIn] = useState('');
  const [showSideBar, setShowSideBar] = useState(false);
  const [show, setShow] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(true);
  const [isAboveMenuBanner, setIsAboveMenuBanner] = useState(true);

  const categories = [
    { key: "places", label: "Places" },
    { key: "regions", label: "Regions" },
    { key: "activities", label: "Activities" },
    { key: "travels", label: "Travel" },
    { key: "stay", label: "Stay" },
    { key: "events", label: "Events" },
    { key: "shopping", label: "Shopping" },
    { key: "entertainment", label: "Entertainment" },
    { key: "services", label: "Services" },
    { key: "dining", label: "Dining" },
    { key: "info", label: "Info", rightAlign: true },
    { key: "", label: "", rightAlign: true },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSignedIn(localStorage.getItem('isSignedIn') || '');
      setIsAboveMenuBanner(!/^\/(company|admin|superadmin)/.test(window.location.pathname));

      const handleScroll = () => {
        setIsFixed(window.scrollY > 50);
        setIsBannerVisible(window.scrollY < 280);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <>
<div style={{ height: isAboveMenuBanner ? '80px' : '0px', marginBottom: '200px' }}>
  {isAboveMenuBanner && isBannerVisible && <TopAdBanner />}
</div>
      <header
  className={`z-[1002] bg-white flex items-center py-4 justify-between px-2 gap-2 ${isFixed ? 'fixed-header' : ''}`}
>
  <Link href="/">
          <img className="h-14" src="/assets/images/logo-jp.png" alt="logo" />
        </Link>

        {categories.map(({ key, label, rightAlign }) => {
          const items = Array.isArray(NavbarInfo[key])
            ? NavbarInfo[key].filter(item => typeof item?.path === 'string' && item.path.trim() !== '')
            : [];

          return (
            <NavDropdownItem key={key} title={label} rightAlign={rightAlign}>
              {items.map((item, idx) => (
                <NavItem key={idx} title={item.title} path={item.path} />
              ))}
            </NavDropdownItem>
          );
        })}

        {/* 🔒 Mobile Hamburger */}
        <button onClick={() => setShowSideBar(v => !v)} className="lg:hidden block">
          <RxHamburgerMenu />
        </button>
      </header>
      <LandingPagePopup />

    </>
  );
}
