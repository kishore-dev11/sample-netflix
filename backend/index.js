const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🗄️ Mock users
let users = [
    { email: "kishore@gmail.com", password: "1234" },
    { email: "admin@gmail.com", password: "admin123" },
];

// 🔑 Simple token generator
function generateToken(email) {
    const random = Math.random().toString(36).substring(2);
    return Buffer.from(`${email}:${random}:${Date.now()}`).toString("base64");
}

let activeSessions = {};

// 📝 SIGNUP
app.post("/signup", (req, res) => {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    if (!email || !password)
        return res.status(400).json({ message: "All fields required" });

    const existingUser = users.find((u) => u.email === email);
    if (existingUser)
        return res.status(400).json({ message: "User already exists" });

    users.push({ email, password });
    res.status(201).json({ success: true, message: "User created successfully" });
});

// 🔐 LOGIN
app.post("/login", (req, res) => {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password?.trim();

    const foundUser = users.find(
        (u) => u.email === email && u.password === password
    );

    if (!foundUser)
        return res.status(401).json({ success: false, message: "Invalid credentials" });

    const token = generateToken(email);
    activeSessions[token] = email;

    res.json({ success: true, token, user: { email: foundUser.email } });
});

// 🛡️ Verify Token Middleware
function verifyToken(req, res, next) {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token || !activeSessions[token])
        return res.status(403).json({ message: "Unauthorized" });
    req.userEmail = activeSessions[token];
    next();
}

// 🏠 Dashboard (Protected)
app.get("/dashboard", verifyToken, (req, res) => {
    res.json({ success: true, message: `Welcome ${req.userEmail}!` });
});

// 🚪 Logout
app.post("/logout", verifyToken, (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    delete activeSessions[token];
    res.json({ success: true, message: "Logged out" });
});

app.listen(5000, () => console.log("🔥 Server running on http://localhost:5000"));