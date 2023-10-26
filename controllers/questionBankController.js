const factory = require('./hanlderFactory');
const questionBankModel = require('../models/questionBankModel');
const createError = require('http-errors');

exports.createQuestionBank = factory.createOne(questionBankModel);
exports.deleteQuestionBank = factory.deleteOne(questionBankModel);
exports.updateQuestionBank = factory.UpdateOne(questionBankModel);
exports.getAllQuestionBank = factory.getAll(questionBankModel);

exports.getQuestionBank = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await questionBankModel.findById(id);

        if(!data) {
            throw createError.NotFound('can not find question bank with that Id');
        }

        const { _id, questionBankName, question } = data

        const randomQuestion = shuffleData(question);

        const newQuestion = randomQuestion?.map((item) => {
            const randomAns = shuffleData(item.answers);
            return {
                questionName: item.questionName,
                questionImage: item.questionImage,
                isDanger: item.isDanger,
                answers: randomAns,
                category: item.category,
                driveType: item.driveType
            }
        })

        res.status(200).json({
            status: 'success',
            newQuestion
        })
    } catch (error) {
        next(error)
    }
}

const shuffleData = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}