import React, { useEffect, useState } from 'react'
import "./program.css"

import { useMediaQuery } from 'react-responsive'

function OurProgram() {

    const small = useMediaQuery({
        query: '(max-width: 576px)'
      })

    

    return (
        <div className="program">
            <div className="ourprogram">
                <div className="container ">
                    <h6 className='p-3 h5 text-center fw-bold'>Our programs are designed to prepare you for a career in the  <br />
                        world’s fastest growing industries.</h6>

                    <div className="info p-5">

                        <div className="each d-flex position-relative my-3 ">
                            <div className='firstbox z-3 d-none d-lg-block '>
                                <img src="./../../../images/mrdavid.png" alt="" />
                            </div>

                            <div className=' secondbox  z-0 py-md-5 pe-md-5'>
                                <div className="d-flex flex-column flex-md-row">
                                    <img src="./../../../images/opicon.png" alt="" />
                                    <div>
                                        <h5 className='h3 text-center'>Conducive learning atmosphere</h5>
                                        <p>Safe and serene environment, well air-conditioned and clean
                                            class rooms customized with state of the art facilities and equipment’s
                                            and hybrid libraries for self-study. Internet and software’s available
                                            when needed.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="each d-flex position-relative my-5 ">
                            <div className=' secondbox  z-0 py-md-5 pe-md-5'>
                                <div className="d-flex flex-column flex-md-row">
                                    <img src="./../../../images/opicon5.png" alt="" />
                                    <div>
                                        <h5 className='h3 text-center'>Hands on practice everyday</h5>
                                        <p>Put your training into practice, Learn to build practically. There is no substitution for pressing the keyboards, writing codes, sketching designs and finalizing projects for deployments and dominion.</p>
                                    </div>
                                </div>

                            </div>

                            <div className='firstbox z-3 d-none d-lg-block '>
                                <img src="./../../../images/class3.png" alt="" />
                            </div>
                        </div>

                        <div className="each d-flex position-relative my-3 ">
                            <div className='firstbox z-3 d-none d-lg-block '>
                                <img src="./../../../images/opclass.png" alt="" />
                            </div>

                            <div className=' secondbox  z-0 py-md-5 pe-md-5'>
                                <div className="d-flex flex-column flex-md-row">
                                    <img src="./../../../images/opicon4.png" alt="" />
                                    <div>
                                        <h5 className='h3 text-center'>Learn from senior faculties</h5>
                                        <p>Experienced and well educated tutors will take you through the lessons and continue to mentor you throughout  your course. They do not only have the knowledge, they are very gifted in the art of teaching.</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="each d-flex position-relative my-5 ">
                            <div className=' secondbox  z-0 py-md-5 pe-md-5'>
                                <div className="d-flex flex-column flex-md-row">
                                    <img src="./../../../images/opicon3.png" alt="" />
                                    <div>
                                        <h5 className='h3 text-center'>Project and Profiles</h5>
                                        <p>Data science students deploys machine models into specialized products. The models are tested and evaluated. Software developers must build market fit functional products so should designers.</p>
                                    </div>
                                </div>

                            </div>

                            <div className='firstbox z-3 d-none d-lg-block '>
                                <img src="./../../../images/opclass2.png" alt="" />
                            </div>
                        </div>

                        <div className="each d-flex position-relative my-3 ">
                            <div className='firstbox z-3 d-none d-lg-block '>
                                <img src="./../../../images/opstud.png" alt="" />
                            </div>

                            <div className=' secondbox  z-0 py-md-5 pe-md-5'>
                                <div className="d-flex flex-column flex-md-row">
                                    <img src="./../../../images/opicon4.png" alt="" />
                                    <div>
                                        <h5 className='h3 text-center'>Efficient</h5>
                                        <p>We do not give excuses at LASOP
                                            Things are always done well</p>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>
                    
                </div>
            </div>
        </div>
    )
}

export default OurProgram