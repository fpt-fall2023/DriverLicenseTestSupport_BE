const factory = require('./hanlderFactory');
const Booking = require('../models/bookingModel');
const Slot = require('../models/slotModel');
const User = require('../models/userModal');
const { getCurrentTime } = require('../utils/utilities');
const createError = require('http-errors');
const { all } = require('../routes/bookingRouter');

exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.UpdateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

exports.createBooking = async (req, res, next) => {
  try {
    const currentDate = new Date().toISOString().split('T')[0];
    let booking = Booking.find({
      date: req.body.date,
      teacher: req.body.teacher
    });

    const slot = await Slot.find();
    const validTime = slot.map(item => item.time);

    // 1. chặn thời gian booking không hợp lệ
    if (!validTime.includes(req.body.timeStart)) {
      throw createError.BadRequest('Time is not valid');
    }

    // 2. chặn user booking lịch trong quá khứ
    if (req.body.date < currentDate) {
      throw createError.BadRequest('Date is not valid');
    }

    // 3. chặn user tạo booking trùng giờ trong ngày
    const bookedCourse = await booking;
    bookedCourse.forEach(course => {
      if (course.timeStart === req.body.timeStart) {
        throw createError.BadRequest('This Course was booked by somebody else');
      }
    });

    // 4. một user chỉ được học tối đa mười tiếng một ngày
    const bookedCourseByUser = await booking
      .countDocuments({
        user: req.body.user
      })
      .clone();

    if (bookedCourseByUser === 5) {
      throw createError.BadRequest(
        'Một ngày học sinh chỉ được học tối đa 10 tiếng'
      );
    }

    const bookingCourse = await Booking.create({
      user: req.body.user,
      teacher: req.body.teacher,
      course: req.body.course,
      date: req.body.date,
      timeStart: req.body.timeStart
    });

    res.status(201).json({
      status: 'success',
      bookingCourse
    });
  } catch (error) {
    next(error);
  }
};

exports.getAvailableSlot = async (req, res, next) => {
  try {
    const reqDate = req.query.date;
    const teacherId = req.params.id;
    const currentDate = new Date().toISOString().split('T')[0];
    const allSlot = await Slot.find();
    const bookingsByDate = (
      await Booking.find({ teacher: teacherId, date: reqDate })
    ).map(item => item.timeStart);

    // 1. lọc bỏ slot có thời gian nhỏ hơn thời gian hiện tại
    // const currentTime = getCurrentTime();
    const currentTime = '06:00';
    const remainSlot =
      reqDate === currentDate
        ? allSlot.filter(slot => slot.time > currentTime)
        : allSlot;

    // 2. lọc những slot chưa được booking theo giáo viên trong ngày
    const availableSlots = remainSlot.reduce((acc, curVal) => {
      return bookingsByDate.includes(curVal.time) ? acc : [...acc, curVal];
    }, []);

    res.status(200).json({
      status: 'success',
      availableSlots
    });
  } catch (error) {
    next(error);
  }
};

exports.getAvailableTeacher = async (req, res, next) => {
  try {
    const currentDate = req.query.date;
    const allSlot = await Slot.find();
    const allTeacher = await User.find({ role: 'teacher' });

    // nhóm những giáo viên đã được book và số lượng slot
    const bookedStats = await Booking.aggregate([
      {
        $match: { date: { $eq: currentDate } }
      },
      {
        $group: {
          _id: '$teacher',
          numSlots: { $sum: 1 }
        }
      }
    ]);

    let teachers = [];

    if (bookedStats.length === 0) {
      teachers = [...allTeacher];
    }

    if (bookedStats.length !== 0) {
      // trường hợp những giáo viên chưa được booking
      allTeacher.forEach((item, index) => {
        if (
          !bookedStats.map(item => item._id.toString()).includes(item._id.toString())
        ) {
          teachers.push(item);
        }


        if (bookedStats[index]?.numSlots < allSlot.length) {
          teachers.push(item);
        }
      });
    }

    res.status(200).json({
      status: 'success',
      teachers
    });
  } catch (error) {
    next(error);
  }
};
