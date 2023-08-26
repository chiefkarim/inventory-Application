const csv = require('fast-csv');
const fs = require("fs");
const csvParser = require('csv-parser');
const result = [];
const nameIndex = {}; // A mapping to track indexes of names
const Category = require('./models/category')
const express = require('express');
const { default: mongoose } = require('mongoose');

require('dotenv').config()
const mongoDB = process.env.DATABASE_URI
main().catch((err)=>console.log(err))
async function main(){
await mongoose.connect(mongoDB).then(()=>{

    Category.create([{name:'shirt'},{name:'button up'},{name:'jacket'},{name:'accessory'},{name:'pant'},{name:'hat'},{name:'tie'}]).then(()=>        console.log('Item saved to database')
    ).catch((err)=>{console.log(err)}).then(async()=>{
        const category= await Category.find({})
    console.log(category)})
})
}
