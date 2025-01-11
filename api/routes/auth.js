const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// User Registration Route
router.post("/register", async (req, res) => {
  try {
    // Generate hashed password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user instance
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    // Save the user in the database
    const user = await newUser.save();
    res.status(200).json(user); // Respond with the saved user
  } catch (err) {
    res.status(500).json(err); // Handle errors
  }
});

// User Login Route
router.post("/login", async (req, res) => {
  try {
    // Find user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).json("User not found");

    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return res.status(400).json("Wrong password");

    res.status(200).json(user); // Respond with user data if successful
  } catch (err) {
    res.status(500).json(err); // Handle errors
  }
});

module.exports = router;
