const express = require("express");
const router = express.Router();

const {
  postAnswer,
  getAnswersForQuestion,
} = require("../controller/answerController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected
router.post("/add", authMiddleware, postAnswer);

// Public
router.get("/:questionid", getAnswersForQuestion);

module.exports = router;
