const { placeOrder } = require('../controller/ordercontroller')

const router=require('express').Router()


router.post('placeorder',placeOrder)
router.get('/getallorder',)

module.exports=router