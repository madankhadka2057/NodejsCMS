const { renderRegister, register, renderLogin, login, logout, forgetPassword, renderForgetPassword, renderOtp, handleOtp, renderChangePassword, changePassword } = require('../controller/auth/userController');
const { isAuthenticated } = require('../middleware/isAuthenticated');

const router=require('express').Router();
router.route('/register').get(renderRegister).post(register)
router.route('/login').get(renderLogin).post(login)
router.route("/logout").get(logout)
router.route("/forgetPassword").get(renderForgetPassword).post(forgetPassword)
router.route("/otp").get(renderOtp).post(handleOtp)
router.route("/otp/:id").post(handleOtp)
router.route("/changePassword").get(renderChangePassword)
router.route("/changePassword/:email/:otp").post(changePassword)
module.exports=router;