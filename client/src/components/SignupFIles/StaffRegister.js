import React, { useState } from "react";
import Navbar from "../navbarfiles/Navbar";
import Footer from "../footerfiles/Footer";
import axios from "axios";
import { Spinner } from "reactstrap";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const StaffRegister = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async(e) =>{
        e.preventDefault();

        setLoading(true);

        const form = new FormData(e.currentTarget)

        await axios.post(`${process.env.REACT_APP_API_URL}/staffregister`, form)
        .then((res) => {
            setLoading(false)
            toast.success("success")
            navigate("/login")
        })
        .catch((err) => {
            for(let i in err.response.data){
                if(err?.response?.data[i] == "unathorized"){
                    toast.error(err.response.data[i])
                    navigate("/signup");
                }else{
                    toast.warn(err.response.data[i])
                }
            }
            setLoading(false)
        })

    }

  return (
    <div className="adminregister">
      <main className="d-flex container  justify-content-center align-items-center p-5 ">
        <div className="row">
        <form onSubmit={handleSubmit} className="shadow shadow-dark rounded-4 ">
              <div className=" p-3">
                <div className="my-1 ">
                  <input type="text" name="fname" className="form-control" />
                  <label htmlFor="">FirstName</label>
                </div>
                <div className="my-1">
                  <input type="text" name="lname" className="form-control" />
                  <label htmlFor="">LastName</label>
                </div>
                <div className="my-1">
                  <input type="email" name="email" className="form-control" />
                  <label htmlFor="">Email</label>
                </div>
                <div className="my-1">
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                  />
                  <label htmlFor="">Password</label>
                </div>
                <div className="my-1">
                  <input
                    type="text"
                    name="passcode"
                    className="form-control"
                  />
                  <label htmlFor="">Passcode</label>
                </div>

                <button className="btn my-2 w-100 btn-md btn-dark">
                    {loading === false ? "REGISTER" : <Spinner/>}
                </button>
              </div>
            </form>
        </div>
      </main>
    </div>
  );
};

export default StaffRegister;
