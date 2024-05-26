import React, { useEffect, useState } from "react";
import "./dashboardhome.css";

import message from "./../../../assets/message.png";
import dpt from "./../../../assets/bookmark-2.png";
import user from "./../../../assets/Notification.png";
import bkmark from "./../../../assets/bookmark-2.svg";
import thickcalender from "./../../../assets/thickcalender.png";
import share from "./../../../assets/share.png";
import profAdd from "./../../../assets/profile-3user.svg";
import house from "./../../../assets/house.svg";
import teacher from "./../../../assets/teacher2.svg";
import chrt from "./../../../assets/cohort.svg";
import comp from "./../../../assets/completed.svg";
import grad from "./../../../assets/graduate.svg";
import stud from "./../../../assets/student.svg";
import TopForm from "./TopForm";
import axios from "axios";

function Home() {
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalApplicants, setTotalApplicants] = useState(0);
  const [totalGraduate, setTotalGraduate] = useState(0);
  const [totalCenters, setTotalCenters] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [totalCompletedChrt, setTotalCompletedChrt] = useState(0);
  const [totalOngoingChrt, setTotalOngoingChrt] = useState(0);
  
  const [events, setEvents] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/totalstudents`)
      .then((res) => setTotalStudents(res?.data?.total))
      .catch((err) => console.log(err.response.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getcenter`)
      .then((res) => setTotalCenters(res?.data?.length))
      .catch((err) => console.log(err.response.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getallcourse`)
      .then((res) =>  setTotalCourses(res?.data?.length))
      .catch((err) => console.log(err.response.data));
  }, []);

//   completed cohort

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getcohort`)
      .then((res) =>  {
        let data = res?.data?.filter(each => each.is_active == 0)

        setTotalCompletedChrt(data?.length)
    })
      .catch((err) => console.log(err.response.data));
  }, []);

//   ongoing cohort

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/getcohort`)
      .then((res) =>  {
        let data = res?.data?.filter(each => each.is_active == 1)

        setTotalOngoingChrt(data?.length)
    })
      .catch((err) => console.log(err.response.data));
  }, []);

//   total applicant

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/totalapplicants`)
      .then((res) => setTotalApplicants(res.data.total))
      .catch((err) => console.log(err.response.data));
  }, []);

