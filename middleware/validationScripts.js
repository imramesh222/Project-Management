const { check, validationResult } = require('express-validator');

exports.validationMethod = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next();
};

exports.categoryRules = [
  check('category_name', "Category field is required")
    .notEmpty()
    .isLength({ min: 3 }).withMessage("Category name must be at least 3 characters.")
];

exports.categoryUpdateRules=[
  check('category_name', "Category field is required")
  .optional()
    .isLength({ min: 3 }).withMessage("Category name must be at least 3 characters.")
]

exports.productRules=[
  check('product_title',"Product name is required.")
  .notEmpty()
  .isLength({min:3}).withMessage("Product name  must be 3 characters. "),

  check('product_price',"Product price is required.")
  .notEmpty()
  .isFloat({get:0}).withMessage("Product price must be a positive number"),

  check('product_description',"Product description is required.")
  .notEmpty()
  .isLength({min:10}).withMessage("Product description must be at least 10 characters long"),

  check("count_in_stock")
  .notEmpty().withMessage("Stock count is required")
  .isInt({ min: 0 }).withMessage("Stock count must be a non-negative integer"),

  check("category")
    .notEmpty().withMessage("Category ID is required")
    .isMongoId().withMessage("Invalid category ID format"),

   // ✅ Validate product image using `req.file` (instead of URL)
   check("product_image").custom((_value, { req }) => {
    if (!req.file) {
      throw new Error("Product image is required and must be an image file (JPG, JPEG, PNG).");
    }
    return true;
  }),

  check("rating")
    .optional()
    .isFloat({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5")

]


exports.userRules=[
  check('username','username is required').notEmpty()
  .isLength({min:3}).withMessage("Username must be of minimum of 3 words")
  .not().isIn((['admin','test','fog'])).withMessage("Username not allowed"),
  check('email',"Email is required").notEmpty()
  .isEmail().withMessage("Email format incorrect"),
  check('password',"Password is required").notEmpty()
  .matches(/[a-z]/).withMessage("Password must consist at least 1 lowercase alphabet")
  .matches(/[A-Z]/).withMessage("Password must consist at least 1 uppercase alphabet")
  .matches(/[0-9]/).withMessage("Password must consist at least 1 number")
  .matches(/[!@#$%]/).withMessage("Password must consist 1 special character")
  .isLength({min:8}).withMessage("Password must consist at least 8 characters")
  .isLength({max:20}).withMessage("Password must be within 20 characters")
  


]