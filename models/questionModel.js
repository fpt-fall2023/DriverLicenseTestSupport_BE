const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  text: String,
  isCorrect: Boolean,
});

const questionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    required: true,
  },
  questionImage: String,
  isDanger: {
    type: Boolean,
    default: false,
  },
  correctOptions: Number,
  answers: [answerSchema],
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
