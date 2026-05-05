import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  const [loading, setLoading] = useState(false);

  const items = cart?.items || [];

  const totalPrice = items.reduce((acc, item) => {
    return acc + item.quantity * (item.product?.price || 0);
  }, 0);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Fill all required fields");
      return;
    }

    try {
      setLoading(true);

      await api.post("/orders", {
        items,
        address: form,
        totalAmount: totalPrice,
        paymentMethod: "COD",
      });

      clearCart();
      navigate("/success");

    } catch (err) {
      console.error(err);
      alert("Order failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">

      {/* LEFT */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Delivery Details</h2>

        <div className="flex flex-col gap-3">
          <input name="name" placeholder="Full Name" onChange={handleChange} className="border p-2 rounded" />
          <input name="phone" placeholder="Phone Number" onChange={handleChange} className="border p-2 rounded" />
          <textarea name="address" placeholder="Address" onChange={handleChange} className="border p-2 rounded" />
          <input name="city" placeholder="City" onChange={handleChange} className="border p-2 rounded" />
          <input name="pincode" placeholder="Pincode" onChange={handleChange} className="border p-2 rounded" />
        </div>
      </div>

      {/* RIGHT */}
      <div className="bg-white p-6 rounded-xl shadow flex flex-col">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

        <div className="flex-grow">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between border-b py-2">
              <span>{item.product?.name}</span>
              <span>₹{item.quantity * item.product.price}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 border-t pt-4">
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>₹{totalPrice}</span>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded-lg"
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;