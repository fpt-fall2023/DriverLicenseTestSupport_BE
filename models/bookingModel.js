// create model for booking have user, teacher, course, date, time, status, note
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'user is required']
  },
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'Teacher',
    required: [true, 'teacher is required']
  },
  course: {
    type: String,
    enum: ['B1', 'B2'],
    required: [true, 'course is required']
  },
  date: {
    type: Date,
    required: [true, 'date is required']
  },
  time: {
    type: String,
    required: [true, 'time is required']
  },
  note: String
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
