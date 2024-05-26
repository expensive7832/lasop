const dotenv = require("dotenv")
const Sib = require("sib-api-v3-sdk")

dotenv.config()

const client = Sib.ApiClient.instance

const apiKey = client.authentications['api-key']
apiKey.apiKey = process.env.SIB_API_KEY

const tranEmailApi = new Sib.TransactionalEmailsApi()
const sender = {
    email: 'admission@lasop.net',
    name: 'Lagos School Of Programming',
}

const sendRegistrationMail = (email, name) => {


    try {
        tranEmailApi
            .sendTransacEmail({
                sender,
                to: [{ email: email, name: name }],
                subject: "Registration Successfully",
                htmlContent: `
               <h4> Dear ${name},</h4>
 
<p>
We are delighted to inform you that you have been accepted to start your Program at LASOP. 
 
A few details on Program:

The learning centre is at No. 86, Olowoira Road (by Solomon avenue), off Ojodu-Berger, Lagos.
 
 
On the first day of class, you shall be given the full course curriculum. Classes are usually interactive with practicable examples carried out consistently and your lessons will start from the scratch.
 
You are now required to pay your course fee (please ignore if you have already done so) before or on resumption day at the center. Payment Details is as follows:
 
ACCOUNT NAME: Lagos School of Programming Ltd 
BANK: Zenith Bank
ACCOUNT NUMBER: 1223017613
 
You are also expected to come with a personal computer (LAPTOP) because learning activities will begin immediately. 
 
If you need any help with directions, payments or you have questions to ask, please call the help desk on: 07025713326 
 
Congratulations!

</p>


<em>
<Strong>Faith I,</strong>
 
<br/>
 
Admission Team Head,
Lagos School of Programming Limited
RC 1782113 

<br/>
...elevate yourself.
______________

<br/>

Admission Office,
114, Iju road,Agege-Fagba, 
Lagos State, Nigeria.
+234(0)7025713326
https://lasop.net/
admission@lasop.net
</em>
       
        `,

            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

    } catch (err) {

    }


}

const PaymentMail = (email, name, amount) => {


    try {
        tranEmailApi
            .sendTransacEmail({
                sender,
                to: [{ email: email, name: name }],
                subject: "Registration Successfully",
                htmlContent: `
        <h1>Your Payment of ${amount} was Successful</h1>
       
        `,

            })
            .then((res) => console.log(res))
            .catch((err) => console.log(err))

    } catch (err) {

    }


}




module.exports = {sendRegistrationMail, PaymentMail}