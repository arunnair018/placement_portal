"use strict";

const mongoose = require("mongoose");

module.exports.connect = () => {
  console.log("connecting to DB...");
  const url = process.env.DB_URL;
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
    })
    .then((res) => console.log("Database connected..."))
    .catch((err) => console.log(err));
};
