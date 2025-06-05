import React from 'react'
import { Accordion, Offcanvas } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useCurrentUser from '../../helpers/Hooks/useCurrentUser'
import CustomToggle from '../../components/CustomToggle'
import { Roles } from '../../services/common/Roles.service'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineKeyboardArrowDown } from 'react-icons/md'
import NavbarInfo from './navbarItems'
import { NavItem } from './Header'
import handleLogout from '../../helpers/functions/handlelogout'

const MobileNavDropdownItem = ({ eventKey, title, children }) => {
    return (
        <Accordion.Item className='border-0' eventKey={eventKey}>
            <CustomToggle eventKey={eventKey} >{title}</CustomToggle>
            <Accordion.Body>
                {children}
            </Accordion.Body>
        </Accordion.Item>
    )
}

const Title = ({ title }) => <span className="flex items-center justify-between  text-black">{title} <MdOutlineKeyboardArrowDown /></span>


export default function HeaderSidebar({ showSideBar, setShowSideBar, handleNavigation, handleShow }) {
    const isSignedIn = localStorage.getItem("isSignedIn")
    const { name, role, first_name, last_name } = useCurrentUser()
    const fullname = role === "recruiter" ? name : first_name + " " + last_name

    return (
        <Offcanvas show={showSideBar} onHide={() => { setShowSideBar(false) }} className="responsive-font">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    <Link to="/">
                        <img src="/assets/images/logo-jp.png" className='h-20'
                            alt="logo" />
                    </Link>
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <div className='flex flex-col gap-4  font-xl'>
                    <div className='flex flex-col gap-3'>
                        {isSignedIn &&
                            <Accordion flush>
                                <Accordion.Item eventKey="2">
                                    <CustomToggle eventKey={"2"}>
                                        <div className='d-flex align-items-center'>
                                            <span className='flex-grow-1'>{fullname}</span>
                                            <CgProfile size={"40px"} />
                                        </div>
                                    </CustomToggle>
                                    <Accordion.Body>
                                        <ul className="list-unstyled d-flex flex-column gap-3">
                                            {role === Roles.User &&
                                                <>
                                                    <li role='button' onClick={() => handleNavigation("/viewprofile")}>My Profile</li>
                                                    <li role='button' onClick={() => handleNavigation("/saved-jobs")}>Saved Jobs</li>
                                                    <li role='button' onClick={() => handleNavigation("/applied-jobs")}>Applied Jobs</li>
                                                </>
                                            }
                                            {(role === Roles.Company) &&
                                                <li>
                                                    <button type='button' onClick={() => { handleNavigation("/company") }} className="btn btn-responsive btn-secondary w-100" >
                                                        Dashboard
                                                    </button>
                                                </li>}
                                            {role === Roles.Admin &&
                                                <li>
                                                    <button type='button' onClick={() => { handleNavigation("/admin") }} className="btn btn-responsive btn-secondary w-100" >
                                                        Dashboard
                                                    </button>
                                                </li>
                                            }
                                            {role === Roles.Recruiter &&
                                                <li>
                                                    <button type='button' onClick={() => { handleNavigation(recruiterUrl.home) }} className="btn btn-responsive btn-secondary w-100" >
                                                        Dashboard
                                                    </button>
                                                </li>
                                            }

                                            <li>
                                                <button type='button' onClick={() => handleLogout()} className="btn btn-responsive btn-primary w-100" >
                                                    Logout
                                                </button>
                                            </li>

                                        </ul>
                                    </Accordion.Body>
                                </Accordion.Item>
                            </Accordion>
                        }
                        <span onClick={() => handleNavigation("/")} >Home</span>

                    </div>

                    <Accordion flush>
                        <div className='flex flex-col gap-3'>

                            <MobileNavDropdownItem title={<Title title={"Places"} />} eventKey={"0"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.places.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"Regions"} />} eventKey={"1"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.regions.map((region, index) => <NavItem key={index} title={region.title} path={region.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"Activities"} />} eventKey={"10"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.activities.map((activity, index) => <NavItem key={index} title={activity.title} path={activity.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"Travel"} />} eventKey={"2"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.travels.map((travel, index) => <NavItem key={index} title={travel.title} path={travel.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"Stay"} />} eventKey={"7"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.stay.map((place, index) => <NavItem key={index} title={place.title} path={place.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"Events"} />} eventKey={"3"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.events.map((event, index) => <NavItem key={index} title={event.title} path={event.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"Shopping"} />} eventKey={"4"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.shopping.map((shop, index) => <NavItem key={index} title={shop.title} path={shop.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"Entertainment"} />} eventKey={"5"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.entertainment.map((entertain, index) => <NavItem key={index} title={entertain.title} path={entertain.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"Services"} />} eventKey={"6"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.services.map((service, index) => <NavItem key={index} title={service.title} path={service.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"Info"} />} eventKey={"9"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.info.map((information, index) => <NavItem key={index} title={information.title} path={information.path} />)}
                                </div>
                            </MobileNavDropdownItem>

                            <MobileNavDropdownItem title={<Title title={"B2B"} />} eventKey={"11"}>
                                <div className='flex flex-col gap-3  text-sm'>
                                    {NavbarInfo.b2B.map(category => (
                                        <div key={category.heading} className='flex flex-col gap-2'>
                                            <strong className='text-sm font-semibold'>{category.heading}</strong>
                                            <div className='flex flex-col gap-2'>
                                                {category.links.map((link, linkIndex) => (
                                                    <NavItem key={linkIndex} title={link.title} path={link.path} />
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </MobileNavDropdownItem>

                            <NavItem title={"Jobs"} path="/jobs" />
                        </div>
                    </Accordion>

                    {!isSignedIn &&
                        <button
                            type='button'
                            onClick={() => {
                                handleShow();
                                setShowSideBar(false)
                            }}
                            className="btn btn-primary"
                        >
                            <span>
                                Login
                            </span>
                        </button>
                    }

                </div>
            </Offcanvas.Body>
        </Offcanvas >

    )
}
