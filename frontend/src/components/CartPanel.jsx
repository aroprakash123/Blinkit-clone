import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartPanel = ({ isOpen, onClose }) => {
  const { cart, updateQuantity, removeFromCart, updateTipAndDonation, calculateTotals } = useCart();
  const navigate = useNavigate();

  const { subtotal, deliveryCharge, handlingCharge, smallCartCharge, donation, tip, total } = calculateTotals();

  const handleProceed = () => {
    onClose();
    navigate('/address');
  };

  if (!isOpen) return null;

  const itemCount = cart.items.reduce((s, i) => s + i.quantity, 0);
  const freeDeliveryTarget = 199;
  const remaining = Math.max(0, freeDeliveryTarget - subtotal);

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={onClose}
      ></div>

      {/* Cart Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col">

        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold">My Cart ({itemCount})</h2>

          <button onClick={onClose} className="text-2xl hover:text-red-500">
            ×
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4">

          {cart.items?.length === 0 ? (

            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛒</div>
              <p className="text-gray-500">Your cart is empty</p>
              <p className="text-sm text-gray-400">Add items to get started</p>
            </div>

          ) : (

            <>
              {/* Delivery Banner */}
              <div className="bg-green-50 p-3 rounded-lg mb-4 flex items-center gap-3">
                <span className="text-2xl">⏱️</span>
                <div>
                  <div className="font-semibold">Delivery in 8 minutes</div>
                  <div className="text-sm text-gray-600">
                    Shipment of {itemCount} item(s)
                  </div>
                </div>
              </div>

              {/* Free delivery message */}
              {remaining > 0 && (
                <div className="mb-4 p-3 bg-yellow-50 rounded-lg text-sm">
                  Add ₹{remaining} more for FREE delivery 🎉
                </div>
              )}

              {/* Cart Items */}
              {cart.items.map((item, index) => {

                const productId = item.product?._id || item.product;

                return (
                  <div key={`${productId}-${index}`} className="flex gap-3 py-3 border-b">

                    {/* Image */}
                    <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                      {item.product?.image ? (
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="object-contain h-full"
                        />
                      ) : (
                        "🛒"
                      )}
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="font-semibold text-sm">
                        {item.product?.name || item.name}
                      </div>

                      <div className="text-green-600 font-bold">
                        ₹{item.price}
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex flex-col items-end gap-2">

                      <div className="flex items-center gap-2 border rounded-lg">

                        <button
                          onClick={() => updateQuantity(productId, item.quantity - 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          -
                        </button>

                        <span className="w-8 text-center">
                          {item.quantity}
                        </span>

                        <button
                          onClick={() => updateQuantity(productId, item.quantity + 1)}
                          className="px-3 py-1 hover:bg-gray-100"
                        >
                          +
                        </button>

                      </div>

                      <button
                        onClick={() => removeFromCart(productId)}
                        className="text-xs text-gray-400 hover:text-red-500"
                      >
                        Remove
                      </button>

                    </div>
                  </div>
                );

              })}

              {/* Tip Section */}
              <div className="mt-4 p-3 border rounded-lg">

                <div className="font-semibold mb-2">
                  Tip your delivery partner ❤️
                </div>

                <div className="text-sm text-gray-500 mb-3">
                  Your kindness means a lot!
                </div>

                <div className="flex gap-2 flex-wrap">

                  {[20, 30, 50].map(tipAmount => (
                    <button
                      key={tipAmount}
                      onClick={() => updateTipAndDonation(tipAmount, cart.donation)}
                      className={`px-4 py-2 rounded-lg border transition
                      ${cart.tip === tipAmount
                        ? 'bg-green-600 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      ₹{tipAmount}
                    </button>
                  ))}

                  <input
                    type="number"
                    placeholder="Custom"
                    className="px-3 py-2 border rounded-lg w-24"
                    onChange={(e) =>
                      updateTipAndDonation(Number(e.target.value), cart.donation)
                    }
                  />

                </div>

              </div>

              {/* Bill Details */}
              <div className="mt-4 p-3 border rounded-lg">

                <div className="font-semibold mb-3">
                  Bill details
                </div>

                <div className="space-y-2 text-sm">

                  <div className="flex justify-between">
                    <span className="text-gray-600">Items total</span>
                    <span>₹{subtotal}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Delivery charge</span>
                    <span>₹{deliveryCharge}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Handling charge</span>
                    <span>₹{handlingCharge}</span>
                  </div>

                  {smallCartCharge > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Small cart charge</span>
                      <span>₹{smallCartCharge}</span>
                    </div>
                  )}

                  {tip > 0 && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tip</span>
                      <span>₹{tip}</span>
                    </div>
                  )}

                  <div className="border-t pt-2 mt-2">

                    <div className="flex justify-between font-bold text-lg">
                      <span>Grand total</span>
                      <span>₹{total}</span>
                    </div>

                  </div>

                </div>
              </div>

            </>
          )}

        </div>

        {/* Footer */}
        {cart.items?.length > 0 && (

          <div className="p-4 border-t bg-white">

            <button
              onClick={handleProceed}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Proceed to Address ›
            </button>

          </div>

        )}

      </div>
    </>
  );
};

export default CartPanel;