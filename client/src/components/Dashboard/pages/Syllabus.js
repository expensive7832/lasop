import React, { useEffect, useState } from 'react'
import img from "./../../../assets/Notifications.svg"
import lamp from "./../../../assets/lamp-on.svg"
import "./syllabus.css"
import { Link } from 'react-router-dom'
import axios from 'axios'
function Syllabus() {

  const [datas, setDatas] = useState([])


  useEffect(() =>{
    axios.get(`${process.env.REACT_APP_API_URL}/getcourse`)
    .then((res) => {
     setDatas(res.data)
    })
    .catch((err) => {
      console.log(err);
    })
  }, [])

  return (
   <div className="syllabus">
    <h3>Syllabus</h3>
    <hr className="border-primary border-2" />

    <div className="container p-md-3">
      <div className="row align-items-center g-2">
      {datas?.map((data) =>(
               <Link key={data?.id} className="col-md-3 col-12 border border-primary rounded " to={`/dashboard/syllabus?id=${data?.id}&title=${data?.title}`}>
                  <div className="d-flex justify-content-between align-items-center">
                    <p>{data?.title}</p>
                    <img src={img} alt="" className='syl-img'/>
                  </div>

                 <div className='d-flex justify-content-center'>
                  <img src={lamp} alt="lamp" />
                  <small>click to open folder</small>
                 </div>
               </Link>
      ))}
      </div>
    </div>
   </div>
  )
}

export default Syllabus