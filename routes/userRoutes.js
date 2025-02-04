const {register, verifyUser, forgetPassword, resetPassword}=require('../controller/userController.js')

const router=require('express').Router()

router.post('/register',register)
router.get('/verify/:token',verifyUser)
router.post("/forgetpassword",forgetPassword)
router.post('/resetpassword/:token',resetPassword)

module.exports=router