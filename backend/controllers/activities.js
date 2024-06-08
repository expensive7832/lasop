const dotenv = require("dotenv")
const db = require("./../db.js")
const formidable = require("formidable")
const cloudinary = require('../middleware/cloudinary.js')

dotenv.config()

const getMos = async (req, res) => {

    try {
        const sql = "SELECT * FROM  mos where is_active = ?";

        await db.query(sql, [true], (error, results, fields) => {
            if (error) {
                res.status(400).json({ message: error.message });
            } else {
                res.send(results);
            }

        })
    } catch (e) {
        res.send(e)
    }
}

const getLearningStatus = async (req, res) => {

    try {
        const sql = "SELECT * FROM  learningstatus ";

        await db.query(sql, (error, results, fields) => {
            if (error) {
                res.status(400).json({ message: error.message });
            } else {
                res.send(results);
            }

        })
    } catch (e) {
        res.send(e)
    }
}

const getCohort = async (req, res) => {

    try {
        const sql = "SELECT * FROM  cohort where is_active = ?";

        await db.query(sql, [true], (error, results, fields) => {
            if (error) {
                res.status(400).json({ message: error.message });
            } else {
                res.send(results);
            }

        })
    } catch (e) {
        res.send(e)
    }

}

const getlearningstatus = async (req, res) => {

    try {
        const sql = "SELECT * FROM  learningstatus";

        await db.query(sql, (error, results, fields) => {
            if (error) {
                res.status(400).json({ message: error.message });
            } else {
                res.send(results);
            }

        })
    } catch (e) {
        res.send(e)
    }

}
const getCourse = async (req, res) => {

    try {
        const sql = "SELECT * FROM  course where is_active = ?";

        await db.query(sql, [true], (error, results, fields) => {
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
const getAllCourse = async (req, res) => {

    try {
        const sql = "SELECT * FROM  course";

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
const getCenter = async (req, res) => {

    try {
        const sql = "SELECT * FROM  center where is_active = ?";

        await db.query(sql, [true], (error, results, fields) => {
            if (error) {
                res.status(400).json({ message: error.message });
            } else {
                res.send(results);
            }

        })
    } catch (e) {
        res.send(e)
    }


}

const Receipt = async (req, res) => {
    try {


        let form = new formidable.IncomingForm()

        form.parse(req, async (err, fields, file) => {

            let { image } = file
            let user = req.user

            if (user == null) {
                res.status(400).json({ message: "Authentication Failed" })
            }
            else if (image?.originalFilename === "") {
                res.status(400).json({ message: "Provide the receipt" })
            } else {
             
                await cloudinary?.v2?.uploader?.upload(image?.filepath, async(err, imgdata) => {
                    if (err) {
                        console.log(err)
                    } else {
                        const imgurl = imgdata?.secure_url;
                        const imgId = imgdata?.public_id;
                     
                        const sql = "INSERT INTO receipt(userid, imgid, img) VALUES(?,?,?)";

                        await db.query(sql, [user.id, imgId, imgurl], async (err, result) => {
                            if (err) {
                                console.log(err);

                            } else {

                                res.status(200).json({message: "Congratulations, Your application is in process"})
                            }

                        })



                    }
                })

            }



        })
    } catch (e) {
        console.log(e);
    }
}


const getReceipt = async (req, res) => {
    let sql = "SELECT receipt.id as id, receipt.userid as userid, receipt.dateposted as dateposted, users.paymentstatus as status, receipt.img as img, receipt.imgid as imgid  FROM receipt inner JOIN users on receipt.userid = users.id order by id desc"

    await db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({ data: rows });
        }
    })

}

const confirmReceipt = async (req, res) => {

    if (req.user === null || req.user.role !== "admin") {
        return res.status(400).json({ message: "unauthorized" });
    } else {
        let { id, userid } = req.params;

        let sql = "select * from receipt where id = ?"

        await db.query(sql, [id], async (err, rows) => {
            if (err) {
                console.log(err)
            } else {
                if (rows.length === 0) {
                    res.status(400).json({ message: "not found" });
                } else {


                    let sql = "update users set paymentstatus = ? where id = ?"
                    await db.query(sql, [true, userid], async (err, result) => {
                        if (err) {
                            console.log(err)
                        } else {
                            res.status(200).json({ message: "success" })
                        }
                    })
                }
            }
        })
    }
}

const getApplicants = async (req, res) => {
    let sql = "select users.id, users.fname, users.phone as phone, users.paymentstatus as status, users.dateCreated, course.title as coursetitle, calendar.cohort as chrttitle, calendar.center as centertitle, calendar.mode as mostitle, users.edustatus as learningprocess from users inner join course on course.id = users.course inner join calendar on calendar.id = users.mode  where users.paymentstatus = ? and users.role != ?  order by id desc";

    await db.query(sql, [false, "admin"], (err, rows) => {
        if (err) {
            console.log(err)
        } else {

            res.status(200).json({ data: rows })
        }
    })
}

const getStudentByLearningModeStatus = async (req, res) => {
    const { lms } = req.query
    let sql = "select users.id, users.fname, users.phone as phone, users.paymentstatus as status, users.dateCreated, course.title as coursetitle, course.duration as duration, calendar.cohort as chrttitle, calendar.center as centertitle, calendar.mode as mostitle, users.edustatus as learningprocess from users inner join course on course.id = users.course inner join calendar on calendar.id = users.mode where users.edustatus = ? and users.role != ? and users.paymentstatus = ?  order by id desc";

    await db.query(sql, [lms, "admin", true], (err, rows) => {
        if (err) {
            console.log(err)
        } else {

            res.status(200).json({ data: rows })
        }
    })


}



module.exports = { getlearningstatus, getAllCourse, getStudentByLearningModeStatus, getLearningStatus,  getMos, getCenter, getApplicants, getCohort, getCourse, Receipt, getReceipt, confirmReceipt }