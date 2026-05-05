import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Success = () => {
  const navigate = useNavigate();

  // 🔥 Auto redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="h-screen flex items-center justify-center bg-gray-50 px-4">

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full"
      >

        {/* ✅ Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
          className="w-20 h-20 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100"
        >
          <span className="text-4xl">✅</span>
        </motion.div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-green-600">
          Order Placed Successfully
        </h1>

        {/* Subtitle */}
        <p className="mt-2 text-gray-500 text-sm">
          Your order is confirmed and will be delivered soon 🚀
        </p>

        {/* Extra Info */}
        <p className="mt-1 text-gray-400 text-xs">
          Redirecting to home in 3 seconds...
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3 justify-center">

          <button
            onClick={() => navigate("/")}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            Go to Home
          </button>

          <button
            onClick={() => navigate("/orders")}
            className="border px-4 py-2 rounded-lg hover:bg-gray-100"
          >
            View Orders
          </button>

        </div>

      </motion.div>
    </div>
  );
};

export default Success;