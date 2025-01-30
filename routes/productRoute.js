const { addProduct, deleteProduct, getAllProducts, getProductDetails, getProductsByCategory, updateProduct } = require("../controller/productController");
const { upload } = require("../middleware/fileUpload");
const { productRules, validationMethod } = require("../middleware/validationScripts");


const router=require("express").Router();

router.post('/addproduct',upload.single('product_image'),productRules,validationMethod,addProduct)

router.get('/getallproducts',getAllProducts)

router.get('/getproductdetails/:id',getProductDetails)
router.get('/getproductsbycategory/:categoryId',getProductsByCategory)

router.put('/updateproduct/:id',upload.single('product_image'),updateProduct)
router.delete('/deleteproduct/:id',deleteProduct)


module.exports = router;