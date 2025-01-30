const {register}=require('../controller/userController.js')

const router=require('express').Router()

router.post('/register',register)

module.exports=router