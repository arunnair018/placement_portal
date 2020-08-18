"use strict";

const mongoose = require("mongoose");
const Company = mongoose.model("Company");

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
        { $match: { interview: { $ne: req.user.username } } },
      ],
      (err, comp) => {
        if (err) {
          res.json(err);
        }
        res.json(comp);
      }
    );
  } else {
    Company.find({}, (err, companies) => {
      if (err) {
        res.json(err);
      }
      res.json(companies);
    });
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
