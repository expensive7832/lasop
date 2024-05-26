const db = require("../db.js")

const checkUser = async(req, res, next) =>{
    let { id } = req.params

   let sql = "SELECT * FROM users where id = ?"

   await db.query(sql, [id], (err, rows) =>{
    if(err) {console.log(err)}
    else{
       // console.log(rows[0]?.id);
       req.user = rows[0]?.id
    }
   })

    next()
}


module.exports =  checkUser