const express = require("express");
const router = express.Router();
const Session = require("../models/Session");
const User = require("../models/User");
const axios = require("axios");

// Book a session
router.post("/book", async (req, res) => {
  try {
    const { sessionId, userId } = req.body;

    // Fetch the session details
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    // Fetch the user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Book the session (add logic to update the session or user model as needed)
    // Example: Add the session to the user's booked sessions
    user.bookedSessions.push(sessionId);
    await user.save();

    // Send email to the user
    const emailSubject = `Session Booked: ${session.title}`;
    const emailText = `
      Hi ${user.username},

      You have successfully booked the following session:

      Title: ${session.title}
      Date: ${session.date}
      Time: ${session.time}
      Duration: ${session.duration}
      Expert: ${session.expert.name}

      Thank you for using our service!

      Best regards,
      Your App Team
    `;

    // Call the email API
    await axios.post("http://localhost:3000/api/send-email", {
      to: user.email,
      subject: emailSubject,
      text: emailText,
    });

    res.status(200).json({ message: "Session booked successfully!" });
  } catch (error) {
    console.error("Error booking session:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;