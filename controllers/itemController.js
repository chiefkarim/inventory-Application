const asyncHandler = require("express-async-handler");
const itemModel = require("../models/item");

exports.list = asyncHandler(async(req,res,next)=>{
    res.render('item',{title:'item'})
})

// display item details on Get
exports.detail = asyncHandler(async(req,res,next)=>{
    let item = await itemModel.findById({_id: req.params.id});
    console.log('item:',req.params.id)
    res.render('item',{name:req.params.id,title:'item',item:item})
})

// display edit item page on Get
exports.edit_get = asyncHandler(async(req,res,next)=>{
    console.log(req.params.id)
    res.render('editItem',{title:'item',})
})

// handel edited item on Post
exports.edit_post = asyncHandler(async(req,res,next)=>{
    console.log(req.params.id)
    let item=await itemModel.findByIdAndUpdate({},{$set:{'status':'active'}});


    res.redirect(`/item/${req.params.id}`,{title:'item',})
})