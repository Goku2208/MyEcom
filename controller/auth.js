const Profile = require("../models/profile");
const jwt = require("jsonwebtoken"); // to generate signed token
const expressJwt = require("express-jwt"); // for authorization check
const { errorHandler } = require("../helpers/dbErrorHandler");

exports.signup = (req, res) => {
  // console.log("req.body", req.body);
  const profile = new Profile(req.body);
  profile.save((errors, profile) => {
    if (errors) {
      return res.status(400).json({
        err: errorHandler(errors),
      });
    }
    profile.salt = undefined;
    profile.hashed_password = undefined;
    res.json({
      profile,
    });
  });
};

exports.signin = (req, res) => {
  // find user based on eamil
  const { email, password } = req.body;
  Profile.findOne({ email }, (err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: " Usernwith that email doesnt exist",
      });
    }
    // if user found make sure the and password match
    // create authenticate method in profile model
    if (!user.authenticate(password)) {
      return res.status(401).json({ error: `Email and password dont match` });
    }
    //generate a signed token with user id and secret
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
    //persist the token as 't' in cookie with expiry date
    res.cookie("t", token, { expire: new Date() + 9999 }); //9999 secs
    //return response with user and token to frontend client
    const { _id, name, email, role } = user;
    res.cookie("id", user._id, { expire: new Date() + 9999 }); //9999 secs

    return res.json({ token, user: { _id, email, name, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("t");
  res.json({ message: "signout success" });
};

// exports.checksSignin = expressJwt({
//   // secret: process.env.JWT_SECRET,
//   // userProperty: "auth",
// });

exports.auth = (req, res, next) => {
  if (!req.cookies.t) {
    res.json({ message: "you dont have acces to this page" });
  }
  next();
};

exports.isAuth = (req, res, next) => {
  req.auth = req.cookies.id;
  let user = req.profile && req.auth && req.profile._id == req.auth;
  if (!user) {
    return res.status(403).json({
      error: "Access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Admin resource! Acess denied",
    });
  }

  next();
};
