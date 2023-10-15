const mongoose = require("mongoose");

const TrafficSignCategorySchema = new mongoose.Schema({
  trafficType: {
    type: String,
    unique: true,
    trim: true,
  },
});

const TrafficSignCategory = mongoose.model(
  "TrafficType",
  TrafficSignCategorySchema
);

module.exports = TrafficSignCategory;
