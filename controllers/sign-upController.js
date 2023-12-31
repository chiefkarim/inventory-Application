const asyncHandler = require("express-async-handler");
const {body , validationResult } = require('express-validator')
const userModel = require('../models/user') 
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signUp_get = asyncHandler(async(req,res,next)=>{
    res.render('sign-up',{title:'sign up'})
})

exports.signUp_post = [
    body('username','please enter a username between 3 and 15 characters')
    .trim()
    .isLength({min:3, max: 15})
    .escape(),
    body('password','please enter a password of 5 and 15 characters')
    .trim()
    .isLength({min:5,max:15})
    .escape()
    ,asyncHandler(async(req,res,next)=>{
    
        const errors = validationResult(req) 
        //checking if user already exists
        const userExist = await userModel.findOne({username:req.body.username})
        if(userExist){
            console.log('already exists')
            errors.errors.push({path:'username',msg:'username already exists'})
        }
    if(!errors.isEmpty()){
        res.render('sign-up',{errors:errors.array(),title:"sing up"})
        return
    }else{
        bcrypt.hash(req.body.password,10,async(err,hashedPassword)=>{
            try{
                console.log(`the name is ${req.body.username}`)
                console.log(`the password is ${req.body.password}`)
                const user = new userModel({
                   username:req.body.username,
                   password:hashedPassword
                })
                result = await user.save()
                const accessToken = jwt.sign({username:req.body.username}, process.env.ACCESS_TOKEN_SECRET)
                res.send({accessToken:accessToken});
            }catch(err){
                return next(err)
            }
        })

    }

})]

exports.signUp_post_api = [
    body('username','please enter a username between 3 and 15 characters')
    .trim()
    .isLength({min:3, max: 15})
    .escape(),
    body('password','please enter a password of 5 and 15 characters')
    .trim()
    .isLength({min:5,max:15})
    .escape()
    ,asyncHandler(async(req,res,next)=>{
    
        const errors = validationResult(req) 
        //checking if user already exists
        const userExist = await userModel.findOne({username:req.body.username})
        if(userExist){
            console.log('already exists')
            errors.errors.push({path:'username',msg:'username already exists'})
        }
    if(!errors.isEmpty()){
        res.send({errors:errors.array(),title:"sing up"})
        return
    }else{
        bcrypt.hash(req.body.password,10,async(err,hashedPassword)=>{
            try{
                console.log(`the name is ${req.body.username}`)
                console.log(`the password is ${req.body.password}`)
                const user = new userModel({
                   username:req.body.username,
                   password:hashedPassword
                })
                result = await user.save()
                const accessToken = jwt.sign({username:req.body.username}, process.env.ACCESS_TOKEN_SECRET)
                res.send({accessToken:accessToken});
            }catch(err){
                return next(err)
            }
        })

    }

})]