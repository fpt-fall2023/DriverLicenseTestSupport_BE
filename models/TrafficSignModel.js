const mongoose = require("mongoose");

const TrafficSignSchema = new mongoose.Schema({
  image: {
    type: String,
    unique: true,
    trim: true,
  },
  title: {
    type: String,
    unique: true,
  },
  description: {
    type: String,
    trim: true,
  },
  trafficCategory: {
    type: mongoose.Schema.ObjectId,
    ref: "TrafficType",
    require: [true, "Category is required"],
  },
});

TrafficSignSchema.pre(/^find/, function (next) {
  this.populate({ path: "trafficCategory", select: "-__v _id" });
  next();
});

const TrafficSign = mongoose.model("TrafficSign", TrafficSignSchema);

module.exports = TrafficSign;
