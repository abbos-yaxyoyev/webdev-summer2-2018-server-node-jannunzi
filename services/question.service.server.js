module.exports = app => {
  const questionModel = require('../models/quizzes/question.model.server')

  createQuestion = (req, res) =>
    questionModel
      .createQuestion(req.body)
      .then(
        question => res.json(question),
        error => res.send(error)
      )

  app.post('/api/question', createQuestion)
}