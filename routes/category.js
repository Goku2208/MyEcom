const express = require("express");
const router = express.Router();

const {
  create,
  categoryById,
  read,
  update,
  remove,
  list,
} = require("../controller/category");
const { auth, isAuth, isAdmin } = require("../controller/auth");
const { userById } = require("../controller/user");

router.delete("/category/:categoryId/:userById", auth, isAuth, isAdmin, remove);
router.get("/category/:categoryId", read);
router.get("/category", list);
router.post(
  "/category/create/:userById",
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
router.put(
  "/category/:categoryId/:userById",
  auth,
  isAuth,
  isAdmin,
  update,
  (req, res) => {
    res.json({
      user: req.profile,
    });
  }
);
router.param("userById", userById);
router.param("categoryId", categoryById);
module.exports = router;
