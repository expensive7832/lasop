import React from 'react'
import "./contact.css"
import Navbar from '../navbarfiles/Navbar'
import { FaTelegramPlane } from "react-icons/fa"
import Advert from '../common/Advertsection'
import Getstarted from '../common/Getstarted'
import Footer from '../footerfiles/Footer'

function Contact() {
  return (
    <div className="contact">
        <Navbar/>
        <div className="background">
        

        <div className="container">
        <div className="contact-form ">
            <h4 className="text-center py-5">Get In Touch</h4>
            <form >
                <div className=" my-1">
                    <label htmlFor="" className="fw-bold form-label">Full Name</label>
                    <input type="text" className="form-control" />
                </div>
                <div className=" my-1">
                    <label htmlFor="" className="fw-bold form-label">Full Name</label>
                    <input type="text" placeholder='john doe' className="form-control" />
                </div>
                <div className=" my-1">
                    <label htmlFor="" className="fw-bold form-label">Email Address</label>
                    <input type="email" placeholder='johndoe@gmail.com' className="form-control" />
                </div>
                <div className=" my-1">
                    <label htmlFor="" className="fw-bold form-label">Your Message</label>
                    <textarea rows={8} name="" placeholder='what would you like to tell us' className="form-control"></textarea>
                </div>

                <div className='text-center my-3'>
                    <button className="btn btn-md"><FaTelegramPlane/> Send Message</button>
                </div>
            </form>
        </div>
        </div>
        </div>

        <div className="advert p-5 bg-white">
            <Advert/>
        </div>

        <div className="getstarted p-5">
            <Getstarted/>
        </div>

        <Footer/>

      
    </div>
  )
}

export default Contact