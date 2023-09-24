const express = require("express");
const router = express.Router();
const index_controller = require('../controllers/indexController')
const authenticate = require('../helpers/auth')

/* GET home page. */
router.post("/",authenticate,index_controller.index);

//API Home page

module.exports = router;