const Profile = require("../models/profile");

exports.userById = (req, res, next, id) => {
  console.log("this is execute");
  Profile.findById(id).exec((Err, user) => {
    if (Err || !user) {
      return res.status(400).json({
        error: "user not found",
      });
    }

    req.profile = user;
    next();
  });
};
