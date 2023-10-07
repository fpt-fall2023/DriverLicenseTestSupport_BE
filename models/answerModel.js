const monggoose = require("mongoose");

const answerSchema = new monggoose.Schema({
  answer: String,
  isCorrect: Boolean,
});

const Answer = monggoose.model("Answer", answerSchema);

module.exports = Answer;
