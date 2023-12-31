const asyncHandler = require("express-async-handler");
const itemModel = require("../models/item");
const collectionModel = require('../models/collection')
const { body, validationResult } = require("express-validator");
const path = require("path");
const upload = require('../helpers/imageToWebdb')



// display item details on Get
exports.detail = asyncHandler(async(req,res,next)=>{
    let item = await itemModel.findById({_id: req.params.id});
    res.render('item',{name:req.params.id,title:'item',item:item})
})

//API display item details on Get
exports.detail_api = asyncHandler(async(req,res,next)=>{
    let item = await itemModel.findById({_id: req.params.id});
    res.send({name:req.params.id,title:'item',item:item})
})

// display edit item page on Get
exports.edit_get = asyncHandler(async(req,res,next)=>{
        
        const collections = await collectionModel.find({})
        if(req.params.id){
            let item = await itemModel.findById({_id: req.params.id});
            res.render('editItem',{title:'item',item:item,collections:collections,})
        }
        res.render('editItem',{title:'item',collections:collections,})
    

})
//API display edit item page on Get
exports.edit_get_api = asyncHandler(async(req,res,next)=>{
        
        const collections = await collectionModel.find({})
        if(req.params.id){
            let item = await itemModel.findById({_id: req.params.id});
           return res.send({title:'item',item:item,collections:collections})
        }
        res.send({title:'item',collections:collections,})

    

})

// handel edited item on Post
exports.edit_post = [ 
    body('name','Item name must contain at least 3 characters and 100 at max')
    .trim()
    .isLength({min:1})
    .escape(),
    body('price','price must range from 1 and up')
    .trim()
    .escape(),
    body('stock','quantity must range from 0 and up')
    .trim()
    .escape()
    ,asyncHandler(async(req,res,next)=>{
        // extracting errors 

            const errors = validationResult(req)
            const collections = await collectionModel.find()
            let item; 
            if(req.params.id){
    
            item= await itemModel.findById({_id: req.params.id});
            }
    
            //verifying that the category exists
            let category=false
            for(let i=0; i<collections.length;i++){
    
                if (collections[i].name === req.body.category){
                    category=true
                }
            }
            if(category === false){
                errors.push({msg:'please chose one of the available collections',path:'category'})
            }
    
            if(!errors.isEmpty()){
                if(req.params.id){
    
              console.log(errors)
                res.render('editItem',{title:'edit item',errors:errors.array(),item:item,collections:collections})
                return
                }
                
    
            } else{
    
                if (!req.body.id) {
                    // setting collection
                    let categoryId=await collectionModel.find({name:req.body.category},{_id:1})
                    categoryId=categoryId[0]['_id']
                    const src = []
                    //setting images
                    for (let file of req.files){
                    src.push(await upload(file.path))
                    }
                    const item = new itemModel({ name: req.body.name,
                        price:req.body.price,
                            stock : req.body.stock,
                            description:req.body.description,
                            category:categoryId,
                            src:src});
                             await item.save()
    
                            res.redirect(item.url)
                }
                const itemExists = await itemModel.find({name: req.body.name}).exec()
    
                if (itemExists){
                  let categoryId=await collectionModel.find({name:req.body.category},{_id:1})
                    categoryId=categoryId[0]['_id']
                    
    const src = []
    for (let file of req.files){
    src.push(await upload(file.path))
    }
    const updatedItem = await itemModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name,
        price:req.body.price,
            stock : req.body.stock,
            description:req.body.description,
            category:categoryId,
            src:src}, 
      { new: true } // This option returns the modified document
    ).exec();
                  res.redirect(updatedItem.url)
                }
            }
        
})]

