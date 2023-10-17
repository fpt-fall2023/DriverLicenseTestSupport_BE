const mongoose = require("mongoose");

const questionBankSchema = new mongoose.Schema({
  questionBankName: {
    type: String,
    unique: true
  },
  question: [
    {
        type: mongoose.Schema.ObjectId,
        ref: 'Question',
        required: [true, 'Question is not allowed empty'],
    }
  ],
  driveType: {
    type: String,
    enum: ["B1", "B2"],
    required: [true, 'drive type is not allowed empty'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    select: false
  }
});

questionBankSchema.pre(/^find/, function(next) {
    this.populate({path: 'question', select: '-__v'})
    next()
})

const questionBank = mongoose.model("QuestionBank", questionBankSchema);

module.exports = questionBank;
