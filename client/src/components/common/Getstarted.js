import React from 'react'
import "./getstarted.css"
import doubleline from "./../../assets/double.png"
function Getstarted() {
    return (
        <div className="getstarted">
            <div className="container">
                <div className="row justify-content-between align-items-center">
                    <div className="col-md-5 ">
                        <h5 className='h5 fw-bold '>Everything You<br /> Need To Know To <br /> Get Started</h5>

                    </div>
                    <div className="col-md-2 d-flex justify-content-center">
                        <img className='d-block' src={doubleline} alt="" />
                    </div>
                    <div className="col-md-5">
                        <p>Applying to LASOP
                            Register by filling
                            the application form
                            on our website</p>
                        <p>Have a laptop
                            ready with spec of a
                            minimum of 4gig ram
                            and 500gb(hdd)/256gb(ssd)</p>
                        <p>Have Internet connection
                            in place( if you are an online
                            student but you will not need
                            this if you study physically).</p>
                        <p>Pay your fees and
                            start attending
                            classes</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Getstarted