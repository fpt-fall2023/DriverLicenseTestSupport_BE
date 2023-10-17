const mongoose = require('mongoose');

const sampleTestSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: [true, 'test name is not allowed empty'],
        unique: true,
    },
    questionBank: {
        type: String,
        required: [true, 'assign a question bank to a test']   
    },
    testType: {
        type: String,
        enum: ["B1", "B2"],
        required: [true, 'test type is not allowed empty'],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
})

const sampleTest = mongoose.model('SampleTest', sampleTestSchema);

module.exports = sampleTest;