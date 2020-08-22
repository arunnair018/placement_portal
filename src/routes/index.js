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
  app.route("/users").post(user.register).get(user.list);

  // company api's
  app
    .route("/company")
    .get(authStudent, company.listall)
    .post(authMentor, company.add);
  app
    .route("/company/:name")
    .get(authStudent, company.list)
    .put(authMentor, company.update)
    .delete(authMentor, company.delete);

  // interview api's
  app.route("/interview/student/:name").post(interview.listbyStudent);
  app.route("/interview").post(authStudent, interview.add);
  app
    .route("/interview/company/:name")
    .post(interview.listbyCompany)
    .put(authStudent, interview.update)
    .delete(authAdmin, interview.delete);
};
