// backend/routes/user.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");

// @route   POST /api/users
// @desc    Save user from Google login
// @access  Public
router.post("/", async (req, res) => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res.status(401).json({ message: "No token provided. Unauthorized." });
  }

  try {
    // 2. Verify the token with the Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email, name, picture } = decodedToken;

    // 3. Find a user by their unique Firebase UID or create them if they don't exist
    // This is a secure "upsert" operation based on verified data
    const user = await User.findOneAndUpdate(
      { uid: uid }, // The field in your schema must be 'uid' to match this
      {
        $set: {
          name: name,
          email: email,
          photoURL: picture, // 'picture' is the key in the decoded token
        },
      },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    console.log(`✅ User authenticated/updated: ${user.email}`);
    res.status(200).json({ message: "User authenticated successfully", user });

  } catch (error) {
    console.error("❌ Error verifying token or saving user:", error);
    res.status(401).json({ message: "Invalid or expired token.", error: error.message });
  }
});

module.exports = router;
