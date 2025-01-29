const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let dstn = "public/uploads";
    if (!fs.existsSync(dstn)) {
      fs.mkdirSync(dstn, { recursive: true });
    }
    cb(null, dstn);
  },
  filename: function (req, file, cb) {
    //apple.jpg
    //.jpg(extname)
    //apple(basename)
    //product_image-apple-123456789-123456789.jpg
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    let extname = path.extname(file.originalname);
    let basename = path.basename(file.originalname, extname);

    let final_file_name =
      file.fieldname + "-" + basename + "_" + uniqueSuffix + extname;

    cb(null, final_file_name);
  }
})

const fileFilter=(req,file,cb)=>{
  if(!file.originalname.match(/[.](jpg|png|PNG|gif|svg|SVG)$/)){
    cb(new Error("Invalid file type"),false)
  }
  cb(null,true)
}




exports.upload = multer({
  storage: storage,
  limits:{
    fileSize:2000000
  },
  filter:fileFilter
});

