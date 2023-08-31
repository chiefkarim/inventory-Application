const express = require('express')
const router = express.Router()
const item_controller = require('../controllers/itemController')
router.get('/',item_controller.list)

router.get('/:id',item_controller.detail)

module.exports = router