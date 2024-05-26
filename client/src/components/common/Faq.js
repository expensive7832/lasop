import React, { useEffect, useState } from "react";
import Faquestion from "react-faq-component";
import doubleline from "./../../assets/double.png"
import "./faq.css"


function Faq() {

    const data = {
        rows: [
            {
                title: "I don’t have any background knowledge in programming, can I apply?",
                content: `Yes, you can. You don’t need any background knowledge in IT or coding before you can register. Having one is only an advantage for you. At LASOP, we start from the basics and guide you through all you need to know to be a successful software developer.`,
            },
            {
                title: "What Must I Do To Be Successful In The Program?",
                content:
                    "Be aware that your success is our priority. To be successful in the program, you must get yourself fully involved by not missing lesson periods, actively obeying instructors, mentors and even classmates. You must also practice constantly and execute real life projects.",
            },
            {
                title: "What Materials Do I Need For This Program?",
                content: `For your training, you need a laptop (Mac, Linus or PC) with a minimum of 4GB ram, and a storage capacity of at least 250GB.Every other software will be installed with the help of our experts before the beginning of the course. `,
            },
            {
                title: "What Are My Expectations At The End Of The Program?",
                content: "By the end of this course must have: Completed several individual and group projects, Learned about software development from our experienced developers, Be equipped with all the foundational knowledge needed for your new career.",
            },
            {
                title: "I have basic knowledge in software development already. Do you have an advanced package for me?",
                content: "Yes, at LASOP, we offer advanced training to people who have completed a course(s) in programming, but wish to learn more.",
            },
            {
                title: "I have basic knowledge in software development already. Do you have an advanced package for me?",
                content: "Yes, at LASOP, we offer advanced training to people who have completed a course(s) in programming, but wish to learn more.",
            },
            {
                title: "Can we register for courses online via the website?",
                content: "Yes. Payments are made to LASOP official accounts through any of Mobile payments, electronic bank transfers, USSD or bank teller system.",
            },
            {
                title: "Is Lagos School of Programming government owned?",
                content: "Lagos School of Programming Limited is a private owned company, approved by government.",
            },
            {
                title: "How Much Is Course fee?",
                content: "Course fee is variant, depending on the course one decides to go for. Visit course pages for details",
            },
            {
                title: "Is ther any other payment aside course fee?",
                content: "No, there is no other payment",
            },
            {
                title: "What are the courses offered",
                content: "The courses available across our centers are: Fullstack Web Development, Frontend Web Development, Backend Web Development, Mobile App Development, UI/UX, Machine Learning and AI, Data Science and Data Analysis",
            },
            {
                title: "Who can enrol",
                content: "Anyone between the ages of 15-65, irrespective of educational status can enrol",
            },
            {
                title: "Is certificate given upon graduation",
                content: "Yes, a certificate is issued upon graduation",
            },

        ],
    };

    const config = {
        animate: true,
        arrowIcon: "V",
        openOnload: 0,
        expandIcon: "+",
        collapseIcon: "-",
    };

    const style = {
        bgColor: "transparent",
        rowTitleColor: "#fff",
        rowContentColor: "#fff",
        arrowColor: "#fff",
        rowContentPaddingTop: "10px",
        rowContentPaddingBottom: "10px",
        rowContentPaddingLeft: "10px",
        rowContentPaddingRight: "10px",
        transitionDuration: "0.9s",
        timingFunc: "ease-in-out"

    }

  return (
    <div className="faqs p-5">


        <div className="info">
        <Faquestion
                styles={style}
                data={data}
               config={config}
            />
        </div>

    </div>
  )
}

export default Faq