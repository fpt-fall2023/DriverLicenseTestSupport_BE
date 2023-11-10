const mongoose = require('mongoose');

const questionTypeSchema = new mongoose.Schema({
  questionType: {
    type: String,
    trim: true,
    required: [true, 'Type must be required']
  }
});

const questionType = mongoose.model('QuestionType', questionTypeSchema);

module.exports = questionType;
