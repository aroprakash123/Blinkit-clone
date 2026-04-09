const express = require('express');
const { getCart, addToCart, updateCartItem, removeFromCart, updateTipAndDonation } = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.use(protect);

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove/:productId', removeFromCart);
router.put('/update-tip', updateTipAndDonation);

module.exports = router;