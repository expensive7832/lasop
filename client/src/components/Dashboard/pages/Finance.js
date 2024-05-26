import React from 'react'
import TopForm from './TopForm'
import "./finance.css"
import MyChart from './MyChart'
import user from "./../../../assets/Notification.png"
function Finance() {

    const finances = [
        {title: "Income", amount: "21,000,0000"},
        {title: "Expenses", amount: "-1.3000,0000"},
        {title: "Debt", amount: "120,000"},
    ]

    const recentpayment = [
      {pay: 40000, img: user, name: "Nathaniel Kingsley", dpt: "UI/UX", date: new Date().toLocaleDateString()},
      {pay: 40000, img: user, name: "Nathaniel Kingsley", dpt: "UI/UX", date: new Date().toLocaleDateString()},
      {pay: 40000, img: user, name: "Nathaniel Kingsley", dpt: "UI/UX",  date: new Date().toLocaleDateString()},
      {pay: 40000, img: user, name: "Nathaniel Kingsley", dpt: "UI/UX", date: new Date().toLocaleDateString()},
      
  ]

  return (
    <div className="finance">
        <TopForm title="Finances"/>
        <hr className="text-primary" />
        <div className="container">
            <div className="row ">
            {finances?.map((fin, i) =>(
                <div key={i} className="col-md-4 col-12 rounded my-1">
                  <div className={`card amount  ${i === 2 && "amount_active"}`}>
                    <div className="card-body">
                    <p>{fin?.title}</p>
                    <h6 className={`${i === 2 && "amount_active_text"}`}>₦{fin?.amount}</h6>
                    </div>
                  </div>
                </div>
            ))}
            </div>
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-8 col-12 chart">
              <MyChart className=""/>
            </div>
            <div className="col-md-4 col-12">
            <div className="card recent-activity">
                        <div className="card-body">
                            <p>Recent payment</p>
                            {recentpayment?.map((rp, i) =>(
                                <div className="d-flex first align-items-center flex-column flex-md-row justify-content-between">
                                    <div className="left w-100 d-flex align-items-center">
                                        <img src={rp?.img} alt="user" className=''/>
                                        <div >
                                            <p>{rp?.name}</p>
                                           <div className='d-flex'>
                                            <small>{rp?.dpt}</small>
                                            <small>{rp?.date}</small>
                                           </div>
                                        </div>
                                    </div>

                                    <div className="right">
                                        <p>₦{rp?.pay}</p>
                                    </div>
                                   
                                </div>
                            ))}
                        </div>
                    </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Finance