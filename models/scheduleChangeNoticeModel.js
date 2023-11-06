const mongoose = require('mongoose');

const scheduleChangeNoticeSchema = new mongoose.Schema({
    message: {
        type: String,
        required: [true, 'message must be require'],
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'teacher must be require']
    },
    proposedDate: {
        type: Date,
        required: [true, 'date must be require']
    },
    students: [
        {
            student: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'Students must be required']
            },
            response: {
                type: String,
                enum: ['accepted', 'denied', 'pending'],
                default: 'pending'
            },
            proposedSlot: {
                type: String,
                required: [true, 'slot must be require']
            },
        }
    ],
});

scheduleChangeNoticeSchema.pre(/^find/, function(next) {
    this.populate({ path: 'students.student', select: 'name email phone' }).populate({path: 'teacher', select: 'name email phone'})
    next()
})

module.exports = mongoose.model('ScheduleChangeNotice', scheduleChangeNoticeSchema);
