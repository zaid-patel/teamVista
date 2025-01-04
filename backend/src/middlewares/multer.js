import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp")
      console.log(file);
      
    },
    filename: function (req, file, cb) {
      
      cb(null, file.originalname)
      console.log(123)
    }
  })
  
export const upload = multer({ 
    storage, 
})