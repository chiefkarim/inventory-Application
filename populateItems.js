const csv = require('fast-csv');
const fs = require("fs");
const csvParser = require('csv-parser');
const result = [];
const nameIndex = {}; // A mapping to track indexes of names
const Category = require('./models/category')
const express = require('express');
const { default: mongoose } = require('mongoose');
const Item = require('./models/item');
const { getEnabledCategories } = require('trace_events');
const category = require('./models/category');
require('dotenv').config()
//connecting to database
const mongoDB = process.env.DATABASE_URI
//getting categories
mongoose.connect(mongoDB).then(()=>{
    const categories = {}
Category.find({},{_id:1,name:1}).then(category=>{
    for(let i =0; i < category.length;i++){
        categories[category[i].name]=category[i]['_id']
    }
}).then(()=>{
    fs.createReadStream("./data.csv")
    .pipe(csvParser())
    .on("data", (data) => {
      data.stock = Math.round(Math.random() * 100);
  data.category=categories[data.category]
      if (nameIndex[data.name] === undefined) {
          data.src = [data.src];
          data.price = Math.floor(Math.random() * 400)
        nameIndex[data.name] = result.length;
        result.push(data);
      } else {
        result[nameIndex[data.name]].src.push(data.src);
      }
  
      
  
    })
    .on("end",async () => {
      Item.create(result).then(()=>{
        Item.find({}).then((data)=>console.log(data))

      })
  
    });
  
})



}).catch(err=>console.log(err))


