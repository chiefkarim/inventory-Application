const express = require('express')
const router = express.Router()
const item_controller = require('../controllers/itemController')
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


//creating  item
router.get('/create',item_controller.edit_get)
router.post('/create',upload.array('src',10),item_controller.edit_post)

//creating  item
router.get('/create/api',item_controller.edit_get_api)
router.post('/create/api',upload.array('src',10),item_controller.edit_post_api)

//editing item
router.get('/:id/edit',item_controller.edit_get)
router.post('/:id/edit',upload.array('src',10),item_controller.edit_post)

//editing item
router.get('/:id/edit/api',item_controller.edit_get_api)
router.post('/:id/edit/api',upload.array('src',10),item_controller.edit_post_api)

//handling deleting POST
router.post('/:id/delete',item_controller.delete)

//handling deleting POST
router.post('/:id/delete/api',item_controller.delete_api)
// displaying item details GET
router.get('/:id',item_controller.detail)

//API displaying item details GET
router.get('/:id/api',item_controller.detail_api)

module.exports = router
