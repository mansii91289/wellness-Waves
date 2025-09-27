import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Create a new user
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(200).json(user);
    }

    // Create new user
    user = new User({ username, password });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;