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
const authenticate = require('../helpers/auth')


//creating  item
router.get('/create',authenticate,item_controller.edit_get)
router.post('/create',authenticate,upload.array('src',10),item_controller.edit_post)

//creating  item
router.get('/create/api',authenticate,item_controller.edit_get_api)
router.post('/create/api',authenticate,upload.array('src',10),item_controller.create_post_api)

//editing item
router.get('/:id/edit',authenticate,item_controller.edit_get)
router.post('/:id/edit',authenticate,upload.array('src',10),item_controller.edit_post)

//editing item
router.get('/:id/edit/api',authenticate,item_controller.edit_get_api)
router.post('/:id/edit/api',authenticate,upload.array('src',10),item_controller.edit_post_api)

//handling deleting POST
router.post('/:id/delete',authenticate,item_controller.delete)

//handling deleting POST
router.post('/:id/delete/api',authenticate,item_controller.delete_api)
// displaying item details GET
router.get('/:id',item_controller.detail)

//API displaying item details GET
router.get('/:id/api',item_controller.detail_api)

module.exports = router
