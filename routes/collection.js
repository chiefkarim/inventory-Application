const express = require("express");
const router = express.Router();
const collection_controller = require('../controllers/collectionController')
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


/* GET users listing. */

router.get("/", collection_controller.list);
//editing collections 

//handling request GET
router.get("/:id/edit/",collection_controller.edit_get)
router.post("/:id/edit/",upload.single('src'),collection_controller.edit_post)


router.get("/:id", collection_controller.list_items);

module.exports = router;
