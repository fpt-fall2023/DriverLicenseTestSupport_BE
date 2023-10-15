const factory = require('./hanlderFactory');
const questionBankModel = require('../models/questionBankModel');

exports.createQuestionBank = factory.createOne(questionBankModel);
exports.deleteQuestionBank = factory.deleteOne(questionBankModel);
exports.updateQuestionBank = factory.UpdateOne(questionBankModel);
exports.getQuestionBank = factory.findOne(questionBankModel);

exports.getAllQuestionBank = async (req, res, next) => {
    try {
        const data = await questionBankModel.find({});

        res.status(200).json({
            status: 'success',
            data
        })
    } catch (error) {
        next(error)
    }
}
