const db = require("../db/dbConfig");

// POST /api/answers/add
const postAnswer = async (req, res) => {
  try {
    const userid = req.user.userid;
    const { questionid, answer_text } = req.body;

    if (!questionid || !answer_text) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    await db.execute(
      "INSERT INTO answers (userid, questionid, answer_text) VALUES (?, ?, ?)",
      [userid, questionid, answer_text]
    );

    return res.status(201).json({ msg: "Answer submitted successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

// GET /api/answers/:questionid
const getAnswersForQuestion = async (req, res) => {
  try {
    const { questionid } = req.params;

    const [rows] = await db.execute(
      `SELECT a.answerid, a.answer_text, a.created_at,
              u.username
       FROM answers a
       JOIN users u ON a.userid = u.userid
       WHERE a.questionid = ?
       ORDER BY a.created_at ASC`,
      [questionid]
    );

    return res.status(200).json(rows);
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

module.exports = {
  postAnswer,
  getAnswersForQuestion,
};
