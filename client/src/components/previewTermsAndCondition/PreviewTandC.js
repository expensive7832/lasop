import React, { useState } from "react";
import "./tandc.css";
import TandC from "../../assets/tandc.docx";

function PreviewTandC() {
  return (
    <div className="p-3">
      <h6 className="text-center text-md-start "> ADMISSION AND STUDY TERMS AND CONDITIONS</h6>
      <h6 style={{ margin: "10px 0" }}>PREAMBLE</h6>
      These are the valid rules binding the persons or person that signs it, so
      that he or she becomes a trainee, at any centre of Lagos school of
      Programming Limited, otherwise known as “LASOP” and LASOP and its assigns.
      The parties; “student” and “LASOP” therefore covenant’s as follows:
      <h6 style={{ margin: "10px 0" }}>ENROLMENT</h6>
      <ul style={{ listStyleType: "number" }}>
        <li>
          When a person pays any fee to LASOP or and attends any class,
          organized by LASOP, it means that the candidate has acknowledged and
          accepted and therefore signed this terms and conditions.
        </li>
        <li>
          LASOP is obligated then after, to teach the student the course he or
          she is enrolled in, using one or more of her assigned tutors. LASOP
          ensures that all the course units and syllabus that the student should
          learn is fully covered, either within the time allotted for the course
          to be completed or at most, by the end of an extra month.
        </li>
        <li>
          The student is to come to classes with one personal computer, its
          charger and a bag for carrying the computer and its accessories. The
          bag can contain books related to the student’s course of study and
          writing materials. The Student can come with food or water but he or
          she is to keep them safely under their tables or in lockers if
          provided. The student is not allowed to come with any other thing,
          harmful or harmless.
        </li>
      </ul>
      <h6 style={{ margin: "10px 0" }}>PAYMENTS</h6>
      <ul style={{ listStyleType: "circle" }}>
        <li>
          Payment of course fees must be made in full before the first day of
          class. Should the school allow the student to pay his or her fees in
          installments, the student must complete the payment by the due date as
          communicated to him or her during enrolment.{" "}
        </li>
        <li>Course fee is nonrefundable.</li>
        <li>
          When LASOP fails to begin a course after one month of when it should
          begin or, when an active course stops abruptly and LASOP fails to
          continue the course after one month, fees paid must be refunded to the
          students affected. The fees refundable is based on the number of days
          not covered and not on what has been taught. The finance office shall
          prorate and decide the amount refundable to each concerned, payments
          of the refunds shall be made, excluding the general registration fees
          for each course which is usually 20% of the total amount the course
          cost.{" "}
        </li>
        <li>
          Payments of course fees can be paid online through the official
          website or in cash, or as a bank deposit and the payment must be made
          only to the schools official bank account. LASOP shall not recognize
          any fee paid to unofficial bank accounts.
        </li>
        <li>
          Payment of course fee in Installments is considered by management at
          discretion and not automatic. Where applicable, only two installments
          shall be permitted and the minimum amount allowed for the first
          installment is 70% of the total fee and the balance must be paid
          within one month from the start of the course enrolled for or should
          be paid just as described in the previous article, numbered 1.
        </li>
        <li>
          The management shall withdraw without readmission, any student who
          fails to meet up with payment plans permitted. A thorough breakdown of
          the installments plan is given on the installments contracts and all
          students paying their fees in installments must read and sign it. It
          is noteworthy to mark that not reading nor signing the FEES BY
          INSTALLMENT document does not exempt any student who falls into the
          fees by installment category from being liable to the contract. They
          are automatically liable the moment they decide to pay their fees in
          installment.
        </li>
      </ul>
      <h6 style={{ margin: "10px 0" }}>ATTENDING CLASSES</h6>
      <ul style={{ listStyleType: "number" }}>
        <li>
          Students must be punctual and serious minded. When a student is
          absent, or found to be fond of coming late to classes, even up to 50%
          by mid-course, the student shall be withdrawn from the school and
          shall not be readmitted.
        </li>
        <li>Students must dress decently to be admitted into the classroom.</li>
        <li>
          Weekdays classes begin at 9:00am and end at 6:00pm daily, and it
          occurs only three days between Mondays to Fridays.
        </li>
        <li>
          Weekend classes are from 09:00am on Saturdays and 11am on Sundays.
        </li>
        <li>
          Management, in collaboration with tutors can however decide timing
          adjustments in favor of the student from time to time especially for
          flexibility.
        </li>
        <li>
          PLEASE NOTE THAT a student can be in the morning or afternoon set at a
          stage in the course and that the set a student shall be in is entirely
          decided by LASOP. Morning set starts their classes at 9:00am and
          closes at 2:00pm while the afternoon set starts their classes by
          2:00pm and closes by 6:00pm. However, students should prepare to be
          engaged from morning to evening on any of the days their class falls
          in.
        </li>
        <li>
          Take note: <br />
          No phone calls in the classroom. <br />
          Respect, listen and pay keen attention during classes. Do not disturb
          others. <br />
          Always ask questions when you don’t understand. <br />
          Eating in the classroom is prohibited.
        </li>
        <li>
          Unhealthy use of technology, the internet and computers in and around
          the school premise, whether or not they belong to the student is
          prohibited.
        </li>
      </ul>
      <h6 style={{ margin: "10px 0" }}>
        SCHOOL EQUIPMENTS, FACILITIES & ACTIVITIES.
      </h6>
      <ul style={{ listStyleType: "number" }}>
        <li>
          Students are to make good use of the facilities/equipment of the
          school and should not destroy or take away any property. The student
          is liable to pay for any equipment or facility destroyed.
        </li>
        <li>
          It is the responsibility of the student to keep the classroom clean.
        </li>
        <li>
          The publication of printed and electronic materials that features
          students class work photographs, designs and videos for online and
          offline promotion of the student and of LASOP is a consensual,
          collective responsibility.
        </li>
      </ul>
      <h6 style={{ margin: "10px 0" }}>COURSE CERTIFICATE</h6>
      <ul style={{ listStyleType: "number" }}>
        <li>
          Students will be awarded course certificates at the end of the course.
          They will be denied the certificate if they fail to complete an
          overall of 50% attendance.
        </li>
        <li>
          Students can download course certificates from the schools website
          with their student ID once they graduate.
        </li>
      </ul>
    </div>
  );
}

export default PreviewTandC;
