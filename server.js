//Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var db = require("./models");

// Sets up the Express App
var app = express();
var PORT = process.env.PORT || 8080;

//Set Handlebars
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//Set Routes - STILL HAVE TO UPDATE ROUTE FILE NAME
// var routes = require("./controllers/"RouteFileName".js");

// Starts the server to begin listening
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
      console.log("App listening on PORT " + PORT);
    });
  });