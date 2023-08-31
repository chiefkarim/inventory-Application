const express = require("express");
const router = express.Router();
const collection_controller = require('../controllers/collectionController')
/* GET users listing. */
router.get("/", collection_controller.list);
router.get("/:id", collection_controller.list_items);

module.exports = router;
