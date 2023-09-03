const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')
const passport = require('passport')

//handling log in request GET
exports.logIn_get = asyncHandler(async(req,res,next)=>{
    res.render("log-in",{title:'Log in'})
})

//handling log in request POST
exports.logIn_post = [
    body('username','please enter a username between 3 and 15 characters')
    .trim()
    .isLength({min:3, max: 15})
    .escape(),
    body('password','please enter a password of 5 and 15 characters')
    .trim()
    .isLength({min:5,max:15})
    .escape(),
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/log-in"
      })
]
