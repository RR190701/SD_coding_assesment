const express = require("express");
const router = express.Router();
const {register, login, forgetPassword, resetPassword} = require("./../controllers/auth");
router.route("/register").post(register);

router.route("/login").post(login);

router.route("/resestPassword:resetToken").put(resetPassword);

router.route("/forgetPassword").post(forgetPassword);

module.exports = router;