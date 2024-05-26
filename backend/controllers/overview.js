const dotenv = require('dotenv')
const db = require("./../db.js")

dotenv.config()

const getTotalStudents = async(req, res) =>{

    let sql = "select COUNT(id) as total from users where paymentstatus = ? AND role = ? "

    await db.query(sql, [1, "student"], (err, data) =>{
        return res.status(200).send(data[0])
        
    })
}
const getTotalApplicants = async(req, res) =>{

    let sql = "select COUNT(id) as total from users where paymentstatus = ? AND role = ? "

    await db.query(sql, [0, "student"], (err, data) =>{
        return res.status(200).send(data[0])
        
    })
}

const getTotalGraduate = async(req, res) =>{

    let sql = "select COUNT(id) as total from users where paymentstatus = ? AND role = ? AND edustatus = ?"

    await db.query(sql, [1, "student", 3], (err, data) =>{
        return res.status(200).send(data[0])
        
    })
}


module.exports = {
    getTotalStudents,
    getTotalApplicants,
    getTotalGraduate
}
