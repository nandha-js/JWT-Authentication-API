const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
exports.register = async (req, res) => {
  const { username, email, password, age, gender, bio } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, msg: 'User already exists' });
    }

    // Create new user instance
    user = new User({
      username,
      email,
      password,
      age,
      gender,
      bio
    });

    // Hash password before saving
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    res.status(201).json({
      success: true,
      msg: 'User registered successfully',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
        bio: user.bio
      }
    });
  } catch (err) {
    console.error('Register Error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

/**
 * @desc    Login user and return JWT
 * @route   POST /api/auth/login
 * @access  Public
 */
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ success: false, msg: 'Invalid Credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, msg: 'Invalid Credentials' });
    }

    // Generate JWT
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        age: user.age,
        gender: user.gender,
        bio: user.bio
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({
      success: true,
      msg: 'Login successful',
      token
    });
  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};

/**
 * @desc    Get current user info (protected)
 * @route   GET /api/auth/me
 * @access  Private
 */
exports.getUser = async (req, res) => {
  try {
    res.json({
      success: true,
      user: req.user
    });
  } catch (err) {
    console.error('Get User Error:', err.message);
    res.status(500).json({ success: false, msg: 'Server error' });
  }
};
