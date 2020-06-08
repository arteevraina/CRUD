var express = require('express');
var usersRouter = express.Router();
const bodyParser = require('body-parser');

usersRouter.use(bodyParser.json());

usersRouter.route('/')
.get(function(req, res) {
  res.statusCode = 200;
  res.send('Getting Users');
})
.post(function(req, res) {
  res.statusCode = 200;
  res.send('Posting Users');
})
.put(function(req, res) {
  res.statusCode = 200;
  res.send('Updating Users');
})
.delete(function(req, res) {
  res.statusCode = 200;
  res.send('Deleting Users');
})

module.exports = usersRouter;
