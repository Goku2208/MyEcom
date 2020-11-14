const express = require("express");
const router = express.Router();

const { create } = require("../controller/product");
const { auth, isAuth, isAdmin } = require("../controller/auth");
const { userById } = require("../controller/user");

router.post(
  "/product/create/:userById",
  auth,
  isAuth,
  isAdmin,
  create,
  (req, res) => {
    res.json({
      user: req.profile,
    });
  }
);
router.param("userById", userById);
module.exports = router;
