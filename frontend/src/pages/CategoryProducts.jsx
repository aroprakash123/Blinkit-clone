import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import Header from "../components/Header";
import Footer from "./Footer";
import { useCart } from "../context/CartContext";

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const { cart, addToCart, updateQuantity } = useCart();

  const [products, setProducts] = useState([]);
  const [groupedProducts, setGroupedProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeSubCategory, setActiveSubCategory] = useState("");

  const sectionRefs = useRef({});

  const getQuantity = (productId) => {
    const cartItem = cart?.items?.find((item) => {
      const itemProductId = item.product?._id || item.product || item.id;
      return itemProductId === productId;
    });
    return cartItem?.quantity || 0;
  };

  useEffect(() => {
    fetchProducts();
  }, [categoryName]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await api.get(
        `/products/category/${encodeURIComponent(
          decodeURIComponent(categoryName)
        )}`
      );
      setProducts(res.data || []);
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const grouped = {};

    const subCategoryGroups = {
      Paan: ["Paan"],
      Milk: ["Milk", "Amul", "Omed", "Pragati", "Milky"],
      Bread: ["Bread", "Pav", "Toast"],
      Eggs: ["Egg"],
      Butter: ["Butter"],
      Cheese: ["Cheese", "Paneer"],
      Yogurt: ["Curd", "Yogurt"],
      Flakes: ["Flakes", "Cereal", "Oats"],
      Juice: ["Juice", "Drink"],
      Others: [],
    };

    products.forEach((product) => {
      let assigned = "Others";

      for (const [group, keywords] of Object.entries(subCategoryGroups)) {
        if (keywords.some((k) => product.name?.includes(k))) {
          assigned = group;
          break;
        }
      }

      if (!grouped[assigned]) grouped[assigned] = [];
      grouped[assigned].push(product);
    });

    setGroupedProducts(grouped);

    const firstKey = Object.keys(grouped)[0];
    if (firstKey) setActiveSubCategory(firstKey);
  }, [products]);

  const scrollToSection = (key) => {
    sectionRefs.current[key]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    setActiveSubCategory(key);
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-900 min-h-screen">
        <Header />
        <div className="flex justify-center items-center h-64 text-gray-500 dark:text-gray-400">
          Loading products...
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f7f9] dark:bg-gray-900 min-h-screen">
      <Header />

      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 py-4">

        {/* MOBILE SCROLL */}
        <div className="md:hidden flex overflow-x-auto gap-2 pb-3">
          {Object.keys(groupedProducts).map((sub) => (
            <button
              key={sub}
              onClick={() => scrollToSection(sub)}
              className={`whitespace-nowrap px-3 py-1 rounded-full text-xs border
              ${
                activeSubCategory === sub
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4">

          {/* SIDEBAR */}
          <div className="hidden md:block w-[200px] bg-white dark:bg-gray-800 rounded-xl p-3 h-[80vh] sticky top-20 overflow-y-auto border dark:border-gray-700">
            {Object.keys(groupedProducts).map((sub) => (
              <div
                key={sub}
                onClick={() => scrollToSection(sub)}
                className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer mb-2 transition
                ${
                  activeSubCategory === sub
                    ? "bg-green-100 dark:bg-green-900 border border-green-300"
                    : "hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                <div className="w-9 h-9 bg-gray-100 dark:bg-gray-700 rounded-md flex items-center justify-center text-sm">
                  📦
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {sub}
                </span>
              </div>
            ))}
          </div>

          {/* MAIN */}
          <div className="flex-1">

            <div className="mb-4">
              <Link
                to="/"
                className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 hover:text-green-600"
              >
                ← Back
              </Link>

              <h1 className="text-lg sm:text-xl font-semibold mt-1 text-gray-800 dark:text-white">
                {decodeURIComponent(categoryName)}
              </h1>

              <p className="text-xs sm:text-sm text-green-600 mt-1 font-medium">
                🚚 Delivery in 11 minutes
              </p>
            </div>

            {Object.entries(groupedProducts).map(([sub, items]) => (
              <div
                key={sub}
                id={sub}
                ref={(el) => (sectionRefs.current[sub] = el)}
                className="mb-6"
              >
                <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {sub}
                </h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {items.map((product) => {
                    const quantity = getQuantity(product._id);

                    return (
                      <div
                        key={product._id}
                        className="bg-white dark:bg-gray-800 rounded-xl p-2 sm:p-3 border dark:border-gray-700 hover:shadow-md transition"
                      >
                        <Link to={`/product/${product._id}`}>
                          <div className="flex justify-center mb-2">
                            <img
                              src={product.image || "https://via.placeholder.com/120"}
                              alt={product.name}
                              className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                            />
                          </div>

                          <p className="text-[10px] text-green-700 mb-1">
                            ⏱ {product.deliveryTime || "11 mins"}
                          </p>

                          <h3 className="text-xs font-medium text-gray-800 dark:text-gray-200 line-clamp-2 h-[32px]">
                            {product.name}
                          </h3>

                          <p className="text-[11px] text-gray-400 mb-1">
                            {product.quantity || "1 pack"}
                          </p>

                          <div className="text-sm font-bold text-gray-900 dark:text-white mb-2">
                            ₹{product.price}
                          </div>
                        </Link>

                        {quantity === 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 1);
                            }}
                            className="w-full border border-green-600 text-green-600 py-1 text-xs rounded hover:bg-green-600 hover:text-white"
                          >
                            ADD
                          </button>
                        ) : (
                          <div className="flex items-center justify-between bg-green-600 rounded h-8">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(product._id, quantity - 1);
                              }}
                              className="px-2 text-white"
                            >
                              −
                            </button>

                            <span className="text-white text-xs">
                              {quantity}
                            </span>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                updateQuantity(product._id, quantity + 1);
                              }}
                              className="px-2 text-white"
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {products.length === 0 && (
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                No products found.
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CategoryProducts;