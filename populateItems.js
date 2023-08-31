const csv = require("fast-csv");
const fs = require("fs");
const csvParser = require("csv-parser");
const result = [];
const nameIndex = {}; // A mapping to track indexes of names
const collection = require("./models/collection");
const express = require("express");
const { default: mongoose } = require("mongoose");
const Item = require("./models/item");
const { getEnabledCategories } = require("trace_events");
require("dotenv").config();
//connecting to database
const mongoDB = process.env.DATABASE_URI;
//getting categories
mongoose
  .connect(mongoDB)
  .then(() => {
    const categories = {};
    collection
      .find({}, { _id: 1, name: 1 })
      .then((collection) => {
        for (let i = 0; i < collection.length; i++) {
          categories[collection[i].name] = collection[i]["_id"];
        }
      })
      .then(() => {
        fs.createReadStream("./data.csv")
          .pipe(csvParser())
          .on("data", (data) => {
            data.stock = Math.round(Math.random() * 100);
            data.category = categories[data.collection];
            if (nameIndex[data.name] === undefined) {
              data.src = [data.src];
              data.price = Math.floor(Math.random() * 400);
              nameIndex[data.name] = result.length;
              result.push(data);
            } else {
              result[nameIndex[data.name]].src.push(data.src);
            }
          })
          .on("end", async () => {
            Item.create(result).then(() => {
              Item.find({}).then((data) => console.log(data));
            });
          });
      });
  })
  .catch((err) => console.log(err));
