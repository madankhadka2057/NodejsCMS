const { users } = require("../../model")
const bcrypt=require('bcryptjs')
exports.renderRegister=(req,res)=>{
    res.render('register')
}
exports.register= async(req,res)=>{
    const {name,email,password}=req.body;
    console.log(name,email,password)
    await users.create({
        name:name,
        email:email,
        password:bcrypt.hashSync(password,8)
    })
    res.redirect('/login')
}