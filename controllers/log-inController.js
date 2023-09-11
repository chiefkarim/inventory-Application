const asyncHandler = require('express-async-handler')
const {body, validationResult} = require('express-validator')
const passport = require('passport')
const jwt = require('jsonwebtoken')
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
           
            passport.authenticate('local', function(err, user, info, status) {
                if (err) { return next(err) }
                if (!user) { return   res.render('log-in',{title:'Log in',errors:[info]})  }
               const accessToken = jwt.sign({username:req.body.username}, process.env.ACCESS_TOKEN_SECRET)
                res.send({accessToken:accessToken});
            })(req, res, next)
        }
    }),
]
