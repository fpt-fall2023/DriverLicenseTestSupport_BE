const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionName: {
    type: String,
    unique: true,
    required: [true, "Queston Name Is Not Allow Empty"],
    trim: true,
  },
  isDanger: {
    type: Boolean,
    default: false
  },
  answers: {
    type: Array,
    required: [true, "Question Must Have At Least One Answer"],
  },
  questionImage: String,
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionType",
    required: [true, "Category is required"],
  },
});

questionSchema.pre(/^find/, function (next) {
  this.populate([
    { path: "category", select: "-__v -_id" },
    { path: "questionImage", select: "image -_id -trafficCategory" }
  ]);
  next();
});

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;
