const nodemailer = require("nodemailer");

         //mailer transporter
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: "developer.codedrill@gmail.com",
      pass: "umoqhjuzdmczukgs",
    },
  });


  const sendVerificationEmail  =async  (to:string , verificationToken:string)=>{
 try{
    const info = await transporter.sendMail({
        from: '"Abhishek Thakur 👻" <meabhishekthakur2000@gmail.com>', // sender address
        to, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello ", // plain text body
        html: `Please verify your email by clicking on the following link: http://localhost:9999/verify/${verificationToken}`,
         // html body
      });
     console.log(info);
 }catch(error){
     console.log(error)
 }
  }

  export default  sendVerificationEmail;