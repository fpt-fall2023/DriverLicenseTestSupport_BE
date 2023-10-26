const factory = require('./hanlderFactory');
const AbsentModel = require('../models/absentModel');
const Booking = require('../models/bookingModel');
const createError = require('http-errors');

// exports.createAbsent = factory.createOne(AbsentModel);
exports.updateAbsent = factory.UpdateOne(AbsentModel);
exports.deleteAbsent = factory.deleteOne(AbsentModel);
exports.getAllAbsent = factory.getAll(AbsentModel);

exports.requestAbsent = async (req, res, next) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];

    const reqYearAbsent = req.body.dateAbsent.split('-')[0];

    if(currentDate.split('-')[0] !== reqYearAbsent) {
        throw createError.BadRequest('Year is not valid');
    }

    if (req.body.dateAbsent < currentDate) {
      throw createError.BadRequest(
        'Can not create absent request have date in the past'
      );
    }

    //! phải tạo request absent trước 2 ngày
    const testDay = Number(currentDate.split('-')[2]) + 2;
    const reqDay = Number(req.body.dateAbsent.split('-')[2]);
    if(reqDay < testDay) {
        throw createError.BadRequest('Absent request must sent before 2 day from today');
    }

    const absent = await AbsentModel.create({
        teacher: req.body.teacher,
        reason: req.body.reason,
        dateAbsent: req.body.dateAbsent
    });

    res.status(201).json({
      status: 'success',
      absent
    });
  } catch (error) {
    next(error);
  }
};

exports.aprroveAbsent = async (req, res, next) => {
  try {
    const id = req.params.id;

    const approvedAbsent = await AbsentModel.findByIdAndUpdate(id, { isAccepted: true }, {
        new: true,
    });

    res.status(200).json({
        status: 'success',
        approvedAbsent
    })
  } catch (error) {
    next(error);
  }
};
