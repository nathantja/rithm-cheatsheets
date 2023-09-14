"use strict";

const { Client } = require("pg");

const DB_URI = process.env.NODE_ENV === "test"
  ? "postgresql:///simple_users_test" // change
  : "postgresql:///simple_users"; // change

let db = new Client({
  connectionString: DB_URI
});

db.connect();

module.exports = db;