const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'User ID is required']
    },
    testId: {
        type: mongoose.Schema.ObjectId,
        required: [true, 'Test ID is required']
    },
    numRightQuestion: {
        type: Number,
        required: [true, 'Number of question right is required']
    },
    score: {
        type: Number,
        required: [true, 'Score is required']
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

testResultSchema.virtual("isPass").get(function () {
    return this.numRightQuestion > 30
})

const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;
