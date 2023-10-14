const { renderRegister, register, renderLogin, login, logout, forgetPassword, renderForgetPassword, renderOtp, handleOtp, renderChangePassword, changePassword } = require('../controller/auth/userController');
const { isAuthenticated } = require('../middleware/isAuthenticated');
const catchError=require('../services/catchError.js')

const router=require('express').Router();
router.route('/register').get(catchError(renderRegister)).post(catchError(register))
router.route('/login').get(catchError(renderLogin)).post(catchError(login))
router.route("/logout").get(catchError(logout))
router.route("/forgetPassword").get(catchError(renderForgetPassword)).post(catchError(forgetPassword))
router.route("/otp").get(catchError(renderOtp)).post(catchError(handleOtp))
router.route("/otp/:id").post(catchError(handleOtp))
router.route("/changePassword").get(catchError(renderChangePassword))
router.route("/changePassword/:email/:otp").post(catchError(changePassword))
module.exports=router;