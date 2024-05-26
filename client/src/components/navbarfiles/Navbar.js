import { Link, useNavigate } from "react-router-dom";
import "./navbar.css";
import { FaBars, FaTimesCircle } from "react-icons/fa";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Logout } from "../../Redux/Slices/userSlice";
import { clearData, LastPage } from "../../Redux/Slices/onboardslice";
import { MdOutlineArrowDropDown } from "react-icons/md";
import courses from "../../fakedb/courseData";

// function Navbar() {
//   const [toggle, setToggle] = useState(false);
//   const [toggleMobile, setToggleMobile] = useState(false);
//   const [userDropDown, setUserDropDown] = useState(false);
//   const [userDropDownMobile, setUserDropDownMobile] = useState(false);

//   const navigate = useNavigate()

//   const dispatch = useDispatch()

//   const [courses, setCourses] = useState(null);

//   const navRef = useRef();

//   const handleOpen = () => {
//     navRef.current.style.display = "block";
//   };

//   const handleClose = () => {
//     navRef.current.style.display = "none";
//   };

//   window.onresize = function () {
//     let screen = window.innerWidth;

//     if (screen > 576) {
//       navRef.current.style.display = "none";
//     }
//   };

//   useEffect(() => {
//     setCourses(data)
//   }, []);

//   const login = useSelector((state) => state.user.login);
//   const user = useSelector((state) => state.user);

//   const pushToReceiptPage = () => {
//     dispatch(LastPage());
//     navigate("/signup");
//   };

//   const handleLogout = () => {
//     dispatch(Logout());
//     navigate("/login");
//   };

//   return (
//     <nav>
//       <div className="container d-flex align-items-center  justify-content-between">
//         <Link to={"/"}>
//           <img className="logo" src="./../../../images/logo.png" alt="logo" />
//         </Link>

//         <div className="d-none  d-md-block ">
//           <ul className="d-flex gap-5 align-items-center ">
//             <li
//               className="position-relative "
//               onClick={() => setToggle((prev) => !prev)}
//             >
//               <p className="font-bold mt-3 dropdown-text">Courses
//               <span><MdOutlineArrowDropDown size={28}/></span>
//               </p>

//               <div
//                 style={{ top: "3rem", zIndex: 10, width: "30vw" }}
//                 className={`bg-white dropdown position-absolute  shadow shadow-dark  rounded p-3 ${
//                   toggle ? "d-block" : "d-none"
//                 }`}
//               >
//                 <div className="row g-3  ">
//                   {courses?.map((course) => (
//                     <Link
//                       to={`/course/${course?.dpt1}`}
//                       key={course?.id}
//                       className="col-md-6 courselink"
//                     >
//                       {course?.dpt1}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </li>

//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/faq">FAQS</Link>
//             </li>
//             <li>
//               <Link to="/blog">Blog</Link>
//             </li>
//             <>
//               {login ? (
//                 <li
//                   className=""
//                   style={{ position: "relative" }}
//                   onClick={() => setUserDropDown((prev) => !prev)}
//                 >
//                   <button className="fw-bold btn-md btn">
//                     {user?.info?.role === "admin"
//                       ? "Admin"
//                       : user?.info?.paymentstatus === 0
//                       ? "Upload Your Receipt"
//                       : user?.info?.fname}
//                   </button>

//                   <div
//                     className={`bg-white userdropdown p-4  shadow position-absolute  shadow-dark container rounded p-3 ${
//                       userDropDown ? "d-block" : "d-none"
//                     }`}
//                   >
//                     <div className="row p-2 ">
//                       {user?.info?.role !== "admin" &&
//                         user?.info?.paymentstatus === 0 && (
//                           <button
//                             className="btn btn-dark mb-3"
//                             onClick={pushToReceiptPage}
//                           >
//                             Click To Upload
//                           </button>
//                         )}
//                       <div>
//                         <Link
//                           className="nav-link mb-3"
//                           to={`/dashboard/${
//                             user?.role === "admin" ? "home" : "syllabus"
//                           }`}
//                         >
//                           Dashboard
//                         </Link>

//                         <button
//                           onClick={handleLogout}
//                           className="btn m-auto  w-100 btn-sm btn-outline-danger"
//                         >
//                           Logout
//                         </button>
//                       </div>

//                     </div>
//                   </div>
//                 </li>
//               ) : (
//                 <li>
//                   <Link to="/login">Login</Link>
//                 </li>
//               )}
//             </>
//           </ul>
//         </div>

//         <div ref={navRef} className="smallscreen ">
//           <button className="btn d-block m-auto" onClick={handleClose}>
//             <FaTimesCircle size={28} />
//           </button>

//           <ul className="">

//           <>
//               {login ? (
//                 <li
//                   className=""
//                   style={{ position: "relative" }}
//                   onClick={() => setUserDropDownMobile((prev) => !prev)}
//                 >
//                   <button className="fw-bold btn-md btn">
//                     {user?.info?.role === "admin"
//                       ? "Admin"
//                       : user?.info?.paymentstatus === 0
//                       ? "Upload Your Receipt"
//                       : user?.info?.fname}
//                   </button>

