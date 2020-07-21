const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const usersRoutes = require("./routes/usersRoutes");

const portNumber = process.env.PORT || 3000;
const url = process.env.URL_MONGO_DB;

const connect = mongoose.connect(url, {
  useNewUrlParser: true,
});

connect
  .then(
    () => {
      console.log("Connected correctly to Server");
    },
    (err) => console.log(err)
  )
  .catch((err) => next(err));

app.use(express.static("public"));

app.listen(portNumber, function () {
  console.log(`Connected to localhost: ${portNumber}`);
});

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//  Mounting Routes
app.use("/", usersRoutes);

app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.statusCode = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.send("Not Found " + res.statusCode);
});
