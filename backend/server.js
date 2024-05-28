const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
const db = require("./db.js")
const userRoute = require("./routes/user.js")
const activitiesRoute = require("./routes/activities.js")
const BlogRoute = require("./routes/blog.js")
const calendarRoute = require("./routes/calendar.js")
const cohortRoute = require("./routes/cohort.js")
const syllabusRoute = require("./routes/syllabus.js")
const overviewRoute = require("./routes/overview.js")
const formidable = require("formidable")
const crypto = require('crypto')
const { PaymentMail } = require("./utils/mail.js")
const morgan = require("morgan")

dotenv.config()

const API_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

function verify(eventData, signature) {
  const hmac = crypto.createHmac('sha512', API_SECRET_KEY);
  const expectedSignature = hmac.update(JSON.stringify(eventData)).digest('hex');
  return expectedSignature === signature;
}

dotenv.config()

const app = express()
app.use(cors({
  origin: "*"
}))

app.use(express.json())
app.use(morgan("tiny"))
app.use(express.urlencoded({ extended: true }))


app.use(userRoute)
app.use(activitiesRoute)
app.use(BlogRoute)
app.use(calendarRoute)
app.use(cohortRoute)
app.use(syllabusRoute)
app.use(overviewRoute)



app.get("/test", async (req, res) => {
  res.send("api working")
})

app.post("/payment", async (req, res) => {
  const eventData = req.body;
  const signature = req.headers['x-paystack-signature'];

  if (!verify(eventData, signature)) {
    return res.status(400).json({ info: 'Invalid signature' });
  }

  const transactionId = eventData.data.id;
  let userId = parseInt(eventData?.data?.metadata?.id)
  let ref = eventData?.data?.reference
  let date = new Date(eventData?.data?.paid_at)
  let sts = eventData?.data?.status
  let amt = eventData?.data?.amount
  let evt = eventData?.event
  let email = eventData?.data?.customer?.email
  let name = eventData?.data?.metadata?.fname

  if (evt === 'charge.success') {



    //Process the successful transaction to maybe fund wallet and update your WalletModel
    let sql = "INSERT INTO payment(refId, paymentTime, user, status, amount, event, transactionid) values(?,?,?,?,?,?,?)"
    db.query(sql, [ref, date, userId, sts, amt, evt, transactionId], (err, result) => {
      if (err) {
        console.error(err)
        res.status(400)
      } else {
        PaymentMail(email, name, amt)
        console.log(eventData)
        res.status(200)
      }
    })
  }




})




app.listen(process.env.REACT_APP_PORT || 5000, () => {

  try {
    db.connect()

    console.log("db connecton established")
    console.log(`listening on port ${process.env.PORT}`)
  } catch (e) {
    console.error(e)
  }

})

