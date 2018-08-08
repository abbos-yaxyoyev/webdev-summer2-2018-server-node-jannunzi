const mongoose = require('mongoose')
module.exports = mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel'
  },
  quiz: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuizModel'
  },
  answers: [{
    fillBlanksAnswers: {
      variable: String,
      value: String
    },
      multipleChoiceAnswer: Number,
    trueFalseAnswer: Boolean,
    essayAnswer: String,
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'QuestionModel'
    }
  }]
}, {collection: 'submission'})