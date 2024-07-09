import React, { useLayoutEffect, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./../Pages/login/login.css"
// import { animateScroll as scroll } from 'react-scroll';
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { NavLink, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearData, goBack } from '../../Redux/Slices/onboardslice'
import { FaArrowLeft } from "react-icons/fa";
import axios from 'axios'
import { toast } from 'react-toastify'
import { usePaystackPayment } from 'react-paystack';
import { useNavigate } from 'react-router-dom'
import { activatePayment } from '../../Redux/Slices/userSlice';
import { IoMdClose } from "react-icons/io";
import './terms.css';

function Third() {
  // useEffect(() => {
  //   scroll.scrollToTop({
  //     duration: 1000,
  //     smooth: 'easeInOutQuint',
  //   });
  // }, []);

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const userinfo = useSelector((state) => state?.onboard?.userData)
  const token = useSelector((state) => state?.user?.token)
  let id = useSelector((state) => state?.onboard?.id)

  const [welMsg, setWelMsg] = useState(false);

  const navLogin = () => {
    navigate("/login");
  }

  // alert(token)
  let user = useSelector((state) => state?.user)

  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    await axios.post(`${process.env.REACT_APP_API_URL}/receipt/${id}`, form, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: token != null ? `Bearer ${token}` : undefined
      }
    })
      .then((response) => {
        if (response?.data?.message === "Congratulations, Your application is in process") {
          toast.success("Congratulations, Your application is in process")

          setLoading(false)
          navigate("/")
        }
      })
      .catch((err) => {
        setLoading(false)
        if (err?.response?.data?.message === "Authentication Failed") {
          setWelMsg(true)
        }
        else if (err?.response?.data?.message === "Provide the receipt") {
          toast.error(err.response?.data?.message)
        }
      })

    // if(amt < min){
    //   toast.error("Amount must be at least N"+ min )
    // }else{
    //   init(onSuccess, onClose)
    // }


    // dispatch(clearData())

  }

  return (
    <>
      {user?.info?.status === 1 ?

        navigate("/dashboard/syllabus")

        :

        <div data-aos="fade-zoom-in" className="login d-flex flex-column justify-content-center align-items-center">
          <div className="container-fluid">
            <div className=" arrow" onClick={() => dispatch(goBack())}>
              <FaArrowLeft />
            </div>
            <div className="p-md-5 ">
              <p className='heading my-3'>Complete Your Application</p>
              <small className='h6 mb-2'>step 3/3</small>
              <div className="loginform p-4 ">
                <p>Payment / <Link to='/login'>Skip payment</Link></p>
                <div className="card">
                  <div className="card-body">
                    <div>
                      <label htmlFor="" className="form-label">Account name</label>
                      <p className="lead fw-bold">Lagos School Of Programming</p>
                    </div>
                    <div className='my-2'>
                      <label htmlFor="" className="form-label">Bank</label>
                      <h4>Zenith Bank</h4>
                    </div>

                    <div>
                      <label htmlFor="" className="form-label">Account Number</label>
                      <h4>1223017613</h4>
                    </div>
                  </div>
                </div>

                <form onSubmit={(e) => handleSubmit(e)}>
                  <div className="my-3">
                    <label htmlFor="" className='form-label'>Upload Reciept</label>
                    <input type="file" className="form-control" name="image" />
                  </div>

                  <button className='my-3 btn btn-primary w-100'>
                    {loading === false ? "Upload" : <Spinner color='#fff' size={28} />}
                  </button>
                </form>
              </div>
              <small className='info p d-flex justify-content-center text-center mt-5'>I already have an account? <NavLink href='/login' className='text-primary'>Login</NavLink></small>
            </div>
          </div>
          {
            welMsg && <div className="wel_msg">
              <div className="pop_wel">
                <div onClick={() => setWelMsg(false)} className="closeT">
                  <IoMdClose />
                </div>
                <div className="pop_wel_head">
                  <h3>Lagos School of Programming welcomes you with warm hand</h3>
                  <h6>{userinfo.fname} {userinfo.lname}</h6>
                </div>
                <div className="pop_wel_info">
                  <p>Click the button below to login to your dashboard</p>
                  <button onClick={navLogin}>Login</button>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </>
  )
}

export default Third