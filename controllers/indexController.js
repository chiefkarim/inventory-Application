const asyncHandler = require('express-async-handler')
const collectionModel = require('../models/collection')

// Home page
exports.index = asyncHandler(async(req,res,next)=>{


    res.render('index',{title:'E-commerce', user: req.user })


})

// API home page