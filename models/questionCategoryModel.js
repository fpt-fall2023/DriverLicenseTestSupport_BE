const mongoose = require("mongoose");

const questionTypeSchema = new mongoose.Schema({
  category: {
    type: String,
    trim: true,
    required: [true, "Type must be required"],
  },
  code: {
    type: Number,
    required: [true, "Code is required"],
  },
});

const questionType = mongoose.model("QuestionType", questionTypeSchema);

module.exports = questionType;
