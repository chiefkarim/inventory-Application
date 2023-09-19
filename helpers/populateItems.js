const csv = require("fast-csv");
const fs = require("fs");
const csvParser = require("csv-parser");
const upload = require('../helpers/imageToWebdb');
const collection = require("../models/collection");
const mongoose = require("mongoose");
const Item = require("../models/item");
require("dotenv").config();

const mongoDB = process.env.DATABASE_URI;
const filePath = './helpers/data.csv';

mongoose
  .connect(mongoDB)
  .then(() => {
    const categories = {};
    collection.find({}, { _id: 1, name: 1 }).then((collectionData) => {
      collectionData.forEach((item) => {
        categories[item.name] = item._id;
      });

      const result = [];
      const nameIndex = {};

      // ... (previous code)

const processCSV = () => {
  return new Promise((resolve, reject) => {
    const uploadPromises = []; // Store upload promises

    fs.createReadStream(filePath)
      .pipe(csvParser({ encoding: 'utf-8' }))
      .on("data", (data) => {
        const uploadPromise = upload(data.src).then((src) => {
          data.stock = Math.round(Math.random() * 100);
          data.category = categories[data.collection];

          if (nameIndex[data.name] === undefined) {
            data.src = [src];
            data.price = Math.floor(Math.random() * 400);
            nameIndex[data.name] = result.length;
            result.push(data);
          } else {
            result[nameIndex[data.name]].src.push(src);
          }
        });

        uploadPromises.push(uploadPromise);
      })
      .on("end", async () => {
        try {
          // Wait for all image uploads to complete
          await Promise.all(uploadPromises);

          // Once all uploads are finished, create and find Item documents
          await Item.create(result);
          const items = await Item.find({});
          console.log(items);
          console.log("Processing completed.");
          resolve();
        } catch (error) {
          console.error("Error creating or finding Item documents:", error);
          reject(error);
        } finally {
          mongoose.connection.close(); // Close the database connection when done.
        }
      });
  });
};



      processCSV()
        .then(() => {
          console.log("Processing completed.");
          mongoose.connection.close(); // Close the database connection when done.
        })
        .catch((error) => console.error("Processing error:", error));
    });
  })
  .catch((err) => console.error("Database connection error:", err));
