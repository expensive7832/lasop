import React, { useEffect, useState } from 'react'
import Navbar from './../navbarfiles/Navbar'
import Footer from './../footerfiles/Footer'
import "./calendar.css"
import { centercodes } from '../../fakedb/courseData'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaSearch } from 'react-icons/fa'
import { toast } from 'react-toastify'
function Calendar() {

    const [mos, setmos] = useState(null)
    const [allcalendars, setallcalendars] = useState(null)
    const [datas, setdatas] = useState(null)

    const [selected, setselected] = useState("")

    useEffect(() =>{

        axios?.get(`${process.env.REACT_APP_API_URL}/getmos`)
        .then((res) => setmos(res.data))
        .catch((err) => console.log(err))

        axios?.get(`${process.env.REACT_APP_API_URL}/calendar`)
        .then((res) => setallcalendars(res.data))
        .catch((err) => console.log(err))



    }, [])


    const handleSearch = async() =>{

        if(selected === ""){
            toast.error("selected mode of study")
        }else{
            if(allcalendars === null){
                setdatas("No Data")
            }else{
                let calendars = allcalendars?.filter((each) => each?.mode === selected)
                
                if(calendars?.length === 0){
                    setdatas("No Data")
                }else{
                    setdatas(calendars)
                }
            }
        }

    }

    return (
        <>
        <Navbar/>
        
        <div className="calendar">

<div className="calendarhero ">

    <div className="container p-5">
        <div className="row align-items-center">
            <div className='col-md-6 col-12'>
                <h2 className="h2"> Academic Calendar </h2>
                <p className='p'>This calendar is updated every month to keep you well informed and ahead.
                    Last updated:  {new Date().toLocaleString('default', { month: 'long', year:"numeric" })}  </p>
                <div className='info-btn container-fluid'>
                    <p>Centers</p>
                    
                    <div className='d-flex gap-3 w-50'>
                        <select className='form-control' onChange={(e) => setselected(e.target.value)}>
                            <option value="">select mode</option>
                            {
                                mos?.map((each) =>(

                                    <option key={each?.id} value={each?.title}>{each?.title}</option>
                                ))
                            }
                        </select>

                        <button onClick={handleSearch} className="btn btn-dark">
                            <FaSearch/>
                        </button>
                       
                    </div>

                </div>
            </div>


        </div>

    </div>


</div>

{/* <div className="container calendar-tabs my-5">
    <button className='active'>Frontend</button>
    <button>Backend</button>
    <button>Fullstack</button>
    <button>UI/UX</button>
    <button>App Dev</button>
    <button>Data & AI</button>

</div> */}

{
    datas === null ?

    ""

    :

    datas === "No Data" ? 

    <h3 className="text-warning my-5 display-5 fw-bold text-center">
        {datas}
    </h3>

    :

    <div className="calendar-table table-responsive-md container">
    <table class="table text-center">
        <thead>
            <tr>
                <th scope="col">MONTH</th>
                <th scope="col">Code</th>
                <th scope="col">Start</th>
                <th scope="col">end</th>
            </tr>
        </thead>
        <tbody>
           
           
           {
            datas?.map((each) =>(
                <tr key={each?.id}>
                <td scope="row">
                {new Date(each?.start).toLocaleString('default', { month: 'long'})}  - {new Date(each?.end).toLocaleString('default', { month: 'long'})}
                </td>
                <td>{each?.code}</td>
                <td>{new Date(each?.start).toLocaleString('default', { month: 'long', year:"numeric", day:"2-digit" })}</td>
                <td>{new Date(each?.end).toLocaleString('default', { month: 'long', year:"numeric", day:"2-digit" })}</td>
                
                <button className="btn">
                    <Link className='nav-link text-white ' to="/signup">Apply</Link>
                </button>
               
            </tr>
            ))
           }
          
            
           
        </tbody>
    </table>
</div> 
}





</div>

        <Footer/>
        </>

    )
}

export default Calendar