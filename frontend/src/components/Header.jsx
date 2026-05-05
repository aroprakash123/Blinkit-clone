import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import CartPanel from "./CartPanel";

const Header = ({ products = [] }) => {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const searchRef = useRef();

  // ✅ LOAD THEME
  useEffect(() => {
    const saved = localStorage.getItem("theme");

    if (saved === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  // ✅ TOGGLE DARK MODE
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const isDark = html.classList.contains("dark");

    if (isDark) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // 🔥 PLACEHOLDERS
  const placeholders = [
    "Search ''milk''",
    "Search ''bread''",
    "Search ''eggs''",
    "Search ''fruits''",
    "Search ''snacks''",
  ];

  const [index, setIndex] = useState(0);

  // 🔥 SMOOTH LOOP (NO JUMP FEEL)
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) =>
        prev === placeholders.length - 1 ? 0 : prev + 1
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Cart count
  const items = cart?.items || [];
  const itemCount = items.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  // Filter search
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectProduct = (id) => {
    setSearch("");
    navigate(`/product/${id}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    logout();
    navigate("/login");
  };

  // Close search on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!searchRef.current?.contains(e.target)) {
        setSearch("");
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () =>
      document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-3">

          {/* LOGO */}
          <div
            className="flex items-center gap-2 sm:gap-3 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="font-bold text-lg sm:text-xl text-green-600">
              Aroprakash's Ecommerce
            </div>

            <div className="hidden md:block border-l pl-3 ml-2 dark:border-gray-600">
              <h3 className="text-sm font-semibold dark:text-white">
                ⚡ Delivery in 8 mins
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Bhubaneswar
              </p>
            </div>
          </div>

          {/* SEARCH */}
          <div
            ref={searchRef}
            className="w-full md:flex-1 md:max-w-lg relative order-3 md:order-none"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border 
              bg-white dark:bg-gray-800 text-gray-900 dark:text-white
              focus:ring-2 focus:ring-green-500 outline-none"
            />

            {/* ICON */}
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>

            {/* 🔥 REAL SMOOTH ROLLING PLACEHOLDER */}
            {!search && (
              <div className="absolute left-10 top-1/2 -translate-y-1/2 h-5 overflow-hidden pointer-events-none">
                
                <div
                  className="transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{
                    transform: `translateY(-${index * 20}px)`
                  }}
                >
                  {placeholders.map((text, i) => (
                    <div key={i} className="h-5 text-gray-400 text-sm">
                      {text}
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* DROPDOWN */}
            {search && (
              <div className="absolute top-12 w-full bg-white dark:bg-gray-800 border rounded-xl shadow-lg z-50 max-h-72 overflow-auto">
                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 6).map((product) => (
                    <div
                      key={product._id}
                      onClick={() => handleSelectProduct(product._id)}
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        className="w-10 h-10 object-contain"
                        alt=""
                      />
                      <div>
                        <p className="text-sm font-medium">
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
                    No results found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-2 sm:gap-3 ml-auto">

            {user ? (
              <>
  <div className="flex items-center gap-2 sm:gap-3">

    {/* USER BADGE */}
    <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 
    bg-gray-100 dark:bg-gray-800 rounded-full">

      {/* Avatar */}
      <div className="w-7 h-7 flex items-center justify-center 
      rounded-full bg-green-600 text-white text-xs font-bold">
        {user.username?.charAt(0).toUpperCase()}
      </div>

      {/* Name */}
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {user.username}
      </span>
    </div>

    {/* LOGOUT BUTTON */}
    <button
      onClick={handleLogout}
      className="flex items-center gap-1 sm:gap-2 
      px-3 py-1.5 sm:px-4 sm:py-2 
      text-xs sm:text-sm font-medium
      text-gray-700 dark:text-gray-200
      border border-gray-300 dark:border-gray-600
      rounded-full
      bg-red-500 hover:text-white hover:bg-red-700
      transition-all duration-300"
    >
      <span>🚪</span>
      <span className="hidden sm:block">Logout</span>
    </button>

  </div>
</>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm hover:bg-blue-700 transition"
              >
                Login
              </button>
            )}

            {/* CART */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl flex items-center gap-1 sm:gap-2 hover:bg-green-700 transition"
            >
              🛒 <span className="hidden sm:block">Cart</span>

              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold">
                  {itemCount}
                </span>
              )}
            </button>

            {/* DARK MODE */}
            <button
              onClick={toggleDarkMode}
              className="w-10 sm:w-12 h-5 sm:h-6 bg-gray-300 dark:bg-gray-700 rounded-full relative transition"
            >
              <div
                className={`absolute top-0.5 sm:top-1 w-4 h-4 bg-white rounded-full transition-all duration-300 ${
                  darkMode ? "right-1" : "left-1"
                }`}
              />
            </button>

          </div>
        </div>
      </header>

      <CartPanel
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
      />
    </>
  );
};

export default Header;