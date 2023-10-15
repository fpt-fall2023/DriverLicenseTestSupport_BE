const factory = require("../controllers/hanlderFactory");
const TrafficSignCategory = require("../models/TrafficSignCategoty");

exports.createTrafficSignCategory = factory.createOne(TrafficSignCategory);
exports.getAllTrafficSignCategory = factory.getAll(TrafficSignCategory);
exports.deleteTrafficSignCategory = factory.deleteOne(TrafficSignCategory);
exports.updateTrafficSignCategory = factory.UpdateOne(TrafficSignCategory);
