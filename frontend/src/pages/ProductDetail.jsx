import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import api from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetail = () => {

  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [zoom, setZoom] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, [id]); // Added id dependency

  const fetchProduct = async () => {
    const res = await api.get(`/products/${id}`);
    setProduct(res.data);

    const sim = await api.get(`/products?category=${res.data.category}`);
    setSimilar(sim.data.filter((p) => p._id !== id));
  };

  const handleAddCart = () => {
    addToCart(product, qty);
  };

  const handleSimilarAddCart = (e, item) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation(); // Stop event bubbling
    addToCart(item, 1);
  };

  const handleSimilarClick = (e, itemId) => {
    // Don't navigate if the click was on the ADD button
    if (e.target.closest('button')) {
      return;
    }
    window.location.href = `/product/${itemId}`;
  };

  if (!product) return <div className="p-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">Loading...</div>;

  const discount =
    product.originalPrice &&
    Math.round(
      ((product.originalPrice - product.price) /
        product.originalPrice) *
        100
    );

  return (

    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">

      <Header />

      <div className="max-w-[1200px] mx-auto p-6">

        {/* BREADCRUMB */}

        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">

          <Link to="/" className="hover:text-green-600 dark:hover:text-green-500">
            Home
          </Link>

          {" / "}

          <span>{product.category}</span>

          {" / "}

          <span className="text-gray-700 dark:text-gray-300">
            {product.name}
          </span>

        </div>


        <div className="grid md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm transition-colors duration-300">

          {/* IMAGE */}

          <div
            className="border dark:border-gray-700 rounded-lg p-6 cursor-zoom-in bg-white dark:bg-gray-800"
            onMouseEnter={() => setZoom(true)}
            onMouseLeave={() => setZoom(false)}
          >

            <img
              src={product.image}
              alt={product.name}
              className={`w-full h-[380px] object-contain transition-transform duration-300 ${
                zoom ? "scale-125" : "scale-100"
              }`}
            />

          </div>


          {/* PRODUCT INFO */}

          <div>

            <div className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs px-3 py-1 rounded w-fit mb-3 font-semibold">
              ⚡ {product.deliveryTime || "8 MINS"}
            </div>

            <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">
              {product.name}
            </h1>

            <p className="text-gray-500 dark:text-gray-400 text-sm mb-3">
              {product.quantity}
            </p>

            <div className="flex items-center gap-2 mb-4">

              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                ⭐ {product.rating || 4.5}
              </span>

              <span className="text-gray-500 dark:text-gray-400 text-sm">
                {product.stock} left
              </span>

            </div>


            {/* PRICE */}

            <div className="flex items-center gap-3 mb-6">

              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{product.price}
              </span>

              {product.originalPrice && (

                <>
                  <span className="line-through text-gray-400 dark:text-gray-500">
                    ₹{product.originalPrice}
                  </span>

                  <span className="text-green-600 dark:text-green-500 text-sm font-semibold">
                    {discount}% OFF
                  </span>
                </>

              )}

            </div>


            {/* QUANTITY SELECTOR */}

            <div className="flex items-center gap-4 mb-6">

              <div className="flex border dark:border-gray-600 rounded-lg overflow-hidden">

                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  -
                </button>

                <span className="px-5 py-2 font-semibold text-gray-900 dark:text-white bg-white dark:bg-gray-800">
                  {qty}
                </span>

                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  +
                </button>

              </div>

              {product.inStock ? (

                <button
                  onClick={handleAddCart}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
                >
                  Add to Cart
                </button>

              ) : (

                <button className="bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-6 py-3 rounded-lg cursor-not-allowed">
                  Out of Stock
                </button>

              )}

            </div>


            {/* PRODUCT HIGHLIGHTS */}

            <div className="border dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800/50 transition-colors duration-300">

              <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">
                Product Highlights
              </h3>

              <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-2">

                <li>• Fresh & premium quality</li>
                <li>• Direct from trusted suppliers</li>
                <li>• Fast delivery in minutes</li>
                <li>• Easy replacement if damaged</li>

              </ul>

            </div>

          </div>

        </div>


        {/* SIMILAR PRODUCTS */}

        <div className="mt-12">

          <h2 className="text-xl font-bold mb-5 text-gray-900 dark:text-white">
            Similar Products
          </h2>

          <div className="flex gap-4 overflow-x-auto pb-3">

            {similar.map((item) => (

              <div
                key={item._id}
                onClick={() => window.location.href = `/product/${item._id}`}
                className="min-w-[180px] border dark:border-gray-700 rounded-lg p-3 bg-white dark:bg-gray-800 hover:shadow dark:hover:shadow-gray-800 transition-all duration-300 cursor-pointer"
              >

                <img
                  src={item.image}
                  alt={item.name}
                  className="h-[120px] mx-auto object-contain"
                />

                <p className="text-sm mt-2 font-medium line-clamp-2 text-gray-900 dark:text-white">
                  {item.name}
                </p>

                <div className="flex justify-between items-center mt-2">

                  <span className="font-semibold text-gray-900 dark:text-white">
                    ₹{item.price}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(item, 1);
                    }}
                    className="bg-green-600 text-white text-xs px-3 py-1 rounded hover:bg-green-700 transition-colors"
                  >
                    ADD
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  );

};

export default ProductDetail;