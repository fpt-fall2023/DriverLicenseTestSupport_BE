const factory = require('./hanlderFactory');
const courseModel = require('../models/courseModel');

exports.createCourse = factory.createOne(courseModel);
exports.updateCourse = factory.UpdateOne(courseModel);
exports.deleteCourse = factory.deleteOne(courseModel);
exports.getAllCourse = factory.getAll(courseModel);