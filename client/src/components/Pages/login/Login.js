import React, { useState } from 'react'
import classroom from "../../../assets/classroom.png"
import "./login.css"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { Modal, ModalBody, ModalHeader, NavLink } from 'reactstrap'
import Navbar from '../../navbarfiles/Navbar'
import Footer from '../../footerfiles/Footer'
import { useDispatch } from 'react-redux'
import { infoCtrl, loginCtrl } from '../../../Redux/Slices/userSlice'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Spinner } from 'reactstrap'

function Login() {
  


  const [show, setShow] = useState(false)
  const [success, setSuccess] = useState(false)
  const [page, setpage] = useState(1)
  const [email, setEmail] = useState("")
  const [showforgetpassword, setShowForgetPassword] = useState(false)
  const [showforgetpasswordStatus, setShowForgetPasswordStatus] = useState(false)

  const toggle = () => {
    setShowForgetPassword((prev) => !prev)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    setSuccess(true)
    const form = new FormData(e.currentTarget)

    await axios.post(`${process.env.REACT_APP_API_URL}/login`, form)
      .then((res) => {
        if (res?.data?.message === "login successful") {
          setSuccess(false)
          dispatch(loginCtrl(res?.data?.token))
          dispatch(infoCtrl(res?.data?.data))
          navigate("/")
          toast.success("login successful")
        }
      })
      .catch((err) =>{
         setSuccess(false)
         toast.error(err?.response?.data)
      })


  }

  const handleForgetPassword = async (e) => {
    e.preventDefault();

    setShowForgetPasswordStatus(true)

    const form = new FormData(e.currentTarget)

    await axios.post(`${process.env.REACT_APP_API_URL}/forgetpassword`, form)
      .then((res) => {
        setEmail(res?.data?.email)
        setShowForgetPasswordStatus(false)
        setpage(2)
      }).catch((err) => {
        setShowForgetPasswordStatus(false)
        toast.error(err?.response?.data?.message);
      })

  }

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    setShowForgetPasswordStatus(true)

    const form = new FormData(e.currentTarget)
    if( form.get("password") === "" ){
      toast.warn("please enter  password")
      setShowForgetPasswordStatus(false)
    }
    else if(form.get('password') !== form.get("retype")){
      toast.warn("password do not match")
      setShowForgetPasswordStatus(false)
    }else{

      form.append("email", email)

      await axios.post(`${process.env.REACT_APP_API_URL}/changepassword`, form)
        .then((res) => {
          setShowForgetPasswordStatus(false)
          toast.success("password changed successfully")
          setShowForgetPassword(false)
          setpage(1)
        }).catch((err) => {
          setShowForgetPasswordStatus(false)
          toast.error(err?.response?.data?.message);
        })
    }


  }

  return (
    <>
      <div  className="login d-flex flex-column justify-content-center align-items-center">
        <div className="container-fluid">

          <div className="row align-items-lg-center  ">
            <div className="p-md-5 p-2  col-12 col-md-6 position-relative">
             
            

              <p className='heading m-4 m-md-0'>WELCOME BACK</p>

              <div className="loginform  p-4">
                <p>Input Your Details</p>

                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="my-1">
                    <div className="form-label d-block">Email</div>
                    <input type="email" className="" name="email" />
                  </div>

                  <div className="pwd my-1">
                    <div className="form-label d-block">Password</div>
                    <div className="d-flex align-items-center position-relative">
                      <input type={`${show === false ? "password" : "text"}`} className="position-absolute" name="password" />
                      <AiOutlineEyeInvisible onClick={(e) => setShow(!show)} className='d-block ms-auto position-relative left-100' size={28} />
                    </div>
                  </div>

                  <button className='my-3 btn btn-primary w-100'>
                    {success ? <Spinner/> : "Login"}
                  </button>

                </form>

              </div>

              {/* forget password */}

              <div>
                <Modal isOpen={showforgetpassword} toggle={toggle}>
                  <ModalHeader toggle={toggle}>Forget Password</ModalHeader>
                  <ModalBody>

                    <div className="container">
                      {page === 1 ?
                        <form onSubmit={(e) => handleForgetPassword(e)}>

                          <input name='email' type="email" placeholder='enter your email' className="form-control" />

                          <button className="btn btn-dark my-3">
                            {showforgetpasswordStatus === true ?
                              <div className="d-flex justify-content-center ">
                                <Spinner />
                              </div>

                              :

                              "Forget Password"
                            }
                          </button>

                        </form>
                        :

                        <form  onSubmit={(e) => handlePasswordChange(e)}>
                         <div>
                         <input name='password' type="password" className="form-control" />
                         <label htmlFor="" className="form-label">new password</label>
                         </div>
                         
                         <div className='my-2'>
                         <input name='retype' type="password" className="form-control" />
                         <label htmlFor="" className="form-label">Retype Password</label>
                         </div>

                          <button className="btn btn-dark my-3">
                            {showforgetpasswordStatus === true ?
                              <div className="d-flex justify-content-center ">
                                <Spinner />
                              </div>

                              :

                              "update"
                            }
                          </button>

                        </form>

                      }
                    </div>

                  </ModalBody>

                </Modal>
              </div>



              <div className="container">
                <div className="row justify-content-center ">
                  <div className="col-md-6">
                    <small className='info p d-flex  text-center mt-5'>Dont you have an account?  &nbsp; &nbsp; <NavLink href='/signup' className='text-primary'>Signup</NavLink></small>
                    <small
                      role="button"
                      className="p text-primary fw-bold  mt-2"
                      onClick={() => toggle()}
                    >
                      Forget Password
                    </small>
                  </div>
                </div>
              </div>

            </div>
            <div className="col-12 col-md-6 d-none d-md-block">
              <img src={classroom} alt="classroom" className='img-fluid classroom' />

            </div>
          </div>

        </div>


      </div>
    </>
  )
}

export default Login