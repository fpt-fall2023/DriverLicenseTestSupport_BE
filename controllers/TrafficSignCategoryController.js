const factory = require("../controllers/hanlderFactory");
const TrafficSignCategory = require("../models/TrafficSignCategoty");
const TrafficSign = require("../models/TrafficSignModel");
const createError = require("http-errors");

exports.createTrafficSignCategory = factory.createOne(TrafficSignCategory);
exports.getAllTrafficSignCategory = factory.getAll(TrafficSignCategory);
// exports.deleteTrafficSignCategory = factory.deleteOne(TrafficSignCategory);
exports.updateTrafficSignCategory = factory.UpdateOne(TrafficSignCategory);

exports.deleteTrafficSignCategory = async (req, res, next) => {
    try {

        const trafficSign = await TrafficSign.findOne({ trafficCategory: req.params.id });

        if(trafficSign) {
            throw createError.BadRequest("This category is still used by an traffic sign");
        }

        const result = await TrafficSignCategory.findByIdAndDelete(req.params.id);
    
        if (!result) {
        throw createError.NotFound(
            "Can Not Found traffic sign category with the id"
        );
        }
    
        res.status(204).json({
        message: "success",
        statusCode: 204,
        });
    } catch (error) {
        next(error);
    }
};

