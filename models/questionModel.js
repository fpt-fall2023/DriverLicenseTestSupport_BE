const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    unique: true,
    required: [true, "Queston Name Is Not Allow Empty"],
    trim: true,
  },
  questionImage: String,
  isDanger: {
    type: Boolean,
    default: false,
  },
  answers: {
    type: Array,
    required: [true, "Question Must Have At Least One Answer"],
  },
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
