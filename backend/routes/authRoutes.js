const express = require('express');
const { 
  registerUser, 
  loginUser, 
  saveAddress,
  getUserProfile,
  getUserAddresses 
} = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/address', protect, saveAddress);
router.get('/profile', protect, getUserProfile);
router.get('/addresses', protect, getUserAddresses);

module.exports = router;