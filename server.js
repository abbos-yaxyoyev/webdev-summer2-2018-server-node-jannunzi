var express = require('express')
var app = express()
var session = require('express-session')
var bodyParser = require('body-parser')

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:4200");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'any string'
}));


setSession = (req, res) => {
  var n = req.params['name'];
  var v = req.params['value'];
  req.session[n] = v;
  res.send(req.session);
}

getSession = (req, res) => {
  var n = req.params['name'];
  var v = req.session[n];
  res.send(v);
}

login = (req, res) => {
  var user = req.body;
  userModel.findOne({username: user.username, password: user.password})
    .then(user => {
      req.session['currentUser'] = user;
      res.send(req.session);
    })
}

app.post('/login', login);

currentUser = (req, res) => {
  res.send(req.session);
}
app.get('/currentUser', currentUser);


app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name',  getSession);




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