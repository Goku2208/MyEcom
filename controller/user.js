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

exports.read = (req, res) => {
  req.profile.hashed_password = undefined;
  req.profile.salt = unefined;
  return res.json(req.profile);
};

exports.update = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.profile._id },
    { $set: req.bdoy },
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(400).json({
          error: "Your are not authorized to perform this opertaion",
        });
      }
      user.hashed_password = undefined;
      user.salt = unefined;
      res.json(user);
    }
  );
};
