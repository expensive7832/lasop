import React, { lazy, Suspense, useLayoutEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "aos/dist/aos.js"
import "aos/dist/aos.css"
import AOS from "aos"
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import { useSelector } from 'react-redux';
import AdminRegister from './components/SignupFIles/AdminRegister';
import StaffRegister from './components/SignupFIles/StaffRegister';
import PreviewTandC from './components/previewTermsAndCondition/PreviewTandC';


const Home = lazy(() => import("./components/Pages/home/Home"))
const Course = lazy(() => import("./components/Pages/course/Course"))
const Onboard = lazy(() => import("./components/Pages/onBoard/Onboard"))
const Login = lazy(() => import("./components/Pages/login/Login"))
const Hire = lazy(() => import("./components/Pages/hire/Hire"))
const Calendar = lazy(() => import("./components/Pages/calendar/Calendar"))
const Faq = lazy(() => import("./components/Pages/faq/FaqPage"))
const NotFound = lazy(() => import("./components/Pages/notFound/NotFound"))
const About = lazy(() => import("./components/Pages/about/About"))
const Contact = lazy(() => import("./components/Pages/contact/Contact"))
const Courses = lazy(() => import("./components/Pages/course/Courses"))
const Blog = lazy(() => import("./components/Pages/blog/Blog"))
const ForgetPassword = lazy(() => import("./components/Pages/forgetPwd/ForgetPassword"))
const Blogdetails = lazy(() => import("./components/Pages/blog/Blogdetails"))
const Dashboard = lazy(() => import("./components/Dashboard/layout/Layout"))



function App() {

  const [currentChrtWeekDay, setCurrentChrtWeekDay] = useState("")
  const [currentChrtWeekend, setCurrentChrtWeekend] = useState("")
  const [currentChrtOnline, setCurrentChrtOnline] = useState("")



  useLayoutEffect(() => {
    AOS.init({
      duration: 3000,
      easing: 'ease-in-out',
      delay: 100,
    })


  }, [])

  useLayoutEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/getcohort`)
      .then((res) => {

        let online = res?.data?.filter((each) => each.mode == "online").pop().start
        let weekday = res?.data?.filter((each) => each.mode == "weekday").pop().start
        let weekend = res?.data?.filter((each) => each.mode == "weekend").pop().start

        setCurrentChrtOnline(online)
        setCurrentChrtWeekDay(weekday)
        setCurrentChrtWeekend(weekend)

      })
      .catch((err) => console.log(err))
  }, [])



  return (
    <Suspense fallback={
      <div className='anime position-absolute top-50 start-50  translate-middle '>
        <img style={{ width: "5rem", objectFit: "contain" }} src="./../images/logo.png" alt="logo" />
      </div>
    }>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home currentChrtOnline={currentChrtOnline} currentChrtWeekend={currentChrtWeekend} currentChrtWeekDay={currentChrtWeekDay} />} />
            <Route path='terms' element={<PreviewTandC />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Onboard />} />
            <Route path="/adminregister" element={<AdminRegister />} />
            <Route path="/staff" element={<StaffRegister />} />
            <Route path="/forgetpassword" element={<ForgetPassword />} />
            <Route path="/hire" element={<Hire />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<Blogdetails />} />
            <Route path="/course/:title" element={<Course currentChrtOnline={currentChrtOnline} currentChrtWeekend={currentChrtWeekend} currentChrtWeekDay={currentChrtWeekDay} />} />
            <Route path="/dashboard/:text/?" element={<Dashboard />} />
          </Routes>
        </BrowserRouter>
        <ToastContainer
          position='top-center'
        />
      </div>
    </Suspense>
  );
}

export default App;
