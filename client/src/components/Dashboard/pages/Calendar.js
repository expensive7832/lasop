import React, { useEffect, useLayoutEffect, useState } from 'react'
import { FaEye, FaGreaterThan, FaLessThan } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { BsFilter, BsPlus, BsThreeDots } from 'react-icons/bs'
import { CiLocationArrow1 } from "react-icons/ci"
import { FacebookIcon, FacebookShareButton, LinkedinIcon, LinkedinShareButton, TwitterIcon, TwitterShareButton, WhatsappIcon, WhatsappShareButton } from 'react-share'
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'

function Calendar() {

    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(1)
    const [pagination, setPagination] = useState(1)
    const [status, setStatus] = useState(false)
    const [courses, setCourses] = useState([])
    const [mos, setMos] = useState([])
    const [center, setCenter] = useState([])
    const [chrt, setChrt] = useState([])
    const [calendarData, setCalendarData] = useState([])
    const [notificationOpen, setNotificationOpen] = useState(false)

    const toggleNotification = () => setNotificationOpen((prevState) => !prevState);

    const token = useSelector((state) => state?.user?.token)
    const role = useSelector((state) => state?.user?.info?.role)



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_URL}/getcourse`)
            .then((res) => setCourses(res?.data))
            .catch((err) => console.log(err))

        axios.get(`${process.env.REACT_APP_API_URL}/getmos`)
            .then((res) => setMos(res?.data))
            .catch((err) => console.log(err))

        axios.get(`${process.env.REACT_APP_API_URL}/getcenter`)
            .then((res) => setCenter(res?.data))
            .catch((err) => console.log(err))

        axios.get(`${process.env.REACT_APP_API_URL}/calendar`)
            .then((res) => setCalendarData(res?.data))
            .catch((err) => console.log(err))

        axios.get(`${process.env.REACT_APP_API_URL}/getchrt`)
            .then((res) => setChrt(res?.data))
            .catch((err) => console.log(err))
    }, [])

    let data = calendarData?.filter((item) => item?.cid === activeTab)



    const handleCalendar = async (e) => {
        e.preventDefault()

        const form = new FormData(e.currentTarget)
        
        console.log(form.get("start"));
        console.log(form.get("end"));

        // setStatus(true)


        // await axios.post(`${process.env.REACT_APP_API_URL}/addcalendar`, form, {
        //     headers: {
        //         Authorization: `Bearer ${token}`
        //     }
        // })
        //     .then((res) => {
        //         setStatus(false)
        //         toast.success("calendar added successfully")
        //         window.location.reload();
        //     }).catch((err) => {
        //         setStatus(false)
        //         toast.error(err?.response?.data?.message);

        //     })
    }


    const handleChrtCreate = async(e) =>{
        e.preventDefault()
        const form = new FormData(e.currentTarget)

        

        await axios.post(`${process.env.REACT_APP_API_URL}/addchrt`, form, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            toast.success("cohort created successfully")
            window.location.reload()
        }).catch((err) =>{
            toast.error(err?.response?.data?.message)
        })
    }

    const handleEventSubmit = (e) =>{
        e.preventDefault();

        let data = new FormData(e.currentTarget)

         axios.post(`${process.env.REACT_APP_API_URL}/create-event`, data, {
            headers:{
                Authorization: `Bearer ${token}`
            }
         })
        .then((res) => {
            toast.success("event added successfully")
            navigate("/dashboard/home")
        })
        .catch((err) => {
           
            for(let i in err.response.data){
                toast.warn(err.response.data[i])
            }
        
        })
    }



    return (
        <div className="students">

            <div className="p-3 container-fluid d-flex justify-content-between flex-md-row flex-column">
                <h5 className='h3'>Calendar</h5>

                <div className="d-flex gap-3 ">


                    <button type="button" class="btn btn-outline-primary px-3 d-flex  pt-1 rounded  btn-lg" data-bs-toggle="modal" data-bs-target="#share">

                        <div className="text-center">
                            <CiLocationArrow1 color="blue" size={20} />
                        </div>
                        <span className='text-primary'>Share</span>

                    </button>


                    <div class="modal fade" id="share" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalTitleId">Share</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <FacebookShareButton className='mx-1'>
                                        <FacebookIcon size={20} round />
                                    </FacebookShareButton>

                                    <TwitterShareButton className='mx-1'>
                                        <TwitterIcon size={20} round />
                                    </TwitterShareButton>

                                    <LinkedinShareButton className='mx-1'>
                                        <LinkedinIcon size={20} round />
                                    </LinkedinShareButton>

                                    <WhatsappShareButton className='mx-1'>
                                        <WhatsappIcon size={20} round />
                                    </WhatsappShareButton>
                                </div>

                            </div>
                        </div>
                    </div>




                    <form className='calendar d-flex gap-2'>
                        <div className='input-group border border-muted justify-content-around align-items-center'>
                            <BsFilter color='blue' />
                            <small>filter</small>
                            <select name="" className="">
                                <option value=""></option>
                                <option value="" className='form-control'>24hrs</option>
                            </select>
                        </div>

                    </form>

                 {role === "admin" && 
                 
                 <Dropdown isOpen={notificationOpen} toggle={toggleNotification}>
                 <DropdownToggle className="bg-primary gap-1 d-flex align-items-center ">

                     <span className='rounded border border-white d-flex justify-content-center align-items-center'>
                         <BsPlus color='#fff' />
                     </span>
                     create

                 </DropdownToggle>
                 <DropdownMenu>
                     <DropdownItem className=''>
                         <button type="button" class="btn btn-lg" data-bs-toggle="modal" data-bs-target="#createcohort">
                             Create Cohort
                         </button>
                     </DropdownItem>

                     <DropdownItem className=''>
                         <button type="button" class="btn btn-lg" data-bs-toggle="modal" data-bs-target="#addcalendar">
                             Add Calendar
                         </button>
                     </DropdownItem>
                     <DropdownItem className=''>
                         <button type="button" class="btn btn-lg" data-bs-toggle="modal" data-bs-target="#addevent">
                             Add Event
                         </button>
                     </DropdownItem>

                 </DropdownMenu>
             </Dropdown>
                 }


                    {/* add calendar */}
                    <div class="modal fade" id="addcalendar" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable  modal-md" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalTitleId">Add Calendar</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={(e) => handleCalendar(e)}>
                                        <div>
                                            <label htmlFor="" className='form-label'>Cohort Name</label>
                                            <input placeholder='OLOWOIRA FS' name='cohort' type="text" className="form-control" />
                                        </div>

                                        <div className='my-1'>
                                            <label htmlFor="" className='form-label'>Code</label>
                                            <input placeholder='OLDSOL01' name='code' type="text" className="form-control" />
                                        </div>

                                        <div className='my-1'>
                                            <label htmlFor="" className='form-label'>Mode</label>
                                            <select name="mos" className='form-select'>
                                                {mos?.map((each) => (
                                                    <option key={each?.id} value={each?.title}>{each?.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='my-1'>
                                            <label htmlFor="" className='form-label'>Center</label>
                                            <select name="center" className='form-select'>
                                                {center?.map((each) => (
                                                    <option key={each?.id} value={each?.title}>{each?.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='my-1'>
                                            <label htmlFor="" className='form-label'>Select Session</label>
                                            <select name="session" className='form-select'>
                                                {chrt?.map((each) => (
                                                    <option key={each?.id} value={each?.id}>{each?.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className='my-1'>
                                            <label htmlFor="" className='form-label'>Start</label>
                                            <input name='start' type="date" className="form-control" />
                                        </div>
                                        <div className='my-1'>
                                            <label htmlFor="" className='form-label'>End</label>
                                            <input name='end' type="date" className="form-control" />
                                        </div>

                                        <div className='my-1'>
                                            <select name="cid" className='form-select'>
                                                {courses?.map((each) => (
                                                    <option key={each?.id} value={each?.id}>{each?.title}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <button className="btn btn-success w-100 mt-3">Add Calendar</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* add event */}

                    <div class="modal fade" id="addevent" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable  modal-md" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalTitleId">Add Event</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={handleEventSubmit} >
                                        <div>
                                            <label htmlFor="" className='form-label'>Event Title</label>
                                            <input name='title' type="text" className="form-control" />
                                        </div>

                                        <div className='my-1'>
                                            <label htmlFor="" className='form-label'>Event Date</label>
                                            <input name='date' type="date" className="form-control" />
                                        </div>


                                        <button className="btn btn-success w-100 mt-3">Add Event</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>

                    {/* create cohrt */}
                    <div class="modal fade" id="createcohort" tabindex="-1" data-bs-backdrop="static" data-bs-keyboard="false" role="dialog" aria-labelledby="modalTitleId" aria-hidden="true">
                        <div class="modal-dialog modal-dialog-scrollable  modal-md" role="document">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title" id="modalTitleId">Create Cohort</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    <form onSubmit={(e) => handleChrtCreate(e)} >
                                        <div>
                                            <label htmlFor="" className='form-label'>Title</label>
                                            <input placeholder='1.0' name='title' type="text" className="form-control" />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='form-label'>Start Date</label>
                                            <input  name='start' type="date" className="form-control" />
                                        </div>
                                        <div>
                                            <label htmlFor="" className='form-label'>End Date</label>
                                            <input  name='end' type="date" className="form-control" />
                                        </div>

                                        <div>
                                        
                                           <select className="form-control my-2" name="mode">
                                                <option value="online">Online</option>
                                                <option value="weekday">Weekday</option>
                                                <option value="weekend">Weekend</option>
                                           </select>
                                            
                                        </div>

                                 

                                        <button className="btn btn-success w-100 mt-3">create cohort</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>



                </div>
            </div>

            <ul className="nav my-2">
                {courses?.map((tab, i) => (
                    <li key={i} onClick={() => setActiveTab(tab?.id)} className={`h6 nav-item mx-2  ${activeTab === tab?.id && "border-bottom border-primary border-5"}`} style={{ cursor: "pointer" }}>{tab?.title}</li>
                ))}
            </ul>

            <div className="applicants-table table-responsive-md container">
                <table class="table ">
                    <thead className='' style={{ backgroundColor: "#9EA9BD" }}>
                        <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Cohort</th>
                            <th scope="col">Code</th>
                            <th scope="col">Start</th>
                            <th scope="col">End</th>

                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody className='text-start'>

                        {data?.length > 0 ?

                            data?.map((each, i) =>(
                                <tr key={each?.id}>
                                <th scope="row">{i+1}</th>
                                <td>{each?.cohort}</td>
                                <td>{each?.code}</td>
                                <td>{new Date(each?.start).toDateString()}</td>
                                <td>{new Date(each?.end).toDateString()}</td>

                                <Link className='nav-link' to={""}>
                                    <div className='mb-1 '>

                                        <BsThreeDots />

                                    </div>
                                </Link>

                            </tr>
                            ))

                            : 

                            <tr rowspan="5" className="text-center w-100  fw-bold ">
                                <th>No Data</th>
                            </tr>

                        }


                    </tbody>
                </table>
            </div>

            <div className='align-items-center d-flex justify-content-end'>
                <FaLessThan color='#0d6efd' size={18} />
                <div className='mx-2'>
                    {[1, 2, 3]?.map((n, i) => (
                        <button onClick={() => setPagination(n)} key={i} className={`btn ${pagination === n && "bg-primary text-white"}`}>{n}</button>
                    ))}
                </div>
                <FaGreaterThan color='#0d6efd' size={18} />
            </div>
        </div>
    )
}

export default Calendar