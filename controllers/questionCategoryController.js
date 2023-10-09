const factory = require("./hanlderFactory");
const QuestionType = require("../models/questionCategoryModel");

exports.createCategory = factory.createOne(QuestionType, ["category", "code"]);
exports.getAllCategory = factory.getAll(QuestionType);
exports.deleteCategory = factory.deleteOne(QuestionType);
exports.updateCategory = factory.UpdateOne(QuestionType);
