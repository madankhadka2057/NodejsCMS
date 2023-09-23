const { renderRegister, register } = require('../controller/auth/userController');

const router=require('express').Router();
router.route('/register').get(renderRegister).post(register)

module.exports=router;