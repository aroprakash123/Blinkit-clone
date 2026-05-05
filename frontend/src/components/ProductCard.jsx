import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { motion, AnimatePresence } from "framer-motion";

const ProductCard = ({ product }) => {
  const { cart, addToCart, updateQuantity } = useCart();

  const [imgError, setImgError] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [added, setAdded] = useState(false);
  const [wishlist, setWishlist] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  if (!product) return null;

  const productId = product._id;

  const cartItem = cart?.items?.find((item) => {
    const itemProductId = item.product?._id || item.product || item.id;
    return itemProductId === productId;
  });

  const quantity = cartItem?.quantity || 0;

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) /
            product.originalPrice) *
            100
        )
      : 0;

  useEffect(() => {
    if (quantity === 0) {
      setIsAdded(false);
    }
  }, [quantity]);

  const handleMouseMove = (e) => {
    // disable tilt on small screens (mobile UX fix)
    if (window.innerWidth < 768) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientY - rect.top - rect.height / 2) / 10;
    const y = (e.clientX - rect.left - rect.width / 2) / 10;
    setTilt({ x: -x, y });
  };

  const resetTilt = () => setTilt({ x: 0, y: 0 });

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();

    addToCart(product, 1);
    setIsAdded(true);

    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.4 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={resetTilt}
      style={{
        transform:
          window.innerWidth >= 768
            ? `perspective(800px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
            : "none"
      }}
      className="
        group relative bg-white rounded-2xl p-2 sm:p-3 
        w-[150px] sm:w-[180px] md:w-[200px] 
        min-w-[150px] sm:min-w-[180px] md:min-w-[200px]
        border border-gray-200 shadow-sm hover:shadow-2xl 
        transition-all duration-300 overflow-hidden
      "
    >

      {/* Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-200/0 via-green-200/10 to-green-300/20 opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* Wishlist */}
      <button
        onClick={() => setWishlist(!wishlist)}
        className="absolute top-2 right-2 z-20"
      >
        <motion.div
          whileTap={{ scale: 0.8 }}
          className={`text-sm sm:text-lg ${
            wishlist ? "text-red-500" : "text-gray-300"
          }`}
        >
          ♥
        </motion.div>
      </button>

      {/* Discount */}
      {discount > 0 && (
        <div className="absolute top-2 left-2 bg-blue-600 text-white text-[9px] sm:text-[10px]
        px-1.5 sm:px-2 py-0.5 rounded-full shadow">
          {discount}% OFF
        </div>
      )}

      {/* IMAGE */}
      <div className="h-24 sm:h-28 flex items-center justify-center overflow-hidden">
        <motion.img
          whileHover={{ scale: 1.15 }}
          src={
            !imgError
              ? product.image || "https://placehold.co/150x150"
              : "https://placehold.co/150x150?text=No+Image"
          }
          onError={() => setImgError(true)}
          className="h-full w-full object-contain mix-blend-multiply"
        />
      </div>

      {/* CONTENT */}
      <div className="mt-2 flex flex-col">

        <span className="text-[9px] sm:text-[10px] bg-gray-100 px-2 py-0.5 rounded w-fit mb-1">
          {product.deliveryTime || "17 MINS"}
        </span>

        <h3 className="text-[11px] sm:text-[13px] font-semibold line-clamp-2">
          {product.name}
        </h3>

        <p className="text-[10px] sm:text-[12px] text-gray-500 mb-2">
          {product.quantity || "1 unit"}
        </p>

        {/* PRICE + BUTTON */}
        <div className="flex justify-between items-center">

          <div>
            <p className="font-semibold text-xs sm:text-sm">
              ₹{product.price}
            </p>
            {product.originalPrice && (
              <p className="text-[9px] sm:text-[11px] line-through text-gray-400">
                ₹{product.originalPrice}
              </p>
            )}
          </div>

          <AnimatePresence mode="wait">
            {!isAdded ? (
              <motion.button
                key="add"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                onClick={handleAdd}
                className="bg-green-600 text-white text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-lg 
                font-bold shadow hover:bg-green-700 transition"
              >
                ADD
              </motion.button>
            ) : (
              <motion.div
                key="qty"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center bg-green-600 text-white rounded-lg h-7 sm:h-8"
              >
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    updateQuantity(productId, quantity - 1);

                    if (quantity - 1 === 0) {
                      setIsAdded(false);
                    }
                  }}
                  className="px-2 text-xs"
                >
                  −
                </button>

                <span className="px-2 text-[10px] sm:text-xs">
                  {quantity}
                </span>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateQuantity(productId, quantity + 1);
                  }}
                  className="px-2 text-xs"
                >
                  +
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -5 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 
            bg-black text-white text-[10px] sm:text-[11px] px-3 py-1 rounded-full shadow"
          >
            Added to cart
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ProductCard;