const {register, verifyUser}=require('../controller/userController.js')

const router=require('express').Router()

router.post('/register',register)
router.get('/verify/:token',verifyUser)

module.exports=router