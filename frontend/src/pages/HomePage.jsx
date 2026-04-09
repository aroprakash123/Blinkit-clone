import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import { Link } from "react-router-dom";

const HomePage = () => {

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {

      const res = await api.get("/products");

      setProducts(res.data);

      const uniqueCategories = [
        ...new Set(res.data.map((p) => p.category)),
      ];

      setCategories(uniqueCategories);

    } catch (err) {
      console.log("Error fetching products:", err);
    }
  };

  const groupedProducts = categories.map((cat) => ({
    category: cat,
    products: products.filter((p) => p.category === cat),
  }));

  return (

    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-300">

      {/* PASS PRODUCTS HERE */}
      <Header products={products} />

      <div className="max-w-[1200px] mx-auto px-4">

        {/* HERO BANNER */}
        <div className="mt-4">
          <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl h-[220px] flex items-center px-10 text-white relative overflow-hidden">

            <div className="z-10 max-w-lg">

              <h1 className="text-4xl font-extrabold mb-3 leading-tight">
                Stock up on daily essentials
              </h1>

              <p className="text-base opacity-90 mb-6 font-medium">
                Get farm-fresh goodness & groceries delivered in minutes.
              </p>

              <button className="bg-white text-green-700 px-6 py-2.5 rounded-lg font-bold text-sm hover:scale-105 transition-transform">
                Shop Now
              </button>

            </div>

            <div className="absolute right-[-50px] top-0 bottom-0 w-1/2 bg-white/10 skew-x-12 hidden md:block"></div>

          </div>
        </div>


        {/* PROMO CARDS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">

          <div className="bg-[#00b0a6] rounded-2xl h-[160px] text-white p-6 cursor-pointer hover:shadow-md">
            <h2 className="font-extrabold text-xl mb-1 w-2/3">
              Pharmacy at your doorstep
            </h2>

            <p className="text-xs mb-4">
              Medicines & wellness products
            </p>

            <button className="bg-white text-black px-4 py-1.5 rounded-lg text-xs font-bold">
              Order Now
            </button>
          </div>

          <div className="bg-[#facc15] rounded-2xl h-[160px] text-black p-6 cursor-pointer hover:shadow-md">

            <h2 className="font-extrabold text-xl mb-1 w-2/3">
              Pet care supplies
            </h2>

            <p className="text-xs mb-4">
              Food, toys & treats
            </p>

            <button className="bg-gray-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold">
              Order Now
            </button>

          </div>

          <div className="bg-[#d5e0ee] dark:bg-[#2d3e4e] rounded-2xl h-[160px] text-black dark:text-white p-6 cursor-pointer hover:shadow-md">

            <h2 className="font-extrabold text-xl mb-1 w-2/3">
              Baby care essentials
            </h2>

            <p className="text-xs mb-4">
              Diapers & baby products
            </p>

            <button className="bg-gray-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold">
              Order Now
            </button>

          </div>

        </div>


        {/* CATEGORY GRID */}
        <div className="mt-10">

          <div className="grid grid-cols-5 md:grid-cols-10 gap-3">

            {categories.map((cat, idx) => {

              const representativeProduct = products.find(
                (p) => p.category === cat
              );

              const displayImg =
                representativeProduct?.image ||
                "https://placehold.co/80x80?text=Cart";

              return (

                <div
                  key={idx}
                  onClick={() => setActiveCategory(cat)}
                  className={`flex flex-col items-center cursor-pointer group
                  ${activeCategory === cat ? "scale-105" : ""}`}
                >

                  <div className="bg-[#f3f7fd] dark:bg-gray-800 w-[85px] h-[85px] rounded-2xl flex items-center justify-center mb-2 overflow-hidden p-2 group-hover:shadow dark:group-hover:shadow-gray-700">

                    <img
                      src={displayImg}
                      alt={cat}
                      className="w-full h-full object-contain"
                    />

                  </div>

                  <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 text-center leading-tight px-1 group-hover:text-green-700 dark:group-hover:text-green-500">
                    {cat}
                  </p>

                </div>

              );

            })}

          </div>

        </div>


        {/* PRODUCTS */}
        <div className="mt-12 pb-10">

          {(activeCategory
            ? groupedProducts.filter(
                (g) => g.category === activeCategory
              )
            : groupedProducts
          ).map((group) => (

            <div key={group.category} className="mb-10">

              <div className="flex justify-between items-end mb-4">

                <h2 className="text-xl font-extrabold text-gray-900 dark:text-white">
                  {group.category}
                </h2>

                <button
                  onClick={() => setActiveCategory(group.category)}
                  className="text-green-600 dark:text-green-500 text-sm font-semibold hover:underline"
                >
                  see all
                </button>

              </div>

              <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">

                {group.products.map((product) => (

                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                  >
                    <ProductCard product={product} />
                  </Link>

                ))}

              </div>

            </div>

          ))}

        </div>

      </div>


      {/* FOOTER */}
      <footer className="bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 mt-12 transition-colors duration-300">

        <div className="max-w-[1200px] mx-auto px-4 py-10">

          <div className="grid md:grid-cols-4 gap-8">

            <div>
              <h3 className="font-bold mb-4 dark:text-white">Useful Links</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>Blog</p>
                <p>Privacy</p>
                <p>Terms</p>
                <p>FAQs</p>
                <p>Contact</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 dark:text-white">Categories</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>Vegetables & Fruits</p>
                <p>Dairy & Breakfast</p>
                <p>Snacks & Munchies</p>
                <p>Cold Drinks</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 dark:text-white">Company</h3>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <p>About</p>
                <p>Careers</p>
                <p>Partner</p>
                <p>Franchise</p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-4 dark:text-white">Follow Us</h3>
              <div className="flex gap-3 text-sm dark:text-gray-400">
                <span>📘</span>
                <span>📸</span>
                <span>🐦</span>
                <span>▶</span>
              </div>
            </div>

          </div>

          <div className="mt-10 pt-6 border-t dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
              © Blink Commerce Private Limited 2016-2026
            </p>
          </div>

        </div>

      </footer>

    </div>

  );

};

export default HomePage;