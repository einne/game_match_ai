const bcrypt = require('bcryptjs');
const User = require('../models/User');
const generateToken = require('../utils/generateToken');

function formatUserResponse(user) {
  return {
    id: user._id,
    username: user.username,
    email: user.email,
    game: user.game,
    rank: user.rank,
    preferredRole: user.preferredRole,
    serverRegion: user.serverRegion,
    language: user.language,
    playTime: user.playTime,
    bio: user.bio
  };
}

async function register(req, res) {
  try {
    const {
      username,
      email,
      password,
      game,
      rank,
      preferredRole,
      serverRegion,
      language,
      playTime,
      bio
    } = req.body;

    if (
      !username ||
      !email ||
      !password ||
      !game ||
      !rank ||
      !preferredRole ||
      !serverRegion ||
      !language ||
      !playTime
    ) {
      return res.status(400).json({
        message:
          'Please provide username, email, password, game, rank, preferredRole, serverRegion, language, and playTime.'
      });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters.' });
    }

    if (bio && bio.length > 50) {
      return res.status(400).json({ message: 'Bio must be 50 characters or fewer.' });
    }

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      passwordHash,
      game,
      rank,
      preferredRole,
      serverRegion,
      language,
      playTime,
      bio
    });

    return res.status(201).json({
      message: 'Registration successful.',
      token: generateToken(user._id),
      user: formatUserResponse(user)
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }
    return res.status(500).json({ message: 'Server error during registration.' });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const passwordMatched = await bcrypt.compare(password, user.passwordHash);
    if (!passwordMatched) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    return res.json({
      message: 'Login successful.',
      token: generateToken(user._id),
      user: formatUserResponse(user)
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error during login.' });
  }
}

function getMe(req, res) {
  return res.json({
    user: formatUserResponse(req.user)
  });
}

module.exports = { register, login, getMe };
