import './Sidebar.css';

import Link from 'next/link';
import { CgProfile } from "react-icons/cg";
import { GoBookmarkFill } from "react-icons/go";
import { LuServer } from "react-icons/lu";

function Sidebar() {
  return (
    <>
      <nav style={{ marginTop: "70px" }} className="sidebar sidebar-offcanvas" id="sidebar">
        <ul className="nav">

          <li className="nav-item">
            <Link className="nav-link" href="/viewprofile">
              <div className='d-flex justify-content-between w-100'>
                <span>My Profile</span>
                <span>
                  <CgProfile size={"20"} />
                </span>
              </div>
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" href="/applied-jobs">
              <div className='d-flex justify-content-between w-100'>
                <span>Applied Jobs</span>
                <span>
                  <LuServer size={"20"} />
                </span>
              </div>
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" href="/saved-jobs">
              <div className='d-flex justify-content-between w-100'>
                <span>Saved Jobs</span>
                <span>
                  <GoBookmarkFill size={"20"} />
                </span>
              </div>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Sidebar;
