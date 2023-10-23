const mongoose = require('mongoose');

const slotSchema = mongoose.Schema({
  time: {
    type: String,
    unique: true,
    trim: true,
    require: [true, 'slot is not allowed empty'],
    validate: {
      validator: function(value) {
        return /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(value);
      },
      message: props =>
        `${props.value} is not a valid time format! require HH:MM`
    }
  }
});

const Slot = mongoose.model('slot', slotSchema);

module.exports = Slot;
