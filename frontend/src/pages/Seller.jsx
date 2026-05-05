import React from "react";
import Footer from "../pages/Footer";

const Seller = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold mb-4">Seller</h1>
        <p>Sell products on our platform.</p>
      </div>

      <Footer />
    </div>
  );
};

export default Seller;