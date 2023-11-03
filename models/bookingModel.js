const mongoose = require('mongoose');
const { addHoursToTime, calculateTotalHours } = require('../utils/utilities')
 
const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'user is required']
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'teacher is required']
  },
  course: {
    type: mongoose.Schema.ObjectId,
    ref: 'Course',
    required: [true, 'course is required']
  },
  car: {
    type: mongoose.Schema.ObjectId,
    ref: 'Car'
  },
  date: {
    type: String,
    required: [true, 'date is required'],
    validate: {
      validator: function(v) {
        return /^\d{4}-\d{2}-\d{2}$/.test(v);
      },
      message: props => `${props.value} is not a valid date format!`
    }
  },
  timeStart: {
    type: String,
    required: [true, 'time is required'],
    validate: {
      validator: function(value) {
        return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      },
      message: props =>
        `${props.value} is not a valid time format! require HH:MM`
    }
  }
}, {
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

bookingSchema.pre(/^find/, function(next) {
  this.populate({ path: 'user', select: 'name email phone' })
    .populate({ path: 'teacher', select: 'name email avatar' })
    .populate({ path: 'course', select: '-__v' }).populate({path: 'car', select: '-__v'});
  next();
});

bookingSchema.virtual("timeEnd").get(function() {
  return addHoursToTime(this.timeStart, 2);
})

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
