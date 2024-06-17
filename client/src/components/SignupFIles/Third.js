import React, { useLayoutEffect, useState } from 'react'
import "./../Pages/login/login.css"
import { AiOutlineEyeInvisible } from "react-icons/ai"
import { NavLink, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { clearData, goBack } from '../../Redux/Slices/onboardslice'
import { BsArrowLeftSquare, BsArrowRightSquare } from 'react-icons/bs'
import axios from 'axios'
import { toast } from 'react-toastify'
import { usePaystackPayment } from 'react-paystack';
import { useNavigate } from 'react-router-dom'
import { activatePayment } from '../../Redux/Slices/userSlice'

function Third() {

  const navigate = useNavigate()


  const dispatch = useDispatch()
  const userinfo = useSelector((state) => state?.onboard?.userData)
  const token = useSelector((state) => state?.user?.token)
  let id = useSelector((state) => state?.onboard?.id)


  // alert(token)

  let user = useSelector((state) => state?.user)

  const [loading, setLoading] = useState(false)


 

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const form = new FormData(e.currentTarget)
    await axios.post(`${process.env.REACT_APP_API_URL}/receipt/${id}`, form, {
      headers:{
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
          navigate("/login")
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

    <div className="d-flex justify-content-end">
      <button className='btn btn-md btn-dark' onClick={() => dispatch(goBack())}>
        <BsArrowLeftSquare />
      </button>


    </div>
    <div className="p-md-5 ">


      <p className='heading my-3'>Start Your Application</p>

      <small>step 3/3</small>

      <div className="loginform p-4 ">
        <p>Payment</p>

        <div className="card">
          <div className="card-body">
            <div>
              <label htmlFor="" className="form-label">Bank Name</label>
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

        {/* <form onSubmit={(e) => handleSubmit(e)}>
            <div className="my-1">
              <input value={amt} onChange={(e) => setAmount(e.target.value)} min={min} max={min * 2} type="text" className="" name="amount" disable/>
            </div>
            


            
            
            <button className='my-3 btn btn-primary w-100'>Pay</button>
           
          </form> */}

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

</div>
  }
  </>
  )
}

export default Third