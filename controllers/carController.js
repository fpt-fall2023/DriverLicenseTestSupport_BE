const factory = require('./hanlderFactory');
const CarModel = require('../models/carModel');

exports.createCar = factory.createOne(CarModel, ["name", "brand", "licensePlate"]);
exports.updateCar = factory.UpdateOne(CarModel);
exports.deleteCar = factory.deleteOne(CarModel);
exports.getAllCar = factory.getAll(CarModel);