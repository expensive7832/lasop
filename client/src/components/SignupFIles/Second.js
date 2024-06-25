import React, { useLayoutEffect, useState } from 'react';
import { BsArrowLeftCircle, BsArrowLeftSquare, BsArrowRightCircle, BsArrowRightSquare } from "react-icons/bs";
import "./../Pages/login/login.css";
import { AiOutlineEyeInvisible } from "react-icons/ai";
import { NavLink, Spinner } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addData, setPage, goBack, setId } from '../../Redux/Slices/onboardslice';
import axios from "axios";
import { toast } from 'react-toastify';
import { usePaystackPayment } from 'react-paystack';
import { useNavigate } from 'react-router-dom';

function Second() {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const storedata = useSelector(state => state.onboard.userData)

  const navigate = useNavigate();

  // Payment function
  const config = {
    reference: (new Date()).getTime().toString(),
    email: storedata.email,
    amount: 200000 * 100,
    publicKey: process.env.REACT_APP_PAYSTACK_SECRET_KEY
  }

  const onSuccess = (e) => {
    setLoading(true)
    const form = new FormData(e.currentTarget);

    const data = {
      course: form.get("course"),
      cohort: form.get("cohort"),
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

        navigate("/login");
      })
      .catch((err) => {
        setLoading(false);
        toast.warn(err?.response?.data?.message);
      })

    dispatch(addData(data))
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
    // setLoading(true)
    // const form = new FormData(e.currentTarget);

    // const data = {
    //   course: form.get("course"),
    //   cohort: form.get("cohort"),
    //   center: form.get("center"),
    //   study: form.get("study"),
    //   agreement: form.get("agreement"),
    // }

    // let registerData = {
    //   course: data.course,
    //   cohort: data.cohort,
    //   center: data.center,
    //   mos: data.study,
    //   agreement: data.agreement,
    //   fname: storedata.fname,
    //   lname: storedata.lname,
    //   email: storedata.email,
    //   password: storedata.pwd,
    //   phone: storedata.phone,
    //   loc: storedata.location,
    //   photo: storedata.photo,
    // }

    // await axios.post(`https://lasopbackend.net/register`, registerData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data"
    //   }
    // })
    //   .then((res) => {
    //     setLoading(false)
    //     toast.success(res?.data?.message);
    //     dispatch(setId(res?.data?.info?.id));

    //     navigate("/login");
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //     toast.warn(err?.response?.data?.message);
    //   })

    // dispatch(addData(data))
    initializePayment(onSuccess, onClose);
  }

  const [courses, setCourses] = useState(null);
  const [mos, setmos] = useState(null);
  const [center, setCenter] = useState(null);
  const [cohort, setCohort] = useState(null);

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

    axios.get(`https://lasopbackend.net/getchort`)
      .then((res) => setCohort(res?.data))
      .catch((err) => console.log(err))

  }, [])

  return (
    <div data-aos="fade-zoom-in" className="login d-flex flex-column justify-content-center align-items-center">
      <div className="container-fluid">
        <div className="d-flex justify-content-evenly">
          <button className='btn btn-md btn-dark' onClick={() => dispatch(goBack())}>
            <BsArrowLeftSquare />
          </button>
          <button className='btn btn-md btn-dark' onClick={() => dispatch(setPage())}>
            <BsArrowRightSquare />
          </button>
        </div>

        <div className="p-md-5 ">
          <p className='heading my-3'>Start Your Application</p>
          <small>step 2/3</small>

          <div className="loginform p-4 ">
            <p>Course Of Study</p>

            <form onSubmit={(e) => handleSubmit(e)}>
              <div className="my-1">
                <div className="form-label d-block">Course</div>
                <select className="form-control" name="course"  >
                  {courses?.map(course => (
                    <option value={course?.id}>{course?.title}</option>
                  ))}
                </select>
              </div>
              <div className="my-1">
                <div className="form-label d-block">Cohort</div>
                <select className="form-control" name="cohort"  >
                  {cohort?.map(coh => (
                    <option value={coh?.id}>{coh?.title}</option>
                  ))}
                </select>
              </div>
              <div className="my-1">
                <div className="form-label d-block">Center</div>
                <select className="form-control" name="center"  >
                  {center?.map(cent => (
                    <option value={cent?.id}>{cent?.title}</option>
                  ))}
                </select>
              </div>
              <div className="my-1">
                <div className="form-label d-block">Mode Of Study</div>
                <select className="form-control" name="study" >
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