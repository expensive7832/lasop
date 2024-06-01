import React from "react";
import { Button, Nav, NavItem, NavLink } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import Calendar from "./../../assets/calendar-2.svg";
import app from "./../../assets/profile-add.svg";
import note from "./../../assets/note.svg";
import home from "./../../assets/home1.png";
import Students from "./../../assets/profile-2user.svg";
import Teacher from "./../../assets/teacher.svg";
import Finance from "./../../assets/moneys.svg";
import result from "./../../assets/note.svg";
import syl from "./../../assets/bookmark.svg";
import logout from "./../../assets/logout.svg";

import { FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";


const navigation = [
  {
    title: "Overview",
    href: "/dashboard/home/",
    icon: home,
    admin: true,
  },
  {
    title: "Users",
    href: "/dashboard/user",
    icon: app,
    admin: true
  },
  {
    title: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
    admin: false
  },
  {
    title: "Blog",
    href: "/dashboard/blog",
    icon: Calendar,
    admin: true
  },
  
  {
    title: "Applicants",
    href: "/dashboard/applicants/",
    icon: app,
    admin: true
  },
  {
    title: "Receipt",
    href: "/dashboard/receipt/",
    icon: app,
    admin: true
  },
  {
    title: "Students",
    href: "/dashboard/students/",
    icon: Students,
    admin: true
  },
  
  {
    title: "Staffs",
    href: "/dashboard/staffs",
    icon: Teacher,
    admin: true
  },
  {
    title: "Finances",
    href: "/dashboard/finances",
    icon: Finance,
    admin: true
  },
  {
    title: "Syllabus",
    href: "/dashboard/syllabus",
    icon: syl,
    admin: false
  },
  {
    title: "Exam",
    href: "/dashboard/exam",
    icon: Finance,
    admin: false
  },

  {
    title: "Results",
    href: "/dashboard/results",
    icon: result,
    admin: false
  },
  {
    title: "Logout",
    href: "/dashboard/logout",
    icon: logout,
    admin: false 
  },


];

const Sidebar = ({ sideBarArea }) => {

  const role = useSelector((state) => state?.user?.info?.role)





  const showMobilemenu = () => {
    sideBarArea.current.classList.toggle("showSidebar")
  };
  let location = useLocation();

  return (
    <div className="p-2 min-vh-100 " >
      <div className="d-flex align-items-center flex-column justify-content-around gap-3">
        <button
          className="btn-light btn m-md-auto m-0 d-lg-none"
          onClick={() => showMobilemenu()}
        ><FaTimes /></button>
        <Link to="/" className="text-start fw-bold text-decoration-none h2 text-primary py-0 py-md-3">
          <img className=" " style={{width: "4rem"}} src="./../../../../images/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
         {role === "admin" ? 
         <>
          {navigation?.map((navi, index) => (
            <NavItem key={index} className={`sidenav-bg`}>
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "sidebarActive rounded fw-bold nav-link py-3"
                    : "nav-link text-white py-3"
                }
              >
                <img src={navi.icon} />
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
         </>
         : 
         
         <>
          {navigation?.map((navi, index) => (
    
            <NavItem key={navi?.index} className={`sidenav-bg ${navi?.admin == true ? "d-none" : "d-block"}`}>
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "sidebarActive rounded fw-bold nav-link py-3"
                    : "nav-link text-white py-3"
                }
              >
                <img src={navi.icon} />
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
         </>
         }


        </Nav>
          
         
      </div>
    </div>
  );
};

export default Sidebar;
