import React from "react";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/Sidebar";
import Header from "../header/Header";
import { Container } from "reactstrap";
import Home from "../pages/home/Home";
import {toast} from "react-toastify"
import { useRef } from "react";
import "./layout.css"
import Applicants from "../pages/applicants/Applicants";
import Students from "../pages/student/Students";
import Staffs from "../pages/staff/Staffs";
import StaffProfile from "../pages/staff/StaffProfile";
import StudentProfile from "../pages/student/StudentProfile";
import Finance from "../pages/finance/Finance";
import Syllabus from "../pages/syllabus/Syllabus";
import Cohortsyllabus from "../pages/cohort/Cohortsyllabus";
import Exams from "../pages/exam/Exams";
import ExamByDpt from "../pages/exam/ExamByDpt";
import Calendar from "../pages/calendar/Calendar";
import User from "../pages/user/User"
import UpdateUser from "../pages/updateuser/Updateuser"
import Blog from "../pages/blog/Blog";
import Receipt from "../pages/receipts/Receipt";
import { useSelector } from "react-redux";
import { LastPage } from "../../../Redux/Slices/onboardslice";



const Layout = () => {

  const navigate = useNavigate()

  var sb = useRef()

  const {text} = useParams()

  const user = useSelector((state) => state?.user)
  const dispatch = useNavigate()



  const showPage = () =>{

    if(text === "home"){
      return <Home/>
      
    }else if(text === "calendar"){
      return <Calendar/>
    
    }else if(text === "blog"){
      return <Blog/>
    }
    
    else if(text === "applicants"){
    
      return <Applicants/>
    }else if(text === "students"){

      const uid = new URLSearchParams(window.location.search).get("id")
      
      return uid === null ? <Students/>: <StudentProfile id={uid} />
    
    }else if(text === "user"){

    const uid = new URLSearchParams(window.location.search).get("id")
    
    return uid === null ? <User/>: <UpdateUser id={uid} />
  
  }
    else if(text === "staffs"){
      const uid = new URLSearchParams(window.location.search).get("id")
      return uid === null ? <Staffs/>: <StaffProfile id={uid} />
      
    }else if(text === "finances"){
      return <Finance/>

    }else if(text === "syllabus"){
    
      const uid = new URLSearchParams(window.location.search).get("id")
      
      return uid === null ? <Syllabus/>: <Cohortsyllabus id={uid} />
    
    }else if(text === "exam"){
      const uid = new URLSearchParams(window.location.search).get("id")
      const title = new URLSearchParams(window.location.search).get("title")

      return uid === null ? <Exams/>: <ExamByDpt id={uid} title={title} />
    
    }else if(text === "receipt"){
      return <Receipt/>
    }
    
  }

 

  function Oops(){
    toast.error("Oops! you need to pay to access the dashboard")
   setTimeout(() =>{
    dispatch(LastPage())
    navigate("/signup")
   }, 1000)
  }

  return (
  
   <>
   
   {user?.info?.role === "admin" ?
   
   <main className="" >
   <div className="pageWrapper d-lg-flex">
     {/********Sidebar**********/}
     <aside className="sidebarArea shadow " ref={sb}>
       <Sidebar sideBarArea={sb}/>
     </aside>
     {/********Content Area**********/}

     <div className="contentArea w-100">
       {/********header**********/}
       <Header sideBarArea={sb}/>
       {/********Middle Content**********/}
       <Container className="p-4 wrapper" fluid>
         {showPage()}
       </Container>
     </div>
   </div>
 </main>

 :

 user?.info?.paymentstatus === 1?

 <main className="" >
 <div className="pageWrapper d-lg-flex">
   {/********Sidebar**********/}
   <aside className="sidebarArea shadow" ref={sb}>
     <Sidebar sideBarArea={sb}/>
   </aside>
   {/********Content Area**********/}

   <div className="contentArea w-100">
     {/********header**********/}
     <Header sideBarArea={sb}/>
     {/********Middle Content**********/}
     <Container className="p-4 wrapper" fluid>
       {showPage()}
     </Container>
   </div>
 </div>
</main>

:

<Oops/>

 

 
}
   
 




   </>

  );
};

export default Layout;

