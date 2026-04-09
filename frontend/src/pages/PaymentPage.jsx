import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../services/api';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, calculateTotals } = useCart();
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  const { total, subtotal, deliveryCharge, handlingCharge, smallCartCharge, tip, donation } = calculateTotals();
  const address = JSON.parse(localStorage.getItem('deliveryAddress') || '{}');

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderData = {
        address,
        paymentMethod,
        tip,
        donation: donation > 0,
        totalAmount: total,
        subtotal
      };
      
      const response = await api.post('/orders', orderData);
      localStorage.setItem('lastOrder', JSON.stringify(response.data));
      navigate('/order-confirmation');
    } catch (error) {
      alert('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const paymentOptions = [
    { id: 'COD', label: 'Cash on Delivery' },
    { id: 'Card', label: 'Credit / Debit Card' },
    { id: 'UPI', label: 'UPI' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>

          {paymentOptions.map(option => (
            <label
              key={option.id}
              className={`flex items-center gap-3 p-4 border rounded-lg mb-3 cursor-pointer ${
                paymentMethod === option.id ? 'border-green-500 bg-green-50' : ''
              }`}
            >
              <input
                type="radio"
                name="payment"
                value={option.id}
                checked={paymentMethod === option.id}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="accent-green-600"
              />
              <span>{option.label}</span>
            </label>
          ))}

          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Items total</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Delivery charge</span>
              <span>₹{deliveryCharge}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Handling charge</span>
              <span>₹{handlingCharge}</span>
            </div>
            {smallCartCharge > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Small cart charge</span>
                <span>₹{smallCartCharge}</span>
              </div>
            )}
            {tip > 0 && (
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Tip</span>
                <span>₹{tip}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Grand total</span>
                <span className="text-green-600">₹{total}</span>
              </div>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-bold mt-6 hover:bg-green-700 disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : `Place Order • ₹${total}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;