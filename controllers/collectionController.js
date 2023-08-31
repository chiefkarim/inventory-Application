const asyncHandler = require('express-async-handler')
const collectionModel = require('../models/collection')
const itemModel = require('../models/item')
//     Get all collections
exports.list = asyncHandler(async (req, res, next)=>{
    const collections = await collectionModel.find({})

    res.render('collectionList',{title:"collections",collections:collections})
})

// get all the items in that collection

exports.list_items = asyncHandler(async(req,res,next)=>{

    const items = await itemModel.find({category:req.params.id}).populate('category').exec()
    console.log(items,req.params.id)
    res.render('collectionItems',{title:req.params.id,items:items,})
})