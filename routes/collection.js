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

//handling edit collection request GET 
router.get("/:id/edit/",collection_controller.edit_get)
router.post("/:id/edit/",upload.single('src'),collection_controller.edit_post)

//handling deleting collection POST
router.post('/:id/delete',collection_controller.delete)

//handling create collection request GET
router.get("/create",collection_controller.create_get)

//handling create collection request POST
router.post("/create",upload.single('src'),collection_controller.create_post)

// show all items in a specified collection
router.get("/:id", collection_controller.list_items);


module.exports = router;
