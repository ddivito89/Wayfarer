var db = require("../models");
var passport = require("../config/passport");

var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app, io) {

  app.get("/api/users", function(req, res) {
    db.User.findAll({}).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/users", function(req, res) {
    db.User.create(req.body).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  app.post("/api/comments", function(req, res) {
    console.log(req.body);
    req.body.user_id = req.user.id;
    console.log(req.body);
    db.comments.create(req.body).then(function(dbComment) {
      res.json(dbComment);
      io.emit('newComment',dbComment)
    });
  });

  app.get("/api/comments/", function(req, res) {
    db.comments.findAll({order: [
    ['createdAt', 'ASC']
  ]}).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  app.post("/api/posts", function(req, res) {
    console.log(req.body);
    req.body.user_id = req.user.id;
    console.log(req.body);

    db.Post.create(req.body).then(function(dbPost) {
      // res.json(dbPost);
      res.json(dbPost);
      io.emit('newPost',dbPost.id)
    });
  });

  app.get("/api/posts", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  app.get("/api/posts/:id", function(req, res) {
    db.Post.findOne({where:{id:req.params.id}}).then(function(dbPost) {
      res.json(dbPost);
    });

  });

  //AUTHENTICATION ROUTES!
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    // Since we're doing a POST with javascript, we can't actually redirect that post into a GET request
    // So we're sending the user back the route to the members page because the redirect will happen on the front end
    // They won't get this or even be able to access this page if they aren't authed
    res.json("/map");
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error
  app.post("/api/signup", function(req, res) {
    console.log(req.body);
    db.User.create({
      email: req.body.email,
      password: req.body.password
    }).then(function() {
      res.redirect(307, "/api/login");
    }).catch(function(err) {
      console.log(err);
      res.status(422).json(err.errors[0].message);
    });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/map");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {

    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({email: req.user.email, id: req.user.id});
    }
  });

  io.on('connection', (socket) => {

    console.log('New User Connected');

    socket.on('disconnect', () => {
      console.log('user was disconnected');
    });

  });

}
