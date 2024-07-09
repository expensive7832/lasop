import React, { useLayoutEffect, useState, useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import "./../Pages/login/login.css";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
// import { animateScroll as scroll } from 'react-scroll';
import { addData, setPage, goBack, setId } from '../../Redux/Slices/onboardslice';
import axios from "axios";
import { toast } from 'react-toastify';
import { usePaystackPayment } from 'react-paystack';
import { useNavigate } from 'react-router-dom';
import './terms.css'

function Second() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  // useEffect(() => {
  //   scroll.scrollToTop({
  //     duration: 1000,
  //     smooth: 'easeInOutQuint',
  //   });
  // }, []);

  const storedata = useSelector(state => state.onboard.userData)

  const navigate = useNavigate();

  // Payment function
  const config = {
    reference: (new Date()).getTime().toString(),
    email: storedata.email,
    amount: 200000 * 100,
    publicKey: 'pk_test_8b50893a5891d0e9440ac570f6c142448d2161e3'
  }

  const onSuccess = (e) => {
  };

  const onClose = (error) => {
    setLoading(false);
    toast.error('Payment failed');
    console.error(error);
  }

  //initialize payment configuration
  const initializePayment = usePaystackPayment(config);

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)
    const form = new FormData(e.currentTarget);

    const data = {
      course: form.get("course"),
      center: form.get("center"),
      study: form.get("study"),
      agreement: form.get("agreement"),
    }

    let registerData = {
      course: data.course,
      cohort: data.cohort,
      center: data.center,
      mos: data.study,
      agreement: data.agreement,
      fname: storedata.fname,
      lname: storedata.lname,
      email: storedata.email,
      password: storedata.pwd,
      phone: storedata.phone,
      loc: storedata.location,
      photo: storedata.photo,
    }

    axios.post(`https://lasopbackend.net/register`, registerData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    })
      .then((res) => {
        setLoading(false)
        toast.success(res?.data?.message);
        dispatch(setId(res?.data?.info?.id));

        // navigate("/login");
        dispatch(setPage())
      })
      .catch((err) => {
        setLoading(false);
        toast.warn(err?.response?.data?.message);
      })

    dispatch(addData(data))
  }

  const [courses, setCourses] = useState(null);
  const [mos, setmos] = useState(null);
  const [center, setCenter] = useState(null);

  useLayoutEffect(() => {
    axios.get(`https://lasopbackend.net/getcourse`)
      .then((res) => setCourses(res?.data))
      .catch((err) => console.log(err))

    axios.get(`https://lasopbackend.net/getmos`)
      .then((res) => setmos(res?.data))
      .catch((err) => console.log(err))

    axios.get(`https://lasopbackend.net/getcenter`)
      .then((res) => setCenter(res?.data))
      .catch((err) => console.log(err))

  }, [])

  return (
    <div data-aos="fade-zoom-in" className="login d-flex flex-column justify-content-center align-items-center">
      <div className="container-fluid">
        <div className=" arrow" onClick={() => dispatch(goBack())}>
          <FaArrowLeft />
        </div>

        <div className="p-md-5 ">
          <p className='heading my-3'>Continue Your Application</p>
          <small>step 2/3</small>

          <div className="loginform p-4 ">
            <p className='h5'>Course Of Study</p>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="my-1">
                <div className="form-label d-block h6">Course</div>
                <select className="form-control select" name="course"  >
                  {courses?.map(course => (
                    <option value={course?.id}>{course?.title}</option>
                  ))}
                </select>
              </div>
              <div className="my-1">
                <div className="form-label d-block h6">Center</div>
                <select className="form-control select" name="center"  >
                  {center?.map(cent => (
                    <option value={cent?.id}>{cent?.title}</option>
                  ))}
                </select>
              </div>
              <div className="my-1">
                <div className="form-label d-block h6">Mode Of Study</div>
                <select className="form-control select" name="study" >
                  {mos?.map(m => (
                    <option value={m?.id}>{m?.title}</option>
                  ))}
                </select>
              </div>
              <button className='my-3 btn btn-primary w-100'>
                {loading === false ? "Continue" : <Spinner color='#fff' size={28} />}
              </button>
            </form>
          </div>
          <small className='info p d-flex justify-content-center text-center mt-5'>I already have an account? <NavLink href='/login' className='text-primary'>Login</NavLink></small>
        </div>
      </div>
    </div>
  )
}

export default Second