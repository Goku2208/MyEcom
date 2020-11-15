const express = require("express");
const router = express.Router();

const { auth, isAuth, isAdmin } = require("../controller/auth");

const { userById } = require("../controller/user");

router.get("/secret/:userById", auth, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});
router.param("userById", userById);
module.exports = router;
