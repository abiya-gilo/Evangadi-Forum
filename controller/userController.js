const dbConnection = require("../db/dbConfig");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER USER
async function register(req, res) {
  const { username, firstname, lastname, email, password } = req.body;

  if (!username || !firstname || !lastname || !email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide all required information!" });
  }

  try {
    // Check if username or email already exists
    const [existingUser] = await dbConnection.query(
      "SELECT userid FROM users WHERE username = ? OR email = ?",
      [username, email]
    );

    if (existingUser.length > 0) {
      return res.status(400).json({ msg: "User already registered!" });
    }

    if (password.length < 8) {
      return res
        .status(400)
        .json({ msg: "Password must be at least 8 characters long" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await dbConnection.query(
      "INSERT INTO users (username, firstname, lastname, email, password) VALUES (?, ?, ?, ?, ?)",
      [username, firstname, lastname, email, hashedPassword]
    );

    return res.status(201).json({ msg: "User created successfully" });
  } catch (error) {
    console.log("REGISTER ERROR:", error);
    return res
      .status(500)
      .json({ msg: "Server error. Please try again later." });
  }
}

// LOGIN USER
async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ msg: "Please provide email/username and password" });
  }

  try {
    // Allow login with email OR username
    const [user] = await dbConnection.query(
      "SELECT * FROM users WHERE email = ? OR username = ?",
      [email, email]
    );

    if (user.length === 0) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const foundUser = user[0];

    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        userid: foundUser.userid,
        username: foundUser.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        userid: foundUser.userid,
        username: foundUser.username,
        email: foundUser.email,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);
    return res
      .status(500)
      .json({ msg: "Server error. Please try again later." });
  }
}

// CHECK USER
async function checkUser(req, res) {
  return res.json({ msg: "User is authenticated", user: req.user });
}

module.exports = { register, login, checkUser };
