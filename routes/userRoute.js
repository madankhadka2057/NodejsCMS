const { renderRegister, register, renderLogin, login, logout } = require('../controller/auth/userController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router=require('express').Router();
router.route('/register').get(renderRegister).post(register)
router.route('/login').get(renderLogin).post(login)
router.route("/logout").get(isAuthenticated ,logout)
module.exports=router;