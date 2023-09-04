const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')
const passport = require('passport')

//handling log in request GET
exports.logIn_get = asyncHandler(async(req,res,next)=>{
    res.render("log-in",{title:'Log in'})
})

//handling log in request POST
exports.logIn_post = [
    body('username','please enter a username')
    .trim()
    .isLength({min:1})
    .escape(),
    body('password','please enter a password')
    .trim()
    .isLength({min:1})
    .escape(),asyncHandler(async(req,res,next)=>{
        const errors=validationResult(req)
        if(!errors.isEmpty()){
            console.error(`Validation error ${JSON.stringify(errors)}`)
            res.render('log-in',{title:'Log in',errors:errors.array()})
        }else{
            next()
        }
    }),
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in"
      })
]
