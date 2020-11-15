const express = require("express");
const router = express.Router();

const { auth, isAuth, isAdmin } = require("../controller/auth");

const { userById, read, update } = require("../controller/user");

router.get("/secret/:userById", auth, isAuth, (req, res) => {
  res.json({
    user: req.profile,
  });
});

router.get("/user/:userId", auth, isAuth, read);
router.put("/user/:userId", auth, isAuth, update);

router.param("userById", userById);
module.exports = router;
