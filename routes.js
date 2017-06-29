const express = require("express");
const router = express.Router();
const models = require("./models");
let errorMsg;

router.get("/",function (req,res) {
  if (req.session.username){
    res.render("index", {username:req.session.username});
  } else {
    res.redirect("/login");
  }
});

router.get("/login",function (req,res) {
  if (errorMsg){
    res.render("login", errorMsg);
  } else {
    res.render("login");
  }
});

router.post("/login",function (req,res) {
  errorMsg = {};
  models.users.findOne({
    where:{
      username: req.body.username,
      password: req.body.password
    }
  }).then(function (user) {
    if (user){
      req.session.username = user.username;
      req.session.id = user.id;
      res.redirect("/");
    } else {
      errorMsg = {msg:"Invalid username and password"};
      res.redirect("/login");
    }
  });
  // TODO: Validation
});

router.get("/signup",function (req,res) {
  res.render("signup");
});

router.post("/signup",function (req,res) {
  let newUser = {
    username: req.body.username,
    password : req.body.password
  };

  models.users.create(newUser).then(function () {
    res.redirect("/login");
  });
});

router.get("/logout", function (req,res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
