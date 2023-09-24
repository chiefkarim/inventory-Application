const asyncHandler = require('express-async-handler')
const collectionModel = require('../models/collection')

// Home page
exports.index = asyncHandler(async(req,res,next)=>{
console.log(req.user)

    res.send({username: req.user.username })


})

// API home page