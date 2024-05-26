const dotenv = require("dotenv")
const mysql = require("mysql")
dotenv.config()

const pwd = process.env.DB_PWD
const host = process.env.DB_HOST
const dbname = process.env.DB_NAME
const user = process.env.DB_USER
// Option 3: Passing parameters separately (other dialects)
const db = mysql.createConnection({
  host,
  database: dbname,
  user, 
  password: pwd,
})





module.exports = db;