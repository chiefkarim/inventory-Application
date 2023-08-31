const asyncHandler = require('express-async-handler')
const collectionModel = require('../models/collection')

// Home page
exports.index = asyncHandler(async(req,res,next)=>{

    collectionModel.find({})

    res.render('index',{title:'E-commerce'})


})