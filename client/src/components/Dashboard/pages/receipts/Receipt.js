import axios from 'axios'
import React, { useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {useDispatch, useSelector} from "react-redux"


function Receipt() {

    const [datas, setDatas] = useState([])

    const token = useSelector((state) => state?.user?.token)



    const dispatch = useDispatch()



    function getData() {
        axios?.get(`${process.env.REACT_APP_API_URL}/getreceipt`)
            .then((res) => setDatas(res?.data?.data))
            .catch((err) => console.log(err))
    }

    useLayoutEffect(() => {

        getData()

        return () => {
            getData()
        }

    }, [])

    const handleClick = async(id, userid) => {
        await axios?.get(`${process.env.REACT_APP_API_URL}/confirmreceipt/${id}/${userid}`, {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then((res) => {
            if(res?.data?.message === "success"){
               
                window.location.reload()
            }
        })
        .catch((err) => {
            if(err?.response?.data?.message === "not found"){
                toast.warn(err?.response?.data?.message)
            }
        })
    }

    return (
        <div className="receipt">
            <div className="container">
                <div className="row gap-3">
                    {datas?.map((dt, i) => (
                        <div key={i} className="col-md-3">
                            <div className="card">
                                <p className="m-2 fw-bold">{new Date(dt?.dateposted).toLocaleString()}</p>
                                <img data-lightbox={dt?.img} src={dt?.img} alt="receipt" className="img-fluid  card-img-top" />

                                <div className="card-footer d-flex align-items-center  justify-content-between ">
                                    <p className='fst-italic'>{dt?.status === 0 ? "pending" : "active"}</p>
                                   {dt?.status === 0 && <button onClick={() => handleClick(dt?.id, dt?.userid)} className='btn btn-primary'>confirm</button>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default Receipt