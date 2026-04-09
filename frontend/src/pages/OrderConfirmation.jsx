import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const OrderConfirmation = () => {

  const navigate = useNavigate();
  const { clearCart } = useCart();
  const [order, setOrder] = useState(null);

  useEffect(() => {

    const lastOrder = localStorage.getItem("lastOrder");

    if (lastOrder) {
      setOrder(JSON.parse(lastOrder));
      clearCart();
    } else {
      navigate("/");
    }

  }, []);

  if (!order) return null;

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white rounded-xl shadow-lg max-w-md w-full overflow-hidden">

        <div className="p-6">

          {/* Header */}
          <div className="flex justify-between items-center mb-6">

            <button
              onClick={() => navigate("/")}
              className="text-2xl"
            >
              ×
            </button>

            <h2 className="text-xl font-bold">
              Order Confirmed
            </h2>

          </div>

          {/* Success Icon */}
          <div className="text-center">

            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">

              <span className="text-4xl text-green-600">
                ✓
              </span>

            </div>

            <h3 className="text-xl font-bold mb-2">
              Order Placed Successfully!
            </h3>

            <p className="text-gray-600 mb-6">
              Your order will arrive in 8 minutes 🚴‍♂️
            </p>

          </div>

          {/* Delivery Progress */}

          <div className="mb-6">

            <p className="text-sm text-gray-500 mb-2">
              Preparing your order
            </p>

            <div className="w-full bg-gray-200 rounded-full h-2">

              <div className="bg-green-600 h-2 rounded-full w-1/3"></div>

            </div>

          </div>

          {/* Order Details */}

          <div className="bg-gray-50 rounded-lg p-4 mb-6">

            <p className="mb-2">
              <strong>Order ID:</strong> {order.orderId}
            </p>

            <p className="mb-2">
              <strong>Total Paid:</strong> ₹{order.totalAmount}
            </p>

            <p>
              <strong>Payment:</strong> {order.paymentMethod}
            </p>

          </div>

          {/* Ordered Items */}

          {order.items && (

            <div className="mb-6">

              <h4 className="font-semibold mb-3">
                Items Ordered
              </h4>

              <div className="space-y-2">

                {order.items.map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between text-sm"
                  >

                    <span>
                      {item.name} × {item.quantity}
                    </span>

                    <span>
                      ₹{item.price * item.quantity}
                    </span>

                  </div>

                ))}

              </div>

            </div>

          )}

          {/* Button */}

          <button
            onClick={() => navigate("/")}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700"
          >
            Continue Shopping
          </button>

        </div>

      </div>

    </div>

  );

};

export default OrderConfirmation;