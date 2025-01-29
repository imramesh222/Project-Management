const { addProduct, deleteProduct } = require("../controller/productController");
const { upload } = require("../middleware/fileUpload");


const router=require("express").Router();

router.post('/addproduct',upload.single('product_image'),addProduct)
router.delete('/deleteproduct/:id',deleteProduct)


module.exports = router;