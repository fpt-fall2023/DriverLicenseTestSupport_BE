const factory = require('./hanlderFactory');
const sampleTestModel = require('../models/sampleTestModel');

exports.getAllSampleTest = factory.getAll(sampleTestModel);
exports.createSampleTest = factory.createOne(sampleTestModel);
exports.deleteSampleTest = factory.deleteOne(sampleTestModel);
exports.updateSampleTest = factory.UpdateOne(sampleTestModel);
