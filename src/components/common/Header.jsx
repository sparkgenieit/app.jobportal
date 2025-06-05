"use client";
import './Header.css';
import { Modal, Tabs, Tab } from "react-bootstrap";
import { CgProfile } from "react-icons/cg";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";

/*
// Uncomment these imports as needed
import UserLogin from '../auth/UserLogin';
import UserRegistration from '../auth/UserRegistration';
import CompanyRegistration from '../auth/CompanyRegistration';
import RecruiterLogin from '../auth/RecruiterLogin';

import handleLogout from '../../helpers/functions/handlelogout';
import useCurrentUser from '../../helpers/Hooks/useCurrentUser';
import { Roles } from '../../services/common/Roles.service';
import { recruiterUrl } from '../../services/common/urls/recruiterUrls.service';
import HomePageBanner from '../../pages/common/Ads/HomePageBanner';
import HeaderSidebar from './HeaderSidebar';
*/

import NavbarInfo from './navbarItems';

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

const NavDropdownItem = ({ title, rightAlign, children }) => (
  <div className="group lg:block hidden text-black relative">
    <span className="group-hover:text-blue-700 cursor-pointer">{title}</span>
    <div className={`scale-0 rounded-md z-50 absolute bg-white group-hover:scale-100 transition-all duration-300 ${rightAlign ? ' -right-1' : ''}`}>
      {children}
    </div>
  </div>
);

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
    { key: "b2B", label: "B2B", rightAlign: true },
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleNavigation = (path) => {
    setShowSideBar(false);
    router.push(path);
  };

  return (
    <>
      {/* {isAboveMenuBanner && isBannerVisible && <HomePageBanner />} */}

      <header className={`bg-white flex items-center py-4 justify-between px-2 gap-2 ${isFixed ? 'fixed-header' : ''}`}>
        <Link href="/">
          <img className="h-14" src="/assets/images/logo-jp.png" alt="logo" />
        </Link>

        {categories.map(({ key, label, rightAlign }) => {
          const items = Array.isArray(NavbarInfo[key])
            ? NavbarInfo[key].filter(item => typeof item?.path === 'string' && item.path.trim() !== '')
            : [];

          return (
            <NavDropdownItem key={key} title={label} rightAlign={rightAlign}>
              <div className="flex flex-col gap-3 text-sm w-60 p-3">
                {items.map((item, idx) => (
                  <NavItem key={idx} title={item.title} path={item.path} />
                ))}
              </div>
            </NavDropdownItem>
          );
        })}

        <NavItem title="Jobs" path="/jobs" className="lg:block hidden" />

        {!isSignedIn ? (
          <button onClick={handleShow} className="bg-blue-500 active:bg-blue-600 text-white py-2 px-4 rounded">
            Login
          </button>
        ) : (
          <NavDropdownItem title={<CgProfile size={40} />} rightAlign>
            <div className="w-36 flex flex-col p-2 mt-3 gap-2">
              {/* You can add role-specific links here */}
              <button onClick={() => {}} className="bg-blue-500 active:bg-blue-600 text-white py-2 px-4 rounded">Logout</button>
            </div>
          </NavDropdownItem>
        )}

        <button onClick={() => setShowSideBar(v => !v)} className="lg:hidden block">
          <RxHamburgerMenu />
        </button>

        {/* <HeaderSidebar ... /> */}
      </header>

      {/* 
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="responsive-font">
          <div className="flex lg:hidden justify-end mb-2">
            <RxCross1 onClick={handleClose} />
          </div>
          <Tabs justify className="mb-3">
            <Tab eventKey="login" title="Login">
              <Tabs justify className="mb-3">
                <Tab eventKey="loginUser" title="User Login">
                  <UserLogin />
                </Tab>
                <Tab eventKey="loginRecruiter" title="Company Login">
                  <RecruiterLogin />
                </Tab>
              </Tabs>
            </Tab>
            <Tab eventKey="register" title="Register">
              <Tabs justify className="mb-3">
                <Tab eventKey="user" title="Register as User">
                  <UserRegistration />
                </Tab>
                <Tab eventKey="company" title="Register as Employer">
                  <CompanyRegistration />
                </Tab>
              </Tabs>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
      */}
    </>
  );
}
