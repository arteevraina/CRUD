const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Users = require("./models/Users");
const app = express();

const portNumber = process.env.PORT || 3000;
const url =
  "mongodb+srv://admin:admin@cluster0-ree5g.mongodb.net/crud?retryWrites=true&w=majority";

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
});

connect.then(
  (db) => {
    console.log("Connected correctly to Server");
  },
  (err) => console.log(err)
);

app.use(express.static("public"));

app.listen(portNumber, function () {
  console.log(`Connected to localhost: ${portNumber}`);
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Users.find({}).exec((err, users) => {
    if (err) throw err;
    res.render("index.ejs", { Users: users });
  });
});

app.post("/", (req, res, next) => {
  var userDetails = new Users({
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
  });
  //console.log(userDetails);
  userDetails.save((err, resp) => {
    Users.find({}).exec((err, users) => {
      if (err) throw err;
      res.render("index.ejs", { Users: users });
    });
  });
});

app.get("/delete/:id", (req, res, next) => {
  var id = req.params.id;
  var del = Users.findByIdAndDelete(id);
  del.exec((err) => {
    if (err) throw err;
    res.redirect("/");
  });
});

app.get("/edit/:id", (req, res, next) => {
  var id = req.params.id;
  var edit = Users.findById(id);
  edit.exec((err, users) => {
    if (err) throw err;
    res.render("edit", { Users: users });
  });
});

app.post("/update/", (req, res, next) => {
  var update = Users.findByIdAndUpdate(req.body.id, {
    name: req.body.name,
    email: req.body.email,
    contact: req.body.contact,
  });

  console.log(update);
  update.exec((err, users) => {
    if (err) throw err;
    res.redirect("/");
  });
});
