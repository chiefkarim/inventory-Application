const express = require('express')
const router = express.Router() 

// Require the controllers
const collection_controller = require('../controllers/collectionController')
const item_controller = require('../controllers/itemController')
const index_controller = require('../controllers/indexController')
// Home Routes

// Fetching collections to show in the home page
router.get("/",index_controller.index)
router.get("/collection",collection_controller.list )
module.exports = router