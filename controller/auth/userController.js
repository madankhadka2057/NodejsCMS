const { users } = require("../../model");
const bcrypt = require("bcryptjs");
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
    console.log(name, email, password);
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
      const isMatch = bcrypt.compareSync(password, assocaitedPasswordWithEmail);
      console.log("isMatch:", isMatch);
      if (isMatch) {
        res.send("Successfully login");
      } else {
        // console.log("Password Doesn't match")
        res.send("Password Doesn't match");
      }
    }
  }
  // res.redirect('/')
};
