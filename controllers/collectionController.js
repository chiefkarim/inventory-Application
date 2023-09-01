const asyncHandler = require('express-async-handler')
const collectionModel = require('../models/collection')
const itemModel = require('../models/item')
const { body, validationResult } = require("express-validator");


//     Get all collections
exports.list = asyncHandler(async (req, res, next)=>{
    const collections = await collectionModel.find({})

    res.render('collectionList',{title:"collections",collections:collections})
})

// get all the items in that collection

exports.list_items = asyncHandler(async(req,res,next)=>{

    const items = await itemModel.find({category:req.params.id}).populate('category').exec()
    res.render('collectionItems',{title:req.params.id,items:items,})
})


//handling editing request GET
exports.edit_get = asyncHandler(async(req,res,next)=>{
    const collections =await collectionModel.find({})
    res.render('collectionEdit',{title:'edit collection',collections:collections})
})

//handling editing request POST

exports.edit_post =[ 
//sanitizing user input    
    
    body('description','wrong description')
    .trim()
    .escape()
    ,asyncHandler(async(req,res,next)=>{
        //initializing errors

        const errors = validationResult(req)
        //checking that the collection exists

        const existingCollections =await collectionModel.find({})
        let collection=false
        for(let item of existingCollections){
            if(item.name === req.body.category){collection=item.name}
        }
        if(collection === false) {errors.errors.push({path:'collection',msg:'please choose one of the available collections'})}
        //checking for errors

        if(!errors.isEmpty()){
            res.render('collectionEdit',{title:'edit collection',errors:errors.array(),collections:existingCollections})
        return
        }
        
        //updating collection

        else{
            //getting image

            const src = req.file.filename
            const updatedCollection = collectionModel.findByIdAndUpdate(req.params.id,{src:src},{new:true}).exec()
            res.redirect('/collection')

        }

    
})]

//handling create item request GET
exports.create_get =asyncHandler(async(req,res,next)=>{
    const collections = await collectionModel.find({})

    res.render('collectionCreate',{title:"collections create",collections:collections})
})


//handling create item request Post
exports.create_post =[
    //sanitizing user input    
    
    body('description','wrong description')
    .trim()
    .escape(),
    body('name','name length must be between 3 and 100 character')
    .trim()
    .isLength({min:3})
    .escape(),
    asyncHandler(async(req,res,next)=>{
//initializing errors
console.log(req.body)
const errors = validationResult(req)
//checking that the collection exists

const existingCollections =await collectionModel.find({})
let collection=false
for(let item of existingCollections){
    if(item.name === req.body.name){collection=true}
}
if(collection === true) {errors.array().push({path:'collection',msg:'please write new collection name'})}
//checking for errors

if(!errors.isEmpty()){
    res.render('collectionCreate',{title:'create collection',errors:errors})
return
}

//updating collection

else{
    //creating collection
    const src = req.file.filename
    const updatedCollection =new collectionModel({name:req.body.name,description:req.body.description,src:src})
     await updatedCollection.save()
    res.redirect('/collection')
}
    })
]
