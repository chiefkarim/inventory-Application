const asyncHandler = require('express-async-handler')
const collectionModel = require('../models/collection')
const itemModel = require('../models/item')
const { body, validationResult } = require("express-validator");
const upload = require('../helpers/imageToWebdb')

//     Get all collections
exports.list = asyncHandler(async (req, res, next)=>{
    const collections = await collectionModel.find({})
        res.render('collectionList',{title:"collections",collections:collections})
   
})

// API get all collections
exports.api_list = asyncHandler(async(req,res,next)=>{
    const collections = await collectionModel.find({})
    res.send({title:'collections',collections:collections})
})

// get all the items in that collection
exports.list_items = asyncHandler(async(req,res,next)=>{

    const items = await itemModel.find({category:req.params.id}).populate('category').exec()
    res.render('collectionItems',{title:req.params.id,items:items,})
})

// API get all the items in that collection
exports.list_items_api = asyncHandler(async(req,res,next)=>{
    const items = await itemModel.find({category:req.params.id}).populate('category').exec()
    const collectionName = await collectionModel.findOne({_id:req.params.id}).exec()
    res.send({title:collectionName.name,items:items})
})

//handling editing request GET
exports.edit_get = asyncHandler(async(req,res,next)=>{
        const collections =await collectionModel.find({})
        res.render('collectionEdit',{title:'edit collection',collections:collections})

})

//API handling editing request GET
exports.edit_get_api = asyncHandler(async(req,res,next)=>{
        const collections =await collectionModel.find({})
        res.send({title:'edit collection',collections:collections})

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
            for(let i=0; i<collections.length;i++){
    
                if (collections[i].name === req.body.name){
                    collection=true
                }
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
        
                    const src =await  upload(req.file.path)
                    const updatedCollection = collectionModel.findByIdAndUpdate(req.params.id,{src:src},{new:true}).exec()
                    res.redirect('/collection')
        
                }
        
            
        
    })]

//handling editing request POST
exports.edit_post_api =[ 
    //sanitizing user input    
        
        body('description','wrong description')
        .trim()
        .escape()
        ,asyncHandler(async(req,res,next)=>{
            //initializing errors
    
                const errors = validationResult(req)
                //checking that the collection exists
        
                const existingCollections =await collectionModel.find({})
                let collection=true
                
                for(let i=0; i<existingCollections.length;i++){
        
                    if (existingCollections[i].name === req.body.name){
                        collection=false
                    }
                }
                console.log(collection)
                if(collection === false) {errors.errors.push({path:'collection',msg:'please choose new collection name'})}
                //checking for errors
                if(!errors.isEmpty()){
                   return  res.status(400).send({title:'edit collection',errors:errors.array()})
                
                }
                
                
                //updating collection
                
                else{
                    //getting image
                    if(!req.file){
            
                        const updatedCollection =await collectionModel.findByIdAndUpdate(req.params.id,{name:req.body.name,description:req.body.description},{new:true}).exec()
                       return res.send({url:updatedCollection.url})

                    }
                    const src =await  upload(req.file.path)
                    
                    const updatedCollection =await collectionModel.findByIdAndUpdate(req.params.id,{name:req.body.name,description:req.body.description,src:src},{new:true}).exec()
                    console.log(updatedCollection)
                   return res.send({url:updatedCollection.url})
        
                }
        
            
        
    })]

//handling create item request GET
exports.create_get =asyncHandler(async(req,res,next)=>{
        const collections = await collectionModel.find({})

        res.render('collectionCreate',{title:"collections create",collections:collections})

    
})

//handling create item request GET
exports.create_get_api =asyncHandler(async(req,res,next)=>{
        const collections = await collectionModel.find({})
        res.send({title:"collections create",collections:collections})

    
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
console.log('hello')
            //initializing errors
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
                const src = await upload(req.file.path)

                const updatedCollection =new collectionModel({name:req.body.name,description:req.body.description,src:src})
                 await updatedCollection.save()
                res.redirect('/collection')
            }
        
    })
]

//API handling create item request Post
exports.create_post_api =[
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
            const errors = validationResult(req)
            //checking that the collection exists
            
            const existingCollections =await collectionModel.find({})
            let collection=false
            for(let item of existingCollections){
                if(item.name === req.body.name){collection=true}
            }
            if(collection === true) {errors.push({path:'collection',msg:'please write new collection name'})}
            //checking for errors
            
            if(!errors.isEmpty()){
                res.status(400).send({title:'create collection',errors:errors.array()})
            return
            }
            
            //updating collection
            
            else{
                console.log(req.file)
                //creating collection
                if(typeof req.file === 'undefined' || typeof req.file == 'array' ){
                    console.log('file  not found')
                    errors.errors.push({path:'collection',msg:'please upload a collection photo'})
                    return res.status(400).send({title:'create collection',errors:errors.array()})
  
                }
                const src =await upload(req.file.path)
                
                const updatedCollection =new collectionModel({name:req.body.name,description:req.body.description,src:src})
                 await updatedCollection.save()

                res.send({url:updatedCollection.url})
            }
        
    })
]

exports.create_get_api = asyncHandler(async(req,res,next)=>{
    const collections =await collectionModel.find({})
    res.send({collection:collections})
})

//handling deleting a collection
exports.delete = asyncHandler(async(req,res,next)=>{
        await collectionModel.findByIdAndDelete(req.params.id)
        res.redirect('/collection')
    
})

//API handling deleting a collection
exports.delete_api = asyncHandler(async(req,res,next)=>{
        await collectionModel.findByIdAndDelete(req.params.id)
        res.send({authorization:true})
    
})