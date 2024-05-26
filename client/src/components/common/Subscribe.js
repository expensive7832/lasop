import React from 'react'

function Subscribe() {
  return (
    <div className="subscribe">
          <div className=" p-5">
           <div className="row justify-content-between align-items-center ">
              <h5 className="h5 col-md-4 col-12">Subscribe to our <br/> Newsletter</h5>

              <div className="d-none col-md-4"/>

              <div className='col-md-4 col-12 d-flex gap-1'>
                <input placeholder='search here' type="text" className="form-control" />
               <button className="btn btn-primary">Subscribe</button>
              </div>
            </div>
           </div>
    </div>
  )
}

export default Subscribe