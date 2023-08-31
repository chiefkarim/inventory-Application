const csv = require("fast-csv");
const fs = require("fs");
const csvParser = require("csv-parser");
const result = [];
const nameIndex = {}; // A mapping to track indexes of names
const collection = require("./models/collection");
const express = require("express");
const { default: mongoose } = require("mongoose");

require("dotenv").config();
const mongoDB = process.env.DATABASE_URI;
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB).then(() => {
    collection
      .create([
        { name: "shirt" ,src: "https://cdn.shopify.com/s/files/1/0628/7304/3159/products/2014-08-25_Matt_Look_040.jpg?v=1645893189"},
        { name: "button up", src: "https://cdn.shopify.com/s/files/1/0628/7304/3159/products/2014_11_3_Addis_Look15_02.jpg?v=1645892383" },
        { name: "jacket" ,src:"https://cdn.shopify.com/s/files/1/0628/7304/3159/products/2014-08-25_Matt_Look_018.jpg?v=1645892911"},
        { name: "accessory", src:"https://cdn.shopify.com/s/files/1/0628/7304/3159/products/2015-07-08_Laydown_32093_24563.jpg?v=1645896199"},
        { name: "pant" ,src:"https://cdn.shopify.com/s/files/1/0628/7304/3159/products/2015-06-04-Matt_Look9_20676_22935.jpg?v=1645894082"},
        { name: "hat" ,src:"https://cdn.shopify.com/s/files/1/0628/7304/3159/products/2015-02-15_Addis_Look_13_30276_4290_c6bd1a0a-7f75-4a61-95a7-db32defdbd08.jpg?v=1645895484"},
        { name: "tie" ,src:"https://cdn.shopify.com/s/files/1/0628/7304/3159/products/2015-05-08_Laydown_Look16_30830_21712.jpg?v=1645895799"},
      ])
      .then(() => console.log('saving...'))
      .catch((err) => {
        console.log(err);
      })
      .then(async () => {
        console.log("Item saved to database")
   //  const collection = await collection.find({});
     //   console.log(collection);
      });
  });
}