//   total graduate

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/totalgraduate`)
      .then((res) => setTotalGraduate(res.data.total))
      .catch((err) => console.log(err.response.data));
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/fetch-events`)
      .then((res) => setEvents(res.data))
      .catch((err) => console.log(err.response.data));
  }, []);

  const recentpayment = [
    {
      pay: 40000,
      img: user,
      name: "Nathaniel Kingsley",
      dpt: "UI/UX",
      date: new Date().toLocaleDateString(),
    },
    {
      pay: 40000,
      img: user,
      name: "Nathaniel Kingsley",
      dpt: "UI/UX",
      date: new Date().toLocaleDateString(),
    },
    {
      pay: 40000,
      img: user,
      name: "Nathaniel Kingsley",
      dpt: "UI/UX",
      date: new Date().toLocaleDateString(),
    },
    {
      pay: 40000,
      img: user,
      name: "Nathaniel Kingsley",
      dpt: "UI/UX",
      date: new Date().toLocaleDateString(),
    },
  ];
  

  return (
    <div className="dashboard-home">
      <TopForm title="Overview" />

      <div className="container-fluid py-3">
        <div className="row g-2">
          {/* total students */}

          <div className="col-md-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="left">
                    <h6>No Of Students</h6>
                    <h2>{totalStudents}</h2>
                  </div>
                  <img src={profAdd} alt="student" />
                </div>
              </div>
            </div>
          </div>

          {/* total staff */}
          <div className="col-md-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="left">
                    <h6>No Of Staffs</h6>
                    <h2>{5}</h2>
                  </div>
                  <img src={teacher} alt="teacher" />
                </div>
              </div>
            </div>
          </div>

          {/* total center */}
          <div className="col-md-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="left">
                    <h6>No Of Centers</h6>
                    <h2>{totalCenters}</h2>
                  </div>
                  <img src={house} alt="branch" />
                </div>
              </div>
            </div>
          </div>

          {/* total courses */}
          <div className="col-md-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="left">
                    <h6>No Of Courses</h6>
                    <h2>{totalCourses}</h2>
                  </div>
                  <img src={bkmark} alt="courses" />
                </div>
              </div>
            </div>
          </div>

          {/* total completed cohort */}
          <div className="col-md-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="left">
                    <h6>Completed Cohorts</h6>
                    <h2>{totalCompletedChrt}</h2>
                  </div>
                  <img src={comp} alt="cohort" />
                </div>
              </div>
            </div>
          </div>

          {/* total ongoin cohort */}
          <div className="col-md-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="left">
                    <h6>Current Cohorts</h6>
                    <h2>{totalOngoingChrt}</h2>
                  </div>
                  <img src={chrt} alt="cohort" />
                </div>
              </div>
            </div>
          </div>

          {/* total applicnt */}
          <div className="col-md-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="left">
                    <h6>New Applicant</h6>
                    <h2>{totalApplicants}</h2>
                  </div>
                  <img src={stud} alt="applicant" />
                </div>
              </div>
            </div>
          </div>

          {/* total graduate */}
          <div className="col-md-3 col-sm-6 col-12">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <div className="left">
                    <h6>Graduate</h6>
                    <h2>{totalGraduate}</h2>
                  </div>
                  <img src={grad} alt="graduate" />
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>

      <div className="recent-activities">
        <div className="container">
          <div className="row">
            <div className="col-md-4 col-12">
              <div className="card">
                <div className="card-body">
                  <p>Recent payment</p>
                  {recentpayment?.map((rp, i) => (
                    <div key={i} className="d-flex first align-items-center flex-column flex-md-row justify-content-between">
                      <div className="left w-100 d-flex align-items-center">
                        <img src={rp?.img} alt="user" className="" />
                        <div>
                          <p>{rp?.name}</p>
                          <div className="d-flex">
                            <small>{rp?.dpt}</small>
                            <small>{rp?.date}</small>
                          </div>
                        </div>
                      </div>

                      <div className="right">
                        <p>₦{rp?.pay}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* latest applicnt */}
            <div className="col-md-4 col-12">
              <div className="card">
                <div className="card-body">
                  <div className="ind">
                    <p>Latest Applicants</p>
                    <small> see all</small>
                  </div>
                  {recentpayment?.map((rp, i) => (
                    <div className="d-flex first align-items-center flex-column flex-md-row justify-content-between">
                      <div className="left w-100 d-flex align-items-center">
                        <img src={rp?.img} alt="user" className="" />
                        <div>
                          <p>{rp?.name}</p>
                          <div className="d-flex">
                            <small>{rp?.dpt}</small>
                            <small>{rp?.date}</small>
                          </div>
                        </div>
                      </div>

                      <div className="right">
                        <p>₦{rp?.pay}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="col-md-4 col-12">
              <div className="card">
                <div className="card-body">
                  <p>Upcoming Events</p>

                 {
                  events?.length === 0 ?

                  <h6 className="text-warning">No Event </h6>
                  :

                  events?.map((rp, i) => (
                    <div className="d-flex first align-items-center flex-column flex-md-row justify-content-between">
                      <div className="left w-100 d-flex align-items-center">
                        <img src={thickcalender} alt="user" className="" />
                        <div>
                          <p>{rp?.title}</p>

                          <small>{new Date(rp?.date).toDateString()}</small>
                        </div>
                      </div>

                      <div className="right justify-content-around d-flex align-items-center ">
                        <img src={share} alt="" />
                        <p className="share">share</p>
                      </div>
                    </div>
                  ))}
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
