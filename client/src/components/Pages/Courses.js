import React from 'react'
import Navbar from '../navbarfiles/Navbar'
import Footer from '../footerfiles/Footer'
import doubleline from "./../../assets/double.png"
import "./courses.css"
import { Link } from 'react-router-dom/dist'
import { TbMathGreater } from 'react-icons/tb'



function Courses() {

    const cardsData = [
        {
          title: "fullstack development",
          info: "Learn to create professional, responsive websites using HTML, CSS, Bootstrap, JavaScript, JQuery, React, Python, Django & SQL.",
          index: 2,
          img: "full.png",
    
        },
        {
          title: "mobile app development",
          info: "Learn to create mobile UI designs with native frameworks or cross-platform frameworks, React Native, Flutter",
          index: 4,
          img: "mob.png"
        },
        {
          title: "frontend development",
          info: "Learn to create professional, responsive websites using HTML, CSS, Bootstrap, JavaScript, JQuery, React, & SQL.",
          index: 1,
          img: "full.png"
        },
        {
          title: "backend development",
          info: "Learn Python, and its framework Django. Or  Node and Express.NET if your interest is to become a Nodejs developer.",
          index: 3,
          img: "backend.png"
        },
        {
          title: "UI/UX design",
          info: "Learn design thinking, wireframes, interactive prototyping. Earn a UX design certification to accelerate your career with cutting-edge skills.",
          index: 0,
          img: "ui.png"
        },
        {
          title: "Data science and AI",
          info: "Dive into prescriptive and predictive analytics, machine learning, artificial intelligence, statistical analysis, and programming languages.",
          index: 5,
          img: "ds.png"
        },
      ]

  return (
   <div className="courses">
   <Navbar/>

   <div className="content container p-5">

    <h3 data-aos="fade-right" className="heading text-center">Courses Offered</h3>
    <img  src={doubleline} className="d-block doubleline img-fluid" alt="outline" />
   

    <div data-aos="zoom-in" className="cards container">
          <div className="row gap-md-0 gap-3">
            {cardsData?.map((data, i) => (
              <div key={i} className="col-md-4 my-2">
                <div className="card p-3">
                  <img src={`./../../../images/${data?.img}`} alt={data?.title} className="card-img-top img-fluid" />
                  <h5 className='my-3 text-capitalize '>{data?.title}</h5>
                  <p>{data?.info}</p>
                 <div className="align-items-center mt-3 d-flex justify-content-between">
                 <div className="border w-50 rounded px-1 border-primary d-flex p-1 align-items-center">
                    <Link to={`/course/${data?.index}`} className='fw-bold'>learn more</Link>
                    <TbMathGreater color='#000066' />
                  </div>

                  <Link to="/signup" className="btn btn-primary">Apply</Link>
                 </div>
                </div>
              </div>
            ))}
          </div>

        </div>



   </div>

   <Footer/>
   </div>
  )
}

export default Courses