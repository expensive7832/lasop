import React, { useCallback } from 'react'
import First from '../../SignupFIles/First'
import Second from '../../SignupFIles/Second'
import Third from '../../SignupFIles/Third'
import { useDispatch, useSelector } from 'react-redux'
import classroom from "../../../assets/classroom.png"
import { Stepper } from 'react-form-stepper';
import "./onboard.css"
import Navbar from '../../navbarfiles/Navbar'
import Footer from '../../footerfiles/Footer'

function Onboard() {
  const page = useSelector((state) => state?.onboard?.page)

  const Other = () => page === 2 ? <Second /> : <Third />

  return (
    <>
      <div className="onboard" data-aos="slide-up" data-aos-duration="3000" >
        <div className="row">
          <div className="">
            {
              page === 1 ?
                <First />
                :
                <Other />
            }
          </div>
        </div>
      </div>
    </>
  )
}

export default Onboard