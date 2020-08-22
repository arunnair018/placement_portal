const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const User = require("./src/models/UserModel");
const Company = require("./src/models/CompanyModel");
const Interview = require("./src/models/InterviewModel");

const app = express();
const port = process.env.PORT || 5000;

const routes = require("./src/routes");
const db = require("./src/utils/MongoConfig");
require("dotenv").config();
app.use(morgan("tiny"));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

db.connect();

// Serve static files from the React app

app.use(express.static(path.join(__dirname, "build")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

routes(app);

//server listening on localhost port 3000
app.listen(port, () => {
  console.log(`server started, listening at port ${port}`);
});
