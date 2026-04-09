import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import CartPanel from './CartPanel';
import { useTheme } from '../context/ThemeContext';

const Header = ({ products = [] }) => {

  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  const [search, setSearch] = useState("");

  const itemCount = cart.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectProduct = (id) => {
    setSearch("");
    navigate(`/product/${id}`);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    logout();
    navigate('/login');
  };

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 transition-colors duration-300">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-4">

          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            
            {/* SVG unchanged */}
            <svg width="134" height="30" viewBox="0 0 114 30" fill="none">
              {/* your svg paths exactly same */}
            </svg>

            <div className="border-l dark:border-gray-600 pl-3 ml-2">
              <h3 className="text-sm font-semibold dark:text-white">Delivery in 8 minutes</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                72FM+C7A, Qlith Innovation Pvt Ltd.
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <i className="fa-solid fa-magnifying-glass absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search 'milk'"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-400"
              />

              {/* SEARCH DROPDOWN */}
              {search && (
                <div className="absolute top-12 w-full bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-lg shadow-lg max-h-64 overflow-y-auto z-50">

                  {filteredProducts.length > 0 ? (
                    filteredProducts.slice(0,6).map((product) => (

                      <div
                        key={product._id}
                        onClick={() => handleSelectProduct(product._id)}
                        className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-10 h-10 object-contain"
                        />

                        <div>
                          <p className="text-sm font-medium dark:text-white">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ₹{product.price}
                          </p>
                        </div>

                      </div>

                    ))
                  ) : (
                    <p className="p-3 text-sm text-gray-500">
                      No products found
                    </p>
                  )}

                </div>
              )}

            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  Hi, {user.username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 font-medium px-3 py-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
            >
              <i className="fa-solid fa-cart-shopping"></i>
              {itemCount > 0 && <span className="text-sm">({itemCount})</span>}
              My Cart
            </button>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="relative inline-flex h-8 w-14 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
              style={{ backgroundColor: darkMode ? '#374151' : '#e2e8f0' }}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-300 flex items-center justify-center text-sm
                ${darkMode ? 'translate-x-7' : 'translate-x-1'}`}
              >
                {darkMode ? '🌙' : '☀️'}
              </span>
            </button>

          </div>
        </div>
      </header>

      <CartPanel isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;