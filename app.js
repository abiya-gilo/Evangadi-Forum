require("dotenv").config();
const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
app.use(express.json());

// DB
const db = require("./db/dbConfig");

// Routes
const userRoute = require("./routes/userRoute");
const questionRoute = require("./routes/questionRoute");
const answerRoute = require("./routes/answerRoute");

// DB health check
app.get("/db-health", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS ok");
    res.json({ status: "ok", rows });
  } catch (err) {
    console.error("DB health error:", err);
    res.status(500).json({ error: err.message });
  }
});

// Mount routes
app.use("/api/users", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/answers", answerRoute);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port http://localhost:${port}`));
