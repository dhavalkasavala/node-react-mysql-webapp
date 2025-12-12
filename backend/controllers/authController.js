const bcrypt = require("bcryptjs");
const pool = require("../db");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/token");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate input
    if (!name || !email || !password)
      return res.status(400).json({ error: "All fields are required" });

  const hashed = bcrypt.hashSync(password, 12);

  try {
    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    await pool.execute(sql, [name, email, hashed]);

    res.json({ message: "Signup successful" });
  } catch (err) {
    console.error(err); // log real error
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Email already registered" });
    }
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await pool.execute(`SELECT * FROM users WHERE email = ?`, [
    email,
  ]);

  if (rows.length === 0)
    return res.status(400).json({ error: "Invalid email or password" });

  const user = rows[0];

  if (!bcrypt.compareSync(password, user.password))
    return res.status(400).json({ error: "Invalid email or password" });

  const accessToken = generateAccessToken({
    id: user.id,
    role: user.role,
  });

  const refreshToken = generateRefreshToken({
    id: user.id,
    role: user.role,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: false,         
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({ accessToken });
};

exports.refreshToken = (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(403).json({ error: "Missing refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

    const newAccess = generateAccessToken({
      id: decoded.id,
      role: decoded.role,
    });

    res.json({ accessToken: newAccess });
  } catch (err) {
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const hashed = bcrypt.hashSync(password, 12);

  try {
    await pool.execute(
      `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`,
      [name, email, hashed, role || "user"]
    );

    res.json({ message: "User created by admin" });
  } catch (err) {
    res.status(400).json({ error: "Email already exists" });
  }
};
