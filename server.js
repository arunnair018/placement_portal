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

app.use(morgan("tiny"));
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

db.connect();

routes(app);

app.get("/", (req, res) => {
  res.send("hello world");
});

// Serve static files from the React app
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}

//server listening on localhost port 3000
app.listen(port, () => {
  console.log(`server started, listening at port ${port}`);
});
