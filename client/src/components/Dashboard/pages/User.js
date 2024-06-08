import React, { useLayoutEffect, useState } from "react";
import TopForm from "./TopForm";
import { FaAlignLeft, FaEye, FaGreaterThan, FaLessThan, FaSearch } from "react-icons/fa";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BsFilter } from "react-icons/bs";
import { toast } from "react-toastify"

import "./user.css"
import { useSelector } from "react-redux";
import { Spinner } from "reactstrap";

function Users() {

  const token = useSelector((state) => state?.user?.token)

  const navigate = useNavigate()
  const [pagination, setPagination] = useState(1);

  const [search, setSearch] = useState("");
  const [datas, setDatas] = useState([]);
  const [searchDatas, setSearchDatas] = useState([]);
  const [searchStatus, setSearchStatus] = useState(false);

  async function getApp() {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/allusers`,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      })
      .then((res) => setDatas(res?.data))
      .catch((err) => {
        
        for(let each in err.response.data){
          if(err.response.data[each] === "invalid credentials"){
            
            toast.error(err.response.data[each])

            navigate("/login")

           }
           else{
            toast.error(err.response.data[each])
          }
        }
      });
  }

  useLayoutEffect(() => {
    getApp();

    return () => {
      getApp();
    };
  }, []);

  const handleSearch = async() =>{

    setSearchStatus(true)

    await axios.get(`${process.env.REACT_APP_API_URL}/search?q=${search}`)
    .then((res) => {
     
      
      if(res.data?.length === 0){
        toast.warn("No user found")
      }else{
        setSearchDatas(res.data)
      }

      setSearchStatus(false)
    })
    .catch((error) => {
     for(let err in error.response.data){
      toast.warn(error.response.data[err])
     }
      setSearchStatus(false)
    })

  
  }

  return (
    <div className="users">
      {/* top header */}

      <div style={{backgroundColor:"#000066"}} className="text-white p-3">
      <div className="p-3 container-fluid d-flex justify-content-between flex-row">
        <h5 className="h3">Users</h5>

        

        <div className="d-flex gap-1 border border-muted justify-content-around align-items-center">
          <BsFilter color="#fff" />
          <small>filter</small>
          <form>
            <select name="" className="filter" >
              <option value=""></option>
              <option value="" className="form-control">
                24hrs
              </option>
            </select>
          </form>
        </div>
      </div>

      {/* search */}

      <div className="d-flex search" >
          <input onChange={(e) => setSearch(e.target.value)} placeholder="search for user... e.g john doe" type="text" className="form-control p-3" />
          <button  onClick={handleSearch} className="btn btn-dark">
            <FaSearch color="#fff"/>
          </button>
        </div>

        </div>

      {/* top header end */}

    <hr />

    {
      searchStatus  ?

     <div className="position-absolute top-50  start-50 ">
      <img  style={{ width: "5rem", height:"5rem"}} src={require("./../../../assets/loading.gif")} alt="" />
     </div>

      :

      searchDatas?.length > 0 ?
// search datas
      <div className="applicants-table table-responsive-xxl">
      <table class="table text-center">
        <thead className="" style={{ backgroundColor: "#9EA9BD" }}>
          <tr>
            <th scope="col">S/N</th>
            <th scope="col">Name</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Role</th>
            <th scope="col">Student Mode</th>
            <th scope="col">Date</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody className="">
          {searchDatas?.map((d, i) => (
            <tr key={d?.id}>
              <td scope="row">{d?.id}</td>
              <td>{`${d?.fname}  ${d?.lname}`}</td>
              <td>
                <a className="nav-link" href={`tel:${d?.phone}`}>
                  {d?.phone}
                </a>
              </td>

              <td >{d?.loc}</td>
              <td>{d?.role}</td>
              {
                d?.role === "admin" ||
                d?.role === "staff" ?

                <td> - </td>
                :

                <td>{d?.learningstatus}</td>
              }
          
            
              <td>{new Date(d?.datecreated).toDateString()}</td>
              <Link
                to={`/dashboard/user?id=${d?.id}`}
                className="rounded   mb-1 d-flex border align-items-center justify-content-around border-primary"
              >
                
                <p className="text-primary m-auto">Update</p>
              </Link>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    :

    // all users
    <div className="applicants-table table-responsive-xxl">
    <table class="table text-center">
      <thead className="" style={{ backgroundColor: "#9EA9BD" }}>
        <tr>
          <th scope="col">S/N</th>
          <th scope="col">Name</th>
          <th scope="col">Phone</th>
          <th scope="col">Address</th>
          <th scope="col">Role</th>
          <th scope="col">Student Mode</th>
          <th scope="col">Date</th>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody className="">
        {datas?.map((d, i) => (
          <tr key={d?.id}>
            <td scope="row">{d?.id}</td>
            <td>{`${d?.fname}  ${d?.lname}`}</td>
            <td>
              <a className="nav-link" href={`tel:${d?.phone}`}>
                {d?.phone}
              </a>
            </td>

            <td className="" >{d?.address}</td>
            <td>{d?.role}</td>
            {
                d?.role === "admin" ||
                d?.role === "staff" ?

                <td> - </td>
                :

                <td>{d?.learningstatus}</td>
              }
          
            <td>{new Date(d?.datecreated).toDateString()}</td>
            <Link
              to={`/dashboard/user?id=${d?.id}`}
              className="rounded   mb-1 d-flex border align-items-center justify-content-around border-primary"
            >
             
              <p className="text-primary m-auto">Update</p>
            </Link>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

      
    }

      <div className="align-items-center d-flex justify-content-end">
        <FaLessThan color="#0d6efd" size={18} />
        <div className="mx-2">
          {[1, 2, 3]?.map((n, i) => (
            <button
              onClick={() => setPagination(n)}
              key={i}
              className={`btn ${pagination === n && "bg-primary text-white"}`}
            >
              {n}
            </button>
          ))}
        </div>
        <FaGreaterThan color="#0d6efd" size={18} />
      </div>
    </div>
  );
}

export default Users;
