const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: {
        type: String,
        required: [true, 'course name is required'],
        unique: true
    },
    description: String,
    startDate: {
        type: String,
        required: [true, 'start date is required']
    },
    endDate: {
        type: String,
        required: [true, 'end date is required']
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;