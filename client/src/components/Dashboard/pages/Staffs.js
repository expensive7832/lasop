import React, { useEffect, useState } from 'react'
import TopForm from './TopForm'
import { FaEye, FaGreaterThan, FaLessThan } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { toast } from 'react-toastify'

function Staffs() {

    const [activeTab, setActiveTab] = useState(0)
    const [pagination, setPagination] = useState(1)

    const [datas, setDatas] = useState(null)

    const token = useSelector((state) => state?.user?.token)

    const navigate = useNavigate()

    useEffect(() =>{

        axios
        .get(`${process.env.REACT_APP_API_URL}/allusers`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        .then((res) => setDatas(res?.data?.filter((each) => each?.role == "staff")))
        .catch((err) => {
          
          for(let each in err.response.data){
            if(err.response.data[each] === "invalid credentials"){
              
              toast.error(err.response.data[each])
  
              navigate("/login")
  
             }
             else{
              toast.error(err.response.data[each])
            }
          }
        });

    }, [])

  
    const tabs = ["Academic", "Non-Academic"]


  return (  
    <div className="students">
        <TopForm title="Staffs"/>
        <ul className="nav my-2" style={{cursor:"pointer"}}>
        {tabs?.map((tab,i) =>(
           <li key={i} onClick={() => setActiveTab(i)} className={`h6 nav-item mx-2 ${activeTab === i && "border-bottom border-primary border-5"}`}>{tab}</li> 
        ))}
        </ul>

        <div className="staff-table table-responsive-md container">
                <table class="table text-center">
                    <thead className='' style={{ backgroundColor: "#9EA9BD" }}>
                        <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">FirstName</th>
                            <th scope="col">LastName</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone No</th>
                            <th scope="col">Stack</th>
                            <th scope="col">Joined</th>
                            
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas?.map((d, i) => (
                            <tr key={d?.id}>
                                <td scope="row">{d?.id}</td>
                                <td>{d?.fname}</td>
                                <td>{d?.lname}</td>
                                <td>{d?.email}</td>
                                <td>{d?.phone}</td>
                                <td>{d?.stack}</td>
                                <td>{new Date(d?.datecreated).toDateString()}</td>
                        
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