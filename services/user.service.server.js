module.exports = app => {

  const userModel = require('../models/user/user.model.server');

  findAllUsers = (req, res) =>
    userModel.findAllUsers()
      .then(users => {
        res.send(users);
      });

  login = (req, res) => {
    const user = req.body;
    userModel.findUserByCredentials(user.username, user.password)
      .then(user => {
        req.session['currentUser'] = user;
        res.send(req.session);
      });
  };

  currentUser = (req, res) =>
    res.send(req.session['currentUser']);

  app.get ('/currentUser', currentUser);
  app.get ('/api/user', findAllUsers);
  app.post('/login', login);
};