import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {

  const { cart, addToCart, updateQuantity } = useCart();
  const [imgError, setImgError] = useState(false);

  const productId = product?._id || product?.id;

  const cartItem = cart?.items?.find((item) => {
    const itemProductId = item.product?._id || item.product || item.id;
    return itemProductId === productId;
  });

  const quantity = cartItem?.quantity || 0;

  if (!product) return null;

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100
        )
      : 0;

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col justify-between w-[180px] min-w-[180px] p-3 relative h-full">

      {/* Discount Badge */}
      {discount > 0 && (
        <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-br-lg z-10">
          {discount}% OFF
        </div>
      )}

      {/* IMAGE */}
      <div className="relative h-28 flex items-center justify-center mb-2 p-2">
        <img
          src={
            !imgError
              ? product.image || "https://placehold.co/150x150?text=Product"
              : "https://placehold.co/150x150?text=No+Image"
          }
          alt={product.name}
          className="h-full w-full object-contain mix-blend-multiply"
          onError={() => setImgError(true)}
        />
      </div>

      {/* CONTENT */}
      <div className="flex flex-col flex-grow">

        {/* Delivery Time */}
        <div className="bg-gray-100 text-[10px] font-semibold text-gray-600 px-1.5 py-0.5 rounded w-fit flex items-center gap-1 mb-1.5">
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {product.deliveryTime || "17 MINS"}
        </div>

        {/* Name */}
        <h3 className="font-semibold text-[13px] text-gray-800 line-clamp-2 leading-tight min-h-[36px]">
          {product.name}
        </h3>

        {/* Quantity */}
        <p className="text-[12px] text-gray-500 mt-1 mb-3">
          {product.quantity || "1 unit"}
        </p>

        {/* Price + Cart */}
        <div className="flex justify-between items-center mt-auto">

          <div className="flex flex-col">
            <span className="font-semibold text-sm text-black">
              ₹{product.price}
            </span>

            {product.originalPrice && (
              <span className="text-[11px] text-gray-500 line-through">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* ADD BUTTON */}
          {quantity === 0 ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                addToCart(productId, 1);
              }}
              className="border border-green-600 text-green-600 bg-white hover:bg-green-50 px-4 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors"
            >
              ADD
            </button>
          ) : (

            /* QUANTITY CONTROLLER */
            <div className="flex items-center bg-green-600 text-white rounded-lg h-8">

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateQuantity(productId, quantity - 1);
                }}
                className="px-2.5 h-full font-bold hover:bg-green-700 rounded-l-lg"
              >
                −
              </button>

              <span className="w-6 text-center text-xs font-bold">
                {quantity}
              </span>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  updateQuantity(productId, quantity + 1);
                }}
                className="px-2.5 h-full font-bold hover:bg-green-700 rounded-r-lg"
              >
                +
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProductCard;