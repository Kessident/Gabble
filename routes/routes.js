const express = require("express");
const router = express.Router();
const models = require("../models");
const func = require('../utils/functions.js');
let errorMsg = [];

const checkLogin = function(req, res, next) {
  if (req.session.username) {
    next();
  } else {
    if (req.url === "/login" || req.url === "/signup") {
      next();
    } else {
      res.redirect("/login");
    }
  }
};

router.use(checkLogin);

router.get("/", function(req, res) {
  models.messages.findAll({
    order: [
      ['createdAt', 'DESC']
    ],
    include: [{
        model: models.users,
        as: 'createdBy'
      },
      {
        model: models.likes,
        as: "likedBy"
      }
    ]
  }).then(function(gabs) {
    let editGabs = func.formatTime(gabs);
    res.render("index", {
      username: req.session.username,
      gabs: editGabs
    });
  });
});

router.get("/login", function(req, res) {
  if (!req.session.username) {
    res.render("login", {
      errMsgs: errorMsg
    });
  } else {
    res.redirect("/");
  }
});

router.post("/login", function(req, res) {
  errorMsg = [];
  req.checkBody("username", "Please enter a username").notEmpty();
  req.checkBody("password", "Please enter a password").notEmpty();
  req.checkBody("username", "Username must be at least 6 characters long").isLength({
    min: 6
  });
  req.checkBody("password", "Passwords must be at least 8 characters long").isLength({
    min: 8
  });

  let errors = req.validationErrors();
  if (errors) {
    errors.forEach(function(error) {
      errorMsg.push(error.msg);
    });
    res.redirect("/login");
  } else {
    let passHash = func.hash(req.body.password);
    models.users.findOne({
      where: {
        username: req.body.username,
        password: passHash
      }
    }).then(function(user) {
      if (user) {
        req.session.username = user.username;
        req.session.userId = user.id;
        res.redirect("/");
      } else {
        errorMsg.push("Invalid username and password");
        res.redirect("/login");
      }
    });
  }
});

router.get("/signup", function(req, res) {
  res.render("signup", {
    errMsgs: errorMsg
  });
});

router.post("/signup", function(req, res) {
  errorMsg = [];

  req.checkBody("username", "Username may not be longer than 20 characters").isLength({
    max: 20
  });
  req.checkBody("password", "Password must be at least 8 characters").isLength({
    min: 8
  });
  req.checkBody("passwordConfirm", "Passwords must match").equals(req.body.password);

  let errors = req.validationErrors();
  if (errors) {
    errors.forEach(function(error) {
      errorMsg.push(error.msg);
    });
    res.redirect("/signup");
  } else {
    let passHash = func.hash(req.body.password);
    let newUser = {
      username: req.body.username,
      password: passHash
    };

    //Check if user already exists
    models.users.findOne({
      where: {
        username: newUser.username
      }
    }).then(function(user) {
      if (!user) {
        models.users.create(newUser).then(function() {
          errorMsg.push("User created successfully");
          res.redirect("/login");
        });
      } else {
        errorMsg.push("User already exists");
        res.redirect("/login");
      }

    });
  }
});

router.get("/logout", function(req, res) {
  req.session.destroy();
  res.redirect("/");
});

router.get("/newgab", function(req, res) {
  res.render("newgab", {
    username: req.session.username
  });
});

router.post("/newgab", function(req, res) {
  let newGab = {
    body: req.body.newGab,
    userId: req.session.userId,
    createdBy: req.session.username
  };

  models.messages.create(newGab).then(function() {
    res.redirect("/");
  });
});

router.post("/delMsg", function(req, res) {
  models.likes.destroy({
    where: {
      messageId: req.body.id
    }
  }).then(function() {
    models.messages.destroy({
      where: {
        id: req.body.id
      }
    }).then(function(msg) {
      res.redirect("/");
    });
  });
});

router.post("/likeMsg", function(req, res) {
  let newLike = {
    userId: req.session.userId,
    messageId: req.body.id
  };
  models.likes.findOne({
    where: {
      userId: newLike.userId,
      messageId: newLike.messageId
    }
  }).then(function(like) {
    if (!like) {
      models.likes.create(newLike).then(function() {
        res.redirect("/");
      });
    } else {
      res.redirect("/");
    }
  });
});

router.get("/message/:id", function(req, res) {
  models.messages.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: models.users,
      as: "createdBy"
    }]
  }).then(function(msg) {
    models.likes.findAll({
      where: {
        messageId: req.params.id
      },
      include: [{
        model: models.users,
        as: "likedBy"
      }]
    }).then(function(likes) {
      let newGab = func.formatTime(msg);
      res.render("message", {
        username: req.session.username,
        msg: newGab,
        likes: likes
      });
    });
  });
});


module.exports = router;
