const express = require("express");
const router = express.Router();
const Register = require("./path/to/registerModel"); // Adjust the path accordingly

// POST route for checking username and password
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user with the given email exists in the database
    const user = await Register.findOne({ email });

    if (!user) {
      // User not found
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Check if the provided password matches the stored password
    if (password !== user.password) {
      // Passwords don't match
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Authentication successful
    res.status(200).json({ message: "Login successful" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
