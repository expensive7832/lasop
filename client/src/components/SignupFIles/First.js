import React, { useState } from 'react'
import "./../Pages/login.css"
import { AiOutlineEyeInvisible} from "react-icons/ai"
import { NavLink } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addData, setPage } from '../../Redux/Slices/onboardslice'
import { BsArrowRightSquare } from 'react-icons/bs'
import { FaEye } from 'react-icons/fa'
import {toast} from "react-toastify"

import PreviewTandC from '../PreviewTandC'

function First() {

  const [showpwd, setShowpwd] = useState(false)
  const [showrpwd, setShowrpwd] = useState(false)
  const [showTandC, setTandC] = useState(false)

  const [showContinue, setShowContinue] = useState(false)

  const dispatch = useDispatch()


  const handleSubmit = (e) =>{
    e.preventDefault()
    const form = new FormData(e.currentTarget)

    const data = {
        fname: form.get("fname"),
        lname: form.get("lname"),
        email: form.get("email"),
        phone: form.get("phone"),
        location: form.get("loc"),
        pwd: form.get("pwd"),
        cpwd: form.get("cpwd"),
        photo: form.get("photo"),
    }

    if(data.fname === "" || data.lname === "" || data.email === "" || data.pwd  === ""){
      
      toast.warn("Please enter missing field")
    }else if(data?.photo.name === ""){
      toast.warn("upload your photo")
    }
    else if(data.pwd !== data.cpwd){

      toast.warn("Passwords Do not match")
    }else{
     
      dispatch(addData(data))
    dispatch(setPage())
    }

    

  }

  return (
    <div data-aos="fade-zoom-in" className="login d-flex flex-column justify-content-center align-items-center">
      <div className="container">

  
       

      
          <div className="p-md-5">
          

           

            <p className='heading my-3'>Start Your Application</p>

            <small>step 1/3</small>

            <div className="loginform p-4 container  ">
              <p>Personal Information</p>

              <form className='row' onSubmit={(e) => handleSubmit(e)}>
                <div className="my-1 col-md-6">
                  <div className="form-label d-block">FirstName</div>
                  <input placeholder='e.g John' type="text" className="" name="fname" />
                </div>
                
                <div className="my-1 col-md-6">
                  <div className="form-label d-block">LastName</div>
                  <input  placeholder='e.g Doe' type="text" className="" name="lname" />
                </div>

                <div className="my-1 col-md-6">
                  <div className="form-label d-block">Email</div>
                  <input  placeholder='e.g John Doe' type="text" className="" name="email" />
                </div>

                <div className="my-1 col-md-6">
                  <div className="form-label d-block">Password</div>
                 <div className="d-flex border rounded-3 align-items-center px-2">
                 <input type={`${showpwd === true ? "text": "password"}`} className="signupbtn" name="pwd" />
                  <div onClick={() => setShowpwd((prev) => !prev)}>
                    <FaEye size={24}/>
                  </div>
                 </div>
                </div>

                <div className="my-1 col-md-6">
                  <div className="form-label d-block">Confirm Password</div>
                  <div className="d-flex border rounded-3 align-items-center px-2">
                 <input  type={`${showrpwd === true ? "text": "password"}`} className="signupbtn" name="cpwd" />
                  <div onClick={() => setShowrpwd((prev) => !prev)}>
                    <FaEye size={24}/>
                  </div>
                 </div>
                </div>

                <div className="my-1 col-md-6">
                  <div className="form-label d-block">Phone Number</div>
                  <input  placeholder='e.g 0813445674' type="text" className="" name="phone" />
                </div>

                <div className="my-1 col-md-6">
                  <div className="form-label d-block">Location</div>
                  <input  placeholder='e.g Address' type="text" className="" name="loc" />
                </div>

                <div className="my-1 col-md-6">
                  <div className="form-label d-block">Photo</div>
                  <input type="file" className="" name="photo" />
                </div>

                <div className="my-3 d-flex align-items-center gap-2 ">
                 
                 
               
              {
                showTandC === false
                &&  <button
                type="button"
                class="btn btn-dark btn-lg"
                onClick={() => setTandC(true)}
              >
              Read Terms And Condition
              </button>
              }
                
              {
                showTandC &&
                <div className='position-absolute tandc top-25 start-50  translate-middle p-3 bg-white shadow-lg '>
                 <PreviewTandC/>

                                

                <button  className='my-3 btn btn-secondary w-100'>Agree terms and conditions</button>
               

              </div>
              }
                
              
                
                </div>



               
              </form>

            </div>

            <small className=' h6 my-2 d-flex justify-content-center text-center mt-5'>I already have an account? <NavLink href='/login' className='text-primary text-capitalize '>Login</NavLink></small>
            <small className=' h6 d-flex justify-content-center text-center mt-1'> are you an admin ?   <NavLink href='/adminregister' className='text-primary text-capitalize '>Register Admin</NavLink></small>
            
          </div>
          
      

      </div>

      
    </div>
  )
}

export default First