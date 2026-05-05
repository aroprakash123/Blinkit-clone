import React from "react";
import Footer from "../pages/Footer";

const Terms = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <div className="flex-grow p-10">
        <h1 className="text-3xl font-bold mb-4">Terms & Conditions</h1>
        <p>Please read terms carefully.</p>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;