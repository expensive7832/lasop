const dotenv = require("dotenv")
const formidable = require("formidable")
const db = require('../db.js')

dotenv.config()

const addCalendar = async(req, res) =>{
    const form = new formidable.IncomingForm()

    form.parse(req, async(err, fields) =>{
        const { cohort, code, start, end, cid, mos, center, session } = fields
        const checksql = "SELECT * FROM calendar WHERE cohort = ? AND code = ? AND start = ? AND end = ?"
       
        if(req.user === null || req.user.role !== "admin"){
            res.status(400).json({message: "unauthorized"})
        }
        else if(cohort === "" || code === "" || start === "" || end === "" || cid === "" || mos === "" || center === "" || session === "" ){
            res.status(400).json({message: "field cannot be empty"})

        }else{
            await db.query(checksql, [cohort, code, start, end], async(err, result ) =>{
                if (result?.length > 0) {
                    res.status(400).json({ message: "Calendar Already Exists" })

                }else{
                    
                    let sql = "INSERT INTO calendar(cohort, code, start, end, cid, mode, center, session) VALUES(?,?,?,?,?,?,?, ?)"
                    await db.query(sql,[cohort, code, start, end, cid, mos, center, session], async(err, result) =>{
                        if(err){
                            
                            res.status(400).json({ message:err.message})

                        }else{
                            res.status(200).json({ message:"success"})
                        }
                    } )
                }
            })

        }
    })
   
}

const updateCalendar = async(req, res) =>{
    const {id} = req.params
   
    const { cohort, code, start, end, cid } = req.body

    if(req.user === undefined || req.user.role !== "admin"){
        res.status(400).json({message: "unauthorized"})
    }
    else if(cohort === "" || code === "" || cid === "" || start === "" || end === ""){
        res.status(400).json({mesage: "no changes made"})

    }else{
        let sql = "UPDATE calendar SET cohort = ?, code = ?, start = ? , end = ? , cid = ? WHERE id = ?";

        await db.query(sql,[cohort, code, start, end, cid, id], async(err, result) =>{
            if(err){
                res.status(400).json({message: err.message});
            }else{
                res.status(200).json({message:"success"})
            }
        });
    }
}

const getCalendar = async(req, res) => {
    let sql = "SELECT * FROM calendar";

    await db.query(sql, async(err, result) =>{
        if(err){
            res.status(400).json({message:err.message})
        }else{
            res.status(200).send(result)
        }
    })
}

const deleteCalendar = async(req, res) =>{
    const {id} = req.params
 

    if(req.user === undefined || req.user.role !== "admin"){
        res.status(400).json({message: "unauthorized"})
    }
    else{
        let sql = "DELETE FROM calendar WHERE id = ?";

        await db.query(sql,[ id ], async(err, result) =>{
            if(err){
                res.status(400).json({message: err.message});
            }else{
                res.status(200).json({message:"success"})
            }
        });
    }
}



const createEvent = async(req, res) =>{
    const form = new formidable.IncomingForm()

    form.parse(req, async(err, fields) =>{
        const { title, date } = fields
        
        const checksql = "SELECT * FROM events WHERE title = ? OR date = ?"
       
        if(req.user === null || req.user.role !== "admin"){
            res.status(400).json({message: "unauthorized"})
        }
        else if(title == "" || date == ""){
            res.status(400).json({message: "field cannot be empty"})

        }else{
            await db.query(checksql, [title, date], async(err, result ) =>{
                if (result?.length > 0) {
                    res.status(400).json({ message: "event Already Exists" })

                }else{
                    
                    let sql = "INSERT INTO events(title, date) VALUES(?, ?)"
                    await db.query(sql,[title, date], async(err, result) =>{
                        if(err){
                            
                            res.status(400).json({ message:err.message})

                        }else{
                            res.status(200).json({ message:"success"})
                        }
                    } )
                }
            })

        }
    })
   
}


const getEvents = async(req, res) =>{
    const sql = "SELECT * FROM events ORDER BY id desc"

    await db.query(sql, (err, rows) =>{
        return res.status(200).json(rows)
    })
}
module.exports = { addCalendar,getEvents, createEvent, updateCalendar , getCalendar , deleteCalendar}