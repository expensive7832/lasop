import React from 'react'
import "./testimony.css"
import doubleline from "./../../assets/double.png"
import Slider from 'react-slick'

function Testimony() {

    let testimonyData = [
        {id:1, name: 'Christian Amienghen', color: "#FF7F00", body: "As someone who had no background knowledge about web-development or programming of any sorts, I can boldly say that LASOP is the best institute for learning anything you want about programming. They carry all the students along through the journey from beginner to pro and they ensure that they are independent in writing properly functioning codes. "},
        {id:1, name: 'Mary Seghosime', color: "#ddcffb", body: "I am currently taking my tech training at Lasop Berger centre. It has been an amazing journey. The tutor has been very helpful and the environment so condusive. If you are looking for a place to start your tech career, i highly recommend Lasop. "},
        {id:1, name: 'Josh Ose', color: "#a4aafd", body: "Lectures have been great. The tutor is patient and has good communication skills, people-oriented, and ability to pass knowledge."},
        
    ]

    let settings = {
        fade: true,
        autoplay: true,
        dots:true,
        infinite:true,
        slidesPerRow: 3,
        slidesToScroll:1,
        
        
       responsive: [
        
        {
          breakpoint: 577,
          settings: {
            slidesPerRow: 1,
            slidesToShow: 1,
            slidesToScroll:1,

          }
        },
        {
          breakpoint: 800,
          settings: {
            slidesPerRow: 2,
            slidesToShow: 1,
            slidesToScroll:1,

          }
        },
        
        
        // You can unslick at a given breakpoint now by adding:
        // settings: "unslick"
        // instead of a settings object
      ]
      
       
    }

  return (
    <div className="testimonial p-5">
        <h4 className='text-center'>What Our Students Says</h4>
        <img src={doubleline} className='doubleline' alt="" />

       <div className="container">
        <Slider {...settings} >
        {testimonyData?.map((data, i) =>(
        <div key={i} className="item  rounded rounded-3 p-2">
        <div  style={{"--color": data?.color } } className="card">
           <p  style={{"--color": data?.color } } className="title fw-bold p-2 ">{data?.name}</p>
           <div  className="h6 fw-bold p-2">
           {data?.body}
           </div>

        </div>
    </div>
       ))}
        </Slider>
       </div>
    </div>
  )
}

export default Testimony