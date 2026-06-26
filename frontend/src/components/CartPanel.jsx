import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CartPanel = ({ isOpen, onClose }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    updateTipAndDonation,
    calculateTotals,
    clearCart
  } = useCart();

  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [localTip, setLocalTip] = useState(cart?.tip || 0);
  const panelRef = useRef();

  // Calculate totals with coupon discount
  const calculateTotalsWithDiscount = () => {
    const items = cart?.items || [];
    const subtotal = items.reduce((sum, item) => {
      const price = item.price || 0;
      const quantity = item.quantity ?? item.qty ?? 1;
      return sum + (price * quantity);
    }, 0);

    const deliveryCharge = subtotal > 199 ? 0 : 40;
    const handlingCharge = 10;
    const smallCartCharge = subtotal < 100 ? 20 : 0;
    const tip = cart?.tip || 0;
    
    // Apply 10% discount if coupon is applied
    let discount = 0;
    if (couponApplied) {
      discount = subtotal * 0.10; // 10% off on subtotal
    }
    
    const total = subtotal + deliveryCharge + handlingCharge + smallCartCharge + tip - discount;
    
    return {
      subtotal,
      deliveryCharge,
      handlingCharge,
      smallCartCharge,
      tip,
      discount,
      total
    };
  };

  const {
    subtotal,
    deliveryCharge,
    handlingCharge,
    smallCartCharge,
    tip,
    discount,
    total
  } = calculateTotalsWithDiscount();

  // Sync local tip with cart tip
  useEffect(() => {
    setLocalTip(cart?.tip || 0);
  }, [cart?.tip]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target) && isOpen) {
        onClose();
      }
    };

    const handleEscape = (event) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  // Instant tip handler
  const handleTipSelect = (tipAmount) => {
    setLocalTip(tipAmount);
    updateTipAndDonation(tipAmount, cart?.donation || 0);
  };

  // Apply coupon handler for AB10 (10% off)
  const handleApplyCoupon = () => {
    const enteredCode = couponCode.trim().toUpperCase();
    
    if (!enteredCode) {
      setCouponError('Please enter a coupon code');
      setCouponApplied(false);
      setDiscountPercent(0);
      return;
    }

    if (enteredCode === 'AB10') {
      setCouponApplied(true);
      setCouponError('');
      setDiscountPercent(10);
    } else {
      setCouponApplied(false);
      setCouponError('Invalid coupon code. Please enter AB10 for 10% off');
      setDiscountPercent(0);
    }
  };

  // Remove coupon
  const handleRemoveCoupon = () => {
    setCouponApplied(false);
    setCouponCode('');
    setCouponError('');
    setDiscountPercent(0);
  };

  const handleProceedToCheckout = async () => {
    setIsCheckingOut(true);
    onClose();
    await new Promise(resolve => setTimeout(resolve, 300));
    navigate('/address');
    setIsCheckingOut(false);
  };

  const handleClearCart = () => {
    clearCart();
    setShowClearConfirm(false);
    // Reset coupon when cart is cleared
    setCouponApplied(false);
    setCouponCode('');
    setCouponError('');
    setDiscountPercent(0);
  };

  const items = cart?.items || [];
  const itemCount = items.reduce(
    (sum, item) => sum + (item.quantity ?? item.qty ?? 1),
    0
  );

  const freeDeliveryTarget = 199;
  const remaining = Math.max(0, freeDeliveryTarget - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeDeliveryTarget) * 100);

  const slideInVariants = {
    hidden: { x: '100%' },
    visible: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } },
    exit: { x: '100%', transition: { duration: 0.3 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={onClose}
          />

          {/* Panel */}
          <motion.div
            ref={panelRef}
            className="
              fixed right-0 top-0 h-full 
              w-full sm:w-[450px] md:w-[500px] 
              bg-gradient-to-b from-gray-50 to-white shadow-2xl z-50 flex flex-col
            "
            variants={slideInVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div className="p-4 sm:p-5 border-b bg-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                    My Cart
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                  </p>
                </div>
                <div className="flex gap-2">
                  {items.length > 0 && (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-gray-100"
                      aria-label="Clear cart"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className="text-2xl sm:text-3xl hover:text-red-500 transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    aria-label="Close cart"
                  >
                    ×
                  </button>
                </div>
              </div>
            </div>

            {/* Clear Cart Confirmation Modal */}
            {showClearConfirm && (
              <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
                <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800">Clear Cart?</h3>
                  <p className="text-gray-600 mb-6">Are you sure you want to remove all items from your cart?</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowClearConfirm(false)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleClearCart}
                      className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* BODY */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 bg-gray-50">
              {items.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-16 sm:py-20 bg-white rounded-2xl"
                >
                  <div className="text-6xl sm:text-7xl mb-4">🛒</div>
                  <p className="text-base sm:text-lg text-gray-500 mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-gray-400">
                    Add items to get started
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-6 px-6 py-2.5 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
                  >
                    Continue Shopping
                  </button>
                </motion.div>
              ) : (
                <>
                  {/* Delivery Banner */}
                  <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 rounded-xl mb-4 shadow-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">⚡</span>
                      <div className="flex-1">
                        <div className="font-semibold text-sm sm:text-base text-white">
                          Delivery in 8-12 minutes
                        </div>
                        <div className="text-xs text-green-100">
                          Fresh & hot guaranteed
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Free Delivery Progress */}
                  {remaining > 0 && (
                    <div className="mb-5 bg-white p-4 rounded-xl shadow-sm">
                      <div className="flex justify-between text-xs sm:text-sm mb-2">
                        <span className="text-gray-700">Add ₹{remaining} more for FREE delivery</span>
                        <span className="font-semibold text-green-600">🎉</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-600 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* ITEMS LIST */}
                  <div className="space-y-3">
                    {items.map((item, index) => {
                      const productId = item.product?._id || item.product;
                      const qty = item.quantity ?? item.qty ?? 1;

                      return (
                        <motion.div
                          key={`${productId}-${index}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-100"
                        >
                          {/* IMAGE */}
                          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center overflow-hidden">
                            {item.product?.image ? (
                              <img
                                src={item.product.image}
                                className="object-cover w-full h-full"
                                alt={item.product?.name}
                              />
                            ) : (
                              <span className="text-3xl">🍕</span>
                            )}
                          </div>

                          {/* INFO */}
                          <div className="flex-1">
                            <div className="font-semibold text-sm sm:text-base text-gray-800 mb-1">
                              {item.product?.name || item.name}
                            </div>
                            <div className="text-green-600 font-bold text-base sm:text-lg">
                              ₹{item.price}
                            </div>
                            {item.customizations && (
                              <div className="text-xs text-gray-500 mt-1">
                                {item.customizations}
                              </div>
                            )}
                          </div>

                          {/* QTY CONTROLS */}
                          <div className="flex flex-col items-end gap-2">
                            <div className="flex items-center gap-1 bg-gray-100 rounded-lg">
                              <button
                                onClick={() => updateQuantity(productId, Math.max(0, qty - 1))}
                                className="px-3 py-1.5 hover:bg-gray-200 rounded-l-lg transition-colors text-sm font-semibold text-gray-700"
                                aria-label="Decrease quantity"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-sm font-semibold text-gray-800">
                                {qty}
                              </span>
                              <button
                                onClick={() => updateQuantity(productId, qty + 1)}
                                className="px-3 py-1.5 hover:bg-gray-200 rounded-r-lg transition-colors text-sm font-semibold text-gray-700"
                                aria-label="Increase quantity"
                              >
                                +
                              </button>
                            </div>
                            <button
                              onClick={() => removeFromCart(productId)}
                              className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                            >
                              Remove
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* TIP SECTION */}
                  <div className="mt-6 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="font-semibold mb-3 text-sm sm:text-base text-gray-800 flex items-center gap-2">
                      <span className="text-xl">❤️</span> 
                      Tip your delivery partner
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {[20, 30, 50, 100].map((tipAmount) => (
                        <button
                          key={tipAmount}
                          onClick={() => handleTipSelect(tipAmount)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-150 transform active:scale-95 ${
                            localTip === tipAmount
                              ? "bg-green-600 text-white shadow-md ring-2 ring-green-300"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm"
                          }`}
                        >
                          ₹{tipAmount}
                        </button>
                      ))}
                      {localTip > 0 && ![20, 30, 50, 100].includes(localTip) && (
                        <button
                          onClick={() => handleTipSelect(0)}
                          className="px-4 py-2 rounded-lg text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        >
                          Remove Tip (₹{localTip})
                        </button>
                      )}
                      {localTip > 0 && (
                        <button
                          onClick={() => handleTipSelect(0)}
                          className="px-4 py-2 rounded-lg text-sm bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors"
                        >
                          No Tip
                        </button>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      100% of your tip goes to the delivery partner
                    </p>
                  </div>

                  {/* COUPON SECTION - Updated for AB10 (10% off) */}
                  <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="font-semibold mb-3 text-sm sm:text-base text-gray-800 flex items-center gap-2">
                      <span>🎫</span> Apply Coupon
                      {couponApplied && (
                        <span className="text-xs bg-green-100 text-green-600 px-2 py-1 rounded-full">
                          10% OFF Applied!
                        </span>
                      )}
                    </div>
                    
                    {!couponApplied ? (
                      <>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                            placeholder="Enter AB10 for 10% off"
                            className="flex-1 px-3 py-2 border border-gray-200 text-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          />
                          <button
                            onClick={handleApplyCoupon}
                            disabled={!couponCode.trim()}
                            className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                            <span>⚠️</span> {couponError}
                          </p>
                        )}
                        <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                          <p className="text-xs text-gray-600">
                            💡 Available coupon: <span className="font-mono font-bold">AB10</span> - Get 10% off on your entire order!
                          </p>
                        </div>
                      </>
                    ) : (
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-semibold text-green-800">Coupon Applied Successfully!</p>
                            <p className="text-xs text-green-600 mt-1">
                              Code: <span className="font-mono font-bold">AB10</span> - 10% off applied
                            </p>
                            <p className="text-xs text-green-600">
                              You saved ₹{discount.toFixed(2)} on this order
                            </p>
                          </div>
                          <button
                            onClick={handleRemoveCoupon}
                            className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* BILL DETAILS */}
                  <div className="mt-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="font-semibold mb-3 text-sm sm:text-base text-gray-800">Bill Details</div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Items Total</span>
                        <span className="font-medium text-gray-800">₹{subtotal.toFixed(2)}</span>
                      </div>
                      
                      {deliveryCharge > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Delivery Charge</span>
                          <span className="font-medium text-gray-800">₹{deliveryCharge.toFixed(2)}</span>
                        </div>
                      )}
                      
                      {handlingCharge > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Handling Charge</span>
                          <span className="font-medium text-gray-800">₹{handlingCharge.toFixed(2)}</span>
                        </div>
                      )}
                      
                      {smallCartCharge > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Small Cart Fee</span>
                          <span className="font-medium text-orange-600">₹{smallCartCharge.toFixed(2)}</span>
                        </div>
                      )}
                      
                      {localTip > 0 && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tip Amount</span>
                          <span className="font-medium text-gray-800">₹{localTip.toFixed(2)}</span>
                        </div>
                      )}
                      
                      {discount > 0 && (
                        <div className="flex justify-between text-sm pt-1">
                          <span className="text-green-600 font-medium">Coupon Discount (10% off)</span>
                          <span className="font-medium text-green-600">-₹{discount.toFixed(2)}</span>
                        </div>
                      )}
                      
                      <div className="border-t border-gray-200 pt-3 mt-2">
                        <div className="flex justify-between font-bold text-base">
                          <span className="text-gray-800">Total Amount</span>
                          <span className="text-green-600 text-xl">₹{total.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                          <p className="text-xs text-green-600 mt-1 text-right">
                            You saved ₹{discount.toFixed(2)} with coupon!
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* FOOTER */}
            {items.length > 0 && (
              <motion.div 
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                className="p-4 sm:p-5 border-t bg-white shadow-lg"
              >
                <div className="mb-3 flex justify-between items-center">
                  <span className="text-gray-600">Total Amount</span>
                  <div>
                    <span className="text-2xl font-bold text-green-600">₹{total.toFixed(2)}</span>
                    {discount > 0 && (
                      <span className="text-sm text-green-600 ml-2">
                        (Saved ₹{discount.toFixed(2)})
                      </span>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={handleProceedToCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-3.5 rounded-xl font-semibold text-base hover:from-green-700 hover:to-emerald-700 transition-all transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </div>
                  ) : (
                    'Proceed to Checkout ›'
                  )}
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-3">
                  Taxes and charges included
                </p>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartPanel;