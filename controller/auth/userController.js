const { users } = require("../../model");//our datatable is define in model like user name,emai,id,password we access it using "users"
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')// require jsonwebtoken for identify the user 
require('dotenv').config();//it used for import .env file this file is too secure we defined secureKey for jwt token 
const sendEmail=require('../../services/sendEmail')
exports.renderRegister = (req, res) => {
  res.render("register");
};


exports.register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const checkEmail = await users.findAll({
    where: {
      email: email,
    },
  });
  console.log(checkEmail.length)
  if (checkEmail.length != 0) {
    const existingEmail = checkEmail[0].email;
    console.log("mail is:",existingEmail);
    if (existingEmail === email) {
      return res.send("User already exist");
    }
  }

  if (confirm_password != password) {
    console.log("Passwird Doesn't match please try again");
    return res.send("password doesn't match");
  } else {
    // console.log(name, email, password);
    await users.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });
    res.redirect("/login");
  }
};


//! render Login from
exports.renderLogin = (req, res) => {
  res.render("login");
};


//~checking loging
exports.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return console.log(" Please insert email or password");
  } else {
    const associatedDataWithEmail = await users.findAll({
      where: {
        email: email,
      },
    });
    if (associatedDataWithEmail.length === 0) {
      res.send("User doesn't associated with this email");
      return
    } else {
      const assocaitedPasswordWithEmail = associatedDataWithEmail[0].password;
      const id=associatedDataWithEmail[0].id
      const isMatch = bcrypt.compareSync(password, assocaitedPasswordWithEmail);

      if (isMatch) {
        // const jwt=require(jsonwebtoken) package for jwt token this is define top of code
        //secretkey is define in .env file and import as 
        //  require(dotenv).config is needed for use .env file also install using npm i dotenv
        const token=jwt.sign({id},process.env.secretKey,{
          expiresIn:"30d"
        })
        res.cookie('token',token)// token is save in browser cookie in variable token we dont neet to import any dependency for it
        // res.send("Successfully login");
      } else {
        // console.log("Password Doesn't match")
        res.send("Password Doesn't match");
        return
      }
    }
  }
  res.redirect('/')
};
exports.logout=(req,res)=>{
  res.clearCookie('token');
  res.redirect('/login')
}
//forget password
exports.renderForgetPassword=async(req,res)=>{
  res.render('forgetPassword')
}
exports.forgetPassword=async(req,res)=>{
  const email=req.body.email
  if(!email){
    return res.send("Please provide email")
  }

  const emailExists=await users.findAll({
    where:{
      email:email
    }
  })
  if(emailExists.length===0){
    res.send("User doesn't exists")
    return
  }
  const generatedOtp = Math.floor(100000 * Math.random(9999))
  sendEmail({
    email:email,
    subject:"Forget Password OTP",
    otp:generatedOtp
  })
  emailExists[0].otp=generatedOtp
  emailExists[0].otpGeneratedTime=Date.now();
  emailExists[0].save();
  res.redirect("/otp?email="+email)
}


exports.renderOtp=(req,res)=>{
  const email = req.query.email 
  res.render("otpForm",{email:email})
}
exports.handleOtp=async(req,res)=>{
  const otp=req.body.otpForm
  const email = req.params.id 
  if(!email||!otp){
    res.send("please Provide email or otp")
  }else{
   const existingUser= await users.findAll({
      where:{
        otp:otp,
        email:email
      }
    })
    if(existingUser.length===0){
      res.send("Invalid OTP")
    }else{
      const currentTime=Date.now()
      const otpGeneratedTime=existingUser[0].otpGeneratedTime
      if(currentTime-otpGeneratedTime>120000){
        res.send("OTP has expire")
      }else{
        existingUser[0].otp=null
        existingUser[0].otpGeneratedTime=null
        existingUser[0].save()
        res.redirect("/changePassword?email="+email)
      }
    }
  }
}

exports.renderChangePassword=(req,res)=>{
  const email=req.query.email
  res.render("changePassword",{email:email})
}
exports.changePassword= async(req,res)=>{
  const email=req.params.id
  const password=req.body.password
  const confirmPassword=req.body.confirmPassword
  if (password !== confirmPassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }
  const user=await users.findOne({
    where:{
      email:email
    }
  })
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  const comparePassword = await bcrypt.compare(password, user.password);
  if(comparePassword){
    res.send("New password or old password is same try another password")
    return
  }
  user.password=bcrypt.hashSync(password,9)
  await user.save();
  res.redirect("/login")
}

// for ignore the file and folder
// create file ".gitignore"
//put that file you want to ignore

