"use strict";

const mongoose = require("mongoose");
const Interview = mongoose.model("Interview");

module.exports.list = (req, res) => {
  var filter = req.body;
  Company.find(filter, (err, companies) => {
    if (err) {
      res.json(err);
    } else {
      res.json(companies);
    }
  });
};

module.exports.add = (req, res) => {
  var new_interview = new Interview(req.body);
  new_interview.save((err, interview) => {
    if (err) {
      res.json(err);
    } else {
      res.json(interview);
    }
  });
};

module.exports.update = (req, res) => {
  var id = req.body.id;
  var update = req.body;
  Interview.findOneAndUpdate(
    { _id: id },
    update,
    { new: true },
    (err, interview) => {
      if (err) {
        res.json(err);
      } else {
        res.json(interview);
      }
    }
  );
};

module.exports.delete = (req, res) => {
  var id = req.body.id;
  Interview.deleteOne({ _id: id }, (err, interview) => {
    if (err) {
      res.json(err);
    } else {
      res.json(interview);
    }
  });
};
