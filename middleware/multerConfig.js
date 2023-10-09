const multer = require("multer");
//logic to validate the fileType(mimeTypes )
const fileSizeFilter = (req, file, cb) => {

  // console.log("fileSize is:-", file);
  // if (file.size > 2000) {
  //   cb(new Error("File size must be less then 2000 bytes"));
  //   return;
  // }

  cb(null,true)
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const allowedFileTypes = ["image/png", "image/jpeg", "image/jpg"];
    if (!allowedFileTypes.includes(file.mimetype)) {
      cb(new Error("Invalide fileType only supports png,gpeg,jpg"));
      return;
    }
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
module.exports = { multer, storage, /*fileSizeFilter */};
