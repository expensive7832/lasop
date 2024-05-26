import React from 'react'
import { BsFilter } from 'react-icons/bs'
function TopForm({title}) {
  return (
    <div className="p-3 container-fluid d-flex justify-content-between flex-md-row flex-column">
            <h5 className='h3'>{title}</h5>
            <form  className='calendar d-flex gap-2'>
                <div className='input-group align-items-center gap-3'>
                    <lable className="form-label">From</lable>
                    <input className='form-control' type="text" onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"} placeholder='11/11/2023' />
                </div>
                <div className='input-group align-items-center gap-3'>
                    <lable className="form-label">To</lable>
                    <input className='form-control' type="text" onFocus={(e) => e.target.type = "date"} onBlur={(e) => e.target.type = "text"} placeholder='11/11/2023' />
                </div>

                <div className='input-group border border-muted justify-content-around align-items-center'>
                    <BsFilter color='blue'/>
                    <small>filter</small>
                    <select name="" className="">
                    <option value=""></option>
                    <option value="" className='form-control'>24hrs</option>
                </select>
                </div>
            </form>
        </div>
  )
}

export default TopForm