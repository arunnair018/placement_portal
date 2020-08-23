"use strict";

const mongoose = require("mongoose");
const Interview = mongoose.model("Interview");

module.exports.listbyCompany = (req, res) => {
  var filter = req.params.name;
  if (filter === "all") {
    Interview.aggregate(
      [
        {
          $match: {},
        },
        { $sort: { createdAt: -1 } },
      ],
      (err, companies) => {
        if (err) {
          res.json(err);
        } else {
          res.json(companies);
        }
      }
    );
  } else {
    Interview.aggregate(
      [
        {
          $match: { company: filter },
        },
        { $sort: { createdAt: -1 } },
      ],
      (err, companies) => {
        if (err) {
          res.json(err);
        } else {
          res.json(companies);
        }
      }
    );
  }
};

module.exports.listbyStudent = (req, res) => {
  var filter = req.params.name;
  Interview.aggregate(
    [
      {
        $match: { student: filter },
      },
      { $sort: { company: 1 } },
    ],
    (err, companies) => {
      if (err) {
        res.json(err);
      } else {
        res.json(companies);
      }
    }
  );
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
  var id = req.params.name;
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

module.exports.purge = (res, name) => {
  var query = { company: name };
  Interview.updateMany(query, { $set: { isActive: false } }, (err, doc) => {
    if (err) {
      res.json(err);
    }
    res.json(doc);
  });
};
