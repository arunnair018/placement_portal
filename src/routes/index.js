"use strict";

const user = require("../controller/UserController");
const company = require("../controller/CompanyContoller");
const interview = require("../controller/InterviewController");
const authMentor = require("../middlewares/authMentor");
const authStudent = require("../middlewares/authStudent");
const authAdmin = require("../middlewares/authAdmin");

module.exports = (app) => {
  // auth api's
  app.route("/login").post(user.login);
  app.route("/register").post(user.register);

  // company api's
  app
    .route("/company")
    .get(company.list)
    .post(authMentor, company.add)
    .put(authMentor, company.update)
    .delete(authMentor, company.delete);

  // interview api's
  app.route("interview/list").post(interview.list);
  app
    .route("/interview")
    .post(authStudent, interview.add)
    .put(authStudent, interview.update)
    .delete(authAdmin, interview.delete);
};
