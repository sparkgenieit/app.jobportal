"use client";

import React, { useEffect } from "react";
import { Accordion, Offcanvas } from "react-bootstrap";
import Link from "next/link";
import CustomToggle from "./CustomToggle";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import NavbarInfo from "./navbarItems";
import { NavItem } from "./Header";

const MobileNavDropdownItem = ({ eventKey, title, children }) => (
  <Accordion.Item className="border-0" eventKey={eventKey}>
    <CustomToggle eventKey={eventKey}>{title}</CustomToggle>
    <Accordion.Body>{children}</Accordion.Body>
  </Accordion.Item>
);

const Title = ({ title }) => (
  <span className="flex items-center justify-between text-black">
    {title} <MdOutlineKeyboardArrowDown />
  </span>
);

export default function HeaderSidebar({
  showSideBar,
  setShowSideBar,
  handleNavigation,
  handleShow,
}) {
  useEffect(() => {
    if (showSideBar) {
      document.body.classList.add("offcanvas-open");
    } else {
      document.body.classList.remove("offcanvas-open");
    }
    return () => document.body.classList.remove("offcanvas-open");
  }, [showSideBar]);

  return (
    <Offcanvas show={showSideBar} onHide={() => setShowSideBar(false)} className="responsive-font">
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Link href="/">
            <img src="/assets/images/logo-jp.png" className="h-20" alt="logo" />
          </Link>
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body>
        <div className="flex flex-col gap-4 font-xl">
          <div className="flex flex-col gap-3">
           <span role="button" onClick={() => {
  handleNavigation("/");
  setShowSideBar(false);
}}>
  Home
</span>
          </div>

          <Accordion flush>
            <div className="flex flex-col gap-3">
              {Object.entries(NavbarInfo).map(([key, items], idx) => (
                <MobileNavDropdownItem
                  title={<Title title={key.charAt(0).toUpperCase() + key.slice(1)} />}
                  eventKey={String(idx)}
                  key={key}
                >
                  <div className="flex flex-col gap-3 text-sm">
                    {items.map((item, index) => (
  <NavItem key={index} title={item.title} path={item.path} onClick={() => setShowSideBar(false)} />
))}
                  </div>
                </MobileNavDropdownItem>
              ))}
            </div>
          </Accordion>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
}
