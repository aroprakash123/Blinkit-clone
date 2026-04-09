const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

// @desc    Register a new user
// @route   POST /api/auth/register
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    console.log('=== REGISTER DEBUG ===');
    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password entered:', password);
    console.log('Password length:', password.length);

    // Validate input
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    
    if (username.length < 3) {
      return res.status(400).json({ message: 'Username must be at least 3 characters' });
    }
    
    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters' });
    }
    
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Please provide a valid email' });
    }

    // Check if user exists
    const userExists = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email or username' });
    }

    // Hash password manually - make sure to use password.trim()
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password.trim(), salt);
    
    console.log('Generated hash:', hashedPassword);
    console.log('Hash length:', hashedPassword.length);

    // Create user with hashed password
    const user = await User.create({
      username: username.trim(),
      email: email.trim().toLowerCase(),
      password: hashedPassword
    });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid user data' });
    }
    
    console.log('User created successfully:', user._id);
    console.log('Stored password in DB:', user.password);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
    
  } catch (error) {
    console.error('Registration error details:', error);
    res.status(500).json({ message: error.message || 'Server error during registration' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    console.log('=== LOGIN DEBUG ===');
    console.log('Username/Email:', username);
    console.log('Password entered:', password);
    console.log('Password length:', password.length);
    
    // Validate input
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username/email and password' });
    }
    
    // Find user by username or email
    const user = await User.findOne({ 
      $or: [{ email: username }, { username: username }] 
    });
    
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }
    
    console.log('User found:', user.username);
    console.log('Stored password hash:', user.password);
    console.log('Stored hash length:', user.password.length);
    
    // Check password using bcrypt directly
    const isMatch = await bcrypt.compare(password.trim(), user.password);
    
    console.log('Password match result:', isMatch);
    
    if (!isMatch) {
      // Try comparing without trim
      const isMatchNoTrim = await bcrypt.compare(password, user.password);
      console.log('Match without trim:', isMatchNoTrim);
      return res.status(401).json({ message: 'Invalid email/username or password' });
    }
    
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      token: generateToken(user._id)
    });
    
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: error.message || 'Server error during login' });
  }
};

// @desc    Save user address
// @route   POST /api/auth/address
const saveAddress = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const { flatNo, floor, area, landmark, name, phone, type } = req.body;
    
    // Validate required fields
    if (!flatNo || !area || !name || !phone) {
      return res.status(400).json({ message: 'Please provide all required address fields' });
    }
    
    const address = {
      type: type || 'home',
      flatNo,
      floor: floor || '',
      area,
      landmark: landmark || '',
      name,
      phone
    };
    
    user.addresses.push(address);
    await user.save();
    
    console.log('Address saved for user:', user.username);
    
    res.json({ 
      message: 'Address saved successfully',
      address: address
    });
    
  } catch (error) {
    console.error('Save address error:', error);
    res.status(500).json({ message: error.message || 'Server error while saving address' });
  }
};

// @desc    Get user profile
// @route   GET /api/auth/profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
    
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get user addresses
// @route   GET /api/auth/addresses
const getUserAddresses = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('addresses');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user.addresses);
    
  } catch (error) {
    console.error('Get addresses error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
  registerUser, 
  loginUser, 
  saveAddress,
  getUserProfile,
  getUserAddresses
};