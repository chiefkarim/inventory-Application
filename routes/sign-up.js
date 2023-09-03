const express = require("express")
const router =  express.Router()
const signUpController = require('../controllers/sign-upController')
//
router.get('/',signUpController.signUp_get)
router.post('/',signUpController.signUp_post)
module.exports=router