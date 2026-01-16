const express = require("express");
const router = express.Router();

const {
  askQuestion,
  getAllQuestions,
  getSingleQuestion,
} = require("../controller/questionController");

const authMiddleware = require("../middleware/authMiddleware");

// Protected
router.post("/ask", authMiddleware, askQuestion);

// Public
router.get("/", getAllQuestions);
router.get("/:questionid", getSingleQuestion);

module.exports = router;
