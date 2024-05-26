import React, { useEffect, useState } from 'react'
import "./blogdetails.css"
import Navbar from '../navbarfiles/Navbar'
import Footer from '../footerfiles/Footer'
import { Link, useParams } from 'react-router-dom'
import { FaArrowRight, FaSearch } from 'react-icons/fa'
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    InstapaperShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TumblrShareButton,
    TwitterIcon,
    TwitterShareButton,
    ViberShareButton,
    
    WhatsappIcon,
    WhatsappShareButton,
    WorkplaceShareButton
} from "react-share";
import Blogcard from '../common/Blogcard'
import Subscribe from '../common/Subscribe'
import { BsInstagram } from 'react-icons/bs'
import Moment from 'react-moment'
import axios from "axios"

function Blogdetails() {

    const { id } = useParams()


    const [data,setData] = useState(null)
    const [images,setImages] = useState([])


    useEffect(() =>{
        axios?.get(`${process.env.REACT_APP_API_URL}/getarticle/${id}`)
    .then((res) => setData(res?.data?.info[0]))

    axios?.get(`${process.env.REACT_APP_API_URL}/blogimages/${id}`)
    .then((res) => setImages(res?.data?.info))
    }, [])




    
    return (
        <div className="blogdetails">
            <Navbar />

            <div className="body p-5">
                <div className="container">
                    <div className="row justify-content-between align-items-center ">
                        <h5 className="h5 col-md-4 col-6">LATEST BLOG POSTS</h5>

                        <div className="d-none col-md-4" />

                        <div className='col-md-4 col-6 position-relative  '>
                            <input placeholder='search here' type="text" className="form-control" />
                            <div style={{ right: "1rem" }} className='position-absolute top-50 translate-middle '>
                                <FaSearch />
                            </div>
                        </div>
                    </div>

                    <nav class="breadcrumb">
                        <Link class="breadcrumb-item nav-link" to="/">Home</Link>
                        <Link class="breadcrumb-item nav-link active" to="/blog">Blog</Link>

                    </nav>

                    <div className="row">
                        <div className="col-md-10 col-12 order-2 order-md-1">
                            <h4 className="title w-75">{data?.title}</h4>

                            <div className="d-flex">
                                <span className=' fw-medium  date'>
                                   {new Date(data?.dateposted).toDateString()}
                                </span>
                                <span className=" fw-medium  mx-2 time">
                                    <Moment interval={1000} fromNow ago>
                                        {new Date(data?.dateposted)}
                                    </Moment>
                                </span>
                            </div>

                            <div className="mainimage my-2">
                             
                             <img className='img-fluid' src={data?.imgurl} alt="main photo" />
                            </div>

                            <p className="maintext fw-medium " dangerouslySetInnerHTML={{
                                __html: data?.body
                            }}>
                                
                            </p>

                            <div className="mb-2 row">
                               <div className="row">
                               {
                                images?.map((img, i) => (
                                   <div key={i} className="col-md-4">
                                     <img  className='img-fluid' src={img?.imgurl} alt="other" />
                                   </div>
                                ))
                                }
                               </div>
                               
                            </div>

                            <p className="fw-bold othertex" dangerouslySetInnerHTML={{
                                __html: data?.body
                            }}>
                              
                            </p>

                            <div className="similar p-4">

                                <h4 className="header py-3 text-uppercase ">
                                    Similar blog Post
                                </h4>

                                {/* <Blogcard blogdata={blogdata} /> */}

                                <div className='d-flex justify-content-center bg-white viewall my-4 my-md-0  '>
                                    <Link to="/blog" className='me-3 nav-link '>View all blogs</Link>
                                    <div className="mt-0"> <FaArrowRight /></div>
                                </div>

                                

                            </div>


                        </div>

                        <div className="col-md-2 col-12 order-md-2 order-1">
                            <FacebookShareButton url={`${process.env.REACT_APP_DOMAIN}/blogdetails/${id}`} className='d-md-block mx-1 mx-md-0'>
                                <FacebookIcon size={28}  round />
                            </FacebookShareButton>

                            <TwitterShareButton url={`${process.env.REACT_APP_DOMAIN}/blogdetails/${id}`} className='d-md-block mx-1 mx-md-0 my-1'>
                                <TwitterIcon size={28}  round />
                            </TwitterShareButton>

                            <LinkedinShareButton url={`${process.env.REACT_APP_DOMAIN}/blogdetails/${id}`} className='d-md-block  mx-1 mx-md-0 my-1'>
                                <LinkedinIcon size={28}  round />
                            </LinkedinShareButton>

                            <WhatsappShareButton url={`${process.env.REACT_APP_DOMAIN}/blogdetails/${id}`} className='d-md-block mx-1 mx-md-0 my-1'>
                                <WhatsappIcon size={28}  round />
                            </WhatsappShareButton>

                            <TelegramShareButton url={`${process.env.REACT_APP_DOMAIN}/blogdetails/${id}`} className='d-md-block mx-1 mx-md-0 my-1'>
                                <TelegramIcon size={28}  round />
                            </TelegramShareButton>

                            <EmailShareButton url={`${process.env.REACT_APP_DOMAIN}/blogdetails/${id}`} className='d-md-block mx-1 mx-md-0 my-1'>
                                <EmailIcon size={28}  round />
                            </EmailShareButton>

                           

                          

                           
                        </div>
                    </div>

                </div>
            </div>

            <div className="subscribe">
                 <Subscribe/>
            </div>

            <Footer />
        </div>
    )
}

export default Blogdetails