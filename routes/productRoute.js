const { addProduct } = require("../controller/productController");

const router=require("express").Router();

router.post('/addproduct',addProduct)


module.exports = router;