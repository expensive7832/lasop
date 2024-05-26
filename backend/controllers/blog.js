
const dotenv = require("dotenv")
const formidable = require("formidable")
const db = require('../db.js')
const cloudinary = require("./../middleware/cloudinary.js")

dotenv.config()



const createArticle = async (req, res) => {
    const form = new formidable.IncomingForm({ multiples: true })

    form.parse(req, async (err, fields, files) => {
        const { title, desc } = fields
        const { photo, main } = files



        if (req.user === null) {
            res.status(400).json({ message: "authentication required" })

        } else if (req?.user?.role !== "admin") {
            res.status(400).json({ message: "unauthorized access" })

        } else if (main.originalFilename === "") {
            res.status(400).json({ message: "select main image" })

        }
        else if (photo?.length === undefined && photo.originalFilename === "") {
            await cloudinary?.v2?.uploader?.upload(main?.filepath, { folder: "lasopproject/article" }, async (err, imgdata) => {
                if (err) {
                    console.log(err)
                } else {
                    const imgurl = imgdata?.secure_url;
                    const imgId = imgdata?.public_id;
                    const sql = "INSERT INTO blog(title, body, userId, imgid, imgurl) VALUES(?,?,?,?,?)";

                    await db.query(sql, [title, desc, req?.user?.id, imgId, imgurl], async (err, result) => {
                        if (err) {
                            console.log(err);

                        } else {
                            res.status(200).json({ message: "Article Created" })
                        }
                    })
                }
            })


        } 
        else if (photo?.length === undefined && photo.originalFilename !== "") {
            cloudinary?.v2?.uploader?.upload(main?.filepath, { folder: "lasopproject/article" }, async (err, imgdata) => {
                if (err) {
                    console.log(err)
                } else {
                    const imgurl = imgdata?.secure_url;
                    const imgId = imgdata?.public_id;
                    const sql = "INSERT INTO blog(title, body, userId, imgid, imgurl) VALUES(?,?,?,?,?)";

                    await db.query(sql, [title, desc, req?.user?.id, imgId, imgurl], async (err, result) => {
                        if (err) {
                            console.log(err);

                        } else {
                            let blogId = result?.insertId
                            cloudinary?.v2?.uploader?.upload(photo?.filepath, { folder: "lasopproject/article" }, async (err, otherdata) => {
                                const otherurl = otherdata?.secure_url;
                                const otherId = otherdata?.public_id;
                                const imgsql = "INSERT INTO blogimage(blogId, imgurl, imgid) VALUES(?,?,?)";

                                db.query(imgsql, [blogId, otherurl, otherId], (err, info) => {
                                    if (err) {
                                        console.log(err);
                                    } else {
                                        res.status(200).json({ message: "Article Created" })
                                    }
                                })
                            })


                        }

                    })



                }
            })

        } 
        else {
            const sql = "INSERT INTO blog(title, body, userId, imgid, imgurl) VALUES(?,?,?,?,?)";

            await cloudinary?.v2?.uploader?.upload(main?.filepath, {folder: "lasopproject/article"}, async(err, imgdata) =>{
                let imageurl = imgdata?.secure_url
                let imageid = imgdata?.public_id
                await db.query(sql, [title, desc, req?.user?.id,imageid, imageurl], async (err, result) => {
                    if (err) {
                        console.log(err);
    
                    } else {
                        let blogId = result?.insertId
                        await photo?.map(async (image) => {
                            await cloudinary.v2.uploader?.upload(image?.filepath, { folder: "lasopproject/article" }, async (err, imgdata) => {
                                const imgurl = imgdata?.secure_url;
                                const imgId = imgdata?.public_id;
    
                                const imgsql = "INSERT INTO blogimage(blogId, imgurl, imgid) VALUES(?,?,?)";
    
                               await db.query(imgsql, [blogId, imgurl, imgId, ], (err, info) => {
                                    if (err) console.log(err);
    
                                })
    
    
                            })
                        })
    
                        res.status(200).json({ message: "Article Created" })
                    }
    
                })
            })
        }
    })
}

const getArticles = async (req, res) => {
   
        const sql = "SELECT  *  FROM blog "
        await db.query(sql, (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.status(200).json({ article: result })
            }
        })
    

}

const getBlogImages = async (req, res) => {
    let { id } = req?.params;
    let sql = 'SELECT * FROM blogimage WHERE blogId = ?'

    await db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);

        } else {
            res.status(200).json({ info: result });
        }
    })


}

const getArticleById = async (req, res) => {
    let { id } = req?.params;
    let sql = 'SELECT blog.id, blog.title, blog.body, blog.dateposted, blog.imgurl, blog.imgid, users.fname, users.role FROM blog inner join users on users.id = blog.userid WHERE blog.id = ?'

    await db.query(sql, [id], (err, result) => {
        if (err) {
            console.log(err);

        } else {
            res.status(200).json({ info: result });
        }
    })


}


module.exports  = { createArticle, getArticles, getArticleById, getBlogImages }