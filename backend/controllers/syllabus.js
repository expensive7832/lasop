const express = require('express')
const dotenv = require("dotenv")
const db = require("./../db.js")
const formidable = require("formidable")
const cloudinary = require('../middleware/cloudinary.js')
const fs = require('fs')



dotenv.config()

const uploadSyllabus = async (req, res) => {

    try {

        if (req.user.role !== "admin") {
            return res.status(400).json({ message: "unauthorized" });

        } else {
            const form = new formidable.IncomingForm()
            form.parse(req, async (err, fields, file) => {
                const { dpt, chrtid } = fields
                const { syllabus } = file
                if (dpt == "") {
                    res.status(400).json({ message: "select department" });
                }
                else if (chrtid == "") {
                    res.status(400).json({ message: "select cohort" });
                }
                else if (syllabus.originalFilename == "") {

                    res.status(400).json({ message: "pick a syllabus file" });

                } else {

                    await cloudinary.v2.uploader.upload(syllabus.filepath, {
                        resource_type: "auto"
                    },
                        async (err, data) => {
                            if (err) {
                                return res.status(400).json({ message: err.message })

                            } else {
                                let sql = "INSERT INTO syllabus(chrt, dpt, imgid, imgurl) VALUES(?,?,?,?)"

                                await db.query(sql, [chrtid, dpt, data.public_id, data.secure_url], async (err, data) => {
                                    if (err) {
                                        return res.status(400).json({ message: err.message })
                                    } else {
                                        return res.status(200).json({ message: "success" })
                                    }
                                })
                            }
                        }
                    )

                }
            })
        }




    } catch (e) {
        res.send(e)
    }
}

const retrieveSyllabus = async (req, res) => {

    try {
        
        const {id} = req.query
        
        if(id == undefined || id == ""){
            throw new Error("invalid");

        }else{
            let sql = "SELECT * FROM syllabus where dpt = ? order by chrt asc";

            await db.query(sql, [id], (err, rows) =>{

                if(err){
                    throw new Error(err.message)
                }else{
                    return res.status(200).json({data:rows});
                }
    
            })
        }

    } catch (e) {
        return res.status(400).json({message: e.message})
    }
}





module.exports = { uploadSyllabus , retrieveSyllabus}