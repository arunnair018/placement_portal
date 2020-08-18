"use strict";

const mongoose = require("mongoose");
const User = require("./CompanyModel");
const Company = require("./CompanyModel");

// User Schema
const interviewSchema = mongoose.Schema({
  student: {
    type: String,
  },
  company: {
    type: String,
  },
  status: {
    type: Number,
    default: 0,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  assignment: {
    type: String,
    default: "none",
  },
});

interviewSchema.set("timestamps", true);

// model the schema
const Interview = mongoose.model("Interview", interviewSchema);

module.exports = Interview;
