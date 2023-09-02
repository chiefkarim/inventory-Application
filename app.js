const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const indexRouter = require("./routes/index");
const collectionRouter = require("./routes/collection");
const itemRouter = require("./routes/item");
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

//setting up protection
app.use(helmet())

//setting up requests rate limit
const RateLimit = require('express-rate-limit')
const limiter = RateLimit({
  windowMs:1 * 60 * 1000,// 1MINUTE
  max:20
})
app.use(limiter)

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

//optimizing response sent to the user
app.use(compression())
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/",express.static(path.join(__dirname, "uploads")),indexRouter);
app.use("/collection", express.static(path.join(__dirname, "uploads")),collectionRouter);
app.use("/item",express.static(path.join(__dirname, "uploads")),itemRouter);
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
