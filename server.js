// Requiring necessary npm packages
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");

// Requiring passport as we've configured it
var passport = require("./config/passport");
//socket io requirements
const socketIO = require('socket.io');
const http = require('http');

// Setting up port and requiring models for syncing
var PORT = process.env.PORT || 8080;
var db = require("./models");

// Creating express app and configuring middleware needed for authentication
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.use(session({secret: "keyboard cat", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());


require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app, io);




// Starts the server to begin listening
db.sequelize.sync().then(function() {
  server.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
