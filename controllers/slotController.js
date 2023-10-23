const factory = require('./hanlderFactory');
const SlotModel = require('../models/slotModel');

exports.createSlot = factory.createOne(SlotModel);
exports.updateSlot = factory.UpdateOne(SlotModel);
exports.deleteSlot = factory.deleteOne(SlotModel);
exports.getAllSlot = factory.getAll(SlotModel);