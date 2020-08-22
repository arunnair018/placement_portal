"use strict";

const mongoose = require("mongoose");

// User Schema
const companySchema = mongoose.Schema({
  name: {
    required: true,
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
  lookouts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

companySchema.set("timestamps", true);

// model the schema
const Company = mongoose.model("Company", companySchema);

module.exports = Company;
