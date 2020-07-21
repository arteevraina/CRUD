const express = require("express");
const Users = require("../models/Users");
const usersRoutes = express.Router();

usersRoutes
  .get("/", (req, res, next) => {
    Users.find({})
      .then(
        () => {
          res.statusCode = 200;
          res.render("index.ejs");
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  })
  .post("/", (req, res, next) => {
    // console.log(req.body.avatarUrl);
    Users.create(req.body)
      .then(
        () => {
          res.statusCode = 200;
          res.render("index.ejs");
        },
        (err) => next(err)
      )
      .catch((err) => next(err));
  });

usersRoutes.get("/users", (req, res, next) => {
  Users.find({})
    .then(
      (users) => {
        res.statusCode = 200;
        res.render("users.ejs", { Users: users });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

usersRoutes.get("/delete/:id", (req, res, next) => {
  var id = req.params.id;
  var del = Users.findByIdAndDelete(id);
  del
    .then(
      () => {
        res.statusCode = 200;
        res.redirect("/");
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

usersRoutes.get("/edit/:id", (req, res, next) => {
  var id = req.params.id;
  Users.findById(id)
    .then(
      (users) => {
        res.statusCode = 200;
        res.render("edit", { Users: users });
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

usersRoutes.post("/update/", (req, res, next) => {
  var update = Users.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
  });

  //   console.log(update);
  update
    .then(
      () => {
        res.statusCode = 200;
        res.redirect("/");
      },
      (err) => next(err)
    )
    .catch((err) => next(err));
});

module.exports = usersRoutes;
