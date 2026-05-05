import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import api from "../services/api";
import { Link, useNavigate} from "react-router-dom";
import Footer from "./Footer";
import CategoryGrid from "../components/CategoryGrid";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);

  const navigate = useNavigate();

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
      
      <Header products={products} />

      <div className="max-w-[1200px] mx-auto px-3 sm:px-4 md:px-6">

        {/* HERO */}
        <div className="mt-4">
          <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl 
            min-h-[180px] sm:min-h-[200px] md:h-[220px] 
            flex items-center px-4 sm:px-6 md:px-10 text-white relative overflow-hidden">

            <div className="z-10 max-w-lg">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 md:mb-3 leading-tight">
                Stock up on daily essentials
              </h1>

              <p className="text-sm sm:text-base opacity-90 mb-4 md:mb-6 font-medium">
                Get farm-fresh goodness & groceries delivered in minutes.
              </p>

              <button 
              onClick={() => navigate("/category/Dairy, Bread & Eggs")}
              className="bg-white text-green-700 px-4 sm:px-6 py-2 rounded-lg font-bold text-xs sm:text-sm hover:scale-105 transition-transform">
                Shop Now
              </button>
            </div>

            <div className="absolute right-[-50px] top-0 bottom-0 w-1/2 bg-white/10 skew-x-12 hidden md:block"></div>
          </div>
        </div>

        {/* PROMO CARDS */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

          <div 
           onClick={() => navigate("/category/Pharma & Wellness")}
           className="bg-[#00b0a6] rounded-2xl min-h-[140px] sm:h-[160px] text-white p-4 sm:p-6 cursor-pointer hover:shadow-md">
            <h2 className="font-extrabold text-lg sm:text-xl mb-1 w-2/3">
              Pharmacy at your doorstep
            </h2>
            <p className="text-xs mb-4">
              Medicines & wellness products
            </p>
            <button className="bg-white text-black px-4 py-1.5 rounded-lg text-xs font-bold">
              Order Now
            </button>
          </div>

          <div onClick={() => navigate("/category/Pet Care")}
          className="bg-[#facc15] rounded-2xl min-h-[140px] sm:h-[160px] text-black p-4 sm:p-6 cursor-pointer hover:shadow-md">
            <h2 className="font-extrabold text-lg sm:text-xl mb-1 w-2/3">
              Pet care supplies
            </h2>
            <p className="text-xs mb-4">
              Food, toys & treats
            </p>
            <button className="bg-gray-800 text-white px-4 py-1.5 rounded-lg text-xs font-bold">
              Order Now
            </button>
          </div>

          <div 
           onClick={() => navigate("/category/Baby Care")}
           className="bg-[#d5e0ee] dark:bg-[#2d3e4e] rounded-2xl min-h-[140px] sm:h-[160px] text-black dark:text-white p-4 sm:p-6 cursor-pointer hover:shadow-md">
            <h2 className="font-extrabold text-lg sm:text-xl mb-1 w-2/3">
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
        <CategoryGrid />

        {/* PRODUCTS */}
        <div className="mt-10 sm:mt-12 pb-10">

          {(activeCategory
            ? groupedProducts.filter(
                (g) => g.category === activeCategory
              )
            : groupedProducts.slice(0, 3)
          ).map((group) => (

            <div key={group.category} className="mb-8 sm:mb-10">

              <div className="flex justify-between items-center mb-3 sm:mb-4">
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900 dark:text-white">
                  {group.category}
                </h2>

                <button
                  onClick={() => setActiveCategory(group.category)}
                  className="text-green-600 dark:text-green-500 text-xs sm:text-sm font-semibold hover:underline"
                >
                  see all
                </button>
              </div>

              <div className="flex overflow-x-auto gap-3 sm:gap-4 pb-4 scrollbar-hide">

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

      <Footer />
    </div>
  );
};

export default HomePage;