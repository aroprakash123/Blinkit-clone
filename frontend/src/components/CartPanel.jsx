import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPanel = ({ isOpen, onClose }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    updateTipAndDonation,
    calculateTotals
  } = useCart();

  const navigate = useNavigate();

  const {
    subtotal,
    deliveryCharge,
    handlingCharge,
    smallCartCharge,
    tip,
    total
  } = calculateTotals();

  if (!isOpen) return null;

  const items = cart?.items || [];

  const itemCount = items.reduce(
    (sum, item) => sum + (item.quantity ?? item.qty ?? 1),
    0
  );

  const freeDeliveryTarget = 199;
  const remaining = Math.max(0, freeDeliveryTarget - subtotal);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />

      {/* Panel */}
      <div className="
        fixed right-0 top-0 h-full 
        w-full sm:max-w-md 
        bg-white shadow-xl z-50 flex flex-col
      ">

        {/* Header */}
        <div className="p-3 sm:p-4 border-b flex justify-between items-center">
          <h2 className="text-lg sm:text-xl font-bold">
            My Cart ({itemCount})
          </h2>

          <button
            onClick={onClose}
            className="text-xl sm:text-2xl hover:text-red-500"
          >
            ×
          </button>
        </div>

        {/* BODY */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-4">

          {items.length === 0 ? (
            <div className="text-center py-16 sm:py-20">
              <div className="text-5xl sm:text-6xl mb-4">🛒</div>
              <p className="text-sm sm:text-base text-gray-500">
                Your cart is empty
              </p>
            </div>
          ) : (
            <>
              {/* Delivery Banner */}
              <div className="bg-green-50 p-3 rounded-lg mb-4">
                <div className="font-semibold text-sm sm:text-base">
                  ⚡ Delivery in 8 minutes
                </div>
                <div className="text-xs sm:text-sm text-gray-600">
                  {itemCount} item(s)
                </div>
              </div>

              {/* Free Delivery */}
              {remaining > 0 && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-xs sm:text-sm">
                  Add ₹{remaining} more for FREE delivery 🎉
                </div>
              )}

              {/* ITEMS */}
              {items.map((item, index) => {

                const productId =
                  item.product?._id || item.product;

                const qty =
                  item.quantity ??
                  item.qty ??
                  1;

                return (
                  <div
                    key={`${productId}-${index}`}
                    className="flex gap-2 sm:gap-3 py-3 border-b"
                  >

                    {/* IMAGE */}
                    <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          className="object-contain h-full"
                          alt=""
                        />
                      ) : (
                        "🛒"
                      )}
                    </div>

                    {/* INFO */}
                    <div className="flex-1">
                      <div className="font-semibold text-xs sm:text-sm">
                        {item.product?.name || item.name}
                      </div>

                      <div className="text-green-600 font-bold text-sm sm:text-base">
                        ₹{item.price}
                      </div>
                    </div>

                    {/* QTY */}
                    <div className="flex flex-col items-end gap-1 sm:gap-2">

                      <div className="flex items-center gap-1 sm:gap-2 border rounded-lg">

                        <button
                          onClick={() =>
                            updateQuantity(
                              productId,
                              Math.max(0, qty - 1)
                            )
                          }
                          className="px-2 sm:px-3 py-1 hover:bg-gray-100 text-sm"
                        >
                          -
                        </button>

                        <span className="w-6 sm:w-8 text-center text-sm">
                          {qty}
                        </span>

                        <button
                          onClick={() =>
                            updateQuantity(productId, qty + 1)
                          }
                          className="px-2 sm:px-3 py-1 hover:bg-gray-100 text-sm"
                        >
                          +
                        </button>

                      </div>

                      <button
                        onClick={() =>
                          removeFromCart(productId)
                        }
                        className="text-[10px] sm:text-xs text-gray-400 hover:text-red-500"
                      >
                        Remove
                      </button>

                    </div>
                  </div>
                );
              })}

              {/* TIP */}
              <div className="mt-4 p-3 border rounded-lg">
                <div className="font-semibold mb-2 text-sm sm:text-base">
                  Tip your delivery partner ❤️
                </div>

                <div className="flex gap-2 flex-wrap">
                  {[20, 30, 50].map((tipAmount) => (
                    <button
                      key={tipAmount}
                      onClick={() =>
                        updateTipAndDonation(
                          tipAmount,
                          cart.donation
                        )
                      }
                      className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border text-xs sm:text-sm ${
                        cart.tip === tipAmount
                          ? "bg-green-600 text-white"
                          : "bg-gray-100"
                      }`}
                    >
                      ₹{tipAmount}
                    </button>
                  ))}
                </div>
              </div>

              {/* BILL */}
              <div className="mt-4 p-3 border rounded-lg">
                <div className="font-semibold mb-3 text-sm sm:text-base">
                  Bill details
                </div>

                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Items total</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between text-xs sm:text-sm">
                  <span>Delivery</span>
                  <span>₹{deliveryCharge}</span>
                </div>

                <div className="border-t mt-2 pt-2 flex justify-between font-bold text-sm sm:text-base">
                  <span>Total</span>
                  <span>₹{total}</span>
                </div>
              </div>

            </>
          )}
        </div>

        {/* FOOTER */}
        {items.length > 0 && (
          <div className="p-3 sm:p-4 border-t">
            <button
              onClick={() => {
                onClose();
                navigate("/address");
              }}
              className="w-full bg-green-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold text-sm sm:text-base"
            >
              Proceed ›
            </button>
          </div>
        )}

      </div>
    </>
  );
};

export default CartPanel;