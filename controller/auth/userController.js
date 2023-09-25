const { users } = require("../../model");//our datatable is define in model like user name,emai,id,password we access it using "users"
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken')// require jsonwebtoken for identify the user 
require('dotenv').config();//it used for import .env file this file is too secure we defined secureKey for jwt token 
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
    if (associatedDataWithEmail.length == 0) {
      res.send("User doesn't associated with this email");
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
        res.send("Successfully login");
      } else {
        // console.log("Password Doesn't match")
        res.send("Password Doesn't match");
      }
    }
  }
  // res.redirect('/')
};
// for ignore the file and folder
// create file ".gitignore"
//put that file you want to ignore
