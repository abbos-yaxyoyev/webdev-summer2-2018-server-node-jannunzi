var express = require('express')
var app = express()

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/webdev-summer2-2018');

var userSchema = mongoose.Schema({
  username: String,
  password: String,
  firstName: String,
  lastName: String
}, {collection: 'user'});

var userModel = mongoose.model('UserModel', userSchema);

app.get('/api/user', findAllUsers);

function findAllUsers(req, res) {
  userModel.find()
    .then(users => {
      res.send(users);
    })
    // .then(function(users){
    //   res.send(users);
    // })
}

app.get('/hello', function (req, res) {
  res.send({message: 'hello world'})
})

app.listen(3000)