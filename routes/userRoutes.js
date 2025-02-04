const {register, verifyUser, forgetPassword, resetPassword, signout}=require('../controller/userController.js')
const { userRules, validationMethod } = require('../middleware/validationScripts.js')

const router=require('express').Router()

router.post('/register',userRules,validationMethod,register)
router.get('/verify/:token',verifyUser)
router.post("/forgetpassword",forgetPassword)
router.post('/resetpassword/:token',resetPassword)

//login
//signout
router.get('/signout',signout)

module.exports=router