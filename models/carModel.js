const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        require: [true, 'car name is require']
    },
    brand: {
        type: String,
        trim: true,
    },
    licensePlate:  {
        type: String,
        require: [true, 'license plate is require']
    },
    status: {
        type: String,
        default: 'available',
        enum: ['available', 'unavailable', 'fixing', 'broken'],
    }
})

const Car = mongoose.model('Car', carSchema);

module.exports = Car