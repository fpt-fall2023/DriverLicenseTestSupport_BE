const factory = require('../controllers/hanlderFactory');
const ScheduleChangeNotice = require('../models/scheduleChangeNoticeModel');
const createError = require('http-errors');

exports.createScheduleChangeNotice = factory.createOne(ScheduleChangeNotice);
exports.deleteScheduleChangeNotice = factory.deleteOne(ScheduleChangeNotice);
exports.updateScheduleChangeNotice = factory.UpdateOne(ScheduleChangeNotice);
exports.findAllScheduleChangeNotice = factory.getAll(ScheduleChangeNotice);

exports.getAScheduleChangeNotice = async (req, res, next) => {
    try {
        const studentId = req.user._id;
        const scheduleChange = await ScheduleChangeNotice.findOne({ "students.student": studentId }).select('-__v');
        
        if(!scheduleChange) {
            throw createError.NotFound("Can not find any schedule change");
        }

        scheduleChange.students = scheduleChange.students.filter(item => 
            item.student._id.toString() === studentId.toString()
        )

        res.status(200).json({
            status: 'success',
            scheduleChange,
        })
    } catch (error) {
        next(error)
    }
}

exports.acceptScheduleChangeNotice = async (req, res, next) => {
    try {
        const studentId = req.user._id;
        const scheduleChangeId = req.params.id;

        // 1! find schedule change notice
        const scheduleChange = await ScheduleChangeNotice.findById(scheduleChangeId);

        if(!scheduleChange) {
            throw createError.NotFound("Can not find any schedule change");
        }

        // 2! update schedule change notice status
        scheduleChange.students = scheduleChange.students.map(item => {
            if(item.student._id.toString() === studentId.toString()) {
                item.response = 'accepted';
            }
            return item;
        })

        // 3! update schedule in database
        const updateSucess = await ScheduleChangeNotice.findByIdAndUpdate(scheduleChangeId, scheduleChange, {
            new: true,
            runValidators: true,
        })

        // 4! response only the student who accept the schedule change
        updateSucess.students = updateSucess.students.filter(item => 
            item.student._id.toString() === studentId.toString()
        )

        if(updateSucess) {
            console.log('create new booking')
        }

        res.status(200).json({
            status: 'success',
            updateSucess,
        })
    } catch (error) {
        next(error)
    }
}

exports.denyScheduleChangeNotice = async (req, res, next) => {
    try {
        const studentId = req.user._id;
        const scheduleChangeId = req.params.id;

        // 1! find schedule change notice
        const scheduleChange = await ScheduleChangeNotice.findById(scheduleChangeId);

        if(!scheduleChange) {
            throw createError.NotFound("Can not find any schedule change");
        }

        // 2! update schedule change notice status
        scheduleChange.students = scheduleChange.students.map(item => {
            if(item.student._id.toString() === studentId.toString()) {
                item.response = 'denied';
            }
            return item;
        })

        // 3! update schedule in database
        const updateSucess = await ScheduleChangeNotice.findByIdAndUpdate(scheduleChangeId, scheduleChange, {
            new: true,
            runValidators: true,
        })

         // 4! response only the student who accept the schedule change
        updateSucess.students = updateSucess.students.filter(item => 
            item.student._id.toString() === studentId.toString()
        )

        if(updateSucess) {
            console.log('delete booking')
        }

        res.status(200).json({
            status: 'success',
            updateSucess,
        })
    } catch (error) {
        next(error)
    }
}