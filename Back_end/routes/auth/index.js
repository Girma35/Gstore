const express = require("express");
const router = express.Router();
const {signUpUser} = require("./signup/index");
const loginUser = require("./login/index");
// const checkPassword = require("./login/index");
// const { tokenVerification } = require("../../middleware");

// ROUTES * /api/auth/
router.post("/login", loginUser);
router.post("/register", signUpUser);
// router.post("/", checkPassword);

module.exports = router;
