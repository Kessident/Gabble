const express = require("express");
const router = express.Router();
const models = require("./models");
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
    let editGabs = formatTime(gabs);
    res.render("index", {username: req.session.username, gabs: editGabs});
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
    console.log(errors);
  }

  models.users.findOne({
    where: {
      username: req.body.username,
      password: req.body.password
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
  let errors = req.validationErrors();
  if (errors) {
    errors.forEach(function(error) {
      errorMsg.push(error.msg);
    });
    res.redirect("/signup");

  } else {
    let newUser = {
      username: req.body.username,
      password: req.body.password
    };

    //Check if user already exists
    models.users.findOne({
      where: {
        username: newUser.username
      }
    }).then(function(user) {
      if (!user) {
        models.users.create(newUser).then(function() {
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
      res.render("message", {
        username: req.session.username,
        msg: msg,
        likes: likes
      });
    });
  });
});

function resetMonth(month){
  switch (month){
    case 1:
    month = "January";
    break;
    case 2:
    month = "February";
    break;
    case 3:
    month = "March";
    break;
    case 4:
    month = "April";
    break;
    case 5:
    month = "May";
    break;
    case 6:
    month = "June";
    break;
    case 7:
    month = "July";
    break;
    case 8:
    month = "August";
    break;
    case 9:
    month = "September";
    break;
    case 10:
    month = "October";
    break;
    case 11:
    month = "November";
    break;
    case 12:
    month = "December";
    break;
  }
  return month;
}

function formatTime(gabs){
  let gabList = [];
  gabs.forEach(function (gab) {
    let date = new Date(gab.createdBy.createdAt),
    month = date.getMonth(),
    day = date.getDate(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes();

    month = resetMonth(month);

    if (hours < 10)
    {hours = "0" + hours;}
    if (minutes < 10)
    {minutes = "0" + minutes;}
    let time = hours + ":" + minutes;

    let newGab = {
      month: month,
      day: day,
      year: year,
      time: time,
      username: gab.createdBy.username,
      id:gab.id,
      // userId:gab.createdBy.id,
      body:gab.body,
      likes:gab.likedBy.length
    };
    gabList.push(newGab);
  });
  return gabList;
}
module.exports = router;
