import React, { useState, useEffect } from 'react'
import "./../Pages/login/login.css"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { NavLink } from 'reactstrap'
import { useDispatch } from 'react-redux'
import { addData, setPage } from '../../Redux/Slices/onboardslice'
import { FaEye } from 'react-icons/fa'
import { IoMdClose } from "react-icons/io";
// import { animateScroll as scroll } from 'react-scroll';
import './terms.css'

import PreviewTandC from '../previewTermsAndCondition/PreviewTandC'

function First() {
  const [showpwd, setShowpwd] = useState(false)
  const [showrpwd, setShowrpwd] = useState(false)
  const [showTandC, setTandC] = useState(false)
  const [errors, setErrors] = useState({})
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    phone: '',
    location: '',
    pwd: '',
    cpwd: '',
    photo: '',
  })

  // useEffect(() => {
  //   scroll.scrollToTop({
  //     duration: 1000,
  //     smooth: 'easeInOutQuint',
  //   });
  // }, []);

  const dispatch = useDispatch()

  const textValid = (text, field, msg) => {
    if (!text.trim()) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: `${msg} is required` }))
      return false
    } else if (text.trim().length < 3) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: `${msg} cannot be lesser than 3 characters` }))
      return false
    } else if (text.trim().length > 15) {
      setErrors(prevErrors => ({ ...prevErrors, [field]: `${msg} cannot be greater than 15 characters` }))
      return false
    } else {
      return true
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.fname.trim()) {
      newErrors.fname = `First name is required`;
    } else if (formData.fname.trim().length < 3) {
      newErrors.fname = `First name cannot be lesser than 3 characters`;
    } else if (formData.fname.trim().length > 15) {
      newErrors.fname = `First name cannot be greater than 15 characters`;
    }

    if (!formData.lname.trim()) {
      newErrors.lname = `Last name is required`;
    } else if (formData.lname.trim().length < 3) {
      newErrors.lname = `Last name cannot be lesser than 3 characters`;
    } else if (formData.lname.trim().length > 15) {
      newErrors.lname = `Last name cannot be greater than 15 characters`;
    }

    const emailRegEx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email account is required'
    } else if (!emailRegEx.test(formData.email.trim())) {
      newErrors.email = 'Invalid email address'
    }

    if (formData.pwd !== formData.cpwd) {
      newErrors.cpwd = "Passwords don't match"
    }

    const contactPattern = /^[0-9]+$/
    if (!contactPattern.test(formData.phone.trim())) {
      newErrors.phone = 'Invalid contact address'
    }

    if (!formData.pwd.trim()) {
      newErrors.pwd = `Password is required`;
    } else if (formData.pwd.trim().length < 3) {
      newErrors.pwd = `Password cannot be lesser than 3 characters`;
    } else if (formData.pwd.trim().length > 15) {
      newErrors.pwd = `Password cannot be greater than 15 characters`;
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required'
    } else if (formData.location.trim().length < 3) {
      newErrors.location = 'House address cannot be less than 3 characters'
    }

    if(!formData.photo) {
      newErrors.photo = 'This field is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChg = (e) => {
    const { name, value, files } = e.target
    setFormData({
      ...formData, [name]: files ? files[0] : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      dispatch(addData(formData))
      setTandC(true)
    } else {
      console.log(errors)
    }
  }

  const nextPage = () => {
    dispatch(setPage())
  }

  return (
    <div data-aos="fade-zoom-in" className="login d-flex flex-column justify-content-center align-items-center">
      <div className="container">
        <div className="p-md-5">
          <p className='heading my-3'>Start Your Application</p>
          <small>step 1/3</small>
          <div className="loginform p-4 container">
            <p>Personal Information</p>
            <form className='row' onSubmit={handleSubmit}>
              <div className="my-1 col-md-6">
                <div className="form-label d-block h6">First name</div>
                <input placeholder='e.g John' type="text" className={errors.fname ? 'error' : ''} value={formData.fname} name="fname" onChange={handleChg} />
                {errors.fname && <p className='err_msg text-danger' style={{fontSize: '12px'}}>{errors.fname}</p>}
              </div>
              <div className="my-1 col-md-6">
                <div className="form-label d-block h6">Last name</div>
                <input placeholder='e.g Doe' type="text" className={errors.lname ? 'error' : ''} value={formData.lname} name="lname" onChange={handleChg} />
                {errors.lname && <p className='err_msg text-danger' style={{fontSize: '12px'}}>{errors.lname}</p>}
              </div>
              <div className="my-1 col-md-6">
                <div className="form-label d-block h6">Email</div>
                <input placeholder='e.g John Doe' type="email" className={errors.email ? 'error' : ''} value={formData.email} name="email" onChange={handleChg} />
                {errors.email && <p className='err_msg text-danger' style={{fontSize: '12px'}}>{errors.email}</p>}
              </div>
              <div className="my-1 col-md-6">
                <div className="form-label d-block h6">Password</div>
                <div className={errors.pwd ? "error d-flex border rounded-3 align-items-center px-2" : " d-flex border rounded-3 align-items-center px-2"}>
                  <input type={showpwd ? "text" : "password"} name="pwd" className='signupbtn' value={formData.pwd} onChange={handleChg} />
                  <div onClick={() => setShowpwd(prev => !prev)}>
                    <FaEye size={16} />
                  </div>
                </div>
                {errors.pwd && <p className='err_msg text-danger' style={{fontSize: '12px'}}>{errors.pwd}</p>}
              </div>
              <div className="my-1 col-md-6">
                <div className="form-label d-block h6">Confirm Password</div>
                <div className={errors.cpwd ? "error d-flex border rounded-3 align-items-center px-2" : " d-flex border rounded-3 align-items-center px-2"}>
                  <input type={showrpwd ? "text" : "password"} name="cpwd" className='signupbtn' value={formData.cpwd} onChange={handleChg} />
                  <div onClick={() => setShowrpwd(prev => !prev)}>
                    <FaEye size={16} />
                  </div>
                </div>
                {errors.cpwd && <p className='err_msg text-danger' style={{fontSize: '12px'}}>{errors.cpwd}</p>}
              </div>
              <div className="my-1 col-md-6">
                <div className="form-label d-block h6">Phone number</div>
                <input placeholder='e.g 0813445674' type="text" className={errors.phone ? 'error' : ''} value={formData.phone} onChange={handleChg} name="phone" />
                {errors.phone && <p className='err_msg text-danger' style={{fontSize: '12px'}}>{errors.phone}</p>}
              </div>
              <div className="my-1 col-md-6">
                <div className="form-label d-block h6">Current home address</div>
                <input placeholder='e.g Address' type="text" className={errors.location ? 'error' : ''} value={formData.location} onChange={handleChg} name="location" />
                {errors.location && <p className='err_msg text-danger' style={{fontSize: '12px'}}>{errors.location}</p>}
              </div>
              <div className="my-1 col-md-6">
                <div className="form-label d-block h6">Passport photo</div>
                <input type="file" className={errors.photo ? 'error' : ''} onChange={handleChg} name="photo" />
                {errors.photo && <p className='err_msg text-danger' style={{fontSize: '12px'}}>{errors.photo}</p>}
              </div>
              <div className="my-3 d-flex align-items-center gap-2 ">
                <button
                  type="submit"
                  className="btn btn-dark btn-lg"
                >
                  Read Terms And Condition
                </button>
                {showTandC && (
                  <div className='position-fixed tandc'>
                    <div className="show_terms">
                      <div onClick={() => setTandC(false)} className="closeT">
                        <IoMdClose />
                      </div>
                      <PreviewTandC />
                      <button className='my-3 btn btn-secondary w-100' onClick={nextPage}>Agree terms and conditions</button>
                    </div>
                  </div>
                )}
              </div>
            </form>
          </div>
          <small className='h6 my-2 d-flex justify-content-center text-center mt-5'>I already have an account? <NavLink href='/login' className='text-primary text-capitalize'>Login</NavLink></small>
          <small className='h6 d-flex justify-content-center text-center mt-1'>are you an admin? <NavLink href='/adminregister' className='text-primary text-capitalize'>Register Admin</NavLink></small>
        </div>
      </div>
    </div>
  )
}

export default First
