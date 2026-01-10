const express = require("express");
const router = express.Router();

const {
  postAnswer,
  getAnswersForQuestion,
} = require("../controller/answerController");

// POST → submit an answer
router.post("/add", postAnswer);

// GET → get all answers for a specific question
router.get("/:questionid", getAnswersForQuestion);

module.exports = router;
