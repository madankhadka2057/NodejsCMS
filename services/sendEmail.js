const nodemailer=require('nodemailer')
const sendEmail=async(options)=>{
    // console.log(options)
    var transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:process.env.EMAIL,
            pass:process.env.EMAIL_PASSWORD
        },
    });
    const mailOptions={
        from:"Madan Khadka <khadkadeepak2057@gmail.com",
        to:options.email,
        subject:options.subject,
        text:"Your otp is :"+options.otp,
    };
    await transporter.sendMail(mailOptions)
};
module.exports=sendEmail;