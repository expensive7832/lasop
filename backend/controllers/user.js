const dotenv = require("dotenv");
const db = require("./../db.js");
const formidable = require("formidable");
const bcrypt = require("bcryptjs");
const { sendRegistrationMail } = require("../utils/mail.js");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;

dotenv.config();

const adminRegister = async (req, res) => {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields) => {
      const { fname, lname, email, password, passcode } = fields;

      if (
        fname === "" ||
        lname === "" ||
        email === "" ||
        password === "" ||
        passcode === ""
      ) {
        res.status(400).json({ message: "Input Field Cannot Be Empty" });
      } else {
        let sql = "SELECT * from users WHERE email = ?";

        await db.query(sql, [email], async (err, result) => {
          if (result?.length > 0) {
            res.status(400).json({ message: "Email Already Exists" });
            
          }else if (passcode !== "@mama051093") {
            res.status(400).json({ message: "unathorized" });
          }
          
           else {
            if (!/[\w]{3,}@[\w]{3,}.[a-z]{2,}/.test(email)) {
              res.status(400).json({ message: "enter valid email" });
            } else {
              let sql = `INSERT INTO users(fname,lname, email, password, active, role) VALUES(?,?,?,?,?,?)`;

              let salt = bcrypt.genSaltSync(10);

              let hashpwd = bcrypt.hashSync(password, salt);

              await db.query(
                sql,
                [fname, lname, email, hashpwd, 1, "admin"],
                async (err, result) => {
                  if (err) {
                    await res
                      .status(400)
                      .json({ message: err.sqlMessage, info: err.message });
                  } else {
                    res.status(201).json({ message: "success" });
                  }
                }
              );
            }
          }
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

function staffRegister(req, res) {
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields) => {
      const { fname, lname, email, password, passcode } = fields;

      if (
        fname === "" ||
        lname === "" ||
        email === "" ||
        password === "" ||
        passcode === ""
      ) {
        res.status(400).json({ message: "Input Field Cannot Be Empty" });
      } else {
        let sql = "SELECT * from users WHERE email = ?";

        await db.query(sql, [email], async (err, result) => {
          if (result?.length > 0) {
            res.status(400).json({ message: "Email Already Exists" });
            
          }else if (passcode !== "@mama051093") {
            res.status(400).json({ message: "unathorized" });
          }
          
           else {
            if (!/[\w]{3,}@[\w]{3,}.[a-z]{2,}/.test(email)) {
              res.status(400).json({ message: "enter valid email" });
            } else {
              let sql = `INSERT INTO users(fname,lname, email, password, active, role) VALUES(?,?,?,?,?,?)`;

              let salt = bcrypt.genSaltSync(10);

              let hashpwd = bcrypt.hashSync(password, salt);

              await db.query(
                sql,
                [fname, lname, email, hashpwd, 1, "staff"],
                async (err, result) => {
                  if (err) {
                    await res
                      .status(400)
                      .json({ message: err.sqlMessage, info: err.message });
                  } else {
                    res.status(201).json({ message: "success" });
                  }
                }
              );
            }
          }
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

function signup(req, res){
  try {
    let form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, file) => {
      const { fname, lname, email, password, loc, phone, mos, course } = fields;
      const { photo } = file;

      if (
        fname === "" ||
        lname === "" ||
        email === "" ||
        password === "" ||
        loc === "" ||
        mos === "" ||
        phone === "" ||
        course === "" ||
        photo?.originalFilename == "" ||
        fname === undefined ||
        lname === undefined ||
        email === undefined ||
        password === undefined ||
        phone === undefined ||
        mos === undefined ||
        course === undefined ||
        loc === undefined
      ) {
        res.status(400).json({ message: "Input Field Cannot Be Empty" });
      } else {
        let sql = "SELECT * from users WHERE email = ?";

        await db.query(sql, [email], async (err, result) => {
          if (result?.length > 0) {
            res.status(400).json({ message: "Email Already Exists" });
          } else {
            if (!/[\w]{3,}@[\w]{3,}.[a-z]{2,}/.test(email)) {
              res.status(400).json({ message: "enter valid email" });
            } else {
              cloudinary.uploader.upload(photo?.filepath, async (err, data) => {
                if (err) {
                  return res
                    .status(400)
                    .json({ message: "image upload error, try again" });
                } else {
                  let imgid = data.public_id;
                  let imgurl = data.secure_url;

                  let sql = `INSERT INTO users(fname,lname, email, password, phone, loc, course, mode, edustatus, imgurl, imgid ) VALUES(?,?,?,?,?,?,?,?,?, ?, ?)`;

                  let salt = bcrypt.genSaltSync(10);

                  let hashpwd = bcrypt.hashSync(password, salt);

                  await db.query(
                    sql,
                    [
                      fname,
                      lname,
                      email,
                      hashpwd,
                      phone,
                      loc,
                      course,
                      mos,
                      5,
                      imgurl,
                      imgid,
                    ],
                    async (err, result) => {
                      if (err) {
                        await res
                          .status(400)
                          .json({ message: err.sqlMessage, info: err.message });
                      } else {
                        sendRegistrationMail(email, fname);

                        res
                          .status(201)
                          .json({
                            message: "success",
                            info: {
                              id: result?.insertId,
                              email,
                              fname,
                              mos,
                              course,
                            },
                          });
                      }
                    }
                  );
                }
              });
            }
          }
        });
      }
    });
  } catch (error) {
    console.log(error.message);
  }
};

const login = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();
    form.parse(req, async (err, fields) => {
      const { email, password } = fields;

      if (email === "" || password === "") {
        res.status(400).json("please add all field");
      } else {
        let sql = "SELECT * FROM users WHERE email = ?";
        await db.query(sql, [email], async (err, result) => {
          let data = result[0];

          if (err) {
            res.status(400).json({ message: err });
          } else if (data === undefined) {
            res.status(400).json("invalid credentials");
          } else {
            //check password
            await bcrypt
              ?.compare(password, data?.password)
              .then(async (confirm) => {
                if (confirm) {
                  let token = await jwt?.sign(
                    { id: data?.id, email: data?.email },
                    process.env.JWT_SECRET,
                    {
                      expiresIn: "30d", //may change time later
                    }
                  );

                  res
                    .status(200)
                    .json({
                      token: token,
                      data: data,
                      message: "login successful",
                    });
                } else {
                  res.status(400).json("invalid credentials");
                }
              })
              .catch((err) => res.status(400).json(err));
          }
        });
      }
    });
  } catch (err) {
    res.status(400).json({ message: err });
  }
};

const myProfile = async (req, res) => {
  try {
    const { user } = req;

    if (user === null) {
      return res.status(400).json({ message: "invalid credentials" });
    } else {
      return res.status(200).json({ message: "success", data: user });
    }
  } catch (err) {
    console.log(err);
  }
};


const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    const { user } = req;

    if (user == null) {
      return res.status(400).json({ message: "invalid credentials" });
    } else {
      // let sql = "select users.id, users.fname, users.phone as phone, users.paymentstatus as status, users.dateCreated, course.title as coursetitle, course.duration as duration,  calendar.cohort as chrttitle, calendar.center as centertitle, calendar.mode as mostitle users.edustatus as learningprocess from users inner join course on course.id = users.course inner join calendar on calendar.id = users.mode  where users.id = ?";
      let sql =
        "select users.id, users.role, users.email, users.fname, users.lname, users.loc as address, users.imgurl, users.phone as phone, users.paymentstatus as status, users.datecreated , cohort.title as chrttitle, calendar.end as duedate, calendar.start as startdate, calendar.mode as mos, calendar.center as center, course.title, course.duration, course.price, learningstatus.title as learningstatus from users inner join calendar on calendar.id = users.mode inner join course on course.id = users.course inner join cohort on cohort.id = calendar.session inner join learningstatus on learningstatus.id = users.edustatus where users.id = ? order by datecreated desc "
        await db.query(sql, [id], async (err, rows) => {
        if (err) {
          // return res.status(400).json({message: err.message});
          console.log(err.sqlMessage);
        } else {
          
          return res.status(200).send(rows[0]);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const forgetpassword = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, file) => {
      const { email } = fields;
      if (email == undefined || email == "") {
        return res.status(400).json({ message: "email is required" });
      } else {
        let sql = "SELECT * FROM users where email = ?";

        await db.query(sql, [email], (err, result) => {
          if (err) {
            console.log(err);
          } else if (result[0] !== undefined) {
            return res
              .status(200)
              .json({ message: "success", email: result[0].email });
          } else {
            return res.status(400).json({ message: "invalid email" });
          }
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const changepassword = async (req, res) => {
  try {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, file) => {
      const { email, password } = fields;

      if (password == undefined || password == "") {
        return res.status(400).json({ message: "password is required" });
      } else {
        let sql = "update users set password = ? where email = ? ";
        let salt = bcrypt.genSaltSync(10);
        let hashpwd = bcrypt.hashSync(password, salt);

        await db.query(sql, [hashpwd, email], async (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log(result);
            return res.status(200).json({ message: "success" });
          }
        });

        // await db.query(sql, [email], (err, result) =>{
        //     if (err){
        //         console.log(err);
        //     }else if(result[0] !== undefined){
        //         return res.status(200).json({message: "success", email: result[0].email})
        //     }else{
        //         return res.status(400).json({message: "invalid email"})
        //     }
        // })
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const getProspectus = async (req, res) => {
  let form = new formidable.IncomingForm();

  form?.parse(req, (err, fields) => {
    const { fullname, email, phone } = fields;

    if (fullname === "" || email === "" || phone === "") {
      res.status(400).json({ message: "fields cannot be empty" });
    } else {
      let sql = "INSERT INTO prospectus(email, fullname, phone) VALUES(?,?,?)";
      db.query(sql, [email, fullname, phone], async (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).json({ message: "success" });
        }
      });
    }
  });
};


const getAllUsers = async (req, res) => {
  try {
    

    const { user } = req;

    if (user == null) {
      return res.status(400).json({ message: "invalid credentials" });
    } else {
      // let sql = "select users.id, users.fname, users.phone as phone, users.paymentstatus as status, users.dateCreated, course.title as coursetitle, course.duration as duration,  calendar.cohort as chrttitle, calendar.center as centertitle, calendar.mode as mostitle users.edustatus as learningprocess from users inner join course on course.id = users.course inner join calendar on calendar.id = users.mode  where users.id = ?";
      let sql =
        "select users.id, users.role, users.email, users.fname, users.lname, users.loc as address, users.imgurl, users.phone as phone, users.paymentstatus as status, users.datecreated , cohort.title as chrttitle, calendar.end as duedate, calendar.start as startdate, calendar.mode as mos, calendar.center as center, course.title, course.duration, course.price, learningstatus.title as learningstatus from users inner join calendar on calendar.id = users.mode inner join course on course.id = users.course inner join cohort on cohort.id = calendar.session inner join learningstatus on learningstatus.id = users.edustatus order by datecreated desc";
      await db.query(sql, async (err, rows) => {
        if (err) {
          // return res.status(400).json({message: err.message});
          console.log(err.sqlMessage);
        } else {
        
          res.status(200).send(rows);
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const searchUser = async(req, res) =>{
  const {q} = req.query

  
  if(q === ""){
    res.status(400).json({message:"field cannot be empty"})
  }else{
    let sql = "SELECT users.fname,users.lname,users.phone,users.email,users.role,users.loc, users.id,users.datecreated, learningstatus.title as learningstatus FROM users inner join learningstatus on learningstatus.id = users.edustatus where fname like ? or lname like ? or email like ? or phone like ?"
    let value = `%${q}%`
    await db.query(sql, [value, value, value, value], (err, rows) =>{
      if(err){
        console.g(err);
      }else{
       
        res.status(200).send(rows);
      }
    })
  }
}  


const updateStudentMode = async(req, res) =>{
  const { role, id} = req.body

  let sql = "UPDATE users set edustatus = ? where id = ?"

  await db.query(sql, [role, id], (err, rows) =>{
    if(err){
      console.log(err);
    }else{
      res.status(200).json({message:"success"})
    }
  })
}

module.exports = {
  updateStudentMode,
  getUser,
  signup,
  login,
  myProfile,
  getProspectus,
  forgetpassword,
  changepassword,
  adminRegister,
  staffRegister,
  getAllUsers,
  searchUser
};
