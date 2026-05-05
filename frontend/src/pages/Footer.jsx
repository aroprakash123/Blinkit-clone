import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#f7f7f7] dark:bg-gray-900 mt-16 border-t border-gray-200 dark:border-gray-700 transition-colors duration-300">

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 py-10 sm:py-12">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

          {/* LEFT */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-6 sm:mb-8">
              Useful Links
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 sm:gap-x-12 gap-y-4 text-sm text-gray-600 dark:text-gray-400">

              <div className="flex flex-col gap-3 sm:gap-4">
                <Link to="/blog" className="hover:text-green-600">Blog</Link>
                <Link to="/privacy" className="hover:text-green-600">Privacy</Link>
                <Link to="/terms" className="hover:text-green-600">Terms</Link>
                <Link to="/faqs" className="hover:text-green-600">FAQs</Link>
                <Link to="/security" className="hover:text-green-600">Security</Link>
                <Link to="/contact" className="hover:text-green-600">Contact</Link>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <Link to="/partner" className="hover:text-green-600">Partner</Link>
                <Link to="/franchise" className="hover:text-green-600">Franchise</Link>
                <Link to="/seller" className="hover:text-green-600">Seller</Link>
                <Link to="/warehouse" className="hover:text-green-600">Warehouse</Link>
                <Link to="/deliver" className="hover:text-green-600">Deliver</Link>
                <Link to="/resources" className="hover:text-green-600">Resources</Link>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <Link to="/recipes" className="hover:text-green-600">Recipes</Link>
                <Link to="/bistro" className="hover:text-green-600">Bistro</Link>
                <Link to="/district" className="hover:text-green-600">District</Link>
                <Link to="/ambulance" className="hover:text-green-600">Blinkit Ambulance</Link>
              </div>

            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white">
                Categories
              </h3>
              <Link to="/categories" className="text-green-600 text-sm font-medium">
                see all
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-8 sm:gap-x-12 gap-y-4 text-sm text-gray-600 dark:text-gray-400">

              <div className="flex flex-col gap-3 sm:gap-4">
                <Link to="/category/vegetables">Vegetables & Fruits</Link>
                <Link to="/category/drinks">Cold Drinks</Link>
                <Link to="/category/bakery">Bakery</Link>
                <Link to="/category/dry-fruits">Dry Fruits</Link>
                <Link to="/category/paan">Paan</Link>
                <Link to="/category/pharma">Pharma</Link>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <Link to="/category/dairy">Dairy</Link>
                <Link to="/category/frozen">Frozen</Link>
                <Link to="/category/sweets">Sweets</Link>
                <Link to="/category/sauces">Sauces</Link>
                <Link to="/category/organic">Organic</Link>
                <Link to="/category/cleaning">Cleaning</Link>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <Link to="/category/munchies">Munchies</Link>
                <Link to="/category/tea">Tea</Link>
                <Link to="/category/grains">Grains</Link>
                <Link to="/category/meat">Meat</Link>
                <Link to="/category/baby">Baby</Link>
                <Link to="/category/pet">Pet</Link>
              </div>

              <div className="flex flex-col gap-3 sm:gap-4">
                <Link to="/category/home">Home</Link>
                <Link to="/category/beauty">Beauty</Link>
                <Link to="/category/electronics">Electronics</Link>
                <Link to="/category/toys">Toys</Link>
                <Link to="/category/books">Books</Link>
                <Link to="/category/gift">Gift Cards</Link>
              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM BAR */}
        <div className="mt-10 sm:mt-14 bg-[#eeeeee] dark:bg-gray-800 rounded-xl px-4 sm:px-8 py-4 sm:py-5 flex flex-col lg:flex-row items-center justify-between gap-4 sm:gap-6 text-center lg:text-left transition">

          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
            © Blink Commerce Private Limited, 2016-2026
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-5">
            <span className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
              Download App
            </span>

            <div className="flex gap-2">
              <button className="bg-black text-white px-3 sm:px-4 py-2 rounded-md text-[10px] sm:text-xs">
                App Store
              </button>

              <button className="bg-black text-white px-3 sm:px-4 py-2 rounded-md text-[10px] sm:text-xs">
                Google Play
              </button>
            </div>
          </div>

          <div className="flex gap-3 sm:gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn].map((Icon, i) => (
              <div
                key={i}
                className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-black dark:bg-gray-700 text-white rounded-full"
              >
                <Icon size={12} />
              </div>
            ))}
          </div>

        </div>

        {/* DISCLAIMER */}
        <p className="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mt-5 sm:mt-6 leading-relaxed text-center lg:text-left">
          “Blinkit” is owned & managed by “Blink Commerce Private Limited” and is not related.
        </p>

      </div>
    </footer>
  );
};

export default Footer;