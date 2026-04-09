import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAddress } from '../services/auth';
import { useCart } from '../context/CartContext';

const AddressPage = () => {
  const navigate = useNavigate();
  const { calculateTotals } = useCart();
  const [activeTab, setActiveTab] = useState('home');
  const [formData, setFormData] = useState({
    flatNo: '',
    floor: '',
    area: '',
    landmark: '',
    name: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const tabs = [
    { id: 'home', label: 'Home', icon: '🏠' },
    { id: 'work', label: 'Work', icon: '🏢' },
    { id: 'hotel', label: 'Hotel', icon: '🏨' },
    { id: 'other', label: 'Other', icon: '📍' }
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.flatNo || !formData.area || !formData.name || !formData.phone) {
      alert('Please fill all required fields');
      return;
    }

    setLoading(true);
    try {
      await saveAddress({
        type: activeTab,
        ...formData
      });
      localStorage.setItem('deliveryAddress', JSON.stringify(formData));
      navigate('/payment');
    } catch (error) {
      alert('Error saving address');
    } finally {
      setLoading(false);
    }
  };

  const { total } = calculateTotals();
  localStorage.setItem('totalAmount', total);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Enter complete address</h2>
            <button onClick={() => navigate('/')} className="text-2xl">&times;</button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-full border flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id ? 'bg-green-50 border-green-500 text-green-600' : ''
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="flatNo"
              value={formData.flatNo}
              onChange={handleChange}
              placeholder="Flat / House no / Building name *"
              className="w-full p-3 border rounded-lg mb-3"
              required
            />
            <input
              type="text"
              name="floor"
              value={formData.floor}
              onChange={handleChange}
              placeholder="Floor (optional)"
              className="w-full p-3 border rounded-lg mb-3"
            />
            <input
              type="text"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="Area / Sector / Locality *"
              className="w-full p-3 border rounded-lg mb-3"
              required
            />
            <input
              type="text"
              name="landmark"
              value={formData.landmark}
              onChange={handleChange}
              placeholder="Nearby landmark (optional)"
              className="w-full p-3 border rounded-lg mb-3"
            />

            <div className="text-sm text-gray-500 mb-3">Enter your details for seamless delivery experience</div>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name *"
              className="w-full p-3 border rounded-lg mb-3"
              required
            />
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number *"
              className="w-full p-3 border rounded-lg mb-4"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 disabled:opacity-50"
            >
              {loading ? 'Processing...' : `Proceed • ₹${total}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddressPage;