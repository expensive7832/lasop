import React, { useLayoutEffect, useState } from 'react'
import TopForm from './TopForm'
import { FaAlignLeft, FaEye, FaGreaterThan, FaLessThan } from 'react-icons/fa'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Applicants() {

    const [pagination, setPagination] = useState(1)

    const [datas, setDatas] = useState([])

    async function getApp(){
        await axios.get(`${process.env.REACT_APP_API_URL}/getapplicants`)
        .then((res) => setDatas(res?.data?.data))
        .catch((err) => console.log(err))
    }

    useLayoutEffect(() =>{

        getApp()

        return () =>{
            getApp()
        }

    }, [])

   

    return (
        <div className="applicants">
            <TopForm title="Applicants" />

            <div className="applicants-table table-responsive-md container">
                <table class="table text-center">
                    <thead className='' style={{ backgroundColor: "#9EA9BD" }}>
                        <tr>
                            <th scope="col">S/N</th>
                            <th scope="col">Name</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Course</th>
                            <th scope="col">Mode</th>
                            <th scope="col">Center</th>
                            <th scope="col">Status</th>
                            <th scope="col">Date</th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {datas?.map((d, i) => (
                            <tr key={d?.id}>
                                <td scope="row">{d?.id}</td>
                                <td>{d?.fname}</td>
                                <td><a className='nav-link' href={`tel:${d?.phone}`}>{d?.phone}</a></td>
                                <td>{d?.coursetitle}</td>
                                <td>{d?.mostitle}</td>
                                <td>{d?.centertitle}</td>
                                <td>{d?.status === 0 ? "unpaid": "paid"}</td>
                                <td>{new Date(d?.dateCreated).toDateString()}</td>
                                <Link to={`/dashboard/students?id=${d?.id}`} className='rounded   mb-1 d-flex border align-items-center justify-content-around border-primary'>
                                    <div><FaEye size={28} color='#0d6efd' /></div>
                                    <p className='text-primary m-auto'>view</p>
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

export default Applicants