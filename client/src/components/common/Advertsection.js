import React from 'react'
import "./advert.css"
import doubleline from "./../../assets/double.png"
import user2 from "./../../assets/user2.png"
import user3 from "./../../assets/user3.png"
import user4 from "./../../assets/user4.png"
import { Link } from 'react-router-dom'

function Advert() {
  return (
    <div className="advert">
          <div className="container">
            <div className="row justify-content-between align-items-center">
              <div className="col-md-5 position-relative mx-3 mx-md-0">

                <img src={user3} alt="" className='img-fluid img-thumbnail d-block' />
                <img src={user4} alt="" className='img-fluid img-thumbnail d-block' />
                <img src={user2} alt="" className='img-fluid img-thumbnail d-block' />

              </div>
              <div className="col-md-2">
                <img className='d-block m-auto' src={doubleline} alt="" />
              </div>
              <div className="col-md-5 left">
                <h5 className='h5 fw-bold '>Learn Online Or On<br /> Campus, weekdays or <br /> weekends </h5>
                <p className='h6'>Take an online coding bootcamp or learn in-person at one of our state-of-the-art campuses, which are designed to provide dynamic, accelerated learning experiences.</p>
                <Link to="/signup" className='btn btn-primary btn-md mt-3'>Get Started</Link>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Advert