const factory = require('./hanlderFactory');
const Booking = require('../models/bookingModel');
const Slot = require('../models/slotModel');
const User = require('../models/userModal');
const Absent = require('../models/absentModel');
const Car = require('../models/carModel');
const { getCurrentTime } = require('../utils/utilities');
const createError = require('http-errors');

exports.getAllBooking = factory.getAll(Booking);
exports.updateBooking = factory.UpdateOne(Booking);
exports.deleteBooking = factory.deleteOne(Booking);

exports.updateBooking = async (req, res, next) => {
  try {

    //! 1. Gửi request cho user xem có chấp nhận lịch học đó không
    

    //! 2. Nếu user chấp nhận lịch thì sẽ cập nhật qua chủ nhật 

    //! 3. Nếu user không chấp nhận thì 

  } catch (error) {
    next(error)
  }
}

exports.createBooking = async (req, res, next) => {
  try {
    const data = req.body;
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
      throw createError.BadRequest('User can not booking the date in the past');
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

    if (bookedCourseByUser === slot.length) {
      throw createError.BadRequest(
        'Một ngày học sinh chỉ được học tối đa 10 tiếng'
      );
    }

    // 5. Tự động assign ô tô còn active trong hệ thống
    const bookedTeacherWithCar = await Booking.find({
      date: req.body.date,
      teacher: req.body.teacher
    });

    // nếu một booking đã có giáo viên thì chỉ cần lấy id car thuộc giáo viên đó gán cho tất cả booking của giáo viên trong ngày
    if (bookedTeacherWithCar.length !== 0) {
      data.car = bookedTeacherWithCar[0].car._id.toString();
    }

    // trường hợp chưa có giáo viên nào được book cùng với ô tô
    if (bookedTeacherWithCar.length === 0) {
      const allCar = await Car.find();
      //! lấy ra tất cả ô tô đi cùng với giáo viên trong một ngày
      const countCar = await Booking.aggregate([
        {
          $match: { date: { $eq: req.body.date } }
        }
      ]);

      let availableCar = [];
      if (countCar.length > 0) {
        const bookedCar = new Set(
          countCar.map(item => item.car._id.toString())
        );

        allCar.forEach(car => {
          if (![...Array.from(bookedCar)].includes(car._id.toString())) {
            if (car.status === 'available') {
              availableCar.push(car);
            }
          }
        });
      } else {
        availableCar = [...allCar];
      }

      data.car = availableCar[0]._id.toString();
    }

    const bookingCourse = await Booking.create(data);

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
    const absentTeacher = await Absent.find({
      dateAbsent: currentDate,
      isAccepted: true
    });

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
      for (let i = 0; i < allTeacher.length; i++) {
        // trường hợp những giáo viên chưa được booking
        if (
          !bookedStats
            .map(bookedStat => bookedStat._id.toString())
            .includes(allTeacher[i]._id.toString())
        ) {
          teachers.push(allTeacher[i]);
        }

        // trường hợp những giáo viên còn trống slot chưa book
        if (
          bookedStats[i] ? bookedStats[i]?.numSlots < allSlot.length : false
        ) {
          const teacher = await User.find({
            _id: bookedStats[i]._id.toString()
          });
          teachers.push(teacher[0]);
        }
      }
    }

    //! trừ ra những giáo viên vắng trong ngày
    let availableTeacher = [];
    if (absentTeacher.length > 0) {
      availableTeacher = allTeacher.filter(
        teacher =>
          teacher._id.toString() !== absentTeacher[0].teacher._id.toString()
      );
    } else {
      availableTeacher = [...allTeacher];
    }

    res.status(200).json({
      status: 'success',
      availableTeacher
    });
  } catch (error) {
    next(error);
  }
};

exports.changeBookingSchedule = async (req, res, next) => {
  try {
    const numBookedByDate = await Booking.find({ date: req.body.dateAbsent });

    //! trường hợp đã có học sinh book giáo viên trong ngày
    //! dời lịch cho học sinh
    if (numBookedByDate.length) {
      console.log('co book roi a');
    }
  } catch (error) {
    next(error);
  }
};
