import React from 'react'
import poster from "./../../assets/poster.png"
import programming from "./../../assets/programming.mp4"
import "./video.css"

function Video() {
    return (
        <div className="video">
            <div className="video  p-5 position-relative">

                <video poster={poster} className='position-absolute  top-50 start-50 translate-middle' controls>
                    <source src={programming} type="video/mp4" />

                </video>
            </div>
        </div>
    )
}

export default Video