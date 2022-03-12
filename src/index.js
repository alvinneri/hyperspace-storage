/**
 * Main application file
 */
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import http from "http";
import cors from "cors";
import config from "./config";
// const cors = require("cors");
console.log(config);
// Connect to MongoDB
mongoose.connect(config.mongo.uri).then(() => console.log("mongodb connected"));
mongoose.connection.on("error", function (err) {
  console.error("MongoDB connection error: " + err);
  process.exit(-1);
});

// Setup server
const app = express();
app.use(cors());
const server = http.createServer(app);
require("./routes").default(app);
server.listen(config.port, () =>
  console.log(`The server is listening on port ${config.port}`)
);
