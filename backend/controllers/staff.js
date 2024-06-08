const formidable = require("formidable")
const db = require("../db")

const addStaff = async(req, res) =>{
   
    if (req.user === null) {
        res.status(400).json({ message: "authentication required" })

    } else if (req?.user?.role !== "admin") {
        res.status(400).json({ message: "unauthorized access" })

    }else{
        let form = new formidable.IncomingForm()

        form.parse(req, async(err, fields,file) =>{
            if(err) {
                console.log(err);
            }else{

                const { userId, role,staffid, salary,dpt } = fields

                let checksql = "SELECT * FROM staff where staffID = ?"

                if(userId == "" || role == "" || staffid == "" || salary == "" || dpt == ""){
                    res.status(400).json({message: "all fields are required"})
                }else{

                

                await db.query(checksql, [staffid], async(err, result) =>{
                    if(err){
                        console.log(err);
                    }else if(result.length > 0){
                        res.status(400).json({message: "staff ID already exists"})
                    }else{
                        
                        
        
                      let sql = "INSERT INTO staff(userid, dpt,staffID,salary, role) VALUES(?,?,?,?,?)"
        
                      await db.query(sql, [userId, dpt, staffid,salary,role], async(err,result) =>{
                        if(err){
                            res.status(400).json({message: err.message})
                        }else{
                            let updateusersql = "update users set role = ? where id = ?"
                            await db.query(updateusersql, ["staff",userId])
                            res.status(201).json({message: "success"})
                        }
                      })
                    
                    }
                })

            }
                
            }
        })
    }
}


const fetchStaffInfo = async(req, res) =>{
    if (req.user === null) {
        res.status(400).json({ message: "authentication required" })

    } else if (req?.user?.role !== "admin") {
        res.status(400).json({ message: "unauthorized access" })

    }else{

        let { id } = req.params

        let sql = "SELECT users.*, staff.datecreated as employedDate, staff.dpt as stack, staff.staffID, staff.salary, staff.role FROM users INNER JOIN staff on staff.userid = users.id where users.id = ?"

        await db.query(sql, [id], (err, results) =>{
            if(err){
                console.log(err);
            }else{
                res.status(200).send(results[0]);
            }
        })
    } 
}


module.exports = {
    addStaff,
    fetchStaffInfo
}