const factory = require("../controllers/hanlderFactory");
const TrafficSign = require("../models/TrafficSignModel");

exports.createTrafficSign = factory.createOne(TrafficSign);
exports.updateTrafficSign = factory.UpdateOne(TrafficSign);
exports.getAllTrafficSign = factory.getAll(TrafficSign);
exports.deleteTrafficSign = factory.deleteOne(TrafficSign);
