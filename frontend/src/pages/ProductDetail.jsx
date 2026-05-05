import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { cart, addToCart, updateQuantity } = useCart();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [coupon, setCoupon] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState({ x: 50, y: 50, show: false });

  const isTouchDevice =
    typeof window !== "undefined" &&
    ("ontouchstart" in window || navigator.maxTouchPoints > 0);

  // ✅ CART QUANTITY
  const cartItem = cart?.items?.find((item) => {
    const itemProductId = item.product?._id || item.product || item.id;
    return itemProductId === product?._id;
  });

  const quantity = cartItem?.quantity || 0;

  useEffect(() => {
    if (!id || id.length !== 24) {
      setError("Invalid product ID");
      setLoading(false);
      return;
    }
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/products/${id}`);
      const data = res.data;

      setProduct(data);

      if (data?.category) {
        const sim = await api.get(`/products?category=${data.category}`);
        setSimilar(sim.data.filter((p) => p._id !== id));
      }
    } catch (err) {
      setError("Failed to load product");
    } finally {
      setLoading(false);
    }
  };

  const applyCoupon = () => {
    if (coupon === "FLAT10") setAppliedCoupon(10);
    else if (coupon === "FIRST20") setAppliedCoupon(20);
    else setAppliedCoupon(null);
  };

  if (loading) {
    return (
      <div className="p-4 animate-pulse dark:bg-gray-900 min-h-screen">
        <div className="h-60 bg-gray-200 dark:bg-gray-700 rounded mb-4" />
        <div className="h-5 bg-gray-200 dark:bg-gray-700 w-1/3 mb-2" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-6 text-center dark:bg-gray-900 min-h-screen">
        <p className="text-red-500">{error || "Product not found"}</p>
        <Link to="/" className="text-green-600">
          Go Home
        </Link>
      </div>
    );
  }

  const images = product.images || [product.image];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 pb-24 transition-colors duration-300">
      <Header />

      {/* DELIVERY STRIP */}
      <div className="bg-yellow-100 dark:bg-yellow-900 text-xs p-2 text-center font-semibold">
        ⚡ Delivery in 10–20 mins
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4">

        {/* BREADCRUMB */}
        <div className="text-xs text-gray-500 dark:text-gray-400 my-3">
          <Link to="/">Home</Link> / {product.category} / {product.name}
        </div>

        {/* MAIN */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4 p-4 transition">

          {/* IMAGE SECTION */}
          <div className="relative">

            <div
              className="overflow-hidden flex justify-center"
              onMouseMove={(e) => {
                if (isTouchDevice) return;

                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;

                setZoom({ x, y, show: true });
              }}
              onMouseLeave={() =>
                setZoom((z) => ({ ...z, show: false }))
              }
              onTouchStart={(e) => (window.startX = e.touches[0].clientX)}
              onTouchEnd={(e) => {
                const endX = e.changedTouches[0].clientX;
                const diff = window.startX - endX;

                if (diff > 50 && current < images.length - 1) {
                  setCurrent(current + 1);
                } else if (diff < -50 && current > 0) {
                  setCurrent(current - 1);
                }
              }}
            >
              <div
                className="flex transition-transform duration-300"
                style={{
                  transform: `translateX(-${current * 100}%)`,
                }}
              >
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="w-full flex-shrink-0 flex justify-center"
                  >
                    <img
                      src={img}
                      alt=""
                      className="h-56 sm:h-72 md:h-80 object-contain"
                      style={{
                        transform:
                          zoom.show && !isTouchDevice
                            ? `scale(1.6)`
                            : "scale(1)",
                        transformOrigin: `${zoom.x}% ${zoom.y}%`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* DOTS */}
            <div className="flex justify-center mt-2 gap-1">
              {images.map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    current === i
                      ? "bg-green-600"
                      : "bg-gray-300 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* INFO */}
          <div>
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
              {product.name}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm">
              {product.quantity}
            </p>

            <div className="mt-3">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                ₹{product.price}
              </span>
            </div>

            {/* COUPON */}
            <div className="mt-3 flex gap-2">
              <input
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Enter coupon"
                className="border px-2 py-1 text-sm rounded w-full 
                bg-white dark:bg-gray-700 
                text-black dark:text-white"
              />
              <button
                onClick={applyCoupon}
                className="bg-black text-white px-3 rounded text-sm"
              >
                Apply
              </button>
            </div>

            {/* ADD / QTY */}
            <div className="mt-4">
              {quantity === 0 ? (
                <button
                  onClick={() => addToCart(product, 1)}
                  className="bg-green-600 text-white px-4 py-2 rounded w-full sm:w-auto"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      updateQuantity(product._id, quantity - 1)
                    }
                    className="px-3 py-1 border dark:border-gray-600"
                  >
                    −
                  </button>

                  <span className="text-gray-900 dark:text-white">
                    {quantity}
                  </span>

                  <button
                    onClick={() =>
                      updateQuantity(product._id, quantity + 1)
                    }
                    className="px-3 py-1 border dark:border-gray-600"
                  >
                    +
                  </button>
                </div>
              )}
            </div>

            {/* BUY NOW */}
            <button
              onClick={() => {
                addToCart(product, 1);
                navigate("/checkout");
              }}
              className="mt-3 bg-black text-white px-4 py-2 rounded w-full sm:w-auto"
            >
              Buy Now
            </button>
          </div>
        </div>

        {/* SIMILAR */}
        <div className="mt-6">
          <h2 className="font-bold mb-3 text-gray-800 dark:text-white">
            Similar Products
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {similar.slice(0, 4).map((item) => (
              <div
                key={item._id}
                onClick={() => navigate(`/product/${item._id}`)}
                className="bg-white dark:bg-gray-800 p-2 rounded cursor-pointer hover:shadow-md"
              >
                <img
                  src={item.image}
                  className="h-20 mx-auto object-contain"
                  alt=""
                />

                <p className="text-xs truncate mt-1 text-gray-800 dark:text-white">
                  {item.name}
                </p>

                <div className="flex justify-between mt-2">
                  <span className="text-sm font-bold text-gray-900 dark:text-white">
                    ₹{item.price}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="bg-green-600 text-white text-xs px-2 py-1 rounded"
                  >
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MOBILE BAR */}
      <div className="fixed bottom-0 left-0 w-full md:hidden 
        bg-white dark:bg-gray-800 border-t 
        border-gray-200 dark:border-gray-700 
        p-3 flex justify-between items-center"
      >
        <span className="font-bold text-gray-900 dark:text-white">
          ₹{product.price}
        </span>

        {quantity === 0 ? (
          <button
            onClick={() => addToCart(product, 1)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        ) : (
          <div className="flex items-center gap-2 bg-green-600 text-white rounded">
            <button
              onClick={() =>
                updateQuantity(product._id, quantity - 1)
              }
              className="px-3"
            >
              −
            </button>

            <span>{quantity}</span>

            <button
              onClick={() =>
                updateQuantity(product._id, quantity + 1)
              }
              className="px-3"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;