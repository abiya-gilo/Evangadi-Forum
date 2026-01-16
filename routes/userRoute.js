const express = require("express");
const router = express.Router();

const { register, login, checkUser } = require("../controller/userController");

router.post("/register", register);
router.post("/login", login);
router.get("/check", checkUser);

module.exports = router;
