const express = require("express");
const mustacheExpress = require("mustache-express");
const bodyParser = require("body-parser");
const expressValidator = require("express-validator");
const session = require("express-session");
const path = require("path");
const morgan = require("morgan");
const routes = require("./routes/routes.js");

//Express App Initialization
const app = express();
//Public Directory Setup
app.use("/public", express.static(path.join(__dirname, "public")));
//Mustache View Engine
app.engine("mustache", mustacheExpress());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "mustache");
app.set("layout", "layout");
//Body Parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(expressValidator());
//Express Session Initialization
app.use(session({
  secret: "475@&623*rweu@*TDY#^$645CJHFGBNMV",
  resave: false,
  saveUninitialized: false
}));

//Logger
app.use(morgan("dev"));

//Port setup
app.set('port', (process.env.PORT || 3000));

app.use(routes);

app.listen(app.get('port'), function () {
  console.log("server running on localhost:" + app.get('port'));
});
