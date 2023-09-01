const asyncHandler = require("express-async-handler");
const itemModel = require("../models/item");
const collectionModel = require('../models/collection')
const { body, validationResult } = require("express-validator");
const path = require("path");

//items List
exports.list = asyncHandler(async(req,res,next)=>{
    res.render('item',{title:'item'})
})

// display item details on Get
exports.detail = asyncHandler(async(req,res,next)=>{
    let item = await itemModel.findById({_id: req.params.id});
    res.render('item',{name:req.params.id,title:'item',item:item})
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
            console.log(errors)
            res.render('editItem',{title:'edit item',errors:errors.array(),collections:collections})
            return

        } else{

            if (!req.body.id) {
                // setting collection
                let categoryId=await collectionModel.find({name:req.body.category},{_id:1})
                categoryId=categoryId[0]['_id']
                const src = []
                //setting images
                for (let file of req.files){
                src.push(file.filename)
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
src.push(file.filename)
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

//handling deleting a collection
exports.delete = asyncHandler(async(req,res,next)=>{
    await itemModel.findByIdAndDelete(req.params.id)
    res.redirect('/collection')
})
