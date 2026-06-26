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

  // Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleDarkMode = () => {
    const html = document.documentElement;

    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  // Search placeholders
  const placeholders = [
    "Search milk",
    "Search bread",
    "Search eggs",
    "Search fruits",
    "Search snacks",
  ];

  const [placeholderIndex, setPlaceholderIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) =>
        prev === placeholders.length - 1 ? 0 : prev + 1
      );
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  // Cart Count
  const items = cart?.items || [];

  const itemCount = items.reduce(
    (sum, item) => sum + (item.quantity ?? 1),
    0
  );

  // Search Products
  const filteredProducts = products.filter((product) =>
    product.name?.toLowerCase().includes(search.toLowerCase())
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

  // Close Search Dropdown
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!searchRef.current?.contains(e.target)) {
        setSearch("");
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () =>
      document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-700 shadow-sm">

        <div
          className="
          max-w-7xl
          mx-auto
          px-3
          sm:px-4
          py-3
          flex
          flex-wrap
          md:flex-nowrap
          items-center
          gap-3
          "
        >

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex items-center gap-3 min-w-fit"
          >
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold text-green-600 whitespace-nowrap">
                Blinkit Clone
              </h1>

              <div className="hidden xl:block">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  ⚡ Delivery in 8 mins • Bhubaneswar
                </p>
              </div>
            </div>
          </div>

          {/* SEARCH */}
          <div
            ref={searchRef}
            className="
            relative
            w-full
            md:flex-1
            order-3
            md:order-none
            "
          >

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
              w-full
              h-11
              pl-11
              pr-4
              rounded-xl
              border
              border-gray-300
              dark:border-gray-700
              bg-white
              dark:bg-gray-800
              text-gray-900
              dark:text-white
              outline-none
              focus:ring-2
              focus:ring-green-500
              "
            />

            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </div>

            {!search && (
              <div className="absolute left-11 top-1/2 -translate-y-1/2 overflow-hidden h-5 pointer-events-none">

                <div
                  className="transition-transform duration-700"
                  style={{
                    transform: `translateY(-${placeholderIndex * 20}px)`,
                  }}
                >
                  {placeholders.map((item, index) => (
                    <div
                      key={index}
                      className="h-5 text-sm text-gray-400"
                    >
                      {item}
                    </div>
                  ))}
                </div>

              </div>
            )}

            {/* SEARCH RESULTS */}
            {search && (
              <div className="absolute top-12 left-0 right-0 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-xl max-h-80 overflow-y-auto z-50">

                {filteredProducts.length > 0 ? (
                  filteredProducts.slice(0, 8).map((product) => (
                    <div
                      key={product._id}
                      onClick={() =>
                        handleSelectProduct(product._id)
                      }
                      className="flex items-center gap-3 p-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <img
                        src={product.image}
                        alt=""
                        className="w-12 h-12 object-contain"
                      />

                      <div>
                        <p className="text-sm font-medium text-gray-800 dark:text-white">
                          {product.name}
                        </p>

                        <p className="text-xs text-green-600 font-semibold">
                          ₹{product.price}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="p-4 text-sm text-gray-500">
                    No products found
                  </p>
                )}
              </div>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center gap-2 ml-auto">
{user ? (
  <>
    <div className="flex items-center gap-2 sm:gap-3">

      {/* USER GREETING */}
      <div
        className="
        hidden md:flex
        items-center gap-2
        px-4 py-2
        rounded-full
        bg-gradient-to-r
        from-green-500
        to-green-600
        text-white
        shadow-md
        whitespace-nowrap
        "
      >
        <span className="text-base">👋</span>

        <span className="font-medium text-sm">
          Hi, {user.username}
        </span>
      </div>

      {/* LOGOUT BUTTON */}
      <button
        onClick={handleLogout}
        className="
        flex items-center gap-1 sm:gap-2
        px-3 py-1.5 sm:px-4 sm:py-2
        text-xs sm:text-sm
        font-medium
        text-white
        rounded-full
        bg-red-500
        hover:bg-red-600
        transition-all duration-300
        "
      >
        <span>🚪</span>
        <span className="hidden sm:block">
          Logout
        </span>
      </button>

    </div>
  </>
) : (
  <button
    onClick={() => navigate("/login")}
    className="
    bg-blue-600
    text-white
    px-3 sm:px-4
    py-1.5 sm:py-2
    rounded-lg
    text-xs sm:text-sm
    hover:bg-blue-700
    transition
    "
  >
    Login
  </button>
)}

            {/* CART */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="
              relative
              flex
              items-center
              gap-2
              bg-green-600
              hover:bg-green-700
              text-white
              px-4
              py-2
              rounded-xl
              transition
              shadow
              "
            >
              🛒

              <span className="hidden sm:block">
                Cart
              </span>

              {itemCount > 0 && (
                <span
                  className="
                  absolute
                  -top-2
                  -right-2
                  bg-red-500
                  text-white
                  min-w-[20px]
                  h-[20px]
                  flex
                  items-center
                  justify-center
                  rounded-full
                  text-[10px]
                  font-bold
                  "
                >
                  {itemCount}
                </span>
              )}
            </button>

            {/* DARK MODE */}
            <button
              onClick={toggleDarkMode}
              className="
              relative
              w-12
              h-6
              rounded-full
              bg-gray-300
              dark:bg-green-600
              transition-all
              "
            >
              <div
                className={`
                absolute
                top-0.5
                w-5
                h-5
                bg-white
                rounded-full
                shadow
                transition-all
                ${
                  darkMode
                    ? "translate-x-6"
                    : "translate-x-0.5"
                }
                `}
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