//API handel edited item on Post
exports.edit_post_api = [ 
    body('name','Item name must contain at least 3 characters and 100 at max')
    .trim()
    .isLength({min:1})
    .escape(),
    body('price','price must range from 1 and up')
    .trim()
    .escape(),
    body('stock','quantity must range from 0 and up')
    .trim()
    .escape()
    ,asyncHandler(async(req,res,next)=>{
        // extracting errors 

            const errors = validationResult(req)
            const collections = await collectionModel.find()
            let item; 
            if(req.params.id){
    
            item= await itemModel.findById({_id: req.params.id});
            }
    
            //verifying that the category exists
            let category=false
            for(let i=0; i<collections.length;i++){
    
                if (collections[i].name === req.body.category){
                    category=true
                }
            }
            if(category === false){
                errors.errors.push({msg:'please chose one of the available collections',path:'category'})
            }
    
            if(!errors.isEmpty()){
    
              console.log(errors)
                res.send({title:'edit item',errors:errors.array(),item:item,collections:collections})
                return
                

            } else{
    
                if (!req.params.id) {
                    // setting collection
                    let categoryId=await collectionModel.find({name:req.body.category},{_id:1})
                    categoryId=categoryId[0]['_id']
                    const src = []
                    //setting images
                    for (let file of req.files){
                        

                    src.push(await upload(file.path))
                    }
                    const item = new itemModel({ name: req.body.name,
                        price:req.body.price,
                            stock : req.body.stock,
                            description:req.body.description,
                            category:categoryId,
                            src:src});
                             await item.save()
                           return res.send({url:item.url})
                }
                const itemExists = await itemModel.find({name: req.body.name}).exec()
    
                if (itemExists){
                  let categoryId=await collectionModel.find({name:req.body.category},{_id:1})
                    categoryId=categoryId[0]['_id']
                    
    const src = []
    for (let file of req.files){
    src.push(await upload(file.path))
    }
    const updatedItem = await itemModel.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name,
        price:req.body.price,
            stock : req.body.stock,
            description:req.body.description,
            category:categoryId,
            src:src}, 
      { new: true } // This option returns the modified document
    ).exec();
   return res.send({url:item.url})
                }
            }
        
})]

exports.create_post_api = [ 
    body('name','Item name must contain at least 3 characters and 100 at max')
    .trim()
    .isLength({min:1})
    .escape(),
    body('price','price must range from 1 and up')
    .trim()
    .escape(),
    body('stock','quantity must range from 0 and up')
    .trim()
    .escape()
    ,asyncHandler(async(req,res,next)=>{
        // extracting errors 

            const errors = validationResult(req)
            const collections = await collectionModel.find()
            
    
            //verifying that the category exists
            let category=false
            for(let i=0; i<collections.length;i++){
    
                if (collections[i].name === req.body.category){
                    category=true
                }
            }
            if(category === false){
                errors.errors.push({msg:'please chose one of the available collections',path:'category'})
            }
    
            if(!errors.isEmpty()){
    
              console.log(errors)
                res.send({title:'create item',errors:errors.array(),collections:collections})
                return
                

            } else{
    
                    const itemExists = await itemModel.findOne({name: req.body.name}).exec()
                    console.log(itemExists)
                    // setting collection
                    if(!itemExists){
                        let categoryId=await collectionModel.find({name:req.body.category},{_id:1})
                        categoryId=categoryId[0]['_id']
                        const src = []
                        //setting images
                        if(req.files.length<3){
                            errors.errors.push({msg:'please upload at least 3 photos',path:'images'})
                            return res.status(400).send({title:'create item',errors:errors.array()})
                        }
                        for (let file of req.files){
                        src.push(await upload(file.path))
                        }
                        const item = new itemModel({ name: req.body.name,
                            price:req.body.price,
                                stock : req.body.stock,
                                description:req.body.description,
                                category:categoryId,
                                src:src});
                                 await item.save()
        
                                res.send({url:item.url})
                    }else{
                        
                        res.send({title:'create item',errors:[{msg:'item already exists'}],collections:collections})
                    }
                }
          
        
})]
//handleing creating item GET API
exports.create_get_api =asyncHandler(async(req,res,next)=>{
    const collections = await collectionModel.find({})
    res.send({title:"collections create",collections:collections})

})

//handling deleting a item
exports.delete = asyncHandler(async(req,res,next)=>{
        await itemModel.findByIdAndDelete(req.params.id)
        res.redirect('/collection')
})

//API handling deleting a item
exports.delete_api = asyncHandler(async(req,res,next)=>{
        await itemModel.findByIdAndDelete(req.params.id)
        res.send({authorization:true})
})