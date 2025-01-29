const {check, validationResult}=require('experss_validator')

exports.validationMethod=()=>{
  let errors=validationResult(req,res,next)
  if(!errors.empty()){
    return res.status(400).json({error:errors.array()[0].msg()})
  }
}

exports.validationRules=[
  check('category_nanme',"Category field id required").notEmpty()
  .isLength({min:3}).withMessage("CAtegory must be at least 3 characters.")
]