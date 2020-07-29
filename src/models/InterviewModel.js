"use strict";

const mongoose = require("mongoose");
const User = require("./CompanyModel");
const Company = require("./CompanyModel");

// User Schema
const interviewSchema = mongoose.Schema({
  student_name: {
    type: String,
  },
  company_name: {
    type: String,
  },
  status: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  assignment: {
    type: String,
    default: "none",
  },
  date: {
    type: String,
  },
});

interviewSchema.pre("save", async function (next) {
  const interview = this;
  const date = new Date();
  interview.date =
    date.getDate() +
    "-" +
    parseInt(date.getMonth() + 1) +
    "-" +
    date.getFullYear();
  next(); // call the next middleware
});

// model the schema
const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
