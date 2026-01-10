const express = require("express");
const router = express.Router();

// import controller functions
const { register, login, checkUser } = require("../controller/userController");

// REGISTER USER
router.post("/register", register);

// LOGIN USER
router.post("/login", login);

// CHECK USER (used for verifying token later)
router.get("/check", checkUser);

module.exports = router;
