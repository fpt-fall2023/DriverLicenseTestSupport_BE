const mongoose = require("mongoose");

const TrafficSignCategorySchema = new mongoose.Schema({
  trafficType: {
    type: String,
    unique: true,
    trim: true,
    require: [true, 'not allowed empty']
  },
});

const TrafficSignCategory = mongoose.model(
  "TrafficType",
  TrafficSignCategorySchema
);

module.exports = TrafficSignCategory;
