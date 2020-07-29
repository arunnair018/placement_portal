"use strict";

const mongoose = require("mongoose");
const Company = mongoose.model("Company");

module.exports.list = (req, res) => {
  var company = req.body.company;
  if (company.length == 0) {
    Company.find({}, (err, companies) => {
      if (err) {
        res.json(err);
      } else {
        res.json(companies);
      }
    });
  } else {
    Company.find({ name: company }, (err, companies) => {
      if (err) {
        res.json(err);
      } else {
        res.json(companies);
      }
    });
  }
};

module.exports.add = (req, res) => {
  var new_company = new Company(req.body);
  new_company.save((err, company) => {
    if (err) {
      res.json(err);
    } else {
      res.json(company);
    }
  });
};

module.exports.update = (req, res) => {
  var name = req.body.name;
  var update = req.body;
  Company.findOneAndUpdate(
    { name: name },
    update,
    { new: true },
    (err, company) => {
      if (err) {
        res.json(err);
      } else {
        res.json(company);
      }
    }
  );
};

module.exports.delete = (req, res) => {
  var name = req.body.name;
  Company.deleteOne({ name: name }, (err, company) => {
    if (err) {
      res.json(err);
    } else {
      res.json(company);
    }
  });
};
