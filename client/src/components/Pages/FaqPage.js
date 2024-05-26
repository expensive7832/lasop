import React from 'react'
import "./faqpage.css"
import Navbar from '../navbarfiles/Navbar'
import Faq from '../common/Faq'
import Advert from '../common/Advertsection'
import Getstarted from '../common/Getstarted'
import Footer from '../footerfiles/Footer'

function FaqPage() {
  return (
    <div className="faqpage">
      <div className="background">
        <div className="container">
          <Navbar />

          <div className="info p-md-5 position-relative ">
            <h4 className="text-center text-white  p-4">Frequently Asked <br /> Question</h4>

            <img className='faqimage' src="./../../../images/faq.png" alt="" />

            <Faq />
          </div>

        </div>
      </div>

      <div className="advert p-5">
        <Advert/>
      </div>

      <div className="getstarted p-5">
        <Getstarted/>
      </div>

      <Footer/>



    </div>
  )
}

export default FaqPage