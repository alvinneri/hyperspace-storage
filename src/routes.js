/**
 * Main application routes
 */

"use strict";

export default function (app) {
  // Insert routes below
  app.use("/api/users", require("./api/user"));
}
