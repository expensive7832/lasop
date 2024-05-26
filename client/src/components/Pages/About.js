import React, { useEffect, useState } from "react";
import "./about.css";
import Navbar from "../navbarfiles/Navbar";
import user2 from "./../../assets/user2.png";
import user3 from "./../../assets/user3.png";
import user4 from "./../../assets/user4.png";
import doubleline from "./../../assets/double.png";
import Video from "../common/Video";
import Blogcard from "../common/Blogcard";
import { FaArrowRight } from "react-icons/fa";
import Footer from "../footerfiles/Footer";
import { Link } from "react-router-dom";
import axios from "axios";

function About({ blogdata }) {
  
    const [blogData, setBlogData] = useState(null)

    useEffect(() => {
        axios
          .get(`${process.env.REACT_APP_API_URL}/getarticles`)
          .then((res) => setBlogData(res?.data?.article?.slice(0,3)))
          .catch((err) => console.log(err));
      }, []);

  return (
    <div className="about">
      <Navbar />
      <div className="background p-5">
        <div className="container p-md-5">
          <div className="row align-items-center ">
            <div className="col-md-6">
              <img
                className="doubleline img-fluid"
                src="./../../../images/ourmission.png"
                alt=""
              />
              <p className="p py-3 py-md-0">
                Our mission is to provide every student with a platform to
                refine his or her skills and make a mark in the computer
                literate world. To sharpen their skills to master new
                technologies and establish themselves with the goal of Bringing
                People and Computers Together Successfully, and to meet the
                augmenting needs of the technology-driven global
                society.recognized Model Computer Programming Institute in the
                World in meeting the prevailing needs of technical manpower
                through qualitative, effective and resourceful training.
              </p>
            </div>
            <div className="col-md-6 position-relative ">
              <img
                src={user3}
                alt=""
                className="img-fluid img-thumbnail d-block"
              />
              <img
                src={user4}
                alt=""
                className="img-fluid img-thumbnail d-block"
              />
              <img
                src={user2}
                alt=""
                className="img-fluid img-thumbnail d-block"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container p-5">
        <div className="row justify-content-between align-items-center">
          <div className="col-md-5 position-relative mx-3 mx-md-0">
            <img
              src={user3}
              alt=""
              className="img-fluid img-thumbnail d-block"
            />
            <img
              src={user4}
              alt=""
              className="img-fluid img-thumbnail d-block"
            />
            <img
              src={user2}
              alt=""
              className="img-fluid img-thumbnail d-block"
            />
          </div>

          <div className="col-md-2">
            <img className="d-block m-auto" src={doubleline} alt="" />
          </div>
          <div className="col-md-5 left">
            <h5 className="h5 fw-bold ">Our Philosophy</h5>
            <p className="p">
              Our mission is to provide every student with a platform to refine
              his or her skills and make a mark in the computer literate world.
              To sharpen their skills to master new technologies and establish
              themselves with the goal of Bringing People and Computers Together
              Successfully, and to meet the augmenting needs of the
              technology-driven global society. LASOP looks forward to be a
              recognized Model Computer Programming Institute in the World in
              meeting the prevailing needs of technical manpower through
              qualitative, effective and resourceful training.
            </p>
          </div>
        </div>
      </div>

      {/** our team  */}
      {/* <div className="team p-5">
                <div className="text-center">
                    <img src="./../../../images/ourteam.png" alt="our team" />
                </div>

               

                <div className="container info p-4">
                    <div className="row">
                        <div className="col-md-4 text-center my-2 my-md-1 ">
                            <img src="./../../../images/t1.png" alt="" />
                            <h6 className='name h5 my-2'>John Doe</h6>
                            <p className="h6 title">CEO, Lasop</p>
                        </div>
                        <div className="col-md-4 text-center my-2 my-md-1 ">
                            <img src="./../../../images/t2.png" alt="" />
                            <h6 className='name h5 my-2'>John Doe</h6>
                            <p className="h6 title">CEO, Lasop</p>
                        </div>
                        <div className="col-md-4 text-center my-2 my-md-1 ">
                            <img src="./../../../images/t3.png" alt="" />
                            <h6 className='name h5 my-2'>John Doe</h6>
                            <p className="h6 title">CEO, Lasop</p>
                        </div>
                        <div className="col-md-4 text-center my-2 my-md-1 ">
                            <img src="./../../../images/t4.png" alt="" />
                            <h6 className='name h5 my-2'>John Doe</h6>
                            <p className="h6 title">CEO, Lasop</p>
                        </div>
                        <div className="col-md-4 text-center my-2 my-md-1 ">
                            <img src="./../../../images/t5.png" alt="" />
                            <h6 className='name h5 my-2'>John Doe</h6>
                            <p className="h6 title">CEO, Lasop</p>
                        </div>
                        <div className="col-md-4 text-center my-2 my-md-1 ">
                            <img src="./../../../images/t6.png" alt="" />
                            <h6 className='name h5 my-2'>John Doe</h6>
                            <p className="h6 title">CEO, Lasop</p>
                        </div>
                    </div>
                </div>
            </div> */}

      <div className="video">
        <Video />
      </div>

      <div className="event p-5">
        <h5 className="text-center">Upcoming Events, News and Blogs</h5>

        <img className="doubleline" src={doubleline} alt="line" />

        <Blogcard blogdata={blogData} />

        <div className="d-flex justify-content-center bg-white viewall my-4 my-md-0  ">
          <Link to="/blog" className="me-3 nav-link">
            View all blogs
          </Link>
          <div className="mt-0">
            {" "}
            <FaArrowRight />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default About;
