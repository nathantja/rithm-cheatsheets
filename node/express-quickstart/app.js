"use strict";

const express = require("express");
const app = express();

const { NotFoundError } = require("./expressError"); // add remove as needed

const newRoutes = require("./newRoutes");

app.use(express.json()); // process JSON data
app.use(express.urlencoded()); // process traditional form data


app.use("/new", newRoutes);
// ... your routes go here ...












/** 404 handler: matches unmatched routes; raises NotFoundError. */
app.use(function (req, res) {
  throw new NotFoundError();
});


/** Error handler: logs stacktrace and returns JSON error message. */
app.use(function (err, req, res, next) {
  const status = err.status || 500;
  const message = err.message;
  if (process.env.NODE_ENV !== "test") console.error(status, err.stack);
  return res.status(status).json({ error: { message, status } });
});

module.exports = app;