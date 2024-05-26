import React, { useEffect, useState, useRef } from 'react'
import { FaPlus } from 'react-icons/fa'
import "./syllabus.css"
import more from "./../../../assets/more.svg"
import bookmark from "./../../../assets/book.svg"
import addItem from "./../../../assets/additem.svg"
import book from "./../../../assets/Notifications2.svg"
import { Modal, ModalHeader, ModalBody, ModalFooter, Spinner } from 'reactstrap';
import { AiOutlineSend, AiOutlineDelete } from "react-icons/ai"
import { HiOutlineDownload } from "react-icons/hi"
import { data } from './MyChart'
import { useDispatch, useSelector } from 'react-redux'
import { addFiles } from '../../../Redux/Slices/cohortslice'
import axios from 'axios'
import { toast } from 'react-toastify';

function Cohortsyllabus() {


  const token = useSelector((state) => state.user.token)


  const [datas, setDatas] = useState([])
  const [chrt, setChrt] = useState([])
  const [title, setTitle] = useState("")
  const [dptID, setDptID] = useState("")


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/getcohort`)
      .then((res) => {
        setChrt(res.data);
      })
      .catch((err) => {
        console.log(err);
      })

    const title = new URLSearchParams(window.location.search).get("title")
    const id = new URLSearchParams(window.location.search).get("id")

    axios.get(`${process.env.REACT_APP_API_URL}/retrievesyllabus?id=${id}`)
      .then((res) => {

        setDatas(res.data.data);
      })
      .catch((err) => {
        for (let i in err.response.data) {
          toast.error(err.response.data[i])
        }
      })

    setTitle(title)
    setDptID(id)



  }, [])



  const [modal, setModal] = useState(false);
  const [add, setAdd] = useState(false);
  const [addIns, setAddIns] = useState(false);
  const [status, setStatus] = useState(false);
  const [currentSyl, setCurrSyl] = useState(null);



  const toggle = () => setModal(!modal);
  const toggleAdd = () => setAdd(!add);
  const toggleAddIns = () => setAddIns(!addIns);
  

  const handleToggle = async(data) =>{
    toggle()
    setCurrSyl(data)
    
  }




  const handleSyllabusUpload = async (e) => {
    setStatus(true)
    // dispatch(addFiles(e.target.files))
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    form.append("dpt", dptID)

    await axios.post(`${process.env.REACT_APP_API_URL}/addsyllabus`, form, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setStatus(false)
        toast.success("uploaded successfully")
        window.location.reload()

      })
      .catch((err) => {

        for (let i in err?.response?.data) {
          toast.error(err?.response?.data[i])
        }

        setStatus(false)
      })
  }

  const downloadSyl = async () => {
    await window.open(currentSyl?.imgurl)
  }


  return (
    <div className='chrtSyllab'>
      <div className="d-flex justify-content-between">
        <h3>Syllabus/{title}</h3>
        <button onClick={toggleAdd} type="button" data-toggle="modal" data-target="#add" className="btn btn-outline-primary d-flex align-items-center justify-content-between">
          <div className="icon">
            <FaPlus color='#0D6EFD' size={16} />
          </div>
          <small className='px-1'>Add</small>
        </button>

        <Modal isOpen={add} toggle={toggleAdd} fullscreen="sm" size='sm' backdrop={false}>
          <ModalHeader toggle={toggleAdd} className='d-flex'>
            <img src={bookmark} alt="" />
            <p className='text-primary modalhead'>Add a new syllabus</p>
          </ModalHeader>
          <ModalBody>
            <div className='my-2 d-flex justify-content-center align-items-center flex-column'>
              <form onSubmit={handleSyllabusUpload} >
                <input type="file" accept='application/pdf, application/msword, text/plain' name='syllabus' hidden id='addsyl' />
                <label htmlFor="addsyl">
                  <img className='' src={addItem} alt="" />
                </label>

                <div>
                  <label htmlFor="">Select Cohort</label>
                  <select name="chrtid" className='my-3 d-block form-control'>
                    {chrt?.map((ct) => (
                      <option className='form-control' key={ct?.id}>{ct?.title}</option>
                    ))}
                  </select>
                </div>

                <button type="submit" className="btn d-block  btn-secondary mt-3 ">
                  {status === true ? <Spinner /> : "Add Syllabus"
                  }
                </button>
              </form>
              {/*<button onClick={toggleAddIns} type="button" data-toggle="modal" data-target="#add" className="btn btn-secondary mt-3 ">Add Syllabus</button>*/}

              {/* <Modal isOpen={addIns} toggle={toggleAddIns} fullscreen="sm" size='sm' backdrop={false}>
                <ModalHeader toggle={toggleAddIns} className='d-flex'>
                  <img src={bookmark} alt="" />
                  <p className='text-primary modalhead'>Add a new syllabus</p>
                </ModalHeader>
                <ModalBody>
                    <form onSubmit={syllabusUpload}>
                    {data?.map((dt, i) =>(
                      <div key={i}>
                      <label htmlFor="" className="form-label text-primary">{dt?.name}</label>
                      
                     </div>
                    ))}

                      <button type='submit' className="btn btn-md btn-primary w-100">Add Syllabus</button>
                  
                    </form>
                </ModalBody>

              </Modal> */}
            </div>



          </ModalBody>

        </Modal>
      </div>
      <hr className="border-primary border-2" />


      <div className="container p-3">
        <div className="row g-2">
          {datas?.length == 0 ?

            <h4 className="text-warning">Check Later!!!</h4>
            :

            datas?.map((data) => (
              <div key={data?.id} className="col-md-3 col-6 border border-primary rounded " to="/dashboard/syllabus?id=1">
                <div className="d-flex justify-content-between align-items-center">

                  <img src={book} alt="" className='syl-img' />
                  <button onClick={() => handleToggle(data)} type="button" data-toggle="modal" data-target="#options" className='btn'><img src={more} alt="" className='syl-img' /></button>
                </div>



                <p className='fw-bold'>{data?.chrt}</p>



              </div>
            ))

          }

          <Modal isOpen={modal} toggle={toggle} fullscreen="sm" size='sm' backdrop={false}>
            <ModalHeader toggle={toggle}></ModalHeader>
            <ModalBody>

              <div className="d-flex justify-content-between my-1">
                <h6>Share</h6>
                <button className="btn d-block float-end  ">
                  <AiOutlineSend color='#0d6efd' />
                </button>
              </div>
              <div className="d-flex justify-content-between my-1">
                <h6>Download</h6>
                <button onClick={downloadSyl} className="btn d-block float-end  ">
                  <HiOutlineDownload color='#0d6efd' />
                </button>
              </div>
              <div className="d-flex justify-content-between my-1">
                <h6>Delete</h6>
                <button className="btn d-block float-end  ">
                  <AiOutlineDelete color='#ba1a1a' />
                </button>
              </div>
            </ModalBody>

          </Modal>
        </div>
      </div>
    </div>
  )
}

export default Cohortsyllabus