"use strict";

const axios = require("axios");

module.exports.pushtoSlack = (msg) => {
  axios({
    method: "POST",
    url:
      "https://hooks.slack.com/services/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",
    data: {
      text: msg,
    },
  })
    .then((res) => {
      console.log("posted to slack...");
    })
    .catch((err) => {
      console.log(err);
    });
};
