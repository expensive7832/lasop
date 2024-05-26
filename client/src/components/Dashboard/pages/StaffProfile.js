import React from 'react'
import { FaUserCircle, FaGripHorizontal } from 'react-icons/fa'
import "./staffprofile.css"
import img from "./../../../assets/user1.png"
import message from "./../../../assets/messages.svg"
import { Link } from 'react-router-dom'

import { Dropdown, DropdownItem, DropdownMenu , DropdownToggle} from 'reactstrap'

function StaffProfile({  id }) {
    return (
        <div className="profile">
            <div className='border-bottom border-primary border-1 p-1'>
           
            <div className="row justify-content-between">
                    <div className="col-md-6 col-12"><h3> Staff/Non-Academics/Profile</h3></div>
                    <div className="col-12 col-md-6">
                        <div className="d-flex gap-2 justify-content-md-end justify-content-center">
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

            <div className="info">
            <div className="topinfo">
                <div className=' '>
                   <small className='ms-2'>PERSONAL INFORMATION</small>
                </div>

                <div className="info-body py-3">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 col-12">
                                <img src={img} alt="profile" />
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <div>
                                    <label htmlFor="">Name</label>
                                    <h6>Yusuf Jimoh</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Phone Number</label>
                                    <h6>0987654568</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Email</label>
                                    <h6>a@b.com</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Current Address</label>
                                    <h6>No, 2 Ajah cresent road</h6>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <div>
                                    <label htmlFor="">Staff ID</label>
                                    <h6>#LA1234</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Job Title</label>
                                    <h6>Frontend Instructor</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Date Of Employment</label>
                                    <h6>11/11/2022</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Nationality</label>
                                    <h6>Nigeria</h6>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <div>
                                    <label htmlFor="">Net Salary</label>
                                    <h6>1.2M</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Commendation</label>
                                    <h6>18</h6>
                                </div>
                                <div>
                                    <label className='text-danger' htmlFor="">Queries</label>
                                    <h6 className='text-danger'>2</h6>
                                </div>
                                <div>
                                    <label className='text-danger' htmlFor="">Undone Task</label>
                                    <h6 className='text-danger'>10</h6>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className="bottominfo">
                <div>
                    <small className='ms-2'>OTHER INFORMATION</small>
                </div>

                <div className="info-body py-3">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-3 col-sm-6 col-12">
                                <img src={img} alt="profile" />
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <div>
                                    <label htmlFor="">Name</label>
                                    <h6>Yusuf Jimoh</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Phone Number</label>
                                    <h6>0987654568</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Email</label>
                                    <h6>a@b.com</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Current Address</label>
                                    <h6>No, 2 Ajah cresent road</h6>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <div>
                                    <label htmlFor="">Staff ID</label>
                                    <h6>#LA1234</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Job Title</label>
                                    <h6>Frontend Instructor</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Date Of Employment</label>
                                    <h6>11/11/2022</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Nationality</label>
                                    <h6>Nigeria</h6>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-12">
                                <div>
                                    <label htmlFor="">Net Salary</label>
                                    <h6>1.2M</h6>
                                </div>
                                <div>
                                    <label htmlFor="">Commendation</label>
                                    <h6>18</h6>
                                </div>
                                <div>
                                    <label className='text-danger' htmlFor="">Queries</label>
                                    <h6 className='text-danger'>2</h6>
                                </div>
                                <div>
                                    <label className='text-danger' htmlFor="">Undone Task</label>
                                    <h6 className='text-danger'>10</h6>
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

export default StaffProfile