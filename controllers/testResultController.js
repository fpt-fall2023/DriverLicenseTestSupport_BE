const factory = require('./hanlderFactory');
const testResultModel = require('../models/testResultModel');
const createError = require('http-errors');

exports.saveTestResult = factory.createOne(testResultModel);
exports.deleteTestResult = factory.deleteOne(testResultModel);
exports.updateTestResult = factory.UpdateOne(testResultModel);
exports.getTestResult = factory.findOne(testResultModel);

