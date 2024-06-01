import React, { useLayoutEffect, useState } from 'react'
import { FaGripHorizontal, FaUserCircle } from 'react-icons/fa'
import "./staffprofile.css"
import img from "./../../../assets/user1.png"
import before from "./../../../assets/profile-circle.svg"
import after from "./../../../assets/Line.png"
import message from "./../../../assets/messages.svg"
import { Link, useNavigate } from 'react-router-dom'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

import "./updateuser.css"

function UpdateUser({ id }) {


    const [roleStatus, setRoleStatus] = useState(false)
    const navigate = useNavigate()

    const [data, setData] = useState(null)

    const token = useSelector((state) => state?.user?.token)

    const handleChangeRoles = async(value) =>{

        setRoleStatus(true)

        if(data?.role === value){
            toast.warn("user is " + value + " already")
            setRoleStatus(false)
        }else{
            await axios.post(`${process.env.REACT_APP_API_URL}/updaterole`, {
                role: value,
                id
            })
            .then((res) =>{
                toast.success("update successful")
                setRoleStatus(false)
            })
            .catch((err) =>{
                console.log(err);
                setRoleStatus(false)
            })
        }

    }
  
   

    useLayoutEffect(() =>{
        axios.get(`${process.env.REACT_APP_API_URL}/user/${id}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            
            setData(res.data);
           
        })
        .catch((err) =>{
            toast.error(err?.response?.data?.mesage)
            navigate("/login")
        })
    }, [])

    return (
        <div className="profile">
            <div className='border-bottom border-primary border-1 p-1'>
                <div className="row justify-content-between">
                    <div className="col-md-6 col-12"><h3> User/Profile</h3></div>
                    <div className="col-12 col-md-6">
                        <div className="d-flex gap-2 justify-content-md-end justify-content-center">



                           

                         <select onChange={(e) => handleChangeRoles(e.target.value)} className='roles' name="" id="">

                          {["student", "staff", "admin" ]?.map((each) =>(
                            <option 
                            selected={each == data?.role ? true : false }
                            key={each} 
                            value={each}
                            >{each}
                            </option>
                          ))}

                         </select>
                         

                            <div className="border border-primary rounded p-1">
                                <img src={message} alt="message" />
                                <p className="text-primary d-inline">message</p>
                            </div>
                            <div className="rounded p-1">
                              <Dropdown >
                                <DropdownToggle className='bg-white'>
                                <FaGripHorizontal color='#999'/>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem className="">
                                    <Link className='nav-link'>Confirm Payment</Link>
                                    </DropdownItem>
                                    <DropdownItem className="">
                                    <Link className='nav-link'>Re-admit</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {
                roleStatus && 
                <div className="position-absolute top-50 start-50 translate-middle">
                <img style={{width:"5rem", height:"5rem"}} src={require("./../../../assets/loading.gif")} alt="" />
            </div>
            }


            <div className="info">
                <div className="topinfo">
                    <div className=' '>
                        <small className='ms-2'>PERSONAL INFORMATION</small>
                    </div>

                    <div className="info-body py-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3 col-sm-6 col-12">
                                    <img src={data?.imgurl} alt="profile" />
                                </div>
                                <div className="col-md-3 col-sm-6 col-12">
                                    <div>
                                        <label className='fw-bold' htmlFor="">Name</label>
                                        <h6>{data?.fname} {data?.lname}</h6>
                                    </div>
                                    <div>
                                        <label className='fw-bold' htmlFor="">Phone Number</label>
                                        <a className='nav-link' href={`tel:${data?.phone}`}>{data?.phone}</a>
                                    </div>

                                    <div>
                                        <label className='fw-bold' htmlFor="">Current Address</label>
                                        <h6>{data?.address}</h6>
                                    </div>
                                </div>
                                <div className="col-md-3 col-sm-6 col-12">
                                    <div>
                                        <label className='fw-bold' htmlFor="">Sex</label>
                                        <h6>Male</h6>
                                    </div>
                                    <div>
                                        <label className='fw-bold' htmlFor="">Status</label>
                                        <h6>{data?.status === 1 ? "paid" : "unpaid"}</h6>
                                    </div>
                                    <div>
                                        <label className='fw-bold' htmlFor="">Registration Date</label>
                                        <h6>{new Date(data?.datecreated).toLocaleDateString()}</h6>
                                    </div>

                                </div>
                                <div className="col-md-3 col-sm-6 col-12">
                                    <div>
                                        <label htmlFor="">Deffered To</label>
                                        <h6>11/01/2023</h6>
                                    </div>
                                    <div>
                                        <label htmlFor="">Cohort</label>
                                        <h6>{data?.chrttitle}</h6>
                                    </div>
                                    <div>
                                        <label className='fw-bold' htmlFor="">Center</label>
                                        <h6 className=''>{data?.center} {data?.mos}</h6>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div className="bottominfo">
                    <div>
                        <small className='ms-2'>COURSE INFORMATION</small>
                    </div>

                    <div className="info-body py-3">
                        <div className="container-fluid">
                            <div className="row">
                                <div className="col-md-3 col-sm-6 col-12">
                                    <img src={data?.imgurl} alt="profile" />
                                </div>
                                <div className="col-md-3 col-sm-6 col-12">
                                    <div>
                                        <label htmlFor="">Course Of Study</label>
                                        <h6>{data?.title}</h6>
                                    </div>
                                    <div>
                                        <label htmlFor="">Course Duration</label>
                                        <h6>{data?.duration}</h6>
                                    </div>
                                    <div>
                                        <label htmlFor="">Started</label>
                                        <h6>{new Date(data?.startdate).toLocaleDateString()}</h6>
                                    </div>

                                </div>
                                <div className="col-md-3 col-sm-6 col-12">
                                    <div>
                                        <label htmlFor="">Tuition Fee</label>
                                        <h6>{data?.price}</h6>
                                    </div>
                                    <div>
                                        <label htmlFor="">Fee Balance</label>
                                        <h6>None</h6>
                                    </div>
                                    <div>
                                        <label htmlFor="">Due Date </label>
                                        <h6>None</h6>
                                    </div>

                                </div>


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UpdateUser