//                   <div
//                     className={`bg-white userdropdown p-4  shadow position-absolute  shadow-dark container rounded p-3 ${
//                       userDropDownMobile ? "d-block" : "d-none"
//                     }`}
//                   >
//                     <div className="row p-2 ">
//                       {user?.info?.role !== "admin" &&
//                         user?.info?.paymentstatus === 0 && (
//                           <button
//                             className="btn btn-dark mb-3"
//                             onClick={pushToReceiptPage}
//                           >
//                             Click To Upload
//                           </button>
//                         )}
//                       <div>
//                         <Link
//                           className="nav-link mb-3"
//                           to={`/dashboard/${
//                             user?.role === "admin" ? "home" : "syllabus"
//                           }`}
//                         >
//                           Dashboard
//                         </Link>

//                         <button
//                           onClick={handleLogout}
//                           className="btn m-auto  w-100 btn-sm btn-outline-danger"
//                         >
//                           Logout
//                         </button>
//                       </div>

//                     </div>
//                   </div>
//                 </li>
//               ) : (
//                 <li>
//                   <Link to="/login">Login</Link>
//                 </li>
//               )}
//             </>

//             <li>
//               <Link to="/about">About</Link>
//             </li>
//             <li>
//               <Link to="/faq">FAQS</Link>
//             </li>
//             <li>
//               <Link to="/blog">Blog</Link>
//             </li>

//             <li
//               className="mb-3"
//               style={{ position: "relative" }}
//               onClick={() => setToggleMobile((prev) => !prev)}
//             >
//               <button className="font-bold btn">Courses
//               <span><MdOutlineArrowDropDown size={28} /></span>
//               </button>

//               <div
//                 className={`bg-white dropdown shadow position-absolute  shadow-dark container rounded p-3 ${
//                   toggleMobile ? "d-block" : "d-none"
//                 }`}
//               >
//                 <div className="row ">
//                   {courses?.map((course) => (
//                     <Link
//                       to={`/course/${course?.dpt1}`}
//                       key={course?.id}
//                       className="col-md-6 courselink"
//                     >
//                       {course?.dpt1}
//                     </Link>
//                   ))}
//                 </div>
//               </div>
//             </li>

//           </ul>
//         </div>

//         <button onClick={handleOpen} className="navbar-toggler d-md-none ">
//           <FaBars size={30} />
//         </button>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;

import React, { useEffect } from "react";

function Navbar() {
  const login = useSelector((state) => state?.user?.login);
  const user = useSelector((state) => state?.user);






  const dispatch = useDispatch()

  const navigate = useNavigate()

  const pushToReceiptPage = () => {
        dispatch(LastPage());
        navigate("/signup");
      };
    
      const handleLogout = () => {
        dispatch(Logout());
        navigate("/login");
      };

  return (
    <nav class="navbar navbar-expand-md ">
      <div class="container">
        <Link to={"/"}>
          <img className="logo" src="./../../../images/logo.png" alt="logo" />
        </Link>

        <button
          class="navbar-toggler d-lg-none"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav ms-md-auto ms-auto mt-2 mt-lg-0  items-center">
            <li class="nav-item dropdown">
              <a
                class="nav-link fw-bold dropdown-toggle"
                href="#"
                id="dropdownId"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Courses
              </a>
              <div class="dropdown-menu" aria-labelledby="dropdownId">
                {courses?.map((course) => (
                  <Link
                    to={`/course/${course?.dpt1}`}
                    key={course?.id}
                    className="dropdown-item my-2"
                  >
                    {course?.dpt1}
                  </Link>
                ))}
              </div>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/about">
                About
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/faq">
                FAQS
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link fw-bold" to="/blog">
                Blog
              </Link>
            </li>

            {login ? (
              <li className="nav-item">
                <div class="dropdown">
                  <button
                    class="btn btn-secondary text-white dropdown-toggle"
                    type="button"
                    id="triggerId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    {user?.info?.role === "admin"
                      ? "Admin"
                      : user?.info?.paymentstatus === 0
                      ? "Upload Your Receipt"
                      : user?.info?.fname
                    
                    }

                  </button>

                  <div class="dropdown-menu" aria-labelledby="triggerId">
                    <div className="row p-2 ">
                      {user?.info?.role !== "admin" &&
                        user?.info?.paymentstatus === 0 && (
                          <button
                            className="btn btn-dark mb-3"
                            onClick={pushToReceiptPage}
                          >
                            Click To Upload
                          </button>
                        )}
                      <div>
                        <Link
                          className="nav-link mb-3"
                          to={`/dashboard/${
                            user?.role === "admin" ? "home" : "syllabus"
                          }`}
                        >
                          Dashboard
                        </Link>

                        <button
                          onClick={handleLogout}
                          className="btn m-auto  w-100 btn-sm btn-outline-danger"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link fw-bold" to="/login">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
