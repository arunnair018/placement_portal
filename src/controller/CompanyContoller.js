"use strict";

const mongoose = require("mongoose");
const Company = mongoose.model("Company");
const Interview = require("./InterviewController");

module.exports.listall = (req, res) => {
  if (req.user.role === "student") {
    Company.aggregate(
      [
        {
          $match: {
            lookouts: { $in: [mongoose.Types.ObjectId(req.user._id)] },
          },
        },
        {
          $lookup: {
            from: "interviews",
            localField: "name",
            foreignField: "company",
            as: "interviews",
          },
        },
        { $addFields: { interview: "$interviews.student" } },
        { $project: { interviews: 0 } },
        { $match: { interview: { $ne: req.user.username }, isActive: true } },
        { $sort: { createdAt: -1 } },
      ],
      (err, comp) => {
        if (err) {
          res.json(err);
        }
        res.json(comp);
      }
    );
  } else {
    Company.aggregate(
      [
        {
          $match: {},
        },
        { $sort: { createdAt: -1 } },
      ],
      (err, companies) => {
        if (err) {
          res.json(err);
        }
        res.json(companies);
      }
    );
  }
};

module.exports.list = (req, res) => {
  Company.find({}, (err, companies) => {
    if (err) {
      res.json(err);
    } else {
      res.json(companies);
    }
  });
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
  var name = req.params.name.toLowerCase();
  var update = req.body;
  console.log(name);
  Company.findOneAndUpdate(
    { name: name },
    update,
    { new: true },
    (err, interview) => {
      if (err) {
        res.json(err);
      } else {
        Interview.purge(res, name);
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
