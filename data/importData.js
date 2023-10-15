/* eslint-disable import/no-useless-path-segments */
const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Question = require('./../models/questionModel')

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('DB connection successful!');
  });

const tours = JSON.parse(fs.readFileSync(`${__dirname}/questions.json`, 'utf-8'));

// import data to DB
const importData = async () => {
  try {
    await Question.create(tours, { validateBeforeSave: false });
    console.log('data successfully loaded!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

// delete all old data from Collections
const deleteData = async () => {
  try {
    await Question.deleteMany();
    console.log('data successfully deleted!');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
