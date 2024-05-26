const jwt = require("jsonwebtoken")
const dotenv= require("dotenv")
const db= require("../db.js")

dotenv.config()

const Protect = async (req, res, next)=>{
    let token;
 
    if(req?.headers?.authorization !== undefined && req?.headers?.authorization?.startsWith('Bearer')){
     

            token = req?.headers?.authorization?.split(' ')[1];
            const decode = jwt?.verify(token, process.env.JWT_SECRET);
            const {id, email} = decode
           

            let sql = "SELECT * FROM users WHERE email = ? AND id = ?"

            await db.query(sql, [email, id],(err, result) =>{
                req.user = result[0]
                next()
            })

        
    }else{
        req.user = null
        next()
    }



   

    
}

module.exports =  Protect