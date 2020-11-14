const express = require("express");
const router = express.Router();
const { userSignupValidator } = require("../validator");

const { signup, signin, signout, auth } = require("../controller/auth");
//

router.post("/signup", signup);

router.post("/signin", signin);

router.get("/signout", signout);

module.exports = router;
