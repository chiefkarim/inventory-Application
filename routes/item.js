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

//Routing

router.get('/',item_controller.list)
//creating  item
router.get('/create',item_controller.edit_get)
router.post('/create',upload.array('src',10),item_controller.edit_post)

router.get('/:id',item_controller.detail)

//editing item
router.get('/:id/edit',item_controller.edit_get)
router.post('/:id/edit',upload.array('src',10),item_controller.edit_post)

//handling deleting POST
router.post('/:id/delete',item_controller.delete)

module.exports = router
