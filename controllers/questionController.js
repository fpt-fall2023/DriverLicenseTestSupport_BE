const factory = require("../controllers/hanlderFactory");
const Question = require("../models/questionModel");
const Answer = require("../models/answerModel");

exports.getAllQuestion = factory.getAll(Question);
exports.deleteQuestion = factory.deleteOne(Question);
exports.updateQuestion = factory.UpdateOne(Question);

exports.createQuestion = async (req, res, next) => {
  try {
    const { questionName, answers } = req.body;

    // Create a new question document
    const newQuestion = new Question({ questionName });

    //Create and associate answer documents
    for (const answerData of answers) {
      newQuestion.answers.push(answerData);
    }

    // Save the question document
    const savedQuestion = await newQuestion.save();

    res.json(savedQuestion);
  } catch (error) {
    next(error);
  }
};
