import React, { useEffect, useLayoutEffect, useState } from "react";
import { FaGripHorizontal, FaUserCircle } from "react-icons/fa";
import "../staff/staffprofile.css";
import img from "../../../../assets/user1.png";
import before from "../../../../assets/profile-circle.svg";
import after from "../../../../assets/Line.png";
import message from "../../../../assets/messages.svg";
import { Link, useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
} from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

import "./updateuser.css";

function UpdateUser({ id }) {
  const [roleStatus, setRoleStatus] = useState(false);
  const [courses, setCourses] = useState(null);
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [learningStatus, setLearningStatus] = useState(null);

  const [addStaffStatus,setAddStaffStatus] = useState(false)

  const token = useSelector((state) => state?.user?.token);

  const handleChangeStudentMode = async (value) => {
    setRoleStatus(true);

    if (data?.role === value) {
      toast.warn("user is " + value + " already");
      setRoleStatus(false);
    } else {
      await axios
        .post(`${process.env.REACT_APP_API_URL}/updatestudentmode`, {
          role: value,
          id,
        })
        .then((res) => {
          toast.success("update successful");
          setRoleStatus(false);
        })
        .catch((err) => {
          console.log(err);
          setRoleStatus(false);
        });
    }
  };

  useLayoutEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getlearningstatus`)
      .then((res) => setLearningStatus(res.data))
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getcourse`)
      .then((res) => setCourses(res.data))
      .catch((err) => console.log(err));
  }, []);

  useLayoutEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        toast.error(err?.response?.data?.mesage);
        navigate("/login");
      });
  }, []);

  const handleStaffSubmit = async(e) =>{
    e.preventDefault()

    setAddStaffStatus(true)

    let form = new FormData(e.currentTarget)

    form.append("userId", id)

    await axios.post(`${process.env.REACT_APP_API_URL}/addstaff`, form,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then((res) => {
        setAddStaffStatus(false)
        toast.success("staff created")

        window.location.reload()
    })
    .catch((err) =>{
        for(let i in err.response.data){
            toast.error(`${err.response.data[i]}`)
        }
        setAddStaffStatus(false)
    })

  }

  return (
    <div className="profile">
      <div className="border-bottom border-primary border-1 p-1">
        <div className="row justify-content-between">
          <div className="col-md-6 col-12">
            <h3> User/Profile</h3>
          </div>
          <div className="col-12 col-md-6">
            <div className="d-flex gap-2 justify-content-md-end justify-content-center">
              {/* staff form */}

              {data?.role !== "staff" && (
                <button
                  style={{ backgroundColor: "#000066" }}
                  type="button"
                  class="btn text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#modalId"
                >
                  Register {data?.fname} as staff
                </button>
              )}

              <div
                class="modal fade"
                id="modalId"
                tabindex="-1"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                role="dialog"
                aria-labelledby="modalTitleId"
                aria-hidden="true"
              >
                <div
                  class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md"
                  role="document"
                >
                  <div class="modal-content">
                    <div class="modal-header">
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <form onSubmit={handleStaffSubmit}>
                        <div>
                          <label htmlFor="" className="form-label">
                            Dpt
                          </label>
                          <select name="dpt" id="" className="form-control">
                            {courses?.map((each) => (
                              <option key={each?.id} value={each?.title}>
                                {each?.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="my-2">
                          <label htmlFor="" className="form-label">
                            StaffID
                          </label>
                          <input
                          name="staffid"
                            type="text"
                            
                            className="form-control"
                          />
                        </div>
                        <div className="my-2">
                          <label htmlFor="" className="form-label">
                            Salary
                          </label>
                          <input
                            type="number"
                            name="salary"
                            className="form-control"
                          />
                        </div>
                            
                            <select name="role" className="my-2 form-control">
                                <option value="academic">Academic</option>
                                <option value="non-academic">Non-academic</option>
                            </select>
                       {
                        addStaffStatus ?

                        <div className="d-flex text-center justify-center align-items-center">
                            <Spinner
                        color="#000066"
                        size={28}
                        />
                        </div>
                        :

                        <button className="btn btn-primary btn-lg w-100">submit</button>
                       }
                      </form>
                    </div>
                  </div>
                </div>
              </div>

              {data?.role === "student" && (
                <select
                  onChange={(e) => handleChangeStudentMode(e.target.value)}
                  className="roles"
                  name=""
                  id=""
                >
                  {learningStatus?.map((each) => (
                    <option
                      selected={
                        each.title === data?.learningstatus ? true : false
                      }
                      key={each.id}
                      value={each.id}
                    >
                      {each.title}
                    </option>
                  ))}
                </select>
              )}

              <div className="rounded border border-primary p-1">
                <div class="dropdown">
                  <button
                    class="btn dropdown-toggle"
                    type="button"
                    id="triggerId"
                    data-bs-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <img src={message} alt="message" />
                    <p className="text-primary d-inline">message</p>
                  </button>
                  <div class="dropdown-menu" aria-labelledby="triggerId">
                    <div className="dropdown-item">
                      <Link className="nav-link">Confirm Payment</Link>
                    </div>
                    <div className="dropdown-item">
                      <Link className="nav-link">Re-admit</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {roleStatus && (
        <div className="position-absolute top-50 start-50 translate-middle">
          <img
            style={{ width: "5rem", height: "5rem" }}
            src={require("../../../../assets/loading.gif")}
            alt=""
          />
        </div>
      )}

      <div className="info">
        <div className="topinfo">
          <div className=" ">
            <small className="ms-2">PERSONAL INFORMATION</small>
          </div>

          <div className="info-body py-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3 col-sm-6 col-12">
                  <img src={data?.imgurl} alt="profile" />
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <div>
                    <label className="fw-bold" htmlFor="">
                      Name
                    </label>
                    <h6>
                      {data?.fname} {data?.lname}
                    </h6>
                  </div>
                  <div>
                    <label className="fw-bold" htmlFor="">
                      Phone Number
                    </label>
                    <a className="nav-link" href={`tel:${data?.phone}`}>
                      {data?.phone}
                    </a>
                  </div>

                  <div>
                    <label className="fw-bold" htmlFor="">
                      Current Address
                    </label>
                    <h6>{data?.address}</h6>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <div>
                    <label className="fw-bold" htmlFor="">
                      Sex
                    </label>
                    <h6>Male</h6>
                  </div>
                  <div>
                    <label className="fw-bold" htmlFor="">
                      Status
                    </label>
                    <h6>{data?.status === 1 ? "paid" : "unpaid"}</h6>
                  </div>
                  <div>
                    <label className="fw-bold" htmlFor="">
                      Registration Date
                    </label>
                    <h6>{new Date(data?.datecreated).toLocaleDateString()}</h6>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <div>
                    <label htmlFor="">Deffered To</label>
                    <h6>11/01/2023</h6>
                  </div>
                  <div>
                    <label htmlFor="">Cohort</label>
                    <h6>{data?.chrttitle}</h6>
                  </div>
                  <div>
                    <label className="fw-bold" htmlFor="">
                      Center
                    </label>
                    <h6 className="">
                      {data?.center} {data?.mos}
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="bottominfo">
          <div>
            <small className="ms-2">COURSE INFORMATION</small>
          </div>

          <div className="info-body py-3">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-3 col-sm-6 col-12">
                  <img src={data?.imgurl} alt="profile" />
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <div>
                    <label htmlFor="">Course Of Study</label>
                    <h6>{data?.title}</h6>
                  </div>
                  <div>
                    <label htmlFor="">Course Duration</label>
                    <h6>{data?.duration}</h6>
                  </div>
                  <div>
                    <label htmlFor="">Started</label>
                    <h6>{new Date(data?.startdate).toLocaleDateString()}</h6>
                  </div>
                </div>
                <div className="col-md-3 col-sm-6 col-12">
                  <div>
                    <label htmlFor="">Tuition Fee</label>
                    <h6>{data?.price}</h6>
                  </div>
                  <div>
                    <label htmlFor="">Fee Balance</label>
                    <h6>None</h6>
                  </div>
                  <div>
                    <label htmlFor="">Due Date </label>
                    <h6>None</h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateUser;
