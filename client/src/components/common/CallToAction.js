import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom/dist';
import { BsWhatsapp } from 'react-icons/bs';
import { FaFacebook, FaInstagram, FaTwitter} from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';
import axios from 'axios';
import {toast} from "react-toastify"
import mainprospectus from "./../../mainprospectus.pdf"
import "./cta.css"

function CallToAction() {

  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [dwl, setDwl] = useState(true)

  const ads = useRef()

  useLayoutEffect(() =>{
    if(phone === "" || email === "" || name === ""){
      ads.current.checked = false
    }
  }, [name, email, phone])

  const handleSubmit = async(e) =>{
    if(e){
      const form = new FormData()
    form.append("fullname", name)
    form.append("email", email)
    form.append("phone", phone)



    
    await axios?.post(`${process.env.REACT_APP_API_URL}/prospectus`, form)
    .then((res) =>{
      if(res?.data?.message === 'success'){
        setDwl(false)
       // ads.current.checked = false
      }
    })
    .catch((err) => {
      if(err?.response?.data?.message === "fields cannot be empty"){
        setDwl(true)
        toast.warn(err?.response?.data?.message)
        ads.current.checked = false
      }
    })

    }else{
      setDwl(true)
    }


   

  }



  return (
    <>
    <div className="sidebar">
    <button type="button" class="btn btn-lg d-block" data-bs-toggle="modal" data-bs-target="#modalId">
       <img style={{width: "3rem"}} src="./../../../images/Prospectus.png" alt="" />
     </button>
    <Link to="https://wa.me/+2347025713326" target='_blank' class="btn my-1 text-success btn-lg d-block">
       <BsWhatsapp/>
     </Link>
    <Link to="https://facebook.com/lasopdotnet" target='_blank' class="btn my-1 text-primary btn-lg d-block">
       <FaFacebook/>
     </Link>
    <Link to="https://www.instagram.com/lasopdotnet" target='_blank' class="btn my-1 text-danger btn-lg d-block">
       <FaInstagram/>
     </Link>

    <Link to="https://linkedin.com/company/lasopdotnet" target='_blank' class="btn my-1 text-primary btn-lg d-block">
       <AiFillLinkedin/>
     </Link>

    <Link to="https://twitter.com/Lasopdotnet" target='_blank' class="btn my-1 text-info btn-lg d-block">
       <FaTwitter/>
     </Link>
    </div>

    <div class="modal fade" id="modalId" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-md" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalTitleId">Prospectus</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              
              <form >
                <div className='my-2'>
                  <label htmlFor="" className='form-label'>Full Name</label>
                  <input onChange={(e) => setName(e.target.value)} type="text" className="form-control" />
                </div>
                <div className='my-2'>
                  <label htmlFor="" className='form-label'>Email</label>
                  <input ref={ads}  onChange={(e) => setEmail(e.target.value)} type="email" className="form-control" />
                </div>

                <div className='my-2'>
                  <label htmlFor="" className='form-label'>Phone Number</label>
                  <input  onChange={(e) => setPhone(e.target.value)}  type="text" className="form-control" />
                </div>

                <div className="d-flex my-4 gap-2 align-items-center">
                  <input ref={ads} onChange={(e) => handleSubmit(e.target.checked)} id='ads' type="checkbox" className='h-100 p-2 '  />
                  <label htmlFor='ads' className='fw-bold'>I agree to receive promotional email</label>
                </div>

                
                  <button disabled={dwl} className="btn btn-md btn-success w-100">
                  <a href={mainprospectus} download={"Prospectus"}  className=" nav-link">
                    Download Prospectus
                    </a>
                  </button>
                
              </form>
            </div>
           
          </div>
        </div>
      </div>

    </>
  )
}

export default CallToAction