const express = require("express");
const router = express.Router();
const collection_controller = require('../controllers/collectionController')
const multer  = require('multer')
const cors = require('cors')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
       },
       filename: (req, file, cb)=> {
        cb(null, file.originalname);
       }
       })
      
const upload = multer({ storage: storage })
const authenticate = require('../helpers/auth')

/* GET users listing. */

router.get("/", collection_controller.list);

// API get collections 
router.get("/api",cors(),collection_controller.api_list)

//handling edit collection request GET 
router.get("/:id/edit/",authenticate,collection_controller.edit_get)
router.post("/:id/edit/",authenticate,upload.single('src'),collection_controller.edit_post)

//APIhandling edit collection request GET 
router.get("/:id/edit/api",authenticate,collection_controller.edit_get_api)
router.post("/:id/edit/api",authenticate,upload.single('src'),collection_controller.edit_post_api) 

//handling deleting collection POST
router.post('/:id/delete',authenticate,collection_controller.delete)

//handling deleting collection POST
router.post('/:id/delete/api',authenticate,collection_controller.delete_api)

//handling create collection request GET
router.get("/create",authenticate,collection_controller.create_get)

//handling create collection request GET
router.get("/create/api",authenticate,collection_controller.create_get_api)

//handling create collection request POST
router.post("/create",authenticate,upload.single('src'),collection_controller.create_post)

//handling create collection request POST
router.post("/create/api",authenticate,upload.single('src'),collection_controller.create_post_api)

// show all items in a specified collection
router.get("/:id",collection_controller.list_items);

// show all items in a specified collection
router.get("/:id/api", collection_controller.list_items_api);


module.exports = router;
