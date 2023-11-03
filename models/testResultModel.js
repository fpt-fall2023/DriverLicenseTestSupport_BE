const mongoose = require('mongoose');

const testResultSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'User ID is required']
    },
    sampleTestId: {
        type: mongoose.Schema.ObjectId,
        ref: 'SampleTest',
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
    if(this.sampleTestId.testType === "B1") {
        return this.numRightQuestion >= 28
    }else {
        return this.numRightQuestion >= 32  
    }
})

testResultSchema.pre(/^find/, function(next) {
    this
    .populate('userId')
    .populate('sampleTestId')
    next()
})

const TestResult = mongoose.model('TestResult', testResultSchema);

module.exports = TestResult;
