const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var validator = require("validator");

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: [validator.isEmail, "invalid Email"],
      unique: true,
    },
    contact: {
      type: Number,
      required: true,
      unique: true,
    },
    avatarUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

var Users = mongoose.model("User", usersSchema);

module.exports = Users;
