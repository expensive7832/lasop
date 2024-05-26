import React, { useState } from 'react'
import TopForm from './TopForm'
import { FaEye, FaGreaterThan, FaLessThan } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Staffs() {

    const [activeTab, setActiveTab] = useState(0)
    const [pagination, setPagination] = useState(1)

    const data = [
        { id: 1, name: "Nathan", email: "a@b.com", phone: "08166398746", stack: "frontend", started:"Mar 13, 2023" },
        { id: 2, name: "Nathan", email: "a@b.com", phone: "08166398746", stack: "frontend", started:"Mar 13, 2023" },
        { id: 3, name: "Nathan", email: "a@b.com", phone: "08166398746", stack: "frontend", started:"Mar 13, 2023" },
        { id: 4, name: "Nathan", email: "a@b.com", phone: "08166398746", stack: "frontend", started:"Mar 13, 2023" },
        { id: 5, name: "Nathan", email: "a@b.com", phone: "08166398746", stack: "frontend", started:"Mar 13, 2023" },
        { id: 6, name: "Nathan", email: "a@b.com", phone: "08166398746", stack: "frontend", started:"Mar 13, 2023" },
        { id: 7, name: "Nathan", email: "a@b.com", phone: "08166398746", stack: "frontend", started:"Mar 13, 2023" },
        { id: 8, name: "Nathan", email: "a@b.com", phone: "08166398746", stack: "frontend", started:"Mar 13, 2023" },
    ]

    const tabs = ["Academic", "Non-Academic"]


  return (  
    <div className="students">
        <TopForm title="Staffs"/>
        <ul className="nav my-2">
        {tabs?.map((tab,i) =>(
           <li key={i} onClick={() => setActiveTab(i)} className={`h6 nav-item mx-2 ${activeTab === i && "border-bottom border-primary border-5"}`}>{tab}</li> 
        ))}
        </ul>

        <div className="staff-table table-responsive-md container">
                <table class="table text-center">
                    <thead className='' style={{ backgroundColor: "#9EA9BD" }}>
                        <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone No</th>
                            <th scope="col">Stack</th>
                            <th scope="col">Joined</th>
                            
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.map((d, i) => (
                            <tr key={d?.id}>
                                <td scope="row">{d?.id}</td>
                                <td>{d?.name}</td>
                                <td>{d?.email}</td>
                                <td>{d?.phone}</td>
                                <td>{d?.stack}</td>
                                <td>{d?.started}</td>
                        
                               <Link className='nav-link' to={`/dashboard/staffs?id=${d?.id}`}>
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

export default Staffs