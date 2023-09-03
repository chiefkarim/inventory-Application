const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const debug = require("debug")("app");
const compression = require('compression')
const helmet = require('helmet')


//connecting to database
mongoose.set("strictQuery", false);

const mongoDB = process.env.DATABASE_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
//

//setting up protection
app.use(helmet.contentSecurityPolicy({
  directives:{
    "script-src":["'self'","'unsafe-inline'"],
    scriptSrcAttr: ["'self'", "'unsafe-inline'"],
    "img-src":["'self'","cdn.shopify.com"]

  }
}))

//setting up requests rate limit
const RateLimit = require('express-rate-limit')
const limiter = RateLimit({
  windowMs:1 * 60 * 1000,// 1MINUTE
  max:50
})
app.use(limiter)

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//initializing session
const passport = require('passport')
const session = require('express-session')
app.use(session({secret:"cats", resave:false, saveUninitialized:true}))
app.use(passport.initialize())
app.use(passport.session())
app.use(express.urlencoded({ extended: false }));

//optimizing response sent to the user
app.use(compression())
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(function(req,res,next){
  res.locals.currentUser = req.user
  next()
})

//setting up authentication
const LocalStrategy = require('passport-local')
const userModel = require('./models/user')
passport.serializeUser(function(user,done){
  done(null,user.id)
})

passport.deserializeUser(async function(id,done){
  try{
    const user = await userModel.findById(id)
    done(null,user)
  }catch(err){
    done(err)
  }
})
passport.use(new LocalStrategy(async(username, password, done)=>{
  try{
    const bcrypt = require('bcryptjs')
    const user = await userModel.findOne({username:username})
    const match = bcrypt.compare(password,user.password)
    if(!user){
      return done(null, false,{ message:'user does not exist. please check your username, please try again.'})
    }
    if(!match){
      return done(null, false,{ message:'wrong password. please try again.'})
    }
    return done(null,user)
  }catch(err){
    return done(err)
  }
}))


//Routing
const indexRouter = require("./routes/index");
const collectionRouter = require("./routes/collection");
const itemRouter = require("./routes/item");
const signUpRouter = require("./routes/sign-up")
const logInRouter = require('./routes/log-in')
app.use("/",express.static(path.join(__dirname, "uploads")),indexRouter);
app.use("/collection", express.static(path.join(__dirname, "uploads")),collectionRouter);
app.use("/item",express.static(path.join(__dirname, "uploads")),itemRouter);
app.use("/sign-up",signUpRouter)
app.use("/log-in",logInRouter)
app.use("/log-out",async(req,res,next)=>{
  
    req.logout(function(err){
      if(err){
        return next(err)
      }
      res.redirect('/')
    })
  
})
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
