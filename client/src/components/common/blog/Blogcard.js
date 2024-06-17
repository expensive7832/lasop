import React from 'react'
import "./blogcard.css"
import { Link } from 'react-router-dom'
import Moment from 'react-moment';

function Blogcard({ blogdata }) {


    return (
        <div className="blogcard">
            <div className="container">
                <div className="row">

                    {blogdata?.map((info, i) => (
                        <div key={i} className="col-md-4 col-12 my-3 my-md-0">
                            <Link className='nav-link' to={`/blog/${info?.id}`}>
                                <div className="card img-thumbnail p-3 ">
                                    <img src={info?.imgurl} alt="blog front photo" className="card-img-top front img-fluid" />


                                    <h5 className="fw-bold title my-1">{info?.title}</h5>
                                    <div className="d-flex ">
                                        <p className='date fw-medium  '>
                                            {new Date(info?.datePosted).toDateString()}
                                        </p>
                                        <p className='time fw-medium  mx-3'>
                                            <Moment interval={1000} fromNow ago>{new Date(info?.datePosted)}</Moment>
                                        </p>
                                    </div>

                                    <p dangerouslySetInnerHTML={{
                                        __html: info?.body?.length > 100 ?
                                            `${info?.body?.slice(0, 100)}...`
                                            :
                                            info?.body


                                    }}>

                                    </p>
                                    <Link to={`/blog/${info?.id}`}>read more</Link>

                                </div>
                            </Link>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}

export default Blogcard