require("dotenv").config();
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { createCustomError } = require("../errors/custom-error");
const sendEmailNotification = require("../utils/sendMail");

const register = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists by username or email
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });

    if (existingUser) {
      // Respond with a specific error if the user already exists
      return next(createCustomError("Username or email already in use", 400));
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userDetails = { username, email, password: hashedPassword };

    const user = await User.create({ ...userDetails });
    if (user && user._id && user.username) {
      const token = jwt.sign(
        { userId: user._id, username: user.username },
        process.env.JWT_SECRET,
        {
          expiresIn: process.env.JWT_LIFETIME,
        }
      );
      // Send email notification
      sendEmailNotification(username, email);
      res
        .status(StatusCodes.CREATED)
        .json({ user: { username: user.username }, token });
    } else {
      return next(createCustomError(`No token present`, 404));
    }
  } catch (error) {
    if (error.MongoServerError) {
      console.log("User already exist, kindly login!");
    }
    console.error(`Error during registration:`, error);
    res.status(500).json({ error: "Registration failed. Please try again." });
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(createCustomError("Kindly provide valid email and password?"));
  }

  const user = await User.findOne({ email });
  if (!user) {
    return next(createCustomError("Invalid Email!", 400));
  }

  // compare password
  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword) {
    // res.status(422).json("Invalid Password!");
    return next(createCustomError("Invalid password", 400));
  }
  try {
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_LIFETIME,
      }
    );
    res
      .status(StatusCodes.OK)
      .json({ user: { username: user.username }, token });
  } catch (error) {
    res.status(400).json(error);
  }
};

// Route to get user profile (protected by token) in middleware
const profile = async (req, res) => {
  try {
    // Fetch user details from the MongoDB database
    const user = await User.findById(req.user.userId).select("-password"); // Exclude the password field

    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  register,
  login,
  profile,
};
