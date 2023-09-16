const express = require("express");
const router = express.Router();
const logInController = require('../controllers/log-inController')

router.get("/",logInController.logIn_get)
router.post("/api",logInController.logIn_post_api)
router.post("/",logInController.logIn_post)


module.exports=router