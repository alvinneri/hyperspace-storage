"use strict";

require("dotenv/config");

var _express = _interopRequireDefault(require("express"));

var _mongoose = _interopRequireDefault(require("mongoose"));

var _http = _interopRequireDefault(require("http"));

var _cors = _interopRequireDefault(require("cors"));

var _config2 = _interopRequireDefault(require("./src/config"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Main application file
 */
// const cors = require("cors");
console.log(_config2["default"]); // Connect to MongoDB

_mongoose["default"].connect(_config2["default"].mongo.uri, _config2["default"].mongo.options).then(function () {
  return console.log("mongodb connected");
});

_mongoose["default"].connection.on("error", function (err) {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
}); // Setup server


var app = (0, _express["default"])();
app.use((0, _cors["default"])());

var server = _http["default"].createServer(app);

server.listen(_config2["default"].port, function () {
  return console.log("The server is listening on port ".concat(port));
});