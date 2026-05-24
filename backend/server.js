const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());

// Mock user database
const MOCK_USERS = [
  {
    id: 1,
    email: "user@netflix.com",
    password: "netflix123",
    name: "Netflix User",
  },
  {
    id: 2,
    email: "admin@netflix.com",
    password: "admin123",
    name: "Admin",
  },
  {
    id: 3,
    email: "test@example.com",
    password: "password",
    name: "Test User",
  },
];

// POST /api/login
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  // Basic server-side validation
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Email and password are required.",
    });
  }

  // Find user
  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Incorrect email or password.",
    });
  }

  // Successful login
  return res.status(200).json({
    success: true,
    message: "Login successful!",
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    token: `mock-jwt-token-${user.id}-${Date.now()}`,
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running!", port: PORT });
});

app.listen(PORT, () => {
  console.log(`\n🚀 Backend server running at http://localhost:${PORT}`);
  console.log(`📋 Test credentials:`);
  MOCK_USERS.forEach((u) =>
    console.log(`   📧 ${u.email}  🔑 ${u.password}`)
  );
  console.log();
});
