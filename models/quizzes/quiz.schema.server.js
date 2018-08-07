const mongoose = require('mongoose')
module.exports = mongoose.Schema({
  title: {type: String},
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'QuestionModel'
  }]
}, {collection: 'quiz'});
