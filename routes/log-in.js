const express = require("express");
const router = express.Router();
const logInController = require('../controllers/log-inController')
//setting up multer to handel form data
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
       },
       filename: (req, file, cb)=> {
        cb(null, file.originalname);
       }
       })
      
const upload = multer({ storage: storage })


router.get("/",logInController.logIn_get)
router.post("/api",upload.any(),logInController.logIn_post_api)
router.post("/",logInController.logIn_post)


module.exports=router