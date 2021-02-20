"use strict";

const mongoose = require("mongoose");
const Company = mongoose.model("Company");
const Interview = require("./InterviewController");
const axios =require('axios')

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

module.exports.add = async (req, res) => {

  var company = await Company.create(req.body)
  if(!company) {
    console.log('failed to add company')
    res.json('failed to add company')
  }


  company = await Company.aggregate([
    {$match:{name:req.body.name}},
    {$lookup:{
      from:'users',
      localField:'lookouts',
      foreignField:'_id',
      as:'lookouts'
    }}
  ])

  company = company[0]
  var nameString;
  // make call to slack webhook
  console.log(company.lookouts)
  if (company.lookouts.length < 1) {
    nameString = "everyone";
  } else {
    let names = []
    company.lookouts.forEach(element => {
      names.push(element.username)
    });
    var nameString = names.join(", ");
  }

  console.log('names: ',nameString)
  console.log('webhook : ',process.env.SLACK_WEBHOOK)

  var message = `*Company name: _${company.name}_* \n\n Note: ${company.jd} \n\n Lookouts: ${nameString}`;
  var msg = JSON.stringify(
    { type: "mrkdwn", text: message },
    {
      type: "divider",
    }
  );
  var config = {
    method: "POST",
    url:process.env.SLACK_WEBHOOK,
    data: msg,
  };
  axios(config)
    .then(function (response) {
      console.log("sent to slack...");
    })
    .catch(function (error) {
      console.log(error);
    });

  res.json(company)
};

module.exports.update = (req, res) => {
  var name = req.params.name.toLowerCase();
  var update = req.body;
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
