const express = require("express");
const router = express.Router();

const {
  create,
  productById,
  read,
  remove,
  update,
} = require("../controller/product");
const { auth, isAuth, isAdmin } = require("../controller/auth");
const { userById } = require("../controller/user");

router.get("/product/:productById", read);

router.delete("/product/:productById/:userById", auth, isAuth, isAdmin, remove);

router.put("/product/:productById/:userById", auth, isAuth, isAdmin, update);

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
router.param("productById", productById);
module.exports = router;
