import React, { useLayoutEffect, useState } from 'react'
import TopForm from './TopForm'
import { FaEye, FaGreaterThan, FaLessThan } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Students() {

    const [activeTab, setActiveTab] = useState(1)
    const [pagination, setPagination] = useState(1)

    const [users, setUsers] = useState([])
    const [learningstatus, setLearningStatus] = useState([])

    async function getApp(){
        await axios.get(`${process.env.REACT_APP_API_URL}/getapplicantsbylearningmodestatus?lms=${activeTab}`)
        .then((res) => setUsers(res?.data?.data))
        .catch((err) => console.log(err))
    }

    async function getStatus(){
        await axios.get(`${process.env.REACT_APP_API_URL}/getlearningstatus`)
        .then((res) => setLearningStatus(res?.data))
        .catch((err) => console.log(err))
    }

    useLayoutEffect(() =>{

      
        getStatus()

        return () =>{
           
            getStatus()
        }

    }, [])


    useLayoutEffect(() =>{

        getApp()

        return () =>{
            getApp()
        }

    }, [activeTab])
    
   


  return (  
    <div className="students">
        <TopForm title="Students"/>
        <ul className="nav my-2">
        {learningstatus?.map((tab,i) =>(
           <li key={i} onClick={() => setActiveTab(tab?.id)} className={`h6 nav-item mx-2 ${activeTab === tab?.id && "border-bottom border-primary border-5"}`}>{tab?.title}</li> 
        ))}
        </ul>

        <div className="applicants-table table-responsive-md container">
                <table class="table text-center">
                    <thead className='' style={{ backgroundColor: "#9EA9BD" }}>
                        <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Name</th>
                            <th scope="col">Course</th>
                            <th scope="col">Mode</th>
                            <th scope="col">Center</th>
                            <th scope="col">Status</th>
                            <th scope="col">Duration</th>
                            <th scope="col">Started</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((d, i) => (
                            <tr key={d?.id}>
                                <td scope="row">{d?.id}</td>
                                <td>{d?.fname}</td>
                                <td>{d?.coursetitle}</td>
                                <td>{d?.mostitle}</td>
                                <td>{d?.centertitle}</td>
                                <td>{d?.status === 0 ? "unpaid": "paid"}</td>
                                <td>{d?.duration}</td>
                                <td>{new Date(d?.dateCreated).toDateString()}</td>
                                <Link className='nav-link' to={`/dashboard/students?id=${d?.id}`}>
                               <div className='rounded  mb-1 d-flex border align-items-center justify-content-around border-primary'>
                                    <div><FaEye size={28} color='#0d6efd' /></div>
                                    <p className='text-primary m-auto'>view</p>
                                </div>
                               </Link>

                            </tr>
                        ))}



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

export default Students