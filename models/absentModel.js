const mongoose = require('mongoose');

const AbsentSchema = new mongoose.Schema({
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  reason: {
    type: String,
    require: [true, 'reason must be require'],
    trim: true,
    maxlength: [100, 'reason must have less or equal then 100 characters']
  },
  dateAbsent: {
    type: String,
    require: [true, 'date absent is require'],
    validate: [
      {
        validator: function(v) {
          return /^\d{4}-\d{2}-\d{2}$/.test(v);
        },
        message: props => `${props.value} is not a valid date format!`
      }
    ]
  },
  isAccepted: {
    type: Boolean,
    default: false
  }
});

AbsentSchema.pre(/^find/, function(next) {
  this.populate({ path: 'teacher', select: 'name email avatar' });
  next();
});

const Absent = mongoose.model('Absent', AbsentSchema);

module.exports = Absent;
