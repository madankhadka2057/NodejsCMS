const { users } = require("../../model");
const bcrypt = require("bcryptjs");
exports.renderRegister = (req, res) => {
  res.render("register");
};
exports.register = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  if (confirm_password != password) {
    console.log("Passwird Doesn't match please try again");
    return res.send("password doesn't match");
  } else {
    console.log(name, email, password);
    await users.create({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });
    res.redirect("/login");
  }
};

exports.renderLogin=(req,res)=>{
    res.render('login')
}
exports.login=async(req,res)=>{
    console.log(req.body);
    const {email,password}=req.body;
    await users.create({
        email,
        password
    })
    res.redirect('/')
}