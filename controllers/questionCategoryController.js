const factory = require('./hanlderFactory');
const questionCategory = require('../models/questionCategoryModel');
const createError = require('http-errors');
const Question = require('../models/questionModel');

exports.createCategory = factory.createOne(questionCategory, ['category']);
exports.getAllCategory = factory.getAll(questionCategory);
// exports.deleteCategory = factory.deleteOne(QuestionType);
exports.updateCategory = factory.UpdateOne(questionCategory);

exports.deleteCategory = async (req, res, next) => {
  try {

    const product = await Question.findOne({ category: req.params.id });

    if(product) {
      throw createError.BadRequest('This category is still used by an question');
    }

    const result = await questionCategory.findByIdAndDelete(req.params.id);

    if (!result) {
      throw createError.NotFound('Can Not Found question category with the id');
    }

    res.status(204).json({
      message: 'success',
      statusCode: 204
    }); 
  } catch (error) {
    next(error);
  }
};
