import React from 'react'
import {FaGreaterThan, FaLessThan } from "react-icons/fa"

function Pagination() {
  return (
    <div className="paginate d-flex justify-content-center ">
              <nav aria-label="Page navigation">
                <ul class="pagination    ">
                  <li class="page-item mx-1 ">
                    <a class="page-link" href="#" aria-label="Previous">
                      <span aria-hidden="true"> <FaLessThan fontSize={15} fontWeight={10}/> prev </span>
                    </a>
                  </li>
                  <li class="page-item mx-1 active" aria-current="page"><a class="page-link" href="#">1</a></li>
                  <li class="page-item mx-1"><a class="page-link" href="#">2</a></li>
                  <li class="page-item mx-1"><a class="page-link" href="#">3</a></li>
                  <li class="page-item mx-1">
                    <a class="page-link" href="#" aria-label="Next">
                    <span aria-hidden="true"> Next <FaGreaterThan fontSize={15} fontWeight={10}/>  </span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
  )
}

export default Pagination