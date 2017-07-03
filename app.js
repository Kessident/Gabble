const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const routes = require("./routes");

//Express App Initialization
const app = express();

//Public Directory Setup
app.use("/public", express.static("public"));

//Mustache View Engine
app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");

//Body Parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(expressValidator());

//Express Session Initialization
app.use(session({
  secret: "aarvg#hma3r 3 df %$^Twtahgystfg ",
  resave: false,
  saveUninitialized: false
}));

app.use(routes);

app.listen(3000, function() {
  console.log("server running on localhost:3000");
});