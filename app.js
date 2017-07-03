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

//Logger
app.use(morgan("dev"));

const pg = require('pg');

pg.defaults.ssl = true;
pg.connect(process.env.DATABASE_URL, function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

app.use(routes);

app.set('port', (process.env.PORT || 5000));
app.listen(app.get('port'), function() {
  console.log("server running on port " + app.get('port'));
});
