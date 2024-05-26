// const dotenv = require("dotenv")
// const formidable = require("formidable")
// const db = require('../db.js')

// dotenv.config()

// const addCurriculum = async(req, res) =>{
//     const { cohort, code, start, end, cid } = req.body

//     const checksql = "SELECT * FROM calendar WHERE cohort = ? AND code = ? AND start = ? AND end = ?"
//         if(req.user === null || req.user.role !== "admin"){
//             res.status(400).json({message: "unauthorized"})
//         }
//         else if(cohort === "" || code === "" || start === "" || end === "" || cid === ""){
//             res.status(400).json({message: "field cannot be empty"})

//         }else{
//             await db.query(checksql, [cohort, code, start, end], async(err, result ) =>{
//                 if (result?.length > 0) {
//                     res.status(400).json({ message: "Calendar Already Exists" })

//                 }else{
                    
//                     let sql = "INSERT INTO calendar(cohort, code, start, end, cid) VALUES(?,?,?,?,?)"
//                     await db.query(sql,[cohort, code, start, end, cid], async(err, result) =>{
//                         if(err){
                            
//                             res.status(400).json({ message:err.message})

//                         }else{
//                             res.status(200).json({ message:"success"})
//                         }
//                     } )
//                 }
//             })

//         }
   
// }

// const updateCalendar = async(req, res) =>{
//     const {id} = req.params
   
//     const { cohort, code, start, end, cid } = req.body

//     if(req.user === undefined || req.user.role !== "admin"){
//         res.status(400).json({message: "unauthorized"})
//     }
//     else if(cohort === "" || code === "" || cid === "" || start === "" || end === ""){
//         res.status(400).json({mesage: "no changes made"})

//     }else{
//         let sql = "UPDATE calendar SET cohort = ?, code = ?, start = ? , end = ? , cid = ? WHERE id = ?";

//         await db.query(sql,[cohort, code, start, end, cid, id], async(err, result) =>{
//             if(err){
//                 res.status(400).json({message: err.message});
//             }else{
//                 res.status(200).json({message:"success"})
//             }
//         });
//     }
// }

// const getCalendar = async(req, res) => {
//     let sql = "SELECT * FROM calendar";

//     await db.query(sql, async(err, result) =>{
//         if(err){
//             res.status(400).json({message:err.mesage})
//         }else{
//             res.status(200).json({message:result})
//         }
//     })
// }

// const deleteCalendar = async(req, res) =>{
//     const {id} = req.params
 

//     if(req.user === undefined || req.user.role !== "admin"){
//         res.status(400).json({message: "unauthorized"})
//     }
//     else{
//         let sql = "DELETE FROM calendar WHERE id = ?";

//         await db.query(sql,[ id ], async(err, result) =>{
//             if(err){
//                 res.status(400).json({message: err.message});
//             }else{
//                 res.status(200).json({message:"success"})
//             }
//         });
//     }
// }


// module.exports = { addCalendar, updateCalendar , getCalendar , deleteCalendar}