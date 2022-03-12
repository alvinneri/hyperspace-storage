"use strict";

var mongoose = require("mongoose");
var Schema = require("mongoose").Schema;

var UserSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
  },
  role: {
    type: String,
    default: "user",
  },
  password: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
