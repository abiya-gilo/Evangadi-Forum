const db = require("../db/dbConfig");
const { v4: uuidv4 } = require("uuid");

// POST /api/questions/ask
const askQuestion = async (req, res) => {
  try {
    console.log("REQ.USER:", req.user);
    const userid = req.user.userid;
    const { title, description } = req.body;

    if (!title || !description) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const questionid = uuidv4();

    await db.execute(
      "INSERT INTO questions (questionid, userid, title, description ) VALUES (?, ?, ?, ? )",
      [questionid, userid, title, description]
    );

    return res.status(201).json({
      msg: "Question posted successfully",
      questionid,
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

// GET /api/questions
const getAllQuestions = async (req, res) => {
  try {
    const [rows] = await db.execute(
      `SELECT q.questionid, q.title, q.description, q.created_at,
              u.username, u.email
       FROM questions q
       JOIN users u ON q.userid = u.userid
       ORDER BY q.created_at DESC`
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

// GET /api/questions/:questionid
const getSingleQuestion = async (req, res) => {
  try {
    const { questionid } = req.params;

    const [rows] = await db.execute(
      `SELECT q.questionid, q.title, q.description, q.created_at,
              u.username
       FROM questions q
       JOIN users u ON q.userid = u.userid
       WHERE q.questionid = ?`,
      [questionid]
    );

    if (rows.length === 0) {
      return res.status(404).json({ msg: "Question not found" });
    }

    return res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  askQuestion,
  getAllQuestions,
  getSingleQuestion,
};
