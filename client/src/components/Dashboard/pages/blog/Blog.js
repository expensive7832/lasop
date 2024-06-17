import React, { useLayoutEffect, useState } from 'react'
import { useQuill } from 'react-quilljs';
import "./blog.css"
import axios from "axios"
import { useEffect } from 'react';
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { Spinner } from 'reactstrap';

function Blog() {
  const { quill, quillRef } = useQuill();

  const token = useSelector((state) => state?.user?.token)

  const navigate = useNavigate()

  const [desc, setDesc] = useState("")
  const [status, setStatus] = useState(false)
  const [articles, setArticles] = useState([])


  useLayoutEffect(() =>{

    axios?.get(`${process.env.REACT_APP_API_URL}/getarticles`,{
      headers:{
        Authorization: token !== null ? `Bearer ${token}` : ""
      }
    }).then((res) => setArticles(res?.data?.article))
    .catch((err) => {
      window.location.href = "/login"
    })

  

  }, [])


  useEffect(() => {
    if (quill) {
      quill.on('text-change', (delta, oldDelta, source) => {
        setDesc(quill.root.innerHTML); // Get innerHTML using quill

      })
    }
  }, [quill])


  const handleSubmit = async (e) => {
    e.preventDefault()

    setStatus(true)

    const form = new FormData(e.currentTarget)

    form.append("desc", desc)

  await axios.post(`${process.env.REACT_APP_API_URL}/create-article/`, form,{
    headers:{
      Authorization: token !== null && `Bearer ${token}`
     }
  }).then((res) => {
    setStatus(false)
    toast.success(res?.data?.message)
  })
  .catch((err) => {
    if(err?.response?.data?.message === "authentication required"){
      setStatus(false)
      toast.warn(err?.response?.data?.message)
      navigate("/login")
    }else if(err?.response?.data?.message === "select main image"){
      setStatus(false)
      toast.warn("insert main image")
    }
    else if(err?.response?.data?.message === "unauthorized access"){
      setStatus(false)
      toast.danger(err?.response?.data?.message)
      navigate("/login")
    }
  })

  }

  return (
    <>
      <div className="blog">

        <div className="row">
          <div className="col-md-8">
            <form onSubmit={(e) => handleSubmit(e)}>

              <div>
              <label className="form-label">Title</label>
                  <input type="text" name="title" className="form-control" />
              </div>

             
                
                <div className="my-4">
              
                <label htmlFor="" className='d-block form-label'>Main Photo</label>
                <input name="main" type="file" className="form-control" />
              
                </div>
                
                <div className="my-4">
              
                <label htmlFor="" className='d-block form-label'>Photo</label>
                <input multiple={true} name="photo" type="file" className="form-control" />
              
                </div>
              

              <div >
                <div ref={quillRef} />
              </div>

             

              <button type='submit' className="btn btn-md btn-info mt-3">
                {status === true ?
                <Spinner/>
                :
                "Submit Article"
                }
              </button>

            </form>
          </div>

          <div className="col-md-4 ">
          
          </div>

          
        </div>

        <div className="container mt-5">
        <span className="lead fw-bold border p-2 mb-2">All Articles</span>

        <div className="row gap-5 m-auto allarticles ">
        {articles?.map(article =>(
              <div key={article?.id} className="col-md-3 card">
                <img src={article?.imgurl} alt="" className="img-fluid card-img-top" />
                <p className="card-body">{article?.title}</p>
              </div>
            ))}
        </div>
        </div>
      </div>
    </>
  )
}


export default Blog