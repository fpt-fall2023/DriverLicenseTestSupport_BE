const monggoose = require("mongoose");

const answerSchema = new monggoose.Schema({
  answerName: String,
  isCorrect: Boolean,
});

const Answer = monggoose.model("Answer", answerSchema);

module.exports = Answer;
