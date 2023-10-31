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
    const currentDate = new Date();

    const reqYearAbsent = new Date(req.body.dateAbsent);

    if (currentDate.getFullYear() !== reqYearAbsent.getFullYear()) {
      throw createError.BadRequest('Year is not valid');
    }

    if (req.body.dateAbsent < currentDate) {
      throw createError.BadRequest(
        'Can not create Absence request have date in the past'
      );
    }

    //! phải tạo request absent trước 2 ngày
    currentDate.setDate(currentDate.getDate() + 2); // plus two more days from now
    const requestDate = new Date(req.body.dateAbsent);
    if (requestDate < currentDate) {
      throw createError.BadRequest(
        'Absence request must be sent at least two days before today.'
      );
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

    const approvedAbsent = await AbsentModel.findByIdAndUpdate(
      id,
      { status: "approved" },
      {
        new: true
      }
    );

    res.status(200).json({
      status: 'success',
      approvedAbsent
    });
  } catch (error) {
    next(error);
  }
};

exports.rejectAbsent = async (req, res, next) => {
  try {
    const absenceID = req.params.id;

    const rejectedAbsent = await AbsentModel.findByIdAndUpdate(
      absenceID,
      { status: "rejected" },
      {
        new: true
      }
    );

    res.status(200).json({
      status: 'success',
      rejectedAbsent
    });
  } catch (error) {
    next(error);
  }
};