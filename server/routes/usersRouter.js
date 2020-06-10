var express = require('express');
var usersRouter = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
4
const Users = require('../models/users');

usersRouter.use(bodyParser.json());

usersRouter.route('/')
.get((req, res, next) => {
  Users.find(req.query)
  .then((users) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(users);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(function(req, res, next) {
  Users.create(req.body)
  .then((user) => {
    console.log("User created ",user);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.put(function(req, res) {
  res.statusCode = 403;
  res.send('Not Supported');
})
.delete(function(req, res, next) {
  Users.remove({})
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

usersRouter.route('/:userId')
.get((req, res, next) => {
  Users.findById(req.params.userId)
  .then((user) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));
})
.post(function(req, res, next) {
  res.statusCode = 403;
  res.end("POST operation not supported")
})
.put(function(req, res) {
  Users.findByIdAndUpdate(req.params.userId, 
      {$set: req.body}, 
      {new: true})
    .then((user) => {
      res.statusCode = 200;
      res.setHeader("Content-Type", "application/json");
      res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(function(req, res, next) {
  Users.findByIdAndRemove(req.params.userId)
  .then((resp) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json(resp);
  }, (err) => next(err))
  .catch((err) => next(err));
});

module.exports = usersRouter;
