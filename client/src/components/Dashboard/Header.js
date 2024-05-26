import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import {
  Navbar,
  Collapse,
  Nav,
  NavItem,
  NavbarBrand,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Dropdown,
  Button,
  Badge,
} from "reactstrap";
import { IoMdList } from "react-icons/io";
import { FaSearch, FaTimes } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import searchIcon from "./../../assets/note.svg";
import profile from "./../../assets/profile.png";
import notf from "./../../assets/Notification-black.svg";
import notification from "./../../assets/notifications.png";
import message from "./../../assets/message.png";
import logoutred from "./../../assets/logoutred.svg";
import profCircle from "./../../assets/profile-circle.svg";
import { useSelector, useDispatch } from "react-redux";
import { infoCtrl, loginCtrl } from "../../Redux/Slices/userSlice";

const Header = ({sideBarArea}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenProf, setIsOpenProf] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [notificationOpen, setNotificationOpen] = React.useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);
  const Handletoggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfClick = () => setIsOpenProf((prevState) => !prevState)

  const toggleNotification = () => setNotificationOpen((prevState) => !prevState);
 
  const showMobilemenu = () => {
    sideBarArea.current.classList.toggle("showSidebar");
  };

  const notifications = [
    {title: "A new student just registered for UI/UX Online.", time: "2d"},
    {title: "A new student just registered for UI/UX Online.", time: "2d"},
    {title: "A new student just registered for UI/UX Online.", time: "2d"},
    {title: "A new student just registered for UI/UX Online.", time: "2d"},
    {title: "A new student just registered for UI/UX Online.", time: "2d"},
  ]

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loginuser = useSelector((state) => state?.user?.info)

  const handleLogout = () =>{
    dispatch(loginCtrl(null))
    dispatch(infoCtrl({}))

    navigate("/login")


  }

  return (
    <Navbar className="navbar dashboard"  expand="md">
      <div className="d-flex align-items-center ">
        <div className="border border-muted d-flex gap-3 p-2 align-items-center rounded">
          <FaSearch color="#588cff"/>
          <input type="search"placeholder="Search" />
        </div>
        <Button
          color="primary"
          className="d-lg-none"
          onClick={() => showMobilemenu()}
        >
          <IoMdList size={32}/>
        </Button>
      </div>
      <div className="hstack gap-2">
        <Button
          color="primary"
          size="sm"
          className="d-sm-block d-md-none"
          onClick={Handletoggle}
        >
          {isOpen ? (
            <FaTimes/>
          ) : (
            <BsThreeDotsVertical/>
          )}
        </Button>
      </div>

      <Collapse navbar isOpen={isOpen}>
        <Nav className="me-auto" navbar>
          <NavItem>
            <Link
              to="/starter"
              className="nav-link"
              style={{
                color: "#7B7B7B",
                fontSize: "1rem",
                fontWeight: "medium",
              }}
            >
              
            </Link>
          </NavItem>
        </Nav>
        <img src={message} alt="" />
        
        <Dropdown isOpen={notificationOpen} toggle={toggleNotification}>
        <DropdownToggle >
        <img
                src={notification}
                alt="profile"
                className="img-fluid position-relative"
      
            />
          <sup className="notification-num">78+</sup>
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem header className="d-flex align-items-center gap-2">
              <img src={notification} alt="" style={{width: "2rem"}} />
              <h6>Notification(12)</h6>
            </DropdownItem>
            <hr />

            {
              notifications?.map((nt, i) =>(
                <>
                <DropdownItem key={i} header className="d-flex align-items-center">
              <div className="d-flex gap-1">
              <img src={notf} alt="" style={{width: "2rem"}} />
             <div className="">
              <p>{nt?.title}</p>
              <div className="d-flex gap-2 notf">
                <button className=" ">Approve</button>
                <button className=" ">View</button>
              </div>
             </div>
              </div>
              <small>{nt?.time}</small>
              
            </DropdownItem>
            <hr />
            </>
              ))
            }
           
          </DropdownMenu>
        </Dropdown>

        <div className="dropdown">
      
  <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
    <a className="dropdown-item" href="#">Action</a>
    <a className="dropdown-item" href="#">Another action</a>
    <a className="dropdown-item" href="#">Something else here</a>
  </div>
</div>
        
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle className="d-flex align-items-center">
            <img
              src={profile}
              alt="profile"
              className="rounded-circle img-fluid"
            />
            <small className="text-dark">{loginuser?.fname}</small>

          </DropdownToggle>
          <DropdownMenu hidden={isOpenProf}>
            <DropdownItem header><img src={profCircle} alt="" /> Account</DropdownItem>
            <DropdownItem onClick={handleLogout}><img src={logoutred} alt="" /> Logout</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <div onClick={toggleProfClick} >
        {
          isOpenProf === false ?
        <MdKeyboardArrowDown size={28}/>
        :
        <MdKeyboardArrowUp size={28}/>
        }
        </div>

      </Collapse>
    </Navbar>
  );
};

export default Header;
