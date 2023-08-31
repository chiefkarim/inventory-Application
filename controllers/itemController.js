const asyncHandler = require("express-async-handler");
const itemModel = require("../models/item");

exports.list = asyncHandler(async(req,res,next)=>{
    res.render('item',{title:'item'})
})
exports.detail = asyncHandler(async(req,res,next)=>{
    let item = await itemModel.findById({_id: req.params.id});
    console.log('item:',req.params.id)
    res.render('item',{name:req.params.id,title:'item',item:item})
})