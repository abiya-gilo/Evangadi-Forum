const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// test body route
app.post("/test-body", (req, res) => {
  console.log("🧪 Test endpoint hit");
  console.log("🧪 req.body:", req.body);
  console.log("🧪 Content-Type:", req.headers["content-type"]);
  res.json({
    message: "Test endpoint",
    receivedBody: req.body,
    bodyType: typeof req.body,
  });
});

// ROUTES
const userRoutes = require("./routes/userRoute");
const questionRouter = require("./routes/questionRoute");
const answerRouter = require("./routes/answerRoute");

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRouter);
app.use("/api/answers", answerRouter);

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
