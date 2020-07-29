"use strict";

const mongoose = require("mongoose");

// User Schema
const companySchema = mongoose.Schema({
  name: {
    unique: true,
    type: String,
    required: true,
    trim: true,
  },
  jd: {
    type: String,
    trim: true,
  },
  location: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  date: {
    type: String,
  },
});

companySchema.pre("save", async function (next) {
  const company = this;
  const date = new Date();
  company.date =
    date.getDate() +
    "-" +
    parseInt(date.getMonth() + 1) +
    "-" +
    date.getFullYear();
  next(); // call the next middleware
});

// model the schema
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
