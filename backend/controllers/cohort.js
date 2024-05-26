const express = require('express')
const dotenv = require("dotenv")
const db = require("./../db.js")
const formidable = require("formidable")
const cloudinary = require('../middleware/cloudinary.js')

dotenv.config()

const createCohort = async (req, res) => {

    try {
        if (req.user === null) {
            return res.status(400).json({ message: "unauthorized" })
        } else {
            let form = new formidable.IncomingForm()

            form.parse(req, async (err, fields) => {
                const { title, start, end, mode } = fields

                if(title === "" && start === "" || end === "" || mode === ""){
                    return res.status(400).json({ message: "all fields are required"})
                }else{
                    const sql = "SELECT * FROM cohort  where title = ?  and mode = ?";
                    
                await db.query(sql, [title, mode], async(error, results) => {
                    if (error) {
                        res.status(400).json({ message: error.message });
                    } else if(results.length > 0){

                      

                        res.status(400).json({ message: "Data Exists" });
                       
                    }else{
                       
                        const sql = "INSERT INTO cohort(title, start, end, mode) values(?,?,?,?)";

                        await db.query(sql, [title, start, end, mode], (err, rows) =>{
                            if(err){
                                return res.status(400).json({message: err.message});
                            }else{
                                return res.status(200).json({message:"success"})
                            }
                        })

                    }


                })
                }
            })
        }

    } catch (e) {
        res.status(400).json({ message: e.message });
    }
}

const getCohort = async (req, res) => {

    try {
        const sql = "SELECT * FROM  cohort";

        await db.query(sql, (error, results, fields) => {
            if (error) {
                res.status(400).json({ message: error.message });
            } else {
                res.status(200).send(results);
            }

        })
    } catch (e) {
        res.send(e)
    }

}



module.exports = { createCohort, getCohort }