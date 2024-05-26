import React, { useEffect, useState } from 'react'
import "./blog.css"
import Navbar from '../navbarfiles/Navbar'
import Footer from '../footerfiles/Footer'
import { FaSearch } from 'react-icons/fa'
import BlogCard from "./../common/Blogcard"
import Pagination from '../common/Pagination'
import Subscribe from '../common/Subscribe'
import axios from 'axios'

function Blog() {

  const [blogdata, setBlogData] = useState([])

useEffect(() =>{

  axios.get(`${process.env.REACT_APP_API_URL}/getarticles`)
  .then((res) => {
    setBlogData(res?.data?.article)
  } )
  .catch((err) => console.log(err))

}, [])

  return (
    <div className="blog">
        <Navbar/>

        <div className="body p-5">
          <div className="container">
            <div className="row justify-content-between align-items-center ">
              <h5 className="h5 col-md-4 col-6">LATEST BLOG POSTS</h5>

              <div className="d-none col-md-4"/>

              <div className='col-md-4 col-6 position-relative  '>
                <input placeholder='search here' type="text" className="form-control" />
                <div style={{right: "1rem"}} className='position-absolute top-50 translate-middle '>
                  <FaSearch/>
                </div>
              </div>
            </div>

            <div className="bloginfo py-5">
              <BlogCard blogdata={blogdata}/>
            </div>

           <div className="paginate">
            <Pagination/>
           </div>

         


          </div>
        </div>

      <div className="subscribe">
        <Subscribe/>
      </div>

        <Footer/>
    </div>
  )
}

export default Blog